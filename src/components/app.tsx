import { cn } from "../../packages/common/lib/utils"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { fetchSSE } from "../../packages/common/lib/sse"
import { conversationStore } from "@/store/conv.valtio"
import { IMessageInChat } from "@/schema/message"
import { resetPAppSSE } from "@/store/app.valtio"
import { IAppInChat } from "@/schema/app"
import { useAtom } from "jotai"
import { convAtom } from "@/store/conv.atom"
import { TopBar } from "@/components/app-topbar"
import { MessagesComp } from "@/components/app-messages"

export const AppComp = ({ app }: { app: IAppInChat }) => {
  const { id } = app

  const [, setError] = useState("")
  const [fetching, setFetching] = useState(false)
  const messageId = nanoid()

  const [conv] = useAtom(convAtom)

  useEffect(() => {
    if (!app.needFetchLLM || !conv) return
    const message: IMessageInChat = {
      role: "assistant",
      content: "",
      id: messageId,
      updatedAt: new Date(),
      conversationId: conv.id,
      appId: id,
      parentId: null, // todo
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
