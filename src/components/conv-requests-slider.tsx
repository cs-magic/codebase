"use client"

import { requestsAtom, serverConvDetailAtom } from "@/store/conv"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { useAtom } from "jotai"

import { cn } from "packages/common/lib/utils"
import * as React from "react"
import { devEnabledAtom } from "../../packages/common/store"
import { useRequestSlider } from "../hooks/use-request-slider"
import { useSoftKeyboardOn } from "../hooks/use-soft-keyboard-on"

const ConvRequestsSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [conv] = useAtom(serverConvDetailAtom)
  const [requests] = useAtom(requestsAtom)

  const { min, max, onChange, value } = useRequestSlider()
  const [devEnabled] = useAtom(devEnabledAtom)
  const softKeyboardOn = useSoftKeyboardOn()

  return (
    <div className={"flex w-full flex-col gap-2"}>
      {devEnabled && (
        <div className={"flex items-center gap-2"}>
          <span className={"mr-2"}>
            [{conv?.id} - {conv?.currentRequestId}]
          </span>
          {requests.map((r, i) => `[${i + 1}]${r.id}`).join(", ")}
        </div>
      )}

      {!softKeyboardOn && (
        <div className={"w-full flex items-center gap-2 text-muted-foreground"}>
          <span className={"text-xs"}>时光机：</span>
          <SliderPrimitive.Root
            min={min}
            max={max}
            value={[value]}
            onValueChange={(vs) => onChange(vs[0]!)}
            ref={ref}
            className={cn(
              "grow relative flex touch-none select-none items-center",
              className,
            )}
            {...props}
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-muted" />
            </SliderPrimitive.Track>

            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
          <div className={"shrink-0"}>
            ({value} / {max})
          </div>
        </div>
      )}
    </div>
  )
})
ConvRequestsSlider.displayName = SliderPrimitive.Root.displayName

export { ConvRequestsSlider }
