import { UnexpectedError } from "@cs-magic/common/schema/error"
import { logger } from "@cs-magic/log/logger"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { getEnv } from "../env"
import { BaseSimulator } from "./base-simulator"

/**
 * !IMPORTANT: 需要 p01-card 项目启动
 */
export class CardSimulator extends BaseSimulator {
  async initPage() {
    if (!this.page) {
      this.page = await super.initPage()
      const env = getEnv()
      const targetUrl = `${env.NEXT_PUBLIC_APP_URL}/card/gen?renderType=backend`
      logger.info(`-- visiting: ${targetUrl}`)
      await this.page.goto(targetUrl)
    }
    return this.page
  }

  async genCard(
    content: string,
    user?: IUserSummary,
  ): Promise<{ cardUrl: string }> {
    if (!this.page) await this.initPage()
    if (!this.page) throw new UnexpectedError()

    logger.info("-- inputting user if necessary: %o", user)
    if (user?.name && user.image) {
      await this.page.locator("#card-user-name").fill(user.name)
      await this.page.locator("#card-user-avatar").fill(user.image)
    }

    logger.info(`-- inputting content(length=${content.length}) `)
    await this.page.locator("#card-content").fill(content)
    // const inputtedContent = await page.locator("#card-content").innerText()
    // logger.info("-- inputted content length: ", {
    //   target: content.length,
    //   actual: inputtedContent,
    // })

    logger.info("-- generating")
    await this.page.waitForSelector("#upload-card:not([disabled])") // 可能要很长（涉及到LLM）

    logger.info("-- clicking upload button")
    await this.page.locator("#upload-card").click()

    logger.info("-- parsing toast")
    const toastContent = await this.page.textContent(".toast div[data-title]")
    const cardUrl = /uploaded at (.*)/.exec(toastContent ?? "")?.[1]
    if (!cardUrl) throw new Error("no valid url parsed from toast")
    logger.info(`-- parsed cardUrl: ${cardUrl}`)

    logger.info("-- closing toast")
    await this.page.locator(".toast button").click()

    // await page.close()

    return { cardUrl }
  }
}
