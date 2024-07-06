import { isServer } from "./is-server.js"

export const isClient = !isServer
