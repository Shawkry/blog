---
id: knowledge-expansion
sidebar_position: 2
sidebar_label: GraphQL 扩展
---

# GraphQL 扩展

在GraphQL 基础知识中介绍了常用的几个的知识点，其中有案例讲到筛选数据filter，但是实际GraphQL并没有提供筛选/排序/分组/聚合这类语法。
而能实现项目列表的筛选，需要我们自己在服务端的搭建中实现了这些语法，并且基于标准语法做了约定和定制处理。本文将基于笔者之前所在公司搭建的GraphQL 服务，不涉及到具体如何搭建，只介绍一些语法的使用，起到拓展和参考的作用。

## 约定

- 属性名命名使用驼峰，非下划线，下划线用于区分自定义属性的id和筛选器查询条件
- 每个item都有一个key
- 动态scheme，方便自定义属性的schema校验
- 实现了筛选、排序、分组、聚合这类语法

## 筛选

我们的筛选其实是基于参数(Variables)来实现，其参数名为filter 。GraphQL 服务识别获取到filter 参数后，将根据给定的filter条件过滤返回数据。大部分返回列表的查询，都可以加上filter 参数来筛选返回结果。

filter后是筛选条件组的数据，其类型是Filter ，可以在对象中加入多个条件，所有条件都以 and 的方式计算，即所有条件均满足才返回。

**筛选条件是树状结构，最后一级的键是筛选叶节点字段+操作符，值是字段需要匹配内容，其中，筛选字段和操作符直接用下划线(_)连接，例如🌰：filter:{uuid_equal:"xxx",name_in:["A","B"]}**。

### 操作符

操作符支持in、notIn、range、equal、match。其中：

- 使用in、notIn时，其条件值为(字符串/数字)数组；
- 使用range时，其条件值为比较对象，用于日期数据比较；
- 使用equal时，条件值为字符串/数字/布尔值，等值匹配；
- 使用match时，条件值为字符串，用于文本模糊查询。

### 嵌套属性筛选

筛选字段支持嵌套属性，前n-1级为对象嵌套的字段，最后一级的键是叶节点字段+操作符，以匹配创建者人uuid的值为xxx为例，其filter为：
```json
{
  "filter": {
    "creator": {
      "uuid_equal": "xxx"
    }
  } 
}
```

## 排序

支持多级排序，排序条件是树状结构，叶子节点的属性必须要指定升序(ASC)或降序(DESC)。

#### 示例
以项目的创建者名称拼音升序排列，若名称相同，则以创建时间进行降序排列

QUERY
```graphql
query {
projects (orderBy: $order) { 
    creator: {
      uuid
      name
      namePinyin
    },
    createTime
}
```
VARIABLES
```json
{
  "order": {
    "owner": {
      "namePinyin": "ASC"
    },
    "createTime": "DESC"
  }
}
```
## 分页

分页以官网建议的[分页规范](https://graphql.org/learn/pagination)作参考来实现，实现的机制就是基于游标的方式进行查询。即给定一个位置，然后获取该位置的前或后n个数量的数据。
+ first：指定取游标后的多少个数据，与after搭配使用
+ after：开始游标，与first搭配使用
+ last：指定取游标前的多少个数据，与before搭配使用
+ before：结束游标，与last搭配使用

#### 示例：
```json
{
  "pagination": {
    "first": 10,
    "after": "xxx"
  }
}
```