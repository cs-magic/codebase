export type IBaseResponse = {
  id?: string
  tStart?: Date | null
  tEnd?: Date | null
  content?: string | null
  error?: string | null
  updatedAt?: Date
}

export type IAppResponse = IBaseResponse & {
  requestId: string
  appId: string
}
