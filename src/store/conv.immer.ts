import { atomWithImmer } from "jotai-immer"
import { IConvDetail } from "@/schema/conv"

export const convDetailAtom = atomWithImmer<IConvDetail | null>(null)
