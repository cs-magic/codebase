import { atom } from "jotai"
import { TransportType } from "./schema"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
