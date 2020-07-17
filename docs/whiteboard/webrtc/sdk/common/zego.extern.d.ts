export declare let playErrorList: {
    DISPATCH_ERROR: {
        code: string;
        msg: string;
    };
    DISPATCH_TIMEOUT: {
        code: string;
        msg: string;
    };
    TOKEN_ERROR: {
        code: string;
        msg: string;
    };
    SEND_SESSION_TIMEOUT: {
        code: string;
        msg: string;
    };
    CREATE_SESSION_ERROR: {
        code: string;
        msg: string;
    };
    CREATE_OFFER_ERROR: {
        code: string;
        msg: string;
    };
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: string;
        msg: string;
    };
    SET_REMOTE_DESC_ERROR: {
        code: string;
        msg: string;
    };
    CREATE_ANSWER_ERROR: {
        code: string;
        msg: string;
    };
    SET_LOCAL_DESC_ERROR: {
        code: string;
        msg: string;
    };
    SEND_MEDIA_DESC_TIMEOUT: {
        code: string;
        msg: string;
    };
    SEND_CANDIDATE_ERROR: {
        code: string;
        msg: string;
    };
    SEND_CANDIDATE_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_NEGO_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_CANDIDATE_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_CANDIDATE_ERROR: {
        code: string;
        msg: string;
    };
    MEDIA_CONNECTION_FAILED: {
        code: string;
        msg: string;
    };
    MEDIA_CONNECTION_CLOSED: {
        code: string;
        msg: string;
    };
    SESSION_CLOSED: {
        code: string;
        msg: string;
    };
    WEBSOCKET_ERROR: {
        code: string;
        msg: string;
    };
};
export declare let publishErrorList: {
    DISPATCH_ERROR: {
        code: string;
        msg: string;
    };
    DISPATCH_TIMEOUT: {
        code: string;
        msg: string;
    };
    TOKEN_ERROR: {
        code: string;
        msg: string;
    };
    SEND_SESSION_TIMEOUT: {
        code: string;
        msg: string;
    };
    CREATE_SESSION_ERROR: {
        code: string;
        msg: string;
    };
    CREATE_OFFER_ERROR: {
        code: string;
        msg: string;
    };
    SET_LOCAL_DESC_ERROR: {
        code: string;
        msg: string;
    };
    SEND_MEDIA_DESC_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_MEDIA_DESC_ERROR: {
        code: string;
        msg: string;
    };
    SET_REMOTE_DESC_ERROR: {
        code: string;
        msg: string;
    };
    SEND_CANDIDATE_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_CANDIDATE_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_NEGO_TIMEOUT: {
        code: string;
        msg: string;
    };
    SERVER_CANDIDATE_ERROR: {
        code: string;
        msg: string;
    };
    SESSION_CLOSED: {
        code: string;
        msg: string;
    };
    MEDIA_CONNECTION_FAILED: {
        code: string;
        msg: string;
    };
    MEDIA_CONNECTION_CLOSED: {
        code: string;
        msg: string;
    };
    MEDIA_CONNECTION_DISCONNECTED: {
        code: string;
        msg: string;
    };
    WEBSOCKET_ERROR: {
        code: string;
        msg: string;
    };
};
export declare let ENUM_PUBLISH_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export declare let ENUM_PLAY_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
    stop: number;
};
export declare let ENUM_RETRY_STATE: {
    didNotStart: number;
    retrying: number;
    finished: number;
};
export declare let getSeq: () => number;
