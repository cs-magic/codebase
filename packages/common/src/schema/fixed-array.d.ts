export declare class FixedArray<T> extends Array<T> {
    private maxSize;
    constructor(size?: number);
    push(...items: T[]): number;
}
