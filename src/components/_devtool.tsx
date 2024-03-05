"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../packages/common/components/ui/dialog"
import { SettingsIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../packages/common/components/ui/select"
import { useAtom } from "jotai"
import { Label } from "../../packages/common/components/ui/label"
import {
  smsCodeCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "../../packages/common/lib/sms/store"
import { SmsProviderType } from "../../packages/common/lib/sms/schema"
import { IconContainer } from "../../packages/common/components/icon-container"
import { api } from "../../packages/common/lib/trpc/react"
import { Button } from "../../packages/common/components/ui/button"
import { Separator } from "../../packages/common/components/ui/separator"
import { Input } from "../../packages/common/components/ui/input"
import { llmDelayAtom } from "packages/common/store"

export const Devtool = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom)
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeCountdownSecondsAtom,
  )
  const [llmDelay, setLlmDelay] = useAtom(llmDelayAtom)

  const utils = api.useUtils()

  return (
    <Dialog>
      <DialogTrigger className={"fixed left-2 bottom-2"} asChild>
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </DialogTrigger>

      <DialogContent>
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
