---
id: adapter-pattern
sidebar_position: 2
sidebar_label: 适配器模式
title: 适配器模式
description: 适配器模式
keywords: [适配器模式, adapter-pattern, 设计模式, design-pattern]
---

# 适配器模式(Adapter Pattern)

> 建立中间层，在不修改原有代码的情况下，让两个原本不兼容的接口能够协同工作

## 优点

1. **解耦代码，提升兼容性**：让新旧系统可以无缝协作，而无需修改原有代码，降低维护成本。
2. **增强复用性**：复用已有类，而不是重新实现一套功能，减少重复代码，提高开发效率。
3. **符合开闭原则**：通过增加适配器类，而不是修改已有代码，实现扩展，使系统更加灵活。

## 解决场景

1. 新系统采用了新的接口标准，而老系统仍然使用旧接口，适配器可以让新代码兼容旧代码，避免大规模重构
2. 某些第三方库提供的 API 与我们项目中的数据格式或调用方式不匹配，我们可以通过适配器模式进行封装，使其符合项目需求
3. 在前后端交互中，可以用于 JSON、XML 等不同数据格式的转换，使不同系统可以顺畅通信

## 示例

### 日志系统

假设有一个旧日志系统，使用 `logMessage(message)` 、 `logWarn(message)` 、`logError(message)`来输出日志。
现在期望新系统能有新的接口，以`logger.log(message)` 、`logger.warn(message)`、`logger.error(message)` 输出日志。
在不改动旧日志系统的基础上，使用适配器模式兼容本次改动

```typescript
interface ILogger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

class OldLogger {
    public logMessage(msg: string): void {
        console.log(`Log: ${msg}`);
    }

    public logWarn(msg: string): void {
        console.warn(`Warning: ${msg}`);
    }

    public logError(msg: string): void {
        console.error(`Error: ${msg}`);
    }

}

class OldLoggerAdapter implements ILogger {
    private readonly _oldLogger: OldLogger;

    public constructor(oldLogger: OldLogger) {
        this._oldLogger = oldLogger;
    }

    public log(message: string): void {
        this._oldLogger.logMessage(message);
    }

    public warn(message: string): void {
        this._oldLogger.logWarn(message);
    }

    public error(message: string): void {
        this._oldLogger.logError(message);
    }
}

// 使用适配器将旧的日志系统适配为新的日志接口
const logger: ILogger = new OldLoggerAdapter(oldLogger);

logger.log('一条 info 信息');
logger.warn('一条 warn 信息');
logger.error('一条 error 信息');

```

### GraphQL

**GraphQL本身不是适配器模式，但是有适配器的特性。** 通过一个统一的接口访问不同的数据源，非常像一个“适配器”，将客户端的请求适配并转化为不同数据库或 REST API 的查询。

```graphql
query {
    user(id: "abc") {
        name
        posts {
            title
            comments(limit: 5) {
                content
            }
        }
    }
}
```
