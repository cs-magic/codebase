// webpack.config.js
const path = require("path")

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  // entry: "./apps/swot-backend/dist/src/server.js", // 替换为你的入口文件
  entry: "./apps/swot-bot/dist/src/index.js", // 替换为你的入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  devtool: "inline-source-map",
  target: "node", // 设置打包目标为 Node.js
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    fs: "commonjs fs", // 不要打包 fs 模块
    path: "commonjs path", // 不要打包 path 模块（如果使用的话）
    "playwright-core": "commonjs playwright-core", // This will ignore 'playwright-core'
    "wechaty-puppet-service": "commonjs wechaty-puppet-service",
    // "wechaty-puppet-wechat4u": "commonjs wechaty-puppet-wechat4u",
    // 其他你可能使用的 Node.js 内置模块
  },

  plugins: [
    // new BundleAnalyzerPlugin()
  ],
}
