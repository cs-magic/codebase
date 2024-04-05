import { UserIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common-ui-shadcn/components/avatar"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { VerticalAspectRatio } from "../../packages/common-ui/components/aspect-ratio"
import { upgradeUrl } from "../../packages/common-utils/parse-url"
import { IUserBasic } from "../schema/user.summary"

export const UserAvatar = ({
  user,
  withName,
  className,
  ...props
}: {
  user: IUserBasic
  withName?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-2 h-full", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar className={cn("border-none w-full h-full")}>
          <AvatarImage src={upgradeUrl(user.avatar ?? "")} />
          <AvatarFallback>
            <UserIcon className={"w-full h-full"} />
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && <span>{user.name}</span>}
    </div>
  )
}
