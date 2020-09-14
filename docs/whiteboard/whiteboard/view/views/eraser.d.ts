import { Tool } from './tool';
import { ViewTool } from '../entities/viewEntity';
export declare class Eraser {
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
    private mousemoveHandle;
    private mouseupPcHandle;
    private mouseupMbHandle;
    bindEventsHandle(): void;
    removeEventsHandle(): void;
}
