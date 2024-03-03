import { useKey } from "react-use"
import { inputSmsCodeAtom, resetSmsCodeAtom } from "@/lib/sms/store"
import { useSetAtom } from "jotai"

/**
 * 输入六位验证码，并自动触发登录验证
 */
export const useInputVerifyCodes = () => {
  const resetSmsCode = useSetAtom(resetSmsCodeAtom)
  const inputDigit = useSetAtom(inputSmsCodeAtom)

  for (const digit of "0123456789".split("")) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKey(digit, () => {
      inputDigit(digit)
    })
  }

  useKey("Backspace", resetSmsCode)
}
