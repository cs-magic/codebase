import { ICardBody } from "../../../schema/card"
import { IWechatArticleDetail } from "../../../schema/wechat-article.detail"

export const wechatArticle2card = (data: IWechatArticleDetail): ICardBody => {
  return {
    platform: "wechat-article",
    title: data.title!,
    content: data.contentMd!,
    images: [data.cover],
    sourceUrl: data.sourceUrl,
    summary: data.summary,
    stat: {
      reads: data.stat?.readnum,
      likes: data.stat?.likenum,
      comments: data.stat?.comment_count,
    },
    author: data.author,
    source: data.source,
    time: data.time,
  }
}
