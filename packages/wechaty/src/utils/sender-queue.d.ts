export type QueueTask = () => Promise<any>;
export declare class SenderQueue {
    static queue: QueueTask[];
    static processing: boolean;
    static qps: number;
    constructor(qps?: number);
    get cnt(): number;
    addTask(task: QueueTask): Promise<void>;
    private _runTask;
}
