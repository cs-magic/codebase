import { useKey } from "react-use"
import { addCode, delCode } from "@/store/sms"

/**
 * 输入六位验证码，并自动触发登录验证
 */
export const useInputVerifyCodes = () => {
  for (const char of "0123456789".split("")) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKey(char, () => {
      addCode(char)
    })
  }

  useKey("Backspace", delCode)
}
