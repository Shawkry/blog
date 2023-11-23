---
id: singleton-pattern
sidebar_position: 1
sidebar_label: singleton-pattern
description: 单例模式
keywords: [单例模式, singleton-pattern, 设计模式]
---

# 单例模式 (Singleton Pattern)

> 保证一个类只能有一个实例，并提供一个全局访问点

## 意图解决

当出现需要我们维护一个全局实例对象时，就可以考虑使用单例模式

1. 全局弹窗（登录框，信息提升框）
2. 购物车 (一个用户只有一个购物车)
3. 全局态管理 store (Redux、Vuex)

## 简单使用

```ts
const obj = {
    getInstance: () =>{},
    ...
}
```

以对象字面量方式实例化一个obj对象，
