import { atom } from "jotai"

import { IConvDetail, IConvSummary } from "@/schema/conv"
import { atomWithImmer } from "jotai-immer"

export const convsAtom = atom<IConvSummary[]>([])
export const convDetailAtom = atomWithImmer<IConvDetail | null>(null)
export const convIdAtom = atom((get) => get(convDetailAtom)?.id)
