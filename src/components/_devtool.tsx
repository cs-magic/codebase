"use client"

import { useAtom } from "jotai"
import { SettingsIcon } from "lucide-react"
import { devEnabledAtom } from "../../packages/common-dev/store"
import { llmDelayAtom } from "../../packages/common-llm/store"
import { SmsProviderType } from "../../packages/common-sms/schema"
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "../../packages/common-sms/store"
import { api } from "../../packages/common-trpc/react"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/dialog"
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
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
import { Switch } from "../../packages/common-ui/shadcn/shadcn-components/switch"
import { TransportType, transportTypeAtom } from "../store/query"

export const Devtool = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom)
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  )
  const [llmDelay, setLlmDelay] = useAtom(llmDelayAtom)
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)
  const [transportType, setTransportType] = useAtom(transportTypeAtom)

  const utils = api.useUtils()

  return (
    <Dialog>
      <DialogTrigger className={"fixed left-2 bottom-2"} asChild>
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </DialogTrigger>

      <DialogContent>
        <Label>Dev</Label>
        <Label>Devel Enabled: </Label>
        <Switch checked={devEnabled} onCheckedChange={setDevEnabled} />

        <Label>SMS </Label>

        <Label>Provider Type</Label>
        <Select
          value={smsProvider}
          onValueChange={(s: SmsProviderType) => setSmsProvider(s)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value={"ali" as SmsProviderType}>
                计算机魔法研究（阿里，无白名单）
              </SelectItem>
              <SelectItem value={"tencent" as SmsProviderType}>
                XX的个人博客（腾讯，白名单）
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>Countdown Time</Label>
        <Input
          value={smsCountdownSeconds}
          onChange={(event) =>
            setSmsCountdownSeconds(Number(event.currentTarget.value))
          }
          type={"number"}
        />

        <Separator orientation={"horizontal"} />

        <Label>Invalidate all</Label>
        <Button
          onClick={() => {
            utils.invalidate()
          }}
        >
          Invalidate
        </Button>

        <Label>LLM</Label>
        <div className={"flex items-center gap-2"}>
          <Label>Delay</Label>
          <Input
            value={llmDelay}
            type={"number"}
            onChange={(event) => {
              setLlmDelay(Number(event.currentTarget.value))
            }}
          />
        </div>

        <div className={"flex items-center gap-2"}>
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
                <SelectItem value={"pusher" as TransportType}>
                  Puhser
                </SelectItem>
                <SelectItem value={"sse" as TransportType}>SSE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  )
}
