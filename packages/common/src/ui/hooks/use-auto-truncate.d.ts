import { RefObject } from "react";
/**
 * 自动根据是否溢出确定字符
 *
 * const {content} = useAutoTruncate(ref, init, {step, maxLen, ellipse})
 *
 * @param refText
 * @param initContent
 * @param options
 */
export declare const useAutoTruncate: ({ refText, initContent, options, }: {
    refText: RefObject<HTMLDivElement>;
    initContent: string;
    options?: {
        step?: number;
        maxLen?: number;
        ellipse?: string;
    };
}) => {
    content: string;
};
