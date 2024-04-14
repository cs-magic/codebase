import { atom, useAtom } from "jotai"
import { Button } from "packages/common-ui-shadcn/components/button"
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container"
import { LabelLine } from "../../../../packages/common-ui/components/label-line"
import { StandardCard } from "../../../components/standard-card"
import { checkBot, startBot, stopBot } from "../../../bot"

const botStateAtom = atom("state")

export default function AdminPage() {
  const [state, setState] = useAtom(botStateAtom)

  return (
    <FlexContainer>
      <StandardCard title={"wechat bot"}>
        <LabelLine title={"state"}>{state}</LabelLine>

        <Button
          onClick={async () => {
            setState(JSON.stringify(await checkBot()))
          }}
        >
          refresh
        </Button>

        <Button onClick={startBot}>start</Button>

        <Button onClick={stopBot}>stop</Button>
      </StandardCard>
    </FlexContainer>
  )
}
