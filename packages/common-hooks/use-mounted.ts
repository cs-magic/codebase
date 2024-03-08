import { useEffect, useState } from "react"

/**
 * 充分性：检测客户端是否已经准备好
 * 必要性：否则会导致一些ssr问题
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}
