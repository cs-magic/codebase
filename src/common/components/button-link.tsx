import { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "@/common/lib/utils"
import { buttonVariants } from "@/common/components/ui/button"

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
