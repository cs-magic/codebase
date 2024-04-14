import { atom } from "jotai";

export const botScanValueAtom = atom("");

export enum ScanStatus {
  Unknown = 0,
  Cancel = 1,
  Waiting = 2,
  Scanned = 3,
  Confirmed = 4,
  Timeout = 5,
}

export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown);
