export type IApiResult<T = any> =
  // | { success: null; data?: T; messages?: string }
  | { success: false; data?: T; message?: string }
  | { success: true; data: T; message?: string }

export type IApi<I = any, O = any> =
  | { status: "idle" }
  | { status: "running"; input: I }
  | ({ status: "finished"; input: I } & IApiResult<O>)

export type ApiMethod = "GET" | "POST"
