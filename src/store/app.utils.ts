import { getNewId } from "../../packages/common-algo/id"
import { IAppClient, IAppDetail } from "../schema/app.detail"

export const forkApp = (app: IAppDetail): IAppClient => ({
  ...app,
  clientId: getNewId(),

  // decide whether to change
  isDraft: true,
  response: undefined,
})
