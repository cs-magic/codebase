import { ICardPlatform } from "../../schema/card.js"
import { IWxmpArticleUrlParsed } from "../../schema/wxmp-article.js"

export const parseWxmpArticleUrl = (url: string): IWxmpArticleUrlParsed => {
  const params = new URL(url.replace(/&amp;/g, "&")).searchParams

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

  // logger.info({ url, platformId, platformData });

  return {
    platformId,
    platformData,
  }
}
