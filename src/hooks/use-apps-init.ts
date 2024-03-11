import { useAtom } from "jotai"
import { useEffect } from "react"
import { api } from "../../packages/common-trpc/react"
import { coreStore } from "../store/core.valtio"
import { appsPlaceholderCountAtom } from "../store/system.atom"
import { forkApp } from "../utils"

export const useInitServerApps = () => {
  const { data: serverApps = [] } = api.core.listApps.useQuery()
  const [n] = useAtom(appsPlaceholderCountAtom)

  useEffect(() => {
    coreStore._serverApps = serverApps.slice(0, n).map((a) => forkApp(a))
  }, [serverApps])

  return serverApps
}
