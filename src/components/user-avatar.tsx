import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { UserIcon } from "lucide-react"
import { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common-ui-shadcn/components/avatar"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { VerticalAspectRatio } from "../../packages/common-ui/components/aspect-ratio"
import { upgradeUrl } from "../../packages/common-utils/parse-url"
import { IUserBasic } from "../schema/user.summary"
import { omit } from "lodash"

export const UserAvatar = ({
  user,
  withName,
  className,
  imageProps,
  ...props
}: {
  user: IUserBasic
  withName?: boolean
} & HTMLAttributes<HTMLDivElement> & {
    imageProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
  }) => {
  return (
    <div className={cn("flex items-center gap-2 h-full", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar className={cn("border-none w-full h-full")}>
          <AvatarImage
            src={imageProps?.src ?? upgradeUrl(user.avatar ?? "")}
            {...omit(imageProps, ["src"])}
          />
          <AvatarFallback>
            <UserIcon className={"w-full h-full"} />
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && <span>{user.name}</span>}
    </div>
  )
}
