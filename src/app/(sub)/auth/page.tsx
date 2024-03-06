"use client"

import { AuthContainer } from "@/components/auth-container"

import { BrandingTitle } from "@/components/branding-title"
import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { smsStageAtom } from "../../../../packages/common/lib/sms/store"
/**
 * ui ref: https://clerk.com/
 */
import { SmsSendCode } from "../../../components/auth-sms-stage-1-send-code"
import { SmsSignIn } from "../../../components/auth-sms-stage-2-sign-in"
import { useEffect } from "react"
import { SmsWithName } from "../../../components/auth-sms-stage-3-input-name"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  const session = useSession()
  const router = useRouter()
  const ok = !!session.data?.user?.name && !!session.data.user.image

  useEffect(() => {
    if (!ok) return
    router.push("/")
  }, [ok])

  console.log("[auth]: ", JSON.stringify(session))

  // avoid screen blink
  if (ok) return null

  return (
    <AuthContainer>
      {session.status === "loading" ? (
        <div className={"flex justify-center my-8"}>
          <LoaderIcon className={"animate-spin"} />
        </div>
      ) : session.status === "authenticated" ? (
        ok ? null : (
          <SmsWithName />
        )
      ) : stage === "toSendSms" ? (
        <SmsSendCode
          BrandComp={() => <BrandingTitle className={"text-lg gap-2"} />}
        />
      ) : (
        <SmsSignIn />
      )}
    </AuthContainer>
  )
}
