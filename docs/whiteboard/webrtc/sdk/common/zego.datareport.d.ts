import { DataStatistics } from "./zego.entity";
import { Logger } from "./zego.logger";
export declare class ZegoDataReport {
    private log;
    logger: Logger;
    dataStatistics: DataStatistics;
    constructor(log: Logger);
    newReport(seq: number): void;
    addMsgExt(seq: number, msg_ext: any): void;
    eventStart(seq: any, event_name: any): void;
    eventEnd(seq: any, event_name: any, extInfo?: any): void;
    eventEndWithMsg(seq: number, event_name: string, msg_ext: {
        [index: string]: any;
    }): void;
    addEventInfo(seq: number, event_name: string, key: string, value: string): void;
    addEvent(seq: number, event_name: string, msg_ext?: {
        [index: string]: string;
    }): void;
    uploadReport(seq: number, itemType: string): void;
}
