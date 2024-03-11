import { useAtom } from "jotai"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-pusher/client/init"
import { pusherServerConfigs } from "../../packages/common-pusher/config"
import {
  pusherClientAtom,
  pusherServerIdAtom,
} from "../../packages/common-pusher/store"

export const usePusher = () => {
  const [serverId] = useAtom(pusherServerIdAtom)
  const [pusher, setPusher] = useAtom(pusherClientAtom)

  useEffect(() => {
    if (!!pusher) return

    const newPusher = initPusherClient(pusherServerConfigs[serverId])

    setPusher(newPusher)
  }, [pusher])

  return { pusher }
}
