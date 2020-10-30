import { ZegoSignal } from './zego.signal';
import { ZegoPlayWeb } from '../webrtc/zego.play.web';
import { ZegoVideoDecodeType } from '../../types/index';
import { ZegoPublish } from '../webrtc/zego.publish';
export declare const PROTO_VERSION: any;
export declare const ROOMVERSION: any;
export declare enum ENUM_LOG_LEVEL {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    report = 99,
    disable = 100
}
export declare enum ENUM_REMOTE_TYPE {
    disable = 0,
    websocket = 1,
    https = 2
}
export interface Config {
    appid: number;
    server: string | string[];
    idName: string;
    nickName: string;
    logLevel: ENUM_LOG_LEVEL;
    logUrl: string;
    audienceCreateRoom: boolean;
    remoteLogLevel: ENUM_LOG_LEVEL;
}
export interface Device {
    deviceName: string;
    deviceID: string;
}
export interface DeviceStates {
    camera: number;
    microphone: number;
}
export interface UsabilityDedection {
    webRtc: boolean;
    capture: boolean;
    videoDecodeType: {
        H264: boolean;
        VP8: boolean;
    };
    screenSharing: boolean;
}
export declare class ListNode {
    _id: number;
    _data: any;
    next: ListNode;
    prev: ListNode;
    constructor(id?: number, data?: any);
    id: number;
    data: any;
    hasNext(): number;
    hasPrev(): number;
}
export declare class LinkedList {
    start: ListNode;
    end: ListNode;
    _idCounter: number;
    _numNodes: number;
    constructor();
    /**
     *   Inserts a node before another node in the linked list
     *   @param {Node} toInsertBefore
     *   @param {Node} node
     */
    insertBefore(toInsertBefore: ListNode, data: any): ListNode;
    /**
     *   Adds data wrapped in a Node object to the end of the linked list
     *   @param {object} data
     */
    addLast(data: any): ListNode;
    /**
     *   Alias for addLast
     *   @param {object} data
     */
    add(data: any): ListNode;
    /**
     *   Gets and returns the first node in the linked list or null
     *   @return {Node/null}
     */
    getFirst(): ListNode;
    /**
     *   Gets and returns the last node in the linked list or null
     *   @return {Node/null}
     */
    getLast(): ListNode;
    /**
     *   Gets and returns the size of the linked list
     *   @return {number}
     */
    size(): number;
    /**
     *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
     *   Use getAt instead of this function
     *   @param {number} index
     */
    getFromFirst(index: any): ListNode;
    /**
     *   Gets and returns the Node at the specified index in the linked list
     *   @param {number} index
     */
    get(index: any): any;
    /**
     *   Removes and returns node from the linked list by rearranging pointers
     *   @param {Node} node
     *   @return {Node}
     */
    remove(node: any): any;
    /**
     *   Removes and returns the first node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeFirst(): any;
    /**
     *   Removes and returns the last node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeLast(): any;
    /**
     *   Removes all nodes from the list
     */
    removeAll(): void;
    /**
     *    Iterates the list calling the given fn for each node
     *    @param {function} fn
     */
    each(iterator: any): void;
    find(iterator: any): any;
    map(iterator: any): any[];
    /**
     *    Alias for addLast
     *    @param {object} data
     */
    push(data: any): ListNode;
    /**
     *    Performs insertBefore on the first node
     *    @param {object} data
     */
    unshift(data: any): void;
    /**
     *    Alias for removeLast
     */
    pop(): any;
    /**
     *    Alias for removeFirst()
     */
    shift(): any;
}
export declare const sdkErrorList: {
    SUCCESS: {
        code: string;
        msg: string;
    };
    PARAM: {
        code: string;
        msg: string;
    };
    HEARTBEAT_TIMEOUT: {
        code: string;
        msg: string;
    };
    LOGIN_TIMEOUT: {
        code: string;
        msg: string;
    };
    SEND_MSG_TIMEOUT: {
        code: string;
        msg: string;
    };
    RESET_QUEUE: {
        code: string;
        msg: string;
    };
    LOGIN_DISCONNECT: {
        code: string;
        msg: string;
    };
    KICK_OUT: {
        code: string;
        msg: string;
    };
    UNKNOWN: {
        code: string;
        msg: string;
    };
    FREQ_LIMITED: {
        code: string;
        msg: string;
    };
};
export interface DataStatisticsItemEvent {
    event: string;
    abs_time: number;
    time_consumed?: number;
    msg_ext?: {
        [index: string]: string | number;
    };
}
export interface DataStatisticsItem {
    abs_time: number;
    time_consumed: number;
    error: number;
    events: DataStatisticsItemEvent[];
    msg_ext?: any;
    itemtype?: string;
}
export interface DataStatistics {
    [index: string]: DataStatisticsItem;
}
export declare enum ENUM_SIGNAL_STATE {
    disconnected = 0,
    connecting = 1,
    connected = 2
}
export declare const ENUM_RESOLUTION_TYPE: {
    LOW: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    MEDIUM: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    HIGH: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
};
export declare const ENUM_RETRY_STATE: {
    didNotStart: number;
    retrying: number;
    finished: number;
};
export declare const ENUM_PUBLISH_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    publishing: number;
    stop: number;
    didNotStart: number;
};
export declare const ENUM_PUBLISH_STATE_NEGO: {
    stop: number;
    start: number;
    waiterAnswer: number;
    waitingCandidate: number;
    sendCandidate: number;
    iceConnected: number;
};
export declare const ENUM_PLAY_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    playing: number;
    stop: number;
    didNotStart: number;
};
export declare const ENUM_PLAY_STATE_NEGO: {
    stop: number;
    start: number;
    waiterAnswer: number;
    waitingCandidate: number;
    sendCandidate: number;
    iceConnected: number;
};
export interface VideoInfo {
    width: number;
    height: number;
    frameRate: number;
    minBitRate: number;
    maxBitRate: number;
}
export declare const ENUM_CONNECT_STATE: {
    disconnect: number;
    connecting: number;
    connected: number;
};
export declare const MAX_TRY_CONNECT_COUNT = 1;
export declare const SEND_MSG_RESET = 2;
export declare const SEND_MSG_TIMEOUT = 1;
export declare const MAX_TRY_HEARTBEAT_COUNT = 5;
export declare const ENUM_PUBLISH_STREAM_STATE: {
    waiting_url: number;
    tryPublish: number;
    update_info: number;
    publishing: number;
    stop: number;
};
export declare const ENUM_STREAM_SUB_CMD: {
    liveNone: number;
    liveBegin: number;
    liveEnd: number;
    liveUpdate: number;
};
export declare const ENUM_STREAM_UPDATE_TYPE: {
    added: number;
    deleted: number;
};
export declare enum ENUM_RUN_STATE {
    logout = 0,
    trylogin = 1,
    login = 2
}
export declare const ENUM_PUBLISH_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export declare const ENUM_PLAY_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export interface StreamQuality {
    videoBitrate: number;
    audioBitrate: number;
    videoFPS: number;
    frameHeight: number;
    frameWidth: number;
    videoTransferFPS: number;
}
export interface StreamInfo {
    stream_id: string;
    anchor_id_name: string;
    anchor_nick_name: string;
    extra_info: string;
}
export interface ERRO {
    code: string;
    msg: string;
}
export declare const MAX_TRY_LOGIN_COUNT = 5;
export declare const TRY_LOGIN_INTERVAL: number[];
export declare const MINIUM_HEARTBEAT_INTERVAL = 3000;
export declare const ENUM_STREAM_UPDATE_CMD: {
    added: number;
    deleted: number;
    updated: number;
};
export declare const SERVER_ERROR_CODE = 10000;
export declare const MIXSTREAM_ERROR_CODE = 10000;
export interface WaitingInfo {
    streamId: string;
    success: Function;
    error: Function;
}
export interface SignalInfo {
    signal: ZegoSignal;
    state: number;
    publishWaitingList: WaitingInfo[];
    playWaitingList: WaitingInfo[];
    publishConnectedList: string[];
    playConnectedList: string[];
    tokenInfo: any;
    isTimeOut: boolean;
}
export interface PublishInfo {
    localVideo: HTMLMediaElement;
    publisher: ZegoPublish;
    serverUrls: string[];
    retryCount: number;
    streamId: string;
    playOption: PlayOption;
    tryCountConnect: number;
    countConnectTimer: any;
}
export interface PlayerInfo {
    player: ZegoPlayWeb;
    streamId: string;
    remoteVideo: HTMLElement;
    audioOutput: string;
    signal: ZegoSignal;
    serverUrls: string[];
    retryCount: number;
    playOption: PlayOption;
    tryCountConnect: number;
    countConnectTimer: any;
}
export declare enum QUALITYLEVEL {
    low = 1,
    stantard = 2,
    hight = 3,
    custome = 4
}
export interface MediaStreamConstraints {
    audio: boolean;
    audioInput?: string;
    video: boolean;
    facingMode?: string;
    videoInput?: string;
    videoQuality?: QUALITYLEVEL;
    horizontal: boolean;
    externalCapture?: boolean;
    height?: number;
    frameRate?: number;
    width?: number;
    bitRate?: number | {
        minBitRate: number;
        maxBitRate: number;
    };
    minBitRate?: number;
    maxBitRate?: number;
    audioBitRate?: number;
    externalMediaStream?: MediaStream;
    noiseSuppression?: boolean;
    autoGainControl?: boolean;
    echoCancellation?: boolean;
}
export interface DeviceInfo {
    label: string;
    deviceId: string;
}
export declare const ENUM_SIGNAL_SUB_CMD: {
    none: number;
    joinLiveRequest: number;
    joinLiveResult: number;
    joinLiveInvite: number;
    joinLiveStop: number;
};
export declare const ENUM_PUSH_SIGNAL_SUB_CMD: {
    none: number;
    pushJoinLiveRequest: number;
    pushJoinLiveResult: number;
    pushJoinLiveInvite: number;
    pushJoinLiveStop: number;
};
export interface ChargeInfo {
    is_publishing: number;
    play_stream_resolution_infos: Array<ResolutionInfo>;
    play_max_audio_bitrate: number;
}
export interface ResolutionInfo {
    video_width: number;
    video_height: number;
    count: number;
}
export interface ChargeInfos {
    itemtype: 'ChargeInfos';
    timestamp_begin: number;
    timestamp_end: number;
    timestamp_diff_flag: number;
    timestamp_diff: number;
    infos: Array<ChargeInfo>;
}
export interface ChatInfo {
    id_name: string;
    nick_name: string;
    role: number;
    msg_id: string;
    msg_category: number;
    msg_type: number;
    msg_content: string;
    send_time: number;
}
export interface UserInfo {
    action: 1 | 2;
    idName: string;
    nickName: string;
    role: 1 | 2;
    loginTime: string;
}
export interface MessageInfo {
    idName: string;
    nickName: string;
    messageId: string;
    category: number;
    type: number;
    content: string;
    time: number;
}
export interface audioMixConfig {
    loop?: boolean;
    playTime?: number;
    replace?: boolean;
    streamId: string;
    effectId: number;
}
export interface CdnPushConfig {
    type: string;
    appSecret: string;
    streamId: string;
    pushUrl: string;
}
export declare enum ENUM_PLAY_SOURCE_TYPE {
    auto = 0,
    ultra = 1
}
export declare enum ENUM_BROADCASTER_STATUS {
    stop = 0,
    start = 1
}
export declare enum ENUM_DISPATCH_TYPE {
    cdn = 0,
    ultra = 1,
    customUrl = 2
}
export declare type PlayOption = {
    playType?: 'audio' | 'video' | 'all';
    streamParams?: string;
    cdnUrl?: string;
    audioBitRate?: number;
    videoDecodeType?: ZegoVideoDecodeType;
};
export declare enum E_CLIENT_TYPE {
    ClientType_None = 0,
    ClientType_H5 = 1,
    ClientType_SmallPragram = 2,
    ClientType_Webrtc = 3
}
