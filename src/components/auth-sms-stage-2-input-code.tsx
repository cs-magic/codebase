"use client"

import { useAtom, useSetAtom } from "jotai"
import { signIn } from "next-auth/react"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { SMS_PROVIDER_ID } from "../../packages/common-auth-sms/const"
import {
  smsCodeAtom,
  smsSignInPayloadAtom,
} from "../../packages/common-auth-sms/store"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { uiLoadingAlertDialogAtom } from "../../packages/common-ui/store"
import { SMS_DIGIT_SIZE } from "../config/sms"
import { SmsReInputPhone } from "./auth-sms-reinput-phone"
import { SmsResendCode } from "./auth-sms-resend-code"
import { useHotkeys } from "@mantine/hooks"

export const AuthSmsStage2InputCode = () => {
  const [digits, setDigits] = useAtom(smsCodeAtom)

  const refInput = useRef<HTMLInputElement>(null)

  const [data] = useAtom(smsSignInPayloadAtom)

  const setLoading = useSetAtom(uiLoadingAlertDialogAtom)

  const smsSignIn = async () => {
    if (digits.length !== 6) return

    console.log("[sms] sign in with: ", data)

    setLoading(true)
    const res = await signIn(SMS_PROVIDER_ID, {
      ...data,
      redirect: false,
    })
    console.log("[sms] sign in result: ", res)
    const ok = !!res?.ok
    if (!ok) toast.error(`验证失败！原因：${res?.error ?? "未知"}`)
    setLoading(false)
  }

  useEffect(() => {
    void smsSignIn()
  }, [digits])

  useHotkeys([["Backspace", () => setDigits("")]])

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <Label className={"w-full h-8 sm:h-12 relative"}>
          <input
            className={"opacity-0 absolute"}
            // hidden // 不能
            autoFocus
            ref={refInput}
            placeholder="000000"
            type={"text"}
            // ref: https://dev.to/madsstoumann/using-a-single-input-for-one-time-code-352l
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            pattern="\d{6}"
            // NOTE: onKeyDown 会被 onChange劫持
            onKeyDown={(event) => {
              const key = event.key
              // console.log("onKeyDown key: ", event.key)
              if (/\d/.test(key)) {
                setDigits((d) => d + key)
              } else if (key === "Backspace") {
                event.preventDefault() // 阻止默认的回退一个字符的行为
                setDigits("")
              }
            }}
            // NOTE: onChange 对于 one-time-code 是必须得
            onChange={(event) => {
              setDigits(event.currentTarget.value)
            }}
          />

          <div className={"flex justify-center items-center gap-2 "}>
            <span className={cn("font-black text-primary/75", SMS_DIGIT_SIZE)}>
              M -{" "}
            </span>

            {[...Array(6)].map((value, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-center p-0 border",
                  SMS_DIGIT_SIZE,
                )}
              >
                {index < digits.length ? (
                  digits[index]
                ) : index === digits.length ? (
                  <span className={"cursor"} />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </Label>

        <SmsReInputPhone />
      </div>

      <SmsResendCode />
    </div>
  )
}
