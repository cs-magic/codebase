import { useAtom } from "jotai/index"
import { uiLoadingAlertDialogAtom } from "@/common/store/ui"
import {
  AlertDialog,
  AlertDialogContent,
} from "@/common/components/ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import React from "react"

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom)

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent
        className={
          "flex items-center justify-center bg-transparent border-none"
        }
      >
        <LoaderIcon className={"animate-spin"} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
