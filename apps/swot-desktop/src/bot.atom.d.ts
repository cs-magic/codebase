import { payloads } from "wechaty-puppet";
export declare const botSocketOpenedAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const botScanValueAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const botUserAtom: import("jotai").PrimitiveAtom<any> & {
    init: any;
};
export declare const botContactsAtom: import("jotai").PrimitiveAtom<payloads.Contact[] | null> & {
    init: payloads.Contact[] | null;
};
export declare const botLoggedInAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const botLoggingAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare enum ScanStatus {
    Unknown = 0,
    Cancel = 1,
    Waiting = 2,
    Scanned = 3,
    Confirmed = 4,
    Timeout = 5
}
export declare const botScanStatusAtom: import("jotai").PrimitiveAtom<ScanStatus> & {
    init: ScanStatus;
};
export declare const botScanningAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
