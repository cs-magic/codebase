import { atom } from "jotai/index"
import { IMessageInChat } from "@/schema/query-message"

export const messageTraceAtom = atom<IMessageInChat[]>([])
