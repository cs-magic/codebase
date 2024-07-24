"use server"

import { initAliOss } from "./config.js"

export const getOssSignatureUrl = async (id: string) =>
  initAliOss().signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
    // expires: 0, // default 1800
  })

export const checkOssObjectExists = async (id: string) => {
  try {
    await initAliOss().head(id)
    return true
  } catch (e) {
    return false
  }
}
