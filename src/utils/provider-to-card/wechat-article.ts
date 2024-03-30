import { IWechatArticleDetail } from "@/schema/wechat-article.detail"
import { ICardBody } from "../../schema/card"

export const wechatArticle2card = (data: IWechatArticleDetail): ICardBody => {
  return {
    platform: "wechat-article",
    title: data.title!,
    content: data.contentMd!,
    images: [data.cover],
    sourceUrl: data.sourceUrl,
  }
}
