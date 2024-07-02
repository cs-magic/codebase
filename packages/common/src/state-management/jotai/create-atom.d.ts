export declare const createBoolStorageAtom: (name: string, init?: boolean, prefix?: string) => {
    atom: import("jotai").WritableAtom<boolean, [boolean | typeof import("jotai/utils").RESET | ((prev: boolean) => boolean | typeof import("jotai/utils").RESET)], void>;
    name: string;
};
