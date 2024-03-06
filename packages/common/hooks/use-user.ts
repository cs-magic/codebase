import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { smsImageAtom, smsNameAtom } from "../lib/sms/store"

export const useUserDraftName = () => {
  const [name] = useAtom(smsNameAtom)
  const sessionName = useSession().data?.user?.name ?? ""
  return name || sessionName
}
export const useUserDraftImage = () => {
  const [image] = useAtom(smsImageAtom)
  const sessionImage = useSession().data?.user?.image ?? ""
  return image || sessionImage
}
