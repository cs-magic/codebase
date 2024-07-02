"use client"

import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { usePusherClient } from "@cs-magic/common/pusher/hooks/use-pusher-client"
import { PusherServerId } from "@cs-magic/common/pusher/schema"
import {
  cleanPusherAtom,
  pusherServerIdAtom,
} from "@cs-magic/common/pusher/store"
import { FlexContainer } from "@cs-magic/common/ui/components/flex-container"
import { Button } from "@cs-magic/common/ui-shadcn/components/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/common/ui-shadcn/components/select"

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
