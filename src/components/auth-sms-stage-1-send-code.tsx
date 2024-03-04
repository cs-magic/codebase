"use client"

import {
  smsDowntimeAtom,
  smsNameAtom,
  smsPhoneAtom,
} from "../../packages/common/lib/sms/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../packages/common/components/ui/form"
import { Label } from "../../packages/common/components/ui/label"
import { Button } from "../../packages/common/components/ui/button"
import { Input } from "../../packages/common/components/ui/input"
import { ISendSms, sendSmsSchema } from "../../packages/common/lib/sms/schema"
import { cn } from "../../packages/common/lib/utils"
import { useBrowserEnvironment } from "../../packages/common/hooks/use-browser-environment"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "../../packages/common/lib/wechat/auth/config"
import { useAtom } from "jotai"

import { ButtonWithLoading } from "../../packages/common/components/button-with-loading"
import { SeparatorContainer } from "../../packages/common/components/separator-container"
import { ComponentType } from "react"
import { useSmsSendCode } from "../../packages/common/lib/sms/hooks/use-sms-send-code"

export const SmsSendCode = ({ BrandComp }: { BrandComp: ComponentType }) => {
  const { isWechat } = useBrowserEnvironment()
  const [downtime] = useAtom(smsDowntimeAtom)
  const [, setPhone] = useAtom(smsPhoneAtom)
  const [, setName] = useAtom(smsNameAtom)
  const sendCode = useSmsSendCode()

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "",
      name: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendCode)}
        className={"flex flex-col gap-4 w-full items-center"}
      >
        <div className={"text-semibold text-lg flex items-center gap-1"}>
          登录
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
          name={"name"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入阁下的昵称</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    setName(event.currentTarget.value)
                  }}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
