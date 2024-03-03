"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "../../packages/common/components/ui/dialog"
import { Label } from "../../packages/common/components/ui/label"
import { QueryConfigSelector } from "@/components/query-config-selector"
import { Separator } from "../../packages/common/components/ui/separator"
import { Input } from "../../packages/common/components/ui/input"
import { useAtom } from "jotai"

import {
  allQueryConfigsAtom,
  persistedQueryConfigsAtom,
  uiMaxQueryConfigsAtom,
  uiSelectQueryConfigsDialogOpenAtom,
} from "@/store/query-config.atom"

export const QueryConfigsSelector = () => {
  const [allQueryConfigs] = useAtom(allQueryConfigsAtom)
  const [persistedQueryConfigs] = useAtom(persistedQueryConfigsAtom)

  const [filterPApps, setFilterPApps] = useState("")
  const [open, setOpen] = useAtom(uiSelectQueryConfigsDialogOpenAtom)
  const [maxToAdd] = useAtom(uiMaxQueryConfigsAtom)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className={"flex flex-col gap-2"}>
          <div>
            <Label className={"px-2 text-muted-foreground"}>
              <span>已选择</span>
              {/*<span className={"text-xs"}>（1-3个）</span>*/}
            </Label>

            {persistedQueryConfigs.map((m, index) => (
              <QueryConfigSelector key={index} queryConfig={m} type={"toDel"} />
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
            {allQueryConfigs
              .filter(
                (m) =>
                  m.title?.toLowerCase().includes(filterPApps.toLowerCase()) ??
                  (m.model.title
                    .toLowerCase()
                    .includes(filterPApps.toLowerCase()) ||
                    m.model.company.title.toLowerCase().includes(filterPApps)),
              )
              .map((m, index) => (
                <QueryConfigSelector
                  key={index}
                  queryConfig={m}
                  type={"toAdd"}
                />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
