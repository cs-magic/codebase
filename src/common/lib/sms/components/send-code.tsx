"use client"

import {
  smsDowntimeAtom,
  smsNameAtom,
  smsPhoneAtom,
} from "@/common/lib/sms/atom-state"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form"
import { Label } from "@/common/components/ui/label"
import { Button } from "@/common/components/ui/button"
import { Input } from "@/common/components/ui/input"
import { ISendSms, sendSmsSchema } from "@/common/lib/sms/schema"
import { cn } from "@/common/lib/utils"
import { useBrowserEnvironment } from "@/common/hooks/use-browser-environment"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "@/common/lib/wechat/auth/config"
import { BrandTitle } from "@/components/branding"
import { useAtom } from "jotai"
import { sendCodeAtom } from "@/common/lib/sms/atom-actions"

import { ButtonWithLoading } from "@/common/components/button-with-loading"
import { SeparatorContainer } from "@/common/components/separator-container"

export const SmsSendCode = () => {
  const { isWechat } = useBrowserEnvironment()
  const [downtime] = useAtom(smsDowntimeAtom)
  const [, setPhone] = useAtom(smsPhoneAtom)
  const [, setName] = useAtom(smsNameAtom)
  const [, sendCode] = useAtom(sendCodeAtom)
  const onSubmit = (values: ISendSms) => {
    setPhone(values.phone)
    setName(values.name)
    sendCode()
  }

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "17766091857",
      name: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-4 w-full items-center"}
      >
        <div className={"text-semibold text-lg flex items-center gap-1"}>
          登录
          <BrandTitle className={"text-lg gap-2"} />
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
              <FormLabel>请输入手机号</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={"name"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入昵称</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
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
