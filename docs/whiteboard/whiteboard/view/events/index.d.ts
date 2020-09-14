import { Platform } from '../entities/viewEntity';
export declare class WhiteboardViewEvent {
    platform: Platform;
    downEventName: string;
    upEventName: string;
    moveEventName: string;
    leaveEventName: string;
    eventList: {};
    constructor();
}
