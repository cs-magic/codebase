import "ulog";
import anylogger from "anylogger";
/**
 * ref: https://github.com/Download/ulog
 * @param loggerName
 */
export const getLogger = (loggerName) => {
    const log = anylogger(loggerName);
    // log("Logging is easy!")
    return log;
};
export const uLogger = getLogger("default");
