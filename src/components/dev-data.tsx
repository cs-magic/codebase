import { useSnapshot } from "valtio"
import { FlexContainer } from "../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { coreStore } from "../store/core.valtio"

export const DevData = () => {
  const { convId, requestId, chatId, appId } = useSnapshot(coreStore)

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
