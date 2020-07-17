/**
 ZegoStreamCenter
 */
/// <reference path="../common/ZegoStreamCenter.d.ts" />
import { ZegoStreamCenter } from "../common/ZegoStreamCenter";
import { LoggerWechat } from "./zego.logger.wx";
import { ZegoDataReport } from "../common/zego.datareport";
import { StateCenter } from "../common/clientBase/stateCenter";
export declare class ZegoStreamCenterWechat extends ZegoStreamCenter {
    dataReport: ZegoDataReport;
    playerList: {};
    playerCount: number;
    logger: LoggerWechat;
    playingList: any[];
    publishingList: any[];
    eventSeq: number;
    streamEventMap: {};
    playerWaitingList: any[];
    playerStatistics: {};
    constructor(log: LoggerWechat, stateCenter: StateCenter);
    updatePlayingState(streamid: string, streamParams?: any, start?: boolean): void;
    updatePublishingState(streamid: string, streamParams?: string, start?: boolean): void;
    updateStreamState(streamid: string, start: boolean, streamParams: string, streamList: Array<{
        streamid: string;
        params: string;
    }>): void;
    isPlaying(): boolean;
    isPublishing(): boolean;
    startPlayingStream(streamid: string, streamUrlList: string[], dispatchType?: 1 | 0): any;
    startPlayer(streamid: string, streamUrlList: string[], dispatchType: 2 | 1 | 0, playerType: number): any;
    stopPlayingStream(streamid: any): void;
    stopPlayer(streamid: any): void;
    startPublishingStream(streamid: string, streamUrlList: string[], dispatchType?: 2 | 1 | 0): any;
    stopPublishingStream(streamid: any): void;
    updatePlayerState(streamid: any, event: any): void;
    updatePlayerNetStatus(streamid: any, event: any): void;
    reset(): void;
    reportPublishEvent(streamid: string, error?: any): void;
    reportPlayEvent(streamid: string, error?: any): void;
    onPlayStateUpdate(type: any, streamid: any, error: any): void;
    onPlayQualityUpdate(streamid: any, streamQuality: any): void;
    onPublishStateUpdate(type: any, streamid: any, error: any): void;
    onPublishQualityUpdate(streamid: any, streamQuality: any): void;
    onPlayerStreamUrlUpdate(streamid: any, url: any, type: any): void;
    onVideoSizeChanged(streamid: any): void;
    onRemoteCameraStatusUpdate(streamID: string, status: number): void;
    onRemoteMicStatusUpdate(streamID: string, status: number): void;
    getReconnectLimit(sourceType: number): number;
    onPlayerStart(streamid: any, playerType: any): void;
    onPlayerStop(streamid: any, playerType: any, error: any): void;
    onPlayerRetry(streamid: any, playerType: any): void;
    onPlayerQuality(streamid: any, streamQuality: any, playerType: any): void;
    onStreamUrlUpdate(streamid: any, url: any, playerType: any): void;
    onPlayerVideoSizeChanged(streamid: any): void;
}
