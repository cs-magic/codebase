import { chromium, Page as PlaywrightPage } from "playwright"
import puppeteer, { Page as PuppetPage } from "puppeteer"
import { IApiResult } from "../../packages/common-api/schema"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export const downloadCardAction = async (
  inputUrl: string,
  user?: IUserSummary,
  type?: "playwright" | "puppet",
): Promise<IApiResult<{ cardUrl: string }>> => {
  console.log("-- deciding driver")
  const driver = type === "puppet" ? puppeteer : chromium

  console.log("-- opening browser")
  const browser = await driver.launch({
    downloadsPath: "/tmp",
    // headless: false,
  }) // Or 'firefox' or 'webkit'.

  try {
    console.log("-- opening page")
    const page = (await browser.newPage({
      screen: {
        width: 1080,
        height: 720,
      },
    })) as PuppetPage & PlaywrightPage
    page.on("console", (msg) => console.log("[console] ", msg.text()))

    const targetUrl = `${env.NEXT_PUBLIC_APP_URL}/card/gen`
    console.log(`-- visiting: ${targetUrl}`)
    await page.goto(targetUrl)

    console.log("-- inputting user if necessary: ", user)
    if (user?.name && user.image) {
      await page.locator("#card-user-name").fill(user.name)
      await page.locator("#card-user-avatar").fill(user.image)
    }

    console.log("-- inputting url: ", inputUrl)
    await page.locator("#card-input-url").fill(inputUrl)

    console.log("-- clicking generate button")
    await page.locator("#generate-card").click()

    console.log("-- generating")
    await page.waitForSelector("#upload-card:not([disabled])") // 可能要很长（涉及到LLM）

    console.log("-- clicking upload button")
    await page.locator("#upload-card").click()

    console.log("-- waiting toast")
    const cardUrlHandler = await page.waitForFunction(
      () => document.querySelector(".toaster div[data-title]")?.innerHTML ?? "",
    )

    const cardUrl = extractFirstURL(await cardUrlHandler.jsonValue()) ?? ""
    console.log("-- cardUrl: ", cardUrl)
    return { success: true, data: { cardUrl } }
  } catch (e) {
    console.error({ e })
    return { success: false, message: "failed" }
  } finally {
    await browser.close()
  }
}
