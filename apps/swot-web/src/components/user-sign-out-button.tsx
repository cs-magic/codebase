import { Button } from "@cs-magic/common"
import { signOut } from "next-auth/react"

export const UserSignOutButton = () => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => signOut()}
      className={"w-full"}
    >
      退出登录
    </Button>
  )
}
