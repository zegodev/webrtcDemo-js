declare class ILogger {
    private appid;
    private userid;
    private roomid;
    private version;
    private platform;
    private isProd;
    private logCacheSend;
    private logCacheMax;
    private websocket;
    constructor(platform: string);
    init(appid: number, userid: string, version: string, isProd: boolean): void;
    debug(...values: any[]): void;
    info(...values: any[]): void;
    warn(...values: any[]): void;
    error(...values: any[]): void;
    private log;
    private openLogServer;
    private stopWebSocketServer;
    private remoteWebSocketLog;
    private logParamList;
}
export declare function getLogAction(tag: string, action: string): string;
export declare const Logger: ILogger;
export {};
