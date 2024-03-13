"use client"

import { LoaderIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
} from "../shadcn/shadcn-components/alert-dialog"
import { uiLoadingAlertDialogAtom } from "../store"
import { useAtom } from "jotai"

export const LoadingTooltip = () => (
  <div className={"flex justify-center my-8"}>
    <LoaderIcon className={"animate-spin"} />
  </div>
)

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom)
  // console.log("LoadingAlertDialog: ", { loading })

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
