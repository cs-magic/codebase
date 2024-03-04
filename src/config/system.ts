import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"
import { IMode, ModeType } from "@/schema/scenario"
import { ISubAppIcon } from "@/components/header-app"

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
  { id: "tt", fromMode: "text", toMode: "text", Cover: Text2TextAppSVG },
  { id: "ti", fromMode: "text", toMode: "image", Cover: Text2ImageAppSVG },
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
