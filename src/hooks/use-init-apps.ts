import {useAtomValue} from "jotai"
import {useEffect} from "react"
import {api} from "../../packages/common-trpc/react"
import {convAtomStore} from "../store/conv.store"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 */
export const useInitApps = () => {
  const { data: serverApps } = api.core.listApps.useQuery()

  // const [, setAllApps] = useAtom(serverAppsAtom)
  // const [apps] = useAtom(appsPersistedAtom)
  // const [, pushApp] = useAtom(pushAppAtom)

  // const apps = useConvStore.use.apps()
  // const initAppsFromServer = useConvStore.use.initAppsFromServer()

  // const { apps } = useSnapshot(convStore)
  const { apps, initAppsFromServer, appId } = useAtomValue(convAtomStore)

  useEffect(() => {
    if (!serverApps || !!apps.length) return

    console.log({appId, apps})
    // convStore.
    initAppsFromServer(serverApps)
  }, [serverApps, apps.length])
}
