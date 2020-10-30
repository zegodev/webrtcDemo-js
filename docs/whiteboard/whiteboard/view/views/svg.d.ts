import { Tool } from './tool';
import { ViewTool, ProtoGraphic } from '../entities/viewEntity';
export declare class SvgGraphics {
    private toolInstance;
    private bindFlag;
    viewTool: ViewTool;
    eventList: {
        name: string;
        handle: string;
    }[];
    constructor(options: {
        toolInstance: Tool;
    });
    private mousedownHandle;
    private mousemoveHandle;
    private mouseupHandle;
    private mouseleaveHandle;
    bindEventsHandle(): void;
    removeEventsHandle(): void;
    drawGraphicsHandle(protoGraphic: ProtoGraphic, local: boolean): void;
    drawGraphicsLine(protoGraphic: ProtoGraphic, local: boolean, fill?: string, opacity?: number, strokeLinejoin?: string, strokeLinecap?: string): void;
    drawGraphicsRect(protoGraphic: ProtoGraphic, local: boolean, fill?: string, opacity?: number, strokeLinejoin?: string, strokeLinecap?: string): void;
    drawGraphicsPath(protoGraphic: ProtoGraphic, local: boolean, fill?: string, strokeLinejoin?: string, strokeLinecap?: string): void;
    drawGraphicsEllipse(protoGraphic: ProtoGraphic, local: boolean, fill?: string, opacity?: number, strokeLinejoin?: string, strokeLinecap?: string): void;
}
