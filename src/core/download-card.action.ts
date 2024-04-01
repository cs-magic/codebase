"use server"

import { chromium, Page as PlaywrightPage } from "playwright"
import puppeteer, { Page as PuppetPage } from "puppeteer"
import { IApi } from "../../packages/common-api/schema"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export const downloadCardAction = async (
  url: string,
  user?: IUserSummary,
  type?: "playwright" | "puppet",
): Promise<IApi<{ cardUrl: string }>> => {
  const driver = type === "playwright" ? chromium : puppeteer

  console.log("-- opening browser")
  const browser = await driver.launch({
    downloadsPath: "/tmp",
  }) // Or 'firefox' or 'webkit'.

  console.log("-- opening page")
  const page = (await browser.newPage({
    screen: {
      width: 600,
      height: 2000,
    },
  })) as PuppetPage & PlaywrightPage

  console.log("-- visiting")
  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)

  console.log("-- inputting user if necessary: ", user)
  if (user?.name && user.image) {
    await page.locator("#card-user-name").fill(user.name)
    await page.locator("#card-user-avatar").fill(user.image)
  }

  console.log("-- inputting url: ", url)
  await page.locator("#card-input-url").fill(url)

  console.log("-- clicking generate button")
  await page.locator("#generate-card").click()

  console.log("-- waiting card generated")
  await page.waitForFunction(() => {
    return (
      document.getElementById("card-render-status")?.innerText ===
      "renderedMindmap"
    )
  })

  console.log("-- clicking uploading button")
  await page.locator("#upload-card").click()

  const cardUrlHandler = await page.waitForFunction(() => {
    return (
      extractFirstURL(
        document.querySelector(".toaster div[data-title]")?.innerHTML ?? "",
      ) ?? ""
    )
  })
  const cardUrl = await cardUrlHandler.jsonValue()
  console.log("-- ossId: ", cardUrl)

  await browser.close()
  return { success: true, data: { cardUrl } }
}
