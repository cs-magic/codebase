import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'

const envDir = resolve('../..')

export default defineConfig({
  main: {
    envDir,
    plugins: [externalizeDepsPlugin()],
  },

  preload: {
    envDir,
    plugins: [externalizeDepsPlugin()],
  },

  renderer: {
    envDir,
    resolve: {
      alias: {
        '.prisma/client/index-browser': '../../node_modules/.prisma/client/index-browser.js', // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      react(),
      wasm(), // for tiktoken@llm
    ],
  },
})
