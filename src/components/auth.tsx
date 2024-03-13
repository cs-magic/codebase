"use client"

import { useEnvironments } from "../../packages/common-hooks/use-environments"
import JoinComponents from "../../packages/common-ui/components/join-components"
import { SeparatorContainer } from "../../packages/common-ui/components/separator-container"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { AuthSmsSignIn } from "./auth-sms-sign-in"
import { AuthWechatSignIn } from "./auth-wechat-sign-in"
import { BrandingTitle } from "./branding-title"

export const Auth = () => {
  const { isWechat } = useEnvironments()

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <div className={"text-semibold text-lg flex items-center gap-1"}>
        <span className={"shrink-0"}>登录</span>

        <BrandingTitle className={"text-lg gap-2"} />
      </div>
      <Label className={"text-muted-foreground text-xs"}>
        欢迎回来！请登录以开启 <span className={"primary-gradient"}>A I</span>{" "}
        世界！
      </Label>

      <JoinComponents
        components={[
          isWechat ? <AuthWechatSignIn key={1} /> : null,
          <AuthSmsSignIn key={2} />,
        ]}
        separator={<SeparatorContainer>或者</SeparatorContainer>}
      />
    </div>
  )
}
