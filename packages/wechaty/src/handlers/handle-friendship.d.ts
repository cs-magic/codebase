import { Friendship, Wechaty } from "wechaty";
/**
 * 单方面把bot删了后，再添加bot，不会触发 friendship
 *
 * @param bot
 * @param friendship
 */
export declare const handleFriendship: (bot: Wechaty, friendship: Friendship) => Promise<void>;
