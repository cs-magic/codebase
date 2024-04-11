import { ICardPlatform } from "../../../schema/card"

export const isWxmpArticleUrl = (url: string) => /mp.weixin.qq.com/.test(url)

export const parseWxmpArticleUrl = (url: string) => {
  const params = new URL(url).searchParams

  const platformId = /mp.weixin.qq.com\/s\/(.*?)$/.exec(url)?.[1]

  const platformData: ICardPlatform<"wxmpArticle"> = {
    sn: params.get("sn"),
    __biz: params.get("__biz"),
    chksm: params.get("chksm"),
    idx: params.get("idx"),
    mid: params.get("mid"),
    stat: undefined,
    comments: undefined,
  }

  // console.log({ url, platformId, platformData })

  return {
    platformId,
    platformData,
  }
}
