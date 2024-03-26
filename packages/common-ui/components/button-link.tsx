import { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "../../common-ui-shadcn/utils"
import { buttonVariants } from "../../common-ui-shadcn/components/button"

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
