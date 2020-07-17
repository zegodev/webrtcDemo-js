import './view/assets/index.css';
import { ZegoClient as ZegoWebrtc } from '../../public/jZego-rtc-1.7.0';
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
