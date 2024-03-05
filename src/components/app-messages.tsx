import { useEffect, useRef } from "react"
import { IMessageInChat } from "../schema/message"
import { MessageComp } from "./app-message"

export const MessagesComp = ({
  appId,
  logo,
  context,
}: {
  appId: string
  logo: string | null
  context: IMessageInChat[]
}) => {
  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refScroll.current?.scrollIntoView({ behavior: "auto" })
  }, [context])

  // console.log({ appId, context })

  return (
    <div className={"grow overflow-auto"}>
      {context.map((m, index) => (
        <MessageComp m={m} logo={logo} key={index} />
      ))}

      <div ref={refScroll} />
    </div>
  )
}
