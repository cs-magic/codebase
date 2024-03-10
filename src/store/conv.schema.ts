import { IAppClient, IAppDetail } from "../schema/app.detail"
import {
  IConvBase,
  IConvDetail,
  IRequest,
  IResponse,
  IUpdateResponse,
} from "../schema/conv"
import { IContext } from "../schema/message"

export interface ConvSchema {
  ///////////////////////////////
  // base
  //////////////////////////////

  convs: IConvBase[]
  conv: IConvDetail | null
  apps: IAppClient[]
  appIndex: number

  ///////////////////////////////
  // derived
  //////////////////////////////

  appId: string | null
  requests: IRequest[]
  requestId: string | null
  request: IRequest | null
  responses: IResponse[]
  bestResponse: IResponse | null
  commonContext: IContext
  bestContext: IContext
  responding: boolean

  ///////////////////////////////
  // actions
  //////////////////////////////

  // -- conv
  initConvFromServer: (conv: IConvDetail) => void

  updateConvTitle: (convId: string, func: IUpdateResponse) => void

  // -- req
  updateRequestId: (requestId: string | null) => void

  //  -- apps
  initAppsFromServer: (apps: IAppDetail[]) => void

  updateAppResponse: (
    requestId: string,
    appId: string,
    func: IUpdateResponse,
  ) => void

  selectApp: (appClientId: string) => void

  pushApp: (app: IAppDetail) => void

  replaceApp: (appClientId: string, app: IAppDetail) => void

  forkApp: (app: IAppClient) => void

  delApp: (appClientId: string) => void

  //////////////////////////////
  // private
  //////////////////////////////
}
