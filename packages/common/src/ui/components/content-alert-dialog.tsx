"use client"
import { useAtom } from "jotai"
import React, { PropsWithChildren } from "react"
import {
  AlertDialog,
  AlertDialogContent,
} from "../../ui-shadcn/components/ui/alert-dialog.jsx"
import { uiAlertDialogOpen } from "../store.js"

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
