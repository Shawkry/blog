---
id: graphql-and-rest
sidebar_position: 0
sidebar_label: GraphQL 和 REST 对比
---
# GraphQL 和 REST 对比
就以知乎举例，假设我们是知乎的开发人员，现在有一个迭代需求是在知乎的个人主页展示个人信息，需要在界面上展示如下数据：
+ 昵称
+ 头像
+ 关注列表
    + 关注人1
        + 昵称
        + 头像
    + 关注人2
        + 昵称
        + ...
    + ...
+ 我的最近提问
    + 我的提问1
        + 提问回答
            + 标题
            + 内容
            + 评论
    + 我的提问2
        + ...

这是一个复杂的树形结构数据，如果我们用常见的REST 接口查询，每个API 负责请求一种类型的对象， 那就需要发送三次请求才能把这个页面所需的所有数据拿回来

1. GET: /users/<uuid\>
```json
{
  "user": {
    "uuid": "xxx",
    "name": "xxx",
    "avatar": "xxx",
    "...": "..."
  }
}

```
2. GET: /users/<uuid\>/posts
```json
{
  "posts": [{
    "uuid": "xxx",
    "title": "xxx",
    "content": "xxx",
    "comments":["xxx","xxx"],
    "...": "..."
  }]
}

```
3. GET: /users/<uuid\>/followers
```json
{
  "followers": [{
    "uuid": "xxx",
    "name": "xxx",
    "avatar": "xxx",
    "...": "..."
  }]
}

```
至此才将所有数据获取完成，可以看到每个请求都可能存在不必要的冗余数据，还需要前端获取到数据之后再进行处理之后才能展示；
而且请求之间还可能存在依赖关系，不能平行地发多个请求。
另外一种解决方案就是新增一个专门为这个需求服务的super API ，服务端查询到需要的所有数据之后，按照固定格式一次性返回给前端，似乎这就并不是一个合理的实现方式，一个API 杂糅了太多不同类型的数据，不符合接口隔离原则。
而且之后如果主页需要展示更多信息的话，那么这个REST 接口也要跟着修改，不利于迭代更新。

那么如果用GraphQL 将会怎么请求呢？

POST: /graphQL
```graphql
  query{
    User(uuid:"xxx"){
      name
      avatar
      posts{
        title
        content
        comments
      }
      follows{
        name
        avatar
      }
    }
  }
```
返回数据：
```json
{
  "data": {
    "User": {
      "name": "xxx",
      "avatar": "xxx",
      "posts": [{
        "title": "xxx",
        "content": "xxx",
        "comments": ["xxx","xxx"]
      }],
      "follows":[{
        "name": "xxx",
        "avatar": "xxx"
      }]
    }
  }
}
```
可以看到使用GraphQL 之后，只需要请求一次就能请求到所有想要的数据，且没有其他冗余数据需要处理，完美的解决了REST 过度获取的问题；
而且之后有新的需求需要迭代的话，只需要前端修改请求的query声明就好了，方便快速迭代。