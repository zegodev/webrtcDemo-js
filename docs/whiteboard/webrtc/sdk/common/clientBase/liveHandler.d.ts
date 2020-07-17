import { SocketCenter } from "./socketCenter";
import { StateCenter } from "./stateCenter";
import { ERRO } from "../zego.entity";
import { Logger } from "../zego.logger";
export declare class LiveHandler {
    private logger;
    private socketCenter;
    private stateCenter;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter);
    requestJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    inviteJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    endJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): boolean;
    respondJoinLive(requestId: string, respondResult: boolean, success?: (seq: number) => void, error?: (err: ERRO, seq: number) => void): boolean;
    sendSignalCmd(cmd: number, signalMsg: string, dest_id_name: string, success: any, error: any): void;
    handlePushSignalMsg(msg: any): void;
    private handlePushJoinLiveRequestMsg;
    onRecvJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): void;
    private handlePushJoinLiveInviteMsg;
    onRecvInviteJoinLiveRequest(requestId: string, from_userid: string, from_username: string, roomid: string): void;
    private handlePushJoinLiveResultMsg;
    private handlePushJoinLiveStopMsg;
    onRecvEndJoinLiveCommand(requestId: string, from_userid: string, from_username: string, roomid: string): void;
}
