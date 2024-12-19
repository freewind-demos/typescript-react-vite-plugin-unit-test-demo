# Vite 插件单元测试演示

这个项目演示如何使用 Vitest 对 Vite 插件进行单元测试。

## 概述

这是一个演示项目，展示了以下内容：
1. 如何为 Vite 插件搭建测试环境
2. 如何编写有效的插件转换测试
3. 如何测试不同的插件配置和场景

项目使用了一个简单的函数日志插件作为示例，该插件会在函数开始处注入 console.log 语句。

## 技术栈

- Vite：构建工具和插件系统
- Vitest：单元测试框架
- TypeScript：提供类型安全
- Babel：用于插件中的 AST 操作

## 安装

```bash
npm install
```

## 运行测试

单次运行测试：
```bash
npm test
```

监听模式运行测试：
```bash
npm test -- --watch
```

## 编写 Vite 插件测试

以下是测试 Vite 插件的方法：

1. 创建插件的测试文件（例如：`src/plugins/__tests__/vite-plugin-function-logger.test.ts`）

2. 测试插件的转换功能：
```typescript
import { test, expect } from 'vitest'
import functionLogger from '../vite-plugin-function-logger'

test('应该在函数开始处注入 console.log', async () => {
  const plugin = functionLogger()
  const code = `
    function test() {
      return 1 + 1
    }
  `
  
  const result = await plugin.transform(code, 'file.ts')
  expect(result.code).toContain('console.log("Entering function: test")')
})
```

3. 测试不同配置：
```typescript
test('应该只转换匹配 pattern 的函数', async () => {
  const plugin = functionLogger({ pattern: /^test/ })
  // ... 测试代码
})
```

## 测试要点

测试 Vite 插件时，需要考虑以下几点：

1. 输入/输出转换
   - 测试转换后的代码是否符合预期
   - 验证语法的有效性
   - 检查边界情况

2. 配置选项
   - 测试不同的插件选项
   - 验证选项的有效性
   - 测试默认值

3. 错误处理
   - 测试无效输入
   - 验证错误信息
   - 检查错误恢复

## 项目结构

```
src/
  plugins/
    vite-plugin-function-logger.ts    # 插件实现
    vite-plugin-function-logger.test.ts  # 插件测试
  vite.config.ts                      # Vite 配置
```

## 插件示例

本演示使用了一个函数日志插件，用于注入 console.log 语句。具体实现细节请查看插件代码。

## 贡献

欢迎提交问题和改进建议！

```bash
npm install
npm run demo
```

将自动在浏览器中打开页面。
