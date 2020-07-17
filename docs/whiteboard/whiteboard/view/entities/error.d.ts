export declare class WhiteboardError {
    transError(code: number, msg?: string): {
        code: number;
        msg: string;
    };
    CODES: {
        ZegoWhiteboardViewErrorInternal: number;
        ZegoWhiteboardViewErrorParamInvalid: number;
        ZegoWhiteboardViewErrorNetworkTimeout: number;
        ZegoWhiteboardViewErrorNetworkDisconnect: number;
        ZegoWhiteboardViewErrorInvalidRsp: number;
        ZegoWhiteboardViewErrorRequestTooMany: number;
        ZegoWhiteboardViewErrorNoLoginRoom: number;
        ZegoWhiteboardViewErrorUserNotExist: number;
        ZegoWhiteboardViewErrorViewNotExist: number;
        ZegoWhiteboardViewErrorViewCreateFail: number;
        ZegoWhiteboardViewErrorViewModifyFail: number;
        ZegoWhiteboardViewErrorViewNameLimit: number;
        ZegoWhiteboardViewErrorViewParentNotExist: number;
        ZegoWhiteboardViewErrorViewNumLimit: number;
        ZegoWhiteboardViewErrorGraphicNotExist: number;
        ZegoWhiteboardViewErrorGraphicCreateFail: number;
        ZegoWhiteboardViewErrorGraphicModifyFail: number;
        ZegoWhiteboardViewErrorGraphicUnableDraw: number;
        ZegoWhiteboardViewErrorGraphicDataLimit: number;
        ZegoWhiteboardViewErrorGraphicNumLimit: number;
        ZegoWhiteboardViewErrorGraphicTextLimit: number;
        ZegoWhiteboardViewErrorInitFail: number;
        ZegoWhiteboardViewErrorGetListFail: number;
        ZegoWhiteboardViewErrorCreateFail: number;
        ZegoWhiteboardViewErrorDestroyFail: number;
        ZegoWhiteboardViewErrorAttachFail: number;
        ZegoWhiteboardViewErrorClearFail: number;
        ZegoWhiteboardViewErrorScrollFail: number;
        ZegoWhiteboardViewErrorUndoFail: number;
        ZegoWhiteboardViewErrorRedoFail: number;
    };
    private interfaceCodeData;
    private sdkCodeMap;
    private viewCodeMap;
}
