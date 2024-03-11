"use client"

import React, { useState } from "react"
import { api } from "../../packages/common-trpc/react"
import {
  Dialog,
  DialogContent,
} from "../../packages/common-ui/shadcn/shadcn-components/dialog"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { appsPersistedAtom, serverAppsAtom } from "../../deprecated/v2/app.atom"
import { maxAppsOnScreenAtom } from "../store/core.atom"

import { selectAppsDialogOpenAtom } from "../store/ui.atom"
import { convStore } from "../store/conv.valtio"
import { SelectApp } from "./select-app"
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"
import { useAtom } from "jotai"

import { useSnapshot } from "valtio"

export const AppsDialog = () => {
  const { apps } = useSnapshot(convStore)

  // const [allApps] = useAtom(serverAppsAtom)
  // const [persistedApps] = useAtom(appsPersistedAtom)

  const { data: allApps = [] } = api.core.listApps.useQuery()
  const [appFilter, setAppFilter] = useState("")
  const filteredApps = allApps.filter(
    (m) =>
      m.title?.toLowerCase().includes(appFilter.toLowerCase()) ??
      (m.model.title.toLowerCase().includes(appFilter.toLowerCase()) ||
        m.model.company.title.toLowerCase().includes(appFilter)),
  )

  const [open, setOpen] = useAtom(selectAppsDialogOpenAtom)
  const [maxToAdd] = useAtom(maxAppsOnScreenAtom)

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

            {apps.map((m, index) => (
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
