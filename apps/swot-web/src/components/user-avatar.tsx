import { upgradeUrl } from "@cs-magic/common/utils/upgrade-url"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import omit from "lodash/omit"
import { UserIcon } from "lucide-react"
import { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@cs-magic/common/ui-shadcn/components/avatar"
import { cn } from "@cs-magic/common/ui-shadcn/utils"
import { VerticalAspectRatio } from "@cs-magic/common/ui/components/aspect-ratio"

export const UserAvatar = ({
  user,
  withName,
  className,
  imageProps,
  avatarProps,
  ...props
}: {
  user: IUserSummary | null
  withName?: boolean
} & HTMLAttributes<HTMLDivElement> & {
    imageProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
    avatarProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
  }) => {
  return (
    <div className={cn("flex h-full items-center gap-2", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar
          className={cn("h-full w-full border-none", avatarProps?.className)}
          {...omit(avatarProps, ["className"])}
        >
          <AvatarImage
            src={
              imageProps?.src ?? upgradeUrl(user?.image ?? user?.avatar ?? "")
            }
            {...omit(imageProps, ["src"])}
          />
          <AvatarFallback>
            <UserIcon className={"h-full w-full"} />
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && <span>{user?.name}</span>}
    </div>
  )
}
