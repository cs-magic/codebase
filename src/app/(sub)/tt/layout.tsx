"use client"
import { Sidebar } from "@/components/sidebar"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { PropsWithChildren, useEffect } from "react"
import { api } from "../../../../packages/common-trpc/react"
import { Separator } from "../../../../packages/common-ui/shadcn/shadcn-components/separator"
import { appIdPersistedAtom, appsPersistedAtom } from "../../../store/app.atom"
import { convAtom, convsAtom } from "../../../store/conv.atom"

export default function ConvLayout({ children }: PropsWithChildren) {
  const [apps] = useAtom(appsPersistedAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(appIdPersistedAtom)
  const [, setConvs] = useAtom(convsAtom)
  const [, setConv] = useAtom(convAtom)

  const { data: convsInDB } = api.core.listConv.useQuery()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) setConvs(convsInDB)
  }, [convsInDB])

  // 3. 当有persisted config 但没有selected app时，自动选第一个
  useEffect(() => {
    if (!apps.length) return
    // 确保当前选中的app还在列表内
    if (selectedAppID && apps.find((p) => p.id === selectedAppID)) return
    const firstAppId = apps[0]!.id
    console.log("-- setting selected config id to be the first one: ", {
      firstAppId,
    })
    setSelectedAppID(firstAppId)
  }, [apps.length])

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
