import { ERR_MSG_UNEXPECTED } from "../const"

export class UnexpectedError extends Error {
  constructor() {
    super(ERR_MSG_UNEXPECTED)
  }
}
