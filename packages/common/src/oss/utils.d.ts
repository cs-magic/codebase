/**
 * based on ali oss, ref: https://help.aliyun.com/zh/oss/user-guide/resize-images-4
 * @param ossKeyWithSuffix
 * @param width
 * @param height
 */
export declare const getOssUrl: (ossKeyWithSuffix: string, params?: {
    width?: number;
    height?: number;
}) => string;
