import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import swc from 'vite-plugin-swc-transform'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/renderer/src'),
        '@components': resolve(__dirname, './src/renderer/src/components'),
        '@assets': resolve(__dirname, './src/renderer/src/assets'),
        '@core': resolve(__dirname, './src/renderer/src/core'),
        '@utils': resolve(__dirname, './src/renderer/src/utils'),
        '@services': resolve(__dirname, './src/renderer/src/services'),
        '@controllers': resolve(__dirname, './src/renderer/src/controllers')
      }
    },
    // 1. 强制 esbuild 处理装饰器元数据
    esbuild: false,
    plugins: [
      vue(),
      tailwindcss(),
      swc({
        // 这里启用真正的元数据支持
        swcOptions: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
              dynamicImport: true
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
              useDefineForClassFields: false
            }
          }
        }
      })
    ]
  }
})
