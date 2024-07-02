/**
 * 充分性：检测客户端是否已经准备好
 * 必要性：否则会导致一些ssr问题
 */
export declare const useMounted: () => boolean;
