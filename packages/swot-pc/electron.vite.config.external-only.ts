import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
// import commonjs from 'vite-plugin-commonjs'
// import react from '@vitejs/plugin-react'
// import wasm from 'vite-plugin-wasm'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig(({ mode }) => {
  // ref: https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg
  const env = loadEnv(mode, process.cwd(), '')

  return {
    main: {
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      define: {
        'process.env': env,
      },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src'),
        },
      },
      build: {
        rollupOptions: {
          // see: https://github.com/vitejs/vite/discussions/7374#discussioncomment-2787001
          external: new RegExp('/tiktoken|yargs-parser|file-box|wechaty-puppet-service/.*'),
        },
      },
      plugins: [
        // react(),
        // commonjs.default(),
        // nodePolyfills({}), // for fs, path, ..., see: https://github.com/vitejs/vite/discussions/15415
        // wasm() // for tiktoken.wasm
      ],
    },
  }
})
