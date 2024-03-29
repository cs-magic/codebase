export type IApi<T = any> =
  // | { success: null; data?: T; messages?: string }
  | { success: false; data?: T; message?: string }
  | { success: true; data: T; message?: string }

export type ApiMethod = "GET" | "POST"
