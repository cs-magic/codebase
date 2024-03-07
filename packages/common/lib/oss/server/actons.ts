"use server"

import { oss } from "./config"

export const getOssSignatureUrl = async (id: string) =>
  oss.signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
    // expires: 0, // default 1800
  })
