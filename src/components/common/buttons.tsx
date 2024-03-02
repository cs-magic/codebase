import { Button, buttonVariants } from "@/components/ui/button"
import { ComponentProps } from "react"
import { LoaderIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const ButtonWithLoading = ({
  children,
  disabled,
  loading,
  downtime,
  ...props
}: ComponentProps<typeof Button> & {
  loading?: boolean
  downtime?: number
}) => {
  return (
    <Button
      disabled={disabled ?? loading ?? (downtime ? downtime > 0 : false)}
      {...props}
    >
      {loading ? (
        <LoaderIcon className={"animate-spin"} />
      ) : downtime ? (
        `${downtime} S`
      ) : (
        children
      )}
    </Button>
  )
}

export const ButtonLink = ({
  href,
  className,
  ...props
}: ComponentProps<typeof Link>) => (
  <Link
    href={href}
    className={cn(buttonVariants(), "w-full", className)}
    {...props}
  />
)
