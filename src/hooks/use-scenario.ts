import { proxy } from "valtio"
import { ScenarioType } from "@/schema/scenario"

export const scenarioState = proxy<{ type: ScenarioType }>({
  type: "text2text",
})
