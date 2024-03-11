import { getNewId } from "../packages/common-algo/id"
import { BEST_VIEWPOINT } from "../packages/common-ui/config"
import { IAppDetail } from "./schema/app.detail"
import { IBaseResponse } from "./schema/query"
import { IResponse } from "./schema/response"
import { ResponseStatus } from "./schema/sse"

export const getConvUrl = (conv: {
  id: string
  currentRequestId: string | null
}) => {
  let url = `/tt/${conv.id}`
  if (conv.currentRequestId) url += `?r=${conv.currentRequestId}`
  return url
}

export const checkRespondingStatus = (
  response?: null | IBaseResponse,
): ResponseStatus => {
  if (!response) return "unknown"
  if (!response.tStart) return "to-response"
  if (response.tEnd) return "responded"
  return "responding"
}
export const getAppsGridCols = (width: number, nApps: number) =>
  width // 未初始化时避免闪烁
    ? Math.min(Math.floor(width / BEST_VIEWPOINT), nApps)
    : nApps

export const app2response = (app: IAppDetail): IResponse => ({
  app,
  requestId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  appId: app.id,
  tStart: null,
  content: null, // todo
  error: null,
  tEnd: null,
  tTrigger: null,
  isDraft: false,
  interruptedAt: null,
  convId: null,
  id: getNewId(9),
  appClientId: getNewId(5),
})

export const response2app = (response: IResponse): IAppDetail => response.app!
