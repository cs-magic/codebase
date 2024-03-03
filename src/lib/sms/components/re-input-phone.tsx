"use client"
import { smsState } from "@/lib/sms/store"
import { EditIcon } from "lucide-react"
import { useSnapshot } from "valtio"

export const ReInputPhone = () => {
  const { phone } = useSnapshot(smsState)

  return (
    <div className={"font-semibold inline-flex items-center gap-1"}>
      {phone}
      <EditIcon
        className={"w-4 h-4 cursor-pointer"}
        onClick={() => {
          smsState.stage = "toSendSms"
        }}
      />
    </div>
  )
}
