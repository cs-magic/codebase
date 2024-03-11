"use client"

import { useAtom } from "jotai"
import { BarChart } from "lucide-react"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { pusherLatencyAtom } from "../../packages/common-pusher/store"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { DevSocketStatusIcon } from "./dev-socket-status-icon"

export const DevSocketStatus = () => {
  const [latency] = useAtom(pusherLatencyAtom)

  const [devEnabled] = useAtom(devEnabledAtom)
  if (!devEnabled) return null

  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 p-2 flex items-center gap-1 shrink-0",
      )}
    >
      {latency === 0 ? (
        <BarChart className={"animate-pulse w-4 h-4"} />
      ) : (
        <DevSocketStatusIcon
          level={latency < 500 ? 3 : latency < 1000 ? 2 : 1}
          className={"w-4 h-4"}
        />
      )}
      <span className={"text-xs text-muted-foreground"}>
        {Math.floor(latency) + " ms"}
      </span>
    </div>
  )
}
