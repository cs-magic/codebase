import { appsPlaceholderCountAtom } from "@/store/system.atom"
import { useAtom } from "jotai"
import {
  convSummaryPromptAtom,
  llmDelayAtom,
} from "../../packages/common-llm/store"
import { PusherServerId } from "../../packages/common-pusher/schema"
import { pusherServerIdAtom } from "../../packages/common-pusher/store"
import { TransportType } from "../../packages/common-transport/schema"
import { transportTypeAtom } from "../../packages/common-transport/store"
import { LabelLine } from "../../packages/common-ui/components/label-line"
import { TextareaAuto } from "../../packages/common-ui/components/textarea-auto"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { ConfigCard } from "./config-card"

export const ConfigLLMCard = () => {
  const [llmDelay, setLLMDelay] = useAtom(llmDelayAtom)
  const [transportType, setTransportType] = useAtom(transportTypeAtom)
  const [pusherServerId, setPusherServerId] = useAtom(pusherServerIdAtom)
  const [convSummaryPrompt, setConvSummaryPrompt] = useAtom(
    convSummaryPromptAtom,
  )
  const [appsPlaceholderCount, setAppsPlaceholderCount] = useAtom(
    appsPlaceholderCountAtom,
  )

  return (
    <ConfigCard title={"LLM"}>
      <Label>System Prompt For Conv Summary</Label>
      <TextareaAuto
        minRows={6}
        className={"border p-2"}
        value={convSummaryPrompt}
        onChange={(event) => {
          setConvSummaryPrompt(event.currentTarget.value)
        }}
      />

      <LabelLine title={"placeholder apps"}>
        <Input
          value={appsPlaceholderCount}
          type={"number"}
          onChange={(event) => {
            setAppsPlaceholderCount(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>

      <LabelLine title={"Delay(ms)"}>
        <Input
          value={llmDelay}
          type={"number"}
          onChange={(event) => {
            setLLMDelay(Number(event.currentTarget.value))
          }}
        />
      </LabelLine>

      <Label>Transport Type</Label>
      <Select
        value={transportType}
        onValueChange={(s: TransportType) => setTransportType(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"pusher" as TransportType}>Puhser</SelectItem>
            <SelectItem value={"sse" as TransportType}>SSE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Pusher Server ID</Label>
      <Select
        value={pusherServerId}
        onValueChange={(s: PusherServerId) => setPusherServerId(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"aws" as PusherServerId}>Ali</SelectItem>
            <SelectItem value={"tencent_ws" as PusherServerId}>
              tencent-ws
            </SelectItem>
            <SelectItem value={"tencent_wss" as PusherServerId}>
              tencent-wss
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </ConfigCard>
  )
}
