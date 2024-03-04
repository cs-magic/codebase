import { useAtom } from "jotai"
import { persistedAppsAtom, uiSelectAppsDialogOpenAtom } from "@/store/app"
import { ScenarioSelector } from "@/components/scenario-selector"
import { Button } from "../../packages/common/components/ui/button"
import JoinComponents from "../../packages/common/components/join-components"
import { ChevronDownIcon } from "lucide-react"
import React from "react"

export const HomeSelector = () => {
  const [persistedApps] = useAtom(persistedAppsAtom)
  const [, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  return (
    <div className={"flex items-center gap-2"}>
      <ScenarioSelector />

      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <span className={"text-muted-foreground"}>模型对比：</span>
        {!persistedApps.length ? (
          "请选择"
        ) : (
          <JoinComponents
            components={persistedApps.map((p) => (
              <span key={p.id}>{p.title}</span>
            ))}
            separator={
              <span className={"text-sm text-muted-foreground mx-1"}>vs</span>
            }
          />
        )}

        <ChevronDownIcon className={"w-4 h-4 text-muted-foreground ml-1"} />
      </Button>
      {/*<PromptSelector/>*/}
    </div>
  )
}
