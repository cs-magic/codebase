export type ScenarioType =
  | "text2text"
  | "text2image"
  | "text2video"
  | "text2music"
  | "image2image"
export type ModeType = "text" | "image" | "sound" | "video"
export type IMode = { label: string; id: ModeType }
