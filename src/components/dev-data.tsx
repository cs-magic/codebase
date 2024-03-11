import { useSnapshot } from "valtio"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { coreStore } from "../store/core.valtio"
import { useAtom } from "jotai"

export const DevData = () => {
  const { convId, requestId, chatId, appId } = useSnapshot(coreStore)

  const [devEnabled] = useAtom(devEnabledAtom)
  if (!devEnabled) return null

  return (
    <div className={"fixed left-0 bottom-6 p-2 w-[240px]"}>
      <FlexContainer orientation={"vertical"}>
        <LabelLine title={"ConvId"}>{convId}</LabelLine>
        <LabelLine title={"requestId"}>{requestId}</LabelLine>
        <LabelLine title={"chatId"}>{chatId}</LabelLine>
        <LabelLine title={"appId"}>{appId}</LabelLine>
      </FlexContainer>
    </div>
  )
}
