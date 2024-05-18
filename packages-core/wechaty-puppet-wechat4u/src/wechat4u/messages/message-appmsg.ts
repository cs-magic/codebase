/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type {
  AppAttachPayload,
  AppMessagePayload,
  AppMsgXmlSchema,
  ChannelsMsgPayload,
  MiniAppMsgPayload,
} from "../../../../wechaty-puppet/types/message"
import { xmlToJson } from "../utils/xml-to-json.js"

export async function parseAppmsgMessagePayload(
  messageContent: string,
): Promise<AppMessagePayload> {
  const appMsgXml: AppMsgXmlSchema = await xmlToJson(messageContent)
  const { title, des, url, thumburl, type, md5, recorditem } =
    appMsgXml.msg.appmsg

  let appattach: AppAttachPayload | undefined
  let channel: ChannelsMsgPayload | undefined
  let miniApp: MiniAppMsgPayload | undefined
  const tmp = appMsgXml.msg.appmsg.appattach
  const channeltmp = appMsgXml.msg.appmsg.finderFeed
  const minitmp = appMsgXml.msg.appmsg.weappinfo
  if (tmp) {
    appattach = {
      aeskey: tmp.aeskey,
      attachid: tmp.attachid,
      cdnattachurl: tmp.cdnattachurl,
      cdnthumbaeskey: tmp.cdnthumbaeskey,
      emoticonmd5: tmp.emoticonmd5,
      encryver: (tmp.encryver && parseInt(tmp.encryver, 10)) || 0,
      fileext: tmp.fileext,
      islargefilemsg:
        (tmp.islargefilemsg && parseInt(tmp.islargefilemsg, 10)) || 0,
      totallen: (tmp.totallen && parseInt(tmp.totallen, 10)) || 0,
    }
  }
  if (channeltmp) {
    channel = {
      authIconType: channeltmp.authIconType,
      authIconUrl: channeltmp.authIconUrl,
      avatar: channeltmp.avatar,
      desc: channeltmp.desc,
      feedType: channeltmp.feedType,
      liveId: channeltmp.liveId,
      mediaCount: channeltmp.mediaCount,
      nickname: channeltmp.nickname,
      objectId: channeltmp.objectId,
      objectNonceId: channeltmp.objectNonceId,
      username: channeltmp.username,
    }
  }
  if (minitmp) {
    miniApp = {
      appid: minitmp.appid,
      pagepath: minitmp.pagepath,
      shareId: minitmp.shareId,
      username: minitmp.username,
      weappiconurl: minitmp.weappiconurl,
    }
  }

  return {
    appattach,
    channel,
    des,
    md5,
    miniApp,
    recorditem,
    refermsg: appMsgXml.msg.appmsg.refermsg,
    thumburl,
    title,
    type: parseInt(type, 10),
    url,
  }
}
