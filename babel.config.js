module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },

        modules: "auto", // This line might need to be adjusted based on your setup
      },
    ],
    "@babel/preset-typescript", // 如果您使用 TypeScript
  ],
}
