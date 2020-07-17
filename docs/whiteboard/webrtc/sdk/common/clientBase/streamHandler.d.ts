import { SocketCenter } from "./socketCenter";
import { StateCenter } from "./stateCenter";
import { CdnPushConfig } from "../zego.entity";
import { Logger } from "../zego.logger";
export declare class StreamHandler {
    private logger;
    private socketCenter;
    private stateCenter;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter);
    setCDNInfo(streamInfo: {
        urls_flv: string;
        urls_hls: string;
        urls_rtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    onStreamUpdated(type: number, streamList: any[]): void;
    onStreamExtraInfoUpdated(streamList: any[]): void;
    handleStreamStart(lastRunState: number, msg: any): void;
    onPublishStateUpdate(type: number, streamId: string, error: {
        code: string;
        msg: string;
    } | number): void;
    updateStreamInfo(streamid: string, cmd: string | number, stream_extra_info?: string, error?: Function): void;
    handleStreamUpdateRsp(msg: any): void;
    handleFetchStreamListRsp(msg: any): void;
    private handleFullUpdateStream;
    handlePushStreamUpdateMsg(msg: any): void;
    private handleAddedStreamList;
    private handleDeletedStreamList;
    private handleUpdatedStreamList;
    private fetchStreamList;
    makeCallbackStreamList(streamList: any[]): any[];
    updateMixStream(mixStreamConfig: any, successCallback: any, errorCallback: any): boolean;
    publishTarget(cdnPushConfig: CdnPushConfig, success: Function, error: Function): void;
    stopMixStream(mixStreamConfig: any, successCallback: any, errorCallback: any): boolean;
    updateStreamExtraInfo(streamid: string, extraInfo: string): boolean;
}
