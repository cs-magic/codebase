import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import {
  conversationsState,
  IPAppClient,
  useDelPApp,
} from "@/store/conversation"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"
import { useEffect } from "react"
import { last } from "lodash"
import { nanoid } from "nanoid"
import { fetchSSE } from "@/lib/sse"

export const PAppComp = ({ pApp }: { pApp: IPAppClient }) => {
  const { id } = pApp

  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR

  const { conversationId, pApps, messages } = useSnapshot(conversationsState)

  useEffect(() => {
    if (!pApp.needFetchLLM) return
    void fetchSSE(`/api/llm?r=${id}`, {
      onToken: (token) => {
        const lastUserMessage = last(
          conversationsState.messages.filter((m) => m.role === "user"),
        )!
        const lastAssistantMessage = conversationsState.messages.find(
          (m) => m.parentId === lastUserMessage.id && m.pAppId === id,
        )
        if (!lastAssistantMessage) {
          conversationsState.messages.push({
            role: "assistant",
            content: token,
            id: nanoid(),
            updatedAt: new Date(),
            conversationId: conversationId!,
            pAppId: id,
            parentId: lastUserMessage.id,
          })
        } else {
          lastAssistantMessage.content += token
        }
      },
    })
  }, [pApp.needFetchLLM])

  const needFetchLLM = pApp.needFetchLLM
  console.log({ pApp, needFetchLLM, messages })
  const delPApp = useDelPApp()

  return (
    <div className={"w-full"}>
      {/* model line */}
      <div className={"w-full flex items-center p-2 border-b"}>
        <div>{pApp?.model.title}</div>

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

      {messages
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
