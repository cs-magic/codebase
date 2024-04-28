import type { JestConfigWithTsJest } from "ts-jest"

/**
 * 允许在 jest 里使用：fileURLToPath(import.meta.url)
 */
const fixImportMeta = {
  // 不加这个，会导致：The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.
  diagnostics: { ignoreCodes: [1343] },

  // 不加这个，会导致：Cannot use 'import.meta' outside a module
  astTransformers: { before: [{ path: "ts-jest-mock-import-meta" }] },
}

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: "node",

  // [...]
  preset: "ts-jest/presets/default-esm", // or other ESM presets

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,

        ...fixImportMeta,
      },
    ],
  },

  transformIgnorePatterns: ["node_modules/(?!(nanoid)/)"],
}

export default jestConfig
