import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { IResponse } from "../schema/response"
import { SelectApp } from "./select-app"

export const ChatTitleLine = ({ chat }: { chat: IResponse }) => {
  const [devEnabled] = useAtom(devEnabledAtom)

  return (
    <div className={"flex items-center gap-2 overflow-hidden"}>
      <SelectApp chat={chat} />

      {devEnabled && (
        <span className={"text-xs"}>
          {chat.id}_{chat.app!.id}
        </span>
      )}
    </div>
  )
}
