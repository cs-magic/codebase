"use client"
import { uiAlertDialogContent } from "@cs-magic/store"
import { ContentAlertDialog } from "@cs-magic/ui"
import { Button } from "@cs-magic/ui"
import Link from "next/link"
import React from "react"
import { useAtom } from "jotai"

export const ReturnHomeAlertDialog = ({ content }: { content?: string }) => {
  const [dynamicContent] = useAtom(uiAlertDialogContent)

  return (
    <ContentAlertDialog>
      <div
        className={
          "flex h-full w-full flex-col items-center justify-center gap-8"
        }
      >
        <h2>{content ?? dynamicContent}</h2>
        <Link href="/">
          <Button>返回 AI 的大家族</Button>
        </Link>
      </div>
    </ContentAlertDialog>
  )
}
