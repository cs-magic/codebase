"use client"

import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { smsStageAtom } from "../../../../packages/common-sms/store"
/**
 * ui ref: https://clerk.com/
 */
import { SmsStage1SendCode } from "../../../components/auth-sms-stage-1-send-code"
import { SmsStage2InputCode } from "../../../components/auth-sms-stage-2-input-code"
import { SmsStage3UpdateProfile } from "../../../components/auth-sms-stage-3-update-profile"
import { BrandingTitle } from "../../../components/branding-title"

export default function AuthPage() {
  const [stage] = useAtom(smsStageAtom)

  const session = useSession()
  const router = useRouter()
  const ok = !!session.data?.user.name && !!session.data.user.image

  useEffect(() => {
    if (!ok) return
    router.push("/")
  }, [ok])

  console.log("[auth]: ", { session, ok })

  switch (session.status) {
    case "loading":
      return (
        <div className={"flex justify-center my-8"}>
          <LoaderIcon className={"animate-spin"} />
        </div>
      )

    case "authenticated":
      // avoid screen blink
      return <SmsStage3UpdateProfile />

    case "unauthenticated":
    default:
      return stage === "toSendSms" ? (
        <SmsStage1SendCode
          BrandComp={() => <BrandingTitle className={"text-lg gap-2"} />}
        />
      ) : (
        <SmsStage2InputCode />
      )
  }
}
