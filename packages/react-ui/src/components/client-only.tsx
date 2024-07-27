"use client"

import { HTMLAttributes, useEffect, useState } from "react"

export function ClientOnly({ children }: HTMLAttributes<HTMLDivElement>) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}
