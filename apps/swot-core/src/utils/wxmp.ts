import { IUserSummaryFilled } from "@cs-magic/common"
import { env } from "@cs-magic/env"
import { BaseSimulator } from "@cs-magic/spider"
import * as url from "node:url"

const simulator = new BaseSimulator("playwright", { headless: false })

/**
 * 将一个链接，转成一张卡片
 * @param opts
 */
export const genSwotCard = async ({
  url,
  user,
}: {
  url: string
  user: IUserSummaryFilled
}) => {
  const page = await simulator.initPage()

  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)

  await page.locator("#card-input-url").fill(url)

  await page.locator("#card-user-name").fill(user.name)
  await page.locator("#card-user-avatar").fill(user.image)

  await page.locator("#generate-card").click()

  await page.locator("#download-card:not([disabled])").click()
}

void genSwotCard({
  url: "https://mp.weixin.qq.com/s/PewhszexWyjEoAfYpU7XvQ",
  user: {
    name: "南川 Mark",
    image:
      "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
  },
})
