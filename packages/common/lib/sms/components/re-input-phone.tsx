"use client"
import { smsPhoneAtom, smsStageAtom } from "../atom-state"
import { EditIcon } from "lucide-react"
import { useAtom } from "jotai"

export const ReInputPhone = () => {
  const [phone] = useAtom(smsPhoneAtom)
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
