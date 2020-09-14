import { ProtoGraphic, Action, ViewTool, ViewInfo } from '../entities/viewEntity';
import { WhiteboardStore } from '../entities/store';
import { Laser } from './laser';
import { WhiteboardServiceBase } from '../services/base';
import { SvgGraphics } from './svg';
import { TextareaGraphics } from './textarea';
import { Eraser } from './eraser';
import { Selector } from './selector';
export declare class Tool {
    offsetData: {
        offsetLeft: number;
        offsetTop: number;
    };
    scrollData: {
        scrollLeft: number;
        scrollTop: number;
    };
    mousePointList: number[];
    userNode: HTMLElement;
    zoomNode: HTMLElement;
    conNode: HTMLElement;
    graphicsConNode: HTMLElement;
    whiteboardNode: HTMLElement;
    graphicsBoxConNode: HTMLElement;
    graphicList: ProtoGraphic[];
    protoGraphic: ProtoGraphic;
    whiteboardID: string;
    serviceHandle: WhiteboardServiceBase;
    whiteboardStore: WhiteboardStore;
    viewInfo: ViewInfo;
    instancesMap: {
        [index: string]: Laser | SvgGraphics | TextareaGraphics | Eraser | Selector;
    };
    _enable: boolean;
    constructor(options: {
        whiteboardID: string;
        graphicList: ProtoGraphic[];
        conNode: HTMLElement;
        zoomNode: HTMLElement;
        whiteboardNode: HTMLElement;
        graphicsConNode: HTMLElement;
        graphicsBoxConNode: HTMLElement;
        serviceHandle: WhiteboardServiceBase;
        whiteboardStore: WhiteboardStore;
        viewInfo: ViewInfo;
    });
    transLocationHandle<T extends {
        clientX: number;
        clientY: number;
    }>(point: T): T;
    bindEventsHandle(type: ViewTool): void;
    removeEventsHandle(type: ViewTool): void;
    moveGraphicsHandle(graphicID: string, x: number | undefined | null, y: number | undefined | null, zoom?: number | boolean): void;
    /**
     * 获取图元dom
     * svg类图元: <g><rect id="zego-graphics"></rect></g>
     * 文本类图元: <div id="zego-textarea"><pre>xxx</pre><textarea id="zego-graphics"></textarea></div>
     * 激光笔图元: <div id="zego-laser"><div id="zego-graphics"></div></div>
     * @param {string} graphicID
     * @returns {(HTMLElement | null)}
     * @memberof Tool
     */
    getGraphicsHandle(graphicID: string, targetParent?: HTMLElement): HTMLElement | null;
    batchGetGraphicsHandle(targetParent: HTMLElement | undefined, reservedPrefixStr: string): NodeListOf<Element>;
    getGraphicsSelHandle(graphicID: string): string;
    getBoxSelHandle(graphicID: string): string;
    updateOffsetHandle(): void;
    updateScrollHandle(): void;
    calMoveHandle(): number[];
    updateGraphicsOffsetHandle(protoGraphic: ProtoGraphic, moveX: number, moveY: number): void;
    updateMousePointsHandle(point?: number[]): void;
    /**
     * 推送到service(激光笔不处理回退)
     * @param {ProtoGraphic[]} graphicList
     * @param {Action} action
     * @param {boolean} [isHandleCallback=true]
     * @returns {void}
     * @memberof Tool
     */
    updateToRemoteHandle(graphicList: ProtoGraphic[], action: Action, isHandleCallback?: boolean): void;
    /**
     * 更新本地（本端回退）
     * @param {ProtoGraphic[]} graphicList
     * @param {string[]} [delGraphicList]
     * @memberof Tool
     */
    updateLocalHandle(graphicList: ProtoGraphic[]): void;
    updatePushLocalHandle(graphicList: ProtoGraphic[], delGraphicList?: string[]): void;
    /**
     * 删除图元相关
     * @param {string} graphicID
     * @memberof Tool
     */
    deleteHandle(graphicID: string): void;
    createHandle(protoGraphic: ProtoGraphic): void;
    moveHandle(protoGraphic: ProtoGraphic): void;
    updateHandle(protoGraphic: ProtoGraphic): void;
    updateBoxHandle(protoGraphic: ProtoGraphic): HTMLElement | boolean;
    addInstanceHandle(instance: Laser | SvgGraphics | TextareaGraphics | Eraser | Selector): Laser | SvgGraphics | TextareaGraphics | Eraser | Selector;
    getInstanceHandle(type: ViewTool): Laser | SvgGraphics | TextareaGraphics | Eraser | Selector | undefined;
    /**
     * 获取box dom
     * <div id="zego-graphics-box"><div>
     * @param {string} graphicID
     * @returns {(HTMLElement | null)}
     * @memberof Tool
     */
    getBoxHandle(graphicID: string): HTMLElement | null;
    getUserName(): string;
    appendGraphicsDomHandle(graphicsDom: HTMLElement | SVGSVGElement, type: ViewTool): void;
    checkMultipointHandle(event: TouchEvent): boolean;
    downCommonHandle(event: MouseEvent | TouchEvent): boolean;
    updateProtoGraphic(keyValueMap?: {
        [index: string]: boolean | string | number | number[];
    }): void;
    updateGraphicsDataHandle(point: number[]): void;
    initDrawHandle(): void;
    getBoxInfoByGraphicInfo(graphicsDom: Element, lineWidth: number): {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    getMouseStartPoint(event: MouseEvent | TouchEvent): {
        clientX: number;
        clientY: number;
    };
    getMouseChangedPoint(event: MouseEvent | TouchEvent): {
        clientX: number;
        clientY: number;
    };
    setDataToGraphicList(graphicId: string, ...keyValueMaps: object[]): void;
    getDataFromGraphicList(graphicId: string, ...keys: string[]): {
        [index: string]: any;
    };
    getCoverHandle(event: MouseEvent | TouchEvent): ProtoGraphic | boolean;
    filterExistingHandle(graphicList: ProtoGraphic[]): ProtoGraphic[];
    undoHandle(): void;
    redoHandle(): void;
    clearLocalHandle(): void;
    reverseZoomHandle(type: ViewTool): void;
    private getTranslateXY;
    private getPageTranslateXY;
}
