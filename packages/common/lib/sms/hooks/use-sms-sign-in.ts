import { useAtom } from "jotai"
import { uiLoadingAlertDialogAtom } from "../../../store/ui"
import { smsSignInPayloadAtom, smsSignOKAtom } from "../store"
import { signIn } from "next-auth/react"
import { SMS_PROVIDER_ID } from "../coonfig"
import { toast } from "sonner"

export const useSmsSignIn = () => {
  const [, setLoading] = useAtom(uiLoadingAlertDialogAtom)
  const [, setSmsSignInOK] = useAtom(smsSignOKAtom)
  const [data] = useAtom(smsSignInPayloadAtom)

  return async () => {
    console.log("[sms] sign in with: ", data)

    setLoading(true)
    const res = await signIn(SMS_PROVIDER_ID, {
      ...data,
      redirect: false,
    })
    const ok = !!res?.ok
    setSmsSignInOK(ok)
    if (ok) {
      toast.success("登录成功！")
    } else toast.error("登录失败！")
    setLoading(false)
  }
}
