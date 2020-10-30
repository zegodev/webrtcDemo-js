import { ZegoDocs } from './docs/zego.docs';
import { ZegoDocsViewServiceBase } from './view/services/base';
export declare class ZegoDocsViewService extends ZegoDocsViewServiceBase {
    private zegoDocs;
    private listeners;
    constructor(zegoDocs: ZegoDocs);
    setTestEnv(isTest: boolean): void;
    setConfig(key: string, value: string | number | boolean): boolean;
    getConfig(key: string): string | number | boolean | undefined;
    registerEventHandler(id: string, name: string, cb: Function): void;
    load(id: string, config: {
        fileID: string;
        authKey: string;
    }): Promise<any>;
    upload(config: {
        file: File;
        renderType: number;
    }): Promise<any>;
    init(config: {
        app_id: number;
        app_sign: number[] | string;
        app_data_folder: string;
    }): void;
    setLogFolder(config: {
        log_path: string;
        log_level: number;
    }): void;
    setCacheDirectory(directory: string): void;
    getPageImage(id: string, config: {
        sheet: number;
        file_id: string;
        virtual_page_number: number;
        rate: number;
        rotation: number;
        res: any;
    }): void;
    private transLoadFile;
    private transImage;
}
