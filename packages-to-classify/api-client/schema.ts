export type IApiResult<T = any> =
  | { success: false; data?: T; message?: string }
  | { success: true; data: T; message?: string }

export type ApiStatus = "idle" | "running" | "finished"

export type IApiBase<S extends ApiStatus, I = any, O = any> = S extends "idle"
  ? { status: "idle" }
  : S extends "running"
    ? { status: "running"; input: I }
    : { status: "finished"; input: I } & IApiResult<O>

export type IApi<I = any, O = any> = IApiBase<ApiStatus, I, O>

export type ApiMethod = "GET" | "POST"
