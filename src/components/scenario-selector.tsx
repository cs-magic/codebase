import {
  Select,
  SelectContent,
  SelectValue,
} from "../../packages/common/components/ui/select"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select"
import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"

import { ModelSelector } from "@/components/model-selector"
import { useAtom } from "jotai"
import { ScenarioType } from "@/schema/scenario"
import { scenarioTypeAtom } from "@/store/scenario"

export const ScenarioSelector = () => {
  const [type, setType] = useAtom(scenarioTypeAtom)

  return (
    <Select value={type} onValueChange={(s) => setType(s as ScenarioType)}>
      <SelectPrimitiveTrigger className={"shrink-0"}>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <ModelSelector
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <ModelSelector
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
