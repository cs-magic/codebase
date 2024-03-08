import { customAlphabet } from "nanoid"
import { ID_LEN } from "./config"

export const getNewId = (n = ID_LEN) =>
  customAlphabet(
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    ID_LEN,
  )(n)
