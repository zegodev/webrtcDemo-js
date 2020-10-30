import { MessageInfo, StreamInfo, StreamQuality, UserInfo } from "../zego.entity";
import { SocketCenter } from "./socketCenter";
import { StateCenter } from "./stateCenter";
import { RoomHandler } from "./roomHandler";
import { StreamHandler } from "./streamHandler";
import { HeartBeatHandler } from "./heartBeatHandler";
import { MessageHandler } from "./messageHandler";
import { LiveHandler } from "./liveHandler";
import { Logger } from "../zego.logger";
import { ZegoStreamCenter } from "../ZegoStreamCenter";
import { ZegoWebSocket } from "../../wechatMini/zego.webSocket";
export declare abstract class Common {
    logger: Logger;
    streamCenter: ZegoStreamCenter;
    socketCenter: SocketCenter;
    roomHandler: RoomHandler;
    heartBeatHandler: HeartBeatHandler;
    streamHandler: StreamHandler;
    messageHandler: MessageHandler;
    liveHandler: LiveHandler;
    stateCenter: StateCenter;
    abstract getSocket(server: string): ZegoWebSocket | WebSocket;
    abstract setCDNInfo(streamInfo: {
        urls_flv: string;
        urls_hls: string;
        urls_rtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): any;
    abstract WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): any;
    abstract stopPlayingStream(streamID: string): any;
    abstract onPlayStateUpdate(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): any;
    abstract onPublishStateUpdate(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): any;
    abstract stopPublishingStream(streamId: string): any;
    abstract onPublishQualityUpdate(streamid: string, streamQuality: StreamQuality): any;
    abstract onRecvJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): any;
    abstract onRecvInviteJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): any;
    abstract onRecvEndJoinLiveCommand(requestId: string, from_userid: string, from_username: string, roomid: string): any;
    abstract onRecvCustomCommand(from_userid: string, from_idname: string, custom_content: string): any;
    abstract onUserStateUpdate(roomId: string, userList: UserInfo[]): any;
    abstract onRecvBigRoomMessage(messageList: MessageInfo[], roomId: string): any;
    abstract onRecvReliableMessage(type: string, seq: number, data: String): any;
    abstract onStreamUpdated(type: number, streamList: StreamInfo[]): any;
    abstract onStreamExtraInfoUpdated(streamList: StreamInfo[]): any;
    abstract startPublishingStream(streamid: any, localVideo: any, extraInfo: any): any;
    abstract startPlayingStream(streamid: string, remoteVideo: HTMLElement, audioOutput?: string): any;
    abstract loginBodyData(): {
        [index: string]: string | number | any[];
    };
    onPlayStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): void;
    onPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: {
        code: string;
        msg: string;
    }): void;
    resetStreamCenter(): void;
    protected handleFetchWebRtcUrlRsp(msg: any): void;
}
