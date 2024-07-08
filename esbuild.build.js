const esbuild = require("esbuild")
const { replace } = require("esbuild-plugin-replace")

esbuild
  .build({
    entryPoints: ["apps/swot-backend/dist/src/server.js"], // Replace with your entry point
    bundle: true,
    outfile: "bundle.js",
    external: [
      // "wechaty-puppet-service",
      // "wechaty-puppet",
      // "wechaty-puppet-wechat4u",
    ],
    platform: "node", // Use 'browser' if bundling for the browser
    target: ["esnext"], // Replace with your target environment
    // plugins: [
    //   replace({
    //     values: {
    //       __dirname: JSON.stringify(__dirname),
    //       __filename: JSON.stringify(__filename),
    //     },
    //   }),
    // ],
  })
  .then(() => {
    console.log("Build complete")
  })
  .catch((error) => {
    console.error("Build failed:", error)
  })
