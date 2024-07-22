"use client"

import { userImageAtom, userNameAtom } from "@cs-magic/store"
import { Button, Label } from "@cs-magic/ui"
import { useAtom } from "jotai"
import { UserInputAvatar } from "./user-input-avatar"
import { UserInputName } from "./user-input-name"

export const AuthUpdateProfile = () => {
  const [name] = useAtom(userNameAtom)
  const [image] = useAtom(userImageAtom)
  // const updateProfile = useUserUpdateProfile()

  return (
    <div className={"flex w-full flex-col items-center gap-4"}>
      <Label className={"text-semibold text-lg"}>只差最后一步啦！</Label>
      <div
        className={
          "flex flex-col items-center gap-4 text-xs text-muted-foreground"
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
            // const res = await updateProfile()
            // if (res?.ok) {
            //   toast.success("登录成功")
            // } else {
            //   // e.g. 表里的记录被删了
            //   toast.error("登录失败，请重试！")
            //   void signOut()
            // }
          }}
        >
          敬启 AI 世界
        </Button>
      </div>
    </div>
  )
}
