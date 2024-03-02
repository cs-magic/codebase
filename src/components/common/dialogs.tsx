"use client"

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import { uiState } from "@/store/ui"
import { useSnapshot } from "valtio"
import React from "react"

export const LoadingAlertDialog = () => {
  const { loading } = useSnapshot(uiState)

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
