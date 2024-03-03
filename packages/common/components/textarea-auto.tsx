"use client"

import { ComponentProps, forwardRef } from "react"
import ReactTextareaAutoSize from "react-textarea-autosize"
import { useMounted } from "../hooks/use-mounted"
import { cn } from "../lib/utils"
import { useAtom } from "jotai"

import { userPromptAtom } from "../store/user"
import { convIdAtom } from "@/store/conv.atom"

export const TextareaAuto = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof ReactTextareaAutoSize> & {
    onQuery?: (s: string) => void
  }
>(({ className, minRows = 1, onKeyDown, onChange, onQuery, ...props }, ref) => {
  const mounted = useMounted()
  // avoid layout shift
  const rows = !mounted ? minRows : undefined
  const [, setUserQuery] = useAtom(userPromptAtom)
  const [convId] = useAtom(convIdAtom)

  return (
    <ReactTextareaAutoSize
      rows={rows}
      minRows={minRows}
      maxRows={8}
      ref={ref}
      cacheMeasurements
      className={cn(
        "block", // 不加这个会导致高度超标
        "resize-none focus-visible:outline-none bg-transparent",
        className,
      )}
      onChange={(event) => {
        // 更新用户的输入
        const value = event.currentTarget.value
        setUserQuery(value)
        console.log({ convId, value })
        if (onChange) onChange(event)
      }}
      onKeyDown={(event) => {
        if (onKeyDown) return onKeyDown(event)
        if (onQuery) {
          if (event.key === "Enter" && !event.nativeEvent.isComposing) {
            event.preventDefault()
            const value = event.currentTarget.value
            if (!value) return
            onQuery(value)
          }
        }
      }}
      {...props}
    />
  )
})
TextareaAuto.displayName = "TextareaAuto"
