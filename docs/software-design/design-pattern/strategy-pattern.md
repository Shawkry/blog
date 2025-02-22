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

🌰：two公司绩效奖金计算，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，绩效为B的人年终奖有2倍工资，C绩效为B的人年终奖有1倍工资

使用 if（switch） 判断实现：

```tsx
/* bad */
const calculateBouns = (level:string,salary:number) => {
	if(level === 'S') {
	  return salary * 4;
	}
	if(level ==='A') {
	  return salary * 3;
	}
	if(level === 'B') {
	  return salary * 2;
	}
	if(level === 'C') {
	  return salary * 1;
	}
}

calculateBouns('S',4000);  // 16000
calculateBouns('A',3000);  // 9000
calculateBouns('B',2000);  // 4000
calculateBouns('C',1000);  // 2000
```

策略模式：

```tsx
/* good */
const strategy = {
  'S': (salary)=> salary * 4,
  'A': (salary)=> salary * 3,
  'B': (salary)=> salary * 2,
  'C': (salary)=> salary * 1,
}
const calcluateBouns = (level,salary) => {
	return strategy[level](salary);
}

calcluateBouns('S',4000);  // 16000
calcluateBouns('A',3000);  // 9000
calcluateBouns('B',2000);  // 4000
calcluateBouns('C',1000);  // 2000
```
