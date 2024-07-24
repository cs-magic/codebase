import { IUserSummaryFilled, logger } from "@cs-magic/common"
import { env } from "@cs-magic/env"
import { BaseSimulator, CardSimulator } from "@cs-magic/spider"
import { wxmpUrl2preview } from "@cs-magic/swot-core"

import { FileBox } from "file-box"
import { IWechatPreference } from "../schema/index.js"

const uniParser = new CardSimulator()
const simulator = new BaseSimulator("playwright", {
  // headless: false
  headless: true,
})

export const link2card = async ({
  url,
  user,
  convPreference,
  version = "v2",
}: {
  url: string
  user: IUserSummaryFilled
  convPreference?: IWechatPreference

  version?: "v1" | "v2"
}) => {
  logger.info(`[link2card] url=${url}, user.name=${user.name}`)

  switch (version) {
    case "v1": {
      // todo: add userIdentity into parser
      const inner = await wxmpUrl2preview(
        url,
        convPreference?.features.parser.options,
      )

      const { cardUrl } = await uniParser.genCard(JSON.stringify(inner), user)
      logger.info(`-- sending file: ${cardUrl}`)

      return FileBox.fromUrl(cardUrl)
    }

    case "v2": {
      const browser = await simulator.initBrowserSafe()
      const page = await browser.newPage({
        screen: { width: 1280, height: 720 },
      })

      await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)

      await page.locator("#card-input-url").fill(url)
      await page.locator("#card-user-name").fill(user.name)
      if (user.image) await page.locator("#card-user-avatar").fill(user.image)

      await page.locator("#generate-card").click()

      // Start waiting for download before clicking. Note no await.
      const downloadPromise = page.waitForEvent("download")
      await page.locator("#download-card:not([disabled])").click()
      const download = await downloadPromise
      // Wait for the download process to complete and save the downloaded file somewhere.
      const fp = ".generated/" + download.suggestedFilename()
      logger.info(`[link2card] fp=${fp}`)
      await download.saveAs(fp)

      await page.close()
      return FileBox.fromFile(fp)
    }
  }
}

// void link2card({
//   url: "https://mp.weixin.qq.com/s/PewhszexWyjEoAfYpU7XvQ",
//   user: {
//     name: "南川 Mark",
//     image:
//       "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
//   },
// })
