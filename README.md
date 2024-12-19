# vite-plugin-function-logger

一个简单的vite插件，用于在函数入口处自动注入日志。

## 功能

- 自动在函数开始处注入`console.log`
- 支持普通函数和箭头函数
- 可以通过pattern配置要处理的函数
- 可以启用/禁用插件

## 使用

在`vite.config.ts`中配置：

```typescript
import { defineConfig } from 'vite'
import functionLogger from './plugins/vite-plugin-function-logger'

export default defineConfig({
  plugins: [
    functionLogger({
      // 可选：只处理特定函数，默认处理所有函数
      pattern: /^test/,
      // 可选：是否启用插件，默认true
      enabled: true
    })
  ]
})
```

## 示例

输入代码：

```typescript
function test() {
  return 1 + 1
}

const calc = () => {
  return 2 + 2
}
```

输出代码：

```typescript
function test() {
  console.log("Entering function: test")
  return 1 + 1
}

const calc = () => {
  console.log("Entering function: calc")
  return 2 + 2
}
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| pattern | string \| RegExp | /.*/ | 要处理的函数名pattern |
| enabled | boolean | true | 是否启用插件 |

```
npm install
npm run demo
```

It will open page on browser automatically.
