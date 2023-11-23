---
id: design-pattern
sidebar_position: 1
sidebar_label: 设计模式
description: 单例模式
keywords: [单例模式, singleton-pattern, 设计模式]
---

# 设计模式

> 期望能不只是简单罗列各种设计模式，而是真的结合实际工作开发中，使用设计模式让代码变得更优雅，不定时更新～

## 设计模式境界

[《深入浅出设计模式（HFDP，Head First Design Pattern)》](https://book.douban.com/subject/1488876/)的作者说，使用设计模式有3个层次：

- Beginner——初级的时候无处不用设计模式，认为用的模式越多，设计就越好
- Intermediate——中级的时候知道何时该用什么设计模式，什么时候不该用
- Zen——到了禅的境界，设计模式被用来简化设计，让设计更优雅

## 设计模式原则

- **S – Single Responsibility Principle 单一职责原则**
    - 一个程序只做好一件事
    - 如果功能过于复杂就拆分开，每个部分保持独立
- **O – OpenClosed Principle 开放/封闭原则**
    - 对扩展开放，对修改封闭
    - 增加需求时，扩展新代码，而非修改已有代码
- L – Liskov Substitution Principle 里氏替换原则
    - 子类能覆盖父类
    - 父类能出现的地方子类就能出现
- I – Interface Segregation Principle 接口隔离原则
    - 保持接口的单一独立
    - 类似单一职责原则，这里更关注接口
- D – Dependency Inversion Principle 依赖倒转原则
    - 面向接口编程，依赖于抽象而不依赖于具体
    - 使用方只关注接口而不关注具体类的实现