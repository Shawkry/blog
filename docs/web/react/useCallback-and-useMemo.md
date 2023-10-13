---
id: useCallback-and-useMemo
sidebar_position: 0
sidebar_label: useCallback和useMemo性能优化
---

# useCallback 和 useMemo 性能优化

> 是否还在遇事不决，useCallBack？遇事不决，useMemo？是否还在想着在创建方法时只要使用 useCallback wrap（声明变量使用 useMemo wrap）就能达到性能优化的玄学，
是否在多数情况下使用 useCallback 或者 useMemo 的原因是“大家都在用”，所以我也要用。

![img.png](images/Untitled.png)

哒咩！这样是不对滴

本文将探索React的性能优化，了解在什么情况下需要用到 useCallBack、useMemo、memo 才能真正实现性能优化避免重复渲染，降低心智负担，告别玄学优化。

## 前置知识

官网解释：

useCallBack: [官网解释](https://zh-hans.react.dev/reference/react/useCallback)

useMemo: [官网解释](https://zh-hans.react.dev/reference/react/useMemo)

memo: [官网解释](https://zh-hans.react.dev/reference/react/memo)

**导致React组件re-render的唯二两种情况：**

1. props 或者 states 改变（浅比较）
2. 父组件重新渲染

## useCallBack

### 作用
`useCallBack`：缓存函数,避免函数重复创建

`memo`：允许组件在 props 没有改变的情况下跳过重新渲染

### 实践
先看毫无优化过的代码举例：
```tsx
const Child = ({ onClick }: { onClick: () => void }) => {
    console.log("Child 渲染啦！");
    return (
        <div>
            <button onClick={onClick}>Click</button>
        </div>
    );
};
const Parent = () => {
    console.log("Parent 渲染啦！");
    const [count, setCount] = useState(0);
    const handleClick = () => {
        console.log("handleClick被调用啦！");
    };
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <Child onClick={handleClick} />
        </div>
    );
};
```
点击「+」按钮，控制台显示结果：
```
Parent 渲染啦！
Child 渲染啦！
```

这时我们发现不对劲了，我点击「+」按钮，更新Parent组件的State：“count”，又没动你Child组件，干嘛重复渲染？我就是不想让你渲染！优化优化！

然后我们分析一下代码，发现子组件用到了「handleClick」方法，那么会不会就是因为这个方法在父组件上，而父组件又更新才导致的重复渲染呢？

我们尝试用useCallback包裹一下这个方法，毕竟useCallback可以**缓存函数,避免函数重复创建**，看看能不能解决：
```tsx
const Child = ({ onClick }: { onClick: () => void }) => {
    console.log("Child 渲染啦！");
    return (
        <div>
            <button onClick={onClick}>Click</button>
        </div>
    );
};
const Parent = () => {
    console.log("Parent 渲染啦！");
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log("Click按钮被点击啦！");
    },[]);
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <Child onClick={handleClick} />
        </div>
    );
};
```
点击「+」按钮，控制台显示结果：
```
Parent 渲染啦！
Child 渲染啦！
```

好像，什么事都没有发生。。。为什么呢？

因为 **useCallback 只是避免函数定义的重复创建，但不能避免组件的重复渲染**，React组件 re-render 的唯二两种情况之一：父组件更新，父组件都更新了你子组件凭什么不更新🐶。

那么是不是就没办法优化了呢？非也，可以看到我们不是还有个 memo 吗，memo 的功能不是**允许组件在 props 没有改变的情况下跳过重新渲染**吗。这下是在说组件重新渲染的事了吧，那么我们回归到代码最初的模样，加上 memo 再试试：
```tsx
const Child = memo(({ onClick }: { onClick: () => void }) => {
    console.log("Child 渲染啦！");
    return (
        <div>
            <button onClick={onClick}>Click</button>
        </div>
    );
});
const Parent = () => {
    console.log("Parent 渲染啦！");
    const [count, setCount] = useState(0);
    const handleClick = () => {
        console.log("handleClick被调用啦！");
    };
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <Child onClick={handleClick} />
        </div>
    );
};
```

点击「+」按钮，控制台显示结果：
```
Parent 渲染啦！
Child 渲染啦！
```

。。。这不是还是没用吗？官方文档在骗人，memo其实一点用也没有？

让我们再回到本小节最开始 memo 的 [作用](#usecallback) 部分，可以看到 memo 的作用是：允许组件**在 props 没有改变的情况下**跳过重新渲染。
那么点击「+」修改了“count”导致父组件更新，父组件更新其中的「handleClick」方法是不是会重新声明，重新声明的话「handleClick」方法作为 props 传入子组件是不是就不属于没有改变的情况，那么还会跳过重新渲染吗？答案当然是不会。

讲了这么多，其实就是想讲清楚为什么 useCallback 和 memo 在避免重复渲染的绝大部分场景下，一定要组合起来用才有效果。
很多情况下的玄学优化就是因为不清楚 useCallback 的作用是什么，为什么要用useCallback。

正确优化方法（useCallback && memo 组合拳）：
```tsx
const Child = memo(({ onClick }: { onClick: () => void }) => {
    console.log("Child 渲染啦！");
    return (
        <div>
            <button onClick={onClick}>Click</button>
        </div>
    );
});
const Parent = () => {
    console.log("Parent 渲染啦！");
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log("handleClick被调用啦！");
    }, []);
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <Child onClick={handleClick} />
        </div>
    );
};
```

点击「+」按钮，控制台显示结果：
```
Parent 渲染啦！
```

Child组件不再重复渲染，优化成功！

## useMemo

### 作用

+ 跳过代价昂贵的重新计算

### 实践

当某个计算属性非常复杂，我们不希望这个计算属性的重复渲染的时候，可以使用 useMemo 优化。

示例代码：
```tsx
const Parent = () => {
    const [count, setCount] = useState(0);
    const [irrelevantValue, setIrrelevantValue] = useState(0);
    // 不使用useMemo累加count 100次
    const countSumHundred = () => {
        let result = 0;
        for (let i = 0; i < 100; i++) {
            result += count;
            console.log("我在飞快的运算");
        }
        return result;
    };
    // 使用useMemo累加count 100次
    const memoCountSumHundred = useMemo(() => {
        let result = 0;
        for (let i = 0; i < 100; i++) {
            result += count;
            console.log("我被memoized，我在飞快的运算");
        }
        return result;
    }, [count]);
    return (
        <div>
            <div>count: {count}</div>
            <div>count的一百次累加：{countSumHundred()}</div>
            <div>count的一百次累加(useMemo)：{memoCountSumHundred}</div>
            <button onClick={() => setCount((pre) => pre + 1)}>count+1</button>
            <br />
            <button onClick={() => setIrrelevantValue((pre) => pre + 1)}>
                更新Parent组件
            </button>
        </div>
    );
};
```

点击「count+1」按钮结果：
```
100 我被memoized，我在飞快的运算
100 我在飞快的运算
```
点击「更新Parent组件」按钮结果：
```
100 我在飞快的运算
```

可以看到，只有 count 值变化导致的更新才会使被useMemo包裹的计算属性重新计算，而没有被useMemo包裹的计算属性，无论怎么样的更新都会进行重新计算。
例子中count 100次累加其实并不属于需要大量计算的情况只是作为假设，但是当我们遇到了真正复杂的情况，要学会灵活运用useMemo来优化我们的项目。

## 总结

我们要负责任地使用 useMemo 以及 useCallback 和 memo 组合。
当需要缓存高开销计算的值时使用 useMemo ，在防止子组件进行不必要的渲染时，配合 memo 使用 useCallback。告别玄学优化！