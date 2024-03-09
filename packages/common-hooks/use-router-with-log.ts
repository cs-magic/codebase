import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"

export const useRouterWithLog = () => {
  const router = useRouter()

  const replace = router.replace.bind(router)
  router.replace = (...args) => {
    console.log(
      ansiColors.red(`router.replace: ${location.href} --> ${args[0]}`),
    )
    return replace(...args)
  }

  const push = router.push.bind(router)
  router.push = (...args) => {
    console.log(ansiColors.red(`router.push: ${location.href} --> ${args[0]}`))
    return push(...args)
  }

  return { ...router, replace, push }
}
