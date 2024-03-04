import { env } from "@/env"

export const APP_URL = env.NEXT_PUBLIC_APP_URL

export const NANOID_LEN = 5
export const BEST_VIEWPOINT = 320
export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
