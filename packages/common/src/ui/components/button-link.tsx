import Link from "next/link"
import { ComponentProps } from "react"
import { buttonVariants } from "../../ui-shadcn/components/ui/button.js"
import { cn } from "../../ui-shadcn/utils.js"

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
