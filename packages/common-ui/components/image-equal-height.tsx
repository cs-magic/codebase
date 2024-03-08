import { ComponentProps } from "react"
import Image from "next/image"
import { cn } from "../shadcn/utils"

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
