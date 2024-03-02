"use client"
import { Textarea } from "@/components/common/textarea"

import { useQuery } from "@/store/use-query"

export const QueryInChatLayout = () => {
  const query = useQuery()

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
