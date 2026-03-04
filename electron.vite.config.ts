import { resolve } from 'path'
import { defineConfig, swcPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import swc from 'vite-plugin-swc-transform'

export default defineConfig({
  main: {
    build: {
      target: 'node*',
      rollupOptions: {
        external: ['electron', 'reflect-metadata']
      }
    },
    esbuild: false,
    plugins: [swcPlugin()],
    resolve: {
      alias: {
        // 确保这里的配置与 tsconfig.json 一致
        '@main': resolve(__dirname, './src/main')
      }
    }
  },
  preload: {},
  renderer: {
    optimizeDeps: {
      exclude: ['@virid/core', '@virid/vue']
    },
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
