import axios from "axios";
import { api } from "@cs-magic/common/api-client/api";
import { getWechatArticleUrlFromShortId } from "../../utils";
const wxapiApi = axios.create({
    ...api,
    baseURL: "http://121.199.7.165:13422",
});
/**
 * {"code":-1002,"msg":"无此用户","list":[]}
 *
 * @param url
 */
export const fetchWechatArticleStat = async (id) => {
    const token = process.env.WXAPI_TOKEN;
    const { data: res } = await wxapiApi.post("/wxapi/readnum", new URLSearchParams({
        url: getWechatArticleUrlFromShortId(id),
        token,
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    console.log("-- fetchWechatArticleStat: ", res);
    return res;
};
export const fetchWechatArticleComments = async (id) => {
    const token = process.env.WXAPI_TOKEN;
    const { data: res } = await wxapiApi.postForm("/wxapi/wxcoment", {
        url: getWechatArticleUrlFromShortId(id),
        token,
        comment_id: "",
    });
    console.log("--   fetchWechatArticleComments");
    return res;
};
