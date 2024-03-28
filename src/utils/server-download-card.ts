"use server"

import path from "path"
import { chromium } from "playwright"
import internal from "stream"
import { IApi } from "../../packages/common-api/schema"
import { GEN_CARD_INPUT_PLACEHOLDER } from "../config/card"
import { env } from "../env"

export const downloadCardFromServer = async (
  url: string,
  // type: "buffer" | "download",
) => {
  const browser = await chromium.launch({}) // Or 'firefox' or 'webkit'.

  const downloadsPath = "/tmp"
  console.log({ downloadsPath })

  console.log("-- parsed url: ", url)
  console.log("-- to open new page")
  const page = await browser.newPage({
    screen: {
      width: 600,
      height: 2000,
    },
  })

  return new Promise<IApi<{ fileName: string; stream: internal.Readable }>>(
    async (resolve, reject) => {
      page.on("download", async (download) => {
        console.log("-- download: ", download)

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
      console.log("-- to visit targetUrl: ", targetUrl)
      await page.goto(targetUrl)
      console.log("-- to input: ", url)
      await page.getByPlaceholder(GEN_CARD_INPUT_PLACEHOLDER).fill(url)
      console.log("-- to click generate button")
      await page.getByRole("button", { name: /generate/i }).click()
      await page.waitForFunction(() => {
        const h = document.getElementById("card-media")?.clientHeight
        return !!h && h > 0
      })

      console.log("-- to click download button")
      await page
        .getByRole("button", { name: /download/i })
        .click({ timeout: 3000 })
    },
  )
}
