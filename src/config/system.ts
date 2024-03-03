import { BRANDING_IDOUBI_AVATAR, BRANDING_MARK_AVATAR } from "@/config/assets"

export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错

export const SHOW_PARTNERS = false
// 独立开发者，要圆形的
export const INDIES_AVATARS: string[] = [
  BRANDING_MARK_AVATAR,
  BRANDING_IDOUBI_AVATAR,
]
// 企业banner
export const SPONSORS_BANNERS: string[] = []

export const MSG_UNEXPECTED_ERROR = "Unexpected Error !"
export const MSG_TODO = "研发小哥正在加🍗中！"
