"use client"
import { PAppsComp } from "@/components/p-apps"
import { conversationStore } from "@/store/conversation"
import { useEffect } from "react"
import { api } from "@/lib/trpc/react"
import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { QueryInChatLayout } from "@/components/query-in-chat-layout"
import { useAlertDialog } from "@/hooks/use-alert-dialog"

export default function ConversationPage({
  params: { slug },
}: {
  params: { slug?: string[] }
}) {
  const id = slug ? slug[0] : slug
  const { isError, data: conversation } = api.llm.getConversation.useQuery(
    {
      conversationId: id!,
    },
    { enabled: !!id },
  )

  const openAlertDialog = useAlertDialog()
  useEffect(() => {
    if (conversation) conversationStore.conversation = conversation
    if (isError) openAlertDialog("没有此会话！")
  }, [conversation, isError])

  // console.log({ isSuccess, isError })
  console.log({ slug, id })

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full flex flex-col "}>
        <PAppsComp />

        <QueryInChatLayout />
      </div>
    </div>
  )
}
