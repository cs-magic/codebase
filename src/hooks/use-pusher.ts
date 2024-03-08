import { useAtom } from "jotai"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-puser/client/init"
import { pusherServerConfigs } from "../../packages/common-puser/config"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { pusherAtom } from "../store/pusher"

export const usePusher = () => {
  const [serverId] = useAtom(pusherServerIdAtom)
  const [pusher, setPusher] = useAtom(pusherAtom)

  useEffect(() => {
    if (!pusher) setPusher(initPusherClient(pusherServerConfigs[serverId]))
  }, [pusher])

  return { pusher }
}
