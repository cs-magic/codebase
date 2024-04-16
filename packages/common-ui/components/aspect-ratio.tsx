import { HTMLAttributes } from "react"
import { useMeasure } from "react-use"
import { cn } from "../../common-ui-shadcn/utils"

export const VerticalAspectRatio = ({
  ratio,
  className,
  style,
  ...props
}: { ratio: number } & HTMLAttributes<HTMLDivElement>) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <div
      className={cn("h-full", className)}
      style={{ width: height / ratio, ...style }}
      ref={ref}
      {...props}
    />
  )
}
