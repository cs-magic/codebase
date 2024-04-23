import { api } from "../../../../../packages-to-classify/api-client/api"
import { IFetchWechatArticleStat } from "../schema"

/**
 *
 * @param url e.g. http://mp.weixin.qq.com/s?__biz=MzUyMjE2MTE0Mw==&amp;amp;mid=2247502028&amp;amp;idx=1&amp;amp;sn=3ebc7f9c0eb3f5e923264dc8ed161ffd&amp;amp;chksm=f9d29654cea51f420c101f5457361e8a8ab651d41ac348454b9bbba5996511d7a8a70ce76f66&amp;amp;mpshare=1&amp;amp;scene=1&amp;amp;srcid=0329vTzpUpk0iiwottscnUas&amp;amp;sharer_shareinfo=2a8c8c1fe3a0a89e41026c269c85a588&amp;amp;sharer_shareinfo_first=aa952e98fa239975bb8c6271bd4d54dc#rd
 */
export const parseStatFromUrlMock = (
  url: string,
): IFetchWechatArticleStat | null => {
  const uin = "MTIyMzg1NDgyMQ=="
  const key =
    "e4c402a25dea14c8cc164316fc6d6f3abbc7137b5c9545c28a7ee773f256c25bf6fda91782b9c338a15207fb198f5892ecefd46d4b91bb7b250d54f13f34fa443552ebbfb0f867f2083f8550fe3a38fa0ae92b6864609841d54644244504351216f2d04d29f78c7f5025f110a1e61f80671d726a1b122159aa90f424f411ce2d"
  // "642c0758f287f44acdda7b133506312ce54953018eacc380e686f45a84c1f131a76fa38b8bb65cb8bad742b19fa17267d8135341e506406d693b2d8c817f2db61dda6273d6b384971099e4f1c32f2c5818e60779de9f81780326844d53ae19c141449215d5ee3d78cdf33635ec6c97787f6bb6f3ef73a2f4a5d56c3990b988d8"

  const searchParams = new URL(url.replace(/amp;/g, "")).searchParams
  console.log({ searchParams })
  const __biz = searchParams.get("__biz")
  const mid = searchParams.get("mid")
  const sn = searchParams.get("sn")
  const idx = "1"
  const is_only_read = "1"

  console.log({
    __biz,
    mid,
    sn,
    idx,
    is_only_read,
    uin,
    key,
  })
  if (!__biz || !mid || !sn) return null

  return {
    __biz,
    mid,
    sn,
    idx,
    is_only_read,
    uin,
    key,
  }
}
export const fetchWechatArticleStat = async ({
  key,
  uin,
  idx,
  mid,
  sn,
  __biz,
  is_only_read,
}: IFetchWechatArticleStat) => {
  const url = `https://mp.weixin.qq.com/mp/getappmsgext?f=json&uin=${uin}&key=${key}&__biz=${__biz}`

  const { data } = await api.post(url, {
    body: new URLSearchParams({
      mid,
      sn,
      idx,
      is_only_read,
    }),
  })
  console.log("-- fetched wxmp article stat: ", data)
  return data
}
