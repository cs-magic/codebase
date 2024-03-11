"use client"

import { useSnapshot } from "valtio"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { DeepReadonly } from "../../packages/common-utils/schema"
import { useLLMForChat } from "../hooks/use-llm-for-app-chat"
import { RoleType } from "../schema/message"
import { IResponse } from "../schema/response"
import { coreStore } from "../store/core.valtio"
import { ChatTopBar } from "./chat-top-bar"
import { ConvAppMessages } from "./conv-app-messages"

export const Chat = ({ chat }: { chat: IResponse }) => {
  const { commonContext } = useSnapshot(coreStore)

  const context = !chat.tStart
    ? commonContext
    : [
        ...commonContext,
        {
          content: chat.error ?? chat.content ?? "",
          role: "assistant" as RoleType,
          updatedAt: chat.updatedAt,
          isError: !!chat.error,
        },
      ]

  useLLMForChat(chat)

  return (
    <div
      className={cn(
        "w-full h-full overflow-auto flex flex-col relative border-t border-r",
      )}
    >
      <ChatTopBar chat={chat} />

      <div className={"grow overflow-auto"}>
        {chat.isDraft ? (
          "draft"
        ) : (
          <ConvAppMessages
            appId={chat.app!.id}
            logo={chat.app!.model.logo}
            context={context}
          />
        )}
      </div>
    </div>
  )
}
