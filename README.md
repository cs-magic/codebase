# CS Magic Codebase

## todo

- [ ] Electron-IPC vs WebSocket
- [ ] webpack 打包后 wechaty-puppet-wechat4u 找不到
- [ ] tsconfig.json 中 `"rootDir": "src",` 导致 `tsc` 无法生成 dist
- [ ] `package/llm` 中 config 文件夹如何在编译后保留
- [x] run `swot-bot`
- [x] 跑通在 `wechat4u`（cjs） 中调用 `@cs-magic/common`（esm）

## start

```shell
yarn db:generate
```

- wechaty-puppet 相关需要安装 `jq`，而且不能用 yarn 装，要在系统级别 (2024-06-13)：
  - mac: `brew install jq`
  - ubuntu: `sudo apt install jq`

## bugfix

### electron 安装时需要固定版本

### file-box、padlocal-ts包默认安装的 jimp 是 0.16，没有 es/index.js，导致 vite 打包时错误，在根目录强制为 0.22 即可，see: https://chatgpt.com/c/5dfc8a13-42b2-4c1b-9596-81e23cf1f4bb

```json lines
// $ROOT/package.json
{
  "resolutions": {
    "jimp": "0.22.12"
  }
}
```

### qrcode-terminal octal

```shell
gsed -i 's#\\033\[40m  \\033\[0m#\u001B[40m  \u001B[0m#g' node_modules/qrcode-terminal/lib/main.js
gsed -i 's#\\033\[47m  \\033\[0m#\u001B[47m  \u001B[0m#g' node_modules/qrcode-terminal/lib/main.js
```

### tiktoken wasm problem

see: https://chatgpt.com/c/84c78d18-bdee-4646-b2f6-4f54d95db0e0



## reference 

- [Tech](./docs/tech.md)


## finished todo

- [x] 清除 `.js | .d.ts`。见 `scripts/rm-tsc.sh`。
