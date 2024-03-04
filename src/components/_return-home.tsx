"use client"
import Link from "next/link"
import { Button } from "../../packages/common/components/ui/button"
import React from "react"
import { ContentAlertDialog } from "../../packages/common/components/content-alert-dialog"
import { useAtom } from "jotai"
import { uiAlertDialogContent } from "../../packages/common/store/ui"

export const ReturnHomeAlertDialog = ({ content }: { content?: string }) => {
  const [dynamicContent] = useAtom(uiAlertDialogContent)

  return (
    <ContentAlertDialog>
      <div
        className={
          "w-full h-full flex flex-col items-center justify-center gap-8"
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
