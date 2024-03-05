import { useEffect, useRef } from "react"
import { IMessageInChat } from "../schema/message"
import { ConvAppMessage } from "./conv-app-message"

export const ConvAppMessages = ({
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
        <ConvAppMessage m={m} logo={logo} key={index} />
      ))}

      <div ref={refScroll} />
    </div>
  )
}
