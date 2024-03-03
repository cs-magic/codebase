import { useSession } from "next-auth/react"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { Avatar, AvatarImage } from "../../packages/common/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { cn } from "../../packages/common/lib/utils"
import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"
import { fetchSSE } from "../../packages/common/lib/sse"
import { conversationStore } from "@/store/conversation.valtio"
import { IMessageInChat } from "@/schema/query-message"
import { resetPAppSSE, selectPApp } from "@/store/app.valtio"
import { IQueryConfigInChat } from "@/schema/query-config"
import { useAtom } from "jotai"

import {
  delQueryConfigAtom,
  uiSelectQueryConfigsDialogOpenAtom,
} from "@/store/query-config.atom"
import { IconContainer } from "../../packages/common/components/icon-container"

export const PAppComp = ({ app }: { app: IQueryConfigInChat }) => {
  const { id } = app

  const [, setError] = useState("")
  const [fetching, setFetching] = useState(false)
  const messageId = nanoid()

  const { conversation, lastUserMessage } = useSnapshot(conversationStore)
  const parentId = lastUserMessage?.id ?? null
  const conversationId = conversation?.id

  useEffect(() => {
    if (!app.needFetchLLM || !conversationId) return
    const message: IMessageInChat = {
      role: "assistant",
      content: "",
      id: messageId,
      updatedAt: new Date(),
      conversationId,
      appId: id,
      parentId,
    }

    conversationStore.messages.push(message)
    void fetchSSE(`/api/llm?r=${id}`, {
      onOpen: () => {
        setFetching(true)
      },
      onData: (data) => {
        message.content += data
      },
      onError: (data) => {
        setError(data)
        message.content = data
        message.isError = true
      },
      onFinal: () => {
        setFetching(false)
        resetPAppSSE(id)
      },
    })
  }, [app.needFetchLLM])

  // console.log({ error })

  return (
    <div
      className={cn(
        "w-full h-full overflow-hidden flex flex-col relative border-t border-r",
      )}
    >
      <TopBar queryConfigId={id} title={app?.model.title} fetching={fetching} />

      <MessagesComp id={id} logo={app?.model.logo} />
    </div>
  )
}

const TopBar = ({
  queryConfigId,
  title,
  fetching,
}: {
  queryConfigId: string
  title: string
  fetching: boolean
}) => {
  const [, delQueryConfig] = useAtom(delQueryConfigAtom)
  const { apps, curPApp } = useSnapshot(conversationStore)
  const selected = queryConfigId === curPApp?.id
  const LockOrNot = selected ? Lock : Unlock
  // console.log({ appId, currentPAppId })
  const [, setOpen] = useAtom(uiSelectQueryConfigsDialogOpenAtom)

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex items-center p-2 border-b",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <div className={"flex items-center gap-2 overflow-hidden"}>
        <div className={"w-full flex gap-2 items-baseline"}>
          <span className={"truncate"}>{title}</span>

          <span className={"text-muted-foreground text-xs"}>
            {queryConfigId}
          </span>
        </div>
      </div>
      <div className={"grow"} />

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          selectPApp(apps.find((p) => p.id === queryConfigId)!)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        onClick={() => {
          // selectPApp(appId)
        }}
      >
        <StopCircle className={cn(!fetching && "text-muted-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"删除一个App（注意，暂不可恢复）"}
        className={cn(apps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void delQueryConfig(queryConfigId)
        }}
      >
        <MinusCircleIcon />
      </IconContainer>

      <IconContainer
        tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon />
      </IconContainer>

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}

const MessagesComp = ({ id, logo }: { id: string; logo: string | null }) => {
  const { messages, context } = useSnapshot(conversationStore)

  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refScroll.current?.scrollIntoView({ behavior: "auto" })
  }, [messages])

  const theMessages: IMessageInChat[] = []
  let cIndex = 0
  messages.forEach((m) => {
    if (cIndex >= context.length) {
      if (m.id === id) theMessages.push(m)
    } else {
      if (m.id === context[cIndex]!.id) {
        theMessages.push(m)
        ++cIndex
      }
    }
  })
  console.log({ messages, context, messageId: id })
  // console.log({ currentSnapshot, currentMessages, theMessages })

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

      <div
        className={cn(
          "p-2 rounded-lg overflow-hidden",
          m.isError && "text-destructive-foreground bg-destructive/75",
        )}
      >
        {m.content}
      </div>
    </div>
  )
}
