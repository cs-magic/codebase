import Link from "next/link"
import { ComponentProps } from "react"

import { cn } from "../utils.js"
import { buttonVariants } from "./shadcn/ui/button.jsx"
import React from "react"

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
