import qrcodeTerminal from "qrcode-terminal"
import { ScanStatus, WechatyBuilder } from "wechaty"

import { logger } from "@cs-magic/common/log"

void WechatyBuilder.build({ name: "default" })
  .on("scan", async (qrcode, status, data) => {
    logger.info(
      `onScan (status=${ScanStatus[status]}, data=${data}), scan the following qrcode or from wechaty official: https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`,
    )
    qrcodeTerminal.generate(qrcode, { small: true })
  })
  .on("start", () => {
    console.log("onStart")
  })
  .on("login", () => {
    console.log("onLogin")
  })
  .on("message", (data) => {
    console.log({ data })
  })
  .start()
