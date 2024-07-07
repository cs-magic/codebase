import { WECHAT_PROVIDER_ID } from "@cs-magic/auth/providers/wechat/config"
import { Button } from "@cs-magic/common/ui/components/shadcn/ui/button"
import { cn } from "@cs-magic/common/ui/utils"
import { signIn } from "next-auth/react"

export const AuthWechatSignIn = () => (
  <Button
    size={"sm"}
    className={cn("w-full bg-wechat text-white hover:bg-wechat/50")}
    onClick={async (event) => {
      event.preventDefault()
      await signIn(WECHAT_PROVIDER_ID, { redirect: false })
    }}
  >
    微信登录
  </Button>
)
