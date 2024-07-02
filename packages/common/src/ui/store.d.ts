import { IDimension } from "./schema";
/**
 * alert dialog for loading
 */
export declare const uiLoadingAlertDialogAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
/**
 * main-area
 */
export declare const uiScreenAtom: import("jotai").PrimitiveAtom<IDimension> & {
    init: IDimension;
};
/**
 * alert dialog with content
 */
export declare const uiAlertDialogOpen: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const uiAlertDialogContent: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const openAlertDialogAtom: import("jotai").WritableAtom<null, [content: string], void> & {
    init: null;
};
export declare const uiMobileSidebarOpen: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const uiInnerHeight: import("jotai").PrimitiveAtom<number | null> & {
    init: number | null;
};
export declare const uiViewportHeight: import("jotai").PrimitiveAtom<number | null> & {
    init: number | null;
};
export declare const isSoftKeyboardOn: import("jotai").Atom<boolean>;
