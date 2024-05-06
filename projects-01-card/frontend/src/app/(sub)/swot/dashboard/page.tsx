"use client"

import { IWechatPreference } from "@cs-magic/wechaty/schema/bot.preference"
import { IWechatBotTransfer } from "@cs-magic/wechaty/schema/bot.utils"
import { useEffect, useState } from "react"
import { env } from "../../../../../../../packages-to-classify/env"
import { useInit } from "../../../../../../../packages-to-classify/hooks/use-init"
import { socketStatusMap } from "../../../../../../../packages-to-classify/transport/schema"
import { FlexContainer } from "../../../../../../../packages-to-classify/ui/components/flex-container"
import { LabelLine } from "../../../../../../../packages-to-classify/ui/components/label-line"

export default function SwotDashboardPage() {
  const [preference, setPreference] = useState<IWechatPreference | null>(null)

  // 南川
  const wxid = "5623476143790167642"

  const socket = useInit<WebSocket>(() => {
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!)

    socket.onopen = () => {
      console.log("✅ opened")
      // 不要用 useEffect 监听这个
      socket.send(`get-preference ${wxid}`)
    }

    socket.addEventListener("error", console.error)

    socket.addEventListener("message", (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as IWechatBotTransfer

        console.log("-- data: ", data)
        switch (data.type) {
          case "preference":
            setPreference(data.data)
            console.log("preference: ", data)
            break
        }
      } catch (e) {
        // prettyError(e);
      }
    })

    return socket
  })

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      {socket && (
        <LabelLine title={"readyState"}>
          {socketStatusMap[socket.readyState]}
        </LabelLine>
      )}

      <LabelLine title={"preference"}>
        <div className={"whitespace-pre"}>
          {JSON.stringify(preference, null, 2)}
        </div>
      </LabelLine>
    </FlexContainer>
  )
}
