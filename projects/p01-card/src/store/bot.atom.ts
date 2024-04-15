import { WechatUser } from "@prisma/client";
import { atom } from "jotai";

export const botSocketOpenedAtom = atom(false);

export const botScanValueAtom = atom("");
export const botUserAtom = atom<WechatUser | null>(null);
export const botStatusAtom = atom<
  "to-login" | "logining" | "logined" | "logoff"
>("to-login");

export enum ScanStatus {
  Unknown = 0,
  Cancel = 1,
  Waiting = 2,
  Scanned = 3,
  Confirmed = 4,
  Timeout = 5,
}

export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown);
