export declare class WhiteboardViewEvent {
    platform: number;
    downEventName: string;
    upEventName: string;
    moveEventName: string;
    eventList: {};
    constructor();
    bindEvent(name: string, handle: Function): void;
    removeEvent(name: string, handle: Function): void;
}
