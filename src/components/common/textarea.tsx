"use client"

import { cn } from "@/lib/utils"
import { ComponentProps, forwardRef } from "react"

import TextareaAutoSize from "react-textarea-autosize"
import { useMounted } from "@/hooks/use-mounted"

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaAutoSize> & { onQuery?: (s: string) => void }
>(({ className, minRows = 1, onKeyDown, onQuery, ...props }, ref) => {
  const mounted = useMounted()
  // avoid layout shift
  const rows = !mounted ? minRows : undefined

  return (
    <TextareaAutoSize
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
Textarea.displayName = "TextareaAuto"
