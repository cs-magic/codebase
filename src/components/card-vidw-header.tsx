import { Label } from "../../packages/common-ui-shadcn/components/label"
import { PROJECT_NAME } from "../config/card"
import { IUserSummary } from "../schema/user.summary"
import { UserAvatar } from "./user-avatar"

export const CardHeader = ({ user }: { user: IUserSummary | null }) => {
  return (
    <div className={"text-xs flex items-center justify-between p-2"}>
      <div className={"flex gap-2 items-center justify-end"}>
        {user ? (
          <>
            <UserAvatar user={user} />

            <Label className={"primary-gradient"}>
              <span className={"font-bold text-lg"}>{user.name}</span>
              分享给你一张卡片
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
