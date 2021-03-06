import { WhiteboardView } from './base';
import { WhiteboardServiceBase } from '../services/base';
import { WhiteboardStore } from '../entities/store';
import { Direction, ProtoGraphic, FileInfo, ViewTool } from '../entities/viewEntity';
export declare class WhiteboardViewMod extends WhiteboardView {
    private parentDom;
    private whiteboardID;
    private _enable;
    private _activited;
    private viewInfo;
    private whiteboardStore;
    private serviceHandle;
    private whiteboardNode;
    private graphicsBoxConNode;
    private graphicsConNode;
    private graphicsBgConNode;
    private zoomNode;
    private toolInstance;
    private graphicList;
    private scrollLogTimer;
    constructor(whiteboardID: string, whiteboardStore: WhiteboardStore, serviceHandle: WhiteboardServiceBase);
    private scrollHandle;
    destroyDomHandle(): void;
    private setWhiteboardTransform;
    private handleDragEvent;
    private dragScroll;
    private dragPage;
    private initDragEvents;
    private updateBindEvents;
    init(parent: string): void;
    private initToolHandle;
    private updateStateSizeHandle;
    private calculateHandle;
    private createModule;
    setActivited(val: boolean): void;
    isActivited(): boolean;
    private activited;
    private updateViewInfo;
    private removeElement;
    private getElementChild;
    private clearSelectedHandle;
    private setClassNameHandle;
    scrollToHandle(hPercent: number, vPercent: number, step: number, notify: boolean): void;
    private checkEmitScrollHandle;
    private emitScroll;
    private jumpPage;
    private handleDocsviewEvent;
    clearLaserHandle(userID?: string): void;
    clearLocalHandle(): void;
    updateRemoteToLocal(graphicList: ProtoGraphic[], delGraphicIdList?: string[]): void;
    private setDragStyle;
    private setScrollMode;
    enable(enable: boolean): boolean;
    isEnable(): boolean;
    clear(): void;
    scroll(horizontalPercent: number, verticalPercent: number): boolean;
    getCurrentScrollPercent(): {
        horizontalPercent: number;
        verticalPercent: number;
        direction: Direction;
    };
    undo(): void;
    redo(): void;
    getAspectRatio(): string;
    getFileInfo(): FileInfo | null;
    getID(): string;
    getName(): string;
    getCreateTime(): number;
    getRoomID(): string;
    getPageCount(): number;
    setBackgroundColor(color: string): boolean;
    getBackgroundColor(): string;
    setToolType(type: ViewTool | null): boolean;
    getToolType(): ViewTool | null;
    setBrushColor(color: string): boolean;
    getBrushColor(): string;
    setBrushSize(thin: number): boolean;
    getBrushSize(): number;
    setTextSize(thin: number): boolean;
    getTextSize(): number;
    getPage(): number;
    setScaleFactor(scaleFactor: number, scaleOffsetX?: number, scaleOffsetY?: number): void;
    getScaleFactor(): {
        scaleFactor: number;
        scaleOffsetX: number;
        scaleOffsetY: number;
        zoom: number;
        x: number;
        y: number;
    };
    setFontItalic(italic: boolean): boolean;
    isFontItalic(): boolean;
    setFontBold(bold: boolean): boolean;
    isFontBold(): boolean;
}
