import { Common } from './common';
import { ChatInfo, Config, ERRO, MessageInfo, StreamInfo, StreamQuality, UserInfo, CdnPushConfig } from '../zego.entity';
export declare abstract class BaseCenter extends Common {
    constructor();
    init(): void;
    bindSocketHandler(): void;
    bindStreamHandler(): void;
    bindHeatBeatHandler(): void;
    bindRoomHandler(): void;
    bindMessageHandler(): void;
    bindLiveHandler(): void;
    bindStreamCenterHandler(): void;
    /*********
     *
     * 下面的方法微信和web端实现一样，共用
     *
     *
     * ****/
    config(option: Config): boolean;
    login(roomid: string, role: 1 | 2, token: string, success: (list: StreamInfo[]) => void, error: (err: ERRO) => void): void;
    loginWithAuthor(roomid: string, role: 1 | 2, token: string, authToken: string, success: (list: StreamInfo[]) => void, error: (err: ERRO) => void): void;
    logout(): boolean;
    setUserStateUpdate(update: boolean): void;
    onUserStateUpdate(roomId: string, userList: UserInfo[]): void;
    onGetTotalUserList(roomId: string, userList: {
        idName: string;
        nickName: string;
        role: 1 | 2;
    }[]): void;
    onUpdateOnlineCount(roomId: string, userCount: number): void;
    onGetAnchorInfo(anchor_userid: string, anchro_username: string): void;
    release(): void;
    sendCustomCommand(dstMembers: string[], customContent: string | Object, success: (seq: number, customContent: string) => void, error: (err: ERRO, seq: number, customContent: string) => void): boolean;
    onRecvCustomCommand(from_userid: string, from_idname: string, custom_content: string): void;
    sendRoomMsg(msg_category: 1 | 2, msg_type: 1 | 2 | 3, msg_content: string, success: Function, error: Function): void;
    onRecvRoomMsg(chat_data: ChatInfo[], server_msg_id: number, ret_msg_id: number): void;
    sendReliableMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    onRecvReliableMessage(type: string, seq: number, data: String): void;
    sendBigRoomMessage(category: 1 | 2, type: 1 | 2 | 3, content: string, success: (seq: number, messageId: string) => void, error: (err: ERRO, seq: number) => void): void;
    onRecvBigRoomMessage(messageList: MessageInfo[], roomId: string): void;
    sendRelayMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    requestJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    onRecvJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): void;
    inviteJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    onRecvInviteJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): void;
    endJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): boolean;
    onRecvEndJoinLiveCommand(requestId: string, from_userid: string, from_username: string, roomid: string): void;
    respondJoinLive(requestId: string, respondResult: boolean, success?: (seq: number) => void, error?: (err: ERRO, seq: number) => void): boolean;
    updateMixStream(mixStreamConfig: any, successCallback: any, errorCallback: any): boolean;
    stopMixStream(mixStreamConfig: any, successCallback: any, errorCallback: any): boolean;
    publishTarget(cdnPushConfig: CdnPushConfig, success: Function, error: Function): void;
    updateStreamExtraInfo(streamid: string, extraInfo: string): boolean;
    onStreamUrlUpdate(streamid: string, url: string, type: string): void;
    onStreamUpdated(type: number, streamList: StreamInfo[]): void;
    onStreamExtraInfoUpdated(streamList: StreamInfo[]): void;
    onPlayStateUpdate(type: number, streamid: string, error: ERRO | number): void;
    onVideoSizeChanged(streamId: string, videoWidth: number, videoHeight: number): void;
    onRemoteCameraStatusUpdate(streamID: string, status: number): void;
    onRemoteMicStatusUpdate(streamID: string, status: number): void;
    onPlayQualityUpdate(streamId: string, streamQuality: StreamQuality): void;
    onPublishStateUpdate(type: number, streamid: string, error: ERRO | number): void;
    onPublishQualityUpdate(streamId: string, streamQuality: StreamQuality): void;
    /********
     *
     *
     *  下面的方法都需要被覆盖，这里只是空实现
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * *******/
    onDisconnect(err: ERRO): void;
    onKickOut(err: ERRO): void;
    static getCurrentVersion(): any;
}
