export declare enum ScrollMode {
    Page = 0,
    Scroll = 1
}
export declare enum RenderMode {
    Horizontal = 1,
    Vertical = 2,
    Center = 3
}
export declare enum Direction {
    Horizontal = 1,
    Vertical = 2
}
export interface View {
    roomID: string;
    whiteboardID?: string;
    name: string;
    aspectWidth: number;
    aspectHeight: number;
    pageCount?: number;
    fileInfo?: {
        fileID: string;
        fileName: string;
        authKey: string;
        fileType: number;
    };
}
export declare enum ViewTool {
    Pen = 1,
    Text = 2,
    Line = 4,
    Rect = 8,
    Ellipse = 16,
    Selector = 32,
    Eraser = 64
}
export declare enum ActionType {
    Single = 1,
    Multi = 2,
    Other = 4
}
export declare enum Action {
    Update = 2,
    Delete = 4,
    Move = 8,
    Create = 32
}
export interface GraphicsData {
    zorder?: number;
    graphic_id: string;
    data: string | Array<number>;
    x: number;
    y: number;
    px?: number;
    py?: number;
    action_seq?: number;
    action?: Action;
    action_type?: ActionType;
    type: ViewTool;
    size: number;
    color: string;
}
export interface ProtoGraphic extends GraphicsData {
    selected?: boolean;
    initX?: number;
    initY?: number;
    fontSize?: number;
    bgColor?: string;
    oldData?: string;
}
export interface LineData {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface EllipseData {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
}
export interface RectData {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface PathData {
    d: string;
}
export declare enum Platform {
    Pc = 1,
    Mobile = 2
}
