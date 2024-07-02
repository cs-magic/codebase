export const getBilibiliIFrameUrl = (video) => {
    let url = "//player.bilibili.com/player.html";
    url += `?bvid=${video.bvid}&cid=794775520`;
    // url += `&cid=${cid}`
    url += `&danmaku=${video.enableDanmu ?? 0}`;
    url += `&high_quality=${video.enableHighQuality ?? 1}`;
    url += `&&autoplay=0`; // 禁止自动播放，ref: https://www.sunzhongwei.com/video-websites-embed-bilibili-iframe-code-video-disable-play-automatically
    return url;
};
