import { Button } from "@cs-magic/common/ui/components/shadcn/ui/button"
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
