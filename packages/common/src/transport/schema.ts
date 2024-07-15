export type TransportType = "pusher" | "sse"

/**
 * ref: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket/readyState
 */
export const socketStatusMap: Record<number, string> = {
  0: "正在连接",
  1: "已连接",
  2: "正在关闭",
  3: "已关闭",
}
