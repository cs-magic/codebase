import { useAtom } from "jotai"
import { useEffect } from "react"
import { api } from "../../packages/common-trpc/react"
import { uiScreenAtom } from "../../packages/common-ui/store"
import { coreStore } from "../store/core.valtio"
import { appsPlaceholderCountAtom } from "../store/system.atom"
import { app2response } from "../utils"
import { toast } from "sonner"

export const useInitServerApps = () => {
  const { data: serverApps = [] } = api.core.listApps.useQuery()
  const [{ width }] = useAtom(uiScreenAtom)
  const [n] = useAtom(appsPlaceholderCountAtom)

  // toast.info(width)

  useEffect(() => {
    coreStore._serverChats = serverApps
      // iPhone13: 397; tailwindcss screen sm: 640
      .slice(0, width > 640 ? n : 1)
      .map(app2response)
  }, [serverApps])

  return serverApps
}
