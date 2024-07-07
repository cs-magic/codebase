import { pusherLogLevelAtom } from "@cs-magic/common/pusher/store"
import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { SelectLogLevel } from "@cs-magic/common/ui/components/select-log-level"
import { StandardCard } from "@cs-magic/common/ui/components/standard-card"
import { useAtom } from "jotai"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"

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
