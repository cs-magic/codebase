import { useAtom } from "jotai"
import { UnexpectedError } from "../../packages/common-general/schema"
import { smsStageAtom } from "../../packages/common-auth-sms/store"
import { AuthSmsStage2InputCode } from "./auth-sms-stage-2-input-code"
import { AuthSmsStage1SendCode } from "./auth-sms-stage-1-send-code"

export const AuthSmsSignIn = () => {
  const [stage] = useAtom(smsStageAtom)

  switch (stage) {
    case "toSendSms":
      return <AuthSmsStage1SendCode />

    case "toAuth":
      return <AuthSmsStage2InputCode />

    default:
      throw new UnexpectedError()
  }
}
