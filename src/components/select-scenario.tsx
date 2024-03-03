import {
  Select,
  SelectContent,
  SelectValue,
} from "../../packages/common/components/ui/select"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select"
import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"

import { SelectModelItem } from "@/components/select-model-item"
import { useSnapshot } from "valtio"
import { scenarioState } from "@/hooks/use-scenario"
import { ScenarioType } from "@/schema/scenario"

export const SelectScenario = () => {
  const { type } = useSnapshot(scenarioState)
  return (
    <Select
      value={type}
      onValueChange={(v: ScenarioType) => (scenarioState.type = v)}
    >
      <SelectPrimitiveTrigger>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <SelectModelItem
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <SelectModelItem
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
