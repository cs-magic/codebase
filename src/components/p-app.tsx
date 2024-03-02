import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"
import { useEffect, useRef, useState } from "react"
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
import { IMessageInChat } from "@/schema/message"

export const PAppComp = ({ pApp }: { pApp: IPAppClient }) => {
  const { id } = pApp

  const { currentConversation, currentConversationId } =
    useSnapshot(conversationStore)

  const [error, setError] = useState("")
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (!pApp.needFetchLLM) return
    void fetchSSE(`/api/llm?r=${id}`, {
      onOpen: () => {
        setFetching(true)
      },
      onFinal: () => {
        setFetching(false)
        resetPAppSSE(id)
      },
      onError: (data) => {
        setError(data)
      },
      onData: (data) => {
        // console.log({ onData: data })

        const { messages } = conversationStore.currentConversation!

        const lastUserMessage = last(messages.filter((m) => m.role === "user"))!
        const lastAssistantMessage = messages.find(
          (m) => m.parentId === lastUserMessage.id && m.pAppId === id,
        )!
        if (!lastAssistantMessage && currentConversationId) {
          const messageId = nanoid()
          messages.push({
            role: "assistant",
            content: data,
            id: messageId,
            updatedAt: new Date(),
            conversationId: currentConversationId,
            pAppId: id,
            parentId: lastUserMessage.id,
          })
        } else {
          lastAssistantMessage.content += data
        }
      },
    })
  }, [pApp.needFetchLLM])

  return (
    <div className={cn("w-full h-full flex flex-col relative")}>
      <TopBar id={id} title={pApp?.model.title} />

      <MessagesComp id={id} logo={pApp?.model.logo} />

      <Controls error={error} fetching={fetching} id={id} />
    </div>
  )
}

const TopBar = ({ id, title }: { id: string; title: string }) => {
  const delPApp = useDelPApp()
  const { currentConversation, pApps } = useSnapshot(conversationStore)
  const selected = id === currentConversation?.selectedPAppId

  return (
    <div
      className={cn(
        "w-full flex items-center p-2 border-b",
        selected && "bg-primary-foreground/50",
      )}
    >
      <div className={"flex items-center gap-2"}>
        <div className={"flex gap-2 items-baseline"}>
          <span>{title}</span>

          <span className={"text-muted-foreground text-xs"}>{id}</span>
        </div>
      </div>
      <div className={"grow"} />

      <IconContainer
        className={cn(pApps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void delPApp(id)
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
  )
}

const MessagesComp = ({ id, logo }: { id: string; logo: string | null }) => {
  const { currentSnapshot, currentMessages } = useSnapshot(conversationStore)

  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refScroll.current?.scrollIntoView({ behavior: "auto" })
  }, [currentMessages])

  const theMessages: IMessageInChat[] = []
  let snapShotIndex = 0
  currentMessages.forEach((m) => {
    if (snapShotIndex >= currentSnapshot.length) {
      if (m.pAppId === id) theMessages.push(m)
    } else {
      if (m.id === currentSnapshot[snapShotIndex]) {
        theMessages.push(m)
        ++snapShotIndex
      }
    }
  })

  // currentConversation?.messages
  // .filter(
  //     (m) =>
  //         // user
  //         !m.pAppId ||
  //         // assistant
  //         m.pAppId === id,
  // )

  return (
    <div className={"grow overflow-auto"}>
      {theMessages.map((m, index) => (
        <MessageComp m={m} logo={logo} key={index} />
      ))}

      <div ref={refScroll} />
    </div>
  )
}

const MessageComp = ({
  m,
  logo,
}: {
  m: IMessageInChat
  logo: string | null
}) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR

  return (
    <div className={"w-full flex gap-2 p-2"}>
      <Avatar className={"shrink-0"}>
        <AvatarImage
          src={m.role === "user" ? userAvatar : logo ?? DEFAULT_AVATAR}
        />
      </Avatar>

      <div>{m.content}</div>
    </div>
  )
}

const Controls = ({
  error,
  fetching,
  id,
}: {
  error: string
  fetching: boolean
  id: string
}) => {
  return (
    <div className={"flex items-center justify-center m-2 gap-2"}>
      {error ? (
        <Button
          variant={"outline"}
          className={""}
          onClick={() => {
            return
          }}
        >
          点击重试
        </Button>
      ) : (
        <Button
          disabled={!fetching}
          variant={"outline"}
          className={""}
          onClick={() => {
            return
          }}
        >
          停止生成
        </Button>
      )}

      <Button
        variant={"outline"}
        className={""}
        onClick={() => {
          selectPApp(id)
        }}
      >
        这个更好
      </Button>
    </div>
  )
}
