"use client"

/**
 * ui ref: https://clerk.com/
 */
import { SmsSendCode } from "../../../../packages/common/lib/sms/components/send-code"
import { SmsSignIn } from "../../../../packages/common/lib/sms/components/sign-in"
import { smsStageAtom } from "../../../../packages/common/lib/sms/atom-state"
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
