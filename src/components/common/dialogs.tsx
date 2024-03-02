"use client"

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import { uiState } from "@/store/ui"
import { useSnapshot } from "valtio"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export const ContentAlertDialog = () => {
  const {
    alertDialog: { open, content },
  } = useSnapshot(uiState)
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        uiState.alertDialog.open = open
      }}
    >
      <AlertDialogContent
        onClick={() => {
          uiState.alertDialog.open = false
        }}
      >
        <ReturnHomeAlertDialog content={content} />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ReturnHomeAlertDialog = ({ content }: { content: string }) => (
  <div
    className={"w-full h-full flex flex-col items-center justify-center gap-8"}
  >
    <h2>{content}</h2>
    <Link href="/">
      <Button>返回 AI 的大家族</Button>
    </Link>
  </div>
)
