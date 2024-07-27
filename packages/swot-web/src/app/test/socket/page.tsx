"use client"

import { usePusherClient } from "@cs-magic/react-hooks"
import { PusherServerId } from "@cs-magic/common"
import { cleanPusherAtom, pusherServerIdAtom } from "@cs-magic/react-ui"
import { FlexContainer } from "@cs-magic/react-ui"
import { Button } from "@cs-magic/react-ui"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/react-ui"
import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"

export default function TestSocketPage() {
  const [serverId, setServerId] = useAtom(pusherServerIdAtom)
  const clean = useSetAtom(cleanPusherAtom)

  const client = usePusherClient()

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
