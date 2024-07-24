import { IUserSummary } from "@cs-magic/common"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const cardUserIdAtom = atom("")
// atomWithStorage("card.user.id", "")

export const cardUserAvatarAtom = atom("")
// atomWithStorage("card.user.avatar", "")

export const cardUserNameAtom = atom("")
// atomWithStorage("card.user.name", "")

export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}))
