import { buttonVariants } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { useAtom } from "jotai"

import {
  forkAppAtom,
  delAppAtom,
  appsPersistedAtom,
  uiMaxAppsAtom,
  pushAppAtom,
} from "@/store/app"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { IAppDetail } from "../schema/app.detail"

export const SelectApp = ({
  app,
  type,
}: {
  app: IAppDetail
  type: "toAdd" | "toDel"
}) => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [, pushApp] = useAtom(pushAppAtom)
  const [, delApp] = useAtom(delAppAtom)
  const [maxToAdd] = useAtom(uiMaxAppsAtom)

  const disabled = type === "toAdd" && persistedApps.length >= maxToAdd
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
          else void pushApp(app)
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
