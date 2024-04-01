"use server"

import { chromium, Page as PlaywrightPage } from "playwright"
import puppeteer, { Page as PuppetPage } from "puppeteer"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export const downloadCardAction = async (
  url: string,
  user?: IUserSummary,
  type?: "playwright" | "puppet",
) => {
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

  console.log("-- filling user if necessary: ", {
    id: user?.id,
    name: user?.name,
    imageLength: user?.image?.length,
  })
  if (user?.name && user.image) {
    await page.locator("#card-user-name").fill(user.name)
    await page.locator("#card-user-avatar").fill(user.image)
  }

  console.log("-- inputting: ", url)
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

  console.log("-- copying oss id")
  const ossId = document.getElementById("card-oss-id")!.innerText

  await browser.close()
  return { success: true, data: { ossId } }
}
