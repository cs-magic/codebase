"use client"

import { Button } from "../../../../packages/common-ui/shadcn/shadcn-components/button"
import {
  cleanPusherAtom,
  initPusherAtom,
  pusherClientAtom,
  pusherServerIdAtom,
} from "../../../../packages/common-transport/store"
import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../packages/common-ui/shadcn/shadcn-components/select"
import { PusherServerId } from "../../../../packages/common-transport/config"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"
import { useAtom } from "jotai"

export default function TestSocketPage() {
  const [serverId, setServerId] = useAtom(pusherServerIdAtom)
  const [client] = useAtom(pusherClientAtom)
  const [, init] = useAtom(initPusherAtom)
  const [, clean] = useAtom(cleanPusherAtom)

  console.log({ client })

  const c = () => {
    console.log("cleaning...")
    clean()
  }

  useEffect(() => {
    window.addEventListener("beforeunload", c)
    return () => {
      c()
      window.removeEventListener("beforeunload", c)
    }
  }, [])

  return (
    <FlexContainer orientation={"vertical"}>
      <Select
        value={serverId}
        onValueChange={(s) => setServerId(s as PusherServerId)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"aws" as PusherServerId}>AWS (ws)</SelectItem>

            <SelectItem value={"tencent_ws" as PusherServerId}>
              Tencent (ws)
            </SelectItem>

            <SelectItem value={"tencent_wss" as PusherServerId}>
              Tencent (wss)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={init}>start</Button>

      <Button
        onClick={() => {
          client?.send_event("pusher:ping", {})
          console.log("ping")
        }}
      >
        发送数据
      </Button>
    </FlexContainer>
  )
}
