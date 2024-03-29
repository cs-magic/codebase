import { IWechatArticleDetail } from "./detail/schema"

export type IWechatArticle = {
  url: string | null
  content: string | null
  diagram: string | null
  detail: IWechatArticleDetail | null
}
