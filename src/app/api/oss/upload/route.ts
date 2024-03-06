import { NextRequest, NextResponse } from "next/server"
import { oss } from "packages/common/lib/oss/config"
import { IApi } from "packages/common/schema/api"
import { v4 } from "uuid"

export async function GET(request: NextRequest): Promise<NextResponse<IApi>> {
  const id = v4()
  const signatureUrl = oss.signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
  })
  console.log("[OSS] get signature url: ", signatureUrl)
  return NextResponse.json({ success: true, data: { signatureUrl } })
}
