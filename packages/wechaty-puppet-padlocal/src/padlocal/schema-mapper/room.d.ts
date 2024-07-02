import PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type * as PUPPET from "wechaty-puppet";
export declare function padLocalRoomToWechaty(contact: PadLocal.Contact.AsObject): PUPPET.payloads.Room;
export declare function padLocalRoomMemberToWechaty(chatRoomMember: PadLocal.ChatRoomMember.AsObject): PUPPET.payloads.RoomMember;
export declare function chatRoomMemberToContact(chatRoomMember: PadLocal.ChatRoomMember): PadLocal.Contact;
