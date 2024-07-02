import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type * as PUPPET from "wechaty-puppet";
import type { EventPayload } from "./event.js";
export declare function removeRoomLeaveDebounce(roomId: string, removeeId: string): void;
export declare function isRoomLeaveDebouncing(roomId: string, removeeId: string): boolean;
declare const _default: (puppet: PUPPET.Puppet, message: PadLocal.Message.AsObject) => Promise<EventPayload>;
export default _default;
