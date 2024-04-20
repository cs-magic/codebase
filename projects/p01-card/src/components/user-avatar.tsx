import { upgradeUrl } from "@cs-magic/common/utils/upgrade-url";
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { omit } from "lodash";
import { UserIcon } from "lucide-react";
import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../common/ui-shadcn/components/avatar";
import { cn } from "../../../../common/ui-shadcn/utils";
import { VerticalAspectRatio } from "../../../../common/ui/components/aspect-ratio";

export const UserAvatar = ({
  user,
  withName,
  className,
  imageProps,
  ...props
}: {
  user: IUserSummary;
  withName?: boolean;
} & HTMLAttributes<HTMLDivElement> & {
    imageProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
  }) => {
  return (
    <div className={cn("flex h-full items-center gap-2", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar className={cn("h-full w-full border-none")}>
          <AvatarImage
            src={imageProps?.src ?? upgradeUrl(user.image ?? user.avatar ?? "")}
            {...omit(imageProps, ["src"])}
          />
          <AvatarFallback>
            <UserIcon className={"h-full w-full"} />
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && <span>{user.name}</span>}
    </div>
  );
};
