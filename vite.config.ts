import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import functionLogger from './plugins/vite-plugin-function-logger'

export default defineConfig({
  plugins: [
    react() as any,
    functionLogger({
      pattern: /^test/, // 只记录以test开头的函数
      enabled: process.env.NODE_ENV !== 'test' // 在测试环境下禁用插件
    })
  ],
})
