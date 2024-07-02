export interface IXiaoHongShuNotePageData {
    global: object;
    user: object;
    login: object;
    feed: object;
    layout: object;
    search: object;
    activity: object;
    note: {
        firstNoteId: string;
        noteDetailMap: Record<string, {
            comments: object;
            currentTime: number;
            note: {
                height: number;
                width: number;
                imageList: {
                    infoList: {
                        imageScene: string;
                        url: string;
                    }[];
                    width: number;
                    height: number;
                    url: string;
                    urlPre: string;
                    urlDefault: string;
                }[];
                title: string;
                desc: string;
                interactInfo: {
                    relation: "none";
                    liked: boolean;
                    likedCount: string;
                    collected: boolean;
                    collectedCount: string;
                    commentCont: string;
                    shareCount: string;
                    followed: boolean;
                };
                ipLocation: string;
                tagList: {
                    id: string;
                    name: string;
                    type: string;
                }[];
                video: {
                    image: {
                        thumbnailFileid: string;
                        firstFrameFileid: string;
                    };
                    media: {
                        videoId: number;
                        video: {
                            streamTypes: number[];
                        };
                        stream: {
                            h264: [
                                {
                                    masterUrl: string;
                                    videoDuration: number;
                                    qualityType: "HD";
                                    size: number;
                                    backupUrls: string[];
                                    height: number;
                                    width: number;
                                }
                            ];
                            h265: [];
                            av1: [];
                        };
                    };
                };
            };
        }>;
    };
    nioStore: object;
    notification: object;
    redMoji: object;
}
