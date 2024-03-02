import { Button, buttonVariants } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"

import { IPApp } from "@/schema/conversation"
import { useSnapshot } from "valtio"
import { nanoid } from "nanoid"
import { conversationStore, useAddPApp, useDelPApp } from "@/store/conversation"
import { NANOID_LEN } from "@/config/system"
import { cn } from "@/lib/utils"
import { uiState } from "@/store/ui"

export const SelectPApp = ({
  pApp,
  type,
}: {
  pApp: IPApp
  type: "toAdd" | "toDel"
}) => {
  const { pApps } = useSnapshot(conversationStore)
  // console.log({ pApps, type, pApp })
  const addPApp = useAddPApp()
  const delPApp = useDelPApp()
  const Icon = type === "toDel" ? MinusCircleIcon : PlusCircleIcon
  const { maxToAdd } = useSnapshot(uiState)
  const disabled =
    (type === "toAdd" && pApps.length >= maxToAdd) ||
    (type === "toDel" && pApps.length <= 1)

  return (
    <div
      key={pApp.id}
      className={cn(
        "w-full flex items-center p-2 rounded-lg group",
        buttonVariants({ variant: "ghost" }),
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <IconContainer
        className={
          "w-6 h-6 invisible group-hover:visible hover:text-primary-foreground"
        }
        onClick={(event) => {
          if (type === "toDel") void delPApp(pApp.id)
          else
            void addPApp({
              ...pApp,
              // a new id, in case of duplication
              id: nanoid(NANOID_LEN),
            })
        }}
      >
        <Icon />
      </IconContainer>

      <span className={"mx-2"}>{pApp.model.title}</span>
      <span className={"mx-2 text-xs text-muted-foreground"}>{pApp.id}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {pApp.model.company.title}
      </span>
    </div>
  )
}
