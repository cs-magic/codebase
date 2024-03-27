export type IApi<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; data?: T; message?: string }
