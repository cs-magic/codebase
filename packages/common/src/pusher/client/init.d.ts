import PusherJS from "pusher-js";
export declare const initPusherClient: (config: IPusherServerConfig, options?: {
    onPing?: () => void;
    onPong?: () => void;
    onInit?: (client: PusherJS) => void;
}) => PusherJS;
