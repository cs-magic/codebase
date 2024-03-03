import { buttonVariants } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { NANOID_LEN } from "@/config/system"
import { cn } from "@/lib/utils"
import { useAddQueryConfig, useDelQueryConfig } from "@/store/use-app"
import { IQueryConfigInDB } from "@/core/query-llm/schema/config"
import { useAtom } from "jotai"

import {
  queryConfigsAtom,
  uiMaxQueryConfigsAtom,
} from "@/core/query-llm/store/query-config.atom"

export const SelectQueryConfig = ({
  queryConfig,
  type,
}: {
  queryConfig: IQueryConfigInDB
  type: "toAdd" | "toDel"
}) => {
  const [queryConfigs] = useAtom(queryConfigsAtom)
  const addQueryConfig = useAddQueryConfig()
  const delQueryConfig = useDelQueryConfig()

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
          else
            void addQueryConfig({
              ...queryConfig,
              // a new appId, in case of duplication
              id: nanoid(NANOID_LEN),
            })
        }}
      >
        <Icon />
      </IconContainer>

      <span className={"mx-2"}>{queryConfig.model.title}</span>
      <span className={"mx-2 text-xs text-muted-foreground"}>
        {queryConfig.id}
      </span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {queryConfig.model.company.title}
      </span>
    </div>
  )
}
