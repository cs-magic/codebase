export const parseUrlFromWechatUrlMessage = (text) => {
    const m = /<url>(.*?)<\/url>/.exec(text);
    return m?.[1] ?? null;
};
export const parseTitleFromWechatUrlMessage = (text) => {
    const m = /<title>(.*?)<\/title>/.exec(text);
    return m?.[1] ?? null;
};
