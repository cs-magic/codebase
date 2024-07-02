import { signOut } from "next-auth/react"
import { Button } from "@cs-magic/common/ui-shadcn/components/button"

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
