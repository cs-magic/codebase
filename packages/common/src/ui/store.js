import { atom } from "jotai";
/**
 * alert dialog for loading
 */
export const uiLoadingAlertDialogAtom = atom(false);
/**
 * main-area
 */
export const uiScreenAtom = atom({ width: 0, height: 0 });
/**
 * alert dialog with content
 */
export const uiAlertDialogOpen = atom(false);
export const uiAlertDialogContent = atom("");
export const openAlertDialogAtom = atom(null, (get, set, content) => {
    set(uiAlertDialogOpen, true);
    set(uiAlertDialogContent, content);
});
export const uiMobileSidebarOpen = atom(false);
export const uiInnerHeight = atom(null);
export const uiViewportHeight = atom(null);
export const isSoftKeyboardOn = atom((get) => (get(uiInnerHeight) ?? 0) < get(uiScreenAtom).height);
