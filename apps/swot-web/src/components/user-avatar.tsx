import { IUserSummary } from "@cs-magic/common"
import { VerticalAspectRatio } from "@cs-magic/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@cs-magic/ui"
import { cn } from "@cs-magic/common"
import { upgradeUrl } from "@cs-magic/common"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import omit from "lodash/omit"
import { UserIcon } from "lucide-react"
import { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import Image from "next/image"

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
          {/*<AvatarImage*/}
          {/*  src={*/}
          {/*    imageProps?.src ?? upgradeUrl(user?.image ?? user?.avatar ?? "")*/}
          {/*  }*/}
          {/*  {...omit(imageProps, ["src"])}*/}
          {/*/>*/}
          <Image
            alt={"user-avatar"}
            width={120}
            height={120}
            className={"rounded-full "}
            src={
              imageProps?.src ?? upgradeUrl(user?.image ?? user?.avatar ?? "")
            }
            {...omit(imageProps, ["src", "width", "height"])}
          />
          <AvatarFallback>
            {user?.name?.length ? (
              user.name.slice(0, 2)
            ) : (
              <UserIcon className={"h-full w-full"} />
            )}
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && <span>{user?.name}</span>}
    </div>
  )
}
