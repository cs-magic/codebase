"use client"

import { TextareaAuto } from "../../packages/common/components/textarea-auto"
import { useConvQuery } from "../hooks/use-conv-query"

export const ConvQuery = () => {
  const query = useConvQuery()

  return (
    <TextareaAuto
      autoFocus
      minRows={2}
      className={"w-full rounded-lg border p-2"}
      onQuery={query}
    />
  )
}
