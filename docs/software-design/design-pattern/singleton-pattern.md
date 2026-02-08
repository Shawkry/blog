---
id: singleton-pattern
sidebar_position: 0
sidebar_label: 单例模式
title: 单例模式
description: 单例模式
keywords: [单例模式, singleton-pattern, 设计模式, design-pattern]
---

# 单例模式 (Singleton Pattern)

> 保证一个类只能有一个实例，并提供一个全局访问点

## 优点

1. **节约资源**：单例模式确保一个类只有一个实例，减少内存开销，节约系统资源。
2. **全局访问**：提供全局访问点，方便在不同的组件中共享实例。
3. **控制实例数量**：避免了多个实例带来的数据不一致性问题。

## 解决场景

1. 不需要使用者创造它的实例对象，直接供使用者调用
2. 需要用一些行为进行限制，比如全局只需要一个实例（消息弹窗、购物车等）

## 示例

### 🐨 懒汉模式单例

**特点：**

- 第一次访问时才创建实例
- 延迟加载，避免了在应用启动时不必要的内存开销

```tsx
class Singleton {

    /**
     * 内部持有全局唯一的实例
     */
    private static _$instance: Singleton;
    public readonly id: number;

    private constructor() {
        this.id = Math.random();
        console.log('Singleton被实例化');
    }

    /**
     * 暴露访问其唯一实例的访问方法
     * @returns
     */
    public static getInstance(): Singleton {
        if (!Singleton._$instance) {
            Singleton._$instance = new Singleton();
        }
        return Singleton._$instance;
    }
}

/*
  使用示例，输出结果：
  第一次调用
  Singleton被实例化
  第二次调用
  是否是相同实例 true
*/
console.log('第一次调用');
const singleton1 = Singleton.getInstance();
console.log('第二次调用');
const singleton2 = Singleton.getInstance();
console.log('是否是相同实例', singleton1 === singleton2);
```

### ⚡️ 饿汉模式单例

**特点：**

- 程序启动时就实例化对象
- 线程安全，不需要加锁

```tsx
class Singleton {

    /**
     * 内部持有全局唯一的实例
     */
    private static readonly _$instance: Singleton = new Singleton();

    public readonly id: number;

    private constructor() {
        this.id = Math.random();
        console.log('Singleton被实例化');
    }

    /**
     * 暴露访问其唯一实例的访问方法
     * @returns
     */
    public static getInstance(): Singleton {
        return Singleton._$instance;
    }

    public getId(): number {
        return this.id;
    }
}

/*
  使用示例，输出结果：
  Singleton被实例化
  第一次调用
  第二次调用
  是否是相同实例 true
*/
console.log('第一次调用');
const singleton1 = Singleton.getInstance();
console.log('第二次调用');
const singleton2 = Singleton.getInstance();
console.log('是否是相同实例', singleton1 === singleton2);
```

### 📦 模块化模式单例（推荐）

**特点：**

- 利用 ES6 模块的特性，模块本身的单例特性来实现单例模式
- 简洁且自然而然地避免了多次实例化

```tsx
// ModuleSingleton.ts
class ModuleSingleton {
    private _count: number = 0;

    public constructor() {
        console.log('Singleton 被实例化了');
    }

    public increment(): void {
        this._count++;
    }

    public getCount(): number {
        return this._count;
    }
}

/* 直接实例化类并导出 */
export default new ModuleSingleton();

/* test1.ts 和 test2.ts 顺序执行 */

// test1.ts
console.log(Singleton.getCount()); // 0
Singleton.increment();
console.log(Singleton.getCount()); // 1

// test2.ts
console.log(Singleton.getCount()); // 1
Singleton.increment();
console.log(Singleton.getCount()); // 2
```
