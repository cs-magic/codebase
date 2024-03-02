"use client"

import { api } from "@/lib/trpc/react"
import { useSnapshot } from "valtio"
import { conversationsState } from "@/store/conversation"
import React, { useEffect, useState } from "react"
import { uiState } from "@/store/ui"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectPApp } from "@/components/model/select-p-app"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export const SelectPAppsDialog = () => {
  const { data: pAppsInDB = [] } = api.llm.listPApps.useQuery()
  const { pApps } = useSnapshot(conversationsState)

  const [filterPApps, setFilterPApps] = useState("")

  // console.log({ pApps, pAppsInDB })

  useEffect(() => {
    if (!pApps.length && pAppsInDB.length) {
      const gptPApp = pAppsInDB.find((p) => p.model.id === "gpt-3.5-turbo")
      if (gptPApp) conversationsState.pApps.push(gptPApp)
    }
  }, [pAppsInDB, pApps])
  const { selectPAppsOpen, selectPAppsOnOpenChange } = useSnapshot(uiState)

  return (
    <Dialog open={selectPAppsOpen} onOpenChange={selectPAppsOnOpenChange}>
      <DialogContent>
        <div className={"flex flex-col gap-2"}>
          <div>
            <Label className={"px-2 text-muted-foreground"}>
              <span>已选择</span>
              <span className={"text-xs"}>（1-3个）</span>
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
            <Label className={"px-2 text-muted-foreground"}>全部</Label>
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
