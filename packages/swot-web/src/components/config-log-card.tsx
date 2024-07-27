import { pusherLogLevelAtom } from "@cs-magic/react-ui"
import { LabelLine } from "@cs-magic/react-ui"
import { SelectLogLevel } from "@cs-magic/react-ui"
import { StandardCard } from "@cs-magic/react-ui"
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
