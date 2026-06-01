---
layout: '../../layouts/BlogPost.astro'
title: 'TypeScript 实用技巧：让类型为你工作'
date: '2026-01-20'
description: '几个日常开发中真正用得上的 TypeScript 模式：类型收窄、泛型约束与工具类型。'
tags: ['TypeScript', '前端']
---

TypeScript 的类型体操很容易让人望而生畏。这里只记录**日常开发中反复用到**的几个模式。

## 1. 用 discriminated union 替代可选字段组合

与其写一堆可选字段然后运行时判断，不如用联合类型明确状态：

```typescript
type Result =
  | { ok: true; data: User }
  | { ok: false; error: string };

function handle(result: Result) {
  if (result.ok) {
    console.log(result.data.name); // 自动收窄
  } else {
    console.error(result.error);
  }
}
```

编译器会在 `if` 分支内自动收窄类型，减少 `as` 断言。

## 2. 泛型约束：`extends` 比 `any` 好

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
```

`extends object` 和 `extends keyof T` 让调用方获得完整的类型推导，而不是返回 `any`。

## 3. 善用内置工具类型

几个高频工具类型：

- `Partial<T>` — 所有字段可选，适合 update 接口
- `Pick<T, K>` / `Omit<T, K>` — 从现有类型派生
- `Record<K, V>` — 键值映射
- `ReturnType<F>` — 从函数推导返回类型

## 4. `satisfies` 保留字面量类型

```typescript
const config = {
  theme: 'dark',
  lang: 'zh-CN',
} satisfies { theme: 'dark' | 'light'; lang: string };

// config.theme 的类型是 'dark'，而非 string
```

## 何时不必追求极致类型

不是所有地方都需要完美类型。边界层（API 响应、第三方库）用 `zod` 或 `io-ts` 做运行时校验更实际；内部业务逻辑再追求严格类型。

**类型系统的目标是减少 bug，不是炫技。** 如果一个类型定义需要读三遍才能理解，考虑简化。
