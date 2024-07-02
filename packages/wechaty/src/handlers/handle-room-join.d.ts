import { Contact, Room, Wechaty } from "wechaty";
/**
 * 小群邀请自己也会触发该 hook
 *
 * @param bot
 * @param room
 * @param inviteeList
 * @param inviter
 * @param date
 */
export declare const handleRoomJoin: (bot: Wechaty, room: Room, inviteeList: Contact[], inviter: Contact, date: Date | undefined) => Promise<void>;
