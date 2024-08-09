# P01

## Todo

## Release

- [x] added auto update, 2024-04-04

## Architecture

### wechaty - web


1. wechat receive message: `packages/common-wechaty/message-handlers/link-parser.ts` (url: string)
2. fetch card content: `packages/3rd-wechat/wxmp-article/fetch-wxmp-article.ts` (IFetchWxmpArticleRes)
   1. parse summary: `packages/common-article/parse-summary.ts`
3. start simulator: `src/core/uni-parser.ts` (FileBox)
   1. generate card in simulator: `src/components/gen-card_frontend.tsx` ({cardContent, user} --> FileBox)
4. FileBox back to reply message: `packages/common-wechaty/message-handlers/link-parser.ts`

## BugFix

### `@t3-oss/env-nextjs` 在 jest 下有问题，现已弃用

last-commit@ee897b2

## Tech

### 字体

卡片里用了 苹方（显示中文）和 Zapfino（显示底部花体），其中：
- Zapfino 直接配置在 /public/fonts 下（因为不大）

## History

- 2024-04-14: [V6] added frequency control on Wechaty onMessage in case of account  banning

