# CS Magic Codebase

## todo

- [ ] Electron-IPC vs WebSocket
- [ ] webpack 打包后 wechaty-puppet-wechat4u 找不到
- [ ] tsconfig.json 中 `"rootDir": "src",` 导致 `tsc` 无法生成 dist
- [x] `package/llm` 中 config 文件夹如何在编译后保留
  - A：在 tsconfig.json 中配置好 include 的 pattern 即可
- [x] run `swot-bot`
- [x] 跑通在 `wechat4u`（cjs） 中调用 `@cs-magic/common`（esm）

## start

```shell
# 会触发 post-install: db:generate
yarn
```

- wechaty-puppet 相关需要安装 `jq`，而且不能用 yarn 装，要在系统级别 (2024-06-13)：
  - mac: `brew install jq`
  - ubuntu: `sudo apt install jq`

## instruction

### debug tech

当想确定什么进程没有退出的时候：

```shell
import wtfnode from "wtfnode"

export const debugProcesses = () => {
  wtfnode.dump()
}

```

## reference 

- [Tech](__docs__/tech.md)


## finished todo

- [x] 清除 `.js | .d.ts`。见 `scripts/rm-tsc.sh`。
