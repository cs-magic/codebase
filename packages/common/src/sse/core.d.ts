export declare const fetchSSE: (requestUrl: string, options?: {
    onOpen?: () => void;
    onData?: (data: string) => void;
    onError?: (data: string) => void;
    onOutput?: (output: string) => void;
    onFinal?: (sse: EventSource) => void;
}) => EventSource;
