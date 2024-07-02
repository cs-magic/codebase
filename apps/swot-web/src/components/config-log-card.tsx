import { SelectLogLevel } from "@cs-magic/common/ui/components/select-log-level.tsx"
import { useAtom } from "jotai"
import { pusherLogLevelAtom } from "@cs-magic/common/pusher/store"
import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"
import { StandardCard } from "../../../../packages/common/ui/components/standard-card"

export const ConfigLogCard = () => {
  const [pusherLogLevel, setPusherLogLevel] = useAtom(pusherLogLevelAtom)
  // const [routeLogLevel, setRouteLogLevel] = useAtom(routeLogLevelAtom)

  return (
    <StandardCard title={"log"}>
      <TrpcLogEnabled />

      <LabelLine title={"Pusher Log Level"}>
        <SelectLogLevel value={pusherLogLevel} setValue={setPusherLogLevel} />
      </LabelLine>
    </StandardCard>
  )
}
