import { Tool } from './tool';
import { ViewTool, ProtoGraphic } from '../entities/viewEntity';
export declare class TextareaGraphics {
    private toolInstance;
    private bindFlag;
    private isBlur;
    private backSpace;
    private scrollHeight;
    viewTool: ViewTool;
    eventList: {
        name: string;
        handle: string;
    }[];
    constructor(options: {
        toolInstance: Tool;
    });
    private addTextareaDomHandle;
    private addPreDomHandle;
    private addTextareaConDomHandle;
    private bindTextareaInputEventHandle;
    private bindTextareaFocusEvent;
    private bindTextareaBlurEvents;
    private updatePointerEvents;
    bindEventsHandle(): void;
    removeEventsHandle(): void;
    mouseupHandle: (event: MouseEvent | TouchEvent) => void;
    drawGraphicsHandle(protoGraphic: ProtoGraphic, local: boolean): void;
    updateGraphicsHandle(protoGraphic: ProtoGraphic): void;
    foucsHandle(graphicID: string): void;
    backUpdateGraphicsHandle(protoGraphic: ProtoGraphic): void;
    initMaxSizeHandle(textarea: HTMLTextAreaElement): void;
    calMaxSizeHandle(left: number, top: number): {
        maxWidth: number;
        maxHeight: number;
    };
}
