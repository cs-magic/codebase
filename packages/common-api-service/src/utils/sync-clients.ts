import { IContext } from "../schema/context"
import { transferMessage } from "./transfer-message"

export const syncClients = (context: IContext) => {
  const { bot, sockets, scan } = context

  const loggedIn = bot?.isLoggedIn ?? false
  transferMessage({ type: "loggedIn", data: loggedIn }, sockets)

  // avoid bot.currentUser to catch errors
  if (loggedIn) {
    const user = bot?.currentUser.payload
    if (user) transferMessage({ type: "login", data: user }, sockets)
  } else if (scan) {
    transferMessage({ type: "scan", data: scan }, sockets)
  }
}
