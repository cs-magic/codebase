import { useAtom } from "jotai"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { useSnapshot } from "valtio"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { buttonVariants } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IAppDetail } from "../schema/app.detail"

import { coreStore } from "../store/core.valtio"
import { maxAppsOnScreenAtom } from "../store/system.atom"

export const DialogSelectApp = ({
  app,
  type,
}: {
  app: IAppDetail
  type: "toAdd" | "toDel"
}) => {
  const [maxToAdd] = useAtom(maxAppsOnScreenAtom)

  const { apps } = useSnapshot(coreStore)

  const disabled =
    (type === "toAdd" && apps.length >= maxToAdd) ||
    (type === "toDel" && apps.length <= 1)
  const Icon = type === "toDel" ? MinusCircleIcon : PlusCircleIcon

  return (
    <div
      key={app.id}
      className={cn(
        "w-full flex items-center p-2 rounded-lg group",
        buttonVariants({ variant: "ghost" }),
      )}
    >
      <IconContainer
        className={
          "w-6 h-6 invisible group-hover:visible hover:text-primary-foreground"
        }
        disabled={disabled}
        onClick={(event) => {
          if (disabled) return
          if (type === "toDel")
            // void convStore.
            coreStore.delChat(app.id)
          // void convStore.
          else coreStore.pushChat(app)
        }}
      >
        <Icon />
      </IconContainer>

      <span className={"mx-2"}>{app.model.title}</span>
      <span className={"mx-2 text-xs text-muted-foreground"}>{app.id}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        {/*by {config.user}*/}
        by {app.model.company.title}
      </span>
    </div>
  )
}
