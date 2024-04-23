"use server"

import axios from "axios"

import nodeFetch from "node-fetch"
import { request } from "undici"
import { FetchApproach } from "../../../../../../packages-to-classify/api-client/schema"
import { sampleXiaoHongShuVideoUrl } from "../../../../../../sample"

const fetchArrayBuffer = async (lib: FetchApproach): Promise<ArrayBuffer> => {
  console.log("-- fetching using: ", lib)

  const url = sampleXiaoHongShuVideoUrl

  const headers = { Host: "sns-video-al.xhscdn.com" }

  switch (lib) {
    case "fetch":
      const fetchReq = await fetch(url, { headers })
      console.log("-- fetch headers: ", fetchReq.headers)
      return await fetchReq.arrayBuffer()

    case "node-fetch":
      console.log("[node-fetch] before")
      const nodeFetchReq = await nodeFetch(url, {
        headers,
        // agent: proxyAgent,
      })
      console.log("[node-fetch] after")
      console.log("-- fetch headers: ", nodeFetchReq.headers)
      return await nodeFetchReq.arrayBuffer()

    case "undici":
      const unidiciReq = await request(url, { headers })
      console.log("-- undici headers: ", unidiciReq.headers)
      return await unidiciReq.body.arrayBuffer()

    case "axios":
      const axiosReq = await axios.get(url, {
        headers,
        responseType: "arraybuffer",
      })
      console.log("-- axios req: ", axiosReq.request)
      console.log("-- axios res headers: ", axiosReq.headers)
      return axiosReq.data
  }
}

// export const fetchXiaohongshuVideo = async (lib: FetchType) => {
//   const arrayBuffer = await fetchArrayBuffer(lib)
//
//   await promises.writeFile("data.mp4", Buffer.from(arrayBuffer))
//
//   console.log("-- wrote")
// }

// void fetchXiaohongshuVideo("fetch")
// void fetchXiaohongshuVideo("node-fetch")
