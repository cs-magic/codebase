import { useAtom } from "jotai"
import { SelectLogLevel } from "../../packages/common-log/components/select-log-level"
import { pusherLogLevelAtom } from "../../packages/common-pusher/store"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { convLogLevelAtom } from "../store/dev.atom"
import { ConfigCard } from "./config-card"
import { TrpcLogEnabled } from "./config-trpc-log-enabled"

export const ConfigLogCard = () => {
  const [convLogLevel, setConvLogLevel] = useAtom(convLogLevelAtom)
  const [pusherLogLevel, setPusherLogLevel] = useAtom(pusherLogLevelAtom)
  // const [routeLogLevel, setRouteLogLevel] = useAtom(routeLogLevelAtom)

  return (
    <ConfigCard title={"log"}>
      <LabelLine title={"Conv Log Level"}>
        <SelectLogLevel value={convLogLevel} setValue={setConvLogLevel} />
      </LabelLine>

      <LabelLine title={"Route Log Level"}>
        <SelectLogLevel value={convLogLevel} setValue={setConvLogLevel} />
      </LabelLine>

      <TrpcLogEnabled />

      <LabelLine title={"Pusher Log Level"}>
        <SelectLogLevel value={pusherLogLevel} setValue={setPusherLogLevel} />
      </LabelLine>
    </ConfigCard>
  )
}
