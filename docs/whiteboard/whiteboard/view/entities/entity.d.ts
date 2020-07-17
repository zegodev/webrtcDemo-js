import { ProtoGraphic } from './viewEntity';
import { WhiteboardView } from '../views/base';
export interface ReqHeader {
    sdk_version: number;
    id_name: string;
}
export declare enum Direction {
    Center = 0,
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
export interface CustomListener {
    error: (errorData: ErrorData) => void;
    viewAdd: (whiteboardView: WhiteboardView) => void;
    viewRemoved: (whiteboardID: string) => void;
    viewScroll: (whiteboardID: string, horizontalPercent: number, verticalPercent: number) => void;
}
export interface CalStandard {
    placeWidth: number;
    sizeWidth: number;
    minFontSize: number;
    maxFontSize: number;
    minLineWidth: number;
    maxLineWidth: number;
}
export interface ErrorData {
    code: number;
    msg: string;
}
export interface ModContent {
    room_id: string;
    file_info?: {
        fileID: string;
        fileName: string;
        authKey: string;
        fileType: number;
    };
    whiteboard_page_count?: number;
}
export interface ModPos {
    x: number;
    y: number;
    w: number;
    h: number;
    z: number;
    ar_w: number;
    ar_h: number;
}
export interface GraphicTask {
    cmdSeq: number;
    task: ProtoGraphic[];
}
export interface PushMsgData {
    body: PushMsgBody;
    header: PushMsgHeader;
}
export interface PushMsgHeader {
    appid: number;
    cmd: string;
    from_user_id: string;
    protocol: string;
    push_seq: number;
    qos_flag: number;
    room_id: string;
    session_id: string;
    user_id: string;
}
export interface PushMsgBody {
    channel: string;
    cmd: string;
    req_body: string;
}
export declare enum PushType {
    SetMod = 1,
    ClearPageGraphics = 2,
    DrawPageGraphics = 3
}
export declare enum ModAction {
    Add = 1,
    Removed = 2,
    Modify = 3
}
/**  应答包头 */
export interface RspHeader {
    /** 错误码 */
    code: number;
    /** 错误信息 */
    message: string;
    /** 包序号seq */
    seq: number;
    /** 时间戳 */
    timestamp: number;
}
/**  窗体数据 */
export interface ProtoMod {
    mod_id: string;
    mod_seq: number;
    mod_title: string;
    mod_type: number;
    mod_subtype: number;
    mod_pos: string;
    mod_status: string;
    mod_content: string;
    /** 扩展buffer 1024 bytes */
    mod_extra: string;
    /** 预留字段 */
    mod_reserve: number;
    /** mod创建时的时间戳 */
    mod_create_time: string;
    /** 白板图元list_seq */
    graphic_list_seq: number;
    /** 同步seq 时间间隔，单位：秒 */
    sync_interval: number;
    mod_horizontal_percent: number;
    mod_vertical_percent: number;
}
/**  图元数据 */
export interface PushProtoDraw {
    /** 操作者 id */
    id_name: string;
    /** 操作者姓名 */
    nick_name: string;
    /** 图元 id */
    graphic_id: string;
    /** 图元操作 seq */
    action_seq: number;
    /** 1->path 涂鸦，2->text 文本框，4->line 线段，8->rect 矩形，16->ellipse 椭圆 */
    type: number;
    /** z 轴上的坐标，一般用服务器时间戳设置 */
    zorder: number;
    /** x 轴上的坐标，移动事件时会发生改变 */
    x: number;
    /** y 轴上的坐标，移动事件时会发生改变 */
    y: number;
    /** 实际的图元内容，描述一个图元的形状。比如涂鸦，就是所有点集合；矩形，就是左上角点和右下角点；文本框，就是文本内容。 */
    data: string;
    /** 图元尺寸，如果是线条就是粗细，如果是文字指字体大小 */
    size: number;
    /** 图元颜色，rgba 值用 32 位数字表示 */
    color: number;
}
/** 创建新模块(/eduv1/create_mod) */
export interface ProtoCreateMod {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块 id，唯一标识 */
        mod_id: string;
        /** 128 bytes，模块标题 */
        mod_title: string;
        /** 模块类型，白板用 1 表示 */
        mod_type: number;
        /** 模块子类型，1：非互动，2：互动 */
        mod_subtype: number;
        /** 64 bytes，模块位置，后台一般只是透传，不关心内容，形如“{"x":0,"y":0,"w":0,"h":0,"z":0}” */
        mod_pos: string;
        /** 模块属性状态，如 enabled、visible、window_state（窗口状态：最小化、正常、最大化）等 */
        mod_status: string;
        /** 1024 bytes，模块本身的元信息，如：{"wb_arw":6400,"wb_arh":614} */
        mod_content: string;
        /** 模块的扩展信息, 1024 bytes */
        mod_extra: string;
        /** 模块的预留值，用来传递实时的变化 */
        mod_reserve: number;
        /** 指定是否在 module 创建者退出房间后自动删除 module */
        mod_delete_flag: number;
        mod_horizontal_percent: number;
        mod_vertical_percent: number;
    };
}
/**  创建新模块应答 */
export interface ProtoCreateModRsp {
    header: RspHeader;
    body: {
        /** 模块id */
        mod_id: string;
        /** 模块seq */
        mod_seq: number;
        /** 模块列表seq */
        mod_list_seq: number;
        /** mod创建时的时间戳 */
        mod_create_time: string;
    };
}
/**  销毁模块(/eduv1/destroy_mod) */
export interface ProtoDestroyMod {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块 id */
        mod_id: string;
    };
}
/**  销毁模块应答 */
export interface ProtoDestroyModRsp {
    header: RspHeader;
    body: {
        /** 模块id */
        mod_id: string;
        /** 最新模块列表同步 seq */
        mod_list_seq: number;
    };
}
/**  数据同步应答 */
export interface ProtoSyncRsp {
    header: RspHeader;
    body: {
        /** 同步seq 时间间隔，单位：秒 */
        sync_interval: number;
        /** 房间教育信息seq */
        room_extra_info_seq: number;
        /** 用户基本信息seq */
        user_list_seq: number;
        /** 用户教育信息seq */
        user_extra_info_seq: number;
        /** 流信息列表seq */
        joinlive_seq: number;
        /** mod列表信息同步 */
        mod_list_seq: number;
    };
}
/**  修改模块属性(/eduv1/modify_mod) */
export interface ProtoModifyMod {
    /** 头 */
    header: ReqHeader;
    body: ProtoModify;
}
export interface ProtoModify {
    /** 当前客户端最新模块同步 seq，如果该 seq 小于服务端的最新 seq，则命令执行失败，服务端报错返回 */
    mod_seq: number;
    /** 模块 id */
    mod_id: string;
    /** 128 bytes，模块标题，可以先通过 is_modify_mod_title 判断是否需要修改 */
    mod_title: string;
    /** 64 bytes，模块位置，可以先通过 is_modify_mod_pos 判断是否需要修改 */
    mod_pos: string;
    /** 模块属性状态，可以先通过 is_modify_mod_status 判断是否需要修改 */
    mod_status: string;
    /** 2048 bytes，模块本身的元信息，可以先通过 is_modify_mod_content 判断是否需要修改 */
    mod_content: string;
    /** 扩展buffer 1024 bytes，模块的扩展信息，可以先通过 is_modify_mod_extra 判断是否需要修改 */
    mod_extra: string;
    /** 模块的预留值，可以先通过 is_modify_mod_reserve 判断是否需要修改 */
    mod_reserve: number;
    mod_horizontal_percent: number;
    mod_vertical_percent: number;
    is_modify_mod_title: boolean;
    is_modify_mod_pos: boolean;
    is_modify_mod_status: boolean;
    is_modify_mod_content: boolean;
    is_modify_mod_extra: boolean;
    is_modify_mod_reserve: boolean;
    is_modify_mod_horizontal_percent: boolean;
    is_modify_mod_vertical_percent: boolean;
}
/**  修改模块属性应答 */
export interface ProtoModifyModRsp {
    header: RspHeader;
    body: {
        /** 模块id */
        mod_id: string;
        /** 模块seq */
        mod_seq: number;
        /** 模块列表seq */
        mod_list_seq: number;
    };
}
/**  拉取模块信息(/eduv1/get_mod) */
export interface ProtoGetMod {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 目的模块id 列表，最大100个 */
        mod_id_list: string[];
    };
}
/**  拉取模块信息应答 */
export interface ProtoGetModRsp {
    header: RspHeader;
    body: {
        /** 模块列表 */
        mod_list: ProtoMod[];
    };
}
/**  拉取模块列表(/eduv1/get_mod_list) */
export interface ProtoGetModList {
    /** 头 */
    header: ReqHeader;
    body: {
        mod_list_seq: number;
        /** 列举条目数，范围1-100; 默认值为100 */
        limit: number;
        /** 上次列举返回的位置标记，作为本次列举的起点信息。默认为空 */
        marker: string;
        /** 0 表示拉所有类型的module; 1 白板; */
        mod_type: number;
    };
}
/**  拉取模块列表应答 */
export interface ProtoGetModListRsp {
    /** 头 */
    header: RspHeader;
    body: {
        mod_list_seq: number;
        /** 上次列举返回的位置标记，作为本次列举的起点信息 */
        marker: string;
        /** 0 表示拉所有类型的module; 1 白板; */
        mod_type: number;
        mod_list: ProtoMod[];
    };
}
/**  操作图元(/eduv1/draw_graphics) */
export interface ProtoDrawGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
        graphic_list_seq: number;
        /** 图元列表 */
        draw_list: ProtoDraw[];
    };
}
/**  操作图元应答 */
export interface ProtoDrawGraphicsRsp {
    header: RspHeader;
    body: {
        /** 模块 id */
        mod_id: string;
        /** 当前客户端最新图元列表同步 seq */
        graphic_list_seq: number;
        commit_time: string;
    };
}
/**  按页操作图元(/eduv1/draw_page_graphics) */
export interface ProtoDrawPageGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
        drawPages: DrawPage[];
    };
}
export interface DrawPage {
    page: number;
    graphic_list_seq: number;
    draw_list: ProtoDraw[];
}
/**  按页操作图元应答 */
export interface ProtoDrawPageGraphicsRsp {
    header: RspHeader;
    body: {
        /** 模块 id */
        mod_id: string;
        /** 操作图元页码列表 */
        pages: number[];
        /** 当前客户端每页最新图元列表同步 seq */
        graphic_list_seqs: number[];
        commit_time: string;
    };
}
/**  图元操作定义，data 限制1k */
export interface ProtoDraw {
    /** 图元 id，由客户端生成的一个 64 位整形，根据 user_id、user_name 合时间戳 hash 生成（图元 ID 由客户端生成是因为客户端在一个短暂的时间内，有可能对图元进行密集的操作，需要快速响应，放到服务端生成会大大增加复杂度，而客户端生成 64 位数字 id 实际上碰撞的可能性并不高，因此权衡之下选择客户端生成 ID） */
    graphic_id: string;
    /** 2->update，类似replace，整个内容替换。4->delete，删除指定 id 图元。 8->move，移动图元，移动图元位置，下面的 x,y 坐标。32->create，新增一个图元。 */
    action: number;
    /** 1-> 针对单个图元操作，2->针对多个图元操作，4-> 其他 */
    action_type: number;
    /** 1->path 涂鸦，2->text 文本框，4->line 线段，8->rect 矩形，16->ellipse 椭圆 */
    type: number;
    /** z 轴上的坐标，一般用服务器时间戳设置 */
    zorder: number;
    /** x 轴上的偏移量，移动事件时会发生改变 */
    x: number;
    /** y 轴上的偏移量，移动事件时会发生改变 */
    y: number;
    /** x 轴上的老偏移量，移动事件时会发生改变 */
    px: number;
    /** y 轴上的老偏移量，移动事件时会发生改变 */
    py: number;
    /** 实际的图元内容，描述一个图元的形状。涂鸦：所有点集合；矩形：左上角点和右下角点；文本框：x,y,文本内容； */
    data: string;
    /** 图元尺寸，如果是线条就是粗细，如果是文字指字体大小 */
    size: number;
    /** 图元颜色，rgba 值用 32 位数字表示 */
    color: number;
}
/**  清除图元(/eduv1/clear_graphics) */
export interface ProtoClearGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
        graphic_list_seq: number;
    };
}
/**  清除图元应答 */
export interface ProtoClearGraphicsRsp {
    header: RspHeader;
    body: {
        mod_id: string;
        graphic_list_seq: number;
    };
}
/**  清除所有页图元(/eduv1/clear_graphics) */
export interface ProtoClearPageGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
    };
}
/**  清除所有页图元应答 */
export interface ProtoClearPageGraphicsRsp {
    header: RspHeader;
    body: {
        mod_id: string;
        pages: number[];
        graphic_list_seqs: number[];
    };
}
/**  拉取图元(/eduv1/get_graphics) */
export interface ProtoGetGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
        /** 图元索引 */
        graphic_list_seq: number;
        /** 列举条目数，范围1-100; 默认值为100 */
        limit: number;
    };
}
/**  拉取图元应答 */
export interface ProtoGetGraphicsRsp {
    header: RspHeader;
    body: {
        /** 本次返回的图元列表最新索引 */
        ret_graphic_list_seq: number;
        /** 服务端图元最新索引 */
        svr_graphic_list_seq: number;
        /** 有更新的最新图元数据 */
        graphic_list: PushProtoDraw[];
        /** 被删除的图元 */
        del_graphic_id_list: string[];
    };
}
/**  按页拉取图元(/eduv1/get_page_graphics) */
export interface ProtoGetPageGraphics {
    /** 头 */
    header: ReqHeader;
    body: {
        /** 模块id */
        mod_id: string;
        /** 指定页 */
        pages: number[];
        /** 每页图元索引 */
        graphic_list_seqs: number[];
        /** 列举条目数，范围1-100; 默认值为100 */
        limit: number;
    };
}
/**  按页拉取图元应答 */
export interface ProtoGetPageGraphicsRsp {
    header: RspHeader;
    body: {
        pages: {
            /** 当前页 */
            page: number;
            /** 本次返回的图元列表最新索引 */
            ret_graphic_list_seq: number;
            /** 服务端图元最新索引 */
            svr_graphic_list_seq: number;
            /** 有更新的最新图元数据 */
            graphic_list: PushProtoDraw[];
            /** 被删除的图元 */
            del_graphic_id_list: string[];
        }[];
    };
}
/**  设置模块 */
export interface PushSetMod {
    /** 房间 ID */
    room_id: string;
    /** 服务端模块列表seq */
    mod_list_seq: number;
    /** 设置模块操作列表 */
    action_list: PushSetModAction[];
}
/**  设置模块action */
export interface PushSetModAction {
    /** 操作类型：1 add; 2 del; 3 modify */
    action: number;
    /** 模块 id，唯一标识 */
    mod_id: string;
    /** 模块类型，白板用 1 表示 */
    mod_type: number;
    /** 模块子类型，1：非互动，2：互动 */
    mod_subtype: number;
    mod_seq: number;
    /** 128 bytes，模块标题 */
    mod_title: string;
    /** 64 bytes，模块位置，后台一般只是透传，不关心内容，形如“{"x":0,"y":0,"w":0,"h":0,"z":0}” */
    mod_pos: string;
    /** 模块属性状态，如 enabled、visible、window_state（窗口状态：最小化、正常、最大化）等 */
    mod_status: string;
    /** 1024 bytes，模块本身的元信息，如：{"wb_arw":6400,"wb_arh":614} */
    mod_content: string;
    /** 模块的扩展信息, 1024 bytes */
    mod_extra: string;
    /** 模块的预留值，用来传递实时的变化 */
    mod_reserve: number;
    mod_create_time: string;
    mod_horizontal_percent: number;
    mod_vertical_percent: number;
    is_modify_mod_title: boolean;
    is_modify_mod_pos: boolean;
    is_modify_mod_status: boolean;
    is_modify_mod_content: boolean;
    is_modify_mod_extra: boolean;
    is_modify_mod_reserve: boolean;
    is_modify_mod_horizontal_percent: boolean;
    is_modify_mod_vertical_percent: boolean;
}
/**  操作图元 */
export interface PushDrawPageGraphics {
    mod_id: string;
    page_graphics: PageGraphic[];
    timestamp: string;
}
export interface PageGraphic {
    action_seq: number;
    del_graphic_id_list: string[] | null;
    graphic_list: PushProtoDraw[];
    page: number;
}
/**  清除图元 */
export interface PushClearPageGraphics {
    /** 模块 id，唯一标识 */
    mod_id: string;
    /** 页码集合 */
    pages: number[];
    /** 图元操作 seq */
    action_seqs: number[];
    /** 操作者 id */
    id_name: string;
    nick_name: string;
    /** 操作时间 */
    timestamp: number;
}
