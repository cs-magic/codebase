import { WebSocket as DefaultWebSocket } from "ws"

declare module "ws" {
  interface WebSocket extends DefaultWebSocket {
    id: string
  }
}
