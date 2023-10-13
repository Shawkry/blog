---
id: business-component
sidebar_position: 1
sidebar_label: 抽离业务组件
---

# 抽离业务组件

## 前置准备

日常开发中可能会遇到这样的场景，某些UI组件经常会在不同的需求中重复需要使用到，但这些组件不只是Antd的单一组件，或许是需要基于Antd组件进行UI修改、功能扩充而实现的新组件，或许是需要几个antd组件组合联动起来实现的组件等等，重复造轮子🛞是很累的，每次都从之前的项目中cv出来也显得不够专业且麻烦。

那么我们就可以封装一个专门的组件库，每次需要用到这些组件的时候，可以像Antd一样开箱即用，降低开发成本。本章节会基于Antd封装一个Poke组件，由浅入深地指引如何将组件从项目工程抽离并封装成到组件库elephant-design/poke中。

|                           | 说明                   |
|---------------------------|----------------------|
| Poke组件                    | 点击按钮之后会显示一个文字提示「戳一戳」 |
| 会用到的Antd组件                | Button，Tooltip       |
| 项目1（Project）              | 用于本地调试组件功能的React项目   |
| 项目2（elephant-design/poke） | 用于抽离Poke组件的React项目   |

使用create-react-app 新建「elephant-design/poke」项目

目录结构：

```
elephant-design/poke
    |- src
        |- Poke.tsx
        |- index.ts
```

Poke.tsx 代码：

```tsx
import { Button, Tooltips } from "antd";
export const Poke = () => {
  return (
    <Tooltip title="戳一戳">
      <Button>按钮</Button>
    </Tooltip>
  );
};
```

index.ts 代码：

```tsx
export { Poke } from "@/Poke";
```

既然Button、Tooltip可以从Antd组件库中直接引入，那么同理，Poke同样可以做成我们的业务组件库中的组件像Antd一样npm直接安装，开箱即用。

## 抽离方法

### cv大法：源码模式

那么可能有人就会有这样的疑问了，既然在项目工程中已经封装好了这个Poke组件了，那我是不是可以直接cv这个Poke.tsx文件到业务组件库的npm仓库中发布，之后直接执行 npm i @elephant/poke 就好了。
比如像这样：

```tsx
/** 目录结构
project
    |- node_modules
    |    |- @elephant/poke
    |        |- index.ts
    |        |- poke.tsx
    |- src
        |- app.tsx
**/
// app.tsx
import React from "react";
import ReactDOM from "react-dom";
import { Poke } from "@elephant/poke";
const App = () => {
  return (
    <div className="App">
      <Poke />
    </div>
  );
};
```

> 那我只能说：确实可以！

但完全不建议，在工程中直接引用组件源码开发，那么**后续的构建，都会由工程决定**。
所以如果实现的不是很好，业务项目构建反而需要兼容@elephant/poke的代码，这违背了我们抽离成业务组件库的初衷：简单，开箱即用。

### 推荐做法：ESM + Babel + Rollup

那么我们有什么办法能够让它在不依赖外部工程构建的前提下，能够使用组件功能呢？

