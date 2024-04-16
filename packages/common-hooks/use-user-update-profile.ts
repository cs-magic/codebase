"use client"

import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner"
import { PROFILE_UPDATE_PROVIDER_ID } from "../common-auth-sms/const"
import { useDraftSession } from "./use-user-draft-session"

/**
 * 充分性：更新用户头像
 * 必要性：可能会在多个场景下更新，比如用户首次登录、用户面板
 */
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
