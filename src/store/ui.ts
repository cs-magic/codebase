import { proxy } from "valtio"
import { BEST_VIEWPOINT } from "@/config/system"
import { conversationStore } from "@/store/conversation"

export const uiState = proxy<{
  mainArea: {
    width: number
    height: number
  }
  loading: boolean
  selectPAppsOpen: boolean
  selectPAppsOnOpenChange: (v: boolean) => void

  // compute
  maxToAdd: number
  gridCols: number
}>({
  mainArea: {
    width: 0,
    height: 0,
  },
  loading: false,
  selectPAppsOpen: false,
  selectPAppsOnOpenChange: (v) => {
    uiState.selectPAppsOpen = v
  },

  get maxToAdd() {
    return Math.max(
      Math.floor(
        (this.mainArea.height * this.mainArea.width) /
          BEST_VIEWPOINT /
          BEST_VIEWPOINT /
          2,
      ),
      2, // se: 375x667
    )
  },

  get gridCols() {
    return Math.min(
      Math.floor(this.mainArea.width / BEST_VIEWPOINT),
      conversationStore.pApps.length,
    )
  },
})

export const openSelectPApps = () => uiState.selectPAppsOnOpenChange(true)
