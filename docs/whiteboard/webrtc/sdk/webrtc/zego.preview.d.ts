import { MediaStreamConstraints, VideoInfo } from '../common/zego.entity';
import { Logger } from '../common/zego.logger';
import { ZegoStreamCenter } from '../common/ZegoStreamCenter';
export declare class ZegoPreview {
    private log;
    logger: Logger;
    localVideo: any;
    localStream: MediaStream;
    videoInfo: VideoInfo;
    mediaStreamConfig: MediaStreamConstraints;
    previewSuc: boolean;
    constructor(log: Logger);
    getMediaStreamConstraints(mediaStreamConfig: MediaStreamConstraints): {
        audio: any;
        video: any;
    };
    startPreview(localVideo: HTMLElement, mediaStreamConfig: MediaStreamConstraints, successCallback: Function, errorCallback: Function): void;
    captureStream(localVideo: HTMLElement, mediaStreamConfig: MediaStreamConstraints): boolean;
    stopPreview(): void;
    enableMicrophone: (enable: boolean, streamCenter: ZegoStreamCenter) => boolean;
    enableCamera: (enable: boolean, streamCenter: ZegoStreamCenter) => boolean;
    setAudioDestination: (audioOutput: any) => boolean;
}
