import { atom } from "jotai"
import { payloads } from "wechaty-puppet"
import { IUser } from "./bot.utils"

export const botSocketOpenedAtom = atom(false)

export const botScanValueAtom = atom("")
export const botUserAtom = atom<IUser | null>(null)
export const botContactsAtom = atom<payloads.Contact[] | null>(null)
export const botLoggedInAtom = atom(false)
export const botLoggingAtom = atom(false)

export enum ScanStatus {
  Unknown = 0,
  Cancel = 1,
  Waiting = 2,
  Scanned = 3,
  Confirmed = 4,
  Timeout = 5,
}

export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown)
export const botScanningAtom = atom(false)
