"use client"

import { useAtom } from "jotai"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import { CSVLink } from "react-csv"
import { toast } from "sonner"

import { cn, logger } from "@cs-magic/common"
import { useInit } from "@cs-magic/react-hooks/dist/hooks/use-init.js"

import { IWechatBotTransfer, ScanStatus } from "@cs-magic/swot-backend/schema"

import {
  botContactsAtom,
  botLoggedInAtom,
  botLoggingAtom,
  botScanningAtom,
  botScanStatusAtom,
  botScanValueAtom,
  botUserAtom,
} from "../../store/bot.atom"
import { FlexContainer } from "@cs-magic/react-ui/components/flex-container"
import { StandardCard } from "@cs-magic/react-ui/components/standard-card"
import { ButtonWithLoading } from "@cs-magic/react-ui/components/button-with-loading"
import { Button, buttonVariants } from "@cs-magic/react-ui/shadcn/ui/button"
import { columns, DataTable } from "./contacts.table"

export default function BotPage() {
  const [socketStatus, setSocketStatus] = useState<number>(0)
  const [botScanning, setBotScanning] = useAtom(botScanningAtom)
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom)
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom)
  const [botUser, setBotUser] = useAtom(botUserAtom)
  const [botContacts, setBotContacts] = useAtom(botContactsAtom)
  const [botLoggedIn, setBotLoggedIn] = useAtom(botLoggedInAtom)
  const [botLogging, setBotLogging] = useAtom(botLoggingAtom)

  // const isAdmin = useUserIsAdmin()
  const isInited = useInit(() => true)

  const socket = useInit<WebSocket | null>(() => {
    console.log("-- env: ", process.env)
    console.log("-- initing socket --")
    const socketUrl =
      process.env.VITE_SOCKET_URL ?? process.env.NEXT_PUBLIC_SOCKET_URL
    console.log({ socketUrl })

    if (!socketUrl) {
      console.warn("no socket url")
      return null
    }

    const socket = new WebSocket(socketUrl)

    socket.addEventListener("error", console.error)

    socket.addEventListener("open", () => {
      setSocketStatus(1)
    })

    socket.addEventListener("close", () => {
      setSocketStatus(0)
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

          case "preference":
            break

          case "contacts":
            // console.log("contacts: ", data.data.slice(0, 5))
            setBotContacts(data.data.filter((c) => !!c.friend))
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
      className={
        cn("justify-start")
        // "bg-cyan-950"
      }
    >
      <div
        className={cn(
          socket ? "bg-green-700" : "bg-red-700",
          "w-3 h-3 rounded-full fixed right-4 top-4",
        )}
      />

      {botUser ? (
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

              {
                // isAdmin &&
                <Button
                  disabled={!botUser || !botLoggedIn}
                  onClick={() => {
                    socket?.send("logout")
                  }}
                >
                  Log Out
                </Button>
              }
            </div>
          </StandardCard>

          <StandardCard title={"Bot Payload"}>
            <div>id: {botUser?.id}</div>
            <div>name: {botUser?.name}</div>

            <div className={"flex gap-2"}>
              <Button
                onClick={() => {
                  socket?.send("get-contacts")
                }}
              >
                Get Contacts
              </Button>

              {botContacts && (
                <CSVLink
                  className={cn(buttonVariants({}))}
                  data={botContacts}
                  filename={"contacts.csv"}
                  onClick={() => {
                    toast.success("downloaded")
                  }}
                >
                  Dump Contacts
                </CSVLink>
              )}
            </div>

            {botContacts && (
              <div className={"w-full h-full overflow-auto"}>
                <DataTable columns={columns} data={botContacts} />
              </div>
            )}
          </StandardCard>
        </>
      ) : (
        <div className={"flex flex-col items-center justify-center m-8 gap-4"}>
          <QRCodeSVG value={botScanValue} />

          <div className={"tip"}>
            状态：
            {ScanStatus[botScanStatus]}
          </div>
        </div>
      )}
    </FlexContainer>
  )
}
