import { useAtom } from "jotai"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { uiLoadingAlertDialogAtom } from "../../../store/ui"
import { SMS_PROVIDER_ID } from "../const"
import { smsSignInPayloadAtom } from "../store"

export const useSmsSignIn = () => {
  const [, setLoading] = useAtom(uiLoadingAlertDialogAtom)
  const [data] = useAtom(smsSignInPayloadAtom)

  return async () => {
    console.log("[sms] sign in with: ", data)

    setLoading(true)
    const res = await signIn(SMS_PROVIDER_ID, {
      ...data,
      redirect: false,
    })
    console.log("[sms] sign in result: ", res)
    const ok = !!res?.ok
    if (!ok) toast.error("验证失败！")
    setLoading(false)
  }
}
