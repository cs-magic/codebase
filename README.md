# CS Magic Codebase

## todo

- [ ] run `swot-bot`
- [ ] tsconfig.json 中 `"rootDir": "src",` 导致 `tsc` 无法生成 dist
- [ ] `package/llm` 中 config 文件夹如何在编译后保留

## start

```shell
yarn db:generate
```

- wechaty-puppet 相关需要安装 `jq`，而且不能用 yarn 装，要在系统级别 (2024-06-13)：
  - mac: `brew install jq`
  - ubuntu: `sudo apt install jq`

## reference 

- [Tech](./docs/tech.md)


## finished todo

- [x] 清除 `.js | .d.ts`。见 `scripts/rm-tsc.sh`。
