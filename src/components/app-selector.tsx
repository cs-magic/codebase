import { buttonVariants } from "../../packages/common/components/ui/button"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "../../packages/common/lib/utils"
import { IAppInDB } from "@/schema/app"
import { useAtom } from "jotai"

import {
  addAppAtom,
  delAppAtom,
  persistedAppsAtom,
  uiMaxAppsAtom,
} from "@/store/app.atom"
import { IconContainer } from "../../packages/common/components/icon-container"

export const AppSelector = ({
  app,
  type,
}: {
  app: IAppInDB
  type: "toAdd" | "toDel"
}) => {
  const [queryConfigs] = useAtom(persistedAppsAtom)
  const [, addApp] = useAtom(addAppAtom)
  const [, delApp] = useAtom(delAppAtom)

  const [maxToAdd] = useAtom(uiMaxAppsAtom)
  const disabled = type === "toAdd" && queryConfigs.length >= maxToAdd

  const Icon = type === "toDel" ? MinusCircleIcon : PlusCircleIcon

  return (
    <div
      key={app.id}
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
          if (type === "toDel") void delApp(app.id)
          else void addApp(app)
        }}
      >
        <Icon />
      </IconContainer>

      <span className={"mx-2"}>{app.model.title}</span>
      <span className={"mx-2 text-xs text-muted-foreground"}>{app.id}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {app.user}
        {/*by {app.model.company.title}*/}
      </span>
    </div>
  )
}
