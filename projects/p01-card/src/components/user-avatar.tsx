import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { UserIcon } from "lucide-react";
import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../packages/common-ui-shadcn/components/avatar";
import { cn } from "../../../../packages/common-ui-shadcn/utils";
import { VerticalAspectRatio } from "../../../../packages/common-ui/components/aspect-ratio";
import { IUserBasic } from "../schema/user";
import { omit } from "lodash";

export const UserAvatar = ({
  user,
  withName,
  className,
  imageProps,
  ...props
}: {
  user: IUserBasic;
  withName?: boolean;
} & HTMLAttributes<HTMLDivElement> & {
    imageProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
  }) => {
  return (
    <div className={cn("flex h-full items-center gap-2", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar className={cn("h-full w-full border-none")}>
          <AvatarImage
            src={imageProps?.src ?? upgradeUrl(user.avatar ?? "")}
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
