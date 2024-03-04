import { isProd } from "../utils"

export const SMS_PROVIDER_ID = "sms"
export const SMS_CODE_DOWNTIME = isProd ? 60 : 3
export const SMS_EXPIRE_MINUTES = 10
