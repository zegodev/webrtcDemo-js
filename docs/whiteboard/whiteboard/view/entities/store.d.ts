import { ViewTool, ScrollMode, Platform } from './viewEntity';
export declare class WhiteboardStore {
    reservedPrefix: {
        graphicsBgContainer: string;
        graphicsContainer: string;
        graphicsSvg: string;
        boxContainer: string;
        graphics: string;
        textareaCon: string;
        laserCon: string;
        graphicsBox: string;
        whiteboard: string;
        whiteboardCon: string;
        whiteboardZoom: string;
        laserContainer: string;
        fileWhiteboardCon: string;
    };
    basicState: {
        type: ViewTool;
        size: number;
        fontSize: number;
        drawSize: number;
        drawFontSize: number;
        color: string;
        bgColor: string;
        scroll: ScrollMode;
        attributes: string;
    };
    boxPadding: number;
    textareaPadding: number;
    textareaConBorderWidth: number;
    boxBorderWidth: number;
    selectedBorderCss: string;
    unSelectedBorderCss: string;
    maxlength: number;
    scrollbarSize: number;
    initLaserX: number;
    initLaserY: number;
    hiddenLaserX: number;
    hiddenLaserY: number;
    hiddenLaserDelay: number;
    platform: Platform;
    downEventName: string;
    upEventName: string;
    moveEventName: string;
    leaveEventName: string;
    wheelEventName: string;
    constructor();
}
