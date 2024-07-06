import { useAtom } from "jotai"
import { trpcReactLogEnabledAtom } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"
import { Switch } from "@cs-magic/common"

export const TrpcLogEnabled = () => {
  const [trpcReactLogEnabled, setTrpcReactLogEnabled] = useAtom(
    trpcReactLogEnabledAtom,
  )
  return (
    <LabelLine title={"TRPC React Log Enabled"}>
      <Switch
        checked={trpcReactLogEnabled}
        onCheckedChange={setTrpcReactLogEnabled}
      />
    </LabelLine>
  )
}
