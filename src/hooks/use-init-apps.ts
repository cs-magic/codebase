import { useAtom } from "jotai"
import { useEnvironments } from "../../packages/common-hooks/use-environments"
import { api } from "../../packages/common-trpc/react"
import { appsPersistedAtom, pushAppAtom, serverAppsAtom } from "../store/app"
import { useEffect } from "react"
import { toast } from "sonner"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 */
export const useInitApps = () => {
  const { data: apps } = api.core.listApps.useQuery()
  const [, setAllApps] = useAtom(serverAppsAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, pushApp] = useAtom(pushAppAtom)
  const { isMobile } = useEnvironments()

  useEffect(() => {
    if (!apps) return
    setAllApps(apps)
  }, [apps])

  useEffect(() => {
    if (!apps) return
    const gptApps = apps.filter((app) =>
      ["gpt-3.5-turbo", "gpt-4"].includes(app.id),
    )
    if (!gptApps.length) toast.error("apps 没有初始化！", { duration: 0 })

    if (
      // 不加这个会熬制重复
      persistedApps &&
      !persistedApps.length
    )
      gptApps.slice(0, isMobile ? 1 : 2).forEach((app) => pushApp(app))
  }, [apps?.length, persistedApps.length])
}
