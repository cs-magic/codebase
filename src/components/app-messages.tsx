import { useSnapshot } from "valtio"
import { conversationStore } from "@/store/conv.valtio"
import { useEffect, useRef } from "react"
import { IMessageInChat } from "@/schema/message"
import { MessageComp } from "./app-message"

export const MessagesComp = ({
  id,
  logo,
}: {
  id: string
  logo: string | null
}) => {
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

  return (
    <div className={"grow overflow-auto"}>
      {theMessages.map((m, index) => (
        <MessageComp m={m} logo={logo} key={index} />
      ))}

      <div ref={refScroll} />
    </div>
  )
}
