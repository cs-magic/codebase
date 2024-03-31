export interface IXiaoHongShuNotePageData {
  global: object
  user: object
  login: object
  feed: object
  layout: object
  search: object
  activity: object
  note: {
    firstNoteId: string // use this to retrieve detail from `noteDetailMap`, e.g, 65f11790000000000d00cd04
    noteDetailMap: Record<
      string,
      {
        comments: object
        currentTime: number
        note: {
          height: number
          width: number
          imageList: {
            infoList: {
              imageScene: string
              url: string
            }[]
            width: number
            height: number
            url: string // ''
            urlPre: string // 初始加载（模糊）
            urlDefault: string
          }[]
          title: string
          desc: string
          interactInfo: {
            relation: "none"
            liked: boolean
            likedCount: string // 1k+
            collected: boolean
            collectedCount: string // 100+
            commentCont: string //10+
            shareCount: string // 7
            followed: boolean
          }
          ipLocation: string // e.g. 山东
          tagList: {
            id: string
            name: string
            type: string // fixed: topic
          }[]

          video: {
            image: {
              thumbnailFileid: string
              firstFrameFileid: string // todo: concat raw url
            }
            media: {
              videoId: number
              video: {
                streamTypes: number[] // e.g. [258], maybe responsible for media w/h
              }
              stream: {
                h264: [
                  {
                    masterUrl: string
                    videoDuration: number
                    qualityType: "HD"
                    size: number
                    backupUrls: string[]
                    height: number // <--
                    width: number // <--
                  },
                ]
                h265: []
                av1: []
              }
            }
          }
        }
      }
    >
    // others
  }
  nioStore: object
  notification: object
  redMoji: object
}
