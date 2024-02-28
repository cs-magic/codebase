import { IPusherServerConfig } from "@/lib/puser/schema"
import { z } from "zod"

export const pusherServerIdSchema = z.union([
  z.literal("aws"),
  z.literal("tencent_ws"),
  z.literal("tencent_wss"),
])
export type PusherServerId = z.infer<typeof pusherServerIdSchema>

export const pusherServerConfigs: Record<PusherServerId, IPusherServerConfig> =
  {
    aws: {
      /**
       * @note: aws 的公网 ip 在关机重启后会变
       */
      host: "52.81.205.226",
      port: 6001,
      useTLS: false,
      cluster: "0.0.0.0",
    },
    tencent_ws: {
      host: "socket.cs-magic.cn",
      port: 6001, // tls 下这个参数是直接无视的
      useTLS: false,
      cluster: "0.0.0.0",
    },
    tencent_wss: {
      host: "socket.cs-magic.cn",
      port: 443, // tls 下这个参数是直接无视的
      useTLS: true,
      cluster: "0.0.0.0",
    },
  }
