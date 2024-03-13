"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UnexpectedError } from "../../../../packages/common-general/schema"
import { LoadingTooltip } from "../../../../packages/common-ui/components/loading"
import { Auth } from "../../../components/auth"
import { AuthSmsSignIn } from "../../../components/auth-sms-sign-in"
import { AuthUpdateProfile } from "../../../components/auth-update-profile"

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const profileOk = !!session.data?.user.name && !!session.data.user.image
  const phoneOk = !!session.data?.user.phone

  useEffect(() => {
    if (!profileOk || !phoneOk) return
    router.push("/")
  }, [profileOk])

  console.log("[auth]: ", { session, ok: profileOk })

  switch (session.status) {
    case "authenticated":
      if (phoneOk && profileOk) return <LoadingTooltip />

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
