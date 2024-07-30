// import { customAlphabet } from "nanoid"
import { ID_LEN } from "../const.js"

/**
 * todo: pass test on nano import
 */
export const genNanoId = async (n = ID_LEN) => {
  const { customAlphabet } = await import("nanoid")

  return customAlphabet(
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    ID_LEN,
  )(n)
}
