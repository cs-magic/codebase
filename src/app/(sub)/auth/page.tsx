"use client"

/**
 * ui ref: https://clerk.com/
 */
import { SmsSendCode } from "@/common/lib/sms/components/send-code"
import { SmsSignIn } from "@/common/lib/sms/components/sign-in"
import { smsStageAtom } from "@/common/lib/sms/atom-state"
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
