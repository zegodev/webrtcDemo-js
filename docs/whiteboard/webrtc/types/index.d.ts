export declare class ZegoMediaElement extends HTMLVideoElement {
    captureStream(): MediaStream;
}
export declare class ZegoMediaDevices extends MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
}
export interface MediaStreamAudioDestinationNode extends AudioNode {
    readonly stream: MediaStream;
}
export declare class ZegoAudioContext extends AudioContext {
    createMediaStreamDestination(): MediaStreamAudioDestinationNode;
}
export declare class ZegoHTMLAudioElement extends HTMLAudioElement {
    captureStream(): MediaStream;
}
export declare type ZegoVideoDecodeType = 'VP8' | 'H264' | 'H265' | 'VP9';
