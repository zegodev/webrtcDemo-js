import './view/polyfill';
import { ZegoDocsView } from './view/views/viewMod';
import { ZegoDocsViewConfig, CustomListener } from './view/entities';
export declare class ZegoExpressDocs {
    private serviceHandle;
    private docsviews;
    constructor(config: ZegoDocsViewConfig);
    createView(parent: string, viewID?: string, sheetName?: string): ZegoDocsView;
    uploadFile(file: File, renderType: number): Promise<any>;
    on<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    off<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    setTestEnv(isTest: boolean): void;
    setConfig(key: string, value: string | number | boolean): boolean;
    getConfig(key: string): string | number | boolean | undefined;
}
