"use client"
import { userPhoneAtom } from "../../packages/common-auth/store"
import { smsStageAtom } from "../../packages/common-sms/store"
import { EditIcon } from "lucide-react"
import { useAtom } from "jotai"

export const SmsReInputPhone = () => {
  const [phone] = useAtom(userPhoneAtom)
  const [, setStage] = useAtom(smsStageAtom)

  return (
    <div className={"font-semibold inline-flex items-center gap-1"}>
      {phone}
      <EditIcon
        className={"w-4 h-4 cursor-pointer"}
        onClick={() => {
          setStage("toSendSms")
        }}
      />
    </div>
  )
}
