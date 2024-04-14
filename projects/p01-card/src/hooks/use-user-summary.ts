import { useSession } from "next-auth/react"
import { IUserSummary } from "../schema/user.summary"

export const useUserSummary = () => {
  const user = useSession().data?.user

  if (!!user && user.name && user.image) return user as IUserSummary
  return null
}
