import { HomeQueryInput } from "@/components/home-query-input"

export const HomeQueryArea = () => {
  return (
    <div className={"w-full flex items-center gap-2 p-4 py-8"}>
      {/*<ScenarioSelector />*/}

      <HomeQueryInput />
    </div>
  )
}
