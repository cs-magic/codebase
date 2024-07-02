"use client";
import PusherJS from "pusher-js";
import { getEnv } from "../../env";
const env = getEnv();
export const initPusherClient = (config, options) => {
    const { host: wsHost, port: wsPort, useTLS: forceTLS, cluster } = config;
    /**
     * 由于 pusher 的 ping 没有暴露给客户端
     * 而 ping 的时候一般是走额外的 transporter，而非基于 send_event
     * 所以我们只能在 log 里去 hook ping
     * @param message
     */
    PusherJS.log = (message) => {
        // console.log({ message })
        const exists = (events) => events.some((s) => message.includes(s));
        if (exists(["pusher:ping", "initialized -> connecting"]) && options?.onPing)
            options.onPing();
        if (exists(["pusher:pong", "connecting -> connected"]) && options?.onPong)
            options.onPong();
    };
    console.log("initializing pusher client");
    if (!env.NEXT_PUBLIC_PUSHER_APP_KEY)
        throw new Error("no pusher app key in env");
    const pusherClient = new PusherJS(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster,
        wsHost,
        wsPort,
        // When running the server in SSL mode, you may consider setting the forceTLS client option to true. When this option is set to true, the client will connect to the wss protocol instead of ws:
        forceTLS,
        // ref: https://www.npmjs.com/package/pusher-js#enablestats-boolean
        enableStats: true,
        // Make sure that enabledTransports is set to ['ws', 'wss']. If not set, in case of connection failure, the client will try other transports such as XHR polling, which soketi doesn't support.
        enabledTransports: ["ws", "wss"],
        // 客户端检查服务器的间隔，默认30秒
        activityTimeout: 10000,
        pongTimeout: 10000,
    });
    console.log("binding error...");
    pusherClient.connection.bind("error", function (error) {
        console.error({ error });
    });
    if (options?.onInit)
        options.onInit(pusherClient);
    return pusherClient;
};
