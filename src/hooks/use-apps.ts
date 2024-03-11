import { useAtom } from "jotai"
import { useSnapshot } from "valtio"
import { api } from "../../packages/common-trpc/react"
import { IAppClient } from "../schema/app.detail"
import { coreStore } from "../store/core.valtio"
import { appsPlaceholderCountAtom } from "../store/system.atom"
import { forkApp } from "../utils"

export const useServerApps = (): IAppClient[] => {
  const { data: serverApps = [] } = api.core.listApps.useQuery()
  return serverApps.map((a) => forkApp(a, undefined))
}
export const useApps = () => {
  const { apps } = useSnapshot(coreStore)
  const serverApps = useServerApps()

  const [n] = useAtom(appsPlaceholderCountAtom)

  return apps.length ? apps : serverApps.slice(0, n)
}
