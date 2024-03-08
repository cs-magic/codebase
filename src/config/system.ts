import { ISubAppIcon } from "@/components/header-app"
import { IMode, ModeType } from "@/schema/scenario"
import { env } from "../env"

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
