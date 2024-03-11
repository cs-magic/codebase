"use client"
import { Sidebar } from "@/components/sidebar"
import ansiColors from "ansi-colors"
import { PropsWithChildren, useEffect } from "react"
import { useSnapshot } from "valtio"
import { api } from "../../../../packages/common-trpc/react"
import { Separator } from "../../../../packages/common-ui/shadcn/shadcn-components/separator"
import { coreValtio } from "../../../store/core.valtio"

export default function ConvLayout({ children }: PropsWithChildren) {
  const { apps, appId } = useSnapshot(coreValtio)

  const { data: convsInDB } = api.core.listConv.useQuery()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) coreValtio.convs = convsInDB
  }, [convsInDB])

  // 3. 当有persisted config 但没有selected app时，自动选第一个
  useEffect(() => {
    if (!apps.length) return

    // 确保当前选中的app还在列表内
    if (appId && apps.find((p) => p.id === appId)) return

    coreValtio.appIndex = 0
  }, [apps.length])

  // 5. 当离开会话的时候，置空
  useEffect(() => {
    return () => {
      console.log(ansiColors.red("clear conv since leaving"))
      coreValtio.conv = null
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
