/**
 * 压缩微信链接长度，以保证二维码足够短
 *
 * @param options
 */
export declare const formatWxmpUrl: (options: {
    __biz: string;
    mid: string;
    idx: string;
    sn: string;
    chksm: string;
}) => string;
