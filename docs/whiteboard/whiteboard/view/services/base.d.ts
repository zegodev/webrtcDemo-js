import { View, ErrorData, CustomListener } from '../entities/entity';
import { ProtoGraphic, FileInfo } from '../entities/viewEntity';
import { WhiteboardError } from '../entities/error';
export declare abstract class WhiteboardServiceBase {
    platform: string;
    whiteboardError: WhiteboardError;
    private customListenerList;
    constructor(platform: string, whiteboardError: WhiteboardError);
    bindCustomListener<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    deleteCustomListener<k extends keyof CustomListener>(event: k, callBack: CustomListener[k]): boolean;
    actionCustomListener(listener: string, ...args: any[]): void;
    abstract createMod(view: View, success: Function, error: Function): void;
    abstract setMod(option: any, success?: Function, error?: Function): void;
    abstract destroyMod(whiteboardID: string, success: Function, error: Function): void;
    abstract getModList(type: number, success: (whiteboardIDList: string[]) => void, error: (errorData: ErrorData) => void): void;
    abstract updateToRemote(whiteboardID: string, graphicList: ProtoGraphic[], error: (graphicList: ProtoGraphic[]) => void): void;
    abstract onRemotePush(): void;
    abstract bindListener(listener: string, callBack: Function): void;
    abstract clearView(whiteboardID: string, success: Function, error: Function): void;
    abstract getScrollPercent(whiteboardID: string): {
        horizontalPercent: number;
        verticalPercent: number;
        pptStep: number;
    };
    abstract getAspectRatio(whiteboardID: string): string;
    abstract setSize(whiteboardID: string, viewWidth: number, viewHeight: number): boolean;
    abstract setViewportSize(whiteboardID: string, viewportWidth: number, viewportHeight: number): void;
    abstract undo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    abstract redo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    abstract scroll(whiteboardID: string, horizontalPercent: number, verticalPercent: number, pptStep: number, success?: (whiteboardID: string) => void, error?: (whiteboardID: string, horizontalPercent: number, verticalPercent: number) => void): void;
    abstract loadCurrentGraphics(whiteboardID: string, horizontalPercent: number, verticalPercent: number): void;
    abstract getFileInfo(whiteboardID: string): FileInfo | null;
    abstract getModName(whiteboardID: string): string;
    abstract getCreateTime(whiteboardID: string): number;
    abstract getRoomID(whiteboardID: string): string;
    abstract getPageCount(whiteboardID: string): number;
    abstract getUserName(): string;
}
