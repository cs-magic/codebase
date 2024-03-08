import { UserIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common/components/ui/avatar"
import { Label } from "../../packages/common/components/ui/label"
import { useDraftSession } from "../../packages/common/hooks/use-user-draft-session"
import { uploadFiles } from "../../packages/common/lib/oss/upload"

export const UserInputAvatar = () => {
  const { draft, setDraft } = useDraftSession("image")

  return (
    <Label className={"hover:cursor-pointer shrink-0"}>
      <Avatar className={"border w-16 h-16"}>
        <AvatarImage src={draft ?? ""} />
        <AvatarFallback>
          <UserIcon className={"w-full h-full"} />
        </AvatarFallback>
      </Avatar>

      <input
        hidden
        type={"file"}
        accept={"image/jpeg,image/png"}
        onChange={async (event) => {
          const files = event.currentTarget.files
          if (!files?.length) return
          const data = await uploadFiles(files)
          if (data.success) setDraft(data.data![0]!)
        }}
      />
    </Label>
  )
}
