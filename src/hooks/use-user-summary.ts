import { useSession } from "next-auth/react"
import { IUserSummary } from "../schema/user.summary"

export const useUserSummary = () => {
  const user = useSession().data?.sender

  if (!!user && user.name && user.image) return user as IUserSummary
  return null
}
