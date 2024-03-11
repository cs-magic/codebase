import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"
import { coreValtio } from "../store/core.valtio"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 */
export const useInitApps = () => {
  const { data: serverApps } = api.core.listApps.useQuery()

  const { apps } = useSnapshot(coreValtio)

  useEffect(() => {
    if (!serverApps || !!apps.length) return

    coreValtio.initAppsFromServer(serverApps)
  }, [serverApps, apps.length])
}
