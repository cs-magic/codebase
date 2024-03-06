"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { signIn } from "next-auth/react"
import { ComponentType } from "react"
import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "../../packages/common/components/button-with-loading"
import { SeparatorContainer } from "../../packages/common/components/separator-container"
import { Button } from "../../packages/common/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../packages/common/components/ui/form"
import { Input } from "../../packages/common/components/ui/input"
import { Label } from "../../packages/common/components/ui/label"
import { useBrowserEnvironment } from "../../packages/common/hooks/use-browser-environment"
import { useSmsSendCode } from "../../packages/common/lib/sms/hooks/use-sms-send-code"
import { ISendSms, sendSmsSchema } from "../../packages/common/lib/sms/schema"
import {
  smsDowntimeAtom,
  smsPhoneAtom,
} from "../../packages/common/lib/sms/store"
import { cn } from "../../packages/common/lib/utils"
import { WECHAT_PROVIDER_ID } from "../../packages/common/lib/wechat/auth/config"

export const SmsSendCode = ({ BrandComp }: { BrandComp: ComponentType }) => {
  const { isWechat } = useBrowserEnvironment()
  const [downtime] = useAtom(smsDowntimeAtom)
  const [, setPhone] = useAtom(smsPhoneAtom)
  const sendCode = useSmsSendCode()

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendCode)}
        className={"flex flex-col gap-4 w-full items-center"}
      >
        <div className={"text-semibold text-lg flex items-center gap-1"}>
          <span className={"shrink-0"}>登录</span>
          <BrandComp />
        </div>
        <Label className={"text-muted-foreground text-xs"}>
          欢迎回来！请登录以开启 <span className={"primary-gradient"}>A I</span>{" "}
          世界！
        </Label>

        {isWechat && (
          <>
            <Button
              size={"sm"}
              className={cn("w-full bg-wechat text-white hover:bg-wechat/50")}
              onClick={(event) => {
                event.preventDefault()
                void signIn(WECHAT_PROVIDER_ID, { callbackUrl: "/" })
              }}
            >
              微信登录
            </Button>

            <SeparatorContainer>或者</SeparatorContainer>
          </>
        )}

        <FormField
          name={"phone"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入阁下的手机号</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    setPhone(event.currentTarget.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonWithLoading
          type={"submit"}
          className={"w-full"}
          downtime={downtime}
        >
          发送验证码
        </ButtonWithLoading>
      </form>
    </Form>
  )
}
