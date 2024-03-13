"use client"
import { useAtom, useSetAtom } from "jotai"
import { EditIcon } from "lucide-react"
import {
  smsStageAtom,
  userPhoneAtom,
} from "../../packages/common-auth-sms/store"

export const SmsReInputPhone = () => {
  const [phone] = useAtom(userPhoneAtom)

  const setStage = useSetAtom(smsStageAtom)

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
