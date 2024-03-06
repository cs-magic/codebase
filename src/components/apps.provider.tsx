"use client"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { api } from "../../packages/common/lib/trpc/react"
import {
  appsPersistedAtom,
  serverAppsAtom,
  uiSelectAppsDialogOpenAtom,
} from "../store/app"

/**
 * 用户初始化模型列表，首页和会话页全局需要
 * @param children
 * @constructor
 */
export default function AppsProvider({ children }: PropsWithChildren) {
  const { data: apps } = api.core.listApps.useQuery()
  const [, setAllApps] = useAtom(serverAppsAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  useEffect(() => {
    if (!apps) return

    setAllApps(apps)
    if (!persistedApps?.length) setOpen(true)
  }, [apps])

  return <>{children}</>
}
