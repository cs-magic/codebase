import { IUser } from "@cs-magic/wechaty/schema/bot";
import { atom } from "jotai";

export const botSocketOpenedAtom = atom(false);

export const botScanValueAtom = atom("");
export const botUserAtom = atom<IUser | null>(null);
export const botLoggedInAtom = atom(false);
export const botLoggingAtom = atom(false);

export enum ScanStatus {
  Unknown = 0,
  Cancel = 1,
  Waiting = 2,
  Scanned = 3,
  Confirmed = 4,
  Timeout = 5,
}

export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown);
export const botScanningAtom = atom(false);
