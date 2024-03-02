import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import {
  CheckCircle,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
} from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"
import { useEffect, useRef } from "react"
import { last } from "lodash"
import { nanoid } from "nanoid"
import { fetchSSE } from "@/lib/sse"
import {
  conversationStore,
  resetPAppSSE,
  selectPApp,
  useDelPApp,
} from "@/store/conversation"
import { IPAppClient } from "@/schema/conversation"
import { Button } from "@/components/ui/button"

export const PAppComp = ({ pApp }: { pApp: IPAppClient }) => {
  const { id } = pApp

  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR

  const { currentConversation, currentConversationId, pApps } =
    useSnapshot(conversationStore)

  useEffect(() => {
    if (!pApp.needFetchLLM) return
    void fetchSSE(`/api/llm?r=${id}`, {
      onFinal: () => {
        resetPAppSSE(pApp.id)
      },
      onToken: (token) => {
        const { messages, messageSnapshots } =
          conversationStore.currentConversation!
        // console.log({ currentConversationId, messagesLen: messages.length })

        const lastUserMessage = last(messages.filter((m) => m.role === "user"))!
        const lastAssistantMessage = messages.find(
          (m) => m.parentId === lastUserMessage.id && m.pAppId === id,
        )!
        if (!lastAssistantMessage && currentConversationId) {
          const messageId = nanoid()
          messages.push({
            role: "assistant",
            content: token,
            id: messageId,
            updatedAt: new Date(),
            conversationId: currentConversationId,
            pAppId: id,
            parentId: lastUserMessage.id,
          })
          // 默认使用此时的
          if (pApp.id === currentConversation?.selectedPAppId)
            last(messageSnapshots)!.push(messageId)
        } else {
          lastAssistantMessage.content += token
        }
      },
    })
  }, [pApp.needFetchLLM])

  const delPApp = useDelPApp()
  const selected = pApp.id === currentConversation?.selectedPAppId

  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refScroll.current?.scrollIntoView({ behavior: "auto" })
  }, [currentConversation?.messages])

  return (
    <div className={cn("w-full h-full flex flex-col relative")}>
      {/* 遮罩*/}
      {/*<div*/}
      {/*  className={cn(*/}
      {/*    currentConversation?.selectedPAppId &&*/}
      {/*      pApp.id !== currentConversation.selectedPAppId &&*/}
      {/*      "darken-overlay",*/}
      {/*  )}*/}
      {/*/>*/}

      {/* model line */}
      <div
        className={cn(
          "w-full flex items-center p-2 border-b",
          selected && "bg-primary-foreground/50",
        )}
      >
        <div className={"flex items-center gap-2"}>
          <div className={"flex gap-2 items-baseline"}>
            <span>{pApp?.model.title}</span>

            <span className={"text-muted-foreground text-xs"}>{pApp.id}</span>
          </div>
        </div>
        <div className={"grow"} />

        <IconContainer
          className={cn(pApps.length === 1 && "text-muted-foreground")}
          onClick={() => {
            void delPApp(pApp.id)
          }}
        >
          <MinusCircleIcon />
        </IconContainer>

        <IconContainer onClick={openSelectPApps}>
          <PlusCircleIcon />
        </IconContainer>

        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </div>

      <div className={"grow overflow-auto"}>
        {currentConversation?.messages
          .filter(
            (m) =>
              // user
              !m.pAppId ||
              // assistant
              m.pAppId === id,
          )
          .map((m, index) => (
            <div key={index} className={"w-full flex gap-2 p-2"}>
              <Avatar className={"shrink-0"}>
                <AvatarImage
                  src={
                    m.role === "user"
                      ? userAvatar
                      : pApp?.model.logo ?? DEFAULT_AVATAR
                  }
                />
              </Avatar>

              <div>{m.content}</div>
            </div>
          ))}

        <div ref={refScroll} />
      </div>

      <div className={"flex items-center justify-center m-2 gap-2"}>
        <Button variant={"outline"} className={""} onClick={() => {}}>
          停止生成
        </Button>

        <Button
          variant={"outline"}
          className={""}
          onClick={() => {
            selectPApp(pApp.id)
          }}
        >
          这个更好
        </Button>
      </div>
    </div>
  )
}
