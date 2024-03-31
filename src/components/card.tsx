"use client"

import { useAtom } from "jotai"
import { forwardRef, HTMLAttributes } from "react"
import { AspectRatio } from "../../packages/common-ui-shadcn/components/aspect-ratio"
import {
  Avatar,
  AvatarImage,
} from "../../packages/common-ui-shadcn/components/avatar"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { useInitCardContent } from "../hooks/use-card-content"
import { ICard } from "../schema/card"
import {
  bilibiliVideoControlEnabledAtom,
  cardUserAtom,
} from "../store/card.atom"
import { CardHeader } from "./card-vidw-header"
import { CardContent } from "./card-view-content"
import { CardFooter } from "./card-view-footer"

export const Card = forwardRef<
  HTMLDivElement,
  {
    card: ICard
  } & HTMLAttributes<HTMLDivElement>
>(({ card, className, ...props }, ref) => {
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)

  useInitCardContent({ card })

  const padding = 24
  const [cardUser] = useAtom(cardUserAtom)

  return (
    <div
      ref={ref}
      className={cn("rounded-lg corner-gradient min-w-[367px]", className)}
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        width:
          padding * 2 +
          (card.type === "text-iframe" && bilibiliVideoControlEnabled
            ? 420
            : 419),
      }}
      {...props}
    >
      {/*<AspectRatio ratio={8 / 16}>*/}
      {/*  <div className={"w-full h-full overflow-hidden flex flex-col pt-4"}>*/}
      <CardHeader user={card.user ?? cardUser} />
      <CardContent card={card} />
      <CardFooter />
      {/*</div>*/}
      {/*</AspectRatio>*/}
    </div>
  )
})
Card.displayName = "Card"
