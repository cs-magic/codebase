"use client"

import { useAtom } from "jotai"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../packages/common-ui/shadcn/shadcn-components/alert-dialog"
import { signIn } from "next-auth/react"

import { checkAuthAlertDialogOpenAtom } from "../store/ui.atom"

export const CheckAuthAlertDialog = () => {
  const [open, setOpen] = useAtom(checkAuthAlertDialogOpenAtom)

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
