"use client"

import { SelectScenario } from "@/components/model/select-scenario"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import React from "react"
import { openSelectPApps } from "@/store/ui"
import JoinComponents from "../join-components"
import { useSnapshot } from "valtio"
import { conversationStore } from "@/store/conversation"

export const ConfigApp = () => {
  const { persistedPApps } = useSnapshot(conversationStore)

  return (
    <div className={"flex items-center gap-2"}>
      <SelectScenario />

      <Button variant={"outline"} onClick={openSelectPApps}>
        <span className={"text-muted-foreground"}>模型：</span>

        <JoinComponents
          components={persistedPApps.map((p) => (
            <span key={p.id}>{p.title}</span>
          ))}
          separator={
            <span className={"text-sm text-muted-foreground mx-1"}>vs</span>
          }
        />

        <ChevronDownIcon className={"w-4 h-4 text-muted-foreground ml-1"} />
      </Button>
      {/*<SelectPrompt/>*/}
    </div>
  )
}
