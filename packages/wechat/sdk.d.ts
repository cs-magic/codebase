export declare class WechatSDK {
    private token?;
    private ticket?;
    private getToken;
    private _getTicket;
    getSignature(url: string): Promise<any>;
}
