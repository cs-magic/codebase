import Pusher from "pusher"

import { getEnv } from "@cs-magic/env"
import { IPusherServerConfig } from "../schema.js"

const env = getEnv()

export const initPusherServer = (config: IPusherServerConfig) => {
  const { port, useTLS, cluster, host } = config

  if (
    !env?.PUSHER_APP_ID ||
    !env?.NEXT_PUBLIC_PUSHER_APP_KEY ||
    !env?.PUSHER_APP_SECRET
  )
    throw new Error("invalid pusher config")

  return new Pusher({
    host,
    port: port === undefined ? port : port.toString(),
    useTLS,
    cluster,

    appId: env?.PUSHER_APP_ID,
    key: env?.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: env?.PUSHER_APP_SECRET,
  })
}
