"use client"

import { toast } from "sonner"
import { useSnapshot } from "valtio"
import { TextareaAuto } from "../../packages/common-ui/components/textarea-auto"
import { useConvQuery } from "../hooks/use-conv-query"
import { useSoftKeyboardOn } from "../hooks/use-soft-keyboard-on"
import { coreStore } from "../store/core.valtio"

export const ConvQuery = () => {
  const query = useConvQuery()
  const { chat } = useSnapshot(coreStore)

  const isSoftKeyboardOn = useSoftKeyboardOn()

  // 不要软键盘发送 Done
  // useEffect(() => {
  //   if (isSoftKeyboardOn) return
  //   void query()
  // }, [isSoftKeyboardOn])

  return (
    <div className={"flex flex-col gap-1"}>
      <TextareaAuto
        onSubmit={(event) => {
          toast.info("onSubmit")
        }}
        inputMode={"search"}
        autoFocus
        minRows={1}
        maxRows={6}
        className={"w-full rounded-lg border p-2"}
        onQuery={query}
      />
    </div>
  )
}
