"use client"
import { Sidebar } from "@/components/sidebar"
import ansiColors from "ansi-colors"
import { PropsWithChildren, useEffect } from "react"
import { api } from "../../../../packages/common-trpc/react"
import { Separator } from "../../../../packages/common-ui/shadcn/shadcn-components/separator"
import { coreStore } from "../../../store/core.valtio"

export default function ConvLayout({ children }: PropsWithChildren) {
  const { data: convsInDB } = api.core.listConv.useQuery()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) coreStore.convs = convsInDB
  }, [convsInDB])

  // 5. 当离开会话的时候，置空
  useEffect(() => {
    return () => {
      console.log(ansiColors.red("clear conv since leaving"))
      coreStore.conv = null
    }
  }, [])

  console.log(ansiColors.red("== ConvLayout =="))

  return (
    <div className={"w-full h-full overflow-hidden flex"}>
      <Sidebar className={"hidden sm:w-60"} />

      <Separator orientation={"vertical"} className={"hidden sm:block"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
