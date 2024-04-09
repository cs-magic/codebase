import {
  Browser as PlaywrightBrowser,
  BrowserType,
  chromium,
  LaunchOptions,
} from "playwright"
import { DriverType } from "./schema"

export class ParserBase {
  protected driver: BrowserType
  protected browser: PlaywrightBrowser | null = null
  protected launchOptions?: LaunchOptions

  constructor(
    driverType: DriverType = "playwright",
    launchOptions?: LaunchOptions,
  ) {
    console.log("-- init UniParserBot: ", { driverType })
    // Or 'firefox' or 'webkit'.
    this.driver = chromium
    this.launchOptions = launchOptions

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
      ...this.launchOptions,
    })
  }
}
