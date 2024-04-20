import { useAtom } from "jotai";
import { trpcReactLogEnabledAtom } from "../../../../common/trpc/store";
import { LabelLine } from "../../../../common/ui/components/label-line";
import { Switch } from "../../../../common/ui-shadcn/components/switch";

export const TrpcLogEnabled = () => {
  const [trpcReactLogEnabled, setTrpcReactLogEnabled] = useAtom(
    trpcReactLogEnabledAtom,
  );
  return (
    <LabelLine title={"TRPC React Log Enabled"}>
      <Switch
        checked={trpcReactLogEnabled}
        onCheckedChange={setTrpcReactLogEnabled}
      />
    </LabelLine>
  );
};
