import config_ from "./config.json"

import monorepoPackageJson from "../../../package.json"

export const config = config_
config.version = monorepoPackageJson.version

export * from "./schema"
export * from "./utils"
export * from "./env"
export * from "./db"
export * from "./path"
export * from "./log"
