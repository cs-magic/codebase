import { resolve } from "path"
import type { ConfigEnv, UserConfig } from "vite"
import { defineConfig, mergeConfig } from "vite"
// import react from "@vitejs/plugin-react"
import {
  external,
  getBuildConfig,
  getBuildDefine,
  pluginHotRestart,
} from "./vite.base.config"
import commonjs from "vite-plugin-commonjs"
import wasm from "vite-plugin-wasm"
import { nodePolyfills } from "vite-plugin-node-polyfills"

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"build">
  const { forgeConfigSelf } = forgeEnv
  const define = getBuildDefine(forgeEnv)
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => "[name].js",
        formats: [
          "cjs",
          // "es",
        ],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [
      commonjs(), // for wechat4u
      nodePolyfills({}), // for file-box|/wechaty-puppet-service, ..., see: https://github.com/vitejs/vite/discussions/15415
      wasm(), // for tiktoken

      pluginHotRestart("restart"),
    ],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ["module", "jsnext:main", "jsnext"],

      alias: {
        ".prisma/client/index-browser":
          "../../node_modules/.prisma/client/index-browser.js", // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
      },
    },
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
