import { uploadFile } from "@cs-magic/common/server"
import { Label } from "@cs-magic/react-ui"
import { useDraftSession } from "@cs-magic/react-hooks"

import { UserAvatar } from "./user-avatar"

export const UserInputAvatar = () => {
  const { draft, setDraft } = useDraftSession("image")

  return (
    <Label className={"h-12 shrink-0 hover:cursor-pointer"}>
      <UserAvatar user={{ id: "", image: draft ?? "", name: "" }} />

      <input
        hidden
        type={"file"}
        accept={"image/jpeg,image/png"}
        onChange={async (event) => {
          const files = event.currentTarget.files
          if (!files?.length) return

          const data = await uploadFile(files[0]!)
          if (data.success) setDraft(data.data)
        }}
      />
    </Label>
  )
}
