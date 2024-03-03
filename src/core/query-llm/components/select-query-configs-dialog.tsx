"use client"

import React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectQueryConfig } from "@/core/query-llm/components/select-query-config"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useAtom } from "jotai"

import {
  queryConfigsAtom,
  uiMaxQueryConfigsAtom,
  uiSelectQueryConfigsDialogOpenAtom,
} from "@/core/query-llm/store/query-config.atom"

export const SelectQueryConfigsDialog = () => {
  const [queryConfigs] = useAtom(queryConfigsAtom)

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

            {queryConfigs.map((m, index) => (
              <SelectQueryConfig key={index} queryConfig={m} type={"toDel"} />
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
            {queryConfigs
              .filter(
                (m) =>
                  m.title?.toLowerCase().includes(filterPApps.toLowerCase()) ??
                  (m.model.title
                    .toLowerCase()
                    .includes(filterPApps.toLowerCase()) ||
                    m.model.company.title.toLowerCase().includes(filterPApps)),
              )
              .map((m, index) => (
                <SelectQueryConfig key={index} queryConfig={m} type={"toAdd"} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
