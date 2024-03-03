"use-client"
import { Label } from "@/components/ui/label"
import { useInputVerifyCodes } from "@/lib/sms/hooks/use-input-verify-codes"
import { useSignInResult } from "@/lib/sms/hooks/use-sms-sign-in-result"
import { InputVerifyCode } from "@/lib/sms/components/input-verify-code"
import { ResendVerifyCode } from "@/lib/sms/components/resend-verify-code"
import { ReInputPhone } from "@/lib/sms/components/re-input-phone"

export const SmsSignIn = () => {
  useInputVerifyCodes()

  useSignInResult()

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <ReInputPhone />
      </div>

      <InputVerifyCode />

      <ResendVerifyCode />
    </div>
  )
}
