import React, { HTMLAttributes } from "react"

export function ClientOnly({ children }: HTMLAttributes<HTMLDivElement>) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}
