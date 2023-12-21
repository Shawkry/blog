---
id: useContext
sidebar_position: 0
sidebar_label: useContext 的使用优化
title: useContext使用优化
description: useContext 的使用优化
keywords: [React性能优化, useContext]
---

# useContext 的使用优化

> 我们经常会使用Context进行组件间的数据共享，但是使用不注意，也会引入一些组件无效渲染的性能问题。

## 初始化测试项目

```bash
npx create-react-app my-app --template typescript && code my-app
```

在index.tsx中，移除React.StrictMode组件包裹，直接调用App组件即可：

```tsx
root.render(
  //  <React.StrictMode>
  <App />,
  //  </React.StrictMode>
);
```

> 为什么要去掉React.StrictMode组件？因为使用这个组件在开发模式下会重复调用生命周期，如果在这个组件内部console.log，会发现输出两次。
> 这是用于帮助检查生命周期预期之外的副作用。
> 不过可以放心的是这仅适用于开发模式，在生产模式下不会重复调用生命周期。本文为减少干扰所以将其去除。

## 常规用法

```tsx
// 创建context
const MyContext = React.createContext<{ [key: string]: any }>({});
export const ParentComp = React.memo(() => {
  console.log("ParentComp, 渲染了");
  const [value, setValue] = useState(0);
  const setRandomData = useCallback(() => {
    setValue(Math.random() * 10000);
  }, []);
  return (
    <MyContext.Provider value={{ value, setRandomData }}>
      <div>
        ParentComp
        <ChildComp1 />
        <ChildComp2 />
      </div>
    </MyContext.Provider>
  );
});

// 读取context数据
export const ChildComp1 = React.memo(() => {
  console.log("ChildComp1, 渲染了");
  const { setRandomData } = useContext(MyContext);
  return (
    <div>
      child1, <button onClick={setRandomData}>按钮</button>
    </div>
  );
});

export const ChildComp2 = React.memo(() => {
  console.log("ChildComp2, 渲染了");
  const { value } = useContext(MyContext);
  return <div>child2, {value}</div>;
});
```

**结果**

点击"按钮"后，浏览器控制台的输出结果：

```
ParentComp, 渲染了
ChildComp1, 渲染了
ChildComp2, 渲染了
```

也就是说点击组件ChildComp1的按钮居然会导致ParentComp 、ChildComp1、ChildComp2 都重新渲染了。
但实际上ChildComp1只是使用上下文中的方法，该方法不变所以并不需要重新渲染，这是无效渲染可以优化的。

**分析原因**

```shell
点击触发onClick事件
-> setRandomData触发
—> setValue(setState)
—> ParentComp重新渲染
—> MyContext.Provider的value变更
—> 每一个子组件因为使用useContext(MyContext)都将触发重渲染
```

既然会触发重渲染，我在业务组件外包一层，让业务组件缓存起来可以吗？

## 改进方案一：props传入

定义一个组件ChildComp1Data，把ChildComp1组件中从context中获取数据的逻辑转移到这个组件，然后数据作为props传入到ChildComp1。

把ChildComp1改成以下：

```tsx
// 读取context数据
export const ChildComp1 = React.memo(
  ({ setRandomData }: { setRandomData: () => void }) => {
    console.log("ChildComp1, 渲染了");
    return (
      <div>
        child1, <button onClick={setRandomData}>按钮</button>
      </div>
    );
  },
);

const ChildComp1Data = React.memo(() => {
  const { setRandomData } = useContext(MyContext);
  console.log("ChildComp1Data, 渲染了");
  return <ChildComp1 setRandomData={setRandomData} />;
});
```

**运行结果**

```
ParentComp, 渲染了
ChildComp1Data, 渲染了
ChildComp2, 渲染了
```

可以看到触发按钮后，ChildComp1组件不会被重新渲染，只是重新渲染了ChildComp1Data，相比起原有实现，确实优化了（因为没有很多逻辑需要重新执行）

**问题**

但是每一个组件都需要额外去封装一个获取数据的数据层组件（好像用处也不是很大）。

## 改进方案二：拆分多个Context

把方法和值拆开，放置到两个Context上：

```tsx
// 创建context
const ValueContext = React.createContext<number>(0);
const MethodContext = React.createContext<() => void>(() => {});

// 设置context数据
export const ParentComp = React.memo(() => {
  console.log("ParentComp, 渲染了");
  const [value, setValue] = useState(0);
  const setRandomData = useCallback(() => {
    setValue(Math.random() * 10000);
  }, []);
  return (
    <MethodContext.Provider value={setRandomData}>
      <ValueContext.Provider value={value}>
        <div>
          ParentComp
          <ChildComp1 />
          <ChildComp2 />
        </div>
      </ValueContext.Provider>
    </MethodContext.Provider>
  );
});

// 读取context数据
export const ChildComp1 = React.memo(() => {
  console.log("ChildComp1, 渲染了");
  const setRandomData = useContext(MethodContext);
  return (
    <div>
      child1, <button onClick={setRandomData}>按钮</button>
    </div>
  );
});
export const ChildComp2 = React.memo(() => {
  console.log("ChildComp2, 渲染了");
  const value = useContext(ValueContext);
  return <div>child2, {value}</div>;
});
```

这种拆分方式也可以作为部分数据经常变、部分数据是常量的Context优化。

**结果**
点击"按钮"后，浏览器控制台的输出结果：

