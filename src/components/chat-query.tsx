"use client"

import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import { useConvQueryOnEnter } from "@/hooks/use-conv-query-on-enter"

export const ChatQuery = () => {
  const query = useConvQueryOnEnter()

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
