import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { Switch } from "@cs-magic/common/ui/components/shadcn/ui/switch"
import { atom, useAtom } from "jotai"

// todo
export const trpcReactLogEnabledAtom = atom(false)

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
