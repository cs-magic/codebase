"use client"

import { useSnapshot } from "valtio"
import React, { useState } from "react"
import { uiState } from "@/store/ui"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectApp } from "@/components/select-app"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { conversationStore } from "@/store/conversation"

export const SelectAppsDialog = () => {
  const { apps, allApps } = useSnapshot(conversationStore)

  const [filterPApps, setFilterPApps] = useState("")

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

            {apps.map((m, index) => (
              <SelectApp key={index} pApp={m} type={"toDel"} />
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
            {allApps
              .filter(
                (m) =>
                  m.title?.toLowerCase().includes(filterPApps.toLowerCase()) ??
                  (m.model.title
                    .toLowerCase()
                    .includes(filterPApps.toLowerCase()) ||
                    m.model.company.title.toLowerCase().includes(filterPApps)),
              )
              .map((m, index) => (
                <SelectApp key={index} pApp={m} type={"toAdd"} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
