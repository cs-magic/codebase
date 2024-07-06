import { atom } from "jotai"

import { TransportType } from "./schema.js"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
