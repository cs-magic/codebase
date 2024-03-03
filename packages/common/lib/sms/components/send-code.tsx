"use client"

import { smsDowntimeAtom, smsNameAtom, smsPhoneAtom } from "../atom-state"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { ISendSms, sendSmsSchema } from "../schema"
import { cn } from "../../utils"
import { useBrowserEnvironment } from "../../../hooks/use-browser-environment"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "../../wechat/auth/config"
import { useAtom } from "jotai"
import { sendCodeAtom } from "../atom-actions"

import { ButtonWithLoading } from "../../../components/button-with-loading"
import { SeparatorContainer } from "../../../components/separator-container"
import { ComponentType } from "react"

export const SmsSendCode = ({ BrandComp }: { BrandComp: ComponentType }) => {
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
