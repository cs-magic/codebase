"use client"

import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import { useConvQueryOnEnterV2 } from "../hooks/use-conv-query-on-enter-v2"

export const ConvQuery = () => {
  const query = useConvQueryOnEnterV2()

  return (
    <TextareaAuto
      autoFocus
      minRows={2}
      className={"w-full rounded-lg border p-2"}
      onQuery={query}
    />
  )
}
