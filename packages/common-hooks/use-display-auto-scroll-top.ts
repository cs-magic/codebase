import { useEffect } from "react"

/**
 * 充分性：在某些场景（比如键盘弹起导致屏幕高度立即被控制减小）下强制自动滚动到顶部
 * 必要性：否则屏幕的中心位置将被偏移，用户体验差
 */
export const useDisplayAutoScrollTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}
