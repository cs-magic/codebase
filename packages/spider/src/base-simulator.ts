import {
  Browser as PlaywrightBrowser,
  BrowserType,
  chromium,
  LaunchOptions,
} from "playwright"
import { Page as PlaywrightPage } from "playwright-core"
import { Page as PuppetPage } from "puppeteer"

import { logger } from "@cs-magic/common"
import { DriverType } from "./schema"

export type Page = PuppetPage & PlaywrightPage

export class BaseSimulator {
  public launchOptions: LaunchOptions
  protected driver: BrowserType
  protected browser: PlaywrightBrowser | null = null
  protected page?: Page

  constructor(
    driverType: DriverType = "playwright",
    launchOptions?: LaunchOptions,
  ) {
    logger.info("-- init UniParserBot: ", { driverType })
    // Or 'firefox' or 'webkit'.
    this.driver = chromium
    this.launchOptions = launchOptions ?? {}

    process.on("exit", () => this.cleanup())
    process.on("SIGINT", () => this.cleanup())
    process.on("SIGTERM", () => this.cleanup())
  }

  async cleanup() {
    if (this.browser) await this.browser.close()

    process.exit()
  }

  async initPage(): Promise<Page> {
    if (!this.page) {
      logger.info("-- opening browser")
      this.browser = await this.driver.launch({
        downloadsPath: "/tmp",
        ...this.launchOptions,
      })

      this.page = (await this.browser.newPage({
        screen: {
          width: 1080,
          height: 720,
        },
      })) as Page
    }
    return this.page
  }
}
