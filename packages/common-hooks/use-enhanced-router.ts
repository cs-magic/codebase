import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * 充分性：增强router，例如打印一些追踪信息
 * 必要性：router的跳转对程序尤其是状态管理的影响很大，所以需要充分重视
 */
export const useEnhancedRouter = () => {
  // enhance approach, ref: https://chat.openai.com/c/8d06eded-086d-4771-b004-307974620ef0
  const [enhanced, setEnhanced] = useState(false)

  const router = useRouter()

  /**
   * 打印log
   */
  const addLog = () => {
    const replace = router.replace.bind(router)
    router.replace = (...args) => {
      console.log(
        ansiColors.red(`router.replace: ${location.href} --> ${args[0]}`),
      )
      return replace(...args)
    }

    const push = router.push.bind(router)
    router.push = (...args) => {
      console.log(
        ansiColors.red(`router.push: ${location.href} --> ${args[0]}`),
      )
      return push(...args)
    }
  }

  useEffect(() => {
    if (enhanced) return

    setEnhanced(true)

    addLog()
  }, [enhanced])
}
