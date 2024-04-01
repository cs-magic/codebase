"use server"

import { chromium } from "playwright"
import puppeteer from "puppeteer"
import internal from "stream"
import { IApi } from "../../packages/common-api/schema"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export const downloadCardViaPlaywright = async (
  url: string,
  user?: IUserSummary,
) => {
  console.log("-- opening browser")
  const browser = await chromium.launch({
    downloadsPath: "/tmp",
  }) // Or 'firefox' or 'webkit'.

  console.log("-- opening page")
  const page = await browser.newPage({
    screen: {
      width: 600,
      height: 2000,
    },
  })

  console.log("-- visiting")
  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)

  console.log("-- filling user if necessary: ", {
    id: user?.id,
    name: user?.name,
    imageLength: user?.image?.length,
  })
  if (user?.name && user.image) {
    await page.locator("#user-name").fill(user.name)
    await page.locator("#user-avatar").fill(user.image)
  }

  console.log("-- inputting: ", url)
  await page.getByPlaceholder(GEN_CARD_INPUT_PLACEHOLDER).fill(url)

  console.log("-- clicking generate button")
  await page.locator("#generate-card").click()

  console.log("-- waiting card generated")
  await page.waitForFunction(() => {
    return (
      document.getElementById("card-render-status")?.innerText ===
      "renderedMindmap"
    )
  })

  console.log("-- clicking download button")
  const downloadingPromise = page.waitForEvent("download")
  await page.locator("#download-card").click()

  console.log("-- downloading triggered")
  /**
   * downloading instruction:
   * 1. https://github.com/microsoft/playwright/issues/23936#issuecomment-1611082093
   * 2. https://stackoverflow.com/a/77583627/9422455
   */
  const download = await downloadingPromise
  console.log("-- downloading started")

  const fileName = download.suggestedFilename()
  console.log(`-- downloading File(name=${fileName})`)
  const stream = await download.createReadStream()
  stream.on("close", async () => {
    console.log("-- streaming closed, closing page")
    await browser.close()
  })

  return { success: true, data: { fileName, stream } }
}

export const downloadCardAction = async (
  url: string,
  user?: IUserSummary,
  type: "playwright" | "puppet" = "playwright",
): Promise<IApi<{ fileName: string; stream: internal.Readable }>> => {
  console.log("-- downloading card of url: ", url)

  switch (type) {
    case "playwright":
      return downloadCardViaPlaywright(url, user)

    case "puppet":
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      console.log("-- visiting")
      await page.goto(`${env.NEXT_PUBLIC_APP_URL}/card/gen`)
      await page.locator("#card-input-url").fill(url)
      await page.waitForFunction(async () => {
        return (
          document.getElementById("card-render-status")?.innerText ===
          "renderedMindmap"
        )
      })
      await page.locator("#download-card").click()

    default:
      return { success: false }
  }
}
