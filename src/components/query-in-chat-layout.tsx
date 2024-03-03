"use client"

import { useConvQuery } from "@/hooks/use-query-conv"
import { TextareaAuto } from "@/common/components/textarea-auto"

export const QueryInChatLayout = () => {
  const query = useConvQuery()

  return (
    <div className={"p-2 flex justify-center shrink-0"}>
      <TextareaAuto
        minRows={2}
        className={"rounded-lg border  w-full max-w-[720px] p-2 "}
        onQuery={query}
      />
    </div>
  )
}
