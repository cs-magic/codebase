"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSendCode } from "@/components/sms/send-code"
import { SmsSignIn } from "@/components/sms/sign-in"
import { smsState } from "@/store/sms"
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
