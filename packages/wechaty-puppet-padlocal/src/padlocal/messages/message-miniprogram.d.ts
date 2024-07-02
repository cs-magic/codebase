import type * as PUPPET from "wechaty-puppet";
import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
export declare function parseMiniProgramMessagePayload(rawPayload: PadLocal.Message.AsObject): Promise<PUPPET.payloads.MiniProgram>;
