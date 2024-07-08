import { Brolog } from "brolog"
import { FileBox } from "@juzi/file-box"
import { MemoryCard } from "memory-card"
import { StateSwitch } from "state-switch"

import * as envVars from "./env-vars.js"

import { packageJson } from "./package-json.js"

const log = new Brolog()
const logLevel = process.env["WECHATY_LOG"]
if (logLevel) {
  log.level(logLevel.toLowerCase() as any)
  log.silly("Puppet", "Config: WECHATY_LOG set level to %s", logLevel)
}

const VERSION = packageJson.version || "0.0.0"
const NAME = packageJson.name || "NONAME"

export { envVars, FileBox, log, MemoryCard, NAME, StateSwitch, VERSION }
