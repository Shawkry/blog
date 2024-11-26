---
id: naming
sidebar_position: 0
sidebar_label: TypeScript 命名规范
title: TypeScript 命名规范
description: TypeScript 命名规范
keywords: [TypeScript 命名规范建议]
---

# TypeScript 命名规范

:::info
计算机科学只存在两个难题：缓存失效和怎么命名

本文其实可以说都是建议，是我认为命名的最佳实践
:::

## 常用命名法

### 🐫 小驼峰命名法

英文名：Lower Camel Case

规范：

- _禁止_ 出现字母或数字之外的字符
- 第一个单词首字母 _必须_ 是小写字母，从第二个单词开始首字母 _必须_ 大写
- 其他非单词首字母的字母 _必须_ 全部小写（如果是缩写短语，如URL、HTML等情况 _允许_ 大写）

```
userID
dataList
```

### 🐫 大驼峰命名法

英文名：Upper Camel Case

规范：

- _禁止_ 出现字母或数字之外的字符
- 所有单词的首字母 _必须_ 是大写字母
- 其他非单词首字母的字母 _必须_ 全部小写（如果是缩写短语，如URL、HTML等情况 _允许_ 大写）

```
UserList
BigInt
JavaScript
```

### 🐍 小蛇式命名法

英文名：Lower Snaked Case

规范：

- _禁止_ 出现字母、数字或下划线之外的字符
- 每个单词之间 _必须_ 要用下划线 \_ 进行分割
- 所有字母 _必须_ 小写

```
create_user
left_shift
```

### 🐍 大蛇式命名法

英文名：Screaming Snake Case

规范：

- _禁止_ 出现字母、数字或下划线之外的字符
- 每个单词之间 _必须_ 要用下划线 \_ 进行分割
- 所有字母 _必须_ 大写

```
MAX_SAFE_INTEGER
MIN_QUERY_SIZE
```

### 🍢 烤肉串命名法

英文名：Kebab Case

规范：

- 一般 _建议_ 以字母、数字或横短符组成
- 所有单词 _建议_ 都是小写
- _必须_ 以横短线作为分隔符，_禁止_ 使用空格作为分隔符

```
font-family
background-color
```

### 🇭🇺 匈牙利命名法

> 非常 _不建议_ 使用，可以当作科普

英文名：Hungarian Notation

规范：

- 基本原则是 变量名=属性+类型+对象描述
- 标识符的名字 _必须_ 以一个或者多个小写字母开头作为前缀
- 前缀之后 _必须_ 是首字母大写的一个单词或多个单词组合，该单词要指明变量的用途

```
int iCount;          // 属性：无，类型：整数，对象描述：计数器
float fPrice;        // 属性：无，类型：浮点数，对象描述：价格
char cInitial;       // 属性：无，类型：字符，对象描述：初始值
bool bIsValid;       // 属性：无，类型：布尔，对象描述：有效性标志
int arrNumbers[10];   // 属性：无，类型：数组，对象描述：包含10个整数

int gGlobalVar;       // 属性：全局，类型：整数，对象描述：全局变量
float mMemberVar;     // 属性：成员，类型：浮点数，对象描述：类成员变量
int* pIntPtr;         // 属性：指针，类型：整数，对象描述：整型指针
long int* lpLongIntPtr;// 属性：指针，类型：长整数，对象描述：长整型指针

int nTotalCount;      // 属性：无，类型：整数，对象描述：计数器
char szName[50];      // 属性：无，类型：字符数组，对象描述：以null结尾的字符串

```

一些常用的前缀类型：

```
a      数组（Array）
b      布尔值（Boolean）
by     字节（Byte）
c      有符号字符（Char）
cb     无符号字符（Char Byte，并没有神马人用的）
cr     颜色参考值（Color Ref）
cx,cy  坐标差（长度 Short Int）
dw     双字（Double Word）
fn     函数（Function）
h      Handle（句柄）
i      整形（Int）
l      长整型（Long Int）
lp     长指针（Long Pointer）
m_     类成员（Class Member）
n      短整型（Short Int）
np     近程指针（Near Pointer）
p      指针（Pointer）
s      字符串（String）
sz     以 Null 做结尾的字符串型（String with Zero End）
w      字（Word）
```

## 文件和目录命名规范

### 目录名

- 目录名 _建议_ 不要包含字母、数字以外的字符
- 在 `src` 目录下的同级目录 _必须_ 使用相同的命名规范
- 在 `src` 目录下的前端组件目录，名称都 _建议_ 采用大驼峰命名法

### 文件名

