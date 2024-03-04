import { ScenarioSelector } from "@/components/scenario-selector"
import { HomeQueryInput } from "@/components/home-query-input"

export const HomeQueryArea = () => {
  return (
    <div className={"w-full flex items-center gap-2 p-4 py-12"}>
      {/*<ScenarioSelector />*/}

      <HomeQueryInput />
    </div>
  )
}
