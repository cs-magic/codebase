"use client"

/**
 * ui ref: https://clerk.com/
 */
import { SmsSendCode } from "../../../components/auth-sms-stage-1-send-code"
import { SmsSignIn } from "../../../components/auth-sms-stage-2-sign-in"
import { smsStageAtom } from "../../../../packages/common/lib/sms/store"
import { useAtom } from "jotai"
import { AuthContainer } from "@/components/auth-container"
import { BrandTitle } from "@/components/branding"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  return (
    <AuthContainer>
      {stage === "toSendSms" ? (
        <SmsSendCode BrandComp={BrandComp} />
      ) : (
        <SmsSignIn />
      )}
    </AuthContainer>
  )
}

const BrandComp = () => <BrandTitle className={"text-lg gap-2"} />
