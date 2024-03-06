"use client"
import { Sidebar } from "@/components/sidebar"
import { appIdPersistedAtom, appsPersistedAtom } from "@/store/app"
import {
  convDetailFromServerAtom,
  convsFromServerAtom,
  requestAtom,
  requestIdAtom,
} from "@/store/conv"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { api } from "../../../../packages/common/lib/trpc/react"

export default function ConvLayout({ children }: PropsWithChildren) {
  const [persistedApps, setPersistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [request] = useAtom(requestAtom)
  const [requestId, setRequestId] = useAtom(requestIdAtom)
  const [, setConvs] = useAtom(convsFromServerAtom)
  const [, setConv] = useAtom(convDetailFromServerAtom)

  const { data: convsInDB } = api.core.listConv.useQuery()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) setConvs(convsInDB)
  }, [convsInDB])

  // note：应该要request_id变，再决定apps变！conv变是不行的，因为request可能不同步
  useEffect(() => {
    if (!request) return
    const newApps = request.responses.map((r) => r.app)
    console.log(ansiColors.red("setting apps: "), {
      request,
      persistedApps,
      newApps,
    })
    setPersistedApps(newApps)
  }, [requestId])

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

  // ~~ 6. 当 conv 个数变化时，重置 ~~
  // 不需要重置，现在是服务器向客户端单向更新 convs
  // useEffect(() => void utils.core.listConv.invalidate(), [convs.length])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
