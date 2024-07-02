import PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
export function padLocalRoomToWechaty(contact) {
    return {
        adminIdList: [],
        avatar: contact.avatar,
        id: contact.username,
        memberIdList: contact.chatroommemberList.map((member) => member.username),
        ownerId: contact.chatroomownerusername,
        topic: contact.nickname,
    };
}
export function padLocalRoomMemberToWechaty(chatRoomMember) {
    return {
        avatar: chatRoomMember.avatar,
        id: chatRoomMember.username,
        inviterId: chatRoomMember.inviterusername,
        name: chatRoomMember.nickname,
        roomAlias: chatRoomMember.displayname,
    };
}
export function chatRoomMemberToContact(chatRoomMember) {
    return new PadLocal.Contact()
        .setUsername(chatRoomMember.getUsername())
        .setNickname(chatRoomMember.getNickname())
        .setAvatar(chatRoomMember.getAvatar())
        .setStranger(true);
}
