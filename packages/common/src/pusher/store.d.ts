import Pusher from "pusher";
import PusherJS from "pusher-js";
export declare const pusherServerAtom: import("jotai").PrimitiveAtom<Pusher | null> & {
    init: Pusher | null;
};
export declare const pusherClientAtom: import("jotai").PrimitiveAtom<PusherJS | null> & {
    init: PusherJS | null;
};
export declare const pusherServerIdAtom: import("jotai").WritableAtom<PusherServerId, [any], void>;
export declare const pusherStateAtom: import("jotai").PrimitiveAtom<PusherConnectionState> & {
    init: PusherConnectionState;
};
export declare const pusherLastPingTimeAtom: import("jotai").PrimitiveAtom<number | null> & {
    init: number | null;
};
export declare const pusherLastPongTimeAtom: import("jotai").PrimitiveAtom<number | null> & {
    init: number | null;
};
export declare const pusherLatencyAtom: import("jotai").PrimitiveAtom<number> & {
    init: number;
};
export declare const pusherLatenciesAtom: import("jotai").PrimitiveAtom<FixedArray<number>> & {
    init: FixedArray<number>;
};
export declare const pusherLogLevelAtom: import("jotai").WritableAtom<LogLevel, [any], void>;
export declare const cleanPusherAtom: import("jotai").WritableAtom<null, [], void> & {
    init: null;
};
export declare const pusherLogAtom: import("jotai").Atom<{
    lastPingTime: number | null;
    lastPongTime: number | null;
    latency: number;
    latencies: FixedArray<number>;
}>;
