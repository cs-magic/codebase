"use client"

import { cn, SMS_DIGIT_SIZE, SMS_PROVIDER_ID } from "@cs-magic/common"
import {
  smsCodeAtom,
  smsSignInPayloadAtom,
  uiLoadingAlertDialogAtom,
} from "@cs-magic/react-hooks"

import { Label } from "@cs-magic/react-ui"
import { useHotkeys } from "@mantine/hooks"
import { useAtom, useSetAtom } from "jotai"
import { signIn } from "next-auth/react"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

import { SmsReInputPhone } from "./auth-sms-reinput-phone"
import { SmsResendCode } from "./auth-sms-resend-code"

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
    <div className={"flex w-full flex-col items-center gap-4"}>
      验证您的手机号
      <div
        className={
          "flex flex-col items-center gap-2 text-xs text-muted-foreground"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <Label className={"relative h-8 w-full sm:h-12"}>
          <input
            className={"absolute opacity-0"}
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
              event.preventDefault() // 阻止其他行为

              const key = event.key
              // console.log("onKeyDown key: ", event.key)
              if (/\d/.test(key)) {
                setDigits((d) => d + key)
              } else if (key === "Backspace") {
                setDigits("")
              }
            }}
            // NOTE: onChange 对于 one-time-code 是必须得
            onChange={(event) => {
              setDigits(event.currentTarget.value)
            }}
          />

          <div className={"flex items-center justify-center gap-2 "}>
            <span className={cn("font-black text-primary/75", SMS_DIGIT_SIZE)}>
              M -{" "}
            </span>

            {[...Array(6)].map((value, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border p-0 text-center sm:h-12 sm:w-12",
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
