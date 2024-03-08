import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner"
import { PROFILE_UPDATE_PROVIDER_ID } from "../lib/sms/const"
import { useDraftSession } from "./use-user-draft-session"

export const useUserUpdateProfile = () => {
  const id = useSession().data?.user?.id
  const { draft: image } = useDraftSession("image")
  const { draft: name } = useDraftSession("name")

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
