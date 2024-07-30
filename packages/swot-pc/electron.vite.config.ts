import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import wasm from 'vite-plugin-wasm'
import commonjs from 'vite-plugin-commonjs'
import nodePolyfills from 'vite-plugin-node-polyfills'

const envDir = resolve('../..')

export default defineConfig({
  main: {
    logLevel: 'info',
    envDir,
    plugins: [
      externalizeDepsPlugin({
        include: [],
        exclude: [],
      }),
      // commonjs(),
      // nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      // wasm() // for tiktoken
    ],
    build: {
      rollupOptions: {
        external: [
          '@cs-magic/common/dist/server.js',
          '@cs-magic/swot-bot/dist/backend/server.js',
          // 'qrcode-terminal',
          // '.prisma/client/default',
          // 'wechaty-puppet-wechat4u',
        ],
      },
    },
  },

  preload: {
    envDir,
    plugins: [externalizeDepsPlugin()],
  },

  renderer: {
    logLevel: 'info',
    envDir,

    // wechaty-puppet-wechat4u: commonjs / nodePolyfills
    resolve: {
      alias: {
        // '@renderer': resolve('src/renderer/src'),
        // '.prisma/client/index-browser': '../../node_modules/.prisma/client/index-browser.js', // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
        // Ensure that path-browserify is resolved correctly
        // 'path-browserify': 'path-browserify/index.js',
      },
    },
    plugins: [
      // externalizeDepsPlugin(),
      // commonjs(), // for wechat4u
      // nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      // wasm(), // for tiktoken
      react(),
    ],
  },
})
