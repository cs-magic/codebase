"use client"
import { useAtom } from "jotai"
import { uiLoadingAlertDialogAtom } from "../store/ui"
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import React from "react"

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom)
  console.log("LoadingAlertDialog: ", { loading })

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
