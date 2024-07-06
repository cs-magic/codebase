import moment from "moment"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import locale from "moment/locale/zh-cn.js"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
moment.updateLocale("zh-cn", locale)

export { moment }
