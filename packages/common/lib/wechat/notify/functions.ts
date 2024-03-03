"use server"

import { fetchWechatApi } from "../functions"
import { WECHAT_NONCE_STR, WECHAT_TIMESTAMP } from "./config"
import { sha1 } from "js-sha1"
import { WECHAT_APP_ID, WECHAT_APP_SECRET } from "../config"
import { IWechatSDKToken } from "../schema"

/**
 * ref: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export const getWechatToken = async () => {
  return fetchWechatApi<IWechatSDKToken>(
    "get-wechat-sdk-token",
    "/cgi-bin/token",
    {
      grant_type: "client_credential",
      appid: WECHAT_APP_ID,
      secret: WECHAT_APP_SECRET,
    },
  )
}

export const getWechatTicket = async (access_token: string) => {
  return fetchWechatApi<{
    ticket: string
    expires_in: number
    errcode: number
    errmsg: string
  }>("get-jsapi-ticket", "/cgi-bin/ticket/getticket", {
    access_token,
    type: "jsapi",
  })
}

export const getWechatSignature = async (ticket: string, url: string) => {
  const params: Record<string, string | number> = {
    noncestr: WECHAT_NONCE_STR,
    jsapi_ticket: ticket,
    timestamp: WECHAT_TIMESTAMP,
    url,
  }
  const str = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  const signature = sha1(str)
  console.log("[wx] getSignature: ", { str, signature })
  return signature
}

export interface ITemplate {
  template_id: string
  data: Record<string, { value: string | number }>
}

export async function sendWechatNotification(
  access_token: string,
  openid: string,
  template: ITemplate,
  url: string,
) {
  const targetUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`

  const payload = {
    touser: openid,
    url,
    ...template,
  }
  const body = JSON.stringify(payload)
  console.log("[wx-sdk] notification req: ", { targetUrl, body })

  const res = await fetch(targetUrl, {
    method: "POST",
    body,
  })
  const resData = (await res.json()) as unknown
  console.log("[wx-sdk] notification res: ", resData)
  return resData
}

let number = 0
export const getOrder = async () => {
  return ++number
}
