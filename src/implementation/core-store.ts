import { remove } from "lodash"
import { UnexpectedError } from "../../packages/common-general/schema"
import { LogLevel } from "../../packages/common-log/schema"
import { IAppDetail } from "../schema/app.detail"
import { IConvBase } from "../schema/conv.base"
import { IConvDetail } from "../schema/conv.detail"
import { IContext } from "../schema/message"
import { IRequest } from "../schema/request"
import { IResponse, IUpdateResponse } from "../schema/response"
import { app2response, response2app } from "../utils"

export class CoreStore {
  // implements ICoreStore
  //////////////////////////////
  // base states
  //////////////////////////////

  convs: IConvBase[] = []
  _serverChats: IResponse[] = []
  _chatIndex = 0
  logLevel: LogLevel = LogLevel.warning

  _conv: IConvDetail | null = null

  //////////////////////////////
  // derived
  //////////////////////////////

  get conv() {
    const conv = this._conv
    if (this.logLevel <= LogLevel.debug) console.log({ conv })
    return conv
  }

  set conv(conv: IConvDetail | null) {
    this._conv = conv
    if (this.logLevel <= LogLevel.info) console.log("-- setting conv: ", conv)
  }

  get convId() {
    return this.conv?.id ?? null
  }

  get requests(): IRequest[] {
    const requests = this.conv?.requests ?? []
    if (this.logLevel <= LogLevel.debug) console.log({ requests })
    return requests
  }

  get requestIds(): string[] {
    return this.requests.map((r) => r.id)
  }

  /**
   * 当前的 requestId, title 都是从 convs 里找
   */
  get requestId() {
    const requestId =
      this.convs.find((c) => c.id === this.convId)?.currentRequestId ?? null
    if (this.logLevel <= LogLevel.debug) console.log({ requestId })
    return requestId
  }

  get request() {
    const request = this.requests.find((r) => r.id === this.requestId) ?? null
    if (this.logLevel <= LogLevel.debug) console.log({ request })
    return request
  }

  get chats(): IResponse[] {
    return this.request?.responses ?? this._serverChats
  }

  get chat(): IResponse | null {
    return this.chats[this._chatIndex] ?? null
  }

  get chatId() {
    return this.chat?.id
  }

  get apps(): IAppDetail[] {
    return this.chats.map(response2app)
  }

  get app(): IAppDetail | null {
    return this.apps[this._chatIndex] ?? null
  }

  get appId() {
    return this.app?.id ?? null
  }

  get commonContext(): IContext {
    const commonContext = this.request?.context ?? []
    if (this.logLevel <= LogLevel.info) {
      console.log({ thisLogLevel: this.logLevel })
      console.log({ commonContext })
    }
    return commonContext
  }

  get bestContext(): IContext {
    return this.commonContext

    //  todo: bug?
    return this.chat
      ? [
          ...this.commonContext,
          {
            updatedAt: this.chat.updatedAt,
            content: this.chat.content ?? this.chat.error ?? "",
            isError: !!this.chat.error,
            role: "assistant",
          },
        ]
      : this.commonContext
  }

  get responding() {
    return this.chats?.some((r) => !!r.tStart && !r.tEnd)
  }

  //////////////////////////////
  // actions
  //////////////////////////////

  updateRequestId(requestId: string) {
    const conv = this.convs.find((c) => c.id === this.convId)
    if (!conv) return
    conv.currentRequestId = requestId
  }

  updateRequestFromServer(request: IRequest) {
    if (this.conv?.id === request.convId) {
      this.conv.currentRequestId = request.id
      this.conv.requests.push(request)
    }
    const conv = this.convs.find((c) => c.id === request.convId)
    if (!conv) return
    conv.currentRequestId = request.id
  }

  addConvFromServer(conv: IConvDetail) {
    this.convs.splice(0, 0, conv)
  }

  initConvFromServer(conv: IConvDetail, requestId?: string | null) {
    const convInStore = this.convs.find((c) => c.id === conv.id)
    if (!convInStore) throw new UnexpectedError()
    this.conv = conv
    if (requestId !== undefined) convInStore.currentRequestId = requestId
  }

  selectChat(responseId: string) {
    this._chatIndex = this.chats.findIndex((a) => a.id === responseId)
  }

  pushChat(app: IAppDetail) {
    this.chats.push(app2response(app))
  }

  replaceChat(responseId: string, app: IAppDetail) {
    const index = this.chats.findIndex((a) => a.id === responseId)
    if (index < 0) return
    this.chats[index] = app2response(app)
  }

  forkChat(response: IResponse) {
    const index = this.chats.findIndex((a) => a.id === response.id)
    if (index < 0) return
    this.chats.splice(index + 1, 0, response)
  }

  delChat(responseId: string) {
    const index = this.chats.findIndex((a) => a.id === responseId)
    if (index < 0) return
    this.chats.splice(index, 1)
    this._chatIndex = 0
  }

  updateChat(requestId: string, responseId: string, func: IUpdateResponse) {
    if (this.logLevel <= LogLevel.debug) console.log({ requestId, responseId })

    const res = this.chats.find((a) => a.id === responseId)
    if (!res) return

    func(res)
  }

  updateConvTitle(convId: string, func: IUpdateResponse) {
    if (this.logLevel <= LogLevel.debug)
      console.log("-- updateConvTitle: ", { convId })
    const res = this.convs.find((c) => c.id === convId)?.titleResponse
    if (!res) return
    func(res)
  }

  delConv(convId: string) {
    if (convId === this.convId) {
      this._conv = null
      this._chatIndex = 0
    }
    remove(this.convs, (c) => c.id === convId)
  }

  delAllConvs() {
    this.convs = []
    this._chatIndex = 0
    this._conv = null
  }

  /**
   *  返回到首页
   */
  returnToHome() {
    this.conv = null
  }
}
