import { $Enums } from "@prisma/client"

export const getPlatformName = (type: $Enums.PlatformType): string => {
  switch (type) {
    case "wechatArticle":
      return "公众号"

    case "bilibiliVideo":
      return "B站"

    case "xiaohongshuNote":
      return "小红书"
  }
}
