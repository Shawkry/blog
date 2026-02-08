---
id: web-accessibility
sidebar_position: 1
sidebar_label: 开发无障碍网站代码规范
title: 开发无障碍网站代码规范
description: 开发无障碍网站代码规范
keywords: [web accessibility, 网站无障碍, WCAG]
---

# 开发无障碍网站代码规范

## 概述

网站无障碍性（Web Accessibility）是指确保所有用户(包括残障人士和技术设备有限的用户)，都能够平等地访问和使用网页内容和功能。
通过遵循无障碍性规范，网站可以提升用户体验、扩大用户覆盖范围，并满足法律法规的要求，为更多样化的用户群体创建包容性更强的网站，增强网站的可达性与可用性。

## WCAG

WCAG（Web Content Accessibility Guidelines）是由万维网联盟（W3C）的Web无障碍倡议（WAI）发布的一系列有关 Web 无障碍指南的一部分。

### 参考标准

WCAG 2.1 提供了详细的可访问性指南和成功标准，分为A、AA和AAA三个级别，建议遵循至少AA级标准。

ARIA（Accessible Rich Internet Applications）: ARIA提供了一组属性，帮助增强动态内容和高级用户界面的可访问性。
通过遵循这些规范，可以显著提高Web网站的无障碍性，确保所有用户都能访问和使用网站的内容和功能

### 核心原则

- **可感知**：确保残疾人士能够感知所有呈现的信息
- **可操作**：确保残疾人士能够操作界面（界面不能有用户无法执行的交互）
- **可理解**：确保残疾人士能够理解用户界面的信息和操作
- **健壮性**：确保残疾人士能够使用各种用户代理（包括辅助技术）可靠地获取内容

## 代码规范

### 可感知性

1. **文本代替**：所有非文本内容（如图像、视频、音频）应提供文本替代（如 `alt` 属性、字幕、描述性文本）
2. **视频控件**：时长超过 5 秒的视频控件必须包含`controls`属性,(建议使用`video`标签都加上`controls`属性)
3. **描述属性**：对于没有包含文案的元素，必须添加可描述属性(如`aria-label`或`aria-labelledby`）
4. **可描述属性**：元素内必须含有可描述属性(元素内的文案或者加上`title`)
5. **iframe标题**：`iframe元素`必须添加`title`属性

### 可操作性

1. **焦点可见性**：当元素获得焦点的时候，应有明显页面标题
2. **可点击元素**：可点击元素，必须加上 `tabindex` 和 `aria-role`
3. **元素包裹**：`button元素`不能是另一个交互元素的子元素(如 `a元素`)

### 可理解性

1. **视口设置**：`html`页面`meta`中的`viewport`属性必须设置可以缩放
2. **标题语义**：使用`<h>`标签表示具有标题含义的文本,禁止用样式加粗或字号变大来表示标题
3. **标题内容**：`<h>`标签是页面结构化的基础元素，标签内必须包含文案
4. **标题层级**：`<h>`标签须按照页面html层级正确出现
5. **链接描述**：`<a>`标签需要加上可描述属性(如`aria-label`或`title`)
6. **表格语义**：使用`<table>`标签表示表格，使用`<th>`标签表示表头，使用`<tr>`标签表示表格行，使用`<td>`标签表示表格单元格(如有特殊样式需要用table可通过role="presentation"删除标签语义)
7. **表单控件**：设置`<label>`或`title`
8. **页面标题**：每个页面应有一个描述性的、独特的标题（使用`<title>`标签）
9. **头部结构**：使用语义化的HTML头部标签（`<h1>`到`<h6>`）按顺序结构化内容
10. **链接文本**：链接文本应清晰描述目标，不使用模糊的描述（如“learn more”或 “click here”）

### 健壮性

1. **语义化html**：建议使用语义化html标签(如`<article>`、`<nav>`、`<section>`)提高内容的结构性和可理解性
2. **无序列表**：`<ul>`标签元素中下一级除了`<li>`元素不应出现其他元素或文案
3. **通用标签**：避免通用标签内无文案（如`<div>`、`<h>`、`<p>`、`<span>`标签）
4. **语言属性**：为每个页面和内容部分设置正确的语言属性（`<html lang="en">`），辅助技术可以正确处理多语言内容
5. **标签命名**：禁止以下使用`aria-label`或`aria-labelledby`命名: 
[caption](https://www.w3.org/TR/wai-aria-1.2/#caption)、
[code](https://www.w3.org/TR/wai-aria-1.2/#code)、
[deletion](https://www.w3.org/TR/wai-aria-1.2/#deletion)、
[emphasis](https://www.w3.org/TR/wai-aria-1.2/#emphasis)、
[generic](https://www.w3.org/TR/wai-aria-1.2/#namefromprohibited)、
[insertion](https://www.w3.org/TR/wai-aria-1.2/#namefromprohibited)、
[paragraph](https://www.w3.org/TR/wai-aria-1.2/#generic)、
[presentation](https://www.w3.org/TR/wai-aria-1.2/#presentation)、
[strong](https://www.w3.org/TR/wai-aria-1.2/#strong)、
[subscript](https://www.w3.org/TR/wai-aria-1.2/#subscript)、
[superscript](https://www.w3.org/TR/wai-aria-1.2/#superscript)、
[time](https://www.w3.org/TR/wai-aria-1.2/#time)
