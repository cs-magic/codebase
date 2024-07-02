import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import * as PUPPET from "wechaty-puppet";
export declare function padLocalMessageToWechaty(puppet: PUPPET.Puppet, padLocalMessage: PadLocal.Message.AsObject): Promise<PUPPET.payloads.Message>;
