"use server"

import axios from "axios"
import { promises } from "fs"
import { request, ProxyAgent, setGlobalDispatcher } from "undici"
import { sampleXiaoHongShuVideoUrl } from "../../../config/system"
import { env } from "process"

import nodeFetch from "node-fetch"
import HttpsProxyAgent from "https-proxy-agent"

const proxy = env.https_proxy
console.log({ proxy })
//
// if (proxy) {
//   // Corporate proxy uses CA not in undici's certificate store
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
//   const dispatcher = new ProxyAgent({
//     uri: new URL(proxy).toString(),
//   })
//   setGlobalDispatcher(dispatcher)
// }

export type FetchType = "fetch" | "node-fetch" | "undici" | "axios"

// const proxyAgent = HttpsProxyAgent("http://localhost:5050")

const fetchArrayBuffer = async (lib: FetchType): Promise<ArrayBuffer> => {
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

export const fetchXiaohongshuVideo = async (lib: FetchType) => {
  const arrayBuffer = await fetchArrayBuffer(lib)

  await promises.writeFile("data.mp4", Buffer.from(arrayBuffer))

  console.log("-- wrote")
}

void fetchXiaohongshuVideo("fetch")
// void fetchXiaohongshuVideo("node-fetch")
