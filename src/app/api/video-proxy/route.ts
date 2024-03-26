import { NextRequest, NextResponse } from "next/server"
import fetch from "node-fetch"
import { sampleXiaoHongShuVideoUrl } from "../../../config/system"

/**
 * ref: https://chat.openai.com/c/a9684099-c18c-410b-a0ff-ffe418f41283
 * @constructor
 */
export async function GET(req: NextRequest) {
  // const videoUrl = "http://localhost:3000/demo.mp4"
  const videoUrl = sampleXiaoHongShuVideoUrl

  try {
    console.log("-- fetching")

    // 使用fetch转发请求到视频URL，添加必要的请求头
    const videoResponse = await fetch(videoUrl, {
      headers: {
        Host: "sns-video-al.xhscdn.com",
      },
    })
    console.log("-- response: ", videoResponse)

    // 检查响应是否成功
    if (!videoResponse.ok) {
      throw new Error(`服务器响应错误: ${videoResponse.statusText}`)
    }

    // 创建一个NextResponse对象来转发视频流
    return new NextResponse(videoResponse.body, {
      status: videoResponse.status,
      statusText: videoResponse.statusText,
      headers: videoResponse.headers,
    })
  } catch (error) {
    console.error("视频代理请求失败:", error)
    return new NextResponse("代理请求失败", { status: 500 })
  }
}
