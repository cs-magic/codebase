import axios from "axios"
import {
  FetchWechatArticleDetail,
  IWechatArticleComment,
  IWechatArticleStat,
} from "../schema"

const api = axios.create({ baseURL: "http://121.199.7.165:13422" })
const token = process.env.WXAPI_TOKEN
if (!token) throw new Error("no token found")

type IWxapiResponse<T> = {
  code: number
  msg: string
  data: T
}

export const fetchWechatArticleStat = async (url: string) => {
  const { data: res } = await api.post<IWxapiResponse<IWechatArticleStat>>(
    "/wxapi/readnum",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        url,
        token,
      }),
    },
  )
  if (res.code !== 0) throw new Error(JSON.stringify(res))
  return res.data
}

export const fetchWechatArticleComments = async (url: string) => {
  const { data: res } = await api.post<IWxapiResponse<IWechatArticleComment[]>>(
    "/wxapi/wxcoment",
    {
      body: JSON.stringify({
        url,
        token,
        comment_id: "",
      }),
    },
  )
  if (res.code !== 0) throw new Error(JSON.stringify(res))
  return res.data
}

export const fetchWechatArticleDetailViaWxapi: FetchWechatArticleDetail =
  async (url) => {
    const stat = await fetchWechatArticleStat(url)
    const comments = await fetchWechatArticleComments(url)
    return { success: true, data: { stat, comments } }
  }
