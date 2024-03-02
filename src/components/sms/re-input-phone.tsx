import { useSmsStore } from "@/store/sms"
import { EditIcon } from "lucide-react"

export const ReInputPhone = () => {
  const { phone, setStage } = useSmsStore((state) => ({
    phone: state.phone,
    setStage: state.setStage,
  }))

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
