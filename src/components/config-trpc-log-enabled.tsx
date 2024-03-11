import { useAtom } from "jotai"
import { trpcReactLogEnabledAtom } from "../../packages/common-trpc/store"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Switch } from "../../packages/common-ui/shadcn/shadcn-components/switch"

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
