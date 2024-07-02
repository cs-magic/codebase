import type PadLocal from "padlocal-client-ts/dist/proto/padlocal_pb.js";
import * as PUPPET from "wechaty-puppet";
export declare function padLocalContactToWechaty(contact: PadLocal.Contact.AsObject): PUPPET.payloads.Contact;
