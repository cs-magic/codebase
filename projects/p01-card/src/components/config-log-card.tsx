import { useAtom } from "jotai"
import { SelectLogLevel } from "../../../common-log/components/select-log-level"
import { pusherLogLevelAtom } from "../../../common-pusher/store"
import { LabelLine } from "../../../common-ui/components/label-line"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"
import { StandardCard } from "./standard-card"

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
