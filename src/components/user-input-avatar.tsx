import { useDraftSession } from "../../packages/common-hooks/use-user-draft-session"
import { uploadFiles } from "../../packages/common-oss/upload"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { UserAvatar } from "./user-avatar"

export const UserInputAvatar = () => {
  const { draft, setDraft } = useDraftSession("image")

  return (
    <Label className={"hover:cursor-pointer shrink-0"}>
      <UserAvatar user={{ id: "", image: draft ?? "", name: "" }} />

      <input
        hidden
        type={"file"}
        accept={"image/jpeg,image/png"}
        onChange={async (event) => {
          const files = event.currentTarget.files
          if (!files?.length) return
          const data = await uploadFiles(files)
          if (data.success) setDraft(data.data![0])
        }}
      />
    </Label>
  )
}
