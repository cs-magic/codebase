# CS Magic Codebase

## Tech

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
