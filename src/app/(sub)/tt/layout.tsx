"use client"
import { Sidebar } from "@/components/sidebar"
import { appIdPersistedAtom, appsPersistedAtom } from "@/store/app"
import { serverConvDetailAtom, serverConvListFAtom } from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { api } from "../../../../packages/common/lib/trpc/react"

export default function ConvLayout({ children }: PropsWithChildren) {
  const [persistedApps, setPersistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [, setConvs] = useAtom(serverConvListFAtom)
  const [, setConv] = useAtom(serverConvDetailAtom)

  const { data: convsInDB } = api.core.listConv.useQuery()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) setConvs(convsInDB)
  }, [convsInDB])

  // 3. 当有persisted app 但没有selected app时，自动选第一个
  useEffect(() => {
    if (!persistedApps.length) return
    // 确保当前选中的app还在列表内
    if (selectedAppID && persistedApps.find((p) => p.id === selectedAppID))
      return
    const firstAppId = persistedApps[0]!.id
    console.log("-- setting selected app id to be the first one: ", {
      firstAppId,
    })
    setSelectedAppID(firstAppId)
  }, [persistedApps.length])

  // 5. 当离开会话的时候，置空
  useEffect(() => {
    return () => {
      console.log(ansiColors.red("clear conv since leaving"))
      setConv(null)
    }
  }, [])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
