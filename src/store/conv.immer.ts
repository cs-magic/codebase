import { atomWithImmer } from "jotai-immer"
import { IConvDetail } from "@/schema/conv"
import { atom } from "jotai"

export const convDetailAtom = atomWithImmer<IConvDetail | null>(null)
