import { Message } from "wechaty";
/**
 * 【标准化信息流 @bryan-infra-01】
 * - 将任意类型的 message 转化为适合飞脑解析、读取的格式
 *
 * @param message
 */
export declare const transformMessage: (message: Message) => Promise<void>;
