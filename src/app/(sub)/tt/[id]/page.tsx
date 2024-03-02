"use client"
import { PAppsComp } from "@/components/p-apps"
import { conversationStore } from "@/store/conversation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib/trpc/react"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [open, setOpen] = useState(false)
  const { isSuccess, isError } = api.llm.getConversation.useQuery({
    conversationId: id,
  })
  useEffect(() => {
    if (isSuccess) conversationStore.currentConversationId = id
    if (isError) setOpen(true)
  }, [isSuccess, isError])

  // console.log({ isSuccess, isError })

  return (
    <>
      <PAppsComp />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <div
            className={
              "w-full h-full flex flex-col items-center justify-center gap-8"
            }
          >
            <h2>没有找到该会话！(</h2>
            <Link href="/tt">
              <Button>返回会话首页</Button>
            </Link>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
