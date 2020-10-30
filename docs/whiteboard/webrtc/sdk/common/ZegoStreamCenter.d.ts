import { Logger } from "./zego.logger";
import { ERRO, PlayerInfo, StreamQuality, PublishInfo } from "./zego.entity";
import { StateCenter } from "./clientBase/stateCenter";
export declare abstract class ZegoStreamCenter {
    playerList: {
        [index: string]: PlayerInfo;
    };
    publisherList: {
        [index: string]: PublishInfo;
    };
    constructor(log: Logger, stateCenter: StateCenter);
    abstract stopPlayingStream(streamId: string): any;
    abstract reset(): any;
    abstract startPlayingStream(streamid: string, serverUrls: string[], currentPlaySourceType?: number): boolean;
    abstract startPublishingStream(streamid: string, serverUrls: string[], preferPublishSourceType?: number): any;
    abstract onPlayStateUpdate(type: 0 | 1 | 2, streamid: string, error: ERRO): any;
    abstract onPlayQualityUpdate(streamId: string, streamQuality: StreamQuality): any;
    abstract onPublishStateUpdate(type: 0 | 1 | 2, streamid: string, error: ERRO): any;
    abstract onPublishQualityUpdate(streamId: string, streamQuality: StreamQuality): any;
    abstract onPlayerStreamUrlUpdate(streamid: string, url: string, type: string): any;
    abstract onVideoSizeChanged(streamId: string, videoWidth: number, videoHeight: number): any;
    abstract onRemoteCameraStatusUpdate(streamID: string, status: number): any;
    abstract onRemoteMicStatusUpdate(streamID: string, status: number): any;
    abstract onSoundLevelUpdate(soundLevelList: Array<{
        streamID: string;
        soundLevel: number;
    }>): any;
    abstract onDeviceError(msg: {
        deviceName: string;
        deviceType: string;
        errorCode: number;
    }): any;
    abstract OnAudioDeviceStateChanged(msg: {
        deviceType: string;
        deviceInfo: any;
        state: string;
    }): any;
    abstract OnVideoDeviceStateChanged(msg: {
        deviceInfo: any;
        state: string;
    }): any;
    setSessionInfo(appid: number, userid: string, token: string, testEnvironment: boolean): void;
}
