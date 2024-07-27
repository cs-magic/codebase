import { IUserSummaryFilled, logger, sleep } from "@cs-magic/common"
import { env } from "@cs-magic/common"
import { BaseSimulator } from "@cs-magic/spider"

import { random, range } from "lodash-es"

const simulator = new BaseSimulator("playwright", {
  // headless: false,
})

export const link2card = async ({
  url,
  user,
}: {
  url: string
  user: IUserSummaryFilled
}) => {
  logger.info(`[${user.name}] opening browser`)
  const browser = await simulator.initBrowserSafe()

  logger.info(`[${user.name}] new page`)
  const page = await browser.newPage({
    screen: { width: 1280, height: 720 },
  })

  logger.info(`[${user.name}] goto page`)
  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)

  logger.info(`[${user.name}] filling`)
  await page.locator("#card-input-url").fill(url)
  await page.locator("#card-user-name").fill(user.name)
  if (user.image) await page.locator("#card-user-avatar").fill(user.image)

  logger.info(`[${user.name}] sleeping`)
  await sleep(random() * 5e3)

  logger.info(`[${user.name}] validating`)
  const userName = await page.locator("#card-user-name").inputValue()
  console.log({ target: user.name, real: userName })

  logger.info(`[${user.name}] closing`)
  await page.close()
  logger.info(`[${user.name}] closed`)
}

const main = async () => {
  await Promise.all(
    range(5).map(
      async (i) =>
        await link2card({
          url: "https://mp.weixin.qq.com/s/PewhszexWyjEoAfYpU7XvQ",
          user: {
            name: i.toString(),
            image:
              "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
          },
        }),
    ),
  )

  await simulator.cleanup()
}

void main()
