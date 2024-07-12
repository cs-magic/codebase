// webpack.config.js
const path = require("path")
const webpack = require("webpack")

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  entry: "./apps/swot-backend/dist/src/index.js", // 替换为你的入口文件
  // entry: "./apps/swot-bot/dist/src/index.js", // 替换为你的入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  // mode: "development",
  mode: "production",
  devtool: "source-map",
  target: "node", // 设置打包目标为 Node.js
  module: {
    rules: [
      // 不加这个的话，playwright-core打包不了，ref: https://github.com/microsoft/playwright/issues/5627#issuecomment-955775403
      {
        test: /playwright-core.*\.(png|html|css|ttf|svg)$/,
        use: "raw-loader",
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },

  externals: {
    fs: "commonjs fs", // 不要打包 fs 模块
    path: "commonjs path", // 不要打包 path 模块（如果使用的话）
    "wechaty-puppet-service": "commonjs wechaty-puppet-service",
    // "wechaty-puppet-wechat4u": "require('wechaty-puppet-wechat4u')", // 要打包 wechat4u，否则得手动装很多依赖
    // 其他你可能使用的 Node.js 内置模块
  },

  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  stats: {
    // assets: true,
    // modules: true,
    // reasons: true,
    // 你可以根据需要启用其他选项
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
}
