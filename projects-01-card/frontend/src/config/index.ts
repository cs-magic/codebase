import config_ from "./config.json"

import monorepoPackageJson from "../../../../package.json"

export const config = config_
config.version = monorepoPackageJson.version
