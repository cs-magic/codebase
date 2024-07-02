import { atom } from "jotai";
export const botSocketOpenedAtom = atom(false);
export const botScanValueAtom = atom("");
export const botUserAtom = atom(null);
export const botContactsAtom = atom(null);
export const botLoggedInAtom = atom(false);
export const botLoggingAtom = atom(false);
export var ScanStatus;
(function (ScanStatus) {
    ScanStatus[ScanStatus["Unknown"] = 0] = "Unknown";
    ScanStatus[ScanStatus["Cancel"] = 1] = "Cancel";
    ScanStatus[ScanStatus["Waiting"] = 2] = "Waiting";
    ScanStatus[ScanStatus["Scanned"] = 3] = "Scanned";
    ScanStatus[ScanStatus["Confirmed"] = 4] = "Confirmed";
    ScanStatus[ScanStatus["Timeout"] = 5] = "Timeout";
})(ScanStatus || (ScanStatus = {}));
export const botScanStatusAtom = atom(ScanStatus.Unknown);
export const botScanningAtom = atom(false);
