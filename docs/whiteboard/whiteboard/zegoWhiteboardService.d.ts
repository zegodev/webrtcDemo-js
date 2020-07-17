import { WhiteboardServiceBase } from './view/services/base';
import { WhiteboardError } from './view/entities/error';
import { ProtoGraphic } from './view/entities/viewEntity';
import { View, ErrorData, PushType } from './view/entities/entity';
declare enum GetModListType {
    Initiative = 1,
    Inner = 2
}
export declare class WhiteboardService extends WhiteboardServiceBase {
    private stateCenter;
    private logger;
    private socketCenter;
    constructor(options: {
        stateCenter: any;
        logger: any;
        socketCenter: any;
        whiteboardError: WhiteboardError;
    });
    private modIdMapData;
    private listenerList;
    private graphicLimit;
    private modLimit;
    private modListSeq;
    private calStandard;
    private reverseGraphicList;
    private transModInfo;
    private createModInfo;
    private getModHeader;
    private getModInfo;
    private posToPageNum;
    private mapPageNumList;
    private judgeGraphicPage;
    private checkProtoGraphic;
    private mapDrawPages;
    private splitPage;
    getRoom(): void;
    actionListener(listener: string, ...args: any[]): void;
    bindListener(listener: string, callBack: Function): void;
    private updateMap;
    private getMap;
    private deleteMap;
    private getModPropSeq;
    private updateMapByMod;
    private updateMapByModifyModOption;
    private updateMapByGraphicListSeqs;
    private getPopTaskIndex;
    private getUndoHandle;
    private addUndoHandle;
    private deleteUndoHandle;
    private getRedoHandle;
    private addRedoHandle;
    private deleteRedoHandle;
    private setInProgress;
    private getInProgress;
    private setSendSwitch;
    private getSendSwitch;
    private clearPullMarks;
    private updateModifyModTaskList;
    private modifyModSendBefore;
    private cachePushModifyModTaskHandle;
    private modifyModRspAfter;
    private getOldModInfoByModifyModOption;
    private checkScroll;
    getModName(whiteboardID: string): string;
    getCreateTime(whiteboardID: string): number;
    getRoomID(whiteboardID: string): string;
    getPageCount(whiteboardID: string): number | undefined;
    setSize(whiteboardID: string, viewWidth: number, viewHeight: number): boolean;
    setViewportSize(whiteboardID: string, viewportWidth: number, viewportHeight: number): void;
    undo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    redo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    createMod(view: View, success: (whiteboardID: string) => void, error: (errorData: ErrorData) => void): void;
    setMod(option: {
        [index: string]: number | string | boolean;
    }, success: (modID: string) => void, error: (errorData: ErrorData, modifyModOption?: {
        [index: string]: number | string | boolean;
    }) => void): void;
    destroyMod(whiteboardID: string, success: (whiteboardID: string) => void, error: (errorData: ErrorData) => void): void;
    clearView(whiteboardID: string, success: () => void, error: (errorData: ErrorData) => void): void;
    updateToRemote(whiteboardID: string, graphicList: ProtoGraphic[], error: (graphicList: ProtoGraphic[]) => void): void;
    private updateToRemoteHandle;
    getModList(type: GetModListType, success?: (whiteboardIDList: string[]) => void, error?: (errorData: ErrorData) => void): void;
    scroll(whiteboardID: string, horizontalPercent: number, verticalPercent: number, success?: (whiteboardID: string) => void, error?: (whiteboardID: string, horizontalPercent: number, verticalPercent: number) => void): void;
    reload(): void;
    loadCurrentGraphics(whiteboardID: string, horizontalPercent: number, verticalPercent: number): void;
    getScrollPercent(whiteboardID: string): {
        horizontalPercent: number;
        verticalPercent: number;
    };
    getAspectRatio(whiteboardID: string): string;
    getFileInfo(whiteboardID: string): {
        fileID: string;
        fileName: string;
        authKey: string;
        fileType: number;
    } | undefined;
    getCurrentPages(whiteboardID: string, horizontalPercent: number, verticalPercent: number): {
        minPage: number;
        maxPage: number;
    };
    private getPageGraphicsList;
    /** 注册远程推送 */
    onRemotePush(): void;
    /**==================== socket ============================ */
    sendWbMessage(reqCmd: string | null, rspCmd: string, reqBody: {
        [index: string]: any;
    } | null, cb: (rspData: any, pushType?: PushType) => void): void;
    /**
     * req为请求头中的cmd，
     * res为回包相应头的cmd，
     * reqBody则是根据协议文档发送的请求body，
     * cmdCallBack(headerSeq: number, bodyCmd: string, rspBody: any)
     * msg.header与msg.body主要处理msg.body */
    queueWSCmdHandler<P = any>(reqCmd: string | null, rspCmd: string, reqBody: {
        [index: string]: any;
    } | null, cmdCallBack?: (cbParam1: P, cbParam2?: PushType) => void): Promise<P>;
    /**================== 回调 ========================= */
    private handleCreateModRsp;
    private handleGetModInfoRsp;
    private handleSetModRsp;
    private handleDestroyModRsp;
    private handleClearRsp;
    private compareHandle;
    private handleGetModListRsp;
    private handleGetPageGraphicsListRsp;
    private handleUpdateToRemoteRsp;
    private pushDrawPageGraphicsHandle;
    private pushClearPageGraphicsHandle;
    private pushAddMod;
    private pushRemovedMod;
    private pushModifyMod;
    private pushScrollHandle;
    private pushSetModHandle;
}
export {};
