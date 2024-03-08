"use client"

import { devEnabledAtom } from "../../packages/common-dev/store"
import { llmDelayAtom } from "../../packages/common-llm/store"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../packages/common-ui/shadcn/shadcn-components/dialog"
import { SettingsIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { useAtom } from "jotai"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { Switch } from "../../packages/common-ui/shadcn/shadcn-components/switch"
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "../../packages/common-sms/store"
import { SmsProviderType } from "../../packages/common-sms/schema"
import { IconContainer } from "../../packages/common-ui/components/icon-container"
import { api } from "../../packages/common-trpc/react"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { Separator } from "../../packages/common-ui/shadcn/shadcn-components/separator"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"

export const Devtool = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom)
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  )
  const [llmDelay, setLlmDelay] = useAtom(llmDelayAtom)
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)

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
      </DialogContent>
    </Dialog>
  )
}
