import { useAtom } from "jotai"
import { trpcReactLogEnabledAtom } from "@cs-magic/common/deps/trpc/store"
import { LabelLine } from "@cs-magic/common/deps/ui/components/label-line"
import { Switch } from "@cs-magic/common/deps/ui-shadcn/components/switch"

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
