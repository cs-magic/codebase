# CS Magic Codebase

## todo

- [ ] 【重要】server function split for swot-pc 
- [ ] `@cs-magic/react-hooks` split next/next-auth
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
- `wechaty-puppet-*` 之类的 puppet 的 dependencies 里不要加 `wechaty`，否则在 yarn monorepo 里会导致 circular dependencies error，主要是这些 puppet 的实际代码里也没有 `wechaty` （只在 tests 里有）

## instruction

- `next-auth` 的 package.json 里 type 不能是 module，否则 nextjs 导入时会有 provider default 问题

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
