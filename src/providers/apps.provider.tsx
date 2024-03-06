"use client"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { toast } from "sonner"
import { api } from "../../packages/common/lib/trpc/react"
import { appsPersistedAtom, pushAppAtom, serverAppsAtom } from "../store/app"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function AppsProvider({ children }: PropsWithChildren) {
  const { data: apps } = api.core.listApps.useQuery()
  const [, setAllApps] = useAtom(serverAppsAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, pushApp] = useAtom(pushAppAtom)

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

    if (!persistedApps?.length)
      gptApps.slice(0, 2).forEach((app) => pushApp(app))
  }, [apps?.length, persistedApps.length])

  return <>{children}</>
}
