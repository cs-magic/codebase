import { ComponentProps, useEffect, useRef } from "react"
import { Input } from "@/common/components/ui/input"
import { cn } from "@/common/lib/utils"

export const DigitContainer = ({
  className,
  maxLength,
  focus,
  ...props
}: ComponentProps<typeof Input> & { focus: boolean }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!focus || !ref.current) return

    ref.current.focus()
  }, [focus])

  return (
    <Input
      ref={ref}
      className={cn(
        "w-8 h-8 sm:w-12 sm:h-12 rounded-lg text-xl sm:text-3xl text-center p-0",
        className,
      )}
      maxLength={1}
      {...props}
    />
  )
}
