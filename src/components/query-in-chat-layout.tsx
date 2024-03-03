"use client"

import { useQueryOnEnter } from "@/hooks/use-query-conv"
import { TextareaAuto } from "../../packages/common/components/textarea-auto"

export const QueryInChatLayout = () => {
  const query = useQueryOnEnter()

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
