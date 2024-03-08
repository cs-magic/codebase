import { useAtom } from "jotai"
import { initPusherClient } from "../../packages/common-puser/client/init"
import { pusherServerConfigs } from "../../packages/common-puser/config"
import { pusherServerIdAtom } from "../../packages/common-puser/store"

export const usePusher = () => {
  const [serverId] = useAtom(pusherServerIdAtom)

  const pusher = initPusherClient(pusherServerConfigs[serverId])
  return { pusher }
}
