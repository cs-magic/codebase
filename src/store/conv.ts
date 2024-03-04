import { atom } from "jotai"

import { IConvSummary } from "@/schema/conv"
import { convDetailAtom } from "@/store/conv.immer"

export const convsAtom = atom<IConvSummary[]>([])
export const convIdAtom = atom((get) => get(convDetailAtom)?.id)
