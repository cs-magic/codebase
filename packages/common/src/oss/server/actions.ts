"use server"

import { oss } from "./config.js"

export const getOssSignatureUrl = async (id: string) =>
  oss.signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
    // expires: 0, // default 1800
  })

export const checkOssObjectExists = async (id: string) => {
  try {
    await oss.head(id)
    return true
  } catch (e) {
    return false
  }
}

// void checkOssObjectExists("p01/card/image.jpg").then(console.log)
