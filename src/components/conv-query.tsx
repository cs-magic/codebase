"use client"

import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import { useConvQueryOnEnter } from "@/hooks/use-conv-query-on-enter"

export const ConvQuery = () => {
  const query = useConvQueryOnEnter()

  return (
    <TextareaAuto
      minRows={2}
      className={"w-full rounded-lg border"}
      onQuery={query}
    />
  )
}
