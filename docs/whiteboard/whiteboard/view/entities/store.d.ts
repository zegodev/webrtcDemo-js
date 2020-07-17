import { ViewTool, ScrollMode } from './viewEntity';
export declare class WhiteboardStore {
    reservedKey: {
        graphicsBgContainerIdPrefix: string;
        graphicsContainerIdPrefix: string;
        graphicsSvgIdPrefix: string;
        boxContainerIdPrefix: string;
        graphicsIdPrefix: string;
        textareaConIdPrefix: string;
        graphicsBoxIdPrefix: string;
        whiteboardPrefix: string;
        whiteboardContainerPrefix: string;
    };
    basicState: {
        type: ViewTool;
        size: number;
        fontSize: number;
        color: string;
        bgColor: string;
        scroll: ScrollMode;
    };
    boxPadding: number;
    boxBorderWidth: number;
    selectedBorderCss: string;
    unSelectedBorderCss: string;
    maxlength: number;
}
