import { formatError } from "@cs-magic/common/utils/format-error"
import { sampleWxmpArticleUrl } from "../../../core/wechat/wxmp-article/config"
import { url2preview } from "./url-preview"

void url2preview(sampleWxmpArticleUrl).catch((e) => {
  formatError(e)
})
