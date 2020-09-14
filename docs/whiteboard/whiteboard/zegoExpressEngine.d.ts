import './view/assets/index.css';
import './view/assets/polyfill';
import { ZegoClient as ZegoWebrtc } from '../webrtc/sdk/webrtc/zego.client.web';
export declare enum ENUM_LOG_LEVEL {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    report = 99,
    disable = 100,
}
export interface Config {
    appid: number;
    server: string | string[];
    idName: string;
    nickName: string;
    logLevel: ENUM_LOG_LEVEL;
    logUrl: string;
    audienceCreateRoom: boolean;
    remoteLogLevel: ENUM_LOG_LEVEL;
}
export declare class ZegoClient extends ZegoWebrtc {
    private getRoom;
    private onRemotePush;
    private loginTimes;
    private baseManager;
    constructor();
    config(option: Config): boolean;
    login(roomid: string, role: number, token: string, success: any, error: any): void;
    on(event: any, callBack: any): any;
    off(event: any, callBack: any): any;
    getVersion(): string;
}
