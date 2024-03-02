"use client"

import { api } from "@/lib/trpc/react"
import { useSnapshot } from "valtio"
import React, { useEffect, useState } from "react"
import { uiState } from "@/store/ui"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectPApp } from "@/components/select-p-app"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { conversationStore } from "@/store/conversation"
import { BEST_VIEWPOINT } from "@/config/system"

export const SelectPAppsDialog = () => {
  const { data: pAppsInDB = [] } = api.llm.listPApps.useQuery()
  const { pApps } = useSnapshot(conversationStore)

  const [filterPApps, setFilterPApps] = useState("")

  // console.log({ pApps, pAppsInDB })

  useEffect(() => {
    if (!pApps.length && pAppsInDB.length) {
      const pApp = pAppsInDB.find((p) => p.model.slug === "gpt-3.5-turbo")
      if (pApp) {
        conversationStore.pApps.push(pApp)
        if (!conversationStore.currentPAppId)
          conversationStore.currentPAppId = pApp.slug
      }
    }
  }, [pAppsInDB, pApps])
  const { selectPAppsOpen, selectPAppsOnOpenChange } = useSnapshot(uiState)

  const { maxToAdd } = useSnapshot(uiState)

  return (
    <Dialog open={selectPAppsOpen} onOpenChange={selectPAppsOnOpenChange}>
      <DialogContent>
        <div className={"flex flex-col gap-2"}>
          <div>
            <Label className={"px-2 text-muted-foreground"}>
              <span>已选择</span>
              {/*<span className={"text-xs"}>（1-3个）</span>*/}
            </Label>

            {pApps.map((m, index) => (
              <SelectPApp key={index} pApp={m} type={"toDel"} />
            ))}
          </div>

          <Separator orientation={"horizontal"} />

          <Input
            className={"my-4"}
            value={filterPApps}
            onChange={(event) => {
              setFilterPApps(event.currentTarget.value)
            }}
          />

          <div>
            <Label className={"px-2 text-muted-foreground"}>
              全部
              <span className={"text-xs"}>
                （您的屏幕最多只能添加{maxToAdd}个App）
              </span>
            </Label>
            {pAppsInDB
              .filter(
                (m) =>
                  m.title?.toLowerCase().includes(filterPApps.toLowerCase()) ??
                  (m.model.title
                    .toLowerCase()
                    .includes(filterPApps.toLowerCase()) ||
                    m.model.company.title.toLowerCase().includes(filterPApps)),
              )
              .map((m, index) => (
                <SelectPApp key={index} pApp={m} type={"toAdd"} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
