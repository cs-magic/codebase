import { IUserSummary } from "@cs-magic/common"
import { useSession } from "next-auth/react"

export const useUserSummary = () => {
  const user = useSession().data?.user

  if (!!user && user.name && user.image) return user as IUserSummary
  return null
}

export const useUserIsAdmin = () => {
  const user = useSession().data?.user

  return user?.id === "mark"
}
