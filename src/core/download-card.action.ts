import {
  Browser as PlaywrightBrowser,
  BrowserType,
  chromium,
  Page as PlaywrightPage,
} from "playwright"
import puppeteer, {
  Browser as PuppetBrowser,
  Page as PuppetPage,
  PuppeteerNode,
} from "puppeteer"
import { extractFirstURL } from "../../packages/common-common/parse-url"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export type DriverType = "playwright" | "puppet"

export class UniParser {
  private driver: // PuppeteerNode
  BrowserType
  private browser:
    | PlaywrightBrowser
    // | PuppetBrowser
    | null = null
  private page: // | PuppetPage
  // &
  PlaywrightPage | null = null

  constructor(driverType: DriverType = "playwright") {
    console.log("-- init UniParserBot: ", { driverType })
    this.driver =
      // driverType === "puppet" ?
      // puppeteer
      // :
      chromium

    process.on("exit", () => this.cleanup())
    process.on("SIGINT", () => this.cleanup())
    process.on("SIGTERM", () => this.cleanup())
  }

  async cleanup() {
    if (this.browser) await this.browser.close()

    process.exit()
  }

  async init() {
    if (this.browser) {
      console.log("cached browser")
      return
    }

    console.log("-- opening browser")
    this.browser = await this.driver.launch({
      downloadsPath: "/tmp",
      // headless: false,
    }) // Or 'firefox' or 'webkit'.

    console.log("-- opening page")
    this.page = (await this.browser.newPage({
      screen: {
        width: 1080,
        height: 720,
      },
    })) as PuppetPage & PlaywrightPage
    this.page.on("console", (msg) => console.log("[console] ", msg.text()))

    const targetUrl = `${env.NEXT_PUBLIC_APP_URL}/card/bgen`
    console.log(`-- visiting: ${targetUrl}`)
    await this.page.goto(targetUrl)
  }

  async genCard(
    content: string,
    user?: IUserSummary,
  ): Promise<{ cardUrl: string }> {
    await this.init()

    const page = this.page
    if (!page) throw new Error("page not inited")

    console.log("-- inputting user if necessary: ", user)
    if (user?.name && user.image) {
      await page.locator("#card-user-name").fill(user.name)
      await page.locator("#card-user-avatar").fill(user.image)
    }

    console.log(`-- inputting content(length=${content.length}) `)
    await page.locator("#card-content").fill(content)

    console.log("-- generating")
    await page.waitForSelector("#upload-card:not([disabled])") // 可能要很长（涉及到LLM）

    console.log("-- clicking upload button")
    await page.locator("#upload-card").click()

    console.log("-- parsing toast")
    const toastContent = await page.textContent(".toast div[data-title]")
    const cardUrl = /uploaded at (.*)/.exec(toastContent ?? "")?.[1]
    if (!cardUrl) throw new Error("no valid url parsed from toast")
    console.log(`-- parsed cardUrl: ${cardUrl}`)

    console.log("-- closing toast")
    await page.locator(".toast button").click()

    return { cardUrl }
  }
}
