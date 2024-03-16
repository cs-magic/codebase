"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UnexpectedError } from "../../../../packages/common-general/schema"
import { useEnvironments } from "../../../../packages/common-hooks/use-environments"
import { serverLog } from "../../../../packages/common-log/actions"
import { LoadingTooltip } from "../../../../packages/common-ui/components/loading"
import { Label } from "../../../../packages/common-ui/shadcn/shadcn-components/label"
import { Auth } from "../../../components/auth"
import { AuthSmsSignIn } from "../../../components/auth-sms-sign-in"
import { AuthUpdateProfile } from "../../../components/auth-update-profile"
import { toast } from "sonner"
import { AuthWechatSignIn } from "../../../components/auth-wechat-sign-in"

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const { isWechat } = useEnvironments()

  const profileOk = !!session.data?.user.name && !!session.data.user.image
  const phoneOk = !!session.data?.user.phone
  const wxidOk = !!session.data?.user.wxid

  useEffect(() => {
    if (phoneOk && profileOk && (wxidOk || !isWechat)) router.push("/")
  }, [phoneOk, profileOk, wxidOk, isWechat])

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
      if (!phoneOk) return <AuthSmsSignIn />

      if (isWechat && !wxidOk)
        return (
          <div className={"w-full flex flex-col gap-4"}>
            <Label className={"text-xs text-muted-foreground"}>
              为更好地为阁下提供服务：
            </Label>

            <Label className={"text-xs text-muted-foreground"}>
              首次登录请额外完成微信认证
            </Label>

            <AuthWechatSignIn />
          </div>
        )

      if (!profileOk) return <AuthUpdateProfile />

      return <LoadingTooltip />

    case "loading":
      return <LoadingTooltip />

    case "unauthenticated":
      return <Auth />

    default:
      throw new UnexpectedError()
  }
}
