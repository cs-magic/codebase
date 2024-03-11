import { useAtom, useSetAtom } from "jotai"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { uiLoadingAlertDialogAtom } from "../../common-ui/store"
import { SMS_PROVIDER_ID } from "../const"
import { smsSignInPayloadAtom } from "../store"

export const useSmsSignIn = () => {
  const [data] = useAtom(smsSignInPayloadAtom)

  const setLoading = useSetAtom(uiLoadingAlertDialogAtom)

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
