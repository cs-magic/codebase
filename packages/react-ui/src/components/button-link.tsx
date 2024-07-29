import Link from "next/link"
import React, { ComponentProps } from "react"

import { cn } from "@cs-magic/common"
import { buttonVariants } from "@/shadcn/ui/button.js"

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
