[//]: # (# CS Magic Codebase)

![CS Magic Banner](assets/branding/cs-magic_banner_white.jpg)

[//]: # (![SWOT Logo]&#40;packages/swot-frontend/src/assets/branding/enterprise/swot.png&#41;)

## Project Overview

```mermaid
graph LR;
    subgraph general
        prisma --> common & llm;
        common --> llm;
    end
    
    subgraph wechaty_eco
        wechat4u --> wechaty-puppet-wechat4u;
        wechaty-puppet --> wechaty-puppet-wechat4u & wechaty;
        wechaty-puppet-wechat4u --> wechaty;
    end
    
    subgraph swot_backend
        general --> swot-backend;
        wechaty_eco --> swot-backend;
    end
    
    subgraph swot_frontend
        assets --> swot-frontend;
        general --> swot-frontend;
        swot_backend --> swot-frontend;
        react-hooks --> react-ui & next-hooks & swot-frontend;
        react-ui --> swot-frontend;
        next-hooks --> next-auth & swot-frontend;
        next-auth --> swot-frontend;
        swot-frontend --> swot-web & swot-pc;
    end
```

## Preparation

- you should install `jq` at the system level which is required by `wechaty-puppet`
    - mac: `brew install jq`
    - ubuntu: `sudo apt install jq`
- installation: `yarn`
- configure env （refer to `env.sample`）
- db migrate: `yarn workspace @cs-magic/prisma db:migrate:dev`

## Run

```shell
# start web in dev
yarn workspace @cs-magic/swot-backend dev & yarn workspace @cs-magic/swot-web dev

# start pc in dev
yarn workspace swot-pc dev

# build backend
yarn workspace @cs-magic/swot-backend build

# build web
yarn workspace @cs-magic/swot-frontend build

# build pc
yarn workspace swot-pc build:mac

# start web after build
yarn workspace @cs-magic/swot-frontend start

# start pc after build
# double click to install: packages/swot-pc/dist/swot-pc-${version}.dmg
```

## References 

- [Tech](__docs__/tech.md)
- [Finished Todo](__docs__/finished-todo.md)

## TODO

- [ ] fix eval-ai running prisma
- [ ] server function split for swot-pc
- [ ] `react-hooks` split next/next-auth
- [ ] `NextJS`  18.3.0 --> 18.2.0, o.w. there is warning when dev running `@cs-magic/homepage
