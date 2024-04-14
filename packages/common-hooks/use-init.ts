import { useEffect, useState } from "react"

export const useInit = <T = any>(f: () => T) => {
  const [v, setV] = useState<T | null>(null)

  useEffect(() => {
    const v = f()
    setV(v)
  }, [])

  return v
}
