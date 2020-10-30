import { Tool } from './tool';
import { ViewTool } from '../entities/viewEntity';
export declare class Selector {
    private toolInstance;
    private bindFlag;
    viewTool: ViewTool;
    eventList: {
        name: string;
        handle: string;
    }[];
    noMoveUp: boolean | string;
    isWillMove: boolean;
    constructor(options: {
        toolInstance: Tool;
    });
    private mousedownHandle;
    private mousemoveHandle;
    private mouseupHandle;
    private mouseleaveHandle;
    private updateGraphicsOnMoving;
    private drawGraphicsHandle;
    private updateBoxBorderOnSelector;
    bindEventsHandle(): void;
    removeEventsHandle(): void;
}
