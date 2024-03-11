import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { Switch } from "../../packages/common-ui/shadcn/shadcn-components/switch"
import { requestsSlideTextVisibleAtom } from "../store/ui.atom"
import { ConfigCard } from "./config-card"

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)
  const [requestsSlideTextDisplay, setRequestsSlideTextDisplay] = useAtom(
    requestsSlideTextVisibleAtom,
  )

  return (
    <ConfigCard title={"Dev"}>
      <LabelLine title={"Dev Enabled"}>
        <Switch checked={devEnabled} onCheckedChange={setDevEnabled} />
      </LabelLine>

      <LabelLine title={"Requests Slide Text On"}>
        <Switch
          checked={requestsSlideTextDisplay}
          onCheckedChange={setRequestsSlideTextDisplay}
        />
      </LabelLine>
    </ConfigCard>
  )
}
