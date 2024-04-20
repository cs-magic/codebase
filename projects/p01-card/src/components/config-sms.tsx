"use client";

import { useAtom } from "jotai";
import { SmsProviderType } from "../../../../common/auth-sms/schema";
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "../../../../common/auth-sms/store";
import { Input } from "../../../../packages/ui-shadcn/components/input";
import { Label } from "../../../../packages/ui-shadcn/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../packages/ui-shadcn/components/select";

import { StandardCard } from "./standard-card";

export const ConfigSMSCard = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom);
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  );
  return (
    <StandardCard title={"SMS"}>
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
    </StandardCard>
  );
};
