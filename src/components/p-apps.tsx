"use client"

import { Fragment } from "react"
import { Separator } from "@/components/ui/separator"
import { PAppComp } from "@/components/p-app"
import { conversationStore } from "@/store/conversation"
import { useSnapshot } from "valtio"

export const PAppsComp = () => {
  const { pApps } = useSnapshot(conversationStore)

  return (
    <div className={"grow overflow-auto flex justify-center"}>
      {pApps.map((pApp) => (
        <Fragment key={pApp.id}>
          <PAppComp pApp={pApp} />
          <Separator orientation={"vertical"} className={"last:hidden"} />
        </Fragment>
      ))}
    </div>
  )
}
