export declare class MediaUtil {
    instant: number;
    slow: number;
    clip: number;
    private context;
    private script;
    private mic;
    private type;
    private channels;
    private bufferSize;
    private sampleBit;
    private sampleRate;
    private worker;
    constructor({ type, channels, bufferSize, sampleBit, sampleRate }: {
        bufferSize?: number;
        channels?: number;
        sampleBit?: 8 | 16;
        sampleRate?: number;
        type?: string;
    });
    connectToSource(stream: MediaStream, callback: (param: any) => void): MediaUtil;
    private recorderBuffer;
    private initRecorderBuffer;
    onReceiveBuffer(val: DataView): void;
    onReceiveWav(wavBlob: Blob): void;
    private writeString;
    writeBuffer(view: DataView, offset: number, buffer: Uint8Array): void;
    concatenation(segments: DataView[]): Uint8Array;
    encodeWave(samples: DataView[]): DataView;
    stop(): void;
}
