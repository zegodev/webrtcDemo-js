import { Config, LoadParams, UploadParams, LoadResult, UploadResult } from './zego.docs.entity';
export declare class ZegoDocs {
    constructor(config: Config);
    private axiosInstance;
    private stateCenter;
    private requestUrls;
    private config;
    private init;
    setTestEnv(env: boolean): void;
    setConfig(key: string, value: string | number | boolean): boolean;
    getConfig(key: string): string | number | boolean | undefined;
    upload(uploadParams: UploadParams): Promise<UploadResult>;
    load(loadParams: LoadParams): Promise<LoadResult>;
    private cancelUpload;
    private uploadSucceedAfter;
    private uploadProgressInit;
    private uploadProgressCvt;
    private uploadProgress;
    private requestHandle;
    private queryStatus;
    private uploadDocToOssByWx;
    private uploadDocToOssByWeb;
    private uploadDoc;
    private createCvtDoc;
    private decryptImages;
}
