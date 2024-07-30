module.exports = {

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    // '../../.eslintrc.cjs',
  ],

  parserOptions: {
    project: [
      './tsconfig.node.json',
      './tsconfig.web.json',
    ],
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
