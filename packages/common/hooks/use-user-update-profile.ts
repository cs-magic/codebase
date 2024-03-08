import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner"
import { PROFILE_UPDATE_PROVIDER_ID } from "../lib/sms/const"
import { useUserDraftImage, useUserDraftName } from "./use-user"

export const useUserUpdateProfile = () => {
  const id = useSession().data?.user?.id
  const name = useUserDraftName()
  const image = useUserDraftImage()

  return async () => {
    if (!id || !name || !image) {
      toast.error("id/name/image 不得为空")
      return { ok: false }
    }
    return await signIn(PROFILE_UPDATE_PROVIDER_ID, {
      id,
      name,
      image,
      redirect: false,
    })
  }
}
