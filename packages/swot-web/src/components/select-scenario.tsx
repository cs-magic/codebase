import {
  Text2ImageAppSVG,
  Text2TextAppSVG,
} from "@cs-magic/swot-frontend/dist/assets.js"
import { ScenarioType } from "@cs-magic/common"
import { Select, SelectContent, SelectValue } from "@cs-magic/react-ui"
import { SelectModel } from "@cs-magic/swot-frontend/components/_select-model"
import { scenarioTypeAtom } from "@cs-magic/swot-frontend/store/system.atom"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select"

import { useAtom } from "jotai"

export const SelectScenario = () => {
  const [type, setType] = useAtom(scenarioTypeAtom)

  return (
    <Select value={type} onValueChange={(s) => setType(s as ScenarioType)}>
      <SelectPrimitiveTrigger className={"shrink-0"}>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <SelectModel
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <SelectModel
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
