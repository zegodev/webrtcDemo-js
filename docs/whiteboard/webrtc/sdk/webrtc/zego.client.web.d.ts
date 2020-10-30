/// <reference path="../../types/global.d.ts" />
import { E_CLIENT_TYPE, MediaStreamConstraints, PlayOption, audioMixConfig } from '../common/zego.entity';
import { ZegoStreamCenterWeb } from './zego.streamCenter.web';
import { audioMixUtil } from '../util/audioMixUtil';
import { BaseCenter } from '../common/clientBase/index';
import { MediaUtil } from '../util/mediaUtil';
import { ZegoMediaElement, ZegoHTMLAudioElement, ZegoAudioContext } from '../../types/index';
import { ZegoPublish } from './zego.publish';
export declare class ZegoClient extends BaseCenter {
    streamCenter: ZegoStreamCenterWeb;
    audioMixing: audioMixUtil;
    ac: ZegoAudioContext;
    constructor();
    static screenShotReady: boolean;
    static mediaRecorder: MediaRecorder;
    static recordedBlobs: Blob[];
    static recordType: string;
    getSocket(server: string): WebSocket;
    enableCamera(localVideo: HTMLElement, enable: boolean): boolean;
    enableMicrophone(localVideo: HTMLElement, enable: boolean): boolean;
    setLocalAudioOutput(localVideo: HTMLElement, audioOutput: string): boolean;
    setPlayAudioOutput(streamid: string, audioOutput: string): boolean;
    setCustomSignalUrl(signalUrl: Array<string>): boolean;
    setQualityMonitorCycle(timeInMs: number): void;
    startPlayingStream(streamid: string, remoteVideo: HTMLElement, audioOutput?: string, playOption?: PlayOption): boolean;
    stopPlayingStream(streamid: string): boolean;
    startPreview(localVideo: HTMLElement, mediaStreamConstraints: MediaStreamConstraints, success: Function, error: Function): boolean;
    stopPreview(localVideo: HTMLElement): boolean;
    startPublishingStream(streamid: string, localVideo: HTMLElement, extraInfo?: any, playOption?: PlayOption): boolean;
    stopPublishingStream(streamid: string): boolean;
    preloadEffect(id: number, effectUrl: string, callBack?: Function): void;
    playEffect(audioMixConfig: audioMixConfig, start?: Function, end?: Function): void;
    pauseEffect(streamid: string): void;
    resumeEffect(streamid: string): void;
    unloadEffect(effecId: number): boolean;
    startMixingAudio(streamID: string, audio: ZegoHTMLAudioElement, replace: boolean): boolean;
    stopMixingAudio(streamID: string, audio?: Array<HTMLMediaElement>): boolean;
    mixingBuffer(streamID: string, sourceID: string, arrayBuffer: ArrayBuffer, callBack?: Function): void;
    stopMixingBuffer(streamID: string, source: Array<string>): boolean;
    setMixingAudioVolume(streamid: string, volume: number): boolean;
    getPublisher(streamid: any): ZegoPublish;
    startScreenShotChrome(callBack: (suc: boolean, stream: MediaStream, err?: string) => void): boolean;
    startScreenSharing(screenConfig: {
        width?: number;
        height?: number;
        frameRate?: number;
        displaySurface?: string;
    }, audio: boolean, callBack: (suc: boolean, stream: MediaStream, err?: string) => void): void;
    startScreenShotFirFox(screenConfig: {
        width?: number;
        height: number;
        frameRate?: number;
        bitRate?: number;
    }, mediaSource: 'screen' | 'application' | 'window', audio: boolean, callBack: (suc: boolean, stream: MediaStream) => void): void;
    stopScreenShot(stream: MediaStream): void;
    switchDevice(type: 'audio' | 'video', localVideo: HTMLMediaElement, deviceId: string, success: Function, error: Function): void;
    WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): void;
    setCDNInfo(streamInfo: {
        urls_https_flv: string;
        urls_https_hls: string;
        urls_flv: string;
        urls_hls: string;
        urls_rtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
        urls_https_flv: string;
        urls_https_m3u8: string;
    }): void;
    onScreenSharingEnded(stream: any): void;
    loginBodyData(): {
        'id_name': string;
        'nick_name': string;
        'role': 1 | 2;
        'token': string;
        'version': any;
        'room_name': string;
        'user_state_flag': number;
        'room_create_flag': number;
        'client_type': E_CLIENT_TYPE;
        third_token: string;
    };
    screenStreamFrom(streamId: string, canRequestAudioTrack: boolean, callBack: Function): void;
    filterStreamList(streamId?: string): any[];
    voiceChange(mult: number, streamid: string): boolean;
    voiceBack(streamid: string): void;
    setPublishStreamConstraints(streamID: string, constraints: MediaStreamConstraints, success: Function, error: Function): void;
    setSoundLevelDelegate(bool: boolean, timeInMs?: number): void;
    static supportDetection(success: Function, error: Function): void;
    enumDevices(deviceInfoCallback: any, error: any): void;
    static enumDevices(deviceInfoCallback: any, error: any): void;
    static getAudioInfo(el: HTMLVideoElement | HTMLAudioElement, errCallBack: (param: any) => void, option?: {
        type: string;
        bufferSize?: number;
        channels?: number;
        sampleBit?: 8 | 16;
        sampleRate: number;
    }): false | MediaUtil;
    private static handleDataAvailable;
    static startRecord(el: ZegoMediaElement, constraints?: {
        audio?: false;
        audioInput?: string;
    }, callBack?: (err?: any) => void): Promise<void>;
    static stopRecord(): void;
    static resumeRecord(): void;
    static pauseRecord(): void;
    static saveRecord(name?: string): string;
    static resumeRecordAudio(): void;
    static pauseRecordAudio(): void;
    static getRecordAudio(): string;
    static takeSnapShot(el: HTMLVideoElement, img: HTMLImageElement): void;
    static saveSnapShot(el: HTMLVideoElement, name: string): void;
    bindWindowListener(): void;
}
