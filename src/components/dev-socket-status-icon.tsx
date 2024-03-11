import { cn } from "../../packages/common-ui/shadcn/utils"
import { SVGProps } from "react"

/**
 * ref: https://lucide.dev/icons/bar-chart
 * @param level
 * @constructor
 */
export const DevSocketStatusIcon = ({
  level,
  className,
  ...props
}: { level: number } & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-bar-chart", className)}
      {...props}
    >
      <line
        x1="6"
        x2="6"
        y1="20"
        y2="16"
        className={cn(level >= 1 ? "text-green-500" : "text-destructive")}
      />
      <line
        x1="12"
        x2="12"
        y1="20"
        y2="10"
        className={cn(level >= 2 ? "text-green-500" : "text-destructive")}
      />
      <line
        x1="18"
        x2="18"
        y1="20"
        y2="4"
        className={cn(level >= 3 ? "text-green-500" : "text-destructive")}
      />
    </svg>
  )
}
