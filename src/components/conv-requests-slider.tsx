"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "packages/common/lib/utils"
import { useAtom } from "jotai"
import { requestSliderAtom } from "@/store/conv"

const ConvRequestsSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [{ current, total }, actions] = useAtom(requestSliderAtom)
  const { inc, dec, setN } = actions()

  return (
    <div className={"w-full flex items-center gap-2 text-muted-foreground"}>
      <SliderPrimitive.Root
        min={1}
        max={total}
        value={[current + 1]}
        onValueChange={(vs) => setN(vs[0]! - 1)}
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
        ({current + 1} / {total})
      </div>
    </div>
  )
})
ConvRequestsSlider.displayName = SliderPrimitive.Root.displayName

export { ConvRequestsSlider }
