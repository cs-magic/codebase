import Image from "next/image"
import React, { ComponentProps } from "react"

import { cn } from "@cs-magic/common"

export const ImageEqualHeight = ({
  src,
  alt = "",
  width = 320,
  height = 120,
  className,
}: Omit<ComponentProps<typeof Image>, "alt"> & { alt?: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn("h-full w-auto", className)}
      width={width}
      height={height}
    />
  )
}
