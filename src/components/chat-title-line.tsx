import { useAtom } from "jotai"
import { useSnapshot } from "valtio"
import { devEnabledAtom } from "../../packages/common-dev/store"
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
import { IResponse } from "../schema/response"
import { coreStore } from "../store/core.valtio"

export const ChatTitleLine = ({ chat }: { chat: IResponse }) => {
  const { data: apps } = api.core.listApps.useQuery()
  const [devEnabled] = useAtom(devEnabledAtom)

  return (
    <div className={"flex items-center gap-2 overflow-hidden"}>
      <Select
        onValueChange={(value) => {
          coreStore.replaceChat(chat.id, apps!.find((a) => a.id === value)!)
        }}
      >
        <SelectTrigger className={"focus:ring-0 gap-2 w-40 overflow-hidden"}>
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

      {devEnabled && (
        <span className={"text-xs"}>
          {chat.id}_{chat.app!.id}
        </span>
      )}
    </div>
  )
}
