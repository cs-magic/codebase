import { useAtom } from "jotai"
import { UserIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../packages/common/components/ui/avatar"
import { Label } from "../../packages/common/components/ui/label"
import { useUserDraftImage } from "../../packages/common/hooks/use-user"
import { uploadFiles } from "../../packages/common/lib/oss/upload"
import { smsImageAtom } from "../../packages/common/lib/sms/store"

export const UserInputAvatar = () => {
  const [, setImage] = useAtom(smsImageAtom)
  const image = useUserDraftImage()

  return (
    <Label className={"hover:cursor-pointer shrink-0"}>
      <Avatar className={"border w-16 h-16"}>
        <AvatarImage src={image} />
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
          if (data.success) setImage(data.data![0]!)
        }}
      />
    </Label>
  )
}
