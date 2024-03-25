import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { IResponse } from "../schema/response"

export const ChatTitleLine = ({ chat }: { chat: IResponse }) => {
  const [devEnabled] = useAtom(devEnabledAtom)

  return (
    <div className={"flex items-center gap-2 overflow-hidden"}>
      {devEnabled && (
        <span className={"text-xs"}>
          {chat.id}_{chat.app!.id}
        </span>
      )}
    </div>
  )
}
