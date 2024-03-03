"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSendCode } from "@/lib/sms/components/send-code"
import { SmsSignIn } from "@/lib/sms/components/sign-in"
import { smsState } from "@/lib/sms/store"
import { useSnapshot } from "valtio"

export default function AuthPage() {
  const { stage } = useSnapshot(smsState)

  const Comp = stage === "toSendSms" ? SmsSendCode : SmsSignIn

  return (
    <AuthContainer>
      <Comp />
    </AuthContainer>
  )
}
