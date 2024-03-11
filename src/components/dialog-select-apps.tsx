"use client"

import { useAtom } from "jotai"
import React, { useState } from "react"

import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"
import {
  Dialog,
  DialogContent,
} from "../../packages/common-ui/shadcn/shadcn-components/dialog"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
import { IAppDetail } from "../schema/app.detail"
import { coreStore } from "../store/core.valtio"
import { maxAppsOnScreenAtom } from "../store/system.atom"

import { selectAppsDialogOpenAtom } from "../store/ui.atom"
import { DialogSelectApp } from "./dialog-select-app"

export const AppsDialog = () => {
  const [open, setOpen] = useAtom(selectAppsDialogOpenAtom)
  const [maxToAdd] = useAtom(maxAppsOnScreenAtom)

  const { apps } = useSnapshot(coreStore)

  const { data: allApps = [] } = api.core.listApps.useQuery()
  const [appFilter, setAppFilter] = useState("")
  const filteredApps = allApps.filter(
    (m) =>
      m.title?.toLowerCase().includes(appFilter.toLowerCase()) ??
      (m.model.title.toLowerCase().includes(appFilter.toLowerCase()) ||
        m.model.company.title.toLowerCase().includes(appFilter)),
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className={"flex flex-col gap-2"}>
          <div>
            <Label className={"px-2 text-muted-foreground"}>
              <span>已选择的 App</span>
              <span className={"text-xs"}>（至少选择1个）</span>
            </Label>

            {(apps as IAppDetail[]).map((app, index) => (
              <DialogSelectApp key={index} app={app} type={"toDel"} />
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
            {filteredApps.map((app, index) => (
              <DialogSelectApp key={index} app={app} type={"toAdd"} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
