export declare const MAX_PAGE = 5;
export declare const INTERVAL_PAGE = 100;
export declare const SYNC_PPT_TIME = 2000;
export declare const SYNC_PPT_INIT_TIME = 20000;
export declare const DOMIDS: {
    zoom: string;
    doc: string;
    render: string;
    iframe: string;
    wb: string;
};
export declare enum FileType {
    PPT = 1,
    DOC = 2,
    ELS = 4,
    PDF = 8,
    IMG = 16,
    TXT = 32,
    PPTH5 = 512
}
export declare enum RenderMode {
    PDF = 0,
    PPT = 1,
    PPTH5 = 2
}
export interface ZegoDocsViewConfig {
    userID?: string;
    token?: string;
    appID: number;
    appSign: number[];
    dataFolder: string;
    cacheFolder: string;
    logFolder: string;
    isTestEnv: boolean;
    platform: string;
}
export interface CustomListener {
    onLoadFile: (res: any) => void;
    onUpload: (res: any) => void;
    onScroll: (res: any) => void;
    onStepChange: (res: any) => void;
    onViewMessage: (res: any) => void;
    onRenderState: (res: any) => void;
}
export declare const transError: (code: number) => number;
