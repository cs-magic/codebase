import { buttonVariants } from "@/common/components/ui/button"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "@/common/lib/utils"
import { IQueryConfigInDB } from "@/schema/query-config"
import { useAtom } from "jotai"

import {
  addQueryConfigAtom,
  delQueryConfigAtom,
  persistedQueryConfigsAtom,
  uiMaxQueryConfigsAtom,
} from "@/store/query-config.atom"
import { IconContainer } from "@/common/components/icon-container"

export const SelectQueryConfig = ({
  queryConfig,
  type,
}: {
  queryConfig: IQueryConfigInDB
  type: "toAdd" | "toDel"
}) => {
  const [queryConfigs] = useAtom(persistedQueryConfigsAtom)
  const [, addQueryConfig] = useAtom(addQueryConfigAtom)
  const [, delQueryConfig] = useAtom(delQueryConfigAtom)

  const [maxToAdd] = useAtom(uiMaxQueryConfigsAtom)
  const disabled =
    (type === "toAdd" && queryConfigs.length >= maxToAdd) ||
    (type === "toDel" && queryConfigs.length <= 1)

  const Icon = type === "toDel" ? MinusCircleIcon : PlusCircleIcon

  return (
    <div
      key={queryConfig.id}
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
          if (type === "toDel") void delQueryConfig(queryConfig.id)
          else void addQueryConfig(queryConfig)
        }}
      >
        <Icon />
      </IconContainer>

      <span className={"mx-2"}>{queryConfig.model.title}</span>
      <span className={"mx-2 text-xs text-muted-foreground"}>
        {queryConfig.id} by {queryConfig.fromUserId}
      </span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {queryConfig.model.company.title}
      </span>
    </div>
  )
}
