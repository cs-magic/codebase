import { useAtom } from "jotai";
import { trpcReactLogEnabledAtom } from "../../../../packages-to-classify/trpc/store";
import { LabelLine } from "../../../../packages-to-classify/ui/components/label-line";
import { Switch } from "../../../../packages-to-classify/ui-shadcn/components/switch";

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
