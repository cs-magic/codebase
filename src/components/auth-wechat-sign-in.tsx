import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "../../packages/common-auth-wechat/config"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import { cn } from "../../packages/common-ui/shadcn/utils"

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
