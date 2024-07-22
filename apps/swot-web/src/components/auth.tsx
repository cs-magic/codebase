"use client"

import { useEnvironments } from "@cs-magic/hooks"
import { JoinComponents } from "@cs-magic/ui"
import { SeparatorContainer } from "@cs-magic/ui"
import { Label } from "@cs-magic/ui"
import { AuthSmsSignIn } from "./auth-sms-sign-in"
import { AuthWechatSignIn } from "./auth-wechat-sign-in"
import { BrandingTitle } from "./branding-title"

export const Auth = () => {
  const { isWechat } = useEnvironments()

  return (
    <div className={"flex w-full flex-col items-center gap-4"}>
      <div className={"text-semibold flex items-center gap-1 text-lg"}>
        <span className={"shrink-0"}>登录</span>

        <BrandingTitle className={"gap-2 text-lg"} />
      </div>
      <Label className={"text-xs text-muted-foreground"}>
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
