/**
 * 从 消息 中解析出被引用的数据
 *
 * @param messageText
 * @param version
 */
export declare const deserializeMsg: (messageText: string, version?: PuppetVersion) => {
    userName: string;
    content: string;
    quoted: any;
} | null;
