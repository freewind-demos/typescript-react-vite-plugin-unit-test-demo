import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import functionLogger from './plugins/vite-plugin-function-logger'

export default defineConfig({
  plugins: [
    react(),
    functionLogger({
      pattern: /^test/ // 只记录以test开头的函数
    })
  ],
})
