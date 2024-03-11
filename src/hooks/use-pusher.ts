import { useAtom } from "jotai"
import { useEffect } from "react"
import {
  pusherServerAtom,
  pusherServerIdAtom,
} from "../../packages/common-pusher/store"
import { initPusherClient } from "../../packages/common-pusher/client/init"
import { pusherServerConfigs } from "../../packages/common-pusher/config"

export const usePusher = () => {
  const [serverId] = useAtom(pusherServerIdAtom)
  const [pusher, setPusher] = useAtom(pusherServerAtom)

  useEffect(() => {
    if (!pusher) setPusher(initPusherClient(pusherServerConfigs[serverId]))
  }, [pusher])

  return { pusher }
}
