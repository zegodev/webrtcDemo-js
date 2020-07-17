import { ZegoStreamCenterWechat } from "./zego.streamcenter.wechat";
import { ZegoWebSocket } from "./zego.webSocket";
import { E_CLIENT_TYPE, ENUM_DISPATCH_TYPE, ENUM_PLAY_SOURCE_TYPE } from "../common/zego.entity";
import { BaseCenter } from "../common/clientBase/index";
export declare class ZegoClient extends BaseCenter {
    streamCenter: ZegoStreamCenterWechat;
    preferPlaySourceType: ENUM_PLAY_SOURCE_TYPE;
    preferPublishSourceType: ENUM_DISPATCH_TYPE;
    customCdnUrl: string;
    currentPlaySourceType: ENUM_DISPATCH_TYPE;
    mixStreamList: {
        [index: number]: any;
    };
    ultraPlaySourceType: string;
    constructor();
    getSocket(server: string): ZegoWebSocket;
    setPreferPlaySourceType(sourceType: number): boolean;
    setPreferPublishSourceType(sourceType: 1 | 0, customUrl?: string): boolean;
    startPlayingStream(streamid: any, stream_params: any): boolean;
    stopPlayingStream(streamid: any): boolean;
    startPublishingStream(streamid: string, stream_params?: string, extraInfo?: string): boolean;
    stopPublishingStream(streamid: any): boolean;
    updatePlayerState(streamid: any, event: any): void;
    updatePlayerNetStatus(streamid: any, event: any): void;
    startPlayingMixStream(mixStreamId: any, stream_params: any): boolean;
    stopPlayingMixStream(mixStreamId: any): boolean;
    startPlayingStreamFromCDN(streamid: any): boolean;
    startPlayingStreamFromBGP(this: any, streamid: any): boolean;
    fetchPublishStreamUrl(streamid: string): void;
    fetchPlayStreamUrl(streamid: any, urlType: any): void;
    updateStreamInfo(streamid: any, cmd: any, stream_extra_info?: any, error?: any): void;
    handleStreamUpdateRsp(msg: any): void;
    doPlayStream(streamid: any, streamUrls: any, sourceType: any): boolean;
    handleFetchStreamPublishUrlRsp(msg: any): void;
    handleFetchStreamUrlRsp(msg: any): void;
    doPublishStream(streamid: string, streamUrls: string[]): boolean;
    setCDNInfo(streamInfo: {
        urls_flv: string;
        urls_hls: string;
        urls_rtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    loginBodyData(): {
        "id_name": string;
        "nick_name": string;
        "role": 1 | 2;
        "token": string;
        "version": any;
        "room_name": string;
        "user_state_flag": number;
        "room_create_flag": number;
        "client_type": E_CLIENT_TYPE;
        third_token: string;
    };
    WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): void;
    static isSupportLive(sucCall: any, errCall: any): void;
}
