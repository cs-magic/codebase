import { UnexpectedError } from "@cs-magic/common"
import { smsStageAtom } from "@cs-magic/react-hooks"
import { useAtom } from "jotai"
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
