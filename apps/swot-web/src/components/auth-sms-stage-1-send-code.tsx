"use client"
import { useSmsSendCode } from "@cs-magic/auth/providers/sms/hooks/use-sms-send-code"
import { ISendSms, sendSmsSchema } from "@cs-magic/auth/providers/sms/schema"
import {
  smsCodeCurCountdownSecondsAtom,
  userPhoneAtom,
} from "@cs-magic/auth/providers/sms/store"
import { ButtonWithLoading } from "@cs-magic/common/ui/components/button-with-loading"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@cs-magic/common/ui/components/shadcn/ui/form"
import { Input } from "@cs-magic/common/ui/components/shadcn/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { useForm } from "react-hook-form"

export const AuthSmsStage1SendCode = () => {
  const [downtime] = useAtom(smsCodeCurCountdownSecondsAtom)

  const setPhone = useSetAtom(userPhoneAtom)

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
        className={"flex w-full flex-col gap-4"}
      >
        <FormField
          name={"phone"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入阁下的手机号</FormLabel>
              <FormControl>
                <Input
                  // 不要加自动聚焦，因为不止一种登录方式
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
          className={"w-full"}
          downtime={downtime}
          type={"submit"}
        >
          发送验证码
        </ButtonWithLoading>
      </form>
    </Form>
  )
}
