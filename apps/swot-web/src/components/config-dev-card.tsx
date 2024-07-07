import { devEnabledAtom } from "@cs-magic/common/dev/store"
import { LabelLine } from "@cs-magic/common/ui/components/label-line"
import { Switch } from "@cs-magic/common/ui/components/shadcn/ui/switch"
import { StandardCard } from "@cs-magic/common/ui/components/standard-card"
import { useAtom } from "jotai"
import { requestsSlideTextVisibleAtom } from "../store/ui.atom"

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)
  const [requestsSlideTextDisplay, setRequestsSlideTextDisplay] = useAtom(
    requestsSlideTextVisibleAtom,
  )

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
  )
}
