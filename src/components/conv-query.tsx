"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { TextareaAuto } from "../../packages/common-ui/components/textarea-auto"
import { useConvQuery } from "../hooks/use-conv-query"
import { useSoftKeyboardOn } from "../hooks/use-soft-keyboard-on"

export const ConvQuery = () => {
  const query = useConvQuery()

  const isSoftKeyboardOn = useSoftKeyboardOn()

  // 不要软键盘发送 Done
  // useEffect(() => {
  //   if (isSoftKeyboardOn) return
  //   void query()
  // }, [isSoftKeyboardOn])

  return (
    <TextareaAuto
      onSubmit={(event) => {
        toast.info("onSubmit")
      }}
      inputMode={"search"}
      autoFocus
      minRows={2}
      className={"w-full rounded-lg border p-2"}
      onQuery={query}
    />
  )
}
