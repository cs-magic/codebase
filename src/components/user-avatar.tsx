import { UserIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common-ui-shadcn/components/avatar"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { IUserSummary } from "../schema/user.summary"

export const UserAvatar = ({
  user,
  size = "sm",
  withName,
  className,
  ...props
}: {
  user: IUserSummary
  size?: "sm" | "md" | "lg"
  withName?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Avatar
        className={cn(
          "border-none",
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

      {withName && <span>{user.name}</span>}
    </div>
  )
}
