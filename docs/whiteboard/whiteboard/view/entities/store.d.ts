import { ViewTool, ScrollMode } from './viewEntity';
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
    };
    boxPadding: number;
    textareaPadding: number;
    boxBorderWidth: number;
    selectedBorderCss: string;
    unSelectedBorderCss: string;
    maxlength: number;
    initLaserX: number;
    initLaserY: number;
    hiddenLaserX: number;
    hiddenLaserY: number;
    hiddenLaserDelay: number;
}
