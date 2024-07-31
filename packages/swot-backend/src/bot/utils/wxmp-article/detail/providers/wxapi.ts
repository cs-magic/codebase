import axios from "axios"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../../../../schema"
import { getWechatArticleUrlFromShortId } from "../../utils"
import { api } from "@cs-magic/common"

const wxapiApi = axios.create({
  ...api,
  baseURL: "http://121.199.7.165:13422",
})

type IWxapiResponse<T> = {
  code: number // 0 ok
  msg: string
  data?: T // exists if code === 0
}

/**
 * {"code":-1002,"msg":"无此用户","list":[]}
 *
 * @param url
 */
export const fetchWechatArticleStat = async (id: string) => {
  const token = process.env.WXAPI_TOKEN
  if (!token) throw new Error("no token")

  const { data: res } = await wxapiApi.post<IWxapiResponse<IWechatArticleStat>>(
    "/wxapi/readnum",
    new URLSearchParams({
      url: getWechatArticleUrlFromShortId(id),
      token,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  )
  console.log("-- fetchWechatArticleStat: ", res)
  return res
}

export const fetchWechatArticleComments = async (id: string) => {
  const token = process.env.WXAPI_TOKEN
  if (!token) throw new Error("no token")

  const { data: res } = await wxapiApi.postForm<
    IWxapiResponse<IWechatArticleComment[]>
  >("/wxapi/wxcoment", {
    url: getWechatArticleUrlFromShortId(id),
    token,
    comment_id: "",
  })
  console.log("--   fetchWechatArticleComments")
  return res
}
