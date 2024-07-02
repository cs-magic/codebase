import { customAlphabet } from "nanoid";
import { ID_LEN } from "../const";
/**
 * todo: pass test on nano import
 */
export const genNanoId = (n = ID_LEN) => customAlphabet("1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", ID_LEN)(n);
