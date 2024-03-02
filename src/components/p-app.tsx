import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"
import { useEffect } from "react"
import { last } from "lodash"
import { nanoid } from "nanoid"
import { fetchSSE } from "@/lib/sse"
import { conversationStore } from "@/store/conversation"
import { IPAppClient } from "@/schema/conversation"

export const PAppComp = ({ pApp }: { pApp: IPAppClient }) => {
  const { id } = pApp

  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR

  const { currentConversation, useDelPApp, currentConversationId, pApps } =
    useSnapshot(conversationStore)

  useEffect(() => {
    if (!pApp.needFetchLLM) return
    void fetchSSE(`/api/llm?r=${id}`, {
      onToken: (token) => {
        const { messages } = conversationStore.currentConversation!
        console.log({ currentConversationId, messagesLen: messages.length })

        const lastUserMessage = last(messages.filter((m) => m.role === "user"))!
        const lastAssistantMessage = messages.find(
          (m) => m.parentId === lastUserMessage.id && m.pAppId === id,
        )!
        if (!lastAssistantMessage && currentConversationId) {
          messages.push({
            role: "assistant",
            content: token,
            id: nanoid(),
            updatedAt: new Date(),
            conversationId: currentConversationId,
            pAppId: id,
            parentId: lastUserMessage.id,
          })
        } else {
          lastAssistantMessage.content += token
        }
      },
    })
  }, [pApp.needFetchLLM])

  const delPApp = useDelPApp()

  return (
    <div className={"w-full"}>
      {/* model line */}
      <div className={"w-full flex items-center p-2 border-b"}>
        <div className={"flex gap-2 items-baseline"}>
          <span>{pApp?.model.title}</span>

          <span className={"text-muted-foreground text-xs"}>{pApp.id}</span>
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
    </div>
  )
}
