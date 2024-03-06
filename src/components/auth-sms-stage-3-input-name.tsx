import { useAtom } from "jotai"
import { Button } from "../../packages/common/components/ui/button"
import { Label } from "../../packages/common/components/ui/label"
import { useUserUpdateProfile } from "../../packages/common/hooks/use-user-update-profile"
import { smsImageAtom, smsNameAtom } from "../../packages/common/lib/sms/store"
import { UserInputAvatar } from "./user-input-avatar"
import { UserInputName } from "./user-input-name"

export const SmsWithName = () => {
  const [name] = useAtom(smsNameAtom)
  const [image] = useAtom(smsImageAtom)
  const updateProfile = useUserUpdateProfile()

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>只差最后一步啦！</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-4"
        }
      >
        <div>请输入阁下的昵称：</div>
        <UserInputName />

        <div>请上传阁下的头像：</div>
        <UserInputAvatar />

        <Button
          disabled={!name || !image}
          className={"w-full"}
          onClick={updateProfile}
        >
          敬启 AI 世界
        </Button>
      </div>
    </div>
  )
}