```
ParentComp, 渲染了
ChildComp2, 渲染了
```

可以看到，ChildComp1不会被渲染，已经达到优化的目的。

**问题**

但是问题又来了，一个上下文如果有多个方法怎么办？

## 改进方案三：使用Ref包装方法对象

传入一个不会变的对象到上下文，比如用useRef包装方法对象。

使用用Ref改进：

```tsx
// 创建context
const ValueContext = React.createContext<number>(0);
const MethodContext = React.createContext<{ [key: string]: any }>({});

// 设置context数据
export const ParentComp = React.memo(() => {
  console.log("ParentComp, 渲染了");
  const [value, setValue] = useState(0);
  const setRandomData = useCallback(() => {
    setValue(Math.random() * 10000);
  }, []);
  const resetData = useCallback(() => {
    setValue(0);
  }, []);
  const ref = useRef({});
  useEffect(() => {
    ref.current = {
      setRandomData,
      resetData,
    };
  }, [setRandomData, resetData]);
  return (
    <MethodContext.Provider value={ref}>
      <ValueContext.Provider value={value}>
        <div>
          ParentComp
          <ChildComp1 />
          <ChildComp2 />
        </div>
      </ValueContext.Provider>
    </MethodContext.Provider>
  );
});

// 读取context数据
export const ChildComp1 = React.memo(() => {
  console.log("ChildComp1, 渲染了");
  const context = useContext(MethodContext);
  const setRandomData = () => {
    const setRandomData = context.current.setRandomData;
    setRandomData();
  };
  return (
    <div>
      child1, <button onClick={setRandomData}>按钮</button>
    </div>
  );
});
export const ChildComp2 = React.memo(() => {
  console.log("ChildComp2, 渲染了");
  const value = useContext(ValueContext);
  return <div>child2, {value}</div>;
});
```

**结果**

```
ParentComp, 渲染了
ChildComp2, 渲染了
```

ChildComp1不会被渲染

**问题**

- 可以看到，麻烦，非常麻烦，引入了current
- 新增方法后，还得放置到ref上
- 为了provider上的value不变，所有共享数据放在同一个state上，这样各个数据耦合程度高，更新数据时很麻烦。

有没有既能数据更新方便，也能减少组件无效重渲染的问题？

我们使用Redux能解决这个问题，当然，如果使用Redux我们就不需要使用useContext了，这篇文章就没必要存在了🐶，
对于小规模的系统，但是想实现组件间的共享，我们现在可以引出本文的另外一位主角：useReducer。

## 改进方案四\*：结合useReducer

结合useReducer使用，reducer就是一个迷你Redux，数据触发和Redux很类似。

如果不了解，简单解释一下：

- 通过dispatch去触发更新数据，参数传入一个type
- 触发更新数据后，useReducer中的reducer函数执行具体的逻辑，执行什么逻辑根据dispatch传入的type来决定
- reducer执行完成后，需要返回一个新state数据，去更新数据，注意合并旧数据

更多内容可以看看useReducer的[官方说明](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)。

那让我们直接开始改造：

```tsx
import React, { useContext, useReducer } from "react";
interface ValueType {
  count: number;
}
// 创建context
const ValueContext = React.createContext<ValueType>({ count: 0 });
const MethodContext = React.createContext<any>({});

// 设置context数据
export const ParentComp = React.memo(() => {
  console.log("ParentComp, 渲染了");
  const [value, dispatch] = useReducer(
    (preState: ValueType, { type }: { type: string }) => {
      switch (type) {
        case "setRandomData":
          return {
            ...preState,
            count: Math.random() * 10000,
          };
        case "addData":
          return {
            ...preState,
            count: preState.count + 1,
          };
        case "resetData":
          return {
            ...preState,
            count: 0,
          };
      }
    },
    { count: 0 },
  );
  return (
    <MethodContext.Provider value={dispatch}>
      <ValueContext.Provider value={value}>
        <div>
          ParentComp
          <ChildComp1 />
          <ChildComp2 />
        </div>
      </ValueContext.Provider>
    </MethodContext.Provider>
  );
});

// 读取context数据
export const ChildComp1 = React.memo(() => {
  console.log("ChildComp1, 渲染了");
  const dispatch = useContext(MethodContext);
  const setRandomData = () => {
    dispatch({ type: "setRandomData" });
  };
  return (
    <div>
      child1, <button onClick={setRandomData}>按钮</button>
    </div>
  );
});
export const ChildComp2 = React.memo(() => {
  console.log("ChildComp2, 渲染了");
  const { count } = useContext(ValueContext);
  return <div>child2, {count}</div>;
});
```

**结果**

```
ParentComp, 渲染了
ChildComp2, 渲染了
```

ChildComp1不会被渲染，而且一个上下文可以不断新增多个方法，比如上述例子中新增的addData、resetData。
当然，定义很多方法时候，可以自行抽离方法，不需要把所有的逻辑代码都直接写在reducer中。

## 总结

- 并不是说使用useContext就一定要搭配useReducer使用，只是其作为一种推荐优化手段
- 如果组件业务逻辑不多，组件内逻辑也不多，组件内性能做好优化，context的使用按常规方式消耗的性能也影响不大
- 如果组件不多，也可以使用改进方案1，相对比较简单，容易理解，不会引入useReducer去额外处理
- 改进方案2可以作为共享数据中部分是极少改变的数据，部分是经常改变的数据的优化方式
