import { useEffect, useRef } from "react"
import { MessageComp } from "./app-message"
import { useAtom } from "jotai/index"
import { getAppContextAtom } from "@/store/request.atom"

export const MessagesComp = ({
  appId,
  logo,
}: {
  appId: string
  logo: string | null
}) => {
  const [getAppContext] = useAtom(getAppContextAtom)
  const context = getAppContext(appId)

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
