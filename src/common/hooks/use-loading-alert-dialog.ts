import { useAtom } from "jotai/index"
import { uiLoadingAlertDialogAtom } from "@/common/store/ui"

export const useLoadingAlertDialog = () => {
  const [loading, setLoading] = useAtom(uiLoadingAlertDialogAtom)

  const lock = () => setLoading(true)
  const unlock = () => setLoading(false)
  return { lock, unlock, loading }
}
