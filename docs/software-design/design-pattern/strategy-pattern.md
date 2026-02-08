---
id: strategy-pattern
sidebar_position: 1
sidebar_label: 策略模式
title: 策略模式
description: 策略模式
keywords: [策略模式, strategy-pattern, 设计模式, design-pattern]
---

# 策略模式（Strategy Pattern）

> 定义一系列算法，把他们一个一个封装起来，并且使他们可以相互替换。

## 优点

1. **符合开闭原则**：无需修改上下文即可添加新策略，更容易理解和拓展
2. **算法复用**：不同上下文可以共享策略对象，避免重复
3. **代码优雅**：避免大量的 if-else/switch-case 判断

## 解决场景

1. 不需要使用者创造它的实例对象，直接供使用者调用
2. 需要用一些行为进行限制，比如全局只需要一个实例（消息弹窗、购物车等）


## 示例

### 表单校验

```typescript
interface IValidateReturn  {
    isValid: boolean;
    error?: string;
}

interface IValidationRule {
    validate(value: string): IValidateReturn;
}

// 具体策略实现，校验邮箱
const emailRule: IValidationRule = {
    validate: (v) => ({
        isValid: /^[\w-]+@[\w-]+\.\w+$/.test(v),
        error: '邮箱格式不正确'
    })
};

// 具体策略实现，校验手机号码
const phoneNumberRule: IValidationRule = {
    validate: (v) => ({
        isValid: /^1[3-9]\d{9}$/.test(v),
        error: '手机号格式不正确'
    })
};

// 具体策略实现，必填校验规则
const requiredRule: IValidationRule = {
    validate: (v) => ({
        isValid: v.trim().length > 0,
        error: '该字段不能为空'
    })
};

class SmartValidator {
    private _rules: IValidationRule[] = [];

    public constructor(rules: IValidationRule[] = []) {
        this._rules = rules;
    }

    // 设置规则
    public setRules(rules: IValidationRule[]): void {
        this._rules = rules;
    }

    // 执行验证（返回第一个错误）
    public validate(value: string): IValidateReturn {
        for (const rule of this._rules) {
            const result = rule.validate(value);
            if (!result.isValid) {
                return result;
            }
        }
        return { isValid: true };
    }
}

const validator = new SmartValidator();

// 根据表单类型设置不同的验证规则
const formType = 'email'; // 可以是 'email' 或 'phone'

if (formType === 'email') {
    validator.setRules([requiredRule, emailRule]);
}
else {
    validator.setRules([requiredRule, phoneNumberRule]);
}

// 测试空值
console.log('空值验证:', validator.validate(''));
// 测试有效值
console.log('格式验证:', validator.validate('test@example.com'));
```

### 与if-else和switch-case对比

使用 if-else 判断实现：

```tsx
type Role = 'user' | 'admin' | 'vip';
function getFeaturesIfElse(role: Role): string[] {
    if (role === 'user') {
        return ['dashboard', 'basic-profile'];
    } else if (role === 'admin') {
        return ['dashboard', 'user-management', 'system-settings'];
    } else if (role === 'vip') {
        return ['dashboard', 'premium-content', 'advanced-settings'];
    } else {
        return [];
    }
}

const featuresIfElse1 = getFeaturesIfElse('admin');
const featuresIfElse2 = getFeaturesIfElse('vip');
```

使用 switch-case 实现：

```typescript
function getFeaturesSwitchCase(role: Role): string[] {
  switch (role) {
    case 'user':
      return ['dashboard', 'basic-profile'];
    case 'admin':
      return ['dashboard', 'user-management', 'system-settings'];
    case 'vip':
      return ['dashboard', 'premium-content', 'advanced-settings'];
    default:
      return [];
  }
}

const featuresSwitchCase1 = getFeaturesSwitchCase('admin');
const featuresSwitchCase2 = getFeaturesSwitchCase('vip');
```

使用策略模式实现：

```tsx
type Role = 'user' | 'admin' | 'vip';

const FeatureStrategies = {
    user: () => ['dashboard', 'basic-profile'],
    admin: () => ['dashboard', 'user-management', 'system-settings'],
    vip: () => ['dashboard', 'premium-content', 'advanced-settings']
};

function getFeatures(role: Role): string[] {
    return FeatureStrategies[role]();
}

const features1 = getFeatures('admin');
const features2 = getFeatures('vip');
```
