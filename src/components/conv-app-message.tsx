import { IMessageInChat } from "@/schema/message"
import { useSession } from "next-auth/react"
import { DEFAULT_AVATAR } from "@/config/assets"
import { RiOpenaiFill } from "react-icons/ri"
import { Avatar, AvatarImage } from "../../packages/common/components/ui/avatar"
import { cn } from "../../packages/common/lib/utils"

export const ConvAppMessage = ({
  m,
  logo,
}: {
  m: IMessageInChat
  logo: string | null
}) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR

  return (
    <div className={"w-full flex gap-2 p-2 sm:p-4 hover:bg-accent/50"}>
      <div className={"shrink-0 w-6 h-6 mt-2"}>
        {m.role === "user" ? (
          <Avatar className={"w-full h-full"}>
            <AvatarImage
              fetchPriority={"high"}
              src={m.role === "user" ? userAvatar : logo ?? DEFAULT_AVATAR}
            />
          </Avatar>
        ) : (
          <RiOpenaiFill className={"w-full h-full"} />
        )}
      </div>

      <div
        className={cn(
          "p-2 rounded-lg overflow-hidden",
          m.isError && "text-destructive-foreground bg-destructive/75",
        )}
      >
        {m.content}
      </div>
    </div>
  )
}
