---
id: basic-knowledge
sidebar_position: 1
sidebar_label: GraphQL 基础知识
description: GraphQL 基础知识介绍
keywords: [GraphQL, GraphQL基础知识]
---

# GraphQL 基础知识

## 操作类型（Operation type）

在我们平时使用的 REST 接口，任何请求都可以导致服务端副作用（如修改、新增、删除），但是约定上建议不要使用GET请求来做有副作用的事。比如不要使用GET请求来实现新增数据。

GraphQL 也是有类似的约定：每一个查询都有一个操作类型，需要描述这个请求打算做什么类型的操作。

GraphQL 的操作类型分为以下几种：

- _query_
- _mutation_
- _subscription_

_query_ ：约定用于没有副作用的查询（如获取列表），类比于REST 中的GET请求；

_mutation_ ：约定用于有数据更改的操作（如修改、新增、删除等），类比于REST 中的POST/PUT/DELETE请求；

_subscription_ ：约定用于从GraphQL 服务器获取实时更新的查询，实现的功能与Websocket类似，可实时通知客户后端数据的更改；

注意：在不写操作类型的情况下，操作类型可以省略不写，将默认使用query类型。不过这样无法为操作提供名称或变量定义，建议在每个查询中都写上操作类型，就算是query也加上。

**示例：**

```graphql
query {
  projects {
    uuid
    name
  }
}
```

```json
{
  "data": {
    "projects": [
      {
        "uuid": "UDs8xs4r",
        "name": "项目A"
      },
      {
        "uuid": "H2e68sxt3",
        "name": "项目2"
      }
    ]
  }
}
```

## 操作名称（Operation name）

除了操作类型之外，我们还可以给这个操作定义一个有意义且明确的名称，这个就是操作名称。

操作名称是可以省略不写的，比如在上一个小节最后的获取项目信息案例就省略了，它仅在有多个操作的文档中是必需的。但是官方鼓励我们使用它，因为它对于调试和服务器端日志记录非常有用。

对于操作名称，我们可以类比于JavaScript 的函数名，不给定函数名称而换成用匿名函数也可以执行，但是有个函数名，会更方便定位和调试。
需要注意一点，如果写了操作名称，那么操作类型就不能省略了。如获取项目信息，我们自定义一个ProjectList 的操作名称

**示例：**

```graphql
query ProjectList {
  projects {
    uuid
    name
  }
}
```

返回的结果是和上一小节示例是一样的，但是这样能更清晰明确我这一操作的意图和期望结果

## 字段/属性（Fields）

定义了GraphQL 操作的操作类型和名称后，我们需要在GraphQL的查询语句中添加字段，用于定义需要从GraphQL 服务中获取什么数据。需要注意的是字段并非客户端可以任意自定义的，需要按照GraphQL 服务定义的类型来选择。
**示例：**
还是以获取项目信息列表为例，再此基础上将查询数据复杂化一点，我们再加上这个项目创建人的uuid和姓名

GraphQL 服务定义的项目列表的字段为projects，项目对象包含字段（fields）uuid、名称name，创建人creator，creator中又包含了创建人的uuid和姓名，
创建人虽然作为项目的一个字段，但其本身也是一个对象，所以可以继续对这个对象的字段进行次级选择（sub-selection）。

GraphQL 的查询字段可以按需给定，GraphQL 服务将遍历相关对象及其字段，使得客户端可以一次请求查询大量相关数据，而不像传统 REST 架构中那样需要多次往返查询。
因此其语句和结果查询如下：

```graphql
query {
  projects {
    uuid
    name
    creator {
      uuid
      name
    }
  }
}
```

```json
{
  "data": {
    "projects": [
      {
        "uuid": "UDs8xs4r",
        "name": "项目A",
        "creator": {
          "uuid": "ud82ks23",
          "name": "张三"
        }
      },
      {
        "uuid": "H2e68sxt3",
        "name": "项目2",
        "creator": {
          "uuid": "t2yh1ju9",
          "name": "李四"
        }
      }
    ]
  }
}
```

## 参数（Arguments）

GraphQL 的参数与REST 中的请求参数功能类似，可以让 GraphQL服务根据客户端传输的参数做对应处理和返回数据。

在 GraphQL 中，**每一个字段和嵌套对象都能有自己的一组参数**，从而使得 GraphQL 可以满足不同场景可以不同的数据。但是，这不等于给任意一个字段添加任意参数就可以自动实现业务处理和数据返回，这是不可能实现的，**字段上的参数还要求在GraphQL服务端定义并编写其接收逻辑才能处理和返回结果**。说人话就是如果参数没有在GraphQL服务上定义，字段上的参数会被忽略🐶。

