"use server";
import { initPusherServer } from "./init";
import { pusherServerConfigs } from "../config";
export const pusherSend = async (serverId, channel, eventType, data) => {
    console.log("[socket-server] sending: ", { eventType, data });
    await initPusherServer(pusherServerConfigs[serverId]).trigger(channel, eventType, data);
};
