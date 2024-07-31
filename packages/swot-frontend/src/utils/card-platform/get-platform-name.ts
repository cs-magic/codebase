import { $Enums } from "@prisma/client"

export const getPlatformName = (type?: $Enums.PlatformType | null): string => {
  switch (type) {
    case "wxmpArticle":
      return "公众号"

    case "bilibiliVideo":
      return "B站"

    case "xhsNote":
      return "小红书"

    default:
      return "未知"
  }
}
