import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { ISendSms, ISmsSignIn } from "@/schema/sms"
import { SetState } from "@/schema/utils"
import { Dispatch, SetStateAction } from "react"
import { signIn } from "next-auth/react"
import { uiState } from "@/store/ui"
import { $sendSms } from "@/server/sms/functions"
import { toast } from "sonner"
import { SMS_CODE_DOWNTIME, SMS_PROVIDER_ID } from "@/config/system"
import { proxy } from "valtio"

type SmsStage = "toSendSms" | "toAuth"

export const smsState = proxy<{
  stage: SmsStage
  phone: string
  code: string
  downtime: number
  sentOk?: boolean
  signInOk?: boolean
}>({
  phone: "",
  code: "",
  stage: "toSendSms",
  downtime: 0,
  sentOk: false,
  signInOk: false,
})

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export interface SmsSlice {
  stage: SmsStage
  setStage: SetState<SmsStage>

  phone: string
  setPhone: SetState<string>

  code: string
  setCode: Dispatch<SetStateAction<string>>

  sendCode: (values: ISendSms) => void
  downtime: number
  sentOk?: boolean

  smsSignIn: () => void
  signInOk?: boolean
}

export const useSmsStore = create<SmsSlice>()(
  immer((setState, getState, store) => ({
    stage: "toSendSms",
    setStage: (stage) =>
      setState((state) => {
        state.stage = stage
      }),

    phone: "",
    setPhone: (phone) =>
      setState((state) => {
        state.phone = phone
      }),

    code: "",
    setCode: (code) => {
      setState((state) => {
        // todo: generic ?
        state.code = typeof code === "function" ? code(state.code) : code
      })

      // 直接在这里登录，没必要在前端 hook 了
      // attention: 要在外面获取 getState，不能在 setState 里面，里面是 draft
      if (getState().code.length === 6) {
        getState().smsSignIn()
      }
    },

    sendingCodeStatus: "default",
    downtime: 0,
    /**
     * 在 immer 中异步操作的要领，就是不要在 immer 中异步
     */
    sendCode: async (data: ISendSms) => {
      const { phone } = data

      // 同步 immer
      setState((state) => {
        state.phone = phone
      })

      // UI 跨 store 同步
      uiState.loading = true
      const ok = await $sendSms(phone) // 异步
      uiState.loading = false

      // 同步 immer
      setState((state) => {
        state.sentOk = ok
        if (ok) toast.success("验证码发送成功，请及时查收！")
        else toast.error("验证码发送失败！")

        if (ok) {
          state.stage = "toAuth"
          state.downtime = SMS_CODE_DOWNTIME

          const f = () => {
            // 同步 immer
            setState((state) => {
              // 异步
              if (--state.downtime > 0) setTimeout(f, 1000)
            })
          }
          // 异步
          setTimeout(f, 1000)
        }
      })
    },

    smsSignIn: async () => {
      const values: ISmsSignIn = {
        phone: getState().phone,
        code: getState().code,
      }

      console.log("[sms] sign in: ", values)
      uiState.loading = true
      const res = await signIn(SMS_PROVIDER_ID, {
        ...values,
        redirect: false,
      })
      uiState.loading = false

      console.log("[sms] sign in result: ", res)

      setState((state) => {
        const ok = !!res?.ok
        state.signInOk = ok

        if (ok) {
          toast.success("登录成功！")
        } else toast.error("登录失败！")
      })
    },
  })),
)
