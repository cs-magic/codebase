"use server";
import { sha1 } from "js-sha1";
import { api } from "@cs-magic/common/api-client/api";
import { getEnv } from "@cs-magic/common";
import { fetchWechatApi } from "../functions";
import { WECHAT_NONCE_STR, WECHAT_TIMESTAMP } from "./config";
/**
 * ref: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export const getWechatToken = async () => {
    const env = getEnv();
    if (!env.NEXT_PUBLIC_WECHAT_APP_ID || !env.WECHAT_APP_SECRET)
        throw new Error("invalid wechat app id/secret in env");
    return fetchWechatApi("get-wechat-sdk-token", "/cgi-bin/token", {
        grant_type: "client_credential",
        appid: env.NEXT_PUBLIC_WECHAT_APP_ID,
        secret: env.WECHAT_APP_SECRET,
    });
};
export const getWechatTicket = async (access_token) => {
    return fetchWechatApi("get-jsapi-ticket", "/cgi-bin/ticket/getticket", {
        access_token,
        type: "jsapi",
    });
};
export const getWechatSignature = async (ticket, url) => {
    const params = {
        noncestr: WECHAT_NONCE_STR,
        jsapi_ticket: ticket,
        timestamp: WECHAT_TIMESTAMP,
        url,
    };
    const str = Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join("&");
    const signature = sha1(str);
    console.log("[wx] getSignature: ", { str, signature });
    return signature;
};
export async function sendWechatNotification(access_token, openid, template, url) {
    const targetUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`;
    const payload = {
        touser: openid,
        url,
        ...template,
    };
    const body = JSON.stringify(payload);
    console.log("[wx-sdk] notification req: ", { targetUrl, body });
    const { data: resData } = await api.post(targetUrl, {
        body,
    });
    console.log("[wx-sdk] notification res: ", resData);
    return resData;
}
let number = 0;
export const getOrder = async () => {
    return ++number;
};
