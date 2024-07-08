import { ERR_MSG_NotImplemented, ERR_MSG_Unexpected } from "../const.js"

export class UnexpectedError extends Error {
  constructor() {
    super(ERR_MSG_Unexpected)
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super(ERR_MSG_NotImplemented)
  }
}
