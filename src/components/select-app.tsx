import { ComponentPropsWithoutRef } from "react"
import { api } from "../../packages/common-trpc/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IResponse } from "../schema/response"
import { coreStore } from "../store/core.valtio"

export const SelectApp = ({
  chat,
  className,
  ...props
}: { chat: IResponse } & ComponentPropsWithoutRef<typeof SelectTrigger>) => {
  const { data: apps } = api.core.listApps.useQuery()

  return (
    <Select
      onValueChange={(value) => {
        coreStore.replaceChat(chat.id, apps!.find((a) => a.id === value)!)
      }}
    >
      <SelectTrigger
        className={cn("focus:ring-0 gap-2 w-40 overflow-hidden", className)}
        {...props}
      >
        <span className={"truncate"}>{chat.app!.title}</span>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>官方 App</SelectLabel>

          <SelectSeparator />

          {!apps ? (
            <div className={"animate-spin h-8 w-full"} />
          ) : (
            apps.map((a) => {
              return (
                <SelectItem value={a.id} key={a.id}>
                  {a.title}
                </SelectItem>
              )
            })
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
