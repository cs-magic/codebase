"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useSmsSendCode } from "../../../../common/auth-sms/hooks/use-sms-send-code";
import {
  ISendSms,
  sendSmsSchema,
} from "../../../../common/auth-sms/schema";
import {
  smsCodeCurCountdownSecondsAtom,
  userPhoneAtom,
} from "../../../../common/auth-sms/store";
import { ButtonWithLoading } from "../../../../common/ui/components/button-with-loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../common/ui-shadcn/components/form";
import { Input } from "../../../../common/ui-shadcn/components/input";

export const AuthSmsStage1SendCode = () => {
  const [downtime] = useAtom(smsCodeCurCountdownSecondsAtom);

  const setPhone = useSetAtom(userPhoneAtom);

  const sendCode = useSmsSendCode();

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "",
    },
  });

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
                    field.onChange(event);
                    setPhone(event.currentTarget.value);
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
  );
};
