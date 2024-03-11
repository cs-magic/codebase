import { useAtom } from "jotai"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-transport/client/init"
import { pusherServerConfigs } from "../../packages/common-transport/config"
import {
  pusherServerAtom,
  pusherServerIdAtom,
} from "../../packages/common-transport/store"

export const usePusher = () => {
  const [serverId] = useAtom(pusherServerIdAtom)
  const [pusher, setPusher] = useAtom(pusherServerAtom)

  useEffect(() => {
    if (!pusher) setPusher(initPusherClient(pusherServerConfigs[serverId]))
  }, [pusher])

  return { pusher }
}
