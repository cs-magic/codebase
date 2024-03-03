"use client"

/**
 * ui ref: https://clerk.com/
 */
import { SmsSendCode } from "../../../../packages/common/lib/sms/components/send-code"
import { SmsSignIn } from "../../../../packages/common/lib/sms/components/sign-in"
import { smsStageAtom } from "../../../../packages/common/lib/sms/atom-state"
import { useAtom } from "jotai"
import { AuthContainer } from "@/components/auth-container"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  const Comp = stage === "toSendSms" ? SmsSendCode : SmsSignIn

  return (
    <AuthContainer>
      <Comp />
    </AuthContainer>
  )
}
