import { cn } from "../../packages/common/lib/utils"
import { useEffect, useState } from "react"
import { fetchSSE } from "../../packages/common/lib/sse"
import { IAppInChat } from "@/schema/app"
import { useAtom } from "jotai"
import { convDetailAtom } from "@/store/conv.atom"
import { TopBar } from "@/components/app-topbar"
import { MessagesComp } from "@/components/app-messages"
import { IMessageInChat } from "@/schema/message"
import {
  appFinishedSSEAtom,
  appsShouldSSEAtom,
  getTriggerID,
  requestIDAtom,
} from "@/store/request.atom"

export const AppComp = ({ app }: { app: IAppInChat }) => {
  const { id } = app

  const [, setError] = useState("")
  const [fetching, setFetching] = useState(false)

  const [conv] = useAtom(convDetailAtom)
  const [appsShouldSSE] = useAtom(appsShouldSSEAtom)
  const [, appFinishedSSE] = useAtom(appFinishedSSEAtom)
  const [requestID] = useAtom(requestIDAtom)
  const shouldSSE = appsShouldSSE.includes(
    getTriggerID(conv?.id ?? "", requestID, app.id),
  )

  useEffect(() => {
    if (!shouldSSE) return

    // todo: update message
    const message: IMessageInChat = {
      role: "assistant",
      content: "",
      updatedAt: new Date(),
    }

    console.log("-- fetching sse")
    void fetchSSE(`/api/llm?r=${requestID}`, {
      onOpen: () => {
        setFetching(true)
      },
      onData: (data) => {
        message.content += data
      },
      onError: (data) => {
        console.error("-- fetched error: ", data)
        setError(data)
        message.content = data
        message.isError = true
      },
      onFinal: () => {
        // todo: 在服务端维护
        appFinishedSSE(app.id)
        setFetching(false)
      },
    })
  }, [shouldSSE])

  console.log({ shouldSSE })

  return (
    <div
      className={cn(
        "w-full h-full overflow-hidden flex flex-col relative border-t border-r",
      )}
    >
      <TopBar appID={id} title={app?.model.title} fetching={fetching} />

      <MessagesComp appId={id} logo={app?.model.logo} />
    </div>
  )
}
