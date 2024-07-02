import { xmlToJson } from "../utils/xml-to-json.js";
export async function parseAppmsgMessagePayload(messageContent) {
    const appMsgXml = await xmlToJson(messageContent);
    const { title, des, url, thumburl, type, md5, recorditem } = appMsgXml.msg.appmsg;
    let appattach;
    const tmp = appMsgXml.msg.appmsg.appattach;
    if (tmp) {
        appattach = {
            aeskey: tmp.aeskey,
            attachid: tmp.attachid,
            cdnattachurl: tmp.cdnattachurl,
            cdnthumbaeskey: tmp.cdnthumbaeskey,
            emoticonmd5: tmp.emoticonmd5,
            encryver: (tmp.encryver && parseInt(tmp.encryver, 10)) || 0,
            fileext: tmp.fileext,
            islargefilemsg: (tmp.islargefilemsg && parseInt(tmp.islargefilemsg, 10)) || 0,
            totallen: (tmp.totallen && parseInt(tmp.totallen, 10)) || 0,
        };
    }
    return {
        appattach,
        des,
        md5,
        recorditem,
        refermsg: appMsgXml.msg.appmsg.refermsg,
        thumburl,
        title,
        type: parseInt(type, 10),
        url,
    };
}
