import { Message } from "wechaty";
/**
 * 存储信息
 * 并用于后续的读取
 *
 * @param message
 */
export declare const storageMessage: (message: Message) => Promise<void>;
