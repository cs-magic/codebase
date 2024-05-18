import type { AppAttachPayload, AppMessagePayload } from "../../../../wechaty-puppet/src/extra/message";
import { xmlToJson } from "../utils/xml-to-json.js";

interface AppMsgXmlSchema {
  msg: {
    appmsg: {
      title: string;
      des: string;
      type: string;
      url: string;
      appattach: {
        totallen: string;
        attachid: string;
        emoticonmd5: string;
        fileext: string;
        cdnattachurl: string;
        cdnthumbaeskey: string;
        aeskey: string;
        encryver: string;
        islargefilemsg: string;
      };
      thumburl: string;
      md5: any;
      recorditem?: string;
      refermsg?: {
        type: string;
        svrid: string;
        fromusr: string;
        chatusr: string;
        displayname: string;
        content: string;
      };
    };
    fromusername: string;
    appinfo: {
      appname: any;
    };
  };
}

export async function parseAppmsgMessagePayload(messageContent: string): Promise<AppMessagePayload> {
  const appMsgXml: AppMsgXmlSchema = await xmlToJson(messageContent);
  const { title, des, url, thumburl, type, md5, recorditem } = appMsgXml.msg.appmsg;

  let appattach: AppAttachPayload | undefined;
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
