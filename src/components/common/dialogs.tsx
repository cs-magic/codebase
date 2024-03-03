"use client"

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { LoaderIcon } from "lucide-react"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import {
  uiAlertDialogContent,
  uiAlertDialogOpen,
  uiLoadingAlertDialogAtom,
} from "@/store/ui.atom"

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
