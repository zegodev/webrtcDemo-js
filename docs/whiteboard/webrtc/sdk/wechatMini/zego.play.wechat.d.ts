import { Logger } from "../common/zego.logger";
import { ZegoStreamCenterWechat } from "./zego.streamcenter.wechat";
import { ZegoDataReport } from "../common/zego.datareport";
/**
 ZegoPlayer
 */
export declare class ZegoPlayWechat {
    urls: string[];
    streamid: string;
    playUrlIndex: number;
    playUrlTryCount: number;
    currentUrl: any;
    reconnectCount: number;
    state: number;
    logger: Logger;
    reconnectLimit: number;
    streamCenter: ZegoStreamCenterWechat;
    sourceType: number;
    playerType: number;
    params: any;
    playerSeq: number;
    publishQualitySeq: number;
    publishQualityCount: number;
    publishQulaityMaxCount: number;
    everSuccess: boolean;
    dataReport: ZegoDataReport;
    playerInfo: any;
    playerLogUploadTime: number;
    constructor(logger: Logger, streamid: string, urls: string[], params: any, reconnectLimit: number, streamcenter: ZegoStreamCenterWechat, sourceType: number, playerType: number, dataReport: ZegoDataReport);
    resetPlayer(): void;
    newPlayer(): boolean;
    stopPlayer(): void;
    tryStartPlayer(errorCode: any): void;
    shouldRetryPlay(event: any): boolean;
    isPlayFailed(event: any): boolean;
    shouldRetryPublish(event: any): boolean;
    isPublishFailed(event: any): boolean;
    updateEvent(event: any): void;
    updatePlayerNetStatus(event: any): void;
    getCurrentPlayerUrl(): string;
    reportQualityStatics(this: any): void;
}
