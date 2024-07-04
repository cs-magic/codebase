import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "../../../../packages/auth-wechat/src/config"
import { Button } from "@cs-magic/common/ui-shadcn/components/button"
import { cn } from "@cs-magic/common/ui-shadcn/utils"

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
