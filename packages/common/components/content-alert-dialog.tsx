"use client"
import { useAtom } from "jotai"
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog"
import React, { PropsWithChildren } from "react"
import { uiAlertDialogOpen } from "../store/ui"

export const ContentAlertDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useAtom(uiAlertDialogOpen)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        onClick={() => {
          setOpen(false)
        }}
      >
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}
