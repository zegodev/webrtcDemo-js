export declare const calStandard: {
    sizeWidth: number;
    placeWidth: number;
    minFontSize: number;
    maxFontSize: number;
    minLineWidth: number;
    maxLineWidth: number;
};
export declare enum ScrollMode {
    Page = 0,
    Scroll = 1
}
export declare enum Direction {
    Center = 0,
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
    pageCount: number;
    fileInfo?: FileInfo;
}
export interface ViewInfo {
    isScroll: boolean;
    isOriginScroll: boolean;
    ticking: boolean;
    direction: Direction;
    viewWidth: number;
    viewHeight: number;
    viewportWidth: number;
    viewportHeight: number;
    offsetLeft: number;
    offsetTop: number;
    scrollTop: number;
    scrollLeft: number;
    scrollX: number;
    scrollY: number;
    page: number;
    pageCount: number;
    offsetPageX: number;
    offsetPageY: number;
    zoom: number;
    zoomX: number;
    zoomY: number;
    zoomTX: number;
    zoomTY: number;
    draging: boolean;
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
    attributes: string;
}
export interface ProtoGraphic extends GraphicsData {
    selected?: boolean;
    initX?: number;
    initY?: number;
    fontSize?: number;
    bgColor?: string;
    oldData?: string;
}
export interface AttributesData {
    bold: boolean;
    italic: boolean;
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
    DownMoveUp = 5,
    DownNoMoveUp = 6,
    Leave = 7,
    DownLeave = 8
}
