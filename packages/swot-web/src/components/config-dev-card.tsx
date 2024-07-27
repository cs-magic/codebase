import { devEnabledAtom } from "@cs-magic/react-ui"
import { LabelLine } from "@cs-magic/react-ui"
import { Switch } from "@cs-magic/react-ui"
import { StandardCard } from "@cs-magic/react-ui"
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
