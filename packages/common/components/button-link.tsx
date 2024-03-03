import { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "../lib/utils"
import { buttonVariants } from "./ui/button"

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
