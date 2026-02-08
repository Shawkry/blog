---
id: eslint-rules
sidebar_position: 5
sidebar_label: ESLint常用配置规则
title: ESLint常用配置规则
description: ESLint常用配置规则
keywords: [eslint]
---

# ESLint 常用规则

**ESLint详细规则** ：[官网文档](https://eslint.org/docs/latest/rules/)

| 规则名                            | 说明                                   |
|--------------------------------|--------------------------------------|
| `no-cond-assign`               | 禁止条件表达式中出现模棱两可的赋值操作符                 |
| `no-console`                   | 禁用 console                           |
| `no-constant-condition`        | 禁止在条件中使用常量表达式                        |
| `no-debugger`                  | 禁用 debugger                          |
| `no-dupe-args`                 | 禁止 function 定义中出现重名参数                |
| `no-dupe-keys`                 | 禁止对象字面量中出现重复的 key                    |
| `no-duplicate-case`            | 禁止出现重复的 case 标签                      |
| `no-empty`                     | 禁止出现空语句块                             |
| `no-ex-assign`                 | 禁止对 catch 子句的参数重新赋值                  |
| `no-extra-boolean-cast`        | 禁止不必要的布尔转换                           |
| `no-extra-parens`              | 禁止不必要的括号                             |
| `no-extra-semi`                | 禁止不必要的分号                             |
| `no-func-assign`               | 禁止对 function 声明重新赋值                  |
| `no-inner-declarations`        | 禁止在嵌套的块中声明变量或函数                      |
| `no-irregular-whitespace`      | 禁止不规则的空白字符                           |
| `no-obj-calls`                 | 禁止把全局对象当函数调用                         |
| `no-sparse-arrays`             | 禁用稀疏数组                               |
| `no-prototype-builtins`        | 禁止直接使用 Object.prototype 的内置属性        |
| `no-unexpected-multiline`      | 禁止令人困惑的换行                            |
| `no-unreachable`               | 禁止出现无法访问的代码                          |
| `use-isnan`                    | 使用 isNaN() 检查 NaN                    |
| `valid-typeof`                 | typeof 比较时必须是合法字符串                   |
| `array-callback-return`        | 数组方法的回调中必须有 return                   |
| `block-scoped-var`             | 限制变量只能在定义块中使用                        |
| `complexity`                   | 限制程序的圈复杂度                            |
| `consistent-return`            | 要么都 return 值，要么都不 return             |
| `curly`                        | 控制语句强制使用大括号                          |
| `default-case`                 | switch 要有 default 分支                 |
| `dot-location`                 | 点号换行方式保持一致                           |
| `dot-notation`                 | 尽可能使用点号访问属性                          |
| `eqeqeq`                       | 使用 === 和 !==                         |
| `guard-for-in`                 | for-in 中必须有 if 过滤                    |
| `no-alert`                     | 禁用 alert、confirm、prompt              |
| `no-case-declarations`         | case 子句中不能用 let/const/function/class |
| `no-else-return`               | return 后不要出现 else                    |
| `no-empty-function`            | 禁止空函数                                |
| `no-eq-null`                   | 禁止与 null 比较时不使用类型检查                  |
| `no-eval`                      | 禁用 eval()                            |
| `no-extra-bind`                | 禁止不必要的 .bind()                       |
| `no-fallthrough`               | 禁止 switch case 贯穿                    |
| `no-floating-decimal`          | 禁止数字字面量使用前导或尾随小数点                    |
| `no-implicit-coercion`         | 禁止短符号类型转换                            |
| `no-implicit-globals`          | 禁止定义全局变量                             |
| `no-invalid-this`              | 禁止 this 在类外使用                        |
| `no-lone-blocks`               | 禁用不必要的嵌套块                            |
| `no-loop-func`                 | 禁止循环中定义函数                            |
| `no-magic-numbers`             | 禁用魔法数字                               |
| `no-multi-spaces`              | 禁止多个空格                               |
| `no-multi-str`                 | 禁止多行字符串                              |
| `no-new`                       | 禁止不赋值或不使用的 new 操作                    |
| `no-new-func`                  | 禁止使用 new Function                    |
| `no-new-wrappers`              | 禁止对基本类型使用 new                        |
| `no-param-reassign`            | 禁止重新赋值参数                             |
| `no-redeclare`                 | 禁止变量重复声明                             |
| `no-return-assign`             | return 中不能有赋值语句                      |
| `no-script-url`                | 禁止使用 javascript: URL                 |
| `no-self-assign`               | 禁止自我赋值                               |
| `no-self-compare`              | 禁止自身比较                               |
| `no-sequences`                 | 禁用逗号操作符                              |
| `no-unmodified-loop-condition` | 禁止不变的循环条件                            |
| `no-unused-expressions`        | 禁止无用表达式                              |
| `no-useless-call`              | 禁止多余的 .call() 或 .apply()             |
| `no-useless-concat`            | 禁止无意义的字符串连接                          |
| `vars-on-top`                  | var 声明必须在作用域顶部                       |
| `strict`                       | 要求或禁止使用严格模式                          |
| `init-declarations`            | 是否允许声明时未初始化                          |
| `no-catch-shadow`              | catch 参数不能与外层变量同名                    |
| `no-restricted-globals`        | 禁用特定全局变量                             |
| `no-shadow`                    | 禁止变量名与外层作用域重复                        |
| `no-undef`                     | 禁用未声明变量                              |
| `no-undef-init`                | 禁止将变量初始化为 undefined                  |
| `no-unused-vars`               | 禁止声明了但未使用的变量                         |
| `no-use-before-define`         | 禁止在定义前使用变量                           |
| `global-require`               | require() 必须在顶层作用作用域中                |
| `handle-callback-err`          | 回调函数中必须处理错误                          |
| `no-mixed-requires`            | require 要与声明分开                       |
| `no-new-require`               | 禁止 new require()                     |
| `no-path-concat`               | 禁止对 __dirname 和 __filename 拼接字符串     |
| `no-restricted-modules`        | 禁用通过 require 加载的模块                   |
| `array-bracket-spacing`        | 数组括号内要有一致的空格                         |
| `block-spacing`                | 块内要有一致空格                             |
| `brace-style`                  | 大括号风格要一致                             |
| `camelcase`                    | 使用 camelCase 命名                      |
| `comma-spacing`                | 逗号前后空格一致                             |
| `comma-style`                  | 逗号风格一致                               |
| `computed-property-spacing`    | 计算属性括号间空格一致                          |
| `eol-last`                     | 文件末尾必须有空行                            |
| `func-names`                   | 必须命名函数表达式                            |
| `func-style`                   | 函数风格一致（声明/表达式）                       |
| `indent`                       | 缩进一致                                 |
| `jsx-quotes`                   | JSX 属性引号一致                           |
| `key-spacing`                  | 对象属性键值间空格一致                          |
| `keyword-spacing`              | 关键字前后空格一致                            |
| `linebreak-style`              | 换行风格一致（LF/CRLF）                      |
