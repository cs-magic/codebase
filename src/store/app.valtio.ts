import { conversationStore } from "@/store/conversation.valtio"
import { IQueryConfigInChat } from "@/schema/query-config"

export const resetPAppSSE = (pAppId: string) => {
  const pApp = conversationStore.apps.find((p) => p.id === pAppId)
  if (pApp) pApp.needFetchLLM = false
}
export const selectPApp = (pApp: IQueryConfigInChat) => {
  conversationStore.curPApp = pApp
}
