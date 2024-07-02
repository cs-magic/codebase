import { RoomInvitation, Wechaty } from "wechaty";
/**
 * 只有在邀请需要确认时才会触发，小群不会触发 room-invite，但在接受后会触发 room-join
 *
 * @param bot
 * @param roomInvitation
 */
export declare const handleRoomInvite: (bot: Wechaty, roomInvitation: RoomInvitation) => Promise<void>;
