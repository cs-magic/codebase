"use client"
import { Textarea } from "@/components/textarea"
import { conversationStore } from "@/store/conversation"

export const QueryInChatLayout = () => {
  const query = conversationStore.useQuery()

  return (
    <div className={"p-2 flex justify-center shrink-0"}>
      <Textarea
        minRows={2}
        className={"rounded-lg border  w-full max-w-[720px] p-2 "}
        onQuery={query}
      />
    </div>
  )
}