**示例：**

以下为筛选获取项目uuid为"UDs8xs4r"的项目列表（请只看参数功能，不要关注具体筛选逻辑，具体可以参考： [GraphQL 扩展](/docs/web/graphql/knowledge-expansion) ）：

```graphql
query {
  projects(filter: { uuid_equal: "UDs8xs4r" }) {
    uuid
    name
  }
}
```

```json
{
  "data": {
    "projects": [
      {
        "uuid": "UDs8xs4r",
        "name": "项目A"
      }
    ]
  }
}
```

可以看到最终返回的只有”项目A“，而“项目2”由于uuid不是"UDs8xs4r"则被过滤了。
filter是定义在projects上的参数名称，`{uuid_equal: "UDs8xs4r"}` 为筛选条件数据。

还需要再次说明得是GraphQL本身不提供筛选，案例的筛选项目是只是为了说明参数功能，我们可以基于参数来实现更多功能，如筛选、分页、排序等。

## 变量（Variables）

目前为止，我们将参数写在了查询字符串内，如果字段的参数需要是动态的，将这些动态参数直接拼接到查询字符串并不是好主意，因为这样我们的客户端就得动态地在运行时操作这些查询字符串了，再把它序列化成GraphQL 格式。

如果查询字符串是固定的，即数据部分是占位符，查询字符串不包含具体的数据，具体数据放置在查询语句之外，保证数据和查询语句没有耦合一起，数据直接是对象，不需要转换字符串拼接到查询中。通过变量(Variables) 就可以实现这个目的，使用变量在查询字符串中占位。

1、使用 $variableName 替代查询中的静态值，**变量名称可以自定义，但要求以$ 作为前缀\*\*，这个变量一般是作为某个字段的参数值进行查询；

2、在操作名称中**声明定义这个变量，同时还需在后面添加其类型**；

3、在VARIABLES中添加变量的数据，在VARIABLES中的变量的键是变量名剔除$ 部分，如上，变量名为定义为$filter 时，VARIABLES中的数据的键为filter 。

**注意：不是任何数据都可以作为变量，要求所有声明的变量都必须是标量类型（默认标量类型：Int、Float、String、Boolean、ID等）、枚举型或者输入对象类型（自定义的复杂对象）。**
如果是复杂的对象，想要查看服务端对应的类型，可以查询以下语句，获取服务器端已定义的类型：

```graphql
query {
  __schema {
    types {
      name
    }
  }
}
```

**示例：**
把筛选获取项目列表的查询语句换成变量实现如下：

QUERY部分：

```graphql
query {
  projects(filter: $filter) {
    uuid
    name
  }
}
```

VARIABLES部分：

```json
{ "filter": { "uuid_equal": "UDs8xs4r" } }
```

以上，$filter就是我们定义的变量，相关数据放置在VARIABLES中，在查询请求发送时，VARIABLES会作为请求体的一部分数据。

## 别名（Aliases）

如果想要在一个查询语句中，根据不同参数获取相同字段的不同数据，但因为字段相同而条件不同导致无法返回数据，此时可以通过别名给相同字段重命名。

**示例：**

假如我需要获取两个项目列表，一个是项目名中含有字符“A”的项目列表并且取名为“projectA”，一个是项目名中含有字符“B“的项目列表并且取名为“projectB”。（同样请忽略具体筛选逻辑，只关注筛选结果和别名，筛选具体可以参考：[GraphQL 扩展](/docs/web/graphql/knowledge-expansion)）

```graphql
query {
  projectA: projects(filter: { uuid_match: "A" }) {
    uuid
    name
  }
  projectB: projects(filter: { uuid_match: "B" }) {
    uuid
    name
  }
}
```

```json
{
  "data": {
    "projectA": [
      {
        "uuid": "UDs8xs4r",
        "name": "项目A"
      }
    ],
    "projectB": [
      {
        "uuid": "UDs8xs4r",
        "name": "项目B"
      }
    ]
  }
}
```

以上，可见同样都是获取projects，因为取了别名并不会有冲突，得到了正确的查询结果。

## 总结

以上的基础知识点（操作类型、操作名称、字段、参数、变量、别名）是使用GraphQL时遇到比较常用的几个点，了解更多可以去官网查看。
