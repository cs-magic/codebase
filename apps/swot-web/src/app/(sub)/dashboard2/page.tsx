"use client"

import { env } from "@cs-magic/common/env"
import { useInit } from "@cs-magic/common/hooks/use-init"
import { socketStatusMap } from "@cs-magic/common/transport/schema"
import { FlexContainer } from "@cs-magic/common/ui/components/flex-container"
import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { IWechatPreference } from "@cs-magic/swot-bot/schema/bot.preference"
import { IWechatBotTransfer } from "@cs-magic/swot-bot/schema/bot.utils"
import { useState } from "react"
import DDS_lanhupage_0 from "./comp"

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

  const Basic = () => {
    return (
      <>
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
      </>
    )
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      {/*<Basic/>*/}

      <DDS_lanhupage_0 />
    </FlexContainer>
  )
}
