import axios from "axios"
import { api } from "../../../../../common-api"
import { wechatArticleId2url } from "../../../utils"
import {
  IFetchWechatArticleDetail,
  IWechatArticleComment,
  IWechatArticleStat,
} from "../schema"

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
  const token = process.env.WXAPI_TOKEN!

  const { data: res } = await wxapiApi.post<IWxapiResponse<IWechatArticleStat>>(
    "/wxapi/readnum",
    new URLSearchParams({
      url: wechatArticleId2url(id),
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
  const token = process.env.WXAPI_TOKEN!

  const { data: res } = await wxapiApi.postForm<
    IWxapiResponse<IWechatArticleComment[]>
  >("/wxapi/wxcoment", {
    url: wechatArticleId2url(id),
    token,
    comment_id: "",
  })
  console.log("-- fetchWechatArticleComments: ", res)
  return res
}

export const fetchWechatArticleDetailViaWxapi: IFetchWechatArticleDetail =
  async (id) => {
    const resStat = await fetchWechatArticleStat(id)
    const resComments = await fetchWechatArticleComments(id)

    if (resStat.code !== 0 || resComments.code !== 0)
      return { success: false, message: "invalid res from wxapi" }

    return {
      success: true,
      data: { stat: resStat.data!, comments: resComments.data! },
    }
  }
