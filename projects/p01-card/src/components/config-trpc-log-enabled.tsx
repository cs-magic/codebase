import { useAtom } from "jotai";
import { trpcReactLogEnabledAtom } from "../../../../packages/trpc/store";
import { LabelLine } from "../../../../packages/ui/components/label-line";
import { Switch } from "../../../../packages/ui-shadcn/components/switch";

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
