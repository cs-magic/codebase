"use client"

import { useAtom } from "jotai"
import { uiCheckAuthAlertDialogOpenAtom } from "../../packages/common/store/user"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../packages/common/components/ui/alert-dialog"
import { signIn } from "next-auth/react"

export const CheckAuthAlertDialog = () => {
  const [open, setOpen] = useAtom(uiCheckAuthAlertDialogOpenAtom)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>发送失败</AlertDialogTitle>
        <AlertDialogDescription>
          您需要先登陆才能发送哦！
        </AlertDialogDescription>
        <AlertDialogFooter className={"gap-4"}>
          <AlertDialogAction onClick={() => signIn()}>
            点击跳转登录
          </AlertDialogAction>
          <AlertDialogCancel>放弃</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
