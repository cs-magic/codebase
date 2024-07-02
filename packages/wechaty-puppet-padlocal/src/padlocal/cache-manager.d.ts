import type * as PUPPET from "wechaty-puppet";
import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
export type RoomMemberMap = {
    [contactId: string]: PadLocal.ChatRoomMember.AsObject;
};
export declare class CacheManager {
    private readonly _userName;
    private _messageCache?;
    private _messageRevokeCache?;
    private _contactCache?;
    private _contactSearchCache?;
    private _contactStrangerAliasCache?;
    private _roomCache?;
    private _roomMemberCache?;
    private _roomInvitationCache?;
    private _friendshipCache?;
    private _labelList?;
    constructor(userName: string);
    init(): Promise<void>;
    close(): Promise<void>;
    /**
     * -------------------------------
     * Message Section
     * --------------------------------
     */
    getMessage(messageId: string): Promise<PadLocal.Message.AsObject | undefined>;
    setMessage(messageId: string, payload: PadLocal.Message.AsObject): Promise<void>;
    hasMessage(messageId: string): Promise<boolean>;
    getMessageRevokeInfo(messageId: string): Promise<PadLocal.MessageRevokeInfo.AsObject | undefined>;
    setMessageRevokeInfo(messageId: string, messageSendResult: PadLocal.MessageRevokeInfo.AsObject): Promise<void>;
    /**
     * -------------------------------
     * Contact Section
     * --------------------------------
     */
    getContact(contactId: string): Promise<PadLocal.Contact.AsObject | undefined>;
    setContact(contactId: string, payload: PadLocal.Contact.AsObject): Promise<void>;
    deleteContact(contactId: string): Promise<void>;
    getContactIds(): Promise<string[]>;
    getAllContacts(): Promise<PadLocal.Contact.AsObject[]>;
    hasContact(contactId: string): Promise<boolean>;
    getContactCount(): Promise<number>;
    /**
     * contact search
     */
    getContactSearch(id: string): Promise<PadLocal.SearchContactResponse.AsObject | undefined>;
    setContactSearch(id: string, payload: PadLocal.SearchContactResponse.AsObject): Promise<void>;
    hasContactSearch(id: string): Promise<boolean>;
    getContactStrangerAlias(encryptedUserName: string): Promise<string | undefined>;
    setContactStrangerAlias(encryptedUserName: string, alias: string): Promise<void>;
    deleteContactStrangerAlias(encryptedUserName: string): Promise<void>;
    /**
     * -------------------------------
     * Room Section
     * --------------------------------
     */
    getRoom(roomId: string): Promise<PadLocal.Contact.AsObject | undefined>;
    setRoom(roomId: string, payload: PadLocal.Contact.AsObject): Promise<void>;
    deleteRoom(roomId: string): Promise<void>;
    getRoomIds(): Promise<string[]>;
    getRoomCount(): Promise<number>;
    hasRoom(roomId: string): Promise<boolean>;
    /**
     * -------------------------------
     * Room Member Section
     * --------------------------------
     */
    getRoomMember(roomId: string): Promise<RoomMemberMap | undefined>;
    setRoomMember(roomId: string, payload: RoomMemberMap): Promise<void>;
    deleteRoomMember(roomId: string): Promise<void>;
    /**
     * -------------------------------
     * Room Invitation Section
     * -------------------------------
     */
    getRoomInvitation(messageId: string): Promise<PUPPET.payloads.RoomInvitation | undefined>;
    setRoomInvitation(messageId: string, payload: PUPPET.payloads.RoomInvitation): Promise<void>;
    deleteRoomInvitation(messageId: string): Promise<void>;
    /**
     * -------------------------------
     * Friendship Cache Section
     * --------------------------------
     */
    getFriendshipRawPayload(id: string): Promise<PUPPET.payloads.Friendship | undefined>;
    setFriendshipRawPayload(id: string, payload: PUPPET.payloads.Friendship): Promise<void>;
    getLabelList(): PadLocal.Label[] | undefined;
    setLabelList(labelList: PadLocal.Label[]): void;
}
