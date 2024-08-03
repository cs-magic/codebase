## Tech

### project relative instruction

- `wechaty-puppet-*` 之类的 puppet 的 dependencies 里不要加 `wechaty`，否则在 yarn monorepo 里会导致 circular dependencies error，主要是这些 puppet 的实际代码里也没有 `wechaty` （只在 tests 里有）
- `next-auth` 的 package.json 里 type 不能是 module，否则 nextjs 导入时会有 provider default 问题

### Debug

当想确定什么进程没有退出的时候：

```shell
import wtfnode from "wtfnode"

export const debugProcesses = () => {
  wtfnode.dump()
}

```

### eslint

currently works:

![eslint-config.png](./eslint-config.png)

todo:
- with extend
- IDE no warning when setting Automatic

### jest(ts-jest)

- configuration
    - [!important] init jest/ts-jest: https://jestjs.io/docs/getting-started
    - [!important] esm support: https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
    - webstorm jest: https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_jest_navigation
- async test: https://dev.to/darkmavis1980/how-to-test-an-async-function-to-throw-an-exception-in-jest-3a90
- 解决`import.meta`，参考：https://github.com/kulshekhar/ts-jest/issues/3888
    - 法一（简单暴力，但是新命令容易遗忘）：use `node --experimental-vm-modules`
    - 法二（写死在配置里）：
```ts
/**
 * 允许在 jest 里使用：fileURLToPath(import.meta.url)
 */
const fixImportMeta = {
  // 不加这个，会导致：The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.
  diagnostics: { ignoreCodes: [1343] },

  // 不加这个，会导致：Cannot use 'import.meta' outside a module
  astTransformers: { before: [{ path: "ts-jest-mock-import-meta" }] },
}
``` 
