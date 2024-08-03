# CS Magic Codebase

## project overview

```mermaid
graph TD;
    @cs-magic/prisma --> *;
    @cs-magic/common --> *;
    @cs-magic/llm --> *;
    wechat4u --> wechaty-puppet-wechat4u;
    wechaty-puppet --> wechaty-puppet-wechat4u;
    wechaty-puppet --> wechaty;
    wechaty-puppet-wechat4u --> wechaty;
    wechaty-puppet --> @cs-magic/swot-backend;
    wechaty --> @cs-magic/swot-backend;
    @cs-magic/swot-backend --> @cs-magic/swot-frontend;
    @cs-magic/react-hooks --> @cs-magic/next-hooks;
    @cs-magic/react-hooks --> @cs-magic/swot-frontend;
    @cs-magic/react-ui --> @cs-magic/swot-frontend;
    @cs-magic/next-hooks --> @cs-magic/next-auth;
    @cs-magic/next-hooks --> @cs-magic/swot-frontend;
    @cs-magic/next-auth --> @cs-magic/swot-frontend;
    @cs-magic/swot-frontend --> @cs-magic/swot-web;
    @cs-magic/swot-frontend --> swot-pc;
```

## environment preparation

- wechaty-puppet 相关需要安装 `jq`，而且不能用 yarn 装，要在系统级别 (2024-06-13)：
    - mac: `brew install jq`
    - ubuntu: `sudo apt install jq`

## start

```shell
# 会触发 post-install: db:generate
yarn
```

## project relative instruction

- `wechaty-puppet-*` 之类的 puppet 的 dependencies 里不要加 `wechaty`，否则在 yarn monorepo 里会导致 circular dependencies error，主要是这些 puppet 的实际代码里也没有 `wechaty` （只在 tests 里有）
- `next-auth` 的 package.json 里 type 不能是 module，否则 nextjs 导入时会有 provider default 问题

## reference 

- [Tech](__docs__/tech.md)
- [Finished Todo](__docs__/finished-todo.md)

## todo

- [ ] 【重要】server function split for swot-pc
- [ ] `@cs-magic/react-hooks` split next/next-auth
