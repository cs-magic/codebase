import { UserIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common-ui/shadcn/shadcn-components/avatar"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IUserSummary } from "../schema/user.summary"

export const UserAvatar = ({
  user,
  size = "sm",
}: {
  user: IUserSummary
  size?: "sm" | "md" | "lg"
}) => {
  return (
    <Avatar
      className={cn(
        "border",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-12 h-12",
        size === "lg" && "w-16 h-16",
      )}
    >
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>
        <UserIcon className={"w-full h-full"} />
      </AvatarFallback>
    </Avatar>
  )
}
