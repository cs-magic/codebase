"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { IconContainer } from "@/components/containers"
import { SettingsIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from "jotai"
import { Label } from "@/components/ui/label"
import { smsProviderAtom, SmsProviderType } from "@/lib/sms/store"

export const Devtool = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderAtom)

  return (
    <Dialog>
      <DialogTrigger className={"fixed left-2 bottom-2"} asChild>
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </DialogTrigger>

      <DialogContent>
        <Label>SMS Provider Type</Label>
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
      </DialogContent>
    </Dialog>
  )
}
