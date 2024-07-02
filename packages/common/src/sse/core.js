import { formatError } from "@cs-magic/common/utils/format-error";
import { logger } from "@cs-magic/log/logger";
export const fetchSSE = (requestUrl, options) => {
    /**
     * sse 要自己控制关闭，https://stackoverflow.com/a/54385424/9422455
     */
    const sse = new EventSource(requestUrl);
    const doEnd = () => {
        if (options?.onFinal)
            options.onFinal(sse);
        sse.close();
    };
    sse.onopen = () => {
        if (options?.onOpen)
            options.onOpen();
        logger.info("[sse] opened");
    };
    sse.addEventListener("data", (ev) => {
        logger.info("[sse] onData: %o", ev);
        if (options?.onData)
            options.onData(JSON.parse(ev.data));
    });
    /**
     * todo: error 占用了系统的 error 通道?
     */
    sse.addEventListener("error", (ev) => {
        formatError(ev);
        if (options?.onError)
            options.onError(typeof ev.data === "string"
                ? JSON.parse(ev.data)
                : ev.data);
        doEnd();
    });
    sse.onerror = (err) => {
        // 2 是结束
        if (err.eventPhase !== 2)
            console.warn(`event source error: `, err);
        else
            logger.info("[sse] closed");
        doEnd();
    };
    return sse;
};
