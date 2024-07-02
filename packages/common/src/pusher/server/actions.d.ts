export declare const pusherSend: <T extends PusherEventType>(serverId: PusherServerId, channel: string, eventType: T, data: PusherEventData<T>) => Promise<void>;
