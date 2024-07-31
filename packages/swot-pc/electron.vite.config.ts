import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import commonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import wasm from 'vite-plugin-wasm'

const envDir = resolve('../..')

export default defineConfig({
  main: {
    logLevel: 'info',
    envDir,
    plugins: [
      externalizeDepsPlugin(),
      // commonjs(),
      // nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      // wasm(), // for tiktoken
    ],
    build: {
      rollupOptions: {
        external: [
          // 'file-box'
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
        '.prisma/client/index-browser': '../../node_modules/.prisma/client/index-browser.js', // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
        '@renderer': resolve('src/renderer/src'),
        // Ensure that path-browserify is resolved correctly
        // 'path-browserify': 'path-browserify/index.js',
      },
    },
    plugins: [
      // externalizeDepsPlugin(),
      // commonjs(), // for wechat4u
      // nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      wasm(), // for tiktoken
      react(),
    ],

    build: {
      rollupOptions: {
        external: [
          //
          'file-box',
          'wechaty-puppet-service',
          'wechaty-puppet-wechat4u',
          'yargs-parser',
        ],
      },
    },
  },
})
