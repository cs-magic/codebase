"use server"

import { chromium } from "playwright"
import internal from "stream"
import { IApi } from "../../packages/common-api/schema"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"
import { env } from "../env"
import { IUserSummary } from "../schema/user.summary"

export const downloadCardAction = async (url: string, user?: IUserSummary) =>
  new Promise<IApi<{ fileName: string; stream: internal.Readable }>>(
    async (resolve, reject) => {
      console.log("-- downloading card of url: ", url)

      console.log("-- opening browser")
      const browser = await chromium.launch({}) // Or 'firefox' or 'webkit'.

      console.log("-- opening page")
      const page = await browser.newPage({
        screen: {
          width: 600,
          height: 2000,
        },
      })

      page.on("download", async (download) => {
        // console.log("-- download: ", download)

        const fileName = download.suggestedFilename()
        // const filePath = path.join(downloadsPath, fileName)
        // await download.saveAs(filePath)

        console.log(`-- streaming File(name=${fileName})`)
        const stream = await download.createReadStream()
        stream.on("close", async () => {
          console.log("-- streaming closed, closing page")
          await browser.close()
        })

        resolve({ success: true, data: { fileName, stream } })
      })

      const targetUrl = `${env.NEXT_PUBLIC_APP_URL}/card/gen`
      console.log("-- visiting: ", targetUrl)
      await page.goto(targetUrl)

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
      await page.locator("#download-card").click()
      console.log("-- clicked")
    },
  )
