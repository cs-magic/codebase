"use server"

import { ICardBody } from "@/schema/card"
import { promises } from "fs"
import * as path from "path"
import { deserialize } from "../common-utils/io"
import { IXiaoHongShuNotePageData } from "./schema"
import { fileURLToPath } from "url"
import { dirname } from "path"

/**
 * approach 1 (via meta parse):
 *   const root = parse(data)
 *
 *   const description = root
 *     .querySelector('meta[name="description"]')
 *     ?.getAttribute("content")
 *
 *   const title = root
 *     .querySelector('meta[name="og:title"]')
 *     ?.getAttribute("content")
 *     ?.replace(" - 小红书", "")
 *
 *   const images = root
 *     .querySelectorAll('meta[name="og:image"]')
 *     .map((r) => r.getAttribute("content")!)
 *
 *   const video = root
 *     .querySelector('meta[name="og:video"]')
 *     ?.getAttribute("content")
 *
 * approach 2 (via server json):
 *
 * @param url
 */
export const parseXiaoHongShuPage = async (
  url: string,
): Promise<Partial<ICardBody>> => {
  console.log({ url })

  const res = await fetch(url, {
    headers: {
      "User-Agent": "PostmanRuntime/7.36.3", // 不加的话会提示系统版本过低
    },
  })

  const html = await res.text()
  const jsonData = /window.__INITIAL_STATE__\s*=\s*(.*?)\s*<\/script>/.exec(
    html,
  )

  const answer: ICardBody = {
    sourceUrl: url,
  }

  if (jsonData) {
    const data = deserialize(jsonData[1]!) as IXiaoHongShuNotePageData
    // console.log(JSON.stringify(data.note, null, 2))
    const note = data.note.noteDetailMap[data.note.firstNoteId]?.note
    // console.log("note: ", JSON.stringify(note, null, 2))

    if (note) {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = dirname(__filename)
      // console.log(JSON.stringify(note, null, 2))
      await promises.writeFile(
        path.join(__dirname, "note.json"),
        JSON.stringify(note, null, 2),
      )

      answer.content = `# ${note.title}\n\n${note.desc}\n\n`
      answer.videos = note.video.media.stream.h264.map((v) => ({
        url: `/api/video-proxy?url=${v.masterUrl}`,
        height: v.height,
        width: v.width,
      }))
      console.log("images: ", JSON.stringify(note.imageList, null, 2))
      answer.images = note.imageList.map((i) => ({
        url: i.urlDefault,
        width: i.width,
        height: i.height,
      }))
    }
  }

  console.log("answer: ", JSON.stringify(answer, null, 2))
  return answer
}
