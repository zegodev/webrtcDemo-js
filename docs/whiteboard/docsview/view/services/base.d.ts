import { CustomListener } from '../entities';
export declare abstract class ZegoDocsViewServiceBase {
    private customListeners;
    addEventListener<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    removeEventListener<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    triggerEventListener<k extends keyof CustomListener>(event: k, res: any): void;
    abstract registerEventHandler(id: string, name: string, cb: any): void;
    abstract setTestEnv(isTest: boolean): void;
    abstract load(id: string, config: {
        fileID: string;
        authKey: string;
    }): Promise<any>;
    abstract upload(config: {
        file: File | string;
        renderType: number;
    }): Promise<any>;
    abstract init(config: {
        app_id: number;
        app_sign: number[] | string;
        app_data_folder: string;
    }): void;
    abstract setLogFolder(config: {
        log_path: string;
        log_level: number;
    }): void;
    abstract setCacheDirectory(directory: string): void;
    abstract getPageImage(id: string, config: {
        sheet: number;
        file_id: string;
        virtual_page_number: number;
        rate: number;
        rotation: number;
        res: any;
    }): void;
}
