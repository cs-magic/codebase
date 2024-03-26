export interface IBilibiliVideoDetail {
  View: {
    bvid: string
    aid: number
    cid: number
    videos: number
    pic: string // cover
    title: string
    desc: string
    owner: {
      mid: string
      name: string
      face: string
    }
    stat: {
      aid: number
      view: number
      danmaku: number
      reply: number
      favorite: number
      coin: number
      share: number
      now_rank: number
      his_rank: number
      like: number
      dislike: number
      evaluation: string
      vt: number
    }
  }
}

export interface IBilibiliVideo {
  url: string
  title?: string
  width?: number // default: 1080, w>=420的时候有调控选项
  height?: number // default: 720
  enableDanmu?: number // 0: disable; 1: enable; default: 0
  enableHighQuality?: number // 0: disable; 1: enable; default: 1
}

export type BilibiliDisplayType = "video" | "cover" | "gif"
