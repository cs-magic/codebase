import { config } from "@/config/system"
import { loadBotPreference } from "./bot-preference"

export const initBotContext = async () => {
  return {
    name: "小川助手",
    version: config.version,
    startTime: Date.now(),
    preference: await loadBotPreference(),
  }
}
