// "use client"
// import { Channel } from "pusher-js"
// import { useEffect, useState } from "react"
// import { EventCallback, EventType } from "@/lib/puser/schema"
//
// import "colors"
// import tt from "ansi-colors"
// import { pusherClient } from "./init"
// import { toast } from "sonner"
// import { useModelStore } from "@/store/model.slice"
//
// export const usePusherSubscribeChannel = () => {
//   const channelId = useModelStore((state) => state.channelId)
//
//   const [channel, setChannel] = useState<Channel>()
//   useEffect(() => {
//     if (channelId) setChannel(pusherClient.subscribe(channelId))
//     return () => {
//       if (channelId) pusherClient.unsubscribe(channelId)
//       setChannel(undefined)
//     }
//   }, [channelId])
//
//   return { channel }
// }
//
// let n = 0
// export const usePusherBindEvent = <T extends EventType>(
//   type: T,
//   f: EventCallback<T>,
//   options?: { channel?: Channel; enabled?: boolean },
// ) => {
//   const target = options?.channel ?? pusherClient
//   const enabled = options?.enabled !== false
//
//   const call: EventCallback<T> = (data) => {
//     ++n
//     console.log(tt.bgBlueBright.black.bold(` >> #${n} ${type} `), data)
//     const result = f(data)
//     console.log(tt.bgMagenta.whiteBright.bold(` << #${n} ${type} `), result)
//     return result
//   }
//
//   useEffect(() => {
//     if (!enabled) return
//
//     target.bind(type, call)
//
//     return () => {
//       target.unbind(type, call)
//     }
//   }, [options])
//
//   return { enabled, target }
// }
//
// /**
//  *  自动监听当有channel的时候就开始触发客户端操作
//  *
//  *  todo: listen multiple channels
//  */
// export const useSocketChannel = () => {
//   const { channel } = usePusherSubscribeChannel()
//
//   usePusherBindEvent(
//     "onNotification",
//     (data) => {
//       toast.info(`onNotification: ${JSON.stringify(data)}`)
//     },
//     { channel },
//   )
//
//   usePusherBindEvent(
//     "onUserMessage",
//     (data) => {
//       console.log("onUserMessage: ", { data })
//       toast.info(`onUserMessage: ${JSON.stringify(data)}`)
//     },
//     { channel, enabled: !!channel },
//   )
// }
