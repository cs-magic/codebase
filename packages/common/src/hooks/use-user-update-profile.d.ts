/**
 * 充分性：更新用户头像
 * 必要性：可能会在多个场景下更新，比如用户首次登录、用户面板
 */
export declare const useUserUpdateProfile: () => () => Promise<import("next-auth/react").SignInResponse | {
    ok: boolean;
} | undefined>;
