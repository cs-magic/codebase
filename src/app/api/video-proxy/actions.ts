"use server"

import axios from "axios"
import { promises } from "fs"
import { request } from "undici"
import { sampleXiaoHongShuVideoUrl } from "../../../config/system"

const fetchArrayBuffer = async (
  lib: "fetch" | "undici" | "axios",
): Promise<ArrayBuffer> => {
  const url = sampleXiaoHongShuVideoUrl

  const headers = {
    Host: "sns-video-al.xhscdn.com",
  }

  switch (lib) {
    case "fetch":
      const fetchReq = await fetch(url, { headers })
      console.log("-- fetch req headers: ", fetchReq.headers)
      return await fetchReq.arrayBuffer()

    case "undici":
      const unidiciReq = await request(url, { headers })
      console.log("-- undici req headers: ", unidiciReq.headers)
      return await unidiciReq.body.arrayBuffer()

    case "axios":
      const axiosReq = await axios.get(url, {
        headers,
        responseType: "arraybuffer",
      })
      console.log("-- axios req headers: ", axiosReq.request)
      console.log("-- axios res headers: ", axiosReq.headers)
      return axiosReq.data
  }
}

export const fetchXiaohongshuVideo = async (
  lib: "fetch" | "undici" | "axios",
) => {
  const arrayBuffer = await fetchArrayBuffer(lib)

  await promises.writeFile("data.mp4", Buffer.from(arrayBuffer))

  console.log("-- wrote")
}

void fetchXiaohongshuVideo("axios")
