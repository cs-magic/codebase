"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UnexpectedError } from "../../../../packages/common-general/schema"
import { serverLog } from "../../../../packages/common-log/actions"
import { LoadingTooltip } from "../../../../packages/common-ui/components/loading"
import { Auth } from "../../../components/auth"
import { AuthSmsSignIn } from "../../../components/auth-sms-sign-in"
import { AuthUpdateProfile } from "../../../components/auth-update-profile"
import { toast } from "sonner"

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const profileOk = !!session.data?.user.name && !!session.data.user.image
  const phoneOk = !!session.data?.user.phone
  const wechatOk = !!session.data?.user.wxid
  const ok = profileOk && phoneOk

  useEffect(() => {
    if (!ok) return
    router.push("/")
  }, [ok])

  // useEffect(() => {
  //   // console.log("[auth]: ", { session, profileOk, phoneOk })
  //   void serverLog("[auth]: ", { session, profileOk, phoneOk })
  // }, [session])

  useEffect(() => {
    toast.info(JSON.stringify(session, null, 2), {
      duration: Infinity,
      closeButton: true,
    })
  }, [session])

  switch (session.status) {
    case "authenticated":
      if (ok) return <LoadingTooltip />

      if (!phoneOk) return <AuthSmsSignIn />

      if (!profileOk) return <AuthUpdateProfile />

      throw new UnexpectedError()

    case "loading":
      return <LoadingTooltip />

    case "unauthenticated":
      return <Auth />

    default:
      throw new UnexpectedError()
  }
}
