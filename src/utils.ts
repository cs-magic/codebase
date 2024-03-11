import { getNewId } from "../packages/common-algo/id"
import { parseApp } from "../packages/common-llm/schema"
import { BEST_VIEWPOINT } from "../packages/common-ui/config"
import { ICreateApp } from "./schema/app.create"
import { IAppClient, IAppClientSpecial, IAppDetail } from "./schema/app.detail"
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
export const forkApp = (app: IAppDetail, response?: IResponse): IAppClient => ({
  ...app,
  clientId: getNewId(),

  // decide whether to change
  isDraft: false,
  response,
})

export const parseAppClient = (
  app: IAppClient,
): ICreateApp & IAppClientSpecial => ({
  ...parseApp(app),
  clientId: app.clientId,
  isDraft: app.isDraft,
  response: app.response,
})
