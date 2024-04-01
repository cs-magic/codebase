import { useAtom } from "jotai"
import { Label } from "../../packages/common-ui-shadcn/components/label"
import { PROJECT_NAME } from "../config/card"
import { cardAtom, cardUserAtom } from "../store/card.atom"
import { UserAvatar } from "./user-avatar"

export const CardHeader = () => {
  const [body] = useAtom(cardAtom)
  const [user] = useAtom(cardUserAtom)

  return (
    <div className={"text-xs flex items-center justify-between px-4 pb-2 pt-6"}>
      <div className={"flex gap-2 items-center justify-end"}>
        {user ? (
          <>
            <UserAvatar user={user} />

            <Label className={"text-primary-foreground"}>
              <span className={"font-bold text-lg mr-1 primary-gradient"}>
                {user.name}
              </span>
              分享给你一张卡片 #{body.id}
            </Label>
          </>
        ) : (
          "no user"
        )}
      </div>

      <div className={"flex items-center gap-2"}>
        {/*<span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>*/}

        <div className={"text-primary-foreground text-lg font-medium shrink-0"}>
          {PROJECT_NAME}
        </div>
      </div>
    </div>
  )
}
