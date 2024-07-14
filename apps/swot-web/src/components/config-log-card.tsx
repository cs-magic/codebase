import { pusherLogLevelAtom } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"
import { SelectLogLevel } from "@cs-magic/common"
import { StandardCard } from "@cs-magic/common"
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
