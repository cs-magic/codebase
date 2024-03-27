import { ISubAppIcon } from "@/components/header-app"
import { IMode, ModeType } from "@/schema/scenario"

export const config = {
  website: {
    title: "CS魔法社 P01",
  },
}

export const modes: Record<ModeType, IMode> = {
  text: { id: "text", label: "文" },
  image: { id: "image", label: "图" },
  sound: { id: "sound", label: "音" },
  video: { id: "video", label: "视频" },
}
/**
 * todo: images
 */
export const subAppsIcons: ISubAppIcon[] = [
  {
    id: "tt",
    Cover: "/apps/eval-ai.png",
    title: "AI 评测",
    enabled: true,
  },

  {
    id: "diagram",
    Cover: "/apps/sokka-ai.png",
    title: "AI 导图",
    enabled: false,
  },

  // { id: "tt", fromMode: "text", toMode: "text", Cover: Text2TextAppSVG, title: "文生文" },
  // { id: "ti", fromMode: "text", toMode: "image", Cover: Text2ImageAppSVG , title:"问生图"},
  // { fromMode: "image", toMode: "text" },
  // { fromMode: "text", toMode: "sound" },
  // { fromMode: "image", toMode: "sound" },
  // { fromMode: "sound", toMode: "text" },
  // { fromMode: "sound", toMode: "image" },
  // { fromMode: "text", toMode: "video" },
  // { fromMode: "image", toMode: "video" },
  // { fromMode: "sound", toMode: "video" },
  // { fromMode: "video", toMode: "text" },
  // { fromMode: "video", toMode: "image" },
  // { fromMode: "video", toMode: "sound" },
  // { fromMode: "video", toMode: "video" },
]
export const sampleXiaoHongShuVideoUrl =
  // "https://sns-video-al.xhscdn.com/stream/110/259/01e5f031772b1784010370038e32417132_259.mp4"
  "https://sns-video-al.xhscdn.com/stream/110/258/01e5f031772b1784010370038e32416831_258.mp4"
export const sampleLocalVideoUrl = "/demo.mp4"
