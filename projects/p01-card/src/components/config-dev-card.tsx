import { useAtom } from "jotai";
import { devEnabledAtom } from "../../../../common/dev/store";
import { LabelLine } from "../../../../common/ui/components/label-line";
import { Switch } from "../../../../common/ui-shadcn/components/switch";
import { requestsSlideTextVisibleAtom } from "../store/ui.atom";
import { StandardCard } from "./standard-card";

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom);
  const [requestsSlideTextDisplay, setRequestsSlideTextDisplay] = useAtom(
    requestsSlideTextVisibleAtom,
  );

  return (
    <StandardCard title={"Dev"}>
      <LabelLine title={"Dev Enabled"}>
        <Switch checked={devEnabled} onCheckedChange={setDevEnabled} />
      </LabelLine>

      <LabelLine title={"Requests Slide Text On"}>
        <Switch
          checked={requestsSlideTextDisplay}
          onCheckedChange={setRequestsSlideTextDisplay}
        />
      </LabelLine>
    </StandardCard>
  );
};
