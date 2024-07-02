import * as PUPPET from "wechaty-puppet";
import { isContactOfficialId } from "../utils/is-type.js";
export function padLocalContactToWechaty(contact) {
    return {
        alias: contact.remark,
        avatar: contact.avatar,
        city: contact.city,
        friend: !contact.stranger,
        gender: contact.gender,
        id: contact.username,
        name: contact.nickname,
        phone: contact.phoneList,
        province: contact.province,
        signature: contact.signature,
        type: isContactOfficialId(contact.username) ? PUPPET.types.Contact.Official : PUPPET.types.Contact.Individual,
        weixin: contact.alias,
    };
}
