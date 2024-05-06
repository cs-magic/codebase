"use client"

import { StandardCard } from "@/components/standard-card"
import { useUserIsAdmin } from "@/hooks/use-user"
import {
  botLoggedInAtom,
  botLoggingAtom,
  botScanningAtom,
  botScanStatusAtom,
  botScanValueAtom,
  botSocketOpenedAtom,
  botUserAtom,
  ScanStatus,
} from "@/store/bot.atom"
import { logger } from "@cs-magic/log/logger"
import { IWechatBotTransfer } from "@cs-magic/wechaty/schema/bot.utils"
import { useAtom } from "jotai"
import { QRCodeSVG } from "qrcode.react"
import { env } from "../../../../../../../packages-to-classify/env"
import { useInit } from "../../../../../../../packages-to-classify/hooks/use-init"
import { socketStatusMap } from "../../../../../../../packages-to-classify/transport/schema"
import { Button } from "../../../../../../../packages-to-classify/ui-shadcn/components/button"
import { cn } from "../../../../../../../packages-to-classify/ui-shadcn/utils"
import { ButtonWithLoading } from "../../../../../../../packages-to-classify/ui/components/button-with-loading"
import { FlexContainer } from "../../../../../../../packages-to-classify/ui/components/flex-container"
import { LabelLine } from "../../../../../../../packages-to-classify/ui/components/label-line"

export default function BotPage() {
  const [botScanning, setBotScanning] = useAtom(botScanningAtom)
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom)
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom)
  const [botUser, setBotUser] = useAtom(botUserAtom)
  const [botSocketOpened, setBotSocketOpened] = useAtom(botSocketOpenedAtom)
  const [botLoggedIn, setBotLoggedIn] = useAtom(botLoggedInAtom)
  const [botLogging, setBotLogging] = useAtom(botLoggingAtom)

  const isAdmin = useUserIsAdmin()

  const socket = useInit<WebSocket>(() => {
    console.log("-- initing socket --")
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!)

    socket.addEventListener("error", console.error)

    socket.addEventListener("open", () => {
      setBotSocketOpened(true)
    })

    socket.addEventListener("close", () => {
      setBotSocketOpened(false)
    })

    socket.addEventListener("message", (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as IWechatBotTransfer

        console.log("-- data: ", data)
        switch (data.type) {
          case "scan":
            setBotScanning(true)
            setBotScanValue(data.data.value)
            setBotScanStatus(data.data.status)
            break

          case "login":
            setBotScanning(false)
            setBotUser(data.data)
            break

          case "loggedIn":
            setBotLoggedIn(data.data)
            setBotLogging(false)
            break
        }
      } catch (e) {
        // prettyError(e);
      }
    })

    return socket
  })

  logger.info({ botUser })

  return (
    <FlexContainer
      orientation={"vertical"}
      className={
        cn()
        // "bg-cyan-950"
      }
    >
      <StandardCard title={"Socket"}>
        {!socket ? (
          "Socket初始化中……"
        ) : (
          <>
            <LabelLine title={"readyState"}>
              {socketStatusMap[socket.readyState]}
            </LabelLine>
          </>
        )}
      </StandardCard>

      {botSocketOpened && (
        <>
          <StandardCard title={"Bot Actions"}>
            <div className={"flex items-center gap-2"}>
              <ButtonWithLoading
                loading={botLogging}
                disabled={botScanning || botLoggedIn}
                onClick={() => {
                  setBotLogging(true)
                  socket?.send("start 1")
                }}
              >
                Log In
              </ButtonWithLoading>

              <Button
                disabled={!botUser || !botLoggedIn}
                onClick={() => {
                  socket?.send("stop")
                }}
              >
                Pause
              </Button>

              {isAdmin && (
                <Button
                  disabled={!botUser || !botLoggedIn}
                  onClick={() => {
                    socket?.send("logout")
                  }}
                >
                  Log Out
                </Button>
              )}
            </div>
          </StandardCard>

          {botScanning && (
            <StandardCard title={"Scan"}>
              <LabelLine title={"Status"}>
                {ScanStatus[botScanStatus]}
              </LabelLine>

              <QRCodeSVG value={botScanValue} />
            </StandardCard>
          )}

          {botUser && (
            <StandardCard title={"Bot Payload"}>
              <div>id: {botUser?.id}</div>
              <div>name: {botUser?.name}</div>
            </StandardCard>
          )}
        </>
      )}
    </FlexContainer>
  )
}
