import { Message } from "wechaty";
import { LlmScenario } from "../schema/bot.utils";
/**
 * 展示用户信息，与它的调用量
 *
 * @param message
 * @param type
 */
export declare const formatTalkerFromMessage: (message: Message, type?: LlmScenario) => Promise<string>;
