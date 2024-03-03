import { conversationStore } from "@/store/conv.valtio"
import { IAppInChat } from "@/schema/app"

export const resetPAppSSE = (pAppId: string) => {
  const pApp = conversationStore.apps.find((p) => p.id === pAppId)
  if (pApp) pApp.needFetchLLM = false
}
