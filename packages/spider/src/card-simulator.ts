import { sleep } from "@cs-magic/common"
import { getEnv } from "@cs-magic/env"
import { logger } from "@cs-magic/common"
import { UnexpectedError } from "@cs-magic/common"
import { IUserSummaryFilled } from "@cs-magic/common"
import { BaseSimulator } from "./base-simulator.js"

/**
 * !IMPORTANT: 需要 swot 项目启动
 */
export class CardSimulator extends BaseSimulator {
  static runningTasksCount = 0

  async genCard(
    content: string,
    user: IUserSummaryFilled,
  ): Promise<{ cardUrl: string }> {
    let result
    while (CardSimulator.runningTasksCount !== 0) {
      await sleep(3e3) // wait 3s
    }

    try {
      CardSimulator.runningTasksCount++
      result = await this.genCardInner(content, user)
    } finally {
      CardSimulator.runningTasksCount--
    }

    return result
  }

  /**
   *
   * @param content LLM 解析的结果
   * @param user 微信的用户的昵称/头像
   */
  async genCardInner(
    content: string,
    user: IUserSummaryFilled,
  ): Promise<{ cardUrl: string }> {
    if (!this.page) await this.initPage()
    if (!this.page) throw new UnexpectedError()

    // logger.debug("-- inputting user if necessary: %o", user)
    await this.page.locator("#card-user-name").fill(user.name as string)
    await this.page.locator("#card-user-avatar").fill(user.image as string)

    logger.debug(`-- inputting content: %o`, content)
    await this.page.locator("#card-content").fill(content)

    // const inputtedContent = await this.page.locator("#card-content").innerText()
    // logger.info("-- inputted content length: ", {
    //   target: content.length,
    //   actual: inputtedContent,
    // })

    logger.debug("-- generating")
    await this.page.waitForSelector("#upload-card:not([disabled])") // 可能要很长（涉及到LLM）

    await sleep(3e3) // 强制再等一会，todo: robust state change detection

    logger.debug("-- clicking upload button")
    await this.page.locator("#upload-card").click()

    logger.debug("-- parsing toast")
    const toastContent = await this.page.textContent(".toast div[data-title]")
    const cardUrl = /uploaded at (.*)/.exec(toastContent ?? "")?.[1]
    if (!cardUrl) throw new Error("no valid url parsed from toast")
    logger.debug(`-- parsed cardUrl: ${cardUrl}`)

    logger.debug("-- closing toast")
    await this.page.locator(".toast button").click()

    // clear, o.w. the actions can't be promised to be working expectedly
    logger.debug("-- resetting input(state)")
    await this.page.locator("#card-user-name").fill("")
    await this.page.locator("#card-user-avatar").fill("")
    await this.page.locator("#card-content").fill("")
    // await page.close()

    return { cardUrl }
  }

  override async initPage() {
    if (!this.page) {
      this.page = await super.initPage()
      const env = getEnv()
      const targetUrl = `${env?.NEXT_PUBLIC_APP_URL}/card/gen?renderType=backend`
      logger.info(`-- visiting: ${targetUrl}`)
      await this.page.goto(targetUrl)
    }
    return this.page
  }
}
