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
export declare enum FileType {
    PPT = 1,
    DOC = 2,
    ELS = 4,
    PDF = 8,
    IMG = 16,
    TXT = 32,
    PPTH5 = 512
}
export interface FileInfo {
    fileID: string;
    fileName: string;
    authKey: string;
    fileType: FileType;
}
export interface View {
    roomID: string;
    whiteboardID?: string;
    name: string;
    aspectWidth: number;
    aspectHeight: number;
    pageCount?: number;
    fileInfo?: FileInfo;
}
export declare enum ViewTool {
    Drag = 0,
    Pen = 1,
    Text = 2,
    Line = 4,
    Rect = 8,
    Ellipse = 16,
    Selector = 32,
    Eraser = 64,
    Laser = 128
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
    id_name?: string;
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
export interface BindEvents {
    mousemoveHandle: ((event: MouseEvent | TouchEvent) => void) | null;
    mouseleaveHandle: ((event: MouseEvent | TouchEvent) => void) | null;
    mouseupHandle: ((event: MouseEvent | TouchEvent) => void) | null;
    mousedownHandle: ((event: MouseEvent | TouchEvent) => void) | null;
}
export declare enum DrawState {
    Init = 1,
    Down = 2,
    Move = 3,
    DownMove = 4,
    Up = 5,
    Leave = 6,
    DownLeave = 7
}
