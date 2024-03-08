import { useAtom } from "jotai"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "../../packages/common/components/ui/button"
import { Label } from "../../packages/common/components/ui/label"
import { useUserUpdateProfile } from "../../packages/common/hooks/use-user-update-profile"
import { smsImageAtom, smsNameAtom } from "../../packages/common/lib/sms/store"
import { UserInputAvatar } from "./user-input-avatar"
import { UserInputName } from "./user-input-name"

export const SmsStage3UpdateProfile = () => {
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
          onClick={async () => {
            const res = await updateProfile()
            if (res?.ok) {
              toast.success("登录成功")
            } else {
              // e.g. 表里的记录被删了
              toast.error("登录失败，请重试！")
              void signOut()
            }
          }}
        >
          敬启 AI 世界
        </Button>
      </div>
    </div>
  )
}
