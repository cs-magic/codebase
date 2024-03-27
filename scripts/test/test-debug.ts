import _debug from "debug"

const debug = _debug("hello")

const error = new Error("failed")
debug(error)