- 文件名 _禁止_ 包含字母、数字，点号、短横杠和下划线以外的字符
- 在 `src` 目录下的前端组件文件，名称 _建议_ 采用大驼峰命名法
- 在 `src` 目录下的文件，名称包含多个单词，_建议_ 使用小驼峰命名法
- 对于包含命名空间的文件，_可以_ 在文件名中使用点号（.）分隔标识符
- _可以_ 在文件名突出作用性，比如util文件名称最后以「Util」结尾

## 代码标识符命名规范

### 变量

定义：指使用 let 或 ~~var~~ 关键词定义的可修改的变量。

规范：任何变量（包括局部变量和全局变量） _建议_ 使用小驼峰命名法


```typescript
let userName = "Jack";
let gender = "Male";
```

### 常量

定义：指使用 const 关键词定义的不可修改的变量。

常量按照作用分为两类：

1. 魔术常量
2. 常变量

#### 魔术常量

定义：指程序内的用以代替魔术值（Magic Values，即无法自描述的字面量）的常量

规范：魔术常量 _必须_ 使用大蛇式命名法

```typescript
const DEFAULT_SIZE = 1024;
const EMAIL_MIN_LENGTH = 3;
```

#### 常变量

定义：指局部变量中，定义后不会修改的变量，用 const 定义，防止其内容被误改。

规范：常变量 _必须_ 使用与变量一样的小驼峰命名法

```typescript
const idList: string[] = [];
const getUserId = (): void => {};
```

### 函数

定义：指为了执行特定任务而编写的可重复使用的代码块。

规范：

- 除了装饰器和类的方法，其它函数 _必须_ 使用小驼峰命名法
- 除了通用工具函数，其它普通业务函数 _建议_ 使用 `<动词><名词>[<介词><名词>]` 的命名格式
- _建议_ 尽量通过函数名就可以看得出函数实现的功能
- 函数形参的命名与普通变量的命名 _必须_ 保持一致，但是如果是未使用的非尾部参数，_必须_ 加上下划线 \_ 作为前缀

```typescript
function getUerName(): void {}
function addUser(): void {}
function attachRoleToUser(): void {}
function print(_name, age): void {
  console.log(age);
}
```

### 装饰器

定义：指一种动态地在代码运行时添加功能的方法。

规范：装饰器函数/方法 _必须_ 使用大驼峰命名法。

```typescript
function Inject(): PropertyDecorator {}
function Controller(): ClassDecorator {}
function API(): MethodDecorator {}
```

### 类

定义：类是用于创建对象的模板。

规范：类 _必须_ 使用大驼峰命名法

```typescript
class Role {}
class Account {}
class AccountAttachedRole {}
```

### 枚举

定义：指一种数据结构，它定义了一个有限的具名常量集。

规范：枚举类型的成员 _必须_ 使用大蛇式命名法，因为其等效于魔术常量

```typescript
enum STATUS {
  ACTIVE,
  INACTIVE,
  ON_HOLD,
}
enum HTTP_CODE {
  SUCCESS = 200,
  NOT_FOUND = 404,
}
```

### 接口类型

定义：指使用 interface 关键字定义的类型。

规范：

- 接口类型 _必须_ 使用大驼峰命名法，_不建议_ 使用 I 作为前缀（匈牙利命名法时代已经过去了！）
- 接口属性 _必须_ 使用小驼峰命名法
- 接口方法 _必须_ 使用小驼峰命名法

```typescript
interface UserInfo {
  id: string;
  name: string;
  isActive: boolean;
}
interface InputProps {
  value: string;
  onChange: () => void;
}
```

### 类型别名

定义：指使用 type 关键字定义的类型。

规范：类型别名 _必须_ 使用大驼峰命名法

```typescript
type Gender = "male" | "female";
```

### 泛型形参

定义：在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

规范：TypeScript 中的泛型形参 _必须_ 使用大驼峰命名法 ，在只有一个泛型形参的时候，_建议_ 简写为 T

常见泛型变量如下：

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

```typescript
interface UserInfo {
  [K in string]: string;
}
function flatten<T>(arrayList: T[][]): T[] {
  return arrayList.flat();
}
```

### 命名空间

> 由于 es6 module 的兴起，ts 中原始 namesapce 的写法已经逐渐被废弃，在业务中应使用 module 代替。

定义：指通过 `import * as XXX from 'libxxx'` 语法产生的导入型命名空间，其中的 XXX 就是命名空间。

规范：

由于其中的一些库已经被广泛使用，因此遵循它们的特殊规则反而能够获得更好的可读性。这些特例包括：

- jQuery，使用 $ 前缀
- three.js，使用 THREE 前缀
- lodash，使用 \_ 前缀

除此之外，其它任何命名空间 _建议_ 使用小驼峰命名法

```typescript
import * as fooBar from "./foo_bar";
```
