import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import type * as PUPPET from "wechaty-puppet";
import type { EventPayload } from "./event.js";
declare const _default: (puppet: PUPPET.Puppet, message: PadLocal.Message.AsObject) => Promise<EventPayload>;
export default _default;
