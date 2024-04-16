import { customAlphabet } from "nanoid"
import { ID_LEN } from "../const"

export const genId = (n = ID_LEN) =>
  customAlphabet(
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    ID_LEN,
  )(n)
