"use client"

import { AuthContainer } from "@/components/auth-container"

import { BrandingTitle } from "@/components/branding-title"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { smsStageAtom } from "../../../../packages/common/lib/sms/store"
/**
 * ui ref: https://clerk.com/
 */
import { SmsStage1SendCode } from "../../../components/auth-sms-stage-1-send-code"
import { SmsStage2InputCode } from "../../../components/auth-sms-stage-2-input-code"
import { useEffect } from "react"
import { SmsStage3UpdateProfile } from "../../../components/auth-sms-stage-3-update-profile"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  const session = useSession()
  const router = useRouter()
  const ok = !!session.data?.user?.name && !!session.data.user.image

  useEffect(() => {
    if (!ok) return
    console.log(ansiColors.blue("router push --> /"))
    router.push("/")
  }, [ok])

  console.log("[auth]: ", { sessionStatus: session.status, ok })

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
          <SmsStage3UpdateProfile />
        )
      ) : stage === "toSendSms" ? (
        <SmsStage1SendCode
          BrandComp={() => <BrandingTitle className={"text-lg gap-2"} />}
        />
      ) : (
        <SmsStage2InputCode />
      )}
    </AuthContainer>
  )
}
