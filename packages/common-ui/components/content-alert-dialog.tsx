"use client"
import { useAtom } from "jotai"
import { uiAlertDialogOpen } from "../store"
import {
  AlertDialog,
  AlertDialogContent,
} from "../shadcn/shadcn-components/alert-dialog"
import React, { PropsWithChildren } from "react"

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
