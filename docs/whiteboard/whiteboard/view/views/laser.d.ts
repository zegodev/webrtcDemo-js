import { ProtoGraphic, ViewTool } from '../entities/viewEntity';
import { Tool } from './tool';
export declare class Laser {
    private laserContainerNode;
    private toolInstance;
    private bindFlag;
    private laserInfo;
    viewTool: ViewTool;
    eventList: {
        name: string;
        handle: string;
    }[];
    constructor(options: {
        toolInstance: Tool;
    });
    private transLocationHandle;
    private getMouseChangedPoint;
    private drawLaserMoveBeforeHandle;
    private mousemoveHandle;
    private mouseleaveHandle;
    private wheelHandle;
    private laserHiddenHandle;
    addLaserHandle(option: {
        protoGraphic?: ProtoGraphic;
        place?: {
            clientX: number;
            clientY: number;
        };
    }): ProtoGraphic;
    findLaserHandle(graphicID?: string): ProtoGraphic | undefined;
    private addLaserConDomHandle;
    private updateZIndexHandle;
    /**
     * 绘制激光笔图元
     * 本端: => 后续可使用鼠标样式代替
     * 对端: 与其他图元位置相同
     * @param {ProtoGraphic} protoGraphic
     * @param {boolean} local
     * @memberof Laser
     */
    drawGraphicsHandle(protoGraphic: ProtoGraphic, local: boolean): void;
    bindEventsHandle(): void;
    removeEventsHandle(): void;
    calLaserActualPlaceHandle(protoGraphic: ProtoGraphic): ProtoGraphic;
    calLaserPlaceHandle(x: number, y: number): {
        x: number;
        y: number;
    };
    pushActualPlaceHandle(): void;
    clearLaserHandle(userID?: string): void;
    updateLaserConSize(laserConNode?: HTMLElement): void;
}
