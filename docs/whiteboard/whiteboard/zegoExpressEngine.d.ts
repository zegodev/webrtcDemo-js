import { ZegoClient as ZegoWebrtc } from '../webrtc/sdk/webrtc/zego.client.web';
export declare const PROTO_VERSION: any;
export declare class ZegoClient extends ZegoWebrtc {
    private getRoom;
    private onRemotePush;
    private loginTimes;
    private baseManager;
    constructor();
    login(roomid: string, role: number, token: string, success: any, error: any): void;
    on(event: any, callBack: any): any;
    off(event: any, callBack: any): any;
    getVersion(): string;
}
