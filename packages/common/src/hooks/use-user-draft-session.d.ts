/**
 * 充分性：实时显示用户正在更新的昵称与头像
 * 必要性：使用hook维护多种状态
 * @param key
 */
export declare const useDraftSession: (key: "name" | "image") => {
    value: string | null | undefined;
    draft: string | null | undefined;
    changed: boolean;
    setDraft: (args_0: string | ((prev: string | null | undefined) => string | null | undefined) | null | undefined) => void;
};
