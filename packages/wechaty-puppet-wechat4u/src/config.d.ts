/// <reference path="types.d.ts" />
import { log } from 'wechaty-puppet';
import { FileBox } from 'file-box';
declare const VERSION: any;
declare const NAME: any;
export declare function qrCodeForChatie(): FileBox;
export declare function retry<T>(retryableFn: (retry: (error: Error) => never, attempt: number) => Promise<T>): Promise<T>;
export { VERSION, NAME, log, };
