# Sokka AI !

## Todo

- [ ] 研究怎么把 trpc 静态编译那玩意给 generic 了

## Architecture

### 要点

- 后台静默流是可以不做的（或者高级版？），因为需要维护一个进程池，没有必要，用户打断我们即中止
- 消息的回溯是可以不做的（或者高级版？），因为要考虑数据库同步问题，以及组装上下文到底是在客户端还是服务端
- 【乐观刷新】前期为了保证开发速度与质量，可以暂时先不用
- 【状态管理】jotai vs zustand vs vs valtio
- 【trpc状态同步】在列表页上，我们还是用了invalidate机制，避免了手写各种convs的更新与对齐，然后本地的convs始终对齐trcp的列表数据即可


### Conversation

- queryConv --> queryRequest --> queryResponse
- queryRequest = queryContext + n * queryConfig
- queryConfig -- queryResponse

### api ref

- openai: https://github.com/openai/openai-python/issues/952#issuecomment-1857207339

## Tech

### [Init] install

```shell
# ref: https://github.com/yarnpkg/berry/issues/3521#issuecomment-1907517793
# 阿里的库会有证书过期问题
yarn config set "strict-ssl" false -g
```

### [zod-prisma-types] 

- zod 的版本有要求（不能太高）：`yarn add zod@3.21.1`，参考：https://github.com/chrishoermann/zod-prisma-types/issues/222
- 之前在开发 lit-agent 项目的时候有 build bug，现在重新试了一下，又没了。。
- 且用且看吧

### [NextJS] server action 在 dev 里可以放在 route 里，但 build 时会失败

### [DevOps] 控制台颜色

首先，我们读了 trpc 的 loggerLink 源码，它是用 ansi/css 两种写法分别决定 node/browser 颜色的

我尝试了 colors, chalk（[基于gpt](https://chat.openai.com/c/756f58ea-4d30-4b74-9c52-e4847dd2fdbf)），都只能 node 用

最后在[ chalk 的一个 issue](https://github.com/chalk/chalk/issues/535#issuecomment-1072761585) 里顺着别人的路用了 `ansi-colors`

### [Core] Websocket Integration

- vercel 不推荐，参考：
  - Do Vercel Serverless Functions support WebSocket connections?, https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections#enabling-realtime-communication
  - (1) Websockets with nextjs 13 : nextjs, https://www.reddit.com/r/nextjs/comments/13360t3/websockets_with_nextjs_13/

- 使用 soketi
  - pm2 的时候要注意，`soketi-pm2` 不支持 config，不如直接 `pm2 start soketi -- start --config=xx`
    - [bug] PM2 doesn't pass through command line arguments on Windows · Issue #320 · soketi/soketi, https://github.com/soketi/soketi/issues/320

### [Polyfill] tsx 导入 Credentials

```ts
import CredentialsModule from "next-auth/providers/credentials"

// sb tsx 需要用 default
const Credentials = (
  "default" in CredentialsModule ? CredentialsModule.default : CredentialsModule
) as typeof CredentialsModule
```


### [UI] text with gradient color

- How to do gradient text with Tailwind CSS, https://design2tailwind.com/blog/tailwindcss-gradient-text/

### [Backend] nginx

- redirect problem from `http` to `https`, see: https://serverfault.com/a/680592
  - solution: 把 `$servername` 改成 `$host` 就可以了

### [Core] wechat-auth

虽然微信登录起步是访问一个 open-wechat 的网址，但不能直接点击跳转，而是在 provider 的 authorizationUrl 里配置好后，在程序里使用 `signIn` 去操作，否则会报 `State cookie was missing`。

### [Core] zustand

- zustand doesn't recommend `create without curried workaround`, see: https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#create-without-curried-workaround

## BUGFIX

### sonner 版本要求

这个不行： `"sonner": "^1.4.0",`，参考：https://github.com/emilkowalski/sonner/issues/353

### jotai 不可以 在 set 里 set writable variable， 那是用于 useAtom 的，见：

![img.png](docs/jotai-writeable.png)

ref:
- https://jotai.org/docs/core/atom
- https://chat.openai.com/c/52cf8ab1-de90-4249-8239-322d2f860d33

### - [x] `import sum from "lodash/sum"`

问题： 这个会导致 `yarn update` 在 `spawn` 里编译时失败。

解决：将 `@types/lodash` 加入 prod 依赖即可。

原因分析：还没有完全明白，就是在全新的shell里编译好像会导致node_modules不符合预期，这个可以做一个新的todo。


## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