答案是：我们可以在工程内提前把他构建成一个标准的[ES Module](https://es6.ruanyifeng.com/#docs/module#%E6%A6%82%E8%BF%B0)再给业务工程使用

这一套基本的构建流程可以是[ES Module](https://es6.ruanyifeng.com/#docs/module#%E6%A6%82%E8%BF%B0) + [babel](https://www.babeljs.cn/) + [rollup](https://www.rollupjs.com/)

> 这里的例子使用[rollup](https://www.rollupjs.com/)，它的优缺点本文不做介绍

所以我们需要在@elephant/poke中将这个Poke组件在重新用rollup构建一遍。

首先安装rollup、babel以及相关插件，rollup可以全局安装，然后再在@elephant/poke项目根目录下新增rollup.config.js。

```js
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.js",
    plugins: [
      commonjs(),
      babel({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        presets: ["@babel/preset-react"],
      }),
      typescript(),
    ],
    output: {
      file: "./dist/index.es.js",
      format: "esm",
    },
  },
];
```

然后直接在命令行跑起来

```bash
# ~@elephant/poke
rollup -c
```

Many years later ～，就会在dist下输出一个index.es.js产物，此时的目录是这样的

```
@elephant/poke
|- dist
|    |- index.es.js
|- src
|    |- poke.tsx
|    |- index.ts
|- package.json
|- rollup.config.js
```

至此，大功告成，此时的index.es.js就是经历过babel、typescript以及rollup附魔后的产物了

那么其他工程就可以直接引用@elephant/poke/dist/index.es.js来使用里面的组件了

### rollup构建补充

但是，再仔细看是不是感觉还是不太对劲🤔？为啥要引用目录这么长，为啥引入使用组件，会有Invalid hook call之类的报错提示呢？

我们来一步步分析：

1. 为什么不能直接用@elephant/poke，而需要用elephant/poke/dist/index.es.js才能正常引入组件呢？

其实很简单，因为此时package.json并没有标识导出的是什么东西，所以在package.json中添加下面几行即可

```json
{
  "module": "./dist/index.es.js",
  "exports": {
    ".": {
      "import": "./dist/index.es.js"
    }
  }
}
```

有关这几个字段的解释，可以参考[这篇文章](https://juejin.cn/post/6972006652631318564)

2. 为什么会有Invalid hook call之类的报错提示呢？

跟package.json以及rollup.config.js都有关
此时的package.json大致应该长这样：

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.23.0",
    "@babel/core": "^7.23.0",
    "@babel/preset-react": "^7.22.15",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-typescript": "^11.1.4"
  }
}
```

而rollup此时的配置行为，会将代码中所有引用的模块都打包进去
所以dependencies中的包都会被打进去，但是业务工程的项目中不是已经有React了么？
此时如果跑起来业务工程的项目，会存在2个React，这就是Invalid hook call的报错由来

所以我们应该怎么做？

答案只有一个： _peerDependencies_，peerDependencies中的包会随着npm i @elephant/poke一同校验版本并且安装，再具体一点的话可以看一看这一篇文章：[package.json依赖总结](/docs/web/node/dependency-summary)。

那么我们现在来整理一下我们需要整理一下package.json中的包结构，如下

```
{
  "peerDependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.23.0",
    "@babel/core": "^7.23.0",
    "@babel/preset-react": "^7.22.15",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-typescript": "^11.1.4"
  }
}
```

> PS：上面package.json包结构列举中特意没有列举Antd，主要是需要看具体的业务需求，如果这个组件库的默认使用前提是安装Antd，那么Antd就必须和react一样在peerDependencies中声明，如果不是那么就需要dependencies中声明。

## 添加类型提示

没有类型提示的组件库，那是没有灵魂的，新增类型提示，方便组件使用者更好的引用组件以及debug。

我们可以使用`rollup-plugin-dts-bundle-generator`这个库在打包的时候自动生成*.d.ts文件以实现类型提示。
```shell
npm i rollup-plugin-dts-bundle-generator -D
```

修改rollup.config.js文件,新增generateDtsBundle
```js
import { generateDtsBundle } from 'rollup-plugin-dts-bundle-generator'
export default [
    {
        input: "src/index.js",
        plugins: [
            // ...,
            generateDtsBundle({
                outFile: 'dist/types/index.d.ts',
            }),
            // ...,
        ],
    },
];
```

修改package.json文件,新增「types」字段
```json
{
  "module": "./dist/index.es.js",
  "types": "./dist/types/index.d.ts"
}
```

最后`rullup -c`，可以看到dist文件中多了一个types/index.d.ts文件

## 本地调试

开发组件要调试最后的dist文件是否正确，如果上传到npm之后再引入@elephant/poke来验证肯定不是一个好的办法，那么我们怎么实现本地调试呢。

方法一：npm link

需要注意的是如果使用link的话，项目内的node_modules也会被带进去，当外层引用Poke的时候，Poke的代码又使用了React，但npm会由内到外找到最近的node_modules中的React，就会导致Invalid hook call报错，这里是React官方解释（可能存在多个React副本）。

方法二：在业务工程项目的node_modules中新建@elephant/poke目录，再手动将dist目录和package.json复制粘贴到@elephant/poke目录，最后直接调用。

缺点是每次都需要手动操作。

方法三：使用自动化形式将dist目录和package.json复制粘贴到业务工程项目的node_modules中（对，还是复制粘贴）

在工程根目录下新建mixinProject.js

```js
const fs = require("fs");
const path = require("path");
// 当前目录文件 -> 目标目录文件，替换具体的目录路径，需要注意的是这里都是相对路径
const pathMap = {
  "./dist/index.es.js": "../project/node_modules/@xxx/poke/dist/index.es.js",
  "./package.json": "../project/node_modules/@xxx/poke/package.json",
};
Object.entries(pathMap).map((c) => {
  const [source, target] = c.map((_c) => path.join(__dirname, _c));
  fs.cpSync(source, target);
  console.log(source, "-->", target);
});
```

集成到package.json 命令

```json
{
  "scripts": {
    "mixin": "node mixinProject.js"
  }
}
```
