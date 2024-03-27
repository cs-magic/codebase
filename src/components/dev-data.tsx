import { useAtom } from "jotai"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"

export const DevData = () => {
  const [devEnabled] = useAtom(devEnabledAtom)
  if (!devEnabled) return null

  return (
    <div className={"fixed left-0 bottom-6 p-2 w-[240px]"}>
      <FlexContainer orientation={"vertical"}></FlexContainer>
    </div>
  )
}
