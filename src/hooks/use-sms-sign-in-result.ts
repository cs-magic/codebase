import { smsState } from "@/store/sms"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSnapshot } from "valtio"

export const useSignInResult = () => {
  const { signInOk } = useSnapshot(smsState)
  const router = useRouter()

  useEffect(() => {
    /**
     * can't redirect in zustand, ref: https://chat.openai.com/c/3af56c80-278c-4890-9976-7a2852843c3b
     */
    if (signInOk === true) router.push("/")
  }, [signInOk])
}
