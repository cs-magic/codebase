import { resolve } from 'path'
import {
  defineConfig,
  externalizeDepsPlugin
  // loadEnv
} from 'electron-vite'
import commonjs from 'vite-plugin-commonjs'
import wasm from 'vite-plugin-wasm'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    // wechaty-puppet-wechat4u: commonjs / nodePolyfills
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    build: {
      rollupOptions: {
        // 实在无法用plugin去拯救，see: https://github.com/vitejs/vite/discussions/7374#discussioncomment-2787001
        external: new RegExp('/yargs-parser/.*')
      }
    },
    plugins: [
      commonjs(), // for wechat4u
      nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      wasm() // for tiktoken
      // react(),
    ]
  }
})
