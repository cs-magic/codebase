"use client"

import { Button } from "../../../../packages/common/components/ui/button"
import { useSocketStore } from "../../../../packages/common/lib/puser/socket"
import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../packages/common/components/ui/select"
import { PusherServerId } from "../../../../packages/common/lib/puser/config"
import { FlexContainer } from "../../../../packages/common/components/flex-container"

export default function TestSocketPage() {
  const { client, init, clean, serverId, setServerId } = useSocketStore(
    (state) => ({
      client: state.client,
      init: state.init,
      clean: state.clean,
      serverId: state.serverId,
      setServerId: state.setServerId,
    }),
  )

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
      <Select value={serverId} onValueChange={setServerId}>
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
