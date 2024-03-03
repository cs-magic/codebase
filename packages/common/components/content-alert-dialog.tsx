"use client"
import { useAtom } from "jotai"
import { uiAlertDialogContent, uiAlertDialogOpen } from "@/store/ui.atom"
import {
  AlertDialog,
  AlertDialogContent,
} from "./ui/alert-dialog"
import { ReturnHomeAlertDialog } from "@/components/return-home"
import React from "react"

export const ContentAlertDialog = () => {
  const [open, setOpen] = useAtom(uiAlertDialogOpen)
  const [content] = useAtom(uiAlertDialogContent)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        onClick={() => {
          setOpen(false)
        }}
      >
        <ReturnHomeAlertDialog content={content} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
