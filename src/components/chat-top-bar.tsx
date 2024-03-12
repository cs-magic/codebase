import { useAtom, useSetAtom } from "jotai"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { useSnapshot } from "valtio"
import { useEnvironments } from "../../packages/common-hooks/use-environments"

import { callLLM } from "../../packages/common-llm/actions/llm-caller"
import { pusherServerIdAtom } from "../../packages/common-pusher/store"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IResponse } from "../schema/response"

import { coreStore } from "../store/core.valtio"

import { appStopGeneratingScopeAtom } from "../store/system.atom"
import { checkRespondingStatus } from "../utils"
import { ChatTitleLine } from "./chat-title-line"

export const ChatTopBar = ({ chat }: { chat: IResponse }) => {
  const [pusherServerId] = useAtom(pusherServerIdAtom)

  const stopGenerating = useSetAtom(appStopGeneratingScopeAtom)

  const { requestId, apps, chatId } = useSnapshot(coreStore)

  const selected = chat.id === chatId
  const LockOrNot = selected ? Lock : Unlock
  const respondingStatus = checkRespondingStatus(chat)

  const { isMobile } = useEnvironments()

  return (
    <div
      className={cn(
        "hidden sm:flex w-full overflow-hidden  items-center p-2 border-b ",
        "shrink-0",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <ChatTitleLine chat={chat} />
      <div className={"grow"} />

      <IconContainer
        className={cn(
          respondingStatus !== "responding" && "text-muted-foreground",
        )}
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        disabled={respondingStatus !== "responding"}
        onClick={() => {
          if (!requestId) return

          void callLLM(
            {
              action: "interrupt",
              request: {
                requestId,
                appId: chat.app!.id,
                type: "app-response",
                status: "responding",
                pusherServerId,
              },
            },
            {},
          )
          stopGenerating(true)
        }}
      >
        <StopCircle />
      </IconContainer>

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          coreStore.selectChat(chat.id)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"删除一个App（注意，暂不可恢复）"}
        disabled={apps.length <= 1}
        className={cn(apps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void coreStore.delChat(chat.id)
        }}
      >
        <MinusCircleIcon />
      </IconContainer>

      {!isMobile && (
        <IconContainer
          tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
          onClick={() => {
            coreStore.forkChat(chat)
          }}
        >
          <PlusCircleIcon />
        </IconContainer>
      )}

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}
