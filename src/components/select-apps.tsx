"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "../../packages/common/components/ui/dialog"
import { Label } from "../../packages/common/components/ui/label"
import { SelectApp } from "./select-app"
import { Separator } from "../../packages/common/components/ui/separator"
import { Input } from "../../packages/common/components/ui/input"
import { useAtom } from "jotai"

import {
  serverAppsAtom,
  appsPersistedAtom,
  uiMaxAppsAtom,
  uiSelectAppsDialogOpenAtom,
} from "@/store/app"

export const AppsDialog = () => {
  const [allApps] = useAtom(serverAppsAtom)
  const [persistedApps] = useAtom(appsPersistedAtom)

  const [appFilter, setAppFilter] = useState("")
  const [open, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)
  const [maxToAdd] = useAtom(uiMaxAppsAtom)

  const filteredApps = allApps.filter(
    (m) =>
      m.title?.toLowerCase().includes(appFilter.toLowerCase()) ??
      (m.model.title.toLowerCase().includes(appFilter.toLowerCase()) ||
        m.model.company.title.toLowerCase().includes(appFilter)),
  )

  // console.log({ allApps, appFilter, filteredApps, maxToAdd })
  // console.log({ persistedApps })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className={"flex flex-col gap-2"}>
          <div>
            <Label className={"px-2 text-muted-foreground"}>
              <span>已选择的 App</span>
              <span className={"text-xs"}>（至少选择1个）</span>
            </Label>

            {persistedApps.map((m, index) => (
              <SelectApp key={index} app={m} type={"toDel"} />
            ))}
          </div>

          <Separator orientation={"horizontal"} />

          <Input
            className={"my-4"}
            value={appFilter}
            onChange={(event) => {
              setAppFilter(event.currentTarget.value)
            }}
          />

          <div>
            <Label className={"px-2 text-muted-foreground"}>
              全部 App
              <span className={"text-xs"}>
                （您的屏幕最多只能添加{maxToAdd}个App）
              </span>
            </Label>
            {filteredApps.map((m, index) => (
              <SelectApp key={index} app={m} type={"toAdd"} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
