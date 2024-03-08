import * as React from "react"
import { cn } from "../shadcn/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter?: (value: string) => void
}

const InputWithEnter = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onKeyDown, onBlur, onEnter, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // -- shadcn
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          // 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

          // outs
          className,
        )}
        // todo: onBeforeRefresh ?
        onBlur={(event) => {
          const value = event.currentTarget.value
          if (onEnter) onEnter(value)
          if (onBlur) onBlur(event)
        }}
        onKeyDown={(event) => {
          if (
            onEnter &&
            event.key === "Enter" &&
            !event.nativeEvent.isComposing
          ) {
            const value = event.currentTarget.value
            onEnter(value)
          }
          if (onKeyDown) onKeyDown(event)
        }}
        {...props}
      />
    )
  },
)
InputWithEnter.displayName = "InputWithEnter"

export { InputWithEnter }
