# finished todo

- [x] Electron-IPC vs WebSocket
- [x] webpack 打包后 wechaty-puppet-wechat4u 找不到
    - 安装进 dependencies 即可
- [x] tsconfig.json 中 `"rootDir": "src",` 导致 `tsc` 无法生成 dist
    - 这是因为 tsbuild 缓存，指定 `"tsBuildInfoFile": "dist/.tsbuildinfo"` 即可
- [x] `package/llm` 中 config 文件夹如何在编译后保留
    - A：在 tsconfig.json 中配置好 include 的 pattern 即可
- [x] run `swot-bot`
- [x] 跑通在 `wechat4u`（cjs） 中调用 `@cs-magic/common`（esm）
- [x] 清除 `.js | .d.ts`。见 `scripts/rm-tsc.sh`。
