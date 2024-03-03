"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSendCode } from "@/lib/sms/components/send-code"
import { SmsSignIn } from "@/lib/sms/components/sign-in"
import { smsStageAtom } from "@/lib/sms/store"
import { useAtom } from "jotai"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  const Comp = stage === "toSendSms" ? SmsSendCode : SmsSignIn

  return (
    <AuthContainer>
      <Comp />
    </AuthContainer>
  )
}
