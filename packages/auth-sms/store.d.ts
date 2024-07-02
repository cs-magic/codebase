import { SmsProviderType, SmsStage } from "./schema";
export declare const smsProviderTypeAtom: import("jotai").WritableAtom<SmsProviderType, [SmsProviderType | typeof import("jotai/utils").RESET | ((prev: SmsProviderType) => SmsProviderType | typeof import("jotai/utils").RESET)], void>;
export declare const smsStageAtom: import("jotai").PrimitiveAtom<SmsStage> & {
    init: SmsStage;
};
export declare const userPhoneAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const smsCodeAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const smsCodeToCountdownSecondsAtom: import("jotai").WritableAtom<number, [number | typeof import("jotai/utils").RESET | ((prev: number) => number | typeof import("jotai/utils").RESET)], void>;
export declare const smsCodeCurCountdownSecondsAtom: import("jotai").PrimitiveAtom<number> & {
    init: number;
};
export declare const smsCodeExpireSecondsAtom: import("jotai").PrimitiveAtom<number> & {
    init: number;
};
export declare const smsCodeSentOKAtom: import("jotai").PrimitiveAtom<Nullable> & {
    init: Nullable;
};
export declare const smsSendCodePayloadAtom: import("jotai").Atom<{
    phone?: any;
}>;
export declare const smsSignInPayloadAtom: import("jotai").Atom<{
    phone?: any;
} & {
    code: string;
}>;
