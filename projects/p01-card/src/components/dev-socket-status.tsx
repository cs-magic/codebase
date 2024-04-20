"use client";

import { useAtom } from "jotai";
import { BarChart } from "lucide-react";
import { devEnabledAtom } from "../../../../common/dev/store";
import { pusherLatencyAtom } from "../../../../common/pusher/store";
import { cn } from "../../../../common/ui-shadcn/utils";
import { DevSocketStatusIcon } from "./dev-socket-status-icon";

export const DevSocketStatus = () => {
  const [latency] = useAtom(pusherLatencyAtom);

  const [devEnabled] = useAtom(devEnabledAtom);
  if (!devEnabled) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 flex shrink-0 items-center gap-1 p-2",
      )}
    >
      {latency === 0 ? (
        <BarChart className={"h-4 w-4 animate-pulse"} />
      ) : (
        <DevSocketStatusIcon
          level={latency < 500 ? 3 : latency < 1000 ? 2 : 1}
          className={"h-4 w-4"}
        />
      )}
      <span className={"text-xs text-muted-foreground"}>
        {Math.floor(latency) + " ms"}
      </span>
    </div>
  );
};
