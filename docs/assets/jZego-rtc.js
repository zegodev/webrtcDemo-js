(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sdk/webrtc/zego.client.web.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./sdk/common/ZegoStreamCenter.ts":
/*!****************************************!*\
  !*** ./sdk/common/ZegoStreamCenter.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ZegoStreamCenter = /** @class */ (function () {
    function ZegoStreamCenter(log, stateCenter) {
        this.playerList = {};
        this.publisherList = {};
    }
    ZegoStreamCenter.prototype.setSessionInfo = function (appid, userid, token, testEnvironment) {
    };
    ;
    return ZegoStreamCenter;
}());
exports.ZegoStreamCenter = ZegoStreamCenter;


/***/ }),

/***/ "./sdk/common/clientBase/common.ts":
/*!*****************************************!*\
  !*** ./sdk/common/clientBase/common.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var Common = /** @class */ (function () {
    function Common() {
    }
    //播放拉流状态变化回掉
    Common.prototype.onPlayStateUpdateHandle = function (type, streamid, error) {
        if (type == 1) {
            this.stopPlayingStream(streamid);
        }
        this.onPlayStateUpdate(type, streamid, error);
    };
    ;
    //type: { start: 0, stop: 1}
    Common.prototype.onPublishStateUpdateHandle = function (type, streamid, error) {
        var _this = this;
        if (type == 0) {
            //start publish
            if (this.stateCenter.publishStreamList[streamid]) {
                if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.tryPublish) {
                    this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info;
                    this.streamHandler.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[streamid].extra_info, function (err) {
                        if (_this.stateCenter.publishStreamList[streamid] && _this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                            _this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.stop;
                            _this.onPublishStateUpdate(1, streamid, err);
                            _this.streamCenter.stopPlayingStream(streamid);
                        }
                    });
                }
                else {
                    this.WebrtcOnPublishStateUpdateHandle(type, streamid, error);
                }
                //当前状态为publishing时，如果小程序继续回调相同的开始推流状态码，不应该再返回推流成功的回调
                // else if (this.stateCenter.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.publishing) {
                //     this.onPublishStateUpdate(type, streamid, error);
                // }
            }
        }
        else {
            this.onPublishStateUpdate(type, streamid, error);
            if (type == 1) {
                this.stopPublishingStream(streamid);
            }
        }
    };
    ;
    //重置流
    Common.prototype.resetStreamCenter = function () {
        this.stateCenter.customUrl && (this.stateCenter.customUrl = null);
        this.streamCenter.reset();
        if (!this.socketCenter.isDisConnect()) {
            //send stream delete info
            for (var streamid in this.stateCenter.publishStreamList) {
                if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing) {
                    this.streamHandler.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd, this.stateCenter.publishStreamList[streamid].extra_info);
                }
            }
        }
    };
    /*
    *    "zb.cm.hfwur": "ZegoClient.base.Common.handleFetchWebRtcUrlRsp",
    */
    Common.prototype.handleFetchWebRtcUrlRsp = function (msg) {
        var streamId = msg.body.stream_id;
        if (msg.body.ptype === "push") {
            if (this.stateCenter.publishStreamList[streamId]) {
                this.streamCenter.startPublishingStream(streamId, msg.body.urls);
            }
            else {
                this.logger.error("cb.cm.hfwur no streamid to publish");
            }
        }
        else if (msg.body.ptype == "pull") {
            //check streamid exist
            var found = false;
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
                if (this.stateCenter.streamList[i].stream_id === streamId) {
                    // 根据传入的流id判断当前的流列表中是否存在该流
                    found = true;
                    break;
                }
            }
            if (found == false) {
                this.logger.warn("cb.cm.hfwur cannot find stream, continue to play");
                // return;
            }
            this.streamCenter.startPlayingStream(streamId, msg.body.urls);
        }
    };
    return Common;
}());
exports.Common = Common;


/***/ }),

/***/ "./sdk/common/clientBase/heartBeatHandler.ts":
/*!***************************************************!*\
  !*** ./sdk/common/clientBase/heartBeatHandler.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var MAX_TRY_HEARTBEAT_COUNT = 3; //最大心跳尝试次数
var HeartBeatHandler = /** @class */ (function () {
    function HeartBeatHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    HeartBeatHandler.prototype.resetHeartbeat = function () {
        this.logger.debug('zb.hb.rht call');
        clearTimeout(this.stateCenter.heartbeatTimer);
        this.stateCenter.heartbeatTimer = null;
        this.stateCenter.tryHeartbeatCount = 0;
        this.logger.debug('zb.hb.rht call success');
    };
    //空实现 ，logincenter覆盖
    HeartBeatHandler.prototype.hbLogout = function (err) {
    };
    HeartBeatHandler.prototype.start = function (heartbeatInterval) {
        var _this = this;
        this.logger.debug('zb.hb.sht call');
        // 若当前不是处于login登录状态，则返回不做心跳
        if (!this.stateCenter.isLogin()) {
            this.logger.error('zb.hb.sht state error');
            return;
        }
        // 若尝试心跳次数大于最大尝试次数，则置为登出状态，清除状态数据
        if (++this.stateCenter.tryHeartbeatCount > MAX_TRY_HEARTBEAT_COUNT) {
            this.logger.error('zb.hb.sht come to try limit');
            this.hbLogout(zego_entity_1.sdkErrorList.HEARTBEAT_TIMEOUT);
            return;
        }
        // 发送消息
        this.logger.debug('zb.hb.sht send packet');
        var bodyData = {
            'reserve': 0
        };
        this.socketCenter.registerRouter('hb', function (msg) {
            _this.handleHeartbeatRsp(msg);
        });
        this.socketCenter.sendMessage('hb', bodyData);
        this.logger.debug('zb.hb.sht call success');
        this.stateCenter.heartbeatInterval = heartbeatInterval;
        // heartbeatInterval后再发
        this.stateCenter.heartbeatTimer = setTimeout(function () {
            _this.start(_this.stateCenter.heartbeatInterval);
        }, this.stateCenter.heartbeatInterval);
    };
    /*
    *    "hhbr.0": "ZegoClient.handleHeartbeatRsp",
    */
    HeartBeatHandler.prototype.handleHeartbeatRsp = function (msg) {
        this.logger.debug('zb.hb.hhbr call');
        if (msg.body.err_code !== 0) {
            this.logger.error('zb.hb.hhbr call disconnect, server error=', msg.body.err_code);
            this.hbLogout(client_util_1.ClientUtil.getServerError(msg.body.err_code));
            return;
        }
        //reset heartbeat fail count
        this.stateCenter.tryHeartbeatCount = 0;
        this.stateCenter.heartbeatInterval = msg.body.hearbeat_interval;
        if (this.stateCenter.heartbeatInterval < zego_entity_1.MINIUM_HEARTBEAT_INTERVAL) {
            this.stateCenter.heartbeatInterval = zego_entity_1.MINIUM_HEARTBEAT_INTERVAL;
        }
        //update timewindow
        if (msg.body.bigim_time_window && typeof msg.body.bigim_time_window == 'number') {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window && typeof msg.body.dati_time_window == 'number') {
            this.stateCenter.datiTimeWindow = msg.body.dati_time_window;
        }
        this.ReliableMessageHandler(msg);
        //update stream if diff/
        this.fetchStreamList(msg);
        //update user if diff
        if (msg.body.server_user_seq !== this.stateCenter.userSeq && this.stateCenter.userStateUpdate) {
            this.logger.info('zb.hb.hhbr call update user ' + msg.body.server_user_seq, this.stateCenter.userSeq);
            this.fetchUserList();
        }
        //try updating stream info again
        for (var streamid in this.stateCenter.publishStreamList) {
            if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.logger.info('zb.hb.hhbr try to update stream info');
                this.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[streamid].extra_info);
            }
        }
        //get online count
        if (msg.body.online_count != undefined && msg.body.online_count != 0) {
            this.onUpdateOnlineCount(this.stateCenter.roomid, msg.body.online_count);
        }
        this.logger.debug('zb.hb.hhbr call success');
    };
    HeartBeatHandler.prototype.ReliableMessageHandler = function (msg) {
        var _this = this;
        //check trans seq
        if (msg.body.trans_seqs) {
            for (var i = 0; i < msg.body.trans_seqs.length; i++) {
                var trans_channel = msg.body.trans_seqs[i].trans_channel;
                var trans_seq_array = msg.body.trans_seqs[i].trans_seq_array;
                trans_seq_array = trans_seq_array.filter(function (item) {
                    var type = item.trans_type, seq = item.trans_seq;
                    if (!_this.stateCenter.transSeqMap[type] || _this.stateCenter.transSeqMap[type].seq !== seq) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                trans_seq_array.length > 0 && this.fetchReliableMessage(trans_channel, trans_seq_array);
            }
        }
    };
    /*
     *    "frm.0": "ZegoClient.fetchReliableMessage",拉取可靠业务广播
     */
    HeartBeatHandler.prototype.fetchReliableMessage = function (trans_channel, fetch_array) {
        var _this = this;
        this.logger.debug('zb.hb.frm call');
        var data = {
            'trans_channel': trans_channel,
            'fetch_array': fetch_array
        };
        this.socketCenter.registerRouter('trans_fetch', function (msg) {
            _this.handleFetchTransRsp(msg);
        });
        this.socketCenter.sendMessage('trans_fetch', data);
        this.logger.debug('zb.hb.frm call success');
    };
    //fetch trans 回包
    HeartBeatHandler.prototype.handleFetchTransRsp = function (msg) {
        var _this = this;
        if (!this.stateCenter.isLogin()) {
            this.logger.error('zb.hb.hftr not login');
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error('zb.hb.hftr trans send error ' + msg.body.err_code);
            return;
        }
        var trans_fetch_results = msg.body.trans_fetch_results;
        trans_fetch_results.forEach(function (trans_fetch_result) {
            var type = trans_fetch_result.trans_type;
            var seq = trans_fetch_result.trans_seq;
            _this.stateCenter.transSeqMap[type] = {
                seq: seq
            };
            if (msg.body.trans_user_idname != _this.stateCenter.idName) {
                _this.onRecvReliableMessage(type, seq, trans_fetch_result.trans_data);
            }
            _this.logger.debug('zb.hb.hftr trans ' + type + ' seq ' + seq);
        });
    };
    /*
     *    "fsl.0": "ZegoClient.fetchStreamList",拉取服务端流信息
     */
    HeartBeatHandler.prototype.fetchStreamList = function (msg) {
        var _this = this;
        //update stream if diff/
        if (msg.body.stream_seq === this.stateCenter.streamSeq)
            return;
        this.logger.debug('zb.hb.fsl current seq ' + this.stateCenter.streamSeq + ' server Seq ' + msg.body.stream_seq);
        this.logger.debug('zb.hb.fsl call');
        // 不是处于登录状态，不让拉流
        if (!this.stateCenter.isLogin()) {
            this.logger.error('zb.hb.fsl state error');
            return;
        }
        // 是否正处于拉流状态 false 为完成， true为正在拉流
        if (this.stateCenter.streamQuerying) {
            this.logger.warn('zb.hb.fsl already doing');
            return;
        }
        this.stateCenter.streamQuerying = true;
        this.logger.debug('zb.hb.fsl send fetch request');
        // 发送消息
        this.socketCenter.registerRouter('stream_info', function (msg) {
            _this.handleFetchStreamListRsp(msg);
        });
        this.socketCenter.sendMessage('stream_info', {
            'reserve': 0
        });
        this.logger.debug('zb.hb.fsl call success');
    };
    //空实现 被覆盖
    HeartBeatHandler.prototype.handleFetchStreamListRsp = function (msg) {
    };
    //空实现 被覆盖
    HeartBeatHandler.prototype.fetchUserList = function () {
    };
    //流更新信令  退出上次推的自己的流
    HeartBeatHandler.prototype.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
        if (stream_extra_info === void 0) { stream_extra_info = ''; }
    };
    //空实现 被sdk覆盖
    HeartBeatHandler.prototype.onUpdateOnlineCount = function (roomId, userCount) {
    };
    //空实现 被sdk覆盖了
    HeartBeatHandler.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    HeartBeatHandler.prototype.resetCheckMessage = function () {
        this.logger.debug('zb.hb.rcm call');
        clearTimeout(this.stateCenter.sendDataCheckTimer);
        this.stateCenter.sendDataCheckTimer = null;
        this.checkSendMessageList(this.stateCenter.sendDataList);
        this.checkSendMessageList(this.stateCenter.sendCommandList);
        this.stateCenter.sendDataMap = {};
        this.stateCenter.sendCommandMap = {};
        this.logger.debug('zb.hb.rcm call success');
    };
    HeartBeatHandler.prototype.checkSendMessageList = function (messageList) {
        var head = messageList.getFirst();
        while (head != null) {
            messageList.remove(head);
            if (head._data.error) {
                if (head._data.data.body.custom_msg) {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq, head._data.data.body.custom_msg);
                }
                else {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq);
                }
            }
            head = messageList.getFirst();
        }
    };
    HeartBeatHandler.prototype.checkMessageListTimeout = function (messageList, messageMap) {
        var head = messageList.getFirst();
        var timestamp = Date.parse(new Date() + '');
        var checkCount = 0;
        var timeoutMsgCount = 0;
        var dropMsgCount = 0;
        while (head != null) {
            if ((head._data.time + this.stateCenter.sendDataTimeout) > timestamp) {
                break;
            }
            delete messageMap[head._data.data.header.seq];
            messageList.remove(head);
            ++timeoutMsgCount;
            if (head._data.error == null || (this.stateCenter.sendDataDropTimeout > 0 && (head._data.time + this.stateCenter.sendDataDropTimeout) < timestamp)) {
                ++dropMsgCount;
            }
            else {
                if (head._data.data.body.custom_msg) {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq, head._data.data.body.custom_msg);
                }
                else {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq);
                }
            }
            ++checkCount;
            if (checkCount >= this.stateCenter.sendDataCheckOnceCount) {
                break;
            }
            head = messageList.getFirst();
        }
        if (timeoutMsgCount != 0 || dropMsgCount != 0) {
            this.logger.debug('zb.hb.cmt call success, stat: timeout=', timeoutMsgCount, 'drop=', dropMsgCount);
        }
    };
    /*
     *    "scmt.0": "ZegoClient.startCheckMessageTimeout",
     */
    //检查custommsg发送包是否超时
    HeartBeatHandler.prototype.startCheckMessageTimeout = function () {
        var _this = this;
        //this.logger.debug("scmt.0 call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error('zb.hb.scmt state error');
            return;
        }
        this.checkMessageListTimeout(this.stateCenter.sendDataList, this.stateCenter.sendDataMap);
        this.checkMessageListTimeout(this.stateCenter.sendCommandList, this.stateCenter.sendCommandMap);
        this.stateCenter.sendDataCheckTimer = setTimeout(function () {
            _this.startCheckMessageTimeout();
        }, this.stateCenter.sendDataCheckInterval);
    };
    return HeartBeatHandler;
}());
exports.HeartBeatHandler = HeartBeatHandler;


/***/ }),

/***/ "./sdk/common/clientBase/index.ts":
/*!****************************************!*\
  !*** ./sdk/common/clientBase/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! ./common */ "./sdk/common/clientBase/common.ts");
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var socketCenter_1 = __webpack_require__(/*! ./socketCenter */ "./sdk/common/clientBase/socketCenter.ts");
var roomHandler_1 = __webpack_require__(/*! ./roomHandler */ "./sdk/common/clientBase/roomHandler.ts");
var streamHandler_1 = __webpack_require__(/*! ./streamHandler */ "./sdk/common/clientBase/streamHandler.ts");
var heartBeatHandler_1 = __webpack_require__(/*! ./heartBeatHandler */ "./sdk/common/clientBase/heartBeatHandler.ts");
var messageHandler_1 = __webpack_require__(/*! ./messageHandler */ "./sdk/common/clientBase/messageHandler.ts");
var liveHandler_1 = __webpack_require__(/*! ./liveHandler */ "./sdk/common/clientBase/liveHandler.ts");
// 对外开发接口，与文档保持一致；调度中心
var BaseCenter = /** @class */ (function (_super) {
    __extends(BaseCenter, _super);
    function BaseCenter() {
        return _super.call(this) || this;
    }
    BaseCenter.prototype.init = function () {
        this.bindSocketHandler();
        this.bindStreamHandler();
        this.bindHeatBeatHandler();
        this.bindRoomHandler();
        this.bindMessageHandler();
        this.bindLiveHandler();
        this.bindStreamCenterHandler();
    };
    /*
   *    "zb.cm.bsh.0": "ZegoClient.base.bindSocketHandler",
   */
    BaseCenter.prototype.bindSocketHandler = function () {
        var _this = this;
        this.socketCenter = new socketCenter_1.SocketCenter(this.logger, this.stateCenter);
        this.socketCenter.registerRouter('push_signal', function (msg) {
            _this.liveHandler.handlePushSignalMsg(msg);
        });
        this.socketCenter.getSocket = function (server) {
            return _this.getSocket(server);
        };
        this.socketCenter.handlePushKickout = function (msg) {
            _this.logger.info("zb.cm.bsh.0  call hpk");
            _this.roomHandler.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            _this.roomHandler.resetRoom();
            _this.onKickOut({
                "code": zego_entity_1.sdkErrorList.KICK_OUT.code,
                "msg": zego_entity_1.sdkErrorList.KICK_OUT.msg + msg.body.reason
            });
            _this.logger.debug("zb.cm.bsh.0  call hpk success");
        };
        this.socketCenter.handlePushCustomMsg = function (msg) {
            _this.messageHandler.handlePushCustomMsg(msg);
        };
        this.socketCenter.handlePushUserStateUpdateMsg = function (msg) {
            _this.roomHandler.handlePushUserStateUpdateMsg(msg);
        };
        this.socketCenter.handlePushRoomMsg = function (msg) {
            _this.onRecvRoomMsg(msg.body.chat_data, msg.body.server_msg_id, msg.body.ret_msg_id);
        };
        this.socketCenter.handlePushMergeMsg = function (msg) {
            _this.messageHandler.handlePushMergeMsg(msg);
        };
        this.socketCenter.handlePushTransMsg = function (msg) {
            _this.messageHandler.handlePushTransMsg(msg);
        };
        this.socketCenter.handleBigImMsgRsp = function (msg) {
            _this.messageHandler.handleBigImMsgRsp(msg);
        };
    };
    BaseCenter.prototype.bindStreamHandler = function () {
        var _this = this;
        this.streamHandler = new streamHandler_1.StreamHandler(this.logger, this.stateCenter, this.socketCenter);
        this.streamHandler.onStreamUpdated = function (type, streamList) {
            _this.onStreamUpdated(type, streamList);
        };
        this.streamHandler.onPublishStateUpdate = function (type, streamid, error) {
            _this.onPublishStateUpdate(type, streamid, error);
        };
        this.streamHandler.onStreamExtraInfoUpdated = function (streamList) {
            _this.onStreamExtraInfoUpdated(streamList);
        };
        this.streamHandler.setCDNInfo = function (streamInfo, streamItem) {
            _this.setCDNInfo(streamInfo, streamItem);
        };
    };
    BaseCenter.prototype.bindHeatBeatHandler = function () {
        var _this = this;
        this.heartBeatHandler = new heartBeatHandler_1.HeartBeatHandler(this.logger, this.stateCenter, this.socketCenter);
        this.heartBeatHandler.onRecvReliableMessage = function (type, seq, data) {
            _this.onRecvReliableMessage(type, seq, data);
        };
        this.heartBeatHandler.handleFetchStreamListRsp = function (msg) {
            _this.streamHandler.handleFetchStreamListRsp(msg);
        };
        this.heartBeatHandler.fetchUserList = function () {
            _this.roomHandler.fetchUserList();
        };
        this.heartBeatHandler.onUpdateOnlineCount = function (roomId, userCount) {
            _this.onUpdateOnlineCount(roomId, userCount);
        };
        this.heartBeatHandler.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
            if (stream_extra_info === void 0) { stream_extra_info = ''; }
            _this.streamHandler.updateStreamInfo(streamid, cmd, stream_extra_info, error);
        };
        this.heartBeatHandler.hbLogout = function (err) {
            _this.onDisconnect(err);
        };
    };
    /*
   *    "zb.cm.brh": "ZegoClient.base.bindRoomHandler",
   */
    BaseCenter.prototype.bindRoomHandler = function () {
        var _this = this;
        this.roomHandler = new roomHandler_1.RoomHandler(this.logger, this.stateCenter, this.socketCenter);
        this.roomHandler.loginSuccessCallBack = function (lastRunState, msg) {
            //处理心跳
            var heartbeatInterval = msg.body.hearbeat_interval < zego_entity_1.MINIUM_HEARTBEAT_INTERVAL ? zego_entity_1.MINIUM_HEARTBEAT_INTERVAL : msg.body.hearbeat_interval;
            //setTimeout (() => {
            _this.heartBeatHandler.start(heartbeatInterval);
            // }, heartbeatInterval);
            //消息检查
            _this.heartBeatHandler.resetCheckMessage();
            _this.heartBeatHandler.startCheckMessageTimeout();
            _this.streamCenter.setSessionInfo(_this.stateCenter.appid, _this.stateCenter.idName, _this.stateCenter.token, _this.stateCenter.testEnvironment);
            //房间成员变化
            //handle anchor info
            if (msg.body.anchor_info) {
                _this.onGetAnchorInfo(msg.body.anchor_info.anchor_id_name, msg.body.anchor_info.anchor_nick_name);
            }
            if (msg.body.online_count) {
                _this.onUpdateOnlineCount(_this.stateCenter.roomid, msg.body.online_count);
            }
            //handle userStateUpdate
            _this.logger.info("zb.cm.brh hls userStateUpdate " + _this.stateCenter.userStateUpdate);
            if (_this.stateCenter.userStateUpdate) {
                _this.logger.info("zb.cm.brh hls fetch all new userlist");
                _this.roomHandler.fetchUserList();
            }
            //流处理理
            _this.streamHandler.handleStreamStart(lastRunState, msg);
        };
        this.roomHandler.onGetTotalUserList = function (roomId, userList) {
            _this.onGetTotalUserList(roomId, userList);
        };
        this.roomHandler.resetRoomCallBack = function () {
            // 清除心跳计时器对象
            _this.heartBeatHandler.resetHeartbeat();
            // 清除检查消息循环
            _this.heartBeatHandler.resetCheckMessage();
            //清除推拉流状态
            _this.resetStreamCenter();
        };
        this.roomHandler.onUserStateUpdate = function (roomId, userList) {
            _this.onUserStateUpdate(roomId, userList);
        };
        this.roomHandler.onDisconnect = function (err) {
            _this.onDisconnect(err);
        };
        this.roomHandler.loginBodyData = function () { return _this.loginBodyData(); };
    };
    BaseCenter.prototype.bindMessageHandler = function () {
        var _this = this;
        this.messageHandler = new messageHandler_1.MessageHandler(this.logger, this.stateCenter, this.socketCenter);
        this.messageHandler.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
            _this.onRecvCustomCommand(from_userid, from_idname, custom_content);
        };
        this.messageHandler.onRecvBigRoomMessage = function (messageList, roomId) {
            _this.onRecvBigRoomMessage(messageList, roomId);
        };
        this.messageHandler.onRecvReliableMessage = function (type, seq, data) {
            _this.onRecvReliableMessage(type, seq, data);
        };
    };
    BaseCenter.prototype.bindLiveHandler = function () {
        var _this = this;
        this.liveHandler = new liveHandler_1.LiveHandler(this.logger, this.stateCenter, this.socketCenter);
        this.liveHandler.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvEndJoinLiveCommand(requestId, from_userid, from_username, roomid);
        };
        this.liveHandler.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvInviteJoinLiveRequest(requestId, from_userid, from_username, roomid);
        };
        this.liveHandler.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvJoinLiveRequest(requestId, from_userid, from_username, roomid);
        };
    };
    BaseCenter.prototype.bindStreamCenterHandler = function () {
        var _this = this;
        this.streamCenter.onPlayStateUpdate = function (type, streamid, error) {
            _this.onPlayStateUpdateHandle(type, streamid, error);
        };
        this.streamCenter.onPlayQualityUpdate = function (streamId, streamQuality) {
            _this.onPlayQualityUpdate(streamId, streamQuality);
        };
        this.streamCenter.onPublishStateUpdate = function (type, streamid, error) {
            _this.onPublishStateUpdateHandle(type, streamid, error);
        };
        this.streamCenter.onPublishQualityUpdate = function (streamId, streamQuality) {
            _this.onPublishQualityUpdate(streamId, streamQuality);
        };
        this.streamCenter.onPlayerStreamUrlUpdate = function (streamid, url, type) {
            _this.onStreamUrlUpdate(streamid, url, type);
        };
        this.streamCenter.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
            _this.onVideoSizeChanged(streamId, videoWidth, videoHeight);
        };
    };
    /*********
     *
     * 下面的方法微信和web端实现一样，共用
     *
     *
     * ****/
    /*
    *    "zb.cm.cf": "ZegoClient.base.config",
    */
    // 配置client
    BaseCenter.prototype.config = function (option) {
        this.logger.debug("zb.cm.cf call");
        if (!client_util_1.ClientUtil.checkConfigParam(option, this.logger)) {
            this.logger.error("zb.cm.cf param error");
            return false;
        }
        this.stateCenter.appid = option.appid;
        this.stateCenter.server = option.server;
        this.stateCenter.idName = option.idName;
        this.stateCenter.nickName = option.nickName;
        if (typeof option.testEnvironment === 'boolean') {
            this.stateCenter.testEnvironment = option.testEnvironment;
        }
        this.logger.setLogLevel(option.logLevel);
        if (option.audienceCreateRoom === false) {
            this.stateCenter.roomCreateFlag = 0;
        }
        if (!option.remoteLogLevel) {
            this.logger.setRemoteLogLevel(0);
        }
        else {
            this.logger.setRemoteLogLevel(option.remoteLogLevel);
        }
        this.logger.setSessionInfo(option.appid, "", "", option.idName, "", zego_entity_1.PROTO_VERSION);
        if (option.logUrl) {
            this.logger.openLogServer(option.logUrl);
        }
        if (this.stateCenter.server.indexOf("test2-wsliveroom-api.zego.im") != -1 || this.stateCenter.server.indexOf("wsliveroom-test.zegocloud.com") != -1 || this.stateCenter.server.indexOf("wsliveroom-test.zego.im") != -1) {
            this.stateCenter.testEnvironment = true;
        }
        this.stateCenter.configOK = true;
        this.logger.debug("zb.cm.cf call success");
        return true;
    };
    //房间相关---登录，房间人员变化
    BaseCenter.prototype.login = function (roomid, role, token, success, error) {
        if (typeof roomid !== 'string' || typeof token !== 'string' || (role !== 1 && role !== 2)) {
            this.logger.error('zb.rh.lg params error');
            return;
        }
        this.roomHandler.login(roomid, role, token, null, success, error);
    };
    ;
    BaseCenter.prototype.loginWithAuthor = function (roomid, role, token, authToken, success, error) {
        if (typeof roomid !== 'string' || typeof token !== 'string' || typeof authToken !== 'string' || (role !== 1 && role !== 2)) {
            this.logger.error('zb.rh.lg params error');
            return;
        }
        this.roomHandler.login(roomid, role, token, authToken, success, error);
    };
    ;
    BaseCenter.prototype.logout = function () {
        return this.roomHandler.logout();
    };
    ;
    BaseCenter.prototype.setUserStateUpdate = function (update) {
        if (typeof update !== "boolean") {
            console.error("setUserStateUpdate param error");
            return;
        }
        this.roomHandler.setUserStateUpdate(update);
    };
    BaseCenter.prototype.onUserStateUpdate = function (roomId, userList) {
    };
    BaseCenter.prototype.onGetTotalUserList = function (roomId, userList) {
    };
    BaseCenter.prototype.onUpdateOnlineCount = function (roomId, userCount) {
    };
    BaseCenter.prototype.onGetAnchorInfo = function (anchor_userid, anchro_username) {
    };
    /*
    *    "zc.p.r": "ZegoClient.release"
    */
    // 释放房间和播放器
    BaseCenter.prototype.release = function () {
        this.logger.debug("zb.cm.rl call");
        this.roomHandler.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.roomHandler.resetRoom();
        this.logger.stopLogServer();
        this.logger.debug("zb.cm.rl call success");
    };
    BaseCenter.prototype.sendCustomCommand = function (dstMembers, customContent, success, error) {
        if (typeof customContent !== 'string' && typeof customContent !== 'object') {
            this.logger.error('zb.mh.scc params error');
            return false;
        }
        return this.messageHandler.sendCustomCommand(dstMembers, customContent, success, error);
    };
    BaseCenter.prototype.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
    };
    BaseCenter.prototype.sendRoomMsg = function (msg_category, msg_type, msg_content, success, error) {
        this.messageHandler.sendRoomMsg(msg_category, msg_type, msg_content, success, error);
    };
    BaseCenter.prototype.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
    };
    BaseCenter.prototype.sendReliableMessage = function (type, data, success, error) {
        this.messageHandler.sendReliableMessage(type, data, success, error);
    };
    BaseCenter.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    BaseCenter.prototype.sendBigRoomMessage = function (category, type, content, success, error) {
        this.messageHandler.sendBigRoomMessage(category, type, content, success, error);
    };
    BaseCenter.prototype.onRecvBigRoomMessage = function (messageList, roomId) {
    };
    BaseCenter.prototype.sendRelayMessage = function (type, data, success, error) {
        this.messageHandler.sendRelayMessage(type, data, success, error);
    };
    BaseCenter.prototype.requestJoinLive = function (destIdName, success, error, resultCallback) {
        return this.liveHandler.requestJoinLive(destIdName, success, error, resultCallback);
    };
    BaseCenter.prototype.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.inviteJoinLive = function (destIdName, success, error, resultCallback) {
        return this.liveHandler.inviteJoinLive(destIdName, success, error, resultCallback);
    };
    BaseCenter.prototype.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.endJoinLive = function (destIdName, success, error) {
        return this.liveHandler.endJoinLive(destIdName, success, error);
    };
    BaseCenter.prototype.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.respondJoinLive = function (requestId, respondResult, success, error) {
        return this.liveHandler.respondJoinLive(requestId, respondResult, success, error);
    };
    /*
     *    "zc.p.ums": "ZegoClient.updateMixStream",//更新混流信令
     */
    BaseCenter.prototype.updateMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        return this.streamHandler.updateMixStream(mixStreamConfig, successCallback, errorCallback);
    };
    ;
    /*
     *    "zc.p.sms": "ZegoClient.stopMixStream", //停止混流信令
     */
    BaseCenter.prototype.stopMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        return this.streamHandler.stopMixStream(mixStreamConfig, successCallback, errorCallback);
    };
    ;
    BaseCenter.prototype.updateStreamExtraInfo = function (streamid, extraInfo) {
        return this.streamHandler.updateStreamExtraInfo(streamid, extraInfo);
    };
    BaseCenter.prototype.onStreamUrlUpdate = function (streamid, url, type) {
    };
    ;
    BaseCenter.prototype.onStreamUpdated = function (type, streamList) {
    };
    BaseCenter.prototype.onStreamExtraInfoUpdated = function (streamList) {
    };
    BaseCenter.prototype.onPlayStateUpdate = function (type, streamid, error) {
    };
    BaseCenter.prototype.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
    };
    BaseCenter.prototype.onPlayQualityUpdate = function (streamId, streamQuality) {
    };
    BaseCenter.prototype.onPublishStateUpdate = function (type, streamid, error) {
    };
    BaseCenter.prototype.onPublishQualityUpdate = function (streamId, streamQuality) {
    };
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
    BaseCenter.prototype.onDisconnect = function (err) {
    };
    BaseCenter.prototype.onKickOut = function (err) {
    };
    BaseCenter.getCurrentVersion = function () {
        return zego_entity_1.PROTO_VERSION;
    };
    return BaseCenter;
}(common_1.Common));
exports.BaseCenter = BaseCenter;


/***/ }),

/***/ "./sdk/common/clientBase/liveHandler.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/liveHandler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var LiveHandler = /** @class */ (function () {
    function LiveHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
    *    "zb.lh.rjl": "ZegoClient.base.LiveHandler.requestJoinLive",
     */
    LiveHandler.prototype.requestJoinLive = function (destIdName, success, error, resultCallback) {
        this.logger.debug("zb.lh.rjl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        if (resultCallback == undefined) {
            return false;
        }
        this.stateCenter.joinLiveCallbackMap[requestId] = resultCallback;
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveRequest, signalCmd, destIdName, success, error);
        return true;
    };
    /*
   *    "zb.lh.ijl": "ZegoClient.base.LiveHandler.inviteJoinLive",
    */
    LiveHandler.prototype.inviteJoinLive = function (destIdName, success, error, resultCallback) {
        this.logger.debug("zb.lh.ijl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        if (resultCallback == undefined) {
            return false;
        }
        this.stateCenter.joinLiveCallbackMap[requestId] = resultCallback;
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveInvite, signalCmd, destIdName, success, error);
        return true;
    };
    /*
  *    "zb.lh.ejl": "ZegoClient.base.LiveHandler.endJoinLive",
   */
    LiveHandler.prototype.endJoinLive = function (destIdName, success, error) {
        this.logger.debug("zb.lh.ejl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveStop, signalCmd, destIdName, success, error);
        return true;
    };
    /*
  *    "zb.lh.rpjl": "ZegoClient.base.LiveHandler.respondJoinLive",
   */
    LiveHandler.prototype.respondJoinLive = function (requestId, respondResult, success, error) {
        this.logger.debug("zb.lh.rpjl call");
        var dest_id_name = this.stateCenter.joinLiveRequestMap[requestId];
        if (!dest_id_name) {
            this.logger.info("zb.lh.rpjl no dest id name");
            return false;
        }
        var result = 0;
        if (respondResult === true)
            result = 1;
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, dest_id_name, result);
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveResult, signalCmd, dest_id_name, success, error);
        delete this.stateCenter.joinLiveRequestMap[requestId];
        return true;
    };
    /*
    *    "zb.lh.ssc": "ZegoClient.base.LiveHandler.sendSignalCmd",
   */
    //连麦信令
    LiveHandler.prototype.sendSignalCmd = function (cmd, signalMsg, dest_id_name, success, error) {
        this.logger.debug("zb.lh.ssc call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.lh.ssc state error");
            return;
        }
        this.logger.debug("zb.lh.ssc send signal cmd " + cmd);
        var bodyData = {
            "sub_cmd": cmd,
            "signal_msg": signalMsg,
            "dest_id_name": [dest_id_name]
        };
        this.socketCenter.sendMessage("signal", bodyData, success, error);
        this.logger.info("zb.lh.ssc call success");
    };
    /*
   *    "zb.lh.hpsm": "ZegoClient.base.LiveHandler.handlePushSignalMsg",
   */
    // 连麦信令push
    LiveHandler.prototype.handlePushSignalMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.warn("zb.lh.hpsm not login");
            return;
        }
        var signalMsg = JSON.parse(msg.body.signal_msg);
        this.logger.debug("zb.lh.hpcm hpsm= ", signalMsg);
        switch (msg.body.sub_cmd) {
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:
                this.handlePushJoinLiveRequestMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:
                this.handlePushJoinLiveResultMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:
                this.handlePushJoinLiveInviteMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:
                this.handlePushJoinLiveStopMsg(signalMsg);
        }
        this.logger.debug("zb.lh.hpsm call end");
    };
    /*
    *    "zb.lh.hpjlrm": "ZegoClient.base.LiveHandler.handlePushJoinLiveRequestMsg",
   */
    //请求连麦push
    LiveHandler.prototype.handlePushJoinLiveRequestMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlrm no requestId");
            return;
        }
        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            this.logger.error("zb.lh.hpjlrm no from user");
            return;
        }
        this.stateCenter.joinLiveRequestMap[requestId] = dest_id_name;
        this.logger.info("zb.lh.hpjlrm onRecvJoinLiveRequest " + dest_id_name);
        this.onRecvJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    /*
    *    "zb.lh.hpjlim": "ZegoClient.base.LiveHandler.handlePushJoinLiveInviteMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveInviteMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlim no requestId");
            return;
        }
        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            this.logger.error("zb.lh.hpjlim no from user");
            return;
        }
        this.stateCenter.joinLiveRequestMap[requestId] = dest_id_name;
        this.logger.info("zb.lh.hpjlim onRecvInviteJoinLiveRequest " + dest_id_name);
        this.onRecvInviteJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    /*
    *    "zb.lh.hpjlim": "ZegoClient.base.LiveHandler.handlePushJoinLiveResultMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveResultMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlrm no requestId");
            return;
        }
        var result = signalMsg.result;
        if (result == undefined) {
            this.logger.info("zb.lh.hpjlrm no result");
            return;
        }
        var respondResult = result == 1 ? true : false;
        if (this.stateCenter.joinLiveCallbackMap[requestId]) {
            var result_callback = this.stateCenter.joinLiveCallbackMap[requestId];
            if (!result_callback) {
                this.logger.info("hpjlrm.o no callback");
                return;
            }
            this.logger.info("zb.lh.hpjlrm joinLiveRequest/invite result " + respondResult);
            delete this.stateCenter.joinLiveCallbackMap[requestId];
            result_callback(respondResult, signalMsg.from_userid, signalMsg.from_username);
        }
    };
    /*
    *    "zb.lh.hpjlsm": "ZegoClient.base.LiveHandler.handlePushJoinLiveStopMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveStopMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlsm no requestId");
            return;
        }
        this.logger.info("zb.lh.hpjlsm onRecvEndJoinLiveCommand " + signalMsg.from_userid);
        this.onRecvEndJoinLiveCommand(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
    };
    return LiveHandler;
}());
exports.LiveHandler = LiveHandler;


/***/ }),

/***/ "./sdk/common/clientBase/messageHandler.ts":
/*!*************************************************!*\
  !*** ./sdk/common/clientBase/messageHandler.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var MessageHandler = /** @class */ (function () {
    function MessageHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
    *    "zb.mh.scc": "ZegoClient.base.MessageHandler.sendCustomCommand",
    */
    MessageHandler.prototype.sendCustomCommand = function (dstMembers, customContent, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.scc call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.scc state error");
            return false;
        }
        if (!dstMembers) {
            this.logger.error("zb.mh.scc dstMembers error");
            return false;
        }
        var customContent_send = {
            from_userid: this.stateCenter.idName,
            from_username: this.stateCenter.nickName,
            request_id: this.stateCenter.getRequestId(),
            custom_content: customContent || '',
            room_id: this.stateCenter.roomid
        };
        var bodyData = {
            "dest_id_name": dstMembers,
            "custom_msg": JSON.stringify(customContent_send)
        };
        if (!client_util_1.ClientUtil.checkCustomCommandParam(bodyData)) {
            this.logger.info("zb.mh.scc param error");
            return false;
        }
        // 发送消息
        this.socketCenter.registerRouter('custommsg', function (msg) {
            _this.handleSendCustomMsgRsp(msg);
        });
        this.socketCenter.sendCustomMessage('custommsg', bodyData, success, error);
        this.logger.info("zb.mh.scc call success");
        return true;
    };
    /*
    *    "zb.mh.hscmrcall": "ZegoClient.base.MessageHandler.handleSendCustomMsgRsp",
    */
    MessageHandler.prototype.handleSendCustomMsgRsp = function (msg) {
        this.logger.debug("zb.mh.hscmrcall");
        var sendDataNode = this.stateCenter.sendDataMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd != "custommsg") {
                this.logger.error("zb.mh.hscmrcmd wrong" + sendData.data.header.cmd);
            }
            else {
                if (msg.body.err_code === 0) {
                    if (sendData.success != null) {
                        sendData.success(msg.header.seq, sendData.data.body.custom_msg);
                    }
                }
                else {
                    if (sendData.error != null) {
                        sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.custom_msg);
                    }
                }
            }
            delete this.stateCenter.sendDataMap[msg.header.seq];
            this.stateCenter.sendDataList.remove(sendDataNode);
        }
        else {
            this.logger.error('zb.mh.hscmrno found seq=' + msg.header.seq);
        }
        this.logger.debug("zb.mh.hscmr  call success");
    };
    /*
   *    "zb.mh.hpcm": "ZegoClient.base.MessageHandler.handlePushCustomMsg",
   */
    MessageHandler.prototype.handlePushCustomMsg = function (msg) {
        var submsg = JSON.parse(msg.body.custommsg);
        this.logger.debug("zb.mh.hpcm submsg=", submsg);
        this.onRecvCustomCommand(submsg.from_userid, submsg.from_username, submsg.custom_content);
    };
    MessageHandler.prototype.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
    };
    /*
    *    "zb.mh.srm": "ZegoClient.base.MessageHandler.sendRoomMsg",
    */
    MessageHandler.prototype.sendRoomMsg = function (msg_category, msg_type, msg_content, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.srm call");
        // 不是处于登录状态
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.srm state error");
            return;
        }
        var timestamp = Date.parse(new Date() + '');
        if (this.stateCenter.sendRoomMsgTime > 0 && this.stateCenter.sendRoomMsgTime + this.stateCenter.SendRoomMsgInterval > timestamp) {
            this.logger.info("zb.mh.srm freq error");
            if (error) {
                error(zego_entity_1.sdkErrorList.FREQ_LIMITED, 0, msg_category, msg_type, msg_content);
            }
            return;
        }
        this.stateCenter.sendRoomMsgTime = timestamp;
        this.logger.debug("zb.mh.srm send fetch request");
        var bodyData = {
            "msg_category": msg_category,
            "msg_type": msg_type,
            "msg_content": msg_content,
        };
        // 发送消息
        this.socketCenter.registerRouter('im_chat', function (msg) {
            _this.handleSendRoomMsgRsp(msg);
        });
        this.socketCenter.sendCustomMessage('im_chat', bodyData, success, error);
        this.logger.info("zb.mh.srm call success");
    };
    /*
   *    "zb.mh.hsrmr": "ZegoClient.base.MessageHandler.handleSendRoomMsgRsp",
   */
    MessageHandler.prototype.handleSendRoomMsgRsp = function (msg) {
        this.logger.debug("zb.mh.hsrmr call");
        var sendDataNode = this.stateCenter.sendDataMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd != "im_chat") {
                this.logger.error("zb.mh.hsrmr cmd wrong" + sendData.data.header.cmd);
            }
            else {
                if (msg.body.err_code === 0) {
                    if (sendData.success) {
                        sendData.success(msg.header.seq, msg.body.msg_id, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                }
                else {
                    if (sendData.error) {
                        sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                }
            }
            delete this.stateCenter.sendDataMap[msg.header.seq];
            this.stateCenter.sendDataList.remove(sendDataNode);
        }
        else {
            this.logger.error('hzb.mh.hsrmr no found seq=' + msg.header.seq);
        }
        this.logger.info("zb.mh.hsrmr call success");
    };
    MessageHandler.prototype.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
    };
    /*
  *    "zb.mh.srirm": "ZegoClient.base.MessageHandler.sendReliableMessage",
  */
    MessageHandler.prototype.sendReliableMessage = function (type, data, success, error) {
        this.logger.debug("zb.mh.srirm call");
        if (!this.stateCenter.transSeqMap[type]) {
            this.stateCenter.transSeqMap[type] = {
                seq: 0
            };
        }
        var body = {
            "trans_type": type,
            "trans_data": data,
            "trans_local_seq": this.stateCenter.transSeqMap[type].seq,
            "trans_channel": "clt"
        };
        this.socketCenter.sendMessage("trans", body, success, error);
    };
    /*
    *    "zb.mh.sbim": "ZegoClient.base.MessageHandler.sendBigRoomMessage",
   */
    MessageHandler.prototype.sendBigRoomMessage = function (category, type, content, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.sbim call");
        var timeWindow = this.stateCenter.bigimTimeWindow;
        var offset = this.stateCenter.serverTimeOffset;
        var serverTime = (new Date()).getTime() + offset;
        var clientId = (++this.stateCenter.cmdSeq).toString();
        if (success == undefined) {
            success = null;
        }
        if (error == undefined) {
            error = null;
        }
        this.stateCenter.bigImCallbackMap[clientId] = {
            success: success,
            error: error
        };
        if (timeWindow == 0) {
            var bodyData = {
                "msg_category": category,
                "msg_type": type,
                "msg_content": content,
                "bigmsg_client_id": clientId
            };
            this.logger.debug("zb.mh.sbim no time window");
            this.sendBigRoomMessageInternal([bodyData], function (msg) {
                _this.handleBigImMsgRsp(msg);
            }, error);
        }
        else {
            var currentIndex = Math.floor(serverTime / timeWindow);
            this.logger.debug("currentIndex " + currentIndex + " lastTimeIndex " + this.stateCenter.bigImLastTimeIndex);
            if (this.stateCenter.bigImLastTimeIndex < currentIndex && this.stateCenter.bigImMessageList.length == 0) {
                this.stateCenter.bigImLastTimeIndex = currentIndex;
                var oneData = {
                    "msg_category": category,
                    "msg_type": type,
                    "msg_content": content,
                    "bigmsg_client_id": clientId
                };
                this.sendBigRoomMessageInternal([oneData], function (msg) {
                    _this.handleBigImMsgRsp(msg);
                }, error);
            }
            else {
                this.stateCenter.bigImMessageList.push({
                    msg_category: category,
                    msg_type: type,
                    msg_content: content,
                    bigmsg_client_id: clientId
                });
                if (this.stateCenter.bigImMessageList.length == 1) {
                    this.setBigImTimer(offset, timeWindow);
                }
            }
        }
    };
    /*
    *    "zb.mh.hpmmnot": "ZegoClient.base.MessageHandler.handlePushMergeMsg",
    */
    MessageHandler.prototype.handlePushMergeMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.hpmmnot login");
            return;
        }
        for (var i = 0; i < msg.body.messages.length; i++) {
            if (msg.body.messages[i].sub_cmd === 14001) {
                this.handlePushBigRooMsg(msg.body.messages[i].msg_body);
            }
        }
        this.logger.debug("zb.mh.hpmm call success");
    };
    /*
    *    "zb.mh.hpbrm": "ZegoClient.base.MessageHandler.handlePushBigRooMsg",
    */
    MessageHandler.prototype.handlePushBigRooMsg = function (bodyString) {
        var messageBody;
        //messageBody json
        try {
            messageBody = JSON.parse(bodyString);
        }
        catch (e) {
            this.logger.warn("zb.mh.hpbrm parse json error");
            return;
        }
        if (!messageBody) {
            this.logger.warn("zb.mh.hpbrm cann't find message body");
            return;
        }
        var roomId = messageBody.room_id;
        var pushData = [];
        for (var i = 0; i < messageBody.msg_data.length; i++) {
            var message = messageBody.msg_data[i];
            var idName = message.id_name;
            if (idName == this.stateCenter.idName) {
                this.logger.debug("zb.mh.hpbrm self message");
                continue;
            }
            pushData.push({
                idName: message.id_name,
                nickName: message.nick_name,
                messageId: message.bigmsg_id,
                category: message.msg_category,
                type: message.msg_type,
                content: message.msg_content,
                time: message.send_time
            });
        }
        if (pushData.length == 0) {
            this.logger.debug("zb.mh.hpbrm no other pushData except self");
        }
        else {
            this.onRecvBigRoomMessage(pushData, roomId);
        }
        this.logger.debug("zb.mh.hpbrm call success");
    };
    MessageHandler.prototype.onRecvBigRoomMessage = function (messageList, roomId) {
    };
    /*
   *    "zb.mh.sbim": "ZegoClient.base.MessageHandler.sendBigRoomMessageInternal",
   */
    MessageHandler.prototype.sendBigRoomMessageInternal = function (msgs, success, error) {
        this.logger.debug("zb.mh.sbim call");
        var bodyData = {
            "msgs": msgs
        };
        this.socketCenter.sendMessage("bigim_chat", bodyData, success, error);
    };
    /*
     *    "zb.mh.hbmr": "ZegoClient.base.MessageHandler.handleBigImMsgRsp",
     */
    MessageHandler.prototype.handleBigImMsgRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.info("zb.mh.hbmr not login");
            return;
        }
        if (this.stateCenter.bigimTimeWindow != msg.body.bigim_time_window) {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        for (var i = 0; i < msg.body.msgs.length; i++) {
            var clientId = msg.body.msgs[i].bigmsg_client_id;
            var msgId = msg.body.msgs[i].bigmsg_id;
            if (this.stateCenter.bigImCallbackMap[clientId]) {
                var success = this.stateCenter.bigImCallbackMap[clientId].success;
                if (success != null) {
                    success(msg.header.seq, msgId);
                }
                delete this.stateCenter.bigImCallbackMap[clientId];
            }
        }
    };
    /*
     *    "zb.mh.sbt": "ZegoClient.base.MessageHandler.setBigImTimer",
     */
    MessageHandler.prototype.setBigImTimer = function (offset, timeWindow) {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow - (serverTimestamp % timeWindow);
        var interval = client_util_1.ClientUtil.generateRandumNumber(timeWindow) + residue;
        this.logger.info("zb.mh.sbt setTimer " + interval);
        this.stateCenter.bigImTimer = setTimeout(function () {
            _this.onBigImTimer();
        }, interval);
    };
    MessageHandler.prototype.onBigImTimer = function () {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + this.stateCenter.serverTimeOffset;
        this.stateCenter.bigImLastTimeIndex = Math.floor(serverTimestamp / this.stateCenter.bigimTimeWindow);
        var bodyData = [];
        var requestList = [];
        for (var i = 0; i < this.stateCenter.bigImMessageList.length; i++) {
            if (i >= 20) {
                break;
            }
            var info = this.stateCenter.bigImMessageList[i];
            bodyData.push({
                "msg_category": info.msg_category,
                "msg_type": info.msg_type,
                "msg_content": info.msg_content,
                "bigmsg_client_id": info.bigmsg_client_id
            });
            requestList.push(info.bigmsg_client_id);
        }
        if (this.stateCenter.bigImMessageList.length > 20) {
            this.stateCenter.bigImMessageList.splice(0, 20);
        }
        else {
            this.stateCenter.bigImMessageList = [];
        }
        this.sendBigRoomMessageInternal(bodyData, function (msg) {
            _this.handleBigImMsgRsp(msg);
        }, function (err, seq) {
            for (var i = 0; i < requestList.length; i++) {
                var clientId = requestList[i];
                var callbackInfo = _this.stateCenter.bigImCallbackMap[clientId];
                if (callbackInfo) {
                    if (callbackInfo.error != null) {
                        callbackInfo.error(err, seq);
                    }
                    delete _this.stateCenter.bigImCallbackMap[clientId];
                }
            }
        });
        clearTimeout(this.stateCenter.bigImTimer);
        this.stateCenter.bigImTimer = null;
        if (this.stateCenter.bigImMessageList.length > 0) {
            this.setBigImTimer(this.stateCenter.serverTimeOffset, this.stateCenter.bigimTimeWindow);
        }
    };
    /*
    *    "zb.mh.srlm": "ZegoClient.base.MessageHandler.sendRelayMessage",
    */
    MessageHandler.prototype.sendRelayMessage = function (type, data, success, error) {
        this.logger.debug("zb.mh.srm call");
        var timeWindow = this.stateCenter.datiTimeWindow;
        var offset = this.stateCenter.serverTimeOffset;
        if (timeWindow > 0) {
            this.stateCenter.realyMessageList.push({
                type: type,
                data: data,
                success: success,
                error: error
            });
            if (this.stateCenter.realyMessageList.length == 1) {
                this.setRelayTimer(offset, timeWindow);
            }
        }
        else {
            this.sendRelayMessageInternal(type, data, success, error);
        }
    };
    /*
   *    "zb.mh.srlmi": "ZegoClient.base.MessageHandler.sendRelayMessageInternal",
   */
    MessageHandler.prototype.sendRelayMessageInternal = function (type, data, success, error) {
        this.logger.debug("zb.mh.srmi call");
        var bodyData = {
            "relay_type": type,
            "relay_data": data
        };
        this.socketCenter.sendMessage("relay", bodyData, success, error);
    };
    /*
  *    "zb.mh.srt": "ZegoClient.base.MessageHandler.setRelayTimer",
  */
    MessageHandler.prototype.setRelayTimer = function (offset, timeWindow) {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow * 2 - (serverTimestamp % timeWindow);
        var interval = client_util_1.ClientUtil.generateRandumNumber(residue);
        this.logger.info("zb.mh.srt setTimer " + interval);
        this.stateCenter.relayTimer = setTimeout(function () {
            _this.onRelayTimer();
        }, interval);
    };
    /*
    *    "zb.mh.ort": "ZegoClient.base.MessageHandler.onRelayTimer",
    */
    MessageHandler.prototype.onRelayTimer = function () {
        if (this.stateCenter.realyMessageList.length == 0) {
            this.logger.info("zb.mh.ort no relay data");
            return;
        }
        var relayInfo = this.stateCenter.realyMessageList[0];
        this.sendRelayMessageInternal(relayInfo.type, relayInfo.data, relayInfo.success, relayInfo.error);
        clearTimeout(this.stateCenter.relayTimer);
        this.stateCenter.relayTimer = null;
        this.stateCenter.realyMessageList.splice(0, 1);
        if (this.stateCenter.realyMessageList.length > 0) {
            this.setRelayTimer(this.stateCenter.serverTimeOffset, this.stateCenter.datiTimeWindow);
        }
    };
    /*
   *    "zb.mh.hptr": "ZegoClient.base.MessageHandler.handlePushTransMsg",
   */
    MessageHandler.prototype.handlePushTransMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.hptr not login");
            return;
        }
        var type = msg.body.trans_type;
        var seq = msg.body.trans_seq;
        if (!this.stateCenter.transSeqMap[type]) {
            this.stateCenter.transSeqMap[type] = {
                seq: seq
            };
        }
        else {
            this.stateCenter.transSeqMap[type].seq = seq;
        }
        if (msg.body.trans_user_idname != this.stateCenter.idName) {
            this.onRecvReliableMessage(type, seq, msg.body.trans_data);
        }
        else {
            this.logger.debug("zb.mh.hptr receive self trans message");
        }
        this.logger.info("zb.mh.hptr trans " + type + " seq " + seq);
    };
    MessageHandler.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    return MessageHandler;
}());
exports.MessageHandler = MessageHandler;


/***/ }),

/***/ "./sdk/common/clientBase/roomHandler.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/roomHandler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var RoomHandler = /** @class */ (function () {
    function RoomHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
   *    "zb.rh.srs": "ZegoClient.base.RoomHandler.setRunState",
   */
    RoomHandler.prototype.setRunState = function (newRunState) {
        this.logger.debug("zb.rh.srs old=" + this.stateCenter.runState + ", new=" + newRunState);
        this.stateCenter.lastRunState = this.stateCenter.runState;
        this.stateCenter.runState = newRunState;
    };
    /*
  *    "zb.rh.rtl": "ZegoClient.base.RoomHandler.resetTryLogin",
  */
    RoomHandler.prototype.resetTryLogin = function () {
        this.logger.debug("zb.rh.rtl call");
        clearTimeout(this.stateCenter.tryLoginTimer);
        this.stateCenter.tryLoginTimer = null;
        this.stateCenter.tryLoginCount = 0;
        this.logger.debug("zb.rh.rtl call success");
    };
    RoomHandler.prototype.resetBigRoomInfo = function () {
        //清除trans信令信息
        this.stateCenter.transSeqMap = {};
        //清除relay信令信息
        this.stateCenter.realyMessageList = [];
        if (this.stateCenter.relayTimer) {
            clearTimeout(this.stateCenter.relayTimer);
            this.stateCenter.relayTimer = null;
        }
        //清除大房间消息
        this.stateCenter.bigImLastTimeIndex = 0;
        this.stateCenter.bigIMmessageList = [];
        this.stateCenter.bigImCallbackMap = {};
        if (this.stateCenter.bigImTimer) {
            clearTimeout(this.stateCenter.bigImTimer);
            this.stateCenter.bigImTimer = null;
        }
        this.stateCenter.serverTimeOffset = 0;
        this.stateCenter.datiTimeWindow = 0;
        this.stateCenter.bigimTimeWindow = 0;
    };
    /*
     *    "zb.rh.rr": "ZegoClient.base.RoomHandler.resetRoom",
     */
    RoomHandler.prototype.resetRoom = function () {
        var _this = this;
        this.logger.debug('zb.rh.rr call');
        // 清除尝试登录计时器对象
        this.resetTryLogin();
        this.resetRoomCallBack();
        // 清除流列表
        this.stateCenter.streamList = [];
        this.stateCenter.streamQuerying = false;
        this.stateCenter.publishStreamList = {};
        // 清除连麦信令
        this.stateCenter.joinLiveCallbackMap = {};
        this.stateCenter.joinLiveRequestMap = {};
        // 清除请求url信息
        this.stateCenter.streamUrlMap = {};
        //清除大房间消息
        this.resetBigRoomInfo();
        this.stateCenter.cmdCallback = {};
        // 防止多次重置时，发送多次消息
        this.logger.debug('zb.rh.rr call send logout=', this.stateCenter.sessionid);
        if (this.stateCenter.sessionid !== '0') {
            var bodyData = {
                "reserve": 0
            };
            this.socketCenter.registerRouter('logout', function (msg) {
                _this.handleLogoutRsp(msg);
            });
            this.socketCenter.sendMessage('logout', bodyData);
        }
        this.socketCenter.closeSocket();
        //setTimeout( () =>{
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.stateCenter.userid = '';
        this.stateCenter.sessionid = '';
        this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, zego_entity_1.PROTO_VERSION);
        //},500);
        this.logger.debug('zb.rh.rr call success');
    };
    //空接口，被覆盖
    RoomHandler.prototype.resetRoomCallBack = function () {
    };
    RoomHandler.prototype.onDisconnect = function (err) {
    };
    //空实现，被覆盖
    RoomHandler.prototype.loginSuccessCallBack = function (lastRunState, msg) {
    };
    //空实现 被sdk覆盖
    RoomHandler.prototype.onGetTotalUserList = function (roomId, userList) {
    };
    /*
    *    "zb.rh.lg": "ZegoClient.base.RoomHandler.login",
    */
    //登录房间
    RoomHandler.prototype.login = function (roomid, role, token, authToken, success, error) {
        this.logger.setSessionInfo(this.stateCenter.appid, roomid, "", this.stateCenter.idName, "", zego_entity_1.PROTO_VERSION);
        this.logger.info("zb.rh.lg call:", roomid, token);
        authToken && (this.stateCenter.third_token = authToken);
        if (!this.stateCenter.configOK || !client_util_1.ClientUtil.checkLoginParam(roomid, token)) {
            this.logger.error("zb.rh.lg param error");
            error({ code: '', msg: 'param error' });
            return;
        }
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.logout) {
            this.logger.debug("zb.rh.lg reset");
            this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            this.resetRoom();
        }
        this.logger.debug("zb.rh.lg begin");
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.trylogin);
        this.stateCenter.roomid = roomid;
        this.stateCenter.token = token;
        this.stateCenter.role = role;
        client_util_1.ClientUtil.registerCallback('login', {
            success: success,
            error: error
        }, this.stateCenter.callbackList);
        this.resetTryLogin();
        this.tryLogin();
        this.logger.info("zb.rh.lg call success");
    };
    //登录请求数据包  被覆盖
    RoomHandler.prototype.loginBodyData = function () {
        return null;
    };
    /*
      *    "zb.rh.tl": "ZegoClient.base.RoomHandler.tryLogin",
      */
    RoomHandler.prototype.tryLogin = function () {
        var _this = this;
        this.logger.debug('zb.rh.tl call');
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.trylogin) {
            this.logger.error('zb.rh.tl state error');
            return;
        }
        // 如果尝试登录次数大于最大可尝试次数，则直接置为logout登出状态
        if (++this.stateCenter.tryLoginCount > zego_entity_1.MAX_TRY_LOGIN_COUNT) {
            this.logger.error('zb.rh.tl fail times limit');
            var lastRunState = this.stateCenter.lastRunState;
            this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            this.resetRoom();
            if (lastRunState == zego_entity_1.ENUM_RUN_STATE.login) {
                //relogin fail, not by user
                this.logger.error('zb.rh.tl fail and disconnect');
                this.onDisconnect(zego_entity_1.sdkErrorList.LOGIN_DISCONNECT);
            }
            else {
                //trylogin fail, call by user
                this.logger.info('zb.rh.tl fail and callback user');
                client_util_1.ClientUtil.actionErrorCallback('login', this.stateCenter.callbackList)(zego_entity_1.sdkErrorList.LOGIN_TIMEOUT);
            }
            return;
        }
        this.stateCenter.startConnceTime = new Date().getTime();
        console.warn('start connect', this.stateCenter.startConnceTime);
        // 如果websocket还未初始化或者还不是处于连接状态
        if (this.socketCenter.isDisConnect()) {
            this.logger.debug('zb.rh.tl need new websocket');
            try {
                // 若已经初始化，但是还不是连接状态，先清除置为null
                this.socketCenter.closeSocket();
                // 建立websocket连接
                this.logger.debug('zb.rh.tl new websocket');
                this.socketCenter.createSocket(this.stateCenter.server);
                this.socketCenter.registerRouter('login', function (msg, seq) {
                    _this.handleLoginRsp(msg, seq);
                });
                this.socketCenter.closeHandler(function (err) {
                    _this.socketCenter.closeSocket();
                    _this.closeHandler(err);
                });
                this.socketCenter.openHandler(function () {
                    _this.openHandler();
                });
            }
            catch (e) {
                this.logger.error("zb.rh.tl websocket err:" + e);
            }
        }
        else { // websocket已建立成功
            var bodyData = this.loginBodyData();
            this.logger.info('zb.rh.tl use current websocket and sent login');
            this.socketCenter.sendMessage('login', bodyData);
        }
        //settimeout
        this.stateCenter.tryLoginTimer = setTimeout(function () {
            _this.tryLogin();
        }, zego_entity_1.TRY_LOGIN_INTERVAL[this.stateCenter.tryLoginCount % zego_entity_1.MAX_TRY_LOGIN_COUNT]);
        this.logger.info('zb.rh.tl call success');
    };
    /*
     *    "zb.rh.hlr": "ZegoClient.base.RoomHandler.handleLoginRsp",
     */
    RoomHandler.prototype.handleLoginRsp = function (msg, cmdSeq) {
        this.logger.debug("zb.rh.hlr call");
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.trylogin) {
            this.logger.error("zb.rh.hlr state error");
            return;
        }
        else if (msg.header.seq !== cmdSeq) {
            this.logger.error("zb.rh.hlr in wrong seq, local=", cmdSeq, ",recv=", msg.header.seq);
            return;
        }
        else if (msg.body.err_code !== 0) {
            this.handleLoginFail(msg);
            this.logger.error("zb.rh.hlr server error=", msg.body.err_code);
            return;
        }
        else {
            this.handleLoginSuccess(msg);
            this.logger.info("zb.rh.hlr call success.");
        }
    };
    /*
     *    "zb.rh.hlf": "ZegoClient.base.RoomHandler.handleLoginFail",
     */
    //登录失败回调
    RoomHandler.prototype.handleLoginFail = function (msg) {
        this.logger.debug("zb.rh.hlf call");
        if (client_util_1.ClientUtil.isKeepTryLogin(msg.body.err_code)) {
            this.logger.warn("zb.rh.hlf KeepTry true");
            return;
        }
        //stop
        var lastRunState = this.stateCenter.lastRunState;
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.resetRoom();
        var err = client_util_1.ClientUtil.getServerError(msg.body.err_code);
        if (lastRunState === zego_entity_1.ENUM_RUN_STATE.login) {
            //relogin fail, not by user
            this.logger.info('zb.rh.hlf callback disconnect');
            this.onDisconnect(err);
        }
        else {
            //trylogin fail, call by user
            this.logger.info('zb.rh.hlf callback error');
            client_util_1.ClientUtil.actionErrorCallback('login', this.stateCenter.callbackList)(err);
        }
        this.logger.debug("zb.rh.hlf call success");
    };
    /*
     *    "zb.rh.hls": "ZegoClient.base.RoomHandler.handleLoginSuccess",
     */
    //登录成功回调
    RoomHandler.prototype.handleLoginSuccess = function (msg) {
        this.stateCenter.startloginSucTime = new Date().getTime();
        console.warn('login suc', this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime);
        this.logger.info("zb.rh.hls call");
        //enter login
        var lastRunState = this.stateCenter.lastRunState;
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.login);
        this.stateCenter.userid = msg.body.user_id;
        this.stateCenter.sessionid = msg.body.session_id;
        this.stateCenter.anchor_info = msg.body.anchor_info || this.stateCenter.anchor_info;
        //set log
        this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, zego_entity_1.PROTO_VERSION);
        if (msg.body.config_info) {
            this.logger.setRemoteLogLevel(msg.body.config_info.log_level);
            if (msg.body.config_info.log_url != "")
                this.logger.openLogServer(msg.body.config_info.log_url);
        }
        //get time stamp & window
        if (msg.body.ret_timestamp != undefined && typeof msg.body.ret_timestamp == "string") {
            var serverTime = parseFloat(msg.body.ret_timestamp);
            if (serverTime == 0) {
                this.stateCenter.serverTimeOffset = 0;
            }
            else {
                this.stateCenter.serverTimeOffset = msg.body.ret_timestamp - (new Date()).getTime();
            }
        }
        if (msg.body.bigim_time_window && typeof msg.body.bigim_time_window == "number") {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window && typeof msg.body.dati_time_window == "number") {
            this.stateCenter.datiTimeWindow = msg.body.dati_time_window;
        }
        //stop trylogin
        this.resetTryLogin();
        this.loginSuccessCallBack(lastRunState, msg);
    };
    /*
    *    "zb.rh.oh": "ZegoClient.base.RoomHandler.openHandler",
    */
    RoomHandler.prototype.openHandler = function () {
        // websocket连接已经打开
        // 注册onmessage函数，处理服务的发过来的消息，该函数只调用一次
        this.logger.info('zb.rh.oh websocket.onpen call');
        this.socketCenter.responseHandler();
        // 发送消息
        var bodyData = this.loginBodyData();
        this.logger.info('zb.rh.oh websocket.onpen send login');
        this.stateCenter.startloginTime = new Date().getTime();
        console.warn('start login', this.stateCenter.startloginTime, this.stateCenter.startloginTime - this.stateCenter.startConnceTime);
        this.socketCenter.sendMessage('login', bodyData);
        this.logger.debug('zb.rh.oh websocket.onpen call success');
    };
    /*
    *    "zb.rh.oc": "ZegoClient.base.RoomHandler.closeHandler",
   */
    RoomHandler.prototype.closeHandler = function (e) {
        this.logger.info("zb.rh.ws.oc msg=" + JSON.stringify(e));
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.logout) {
            if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.trylogin && this.stateCenter.tryLoginCount <= zego_entity_1.MAX_TRY_LOGIN_COUNT) {
                //trylogin --> trylogin
                this.logger.info("zb.rh.ws.oc is called because of try login");
            }
            else if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.login) {
                //login --> trylogin
                this.logger.info("zb.rh.ws.oc is called because of network broken, try again");
                this.setRunState(zego_entity_1.ENUM_RUN_STATE.trylogin);
                this.resetTryLogin();
                this.tryLogin();
            }
            else {
                //unknown
                this.logger.error("zb.rh.ws.oc out of think!!!");
                this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
                this.resetRoom();
                this.onDisconnect(zego_entity_1.sdkErrorList.UNKNOWN);
            }
        }
        else {
            //* --> logout
            this.logger.info("zb.rh.ws.oc onclose logout flow call websocket.close");
        }
    };
    /*
   *    "zb.rh.lo": "ZegoClient.base.RoomHandler.logout",
  */
    RoomHandler.prototype.logout = function () {
        this.logger.debug("zb.rh.lo call");
        if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.logout) {
            this.logger.warn("zb.rh.lo at logout");
            return false;
        }
        this.resetRoom();
        this.logger.info("zb.rh.lo call success");
        return true;
    };
    /*
  *    "zb.rh.su": "ZegoClient.base.RoomHandler.setUserStateUpdate",
 */
    RoomHandler.prototype.setUserStateUpdate = function (update) {
        this.logger.debug("zb.rh.su call");
        if (typeof update !== "boolean") {
            this.logger.info("zb.rh.su param error");
            return false;
        }
        this.stateCenter.userStateUpdate = update;
        this.logger.info("zb.rh.su call success " + update);
        return true;
    };
    /*
    *    "zb.rh.ful": "ZegoClient.base.RoomHandler.fetchUserList",
   */
    // 拉取服务端user信息
    RoomHandler.prototype.fetchUserList = function () {
        this.logger.debug("zb.rh.ful call");
        if (this.stateCenter.userQuerying) {
            this.logger.warn("zb.rh.ful is already querying");
            return;
        }
        this.stateCenter.userQuerying = true;
        this.stateCenter.userTempList = [];
        zego_entity_1.ROOMVERSION === 'V1' ? this.fetchUserListWithPage(0) : this.fetchUserListWithPageV2(0);
        this.logger.info("zb.rh.ful the first time call");
    };
    /*
    *    "zb.rh.fulwp": "ZegoClient.base.RoomHandler.fetchUserListWithPage",
   */
    //分页拉取user list
    RoomHandler.prototype.fetchUserListWithPageV2 = function (userIndex) {
        var _this = this;
        this.logger.debug("zb.rh.fulwp call");
        this.socketCenter.registerRouter('user_list_v2', function (msg) {
            _this.handleFetchUserListRspV2(userIndex, msg);
        });
        // 发送消息
        this.socketCenter.sendMessage('user_list_v2', {
            marker: userIndex === 0 ? '' : (userIndex + ''),
            mode: 0,
            limit: 100
        });
        this.logger.info("zb.rh.fulwp call success");
    };
    /*
   *    "zb.rh.fulwp": "ZegoClient.base.RoomHandler.fetchUserListWithPage",
  */
    //分页拉取user list
    RoomHandler.prototype.fetchUserListWithPage = function (userIndex) {
        var _this = this;
        this.logger.debug("zb.rh.fulwp call");
        this.socketCenter.registerRouter('user_list', function (msg) {
            _this.handleFetchUserListRsp(msg);
        });
        // 发送消息
        this.socketCenter.sendMessage('user_list', {
            "user_index": userIndex,
            "sort_type": 0
        });
        this.logger.info("zb.rh.fulwp call success");
    };
    /*
    *    "zb.rh.hfulr": "ZegoClient.base.RoomHandler.handleFetchUserListRsp",
   */
    RoomHandler.prototype.handleFetchUserListRspV2 = function (currentIndex, msg) {
        this.logger.debug("zb.rh.hfulr call");
        if (msg.body.err_code != 0) {
            this.stateCenter.userQuerying = false;
            this.logger.info("zb.rh.hfulr fetch error " + msg.body.err_code);
            return;
        }
        //set userseq
        if (!this.stateCenter.userStateUpdate) {
            return;
        }
        this.stateCenter.userTempList = this.stateCenter.userTempList.concat(msg.body.user_baseinfos);
        // this.logger.debug("zb.rh.hfulr server user_list " + msg.body.user_baseinfos);
        var serverIndex = msg.body.marker;
        if (currentIndex != serverIndex) {
            this.logger.warn("zb.rh.hfulr fetch another page");
            this.fetchUserListWithPageV2(currentIndex + 1);
            return;
        }
        this.stateCenter.userSeq = msg.body.server_user_seq;
        this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < this.stateCenter.userTempList.length; i++) {
            var user_info = {
                "idName": this.stateCenter.userTempList[i].id_name,
                "nickName": this.stateCenter.userTempList[i].nick_name,
                "role": this.stateCenter.userTempList[i].role
            };
            user_list.push(user_info);
        }
        this.stateCenter.userQuerying = false;
        this.onGetTotalUserList(this.stateCenter.roomid, user_list);
        this.stateCenter.userTempList = [];
        this.logger.info("zb.rh.hfulr call success user_list " + user_list + " count " + user_list.length);
    };
    /*
    *    "zb.rh.hfulr": "ZegoClient.base.RoomHandler.handleFetchUserListRsp",
   */
    RoomHandler.prototype.handleFetchUserListRsp = function (msg) {
        this.logger.debug("zb.rh.hfulr call");
        if (msg.body.err_code != 0) {
            this.stateCenter.userQuerying = false;
            this.logger.info("zb.rh.hfulr fetch error " + msg.body.err_code);
            return;
        }
        //set userseq
        if (!this.stateCenter.userStateUpdate) {
            return;
        }
        this.stateCenter.userTempList = this.stateCenter.userTempList.concat(msg.body.user_baseinfos);
        // this.logger.debug("zb.rh.hfulr server user_list " + msg.body.user_baseinfos);
        var currentIndex = msg.body.ret_user_index;
        var serverIndex = msg.body.server_user_index;
        if (currentIndex != serverIndex) {
            this.logger.warn("zb.rh.hfulr fetch another page");
            this.fetchUserListWithPage(currentIndex + 1);
            return;
        }
        this.stateCenter.userSeq = msg.body.server_user_seq;
        this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < this.stateCenter.userTempList.length; i++) {
            var user_info = {
                "idName": this.stateCenter.userTempList[i].id_name,
                "nickName": this.stateCenter.userTempList[i].nick_name,
                "role": this.stateCenter.userTempList[i].role
            };
            user_list.push(user_info);
        }
        this.stateCenter.userQuerying = false;
        this.onGetTotalUserList(this.stateCenter.roomid, user_list);
        this.stateCenter.userTempList = [];
        this.logger.info("zb.rh.hfulr call success user_list " + user_list + " count " + user_list.length);
    };
    /*
    *    "zb.rh.hlor": "ZegoClient.base.RoomHandler.handleLogoutRsp",
     */
    RoomHandler.prototype.handleLogoutRsp = function (msg) {
        this.logger.debug("zb.rh.hlor result=", msg.body.err_code);
    };
    /*
   *    "zb.rh.hpus": "ZegoClient.base.RoomHandler.handlePushUserStateUpdateMsg",
    */
    RoomHandler.prototype.handlePushUserStateUpdateMsg = function (msg) {
        this.logger.info("zb.rh.hpus call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.rh.hpus not login");
            return;
        }
        if (!this.stateCenter.userStateUpdate) {
            this.logger.error("zb.rh.hpus no userStateUpdate flag");
            return;
        }
        if (this.stateCenter.userSeq + msg.body.user_actions.length !== msg.body.user_list_seq) {
            this.logger.warn("zb.rh.hpus fetch new userlist " + this.stateCenter.userSeq, +" server " + msg.body.user_list_seq);
            this.fetchUserList();
            return;
        }
        this.stateCenter.userSeq = msg.body.user_list_seq;
        this.logger.debug("zb.rh.hpus push userSeq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < msg.body.user_actions.length; i++) {
            var user_info = {
                "action": msg.body.user_actions[i].Action,
                "idName": msg.body.user_actions[i].IdName,
                "nickName": msg.body.user_actions[i].NickName,
                "role": msg.body.user_actions[i].Role,
                "loginTime": msg.body.user_actions[i].LoginTime
            };
            user_list.push(user_info);
        }
        this.onUserStateUpdate(msg.body.room_id, user_list);
        this.logger.info("zb.rh.hpus call success");
    };
    RoomHandler.prototype.onUserStateUpdate = function (roomId, userList) {
    };
    return RoomHandler;
}());
exports.RoomHandler = RoomHandler;


/***/ }),

/***/ "./sdk/common/clientBase/socketCenter.ts":
/*!***********************************************!*\
  !*** ./sdk/common/clientBase/socketCenter.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var SocketCenter = /** @class */ (function () {
    function SocketCenter(logger, stateCenter) {
        var _this = this;
        this.cmdSeq = 0;
        this.responseRouters = {};
        this.logger = logger;
        this.stateCenter = stateCenter;
        this.responseRouters = {
            'push_kickout': function (msg) {
                _this.handlePushKickout(msg);
            },
            'push_custommsg': function (msg) {
                _this.handlePushCustomMsg(msg);
            },
            'push_im_chat': function (msg) {
                _this.handlePushRoomMsg(msg);
            },
            'push_userlist_update': function (msg) {
                _this.handlePushUserStateUpdateMsg(msg);
            },
            'push_merge_message': function (msg) {
                _this.handlePushMergeMsg(msg);
            },
            'trans': function (msg) {
                _this.handleTransRsp(msg);
            },
            'push_trans': function (msg) {
                _this.handlePushTransMsg(msg);
            }
        };
    }
    /*
     *    "hpk.0": "ZegoClient.handlePushKickout",
     */
    SocketCenter.prototype.handlePushKickout = function (msg) {
    };
    SocketCenter.prototype.handlePushCustomMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushRoomMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushUserStateUpdateMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushMergeMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushTransMsg = function (msg) {
    };
    SocketCenter.prototype.handleBigImMsgRsp = function (msg) {
    };
    /*
     *    "zb.sc.htr": "ZegoClient.base.SocketCenter.handleTransRsp",
     *
     */
    //trans回包
    SocketCenter.prototype.handleTransRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.sc.htr not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error("zb.sc.htr trans send error " + msg.body.err_code);
            return;
        }
        var type = msg.body.trans_type;
        if (!this.stateCenter.transSeqMap[type]) {
            this.logger.error("zb.sc.htr cannot match send info");
            return;
        }
        //update seq
        this.stateCenter.transSeqMap[type].seq = msg.body.trans_seq;
        this.logger.debug("zb.sc.htr trans " + type + " seq " + msg.body.trans_seq);
    };
    SocketCenter.prototype.handleBizChannelRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                sendData.success(msg.header.seq, msg.body.cmd, msg.body.rsp_body);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(msg.body.err_code, msg.header.seq, msg.body.rsp_body);
            }
        }
    };
    //注册cmd回调事件
    SocketCenter.prototype.registerRouter = function (name, callBack) {
        this.responseRouters[name] = callBack;
    };
    SocketCenter.prototype.getSocket = function (server) {
        return null;
    };
    // 获取全局参数对象header
    SocketCenter.prototype.getHeaderV2 = function (cmd) {
        var header = {
            'Protocol': 'req_v2',
            'cmd': cmd,
            'appid': this.stateCenter.appid,
            'seq': ++this.cmdSeq,
            'user_id': this.stateCenter.userid,
            'session_id': this.stateCenter.sessionid || '',
            'room_id': this.stateCenter.roomid || ''
        };
        return header;
    };
    // 获取全局参数对象header
    SocketCenter.prototype.getHeader = function (cmd) {
        return {
            'Protocol': 'req',
            'cmd': cmd,
            'appid': this.stateCenter.appid,
            'seq': ++this.cmdSeq,
            'user_id': this.stateCenter.userid,
            'session_id': this.stateCenter.sessionid || '',
            'room_id': this.stateCenter.roomid || '',
        };
    };
    /*
     *    "zb.sc.sm": "ZegoClient.base.SocketCenter.sendMessage",
     *
     */
    SocketCenter.prototype.sendMessage = function (cmd, body, success, error) {
        this.logger.debug("zb.sc.sm call " + cmd);
        if (this.isDisConnect()) {
            this.logger.error("zb.sc.sm error  " + cmd + "websocket is disconnected");
            return -1;
        }
        var header = zego_entity_1.ROOMVERSION === 'V1' ? this.getHeader(cmd) : this.getHeaderV2(cmd);
        var data = {
            "header": header,
            "body": body
        };
        success == undefined && (success = null);
        error == undefined && (error = null);
        if (success != null || error != null) {
            var cmdData = {
                data: data,
                seq: header.seq,
                deleted: false,
                time: Date.parse(new Date() + ''),
                success: success,
                error: error,
            };
            var cmdDataNode = this.stateCenter.sendCommandList.push(cmdData);
            this.stateCenter.sendCommandMap[cmdData.seq] = cmdDataNode;
        }
        this.websocket.send(JSON.stringify(data));
        this.logger.debug("zb.sc.sm success");
        return header.seq;
    };
    /*
     *    "zb.sc.scm": "ZegoClient.base.SocketCenter.sendCustomMessage"
     */
    //发送带回调消息
    SocketCenter.prototype.sendCustomMessage = function (cmd, body, success, error) {
        this.logger.debug("zb.sc.scm call");
        if (this.isDisConnect()) {
            this.logger.error("zb.sc.scm error");
            return false;
        }
        var header = zego_entity_1.ROOMVERSION === 'V1' ? this.getHeader(cmd) : this.getHeaderV2(cmd);
        var data = {
            "header": header,
            "body": body,
        };
        var dataBuffer = JSON.stringify(data);
        if (success == undefined)
            success = null;
        if (error == undefined)
            error = null;
        var cmdData = {
            data: data,
            seq: header.seq,
            deleted: false,
            time: Date.parse(new Date() + ''),
            success: success,
            error: error,
        };
        var cmdDataNode = this.stateCenter.sendDataList.push(cmdData);
        this.stateCenter.sendDataMap[cmdData.seq] = cmdDataNode;
        this.websocket.send(dataBuffer);
        this.logger.debug("zb.sc.scm success seq: ", header.seq);
        return true;
    };
    SocketCenter.prototype.isDisConnect = function () {
        return !this.websocket || this.websocket.readyState !== 1;
    };
    /*
    *    "zb.sc.cs": "ZegoClient.base.SocketCenter.closeSocket"
    */
    SocketCenter.prototype.closeSocket = function () {
        if (this.websocket) {
            this.logger.info('zb.sc.cs close websocket');
            this.websocket.onclose = null;
            this.websocket.onerror = null;
            this.websocket.close();
            this.websocket = null;
        }
    };
    SocketCenter.prototype.createSocket = function (server) {
        this.websocket = this.getSocket(server);
    };
    SocketCenter.prototype.openHandler = function (hander) {
        this.websocket.onopen = hander;
    };
    /*
    *    "zb.sc.ch": "ZegoClient.base.SocketCenter.closeHandler"
    */
    SocketCenter.prototype.closeHandler = function (hander) {
        this.websocket.onclose = hander;
    };
    /*
    *    "zb.sc.ws.oe": "ZegoClient.base.SocketCenter.errorHandler"
    */
    SocketCenter.prototype.errorHandler = function () {
        var _this = this;
        this.websocket.onerror = function (e) {
            _this.logger.error("zb.sc.oe msg=" + JSON.stringify(e));
        };
    };
    /*
    *    "zb.sc.crp": "ZegoClient.base.SocketCenter.checkResponse"
    */
    // 被logincenter 覆盖
    SocketCenter.prototype.checkResponse = function (msg) {
        if (msg.header.appid !== this.stateCenter.appid ||
            msg.header.session_id !== this.stateCenter.sessionid ||
            msg.header.user_id !== this.stateCenter.userid ||
            msg.header.room_id !== this.stateCenter.roomid ||
            this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.login) {
            this.logger.error("zb.sc.crp check session fail.");
            return true;
        }
        else {
            return false;
        }
    };
    /*
    *    "zb.sc.ws.rph: "ZegoClient.base.SocketCenter.responseHandler"
    */
    SocketCenter.prototype.responseHandler = function () {
        var _this = this;
        this.websocket.onmessage = function (e) {
            var msg = JSON.parse(e.data);
            _this.logger.info("zb.sc.ws.rph jsonmsg= ", msg.header.cmd);
            _this.logger.info("zb.sc.ws.rph jsonmsg= ", e.data);
            if (msg.body.err_code !== 0) {
                msg.body.err_message && _this.logger.error("zb.sc.ws.rph cmd=" + msg.header.cmd + ", err_code=" + msg.body.err_code + ", err_message=" + msg.body.err_message + " ");
            }
            if (msg.header.cmd === 'login') {
                _this.responseRouters['login'](msg, _this.cmdSeq);
                return;
            }
            else if (msg.header.cmd === 'logout') {
                _this.responseRouters['logout'](msg, _this.cmdSeq);
                return;
            }
            if (!_this.stateCenter.isLogin()) {
                _this.logger.warn("zb.sc.ws.rph  already logout");
                return;
            }
            if (_this.checkResponse(msg)) {
                _this.logger.error("zb.sc.ws.rph check session fail.");
                return;
            }
            //检查消息回包
            _this.handleSendCommandMsgRsp(msg);
            _this.logger.info("zb.sc.ws.rph cmd=" + msg.header.cmd + ",function=" + !!_this.responseRouters[msg.header.cmd]);
            _this.responseRouters[msg.header.cmd] && _this.responseRouters[msg.header.cmd](msg);
            // switch (msg.header.cmd) {
            //   case 'hb':
            //     this.handleHeartbeatRsp(msg);
            //     break;
            //   case 'logout':
            //     this.handleLogoutRsp(msg);
            //     break;
            //   case 'custommsg':
            //     this.handleSendCustomMsgRsp(msg);
            //     break;
            //   case 'stream_info':
            //     this.handleFetchStreamListRsp(msg);
            //     break;
            //   case 'push_custommsg':
            //     this.handlePushCustomMsg(msg);
            //     break;
            //   case 'push_stream_update':
            //     this.handlePushStreamUpdateMsg(msg);
            //     break;
            //   case 'push_kickout':
            //     this.handlePushKickout(msg);
            //     break;
            //   case 'stream_url':?-wx
            //     this.handleFetchStreamUrlRsp(msg);
            //     break;
            //   case 'stream_publish':?-wx
            //     this.handleFetchStreamPublishUrlRsp(msg);
            //     break;
            //   case 'webrtc_url':
            //     this.handleFetchWebRtcUrlRsp(msg);
            //     break;
            //   case 'im_chat':
            //     this.handleSendRoomMsgRsp(msg);
            //     break;
            //   case 'push_im_chat':
            //     this.handlePushRoomMsg(msg);
            //     break;
            //   case 'push_userlist_update':
            //     this.handlePushUserStateUpdateMsg(msg);
            //     break;
            //   case 'user_list':
            //     this.handleFetchUserListRsp(msg);
            //     break;
            //   case 'push_signal':
            //     this.handlePushSignalMsg(msg);
            //     break;
            //   case 'stream':
            //     this.handleStreamUpdateRsp(msg);
            //     break;
            //   case 'trans':
            //     this.handleTransRsp(msg);
            //     break;
            //   case 'trans_fetch':
            //     this.handleFetchTransRsp(msg);
            //     break;
            //   case 'push_trans':
            //     this.handlePushTransMsg(msg);
            //     break;
            //   case 'push_merge_message':
            //     this.handlePushMergeMsg(msg);
            //     break;
            // }
        };
    };
    /*
   *    "zb.sc.hscmr: "ZegoClient.base.SocketCenter.handleSendCommandMsgRsp"
   */
    SocketCenter.prototype.handleSendCommandMsgRsp = function (msg) {
        this.logger.debug("zb.sc.hscmr call");
        var sendDataNode = this.stateCenter.sendCommandMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd == "login") {
                this.logger.debug("zb.sc.hscmr don't check " + sendData.data.header.cmd);
            }
            else if (sendData.data.header.cmd == "relay") {
                this.handleRelayRspCallback(msg, sendData);
            }
            else if (sendData.data.header.cmd == "bigim_chat") {
                this.handleBigImRspCallback(msg, sendData);
            }
            else if (sendData.data.header.cmd == "biz_channel") {
                this.handleBizChannelRspCallback(msg, sendData);
            }
            else if (msg.body.err_code === 0) {
                sendData.success != null && sendData.success(msg.header.seq);
            }
            else {
                sendData.error != null && sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
            delete this.stateCenter.sendCommandMap[msg.header.seq];
            this.stateCenter.sendCommandList.remove(sendDataNode);
        }
        this.logger.debug("zb.sc.hscmr call success");
    };
    SocketCenter.prototype.handleRelayRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                sendData.success(msg.header.seq, msg.body.relay_result);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    };
    SocketCenter.prototype.handleBigImRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                //should be sendData.success callback
                this.handleBigImMsgRsp(msg);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    };
    return SocketCenter;
}());
exports.SocketCenter = SocketCenter;


/***/ }),

/***/ "./sdk/common/clientBase/stateCenter.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/stateCenter.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ../zego.extern */ "./sdk/common/zego.extern.ts");
var StateCenter = /** @class */ (function () {
    function StateCenter() {
        this.testEnvironment = false;
        this.third_token = '';
        this.pullLimited = true;
        this.configOK = false;
        this.roomCreateFlag = 1;
        this.runState = zego_entity_1.ENUM_RUN_STATE.logout;
        this.lastRunState = zego_entity_1.ENUM_RUN_STATE.logout;
        this.callbackList = {};
        this.streamList = [];
        this.publishStreamList = {};
        //用户相关
        this.userQuerying = false;
        this.userTempList = [];
        this.userSeq = 0;
        this.anchor_info = {
            anchor_id: "",
            anchor_id_name: "",
            anchor_nick_name: ""
        };
        //command check timout
        this.sendCommandMap = {};
        this.sendCommandList = new zego_entity_1.LinkedList();
        this.sendDataMap = {};
        this.sendDataList = new zego_entity_1.LinkedList();
        this.joinLiveCallbackMap = {};
        this.joinLiveRequestMap = {};
        this.streamUrlMap = {};
        this.cmdCallback = {};
        //x消息相关
        this.transSeqMap = {};
        this.realyMessageList = [];
        this.relayTimer = null;
        this.bigImLastTimeIndex = 0;
        this.bigIMmessageList = [];
        this.bigImCallbackMap = {};
        this.bigImTimer = null;
        this.serverTimeOffset = 0;
        this.datiTimeWindow = 0;
        this.bigimTimeWindow = 0;
        this.bigImMessageList = [];
        this.tryLoginCount = 0;
        this.tryLoginTimer = null;
        this.heartbeatTimer = null;
        this.sendDataCheckTimer = null;
        this.sendDataCheckInterval = 2000; //检查发送消息间隔
        this.sendDataTimeout = 5 * 1000; //发送消息超时
        this.sendDataDropTimeout = 10 * 1000; //丢弃过期消息的超时时间
        this.sendDataCheckOnceCount = 100; //每次处理最大的超时包
        this.sendRoomMsgTime = 0; //上一次发送房间消息时间
        this.SendRoomMsgInterval = 500; //发送房间消息最多500毫秒发送一次
        this.cmdSeq = 0;
        //音效相关
        this.audioEffectBuffer = {};
        this.audioBitRate = 48000;
    }
    //是否登录
    StateCenter.prototype.isLogin = function () {
        return this.runState === zego_entity_1.ENUM_RUN_STATE.login;
    };
    //requestId
    StateCenter.prototype.getRequestId = function () {
        return this.idName + "-" + zego_extern_1.getSeq();
    };
    StateCenter.prototype.getSignalCmdContent = function (requestId, dest_id_name, result) {
        var data = {
            "request_id": requestId,
            "room_id": this.roomid,
            "from_userid": this.idName,
            "from_username": this.nickName,
            "to_userid": dest_id_name
        };
        if (result != undefined) {
            data["result"] = result;
        }
        return JSON.stringify(data);
    };
    return StateCenter;
}());
exports.StateCenter = StateCenter;


/***/ }),

/***/ "./sdk/common/clientBase/streamHandler.ts":
/*!************************************************!*\
  !*** ./sdk/common/clientBase/streamHandler.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var StreamHandler = /** @class */ (function () {
    function StreamHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    //空实现 被sdk覆盖
    StreamHandler.prototype.setCDNInfo = function (streamInfo, streamItem) {
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onStreamUpdated = function (type, streamList) {
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onStreamExtraInfoUpdated = function (streamList) {
    };
    /*
    *    "zb.sh.hss": "ZegoClient.base.StreamHandler.handleStreamStart",
     */
    StreamHandler.prototype.handleStreamStart = function (lastRunState, msg) {
        var _this = this;
        this.stateCenter.streamQuerying = false;
        this.socketCenter.registerRouter('stream', function (msg) {
            _this.handleStreamUpdateRsp(msg);
        });
        this.socketCenter.registerRouter('push_stream_update', function (msg) {
            _this.handlePushStreamUpdateMsg(msg);
        });
        if (lastRunState == zego_entity_1.ENUM_RUN_STATE.login) {
            this.logger.info("zb.sh.hss recover from disconnect so call streamupdate");
            //relogin and stream update callback
            this.handleFullUpdateStream(msg.body.stream_seq, msg.body.stream_info || []);
        }
        else {
            this.logger.info("zb.sh.hss success callback user");
            //login and callback
            this.stateCenter.streamList = (msg.body.stream_info || []);
            this.stateCenter.streamSeq = msg.body.stream_seq;
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
                //check whether stream contain self
                if (this.stateCenter.streamList[i].anchor_id_name == this.stateCenter.idName) {
                    //delete this stream
                    this.updateStreamInfo(this.stateCenter.streamList[i].stream_id, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd);
                    this.stateCenter.streamList.splice(i, 1);
                }
            }
            var callbackStreamList = this.makeCallbackStreamList(this.stateCenter.streamList);
            client_util_1.ClientUtil.actionSuccessCallback('login', this.stateCenter.callbackList)(callbackStreamList);
        }
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onPublishStateUpdate = function (type, streamId, error) {
    };
    /*
   *    "zb.sh.usi": "ZegoClient.base.StreamHandler.updateStreamInfo",
   */
    //流更新信令  退出上次推的自己的流
    StreamHandler.prototype.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
        var _this = this;
        if (stream_extra_info === void 0) { stream_extra_info = ''; }
        this.logger.debug("zb.sh.usi call");
        var extra_info = stream_extra_info;
        var data = {
            "stream_id": streamid,
            "extra_info": extra_info
        };
        var stream_msg = JSON.stringify(data);
        var bodyData = {
            "sub_cmd": cmd,
            "stream_msg": stream_msg
        };
        this.socketCenter.registerRouter('stream', function (msg) {
            _this.handleStreamUpdateRsp(msg);
        });
        this.socketCenter.sendMessage("stream", bodyData, undefined, error);
        this.logger.info("zb.sh.usi call success cmd " + cmd);
    };
    /*
   *    "zb.sh.hsur": "ZegoClient.base.StreamHandler.handleStreamUpdateRsp",
   */
    //流更新回包
    StreamHandler.prototype.handleStreamUpdateRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.sh.hsur not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error("zb.sh.hsur stream update error " + msg.body.err_code);
            return;
        }
        this.logger.info("zb.sh.hsur stream seq " + this.stateCenter.streamSeq + " server seq " + msg.body.stream_seq);
        this.stateCenter.streamSeq = msg.body.stream_seq;
        //流删除时，publishStreamList已经删除了
        for (var i = 0; i < msg.body.stream_info.length; i++) {
            var streamid = msg.body.stream_info[i].stream_id;
            if (!this.stateCenter.publishStreamList[streamid]) {
                this.logger.info("hsur.0 stream is not exist");
                return;
            }
            if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing;
                this.onPublishStateUpdate(0, streamid, 0);
            }
        }
    };
    /*
   *    "zb.sh.hfslr": "ZegoClient.base.StreamHandler.handleFetchStreamListRsp",
   */
    StreamHandler.prototype.handleFetchStreamListRsp = function (msg) {
        this.logger.info("zb.sh.hfslr call");
        this.stateCenter.streamQuerying = false;
        if (msg.body.err_code !== 0) {
            this.logger.info("zb.sh.hfslr server error=", msg.body.err_code);
            return;
        }
        if (this.stateCenter.streamSeq === msg.body.stream_seq) {
            this.logger.info("zb.sh.hfslr same seq");
            return;
        }
        this.handleFullUpdateStream(msg.body.stream_seq, msg.body.stream_info);
        this.logger.debug("zb.sh.hfslr call success");
    };
    /*
    *    "zb.sh.hfus": "ZegoClient.base.StreamHandler.handleFullUpdateStream",
   */
    StreamHandler.prototype.handleFullUpdateStream = function (serverStreamSeq, serverStreamList) {
        var _this = this;
        this.logger.debug("zb.sh.hfus call");
        this.stateCenter.streamSeq = serverStreamSeq;
        this.logger.debug("zb.sh.hfus server seq " + this.stateCenter.streamSeq);
        client_util_1.ClientUtil.mergeStreamList(this.logger, this.stateCenter.idName, this.stateCenter.streamList, serverStreamList, function (addStreamList, delStreamList, updateStreamList) {
            if (addStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback addstream");
                _this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.added, _this.makeCallbackStreamList(addStreamList));
            }
            if (delStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback delstream");
                _this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.deleted, _this.makeCallbackStreamList(delStreamList));
            }
            if (updateStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback updatestream");
                _this.onStreamExtraInfoUpdated(_this.makeCallbackStreamList(updateStreamList));
            }
        });
        this.logger.info("zb.sh.hfus call success");
    };
    /*
    *    "zb.sh.hpsum": "ZegoClient.base.StreamHandler.handlePushStreamUpdateMsg",
    */
    StreamHandler.prototype.handlePushStreamUpdateMsg = function (msg) {
        this.logger.info("zb.sh.hpsum call");
        if (!msg.body.stream_info || msg.body.stream_info.length === 0) {
            this.logger.info("zb.sh.hpsum, emtpy list");
            return;
        }
        if (msg.body.stream_info.length + this.stateCenter.streamSeq !== msg.body.stream_seq) {
            this.logger.info("zb.sh.hpsum call updatestream");
            this.fetchStreamList();
            return;
        }
        this.stateCenter.streamSeq = msg.body.stream_seq;
        switch (msg.body.stream_cmd) {
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.added:
                this.handleAddedStreamList(msg.body.stream_info);
                break;
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.deleted:
                this.handleDeletedStreamList(msg.body.stream_info);
                break;
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.updated:
                this.handleUpdatedStreamList(msg.body.stream_info);
                break;
        }
        this.logger.info("zb.sh.hpsum call success");
    };
    /*
   *    "zb.sh.hasl": "ZegoClient.base.StreamHandler.handleAddedStreamList",
   */
    StreamHandler.prototype.handleAddedStreamList = function (streamList) {
        this.logger.debug("zb.sh.hasl call");
        var addStreamList = [];
        var flag;
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("hdsl.0 have self stream added");
                continue;
            }
            flag = false;
            for (var j = 0; j < this.stateCenter.streamList.length; j++) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                addStreamList.push(streamList[i]);
            }
        }
        if (addStreamList.length !== 0) {
            this.logger.debug("zb.sh.hasl callback addstream");
            // this.stateCenter.streamList.concat(addStreamList);
            for (var k = 0; k < addStreamList.length; k++) {
                this.stateCenter.streamList.push(addStreamList[k]);
            }
            this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(addStreamList));
        }
        this.logger.info("zb.sh.hasl call success");
    };
    /*
     *    "zb.sh.hdsl": "ZegoClient.base.StreamHandler.handleDeletedStreamList",
    */
    StreamHandler.prototype.handleDeletedStreamList = function (streamList) {
        this.logger.debug("zb.sh.hdsl call");
        var delStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("zb.sh.hdsl have self stream deleted");
                continue;
            }
            for (var j = this.stateCenter.streamList.length - 1; j >= 0; j--) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    this.stateCenter.streamList.splice(j, 1);
                    delStreamList.push(streamList[i]);
                    break;
                }
            }
        }
        if (delStreamList.length !== 0) {
            this.logger.debug("zb.sh.hdsl callback delstream");
            this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(delStreamList));
        }
        this.logger.info("zb.sh.hdsl call");
    };
    /*
     *    "zb.sh.husl": "ZegoClient.base.StreamHandler.handleUpdatedStreamList",
    */
    StreamHandler.prototype.handleUpdatedStreamList = function (streamList) {
        this.logger.debug("zb.sh.husl call");
        var updateStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("hsul.0 have self stream updated");
                continue;
            }
            for (var j = 0; j < this.stateCenter.streamList.length; j++) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    if (streamList[i].extra_info !== this.stateCenter.streamList[j].extra_info) {
                        this.stateCenter.streamList[j] = streamList[i];
                        updateStreamList.push(streamList[i]);
                    }
                    break;
                }
            }
        }
        if (updateStreamList.length !== 0) {
            this.logger.debug("zb.sh.husl callback updatestream");
            this.onStreamExtraInfoUpdated(this.makeCallbackStreamList(updateStreamList));
        }
        this.logger.info("zb.sh.husl call success");
    };
    /*
     *    "zb.sh.fsl": "ZegoClient.base.StreamHandler.fetchStreamList",
    */
    // 拉取服务端流信息
    StreamHandler.prototype.fetchStreamList = function () {
        this.logger.info("zb.sh.fsl call");
        // 不是处于登录状态，不让拉流
        if (this.stateCenter.isLogin()) {
            this.logger.info("zb.sh.fsl state error");
            return;
        }
        // 是否正处于拉流状态 false 为完成， true为正在拉流
        if (this.stateCenter.streamQuerying) {
            this.logger.info("zb.sh.fsl already doing");
            return;
        }
        this.stateCenter.streamQuerying = true;
        this.logger.debug("zb.sh.fsl send fetch request");
        var bodyData = {
            "reserve": 0
        };
        // 发送消息
        this.socketCenter.registerRouter('stream_info', this.handleFetchStreamListRsp);
        this.socketCenter.sendMessage('stream_info', bodyData);
        this.logger.debug("zb.sh.fsl call success");
    };
    StreamHandler.prototype.makeCallbackStreamList = function (streamList) {
        var callbackStreamList = [];
        if (streamList && streamList.length > 0) {
            for (var i = 0; i < streamList.length; i++) {
                var streamInfo = {
                    anchor_id_name: streamList[i].anchor_id_name,
                    stream_gid: streamList[i].stream_gid,
                    anchor_nick_name: streamList[i].anchor_nick_name,
                    extra_info: streamList[i].extra_info,
                    stream_id: streamList[i].stream_id,
                    urls_flv: '',
                    urls_rtmp: '',
                    urls_hls: '',
                    urls_https_flv: '',
                    urls_https_hls: ''
                };
                this.setCDNInfo(streamInfo, streamList[i]);
                callbackStreamList.push(streamInfo);
            }
        }
        return callbackStreamList;
    };
    /*
     *    "zb.sh.ums": "ZegoClient.base.StreamHandler.updateMixStream",
    */
    StreamHandler.prototype.updateMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        var _this = this;
        this.logger.info("zb.sh.ums call");
        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zb.sh.ums no mix stream info");
            return false;
        }
        if (mixStreamConfig.streamList.length == 0) {
            this.logger.error("zb.sh.ums no input stream");
            return false;
        }
        var req_body = {
            "id_name": this.stateCenter.idName,
            "live_channel": this.stateCenter.roomid,
            "appid": this.stateCenter.appid,
            "version": zego_entity_1.PROTO_VERSION
        };
        if (typeof mixStreamConfig.userData == "string" && mixStreamConfig.userData.length <= 10000) {
            req_body["UserData"] = mixStreamConfig.userData;
        }
        var mixInput = [];
        for (var i = 0; i < mixStreamConfig.streamList.length; i++) {
            var streamInfo = mixStreamConfig.streamList[i];
            var totalStreamId = streamInfo.streamId;
            if (this.stateCenter.testEnvironment) {
                totalStreamId = "zegotest-" + this.stateCenter.appid + "-" + streamInfo.streamId;
            }
            mixInput.push({
                stream_id: totalStreamId,
                rect: {
                    layer: i,
                    top: streamInfo.top,
                    left: streamInfo.left,
                    bottom: streamInfo.bottom,
                    right: streamInfo.right
                }
            });
        }
        req_body["MixInput"] = mixInput;
        var mixOutput = {};
        if (mixStreamConfig.outputStreamId != undefined) {
            if (this.stateCenter.testEnvironment) {
                mixOutput["stream_id"] = "zegotest-" + this.stateCenter.appid + "-" + mixStreamConfig.outputStreamId;
            }
            else {
                mixOutput["stream_id"] = mixStreamConfig.outputStreamId;
            }
        }
        else if (mixStreamConfig.outputUrl != undefined) {
            mixOutput["mixurl"] = mixStreamConfig.outputUrl;
        }
        if (mixStreamConfig.outputBitrate) {
            mixOutput["bitrate"] = mixStreamConfig.outputBitrate;
        }
        else {
            this.logger.error("zb.sh.ums no bitrate param");
            return false;
        }
        if (mixStreamConfig.outputFps) {
            mixOutput["fps"] = mixStreamConfig.outputFps;
        }
        else {
            this.logger.error("zb.sh.ums no fps param");
            return false;
        }
        if (mixStreamConfig.outputWidth) {
            mixOutput["width"] = mixStreamConfig.outputWidth;
        }
        else {
            this.logger.error("zb.sh.ums no width param");
            return false;
        }
        if (mixStreamConfig.outputHeight) {
            mixOutput["height"] = mixStreamConfig.outputHeight;
        }
        else {
            this.logger.error("zb.sh.ums no height param");
            return false;
        }
        if (mixStreamConfig.outputAudioConfig) {
            mixOutput["audio_enc_id"] = mixStreamConfig.outputAudioConfig;
        }
        if (mixStreamConfig.outputAudioBitrate) {
            mixOutput["audio_bitrate"] = mixStreamConfig.outputAudioBitrate;
        }
        if (mixStreamConfig.outputAudioChannels) {
            mixOutput["audio_channel_cnt"] = mixStreamConfig.outputAudioChannels;
        }
        if (mixStreamConfig.outputBgColor) {
            // mixOutput["output_bg_color"] = mixStreamConfig.outputBgColor;
            if (typeof mixStreamConfig.outputBgColor !== "number") {
                this.logger.error("zb.sh.ums param outputBgColor error");
                return false;
            }
            req_body["output_bg_color"] = mixStreamConfig.outputBgColor;
        }
        if (mixStreamConfig.outputBgImage) {
            // mixOutput["output_bg_image"] = mixStreamConfig.outputBgImage;
            if (typeof mixStreamConfig.outputBgImage !== "string" || !mixStreamConfig.outputBgImage.startsWith("preset-id://")) {
                this.logger.error("zb.sh.ums param outputBgImage error");
                return false;
            }
            req_body["output_bg_image"] = mixStreamConfig.outputBgImage;
        }
        if (this.stateCenter.testEnvironment) {
            mixOutput["testenv"] = 1;
        }
        else {
            mixOutput["testenv"] = 0;
        }
        req_body["MixOutput"] = [mixOutput];
        var body = {
            channel: "zeus",
            cmd: "start_mix",
            req_body: JSON.stringify(req_body)
        };
        this.logger.debug("zb.sh.ums send command");
        this.socketCenter.sendMessage("biz_channel", body, function (seq, cmd, rspBody) {
            _this.logger.debug("zb.sh.ums receive message");
            var prefix = "zegotest-" + _this.stateCenter.appid + "-";
            if (rspBody.length == 0) {
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + 1));
                }
                return;
            }
            var data = JSON.parse(rspBody);
            var mixPlayInfoList = [];
            var streamId = mixStreamConfig.outputStreamId;
            for (var i = 0; i < data.play.length; i++) {
                var mixPlayInfo = {
                    rtmpUrls: null,
                    hlsUrls: null,
                    flvUrls: null
                };
                if (_this.stateCenter.testEnvironment && streamId && streamId.startsWith(prefix)) {
                    streamId = streamId.slice(prefix.length);
                }
                if (data.play[i].rtmp_url && data.play[i].rtmp_url.length > 0) {
                    mixPlayInfo["rtmpUrls"] = [data.play[i].rtmp_url];
                }
                if (data.play[i].hls_url && data.play[i].hls_url.length > 0) {
                    mixPlayInfo["hlsUrls"] = [data.play[i].hls_url];
                }
                if (data.play[i].hdl_url && data.play[i].hdl_url.length > 0) {
                    mixPlayInfo["flvUrls"] = [data.play[i].hdl_url];
                }
                mixPlayInfoList.push(mixPlayInfo);
            }
            ;
            if (successCallback) {
                successCallback(streamId, mixPlayInfoList);
            }
        }, function (error, seq, rspBody) {
            if (typeof error == "number") {
                _this.logger.debug("zb.sh.ums error: " + error);
                var nonExistsStreamId = [];
                if (error == 1000000150 && rspBody.length != 0) {
                    //no stream list
                    var data = JSON.parse(rspBody);
                    var prefix = "zegotest-" + _this.stateCenter.appid + "-";
                    for (var i = 0; i < data.non_exist_streams.length; i++) {
                        var totalStreamId = data.non_exist_streams[i];
                        if (_this.stateCenter.testEnvironment && totalStreamId.startsWith(prefix)) {
                            nonExistsStreamId.push(totalStreamId.slice(prefix.length));
                        }
                        else {
                            nonExistsStreamId.push(totalStreamId);
                        }
                    }
                }
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + error), nonExistsStreamId);
                }
            }
            else {
                _this.logger.debug("zb.sh.ums error code " + error.code);
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
        return true;
    };
    ;
    /*
    *    "zb.sh.sms": "ZegoClient.base.StreamHandler.stopMixStream",
   */
    //停止混流信令
    StreamHandler.prototype.stopMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        this.logger.info("zb.sh.sms call");
        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zb.sh.sms no mix stream info");
            return false;
        }
        var req_body = {
            "id_name": this.stateCenter.idName,
            "live_channel": this.stateCenter.roomid,
            "appid": this.stateCenter.appid,
            "version": zego_entity_1.PROTO_VERSION
        };
        if (mixStreamConfig.outputStreamId != undefined) {
            if (this.stateCenter.testEnvironment) {
                req_body["stream_id"] = "zegotest-" + this.stateCenter.appid + "-" + mixStreamConfig.outputStreamId;
            }
            else {
                req_body["stream_id"] = mixStreamConfig.outputStreamId;
            }
        }
        else if (mixStreamConfig.outputUrl != undefined) {
            req_body["mixurl"] = mixStreamConfig.outputUrl;
        }
        var body = {
            channel: "zeus",
            cmd: "stop_mix",
            req_body: JSON.stringify(req_body)
        };
        this.socketCenter.sendMessage("biz_channel", body, function (seq, data) {
            if (successCallback) {
                successCallback();
            }
        }, function (error, seq) {
            if (typeof error == "number") {
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + error));
                }
            }
            else {
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
        return true;
    };
    ;
    /*
    *    "zb.sh.usei": "ZegoClient.base.StreamHandler.updateStreamExtraInfo",
   */
    StreamHandler.prototype.updateStreamExtraInfo = function (streamid, extraInfo) {
        this.logger.info("zb.sh.usei call");
        if (!streamid) {
            this.logger.error("zb.sh.usei param error");
            return false;
        }
        if (typeof extraInfo != "string") {
            return false;
        }
        if (this.stateCenter.publishStreamList[streamid]) {
            this.stateCenter.publishStreamList[streamid].extra_info = extraInfo;
            if (this.stateCenter.publishStreamList[streamid].state >= zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveUpdate, extraInfo);
            }
        }
        return true;
    };
    return StreamHandler;
}());
exports.StreamHandler = StreamHandler;


/***/ }),

/***/ "./sdk/common/zego.datareport.ts":
/*!***************************************!*\
  !*** ./sdk/common/zego.datareport.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ZegoDataReport = /** @class */ (function () {
    function ZegoDataReport(log) {
        this.log = log;
        this.dataStatistics = {};
        this.logger = log;
    }
    ZegoDataReport.prototype.newReport = function (seq) {
        this.dataStatistics[seq] = {
            abs_time: Date.now(),
            time_consumed: 0,
            error: 0,
            events: [],
        };
    };
    ;
    ZegoDataReport.prototype.addMsgExt = function (seq, msg_ext) {
        if (!this.dataStatistics[seq]) {
            console.warn(seq + " not exist");
            return;
        }
        this.dataStatistics[seq].msg_ext = msg_ext;
    };
    ;
    /*
     *    "zd.es.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventStart = function (seq, event_name) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.es.0 no seq match");
            return;
        }
        else if (this.dataStatistics[seq].events == undefined) {
            this.logger.warn("zd.es.0 no events");
            return;
        }
        this.dataStatistics[seq].events.push({
            event: event_name,
            abs_time: Date.now(),
            time_consumed: 0
        });
    };
    ;
    /*
     *    "zd.ee.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventEnd = function (seq, event_name, extInfo) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.ee.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (!events || events.length === 0) {
            this.logger.info("zd.ee.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed) {
                events[i].time_consumed = Date.now() - events[i].abs_time;
                break;
            }
        }
    };
    ;
    ZegoDataReport.prototype.eventEndWithMsg = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.ee.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (!events) {
            this.logger.warn("zd.ee.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed) {
                events[i].time_consumed = Date.now() - events[i].abs_time;
                if (events[i].msg_ext == undefined) {
                    events[i].msg_ext = {};
                }
                events[i].msg_ext = __assign({}, msg_ext);
                break;
            }
        }
    };
    ;
    /*
     *    "zd.aei.0": "ZegoDataReport.addEventInfo"
     */
    ZegoDataReport.prototype.addEventInfo = function (seq, event_name, key, value) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.aei.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (events == undefined) {
            this.logger.warn("zd.aei.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed != undefined) {
                if (events[i].event == event_name && events[i].time_consumed != undefined) {
                    if (events[i].msg_ext == undefined) {
                        events[i].msg_ext = {};
                    }
                    events[i].msg_ext[key] = value;
                    break;
                }
            }
        }
    };
    ;
    /*
     *    "zd.ae.0": "ZegoDataReport.addEvent"
     */
    ZegoDataReport.prototype.addEvent = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.ae.0 no seq match");
            return;
        }
        if (!this.dataStatistics[seq].events) {
            return;
        }
        if (msg_ext) {
            this.dataStatistics[seq].events.push({
                event: event_name,
                abs_time: Date.now(),
                msg_ext: msg_ext
            });
        }
        else {
            this.dataStatistics[seq].events.push({
                event: event_name,
                abs_time: Date.now(),
            });
        }
    };
    ;
    ZegoDataReport.prototype.uploadReport = function (seq, itemType) {
        var reportInfo = this.dataStatistics[seq];
        if (reportInfo == undefined) {
            return;
        }
        reportInfo.itemtype = itemType;
        reportInfo.time_consumed = Date.now() - reportInfo.abs_time;
        this.logger.report(reportInfo);
        delete this.dataStatistics[seq];
    };
    ;
    return ZegoDataReport;
}());
exports.ZegoDataReport = ZegoDataReport;


/***/ }),

/***/ "./sdk/common/zego.entity.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.entity.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PROTO_VERSION = "1.3.0";
exports.ROOMVERSION = "V1";
var ENUM_LOG_LEVEL;
(function (ENUM_LOG_LEVEL) {
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["debug"] = 0] = "debug";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["info"] = 1] = "info";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["warn"] = 2] = "warn";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["error"] = 3] = "error";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["report"] = 99] = "report";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["disable"] = 100] = "disable";
})(ENUM_LOG_LEVEL = exports.ENUM_LOG_LEVEL || (exports.ENUM_LOG_LEVEL = {}));
;
var ENUM_REMOTE_TYPE;
(function (ENUM_REMOTE_TYPE) {
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["disable"] = 0] = "disable";
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["websocket"] = 1] = "websocket";
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["https"] = 2] = "https";
})(ENUM_REMOTE_TYPE = exports.ENUM_REMOTE_TYPE || (exports.ENUM_REMOTE_TYPE = {}));
;
var ListNode = /** @class */ (function () {
    function ListNode(id, data) {
        if (id === void 0) { id = null; }
        if (data === void 0) { data = null; }
        this._id = null;
        this.next = null;
        this.prev = null;
        this._id = id;
        this._data = data;
    }
    Object.defineProperty(ListNode.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListNode.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    ListNode.prototype.hasNext = function () {
        return this.next && this.next.id;
    };
    ListNode.prototype.hasPrev = function () {
        return this.prev && this.prev.id;
    };
    return ListNode;
}());
exports.ListNode = ListNode;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        //initialize end buffer nodes
        this.start = new ListNode();
        this.end = new ListNode();
        //initialize counters
        this._idCounter = 0;
        this._numNodes = 0;
        //initialize node pointers
        this.start.next = this.end;
        this.start.prev = null;
        this.end.prev = this.start;
        this.end.next = null;
    }
    /**
     *   Inserts a node before another node in the linked list
     *   @param {Node} toInsertBefore
     *   @param {Node} node
     */
    LinkedList.prototype.insertBefore = function (toInsertBefore, data) {
        var newNode = new ListNode(this._idCounter, data);
        newNode.next = toInsertBefore;
        newNode.prev = toInsertBefore.prev;
        toInsertBefore.prev.next = newNode;
        toInsertBefore.prev = newNode;
        ++this._idCounter;
        ++this._numNodes;
        return newNode;
    };
    /**
     *   Adds data wrapped in a Node object to the end of the linked list
     *   @param {object} data
     */
    LinkedList.prototype.addLast = function (data) {
        return this.insertBefore(this.end, data);
    };
    /**
     *   Alias for addLast
     *   @param {object} data
     */
    LinkedList.prototype.add = function (data) {
        return this.addLast(data);
    };
    /**
     *   Gets and returns the first node in the linked list or null
     *   @return {Node/null}
     */
    LinkedList.prototype.getFirst = function () {
        if (this._numNodes === 0) {
            return null;
        }
        else {
            return this.start.next;
        }
    };
    /**
     *   Gets and returns the last node in the linked list or null
     *   @return {Node/null}
     */
    LinkedList.prototype.getLast = function () {
        if (this._numNodes === 0) {
            return null;
        }
        else {
            return this.end.prev;
        }
    };
    /**
     *   Gets and returns the size of the linked list
     *   @return {number}
     */
    LinkedList.prototype.size = function () {
        return this._numNodes;
    };
    /**
     *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
     *   Use getAt instead of this function
     *   @param {number} index
     */
    LinkedList.prototype.getFromFirst = function (index) {
        var count = 0, temp = this.start.next;
        if (index >= 0) {
            while (count < index && temp !== null) {
                temp = temp.next;
                ++count;
            }
        }
        else {
            temp = null;
        }
        if (temp === null) {
            throw 'Index out of bounds.';
        }
        return temp;
    };
    /**
     *   Gets and returns the Node at the specified index in the linked list
     *   @param {number} index
     */
    LinkedList.prototype.get = function (index) {
        var temp = null;
        if (index === 0) {
            temp = this.getFirst();
        }
        else if (index === this._numNodes - 1) {
            temp = this.getLast();
        }
        else {
            temp = this.getFromFirst(index);
        }
        return temp;
    };
    /**
     *   Removes and returns node from the linked list by rearranging pointers
     *   @param {Node} node
     *   @return {Node}
     */
    LinkedList.prototype.remove = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        --this._numNodes;
        return node;
    };
    /**
     *   Removes and returns the first node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    LinkedList.prototype.removeFirst = function () {
        var temp = null;
        if (this._numNodes > 0) {
            temp = this.remove(this.start.next);
        }
        return temp;
    };
    /**
     *   Removes and returns the last node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    LinkedList.prototype.removeLast = function () {
        var temp = null;
        if (this._numNodes > 0) {
            temp = this.remove(this.end.prev);
        }
        return temp;
    };
    /**
     *   Removes all nodes from the list
     */
    LinkedList.prototype.removeAll = function () {
        this.start.next = this.end;
        this.end.prev = this.start;
        this._numNodes = 0;
        this._idCounter = 0;
    };
    /**
     *    Iterates the list calling the given fn for each node
     *    @param {function} fn
     */
    LinkedList.prototype.each = function (iterator) {
        var temp = this.start;
        while (temp.hasNext()) {
            temp = temp.next;
            iterator(temp);
        }
    };
    LinkedList.prototype.find = function (iterator) {
        var temp = this.start, found = false, result = null;
        while (temp.hasNext() && !found) {
            temp = temp.next;
            if (iterator(temp)) {
                result = temp;
                found = true;
            }
        }
        return result;
    };
    LinkedList.prototype.map = function (iterator) {
        var temp = this.start, results = [];
        while (temp.hasNext()) {
            temp = temp.next;
            if (iterator(temp)) {
                results.push(temp);
            }
        }
        return results;
    };
    /**
     *    Alias for addLast
     *    @param {object} data
     */
    LinkedList.prototype.push = function (data) {
        return this.addLast(data);
    };
    /**
     *    Performs insertBefore on the first node
     *    @param {object} data
     */
    LinkedList.prototype.unshift = function (data) {
        if (this._numNodes > 0) {
            this.insertBefore(this.start.next, data);
        }
        else {
            this.insertBefore(this.end, data);
        }
    };
    /**
     *    Alias for removeLast
     */
    LinkedList.prototype.pop = function () {
        return this.removeLast();
    };
    /**
     *    Alias for removeFirst()
     */
    LinkedList.prototype.shift = function () {
        return this.removeFirst();
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
exports.sdkErrorList = {
    SUCCESS: {
        code: "ZegoClient.Success",
        msg: "success."
    },
    PARAM: {
        code: "ZegoClient.Error.Param",
        msg: "input error."
    },
    HEARTBEAT_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "heartbeat timeout."
    },
    LOGIN_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "login timeout."
    },
    SEND_MSG_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "send customsg timeout."
    },
    RESET_QUEUE: {
        code: "ZegoClient.Error.Timeout",
        msg: "msg waiting ack is clear when reset."
    },
    LOGIN_DISCONNECT: {
        code: "ZegoClient.Error.Network",
        msg: "network is broken and login fail."
    },
    KICK_OUT: {
        code: "ZegoClient.Error.Kickout",
        msg: "kickout reason="
    },
    UNKNOWN: {
        code: "ZegoClient.Error.Unknown",
        msg: "unknown error."
    },
    FREQ_LIMITED: {
        code: "ZegoClient.Error.requencyLimited",
        msg: "Frequency Limited."
    }
    // SIGNAL_DISCONNECT: {
    //     code: "ZegoClient.Error.Timeout",
    //     msg: "WebRTC Signal broken"
    // }
};
;
var ENUM_SIGNAL_STATE;
(function (ENUM_SIGNAL_STATE) {
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["disconnected"] = 0] = "disconnected";
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["connecting"] = 1] = "connecting";
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["connected"] = 2] = "connected";
})(ENUM_SIGNAL_STATE = exports.ENUM_SIGNAL_STATE || (exports.ENUM_SIGNAL_STATE = {}));
;
exports.ENUM_RESOLUTION_TYPE = {
    LOW: {
        width: 240,
        height: 320,
        frameRate: 15,
        bitRate: 300
    },
    MEDIUM: {
        width: 480,
        height: 640,
        frameRate: 15,
        bitRate: 800
    },
    HIGH: {
        width: 720,
        height: 1280,
        frameRate: 20,
        bitRate: 1500
    }
};
exports.ENUM_RETRY_STATE = {
    didNotStart: 0,
    retrying: 1,
    finished: 2
};
exports.ENUM_PUBLISH_STATE = {
    start: 0,
    waitingSessionRsp: 1,
    waitingOffserRsp: 2,
    waitingServerAnswer: 3,
    waitingServerICE: 4,
    connecting: 5,
    publishing: 6,
    stop: 7,
    didNotStart: 8
};
exports.ENUM_PLAY_STATE = {
    start: 0,
    waitingSessionRsp: 1,
    waitingOffserRsp: 2,
    waitingServerAnswer: 3,
    waitingServerICE: 4,
    connecting: 5,
    playing: 6,
    stop: 7,
    didNotStart: 8
};
exports.ENUM_CONNECT_STATE = { disconnect: 0, connecting: 1, connected: 2 };
exports.MAX_TRY_CONNECT_COUNT = 3;
exports.SEND_MSG_RESET = 2;
exports.SEND_MSG_TIMEOUT = 1;
exports.MAX_TRY_HEARTBEAT_COUNT = 5;
exports.ENUM_PUBLISH_STREAM_STATE = {
    waiting_url: 1,
    tryPublish: 2,
    update_info: 3,
    publishing: 4,
    stop: 5
};
exports.ENUM_STREAM_SUB_CMD = {
    liveNone: 0,
    liveBegin: 2001,
    liveEnd: 2002,
    liveUpdate: 2003
};
exports.ENUM_STREAM_UPDATE_TYPE = {
    added: 0,
    deleted: 1
};
//运行状态
var ENUM_RUN_STATE;
(function (ENUM_RUN_STATE) {
    ENUM_RUN_STATE[ENUM_RUN_STATE["logout"] = 0] = "logout";
    ENUM_RUN_STATE[ENUM_RUN_STATE["trylogin"] = 1] = "trylogin";
    ENUM_RUN_STATE[ENUM_RUN_STATE["login"] = 2] = "login";
})(ENUM_RUN_STATE = exports.ENUM_RUN_STATE || (exports.ENUM_RUN_STATE = {}));
;
exports.ENUM_PUBLISH_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.ENUM_PLAY_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.MAX_TRY_LOGIN_COUNT = 5; //最大重试登录次数
exports.TRY_LOGIN_INTERVAL = [2000, 2000, 3000, 3000, 4000]; //重试登录的频率
exports.MINIUM_HEARTBEAT_INTERVAL = 3000; //最小心跳尝试间隔
exports.ENUM_STREAM_UPDATE_CMD = {
    added: 12001,
    deleted: 12002,
    updated: 12003
};
exports.SERVER_ERROR_CODE = 10000;
exports.MIXSTREAM_ERROR_CODE = 10000;
var QUALITYLEVEL;
(function (QUALITYLEVEL) {
    QUALITYLEVEL[QUALITYLEVEL["low"] = 1] = "low";
    QUALITYLEVEL[QUALITYLEVEL["stantard"] = 2] = "stantard";
    QUALITYLEVEL[QUALITYLEVEL["hight"] = 3] = "hight";
    QUALITYLEVEL[QUALITYLEVEL["custome"] = 4] = "custome";
})(QUALITYLEVEL = exports.QUALITYLEVEL || (exports.QUALITYLEVEL = {}));
exports.ENUM_SIGNAL_SUB_CMD = {
    none: 0,
    joinLiveRequest: 1001,
    joinLiveResult: 1002,
    joinLiveInvite: 1003,
    joinLiveStop: 1004
};
exports.ENUM_PUSH_SIGNAL_SUB_CMD = {
    none: 0,
    pushJoinLiveRequest: 11001,
    pushJoinLiveResult: 11002,
    pushJoinLiveInvite: 11003,
    pushJoinLiveStop: 11004
};
//拉流选择
var ENUM_PLAY_SOURCE_TYPE;
(function (ENUM_PLAY_SOURCE_TYPE) {
    ENUM_PLAY_SOURCE_TYPE[ENUM_PLAY_SOURCE_TYPE["auto"] = 0] = "auto";
    ENUM_PLAY_SOURCE_TYPE[ENUM_PLAY_SOURCE_TYPE["ultra"] = 1] = "ultra";
})(ENUM_PLAY_SOURCE_TYPE = exports.ENUM_PLAY_SOURCE_TYPE || (exports.ENUM_PLAY_SOURCE_TYPE = {}));
;
//推流选择
var ENUM_DISPATCH_TYPE;
(function (ENUM_DISPATCH_TYPE) {
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["cdn"] = 0] = "cdn";
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["ultra"] = 1] = "ultra";
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["customUrl"] = 2] = "customUrl";
})(ENUM_DISPATCH_TYPE = exports.ENUM_DISPATCH_TYPE || (exports.ENUM_DISPATCH_TYPE = {}));
;
var E_CLIENT_TYPE;
(function (E_CLIENT_TYPE) {
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_None"] = 0] = "ClientType_None";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_H5"] = 1] = "ClientType_H5";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_SmallPragram"] = 2] = "ClientType_SmallPragram";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_Webrtc"] = 3] = "ClientType_Webrtc";
})(E_CLIENT_TYPE = exports.E_CLIENT_TYPE || (exports.E_CLIENT_TYPE = {}));


/***/ }),

/***/ "./sdk/common/zego.extern.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.extern.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.playErrorList = {
    DISPATCH_ERROR: {
        code: "ZegoPlayWeb.Error.Dispatch",
        msg: "dispatch request error"
    },
    DISPATCH_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Dispatch",
        msg: "dispatch request timeout"
    },
    TOKEN_ERROR: {
        code: "ZegoPlayWeb.Error.Token",
        msg: "login token error"
    },
    SEND_SESSION_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Session",
        msg: "send session request timeout"
    },
    CREATE_SESSION_ERROR: {
        code: "ZegoPlayWeb.Error.Session",
        msg: "create session error"
    },
    CREATE_OFFER_ERROR: {
        code: "ZegoPublish.Error.CreateOffer",
        msg: "create offer error"
    },
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.RemoteOffer",
        msg: "wating server mediaDesc timeout"
    },
    SET_REMOTE_DESC_ERROR: {
        code: "ZegoPlayWeb.Error.RemoteOffer",
        msg: "other side offer error"
    },
    CREATE_ANSWER_ERROR: {
        code: "ZegoPlayWeb.Error.CreateAnswer",
        msg: "create offer error"
    },
    SET_LOCAL_DESC_ERROR: {
        code: "ZegoPlayWeb.Error.LocalDesc",
        msg: "setLocalDescription error"
    },
    SEND_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Desc",
        msg: "send mediaDesc timeout"
    },
    SEND_CANDIDATE_ERROR: {
        code: "ZegoPlayWeb.Error.Candidate",
        msg: "send candidate error"
    },
    SEND_CANDIDATE_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Candidate",
        msg: "send candidate timeout"
    },
    SERVER_CANDIDATE_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.ServerCandidate",
        msg: "waiting candidate timeout"
    },
    SERVER_CANDIDATE_ERROR: {
        code: "ZegoPlayWeb.Error.ServerCandidate",
        msg: "recv candidate error"
    },
    MEDIA_CONNECTION_FAILED: {
        code: "ZegoPlayWeb.Error.ConnectionFailed",
        msg: "ice Connection state failed"
    },
    MEDIA_CONNECTION_CLOSED: {
        code: "ZegoPlayWeb.Error.ConnectionClosed",
        msg: "ice connection state closed"
    },
    SESSION_CLOSED: {
        code: "ZegoPlayWeb.Error.SessionClosed",
        msg: "server session closed"
    },
    WEBSOCKET_ERROR: {
        code: "ZegoPlayWeb.Error.SocketError",
        msg: "network error"
    }
};
exports.publishErrorList = {
    DISPATCH_ERROR: {
        code: "ZegoPublish.Error.Dispatch",
        msg: "dispatch request error"
    },
    DISPATCH_TIMEOUT: {
        code: "ZegoPublish.Timeout.Dispatch",
        msg: "dispatch request timeout"
    },
    TOKEN_ERROR: {
        code: "ZegoPublish.Error.Token",
        msg: "login token error"
    },
    SEND_SESSION_TIMEOUT: {
        code: "ZegoPublish.Timeout.Session",
        msg: "send session request timeout"
    },
    CREATE_SESSION_ERROR: {
        code: "ZegoPublish.Error.Session",
        msg: "create session error"
    },
    CREATE_OFFER_ERROR: {
        code: "ZegoPublish.Error.CreateOffer",
        msg: "create offer error"
    },
    SET_LOCAL_DESC_ERROR: {
        code: "ZegoPublish.Error.LocalDesc",
        msg: "setLocalDescription error"
    },
    SEND_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPublish.Timeout.Desc",
        msg: "send mediaDesc timeout"
    },
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPublish.Timeout.ServerAnswer",
        msg: "waiting server mediaDesc timeout"
    },
    SERVER_MEDIA_DESC_ERROR: {
        code: "ZegoPublish.Error.ServerAnswer",
        msg: "server mediaDesc type error"
    },
    SET_REMOTE_DESC_ERROR: {
        code: "ZegoPublish.Error.RemoteDesc",
        msg: "other side offer error"
    },
    SEND_CANDIDATE_TIMEOUT: {
        code: "ZegoPublish.Timeout.Candidate",
        msg: "sendIceCandidate error"
    },
    SERVER_CANDIDATE_TIMEOUT: {
        code: "ZegoPublish.Timeout.ServerCandidate",
        msg: "waiting candidate timeout"
    },
    SERVER_CANDIDATE_ERROR: {
        code: "ZegoPublish.Error.ServerCandidate",
        msg: "recv candidate error"
    },
    SESSION_CLOSED: {
        code: "ZegoPublish.Error.SessionClosed",
        msg: "server session closed"
    },
    MEDIA_CONNECTION_FAILED: {
        code: "ZegoPublish.Error.IConnectionFailed",
        msg: "Iice Connection state failed"
    },
    MEDIA_CONNECTION_CLOSED: {
        code: "ZegoPublish.Error.ConnectionClosed",
        msg: "ice connection state closed"
    },
    WEBSOCKET_ERROR: {
        code: "ZegoPublish.Error.SocketError",
        msg: "network error"
    }
};
exports.ENUM_PUBLISH_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.ENUM_PLAY_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2,
    stop: 3
};
exports.ENUM_RETRY_STATE = {
    didNotStart: 0,
    retrying: 1,
    finished: 2
};
exports.getSeq = (function () {
    var seq = 1;
    return function () {
        return seq++;
    };
})();


/***/ }),

/***/ "./sdk/common/zego.logger.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.logger.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ./zego.entity */ "./sdk/common/zego.entity.ts");
exports.D = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
var Logger = /** @class */ (function () {
    function Logger() {
        this.logUploadTimer = null;
        this.logUploadInterval = 1000 * 10;
        this.logCache = [];
        this.logCacheSend = [];
        this.logCacheMax = 100;
    }
    Logger.prototype.setLogLevel = function (logLevel) {
        if (this.logLevel < zego_entity_1.ENUM_LOG_LEVEL.debug || this.logLevel > zego_entity_1.ENUM_LOG_LEVEL.report) {
            this.logLevel = zego_entity_1.ENUM_LOG_LEVEL.disable;
        }
        else {
            this.logLevel = logLevel;
        }
    };
    Logger.prototype.setRemoteLogLevel = function (logLevel) {
        if (this.logRemoteLevel < zego_entity_1.ENUM_LOG_LEVEL.debug || this.logRemoteLevel > zego_entity_1.ENUM_LOG_LEVEL.report) {
            this.logRemoteLevel = zego_entity_1.ENUM_LOG_LEVEL.disable;
        }
        else {
            this.logRemoteLevel = logLevel;
        }
    };
    Logger.prototype.setSessionInfo = function (appid, roomid, sessionid, userid, userName, version) {
        this.appid = appid;
        this.roomid = roomid;
        this.sessionid = sessionid;
        this.userid = userid;
        this.userName = userName;
        this.version = version;
    };
    ;
    Logger.prototype.openLogServer = function (url) {
        try {
            if (url.startsWith("wss:")) {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.websocket;
                this.openWebSocketLogServer(url);
            }
            else if (url.startsWith("https:")) {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.https;
                this.openHttpsLogServer(url);
            }
            else {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.disable;
            }
        }
        catch (e) {
            this.error(JSON.stringify(e));
        }
    };
    Logger.prototype.stopLogServer = function () {
        if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.websocket) {
            this.stopWebSocketServer();
        }
        else if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.https) {
            //send last data
            this.SendHttpsLog();
            this.stopHttpsServer();
        }
        this.logType = zego_entity_1.ENUM_REMOTE_TYPE.disable;
    };
    ;
    Logger.prototype.stopWebSocketServer = function () {
        if (this.websocket) {
            this.websocket.onclose = null;
            this.websocket.onerror = null;
            this.websocket.close();
            this.websocket = null;
        }
    };
    Logger.prototype.openHttpsLogServer = function (url) {
        var _this = this;
        this.url = url;
        if (!url) {
            return;
        }
        this.stopHttpsServer();
        //start timer
        if (!this.logUploadTimer) {
            this.logUploadTimer = setInterval(function () {
                _this.SendHttpsLog();
            }, this.logUploadInterval);
        }
    };
    Logger.prototype.stopHttpsServer = function () {
        //stop timer
        if (this.logUploadTimer) {
            clearInterval(this.logUploadTimer);
            this.logUploadTimer = null;
        }
    };
    Logger.prototype.report = function (dataItem) {
        var log = this.logReportParamList(zego_entity_1.ENUM_LOG_LEVEL.report, dataItem);
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.report) {
            console.debug.apply(console, log);
        }
        //report 立即上报
        this.RemoteLog(zego_entity_1.ENUM_LOG_LEVEL.report, log, true);
    };
    Logger.prototype.debug = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.debug, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.debug) {
            console.debug.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.debug, log);
    };
    Logger.prototype.info = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.info, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.info) {
            console.info.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.info, log);
    };
    Logger.prototype.warn = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.warn, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.warn) {
            console.warn.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.warn, log);
    };
    Logger.prototype.error = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.error, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.error) {
            console.error.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.error, log);
    };
    Logger.prototype.log = function (level, log) {
        if (this.logRemoteLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logRemoteLevel <= level) {
            this.RemoteLog(level, log);
        }
    };
    ;
    Logger.prototype.RemoteLog = function (level, log, force) {
        if (force === void 0) { force = false; }
        if (this.url == "") {
            return;
        }
        if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.websocket) {
            this.RemoteWebSocketLog(level, log);
        }
        else if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.https) {
            this.RemoteHttpsLog(level, log, force);
        }
        else if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= level) {
            this.logCacheSend.push(log);
            while (this.logCacheSend.length > this.logCacheMax) {
                this.logCacheSend.shift();
            }
        }
    };
    ;
    Logger.prototype.RemoteWebSocketLog = function (level, log) {
        if (this.websocket == null || this.websocket.readyState == 2 || this.websocket.readyState == 3) {
            var url = this.url;
            this.url = "";
            this.openLogServer(url);
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
        else if (this.websocket.readyState == 0) {
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
        else if (this.websocket.readyState == 1) {
            if (this.logCacheSend.length > 0) {
                var logBefore = "";
                for (var i = 0; i < this.logCacheSend.length; i++) {
                    if ((logBefore + this.logCacheSend[i]).length > 4000) {
                        //console.warn('logBefore.length 4000',logBefore.length,logBefore);
                        this.websocket.send(logBefore);
                        logBefore = "";
                    }
                    logBefore = logBefore + this.logCacheSend[i] + "\n";
                }
                log = logBefore + log;
                this.logCacheSend = [];
                //console.warn('logBefore length',logBefore.length,logBefore);
                this.websocket.send(log);
            }
            else {
                //console.warn('log length',log.join("\n").length,log);
                this.websocket.send(log);
            }
        }
        else {
            console.warn("wrong socket state:" + this.websocket.readyState);
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
    };
    Logger.prototype.RemoteHttpsLog = function (level, log, force) {
        this.logCacheSend.push(log);
        if (this.logCacheSend.length >= this.logCacheMax || force === true) {
            this.SendHttpsLog();
        }
    };
    Logger.prototype.logParamList = function (level, logInfo) {
        var t = new Date();
        var stringTime = (t.getFullYear()) + "/";
        stringTime += (exports.D[t.getMonth() + 1] || t.getMonth() + 1) + "/";
        stringTime += (exports.D[t.getDate()] || t.getDate()) + " ";
        stringTime += (exports.D[t.getHours()] || t.getHours()) + ":";
        stringTime += (exports.D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (exports.D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;
        //get first space from logInfo
        var action = logInfo.substr(0, logInfo.indexOf(' '));
        if (action.length == 0) {
            action = logInfo;
        }
        var content = logInfo.substr(logInfo.indexOf(' ') + 1, 4500);
        if (content.length == 0) {
            content = "";
        }
        var s = {
            "time": stringTime,
            "level": level,
            "action": action,
            "content": content,
            "appid": this.appid,
            "roomid": this.roomid,
            "userid": this.userid,
            "userName": this.userName,
            "sessionid": this.sessionid
        };
        return [JSON.stringify(s)];
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ "./sdk/common/zego.signal.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.signal.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ./zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ./zego.extern */ "./sdk/common/zego.extern.ts");
var WEBRTC_PROTO_VERSION = "1.0.1"; //协议版本号
var ZegoSignal = /** @class */ (function () {
    function ZegoSignal(logger, stateCenter) {
        this.sendDataMap = {};
        this.sendDataList = new zego_entity_1.LinkedList();
        this.sendDataCheckOnceCount = 100;
        this.signalSeq = 0;
        this.pushCallback = {};
        this.sessionInfos = {};
        //tryheartbeat
        this.tryHeartbeatCount = 0;
        // heartbeatTimer = null;
        this.heartbeatInterval = 10 * 1000;
        this.sendDataTimeout = 5 * 1000; //发送消息超时
        this.sendDataDropTimeout = 10 * 1000; //丢弃过期消息的超时时间
        this.tryConnectCount = 1;
        this.tryConnectTimer = null;
        this.tryConnectInterval = 3000;
        this.state = zego_entity_1.ENUM_CONNECT_STATE.disconnect;
        //token
        this.tokenType = 0;
        this.browser = this.getBrowserAndVersion();
        this.platform = navigator.platform;
        this.logger = logger;
        this.stateCenter = stateCenter;
    }
    ZegoSignal.prototype.getBrowserAndVersion = function () {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+([\d\.]+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/([\d\.]+)/);
            if (tem != null) {
                return { name: 'Opera', version: tem[1] };
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/([\d+\.]+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    };
    /*
     *    "zs.ssi.0": "ZegoSignal.setSessionInfo"
     */
    ZegoSignal.prototype.setSessionInfo = function (appid, userid) {
        this.logger.debug("zs.ssi.0 call");
        this.appid = appid + '';
        this.userid = userid;
        // this.server = serverUrl;
    };
    ;
    ZegoSignal.prototype.onDisconnect = function (server) {
    };
    ;
    ZegoSignal.prototype.onUpdateHeartBeartInterval = function (interval) {
    };
    ;
    /*
     *    "zs.cs.0": "ZegoSignal.connectServer"
     */
    ZegoSignal.prototype.resetConnectTimer = function () {
        this.logger.info("zs.rct.0 call");
        clearTimeout(this.tryConnectTimer);
        this.tryConnectTimer = null;
        this.tryConnectCount = 0;
    };
    ZegoSignal.prototype.bindWebSocketHandle = function () {
        var _this = this;
        this.websocket.onmessage = function (e) {
            var msg = JSON.parse(e.data);
            _this.logger.debug("zs.bsh.0 signmsg= ", msg.header.cmd);
            if (msg.header.appid != _this.appid || msg.header.user_id !== _this.userid) {
                _this.logger.warn("zs.bsh.0 check header failed");
                return;
            }
            _this.handleServerPush(msg);
        };
        this.websocket.onclose = function (e) {
            _this.logger.info("zs.bsh.0 close msg = " + JSON.stringify(e));
            if (_this.state != zego_entity_1.ENUM_CONNECT_STATE.disconnect) {
                //try connect
                _this.resetConnectTimer();
                _this.startConnectTimer();
                //all request timeout
                _this.resetCheckMessage();
            }
        };
        this.websocket.onerror = function (e) {
            _this.logger.error("zs.bsh.0 msg = " + JSON.stringify(e));
        };
    };
    ZegoSignal.prototype.resetCheckMessage = function () {
        this.logger.debug("zs.rcm.0 call");
        // clearTimeout(this.sendDataCheckTimer);
        // this.sendDataCheckTimer = null;
        var head = this.sendDataList.getFirst();
        while (head != null) {
            this.sendDataList.remove(head);
            if (head._data.error)
                head._data.error(zego_entity_1.SEND_MSG_RESET, head._data.seq);
            head = this.sendDataList.getFirst();
        }
        this.sendDataMap = {};
    };
    ZegoSignal.prototype.handleServerPush = function (msg) {
        switch (msg.header.cmd) {
            case 'LoginRsp':
                this.handleRespondData("LoginReq", msg);
                break;
            case 'CreateSessionRsp':
                this.handleRespondData("CreateSessionReq", msg);
                if (msg.body.result === 0)
                    this.addSession(msg.header.session_id, msg.body.session_token);
                break;
            case 'MediaDescRsp':
                this.handleRespondData("MediaDescReq", msg);
                break;
            case 'CandidateInfoRsp':
                this.handleRespondData("CandidateInfoReq", msg);
                break;
            case 'CloseSessionRsp':
                this.handleRespondData("CloseSessionReq", msg);
                this.removeSession(msg.header.session_id);
                break;
            case 'ClientHBRsp':
                this.handleRespondData("ClientHBReq", msg);
                break;
            case 'MediaDescPush':
                this.handlePushData(msg);
                break;
            case 'CandidateInfoPush':
                this.handlePushData(msg);
                break;
            case 'CloseSessionPush':
                this.handlePushData(msg);
                this.removeSession(msg.header.session_id);
                break;
            case 'QualityReportRsp':
                this.handleRespondData("QualityReportReq", msg);
                break;
            case 'SessionResetPush':
                this.handlePushResetSessionData(msg);
                break;
        }
    };
    ZegoSignal.prototype.disconnectCallback = function () {
        // for (let sessionId in this.sessionInfos) {
        //     let callbackData = this.pushCallback["WebSocketDisconnect"+ sessionId];
        //     if (callbackData == null) {
        //         this.logger.error("zs.dc.0 no callbackData");
        //         return;
        //     }
        //     if (callbackData.callback) {
        //         callbackData.callback(callbackData.object, parseInt(sessionId));
        //     }
        // }
        if (this.connectCallback) {
            this.connectCallback(-1, this.server, undefined);
            this.connectCallback = null;
        }
        var server = this.server;
        this.disconnectServer();
        this.onDisconnect(server);
    };
    ZegoSignal.prototype.updateToken = function () {
        var _this = this;
        this.logger.info("zs.ut.0 call");
        var cmd = "LoginReq";
        var body = {
            token: this.token,
            tokenType: this.tokenType,
            roomid: this.stateCenter.roomid,
            anchorname: this.stateCenter.anchor_info.anchor_id,
            sdkversion: zego_entity_1.PROTO_VERSION,
            osinfo: navigator.appVersion
        };
        if (Object.keys(this.sessionInfos).length != 0) {
            var sessions = [];
            for (var sessionId in this.sessionInfos) {
                var session_id = parseInt(sessionId);
                sessions.push({
                    session_id: session_id,
                    session_token: this.sessionInfos[session_id].token
                });
            }
            body["sessions"] = sessions;
        }
        this.sendMessageWithCallback(cmd, zego_extern_1.getSeq(), 0, body, function (seq, session_id, data) {
            if (data.result == 0) {
                _this.token = data.token;
                _this.tokenType = data.tokenType;
                var tokenInfo = {
                    report: data.report,
                    report_interval: data.report_interval_ms
                };
                if (_this.connectCallback != null) {
                    _this.connectCallback(0, _this.server, tokenInfo);
                    _this.connectCallback = null;
                }
            }
            else {
                var errorTokenInfo = {
                    error: data.strError
                };
                if (_this.connectCallback != null) {
                    _this.connectCallback(data.result, _this.server, errorTokenInfo);
                    _this.connectCallback = null;
                }
            }
        }, function (err, seq) {
            if (_this.connectCallback != null) {
                _this.connectCallback(-1, _this.server, undefined);
                _this.connectCallback = null;
            }
        });
    };
    ZegoSignal.prototype.sendMessageWithCallback = function (cmd, seq, sessionId, body, success, error) {
        this.logger.debug("zs.smwc.0 call " + cmd);
        if (!this.websocket || this.websocket.readyState !== 1) {
            this.logger.error("zs.smwc.0 connect not establish");
            if (error) {
                error(zego_entity_1.SEND_MSG_TIMEOUT, seq);
            }
            return;
        }
        var header = this.getHeader(cmd, seq, sessionId);
        var data = {
            'header': header,
            'body': body
        };
        if (success == undefined) {
            success = null;
        }
        if (error == undefined) {
            error = null;
        }
        var cmdData = {
            // data: data,
            seq: seq,
            deleted: false,
            cmd: cmd,
            time: Date.parse(new Date() + ''),
            success: success,
            error: error,
        };
        var cmdDataNode = this.sendDataList.push(cmdData);
        this.sendDataMap[cmdData.seq] = cmdDataNode;
        var dataBuffer = JSON.stringify(data);
        this.websocket.send(dataBuffer);
        this.logger.debug('zs.smwc.0 success');
    };
    ZegoSignal.prototype.getHeader = function (cmd, seq, sessionId) {
        this.globalHeader = {
            'version': WEBRTC_PROTO_VERSION,
            'cmd': cmd,
            'appid': this.appid + '',
            'seq': seq,
            'user_id': this.userid,
            'session_id': sessionId
        };
        return this.globalHeader;
    };
    //rtc信令连接
    ZegoSignal.prototype.connectServer = function (token, serverUrl, result) {
        var _this = this;
        this.token = token;
        this.server = serverUrl;
        this.state = zego_entity_1.ENUM_CONNECT_STATE.connecting;
        this.connectCallback = result;
        if (!this.websocket || this.websocket.readyState !== 1) {
            this.logger.debug("zs.cs.0 need new websocket");
            try {
                if (this.websocket) {
                    this.logger.warn("zs.cs.0 close error websocket");
                    this.websocket.onclose = null;
                    this.websocket.onerror = null;
                    this.websocket.close();
                    this.websocket = null;
                }
                //connect websocket
                this.websocket = new WebSocket(this.server);
                this.websocket.onopen = function () {
                    //reset connect timer
                    _this.resetConnectTimer();
                    //register onMessage
                    _this.logger.info("zs.cs.0 websocket open call");
                    _this.bindWebSocketHandle();
                    //update token
                    _this.updateToken();
                    _this.state = zego_entity_1.ENUM_CONNECT_STATE.connected;
                };
            }
            catch (e) {
                this.logger.error("zs.cs.0 websocket error " + e);
            }
        }
        else {
            //websocket is already connect
            this.resetConnectTimer();
            this.state = zego_entity_1.ENUM_CONNECT_STATE.connected;
        }
        this.tryConnectTimer = setTimeout(function () {
            _this.startConnectTimer(result);
        }, this.tryConnectInterval);
    };
    ;
    ZegoSignal.prototype.startConnectTimer = function (callback) {
        this.logger.info("zs.sct.0 call");
        if (this.tryConnectCount >= zego_entity_1.MAX_TRY_CONNECT_COUNT) {
            this.logger.error("zs.sct.0 beyond max limit");
            this.disconnectCallback();
            return;
        }
        if (!this.websocket || this.websocket.readyState !== 1) {
            this.tryConnectCount += 1;
            this.connectServer(this.token, this.server, callback);
        }
        else {
            //already connect
            this.resetConnectTimer();
        }
    };
    /*
     *    "zs.ds.0": "ZegoSignal.disconnectServer"
     */
    //rtc信令断开连接
    ZegoSignal.prototype.disconnectServer = function () {
        this.logger.debug('zs.ds.0 call');
        this.server = null;
        this.connectCallback = null;
        this.resetCheckMessage();
        this.resetConnectTimer();
        if (this.websocket) {
            this.websocket.onclose = null;
            this.websocket.onerror = null;
            this.websocket.close();
            this.websocket = null;
        }
        this.token = "";
        this.sessionInfos = {};
        this.tokenType = 0;
        this.tryHeartbeatCount = 0;
        this.tryConnectCount = 0;
        this.state = zego_entity_1.ENUM_CONNECT_STATE.disconnect;
    };
    ;
    ZegoSignal.prototype.isServerConnected = function () {
        if (this.websocket && this.websocket.readyState === 1) {
            return true;
        }
        return false;
    };
    ;
    /*
     *    "zs.cs.1": "ZegoSignal.createSession"
     */
    ZegoSignal.prototype.createSession = function (seq, type, mode, streamId, strAuthParam, success, error) {
        if (strAuthParam === void 0) { strAuthParam = ''; }
        this.logger.debug("zs.cs.1 call: ", streamId);
        var cmd = "CreateSessionReq";
        var body = {
            'type': type,
            'stream_id': streamId,
            'platform': this.platform,
            'browser': this.browser.name,
            'version': this.browser.version,
            'app_id': this.appid,
            'negotiate_mode': mode,
            'strAuthParam': strAuthParam
        };
        // //publish
        // if (type == 0) {
        //         body['negotiate_mode'] = 0;
        // } else {
        //         body['negotiate_mode'] = 1;
        // }
        this.sendMessageWithCallback(cmd, seq, 0, body, success, error);
    };
    ;
    ZegoSignal.prototype.removeSession = function (sessionId) {
        this.logger.info("zs.rs.0 call");
        if (this.sessionInfos[sessionId]) {
            delete this.sessionInfos[sessionId];
        }
    };
    /*
    *    "zs.scs.0": "ZegoSignal.sendCloseSession"
    */
    ZegoSignal.prototype.sendCloseSession = function (seq, sessionId, reason, success, error) {
        this.logger.debug("zs.scs.0 call: ", sessionId);
        var cmd = "CloseSessionReq";
        var body = {
            'reason': reason
        };
        this.removeSession(sessionId);
        this.sendMessageWithCallback(cmd, seq, sessionId, body, success, error);
    };
    ;
    ZegoSignal.prototype.sendMessage = function (cmd, seq, sessionId, body) {
        this.logger.debug("zs.sm.0 call " + cmd);
        if (!this.websocket || this.websocket.readyState !== 1) {
            this.logger.error("zs.sm.0 connect not establish");
            return;
        }
        var header = this.getHeader(cmd, seq, sessionId);
        var data = {
            'header': header,
            'body': body
        };
        var dataBuffer = JSON.stringify(data);
        this.websocket.send(dataBuffer);
        this.logger.debug('zs.sm.0 success');
    };
    /*
     *    "zs.hrd.0": "ZegoSignal.handleRespondData"
     */
    ZegoSignal.prototype.handleRespondData = function (cmd, msg) {
        this.logger.debug("zs.hrd.0 call");
        //callback
        var sendDataNode = this.sendDataMap[msg.header.seq];
        if (sendDataNode == null) {
            if (msg.header.cmd == "CloseSessionRsp")
                return;
            this.logger.error("zs.hrd.0 cannot find data " + cmd);
            return;
        }
        var sendData = sendDataNode._data;
        if (sendData.cmd !== cmd) {
            this.logger.error("sz.hrd.0 command is not match");
        }
        else if (sendData.success) {
            sendData.success(msg.header.seq, msg.header.session_id, msg.body);
        }
        delete this.sendDataMap[msg.header.seq];
        this.sendDataList.remove(sendDataNode);
    };
    /*
     *    "zs.as.0": "ZegoSignal.addSession"
     */
    ZegoSignal.prototype.addSession = function (sessionId, token) {
        this.logger.info("zs.as.0 call");
        this.sessionInfos[sessionId] = {
            token: token
        };
    };
    /*
     *    "zs.hpd.0": "ZegoSignal.handlePushData"
     */
    ZegoSignal.prototype.handlePushData = function (msg) {
        this.logger.debug("zs.hpd.0 call " + msg.header.cmd + " session " + msg.header.session_id);
        var callbackData = this.pushCallback[msg.header.cmd + msg.header.session_id];
        if (!callbackData) {
            this.logger.info("zs.hpd.0 no callbackData " + msg.header.cmd + " session: " + msg.header.session_id);
            return;
        }
        if (callbackData.callback) {
            callbackData.callback(msg.header.seq, msg.header.session_id, msg.body);
        }
    };
    /*
     *    "zs.hprsd.0": "ZegoSignal.handlePushResetSessionData"
     */
    ZegoSignal.prototype.handlePushResetSessionData = function (msg) {
        this.logger.debug("zs.hprsd.0 call ");
        var sessionList = [];
        if (msg.body.cResetType == 0) {
            sessionList = Object.keys(this.sessionInfos);
        }
        else if (msg.body.cResetType == 1) {
            for (var i = 0; i < msg.body.session_ids.length; i++) {
                sessionList.push(msg.body.session_ids[i]);
            }
        }
        //send ack
        this.sendResetSessionAck(msg.header.seq, 0, 0);
        if (sessionList.length == 0) {
            this.logger.info("zs.hprsd.0 no session to callback");
            return;
        }
        for (var j = 0; j < sessionList.length; j++) {
            var callbackData = this.pushCallback[msg.header.cmd + sessionList[j]];
            if (callbackData == null) {
                this.logger.info("zs.hprsd.0 no callbackData " + sessionList[j]);
            }
            else {
                if (callbackData.callback) {
                    callbackData.callback(callbackData.object, msg.header.seq, sessionList[j], msg.body);
                }
            }
        }
    };
    /*
     *    "zs.smd.0": "ZegoSignal.sendMediaDesc"
     */
    //type 0: offer  1: answer
    ZegoSignal.prototype.sendMediaDesc = function (seq, sessionId, type, desc, success, error) {
        this.logger.debug("zs.smd.0 call: ", sessionId);
        var cmd = "MediaDescReq";
        var body = {
            'type': type,
            'sdp': desc.sdp,
        };
        if (desc.width != undefined) {
            body['width'] = desc.width;
        }
        if (desc.height != undefined) {
            body['height'] = desc.height;
        }
        if (desc.frameRate != undefined) {
            body['framerate'] = desc.frameRate;
        }
        if (desc.video_min_kpbs != undefined) {
            body['video_min_kpbs'] = desc.video_min_kpbs;
        }
        if (desc.video_max_kpbs != undefined) {
            body['video_max_kpbs'] = desc.video_max_kpbs;
        }
        if (desc.audio_kpbs != undefined) {
            body['audio_kpbs'] = desc.audio_kpbs;
        }
        this.sendMessageWithCallback(cmd, seq, sessionId, body, success, error);
    };
    ;
    /*
     *    "zs.sci.0": "ZegoSignal.sendCandidateInfo"
     */
    ZegoSignal.prototype.sendCandidateInfo = function (seq, sessionId, candidateList, success, error) {
        this.logger.debug("zs.sci.0 call: ", sessionId);
        var cmd = "CandidateInfoReq";
        var dataList = [];
        for (var i = 0; i < candidateList.length; i++) {
            var info = {
                'candidate': candidateList[i].candidate,
                'sdpMid': candidateList[i].sdpMid,
                'sdpMLineIndex': candidateList[i].sdpMLineIndex
            };
            dataList.push(info);
        }
        var body = {
            'infos': dataList
        };
        this.sendMessageWithCallback(cmd, seq, sessionId, body, success, error);
    };
    ;
    /*
     *    "zs.smda.0": "ZegoSignal.sendMediaDescAck"
     */
    ZegoSignal.prototype.sendMediaDescAck = function (seq, sessionId, result) {
        this.logger.debug("zs.smda.0 call: ", sessionId);
        var cmd = "MediaDescAck";
        var body = {
            'result': result
        };
        this.sendMessage(cmd, seq, sessionId, body);
    };
    ;
    /*
     *    "zs.scia.0": "ZegoSignal.sendCandidateInfoAck"
     */
    ZegoSignal.prototype.sendCandidateInfoAck = function (seq, sessionId, result) {
        this.logger.debug("zs.scia.0 call: ", sessionId);
        var cmd = "CandidateInfoAck";
        var body = {
            'result': result
        };
        this.sendMessage(cmd, seq, sessionId, body);
    };
    ;
    /*
     *    "zs.scsa.0": "ZegoSignal.sendCloseSessionAck"
     */
    ZegoSignal.prototype.sendCloseSessionAck = function (seq, sessionId, result) {
        this.logger.debug("zs.scsa.0 call: ", sessionId);
        var cmd = "CloseSessionAck";
        var body = {
            'result': result
        };
        this.sendMessage(cmd, seq, sessionId, body);
    };
    ;
    /*
     *    "zs.ssra.0": "ZegoSignal.sendResetSessionAck"
     */
    ZegoSignal.prototype.sendResetSessionAck = function (seq, sessionId, result) {
        this.logger.debug("zs.ssra.0 call: ", sessionId);
        var cmd = "SessionResetAck";
        var body = {
            'result': result
        };
        this.sendMessage(cmd, seq, sessionId, body);
    };
    ;
    /*
     *    "zs.rpc.0": "ZegoSignal.registerPushCallback"
     */
    ZegoSignal.prototype.registerPushCallback = function (cmd, sessionId, callback) {
        //this.logger.debug("zs.rpc.0 call: ", cmd);
        if (callback && (typeof callback === 'function')) {
            this.logger.debug("zs.rpc.0 setcallback");
            this.pushCallback[cmd + sessionId] = { callback: callback };
        }
    };
    ;
    /*
     *    "zs.upc.0": "ZegoSignal.unregisterPushCallback"
     */
    ZegoSignal.prototype.unregisterPushCallback = function (cmd, sessionId) {
        //this.logger.info("zs.urpc.0 call: ", cmd);
        delete this.pushCallback[cmd + sessionId];
    };
    ;
    /*
     *    "zs.cmt.0": "ZegoSignal.checkMessageTimeout"
     */
    ZegoSignal.prototype.checkMessageTimeout = function () {
        var head = this.sendDataList.getFirst();
        var timestamp = Date.parse(new Date() + '');
        var checkCount = 0;
        var timeoutMsgCount = 0;
        var dropMsgCount = 0;
        //this.logger.debug('zs.cmt.0 call ' + timestamp);
        while (head != null) {
            if ((head._data.time + this.sendDataTimeout) > timestamp) {
                break;
            }
            delete this.sendDataMap[head._data.seq];
            this.sendDataList.remove(head);
            ++timeoutMsgCount;
            if (head._data.error == null ||
                (this.sendDataDropTimeout > 0 &&
                    (head._data.time + this.sendDataDropTimeout) < timestamp)) {
                ++dropMsgCount;
            }
            else {
                if (head._data.error)
                    head._data.error(zego_entity_1.SEND_MSG_TIMEOUT, head._data.seq);
            }
            ++checkCount;
            if (checkCount >= this.sendDataCheckOnceCount) {
                break;
            }
            head = this.sendDataList.getFirst();
        }
        // this.sendDataCheckTimer = setTimeout(function() {
        //     checkMessageTimeout(this);
        // }, this.sendDataCheckInterval);
        if (timeoutMsgCount != 0 || dropMsgCount != 0) {
            this.logger.debug("zs.cmt.0 call success, state: timeout=", timeoutMsgCount, " drop=", dropMsgCount);
        }
    };
    ;
    /*
     *    "zs.shb.0": "ZegoSignal.signalHeartbeat"
     */
    ZegoSignal.prototype.sendHeartbeat = function () {
        var _this = this;
        this.logger.debug("zs.shb.0 call");
        if (Object.keys(this.sessionInfos).length == 0) {
            this.logger.info("zs.shb.0 no need to heartbeat");
            return;
        }
        if (++this.tryHeartbeatCount > zego_entity_1.MAX_TRY_HEARTBEAT_COUNT) {
            this.logger.error("zs.shb.0 heartbeat try limit");
            this.disconnectCallback();
            return;
        }
        var sessionIdList = [];
        for (var sessionId in this.sessionInfos) {
            sessionIdList.push(parseInt(sessionId));
        }
        var body = {
            'session_ids': sessionIdList
        };
        this.sendMessageWithCallback("ClientHBReq", zego_extern_1.getSeq(), 0, body, function (seq, sessionId, data) {
            if (_this.heartbeatInterval != data.hb_interval) {
                _this.heartbeatInterval = data.hb_interval;
                _this.onUpdateHeartBeartInterval(data.hb_interval);
            }
            _this.tryHeartbeatCount = 0;
        }, function (err, seq) {
            _this.tryHeartbeatCount += 1;
        });
    };
    ;
    /*
     *    "zs.qr.0": "ZegoSignal.QualityReport"
     */
    ZegoSignal.prototype.QualityReport = function (seq, sessionId, qualityStat, success, error) {
        this.logger.debug("zs.qr.0 call");
        var cmd = "QualityReportReq";
        var body = {
            streams: [__assign({}, qualityStat, {
                    aid: sessionId
                })]
        };
        this.sendMessageWithCallback(cmd, seq, sessionId, body, success, error);
    };
    ;
    return ZegoSignal;
}());
exports.ZegoSignal = ZegoSignal;


/***/ }),

/***/ "./sdk/util/audioMixUtil.ts":
/*!**********************************!*\
  !*** ./sdk/util/audioMixUtil.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var audioMixUtil = /** @class */ (function () {
    function audioMixUtil(log) {
        this.loop = false;
        this.replace = false;
        this.effectEndedCallBack = null;
        this.effectEndedListener = null;
        this.startTimes = 0;
        this.startOffset = 0;
        this.pauseTimes = 0;
        this.resumeOffset = 0;
        //混音
        this.isMixAudio = false;
        this.logger = log;
    }
    //预加载音效
    audioMixUtil.prototype.preloadEffect = function (effectUrl, callBack) {
        var _this = this;
        this.logger.info('amu.pe.0 start preload effect');
        var ac = new (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : AudioContext)();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', effectUrl, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (xhr.status == 200 || xhr.status == 304) {
                var buffer = xhr.response;
                ac.decodeAudioData(buffer, function (ab) {
                    _this.logger.info('amu.pe.0 effect preload success');
                    callBack('', ab);
                }, function (err) {
                    callBack(err);
                });
            }
            else {
                var err = xhr.statusText;
                callBack(err);
            }
        };
        xhr.send();
    };
    audioMixUtil.prototype.playEffect = function (playTime, loop, replace, start, end) {
        var _this = this;
        if (this.isMixAudio === true) {
            this.logger.error('amu.pe.1 audio is mixing');
            return;
        }
        if (!this.audioBuffer) {
            this.logger.error('amu.pe.1 no audio buffer found');
            return;
        }
        this.startOffset = playTime || 0;
        this.loop = loop || false;
        this.replace = replace || false;
        this.effectEndedCallBack = end;
        this.mixEffect(this.audioBuffer, function () {
            loop ? _this.buffSource.loop = true : _this.buffSource.loop = false;
            playTime ? _this.buffSource.start(0, playTime / 1e3) : _this.buffSource.start(0);
            _this.startTimes = Date.now();
            _this.effectEndedListener = _this.effectEndedHandler.bind(_this);
            _this.buffSource.addEventListener('ended', _this.effectEndedListener);
            start && start();
        });
    };
    audioMixUtil.prototype.pauseEffect = function () {
        this.stopMixingAudio();
        this.resumeOffset = (this.pauseTimes - this.startTimes + this.startOffset) % (this.audioBuffer.duration * 1e3);
    };
    audioMixUtil.prototype.resumeEffect = function () {
        this.playEffect(this.resumeOffset, this.loop, this.replace, null, this.effectEndedCallBack);
        this.startOffset = this.resumeOffset;
    };
    audioMixUtil.prototype.mixEffect = function (audioBuffer, callBack) {
        if (!this.localStream) {
            this.logger.error('amu.me.0 localStream can not be found');
            return;
        }
        this.ac = new (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : AudioContext)();
        this.gainNode = this.ac.createGain();
        this.buffSource = this.ac.createBufferSource();
        this.buffSource.buffer = audioBuffer;
        this.buffSource.connect(this.gainNode);
        this.replaceTrack() && callBack();
    };
    //开始混音
    audioMixUtil.prototype.startMixingAudio = function (audio, replace) {
        this.replace = replace || false;
        if (this.isMixAudio) {
            this.logger.error("amu.sma.0 audio is mixing");
            return false;
        }
        if (!this.localStream) {
            this.logger.error('amu.sma.0 localStream can not be found');
            return false;
        }
        audio.captureStream = audio.captureStream || audio.mozCaptureStream || audio.webkitCaptureStream;
        //混音
        this.ac = new (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : AudioContext)();
        this.gainNode = this.ac.createGain();
        this.mixAudio = this.ac.createMediaStreamSource(audio.captureStream());
        this.mixAudio.connect(this.gainNode);
        return this.replaceTrack();
    };
    audioMixUtil.prototype.replaceTrack = function () {
        this.streamSource = this.ac.createMediaStreamSource(this.localStream.clone());
        this.destination = this.ac.createMediaStreamDestination();
        !this.replace && this.streamSource.connect(this.destination);
        this.gainNode.connect(this.destination);
        //替换推流音轨
        var audioTrack = this.destination.stream.getAudioTracks()[0];
        var sender = this.peerConnection.getSenders().find(function (s) { return s.track.kind === audioTrack.kind; });
        if (!sender) {
            this.logger.error('amu.rt.0 no sender');
            return false;
        }
        this.micTrack = this.localStream.getAudioTracks()[0];
        sender.replaceTrack(audioTrack);
        this.localStream.removeTrack(this.micTrack);
        this.localStream.addTrack(audioTrack);
        this.isMixAudio = true;
        return true;
    };
    audioMixUtil.prototype.stopMixingAudio = function () {
        var _this = this;
        if (!this.isMixAudio) {
            this.logger.error("amu.sma.1 no mixing audio found");
            return false;
        }
        if (!this.localStream) {
            this.logger.error('amu.sma.1 localStream can not be found');
            return false;
        }
        var sender = this.peerConnection.getSenders().find(function (s) { return s.track.kind === _this.micTrack.kind; });
        sender.replaceTrack(this.micTrack);
        this.localStream.removeTrack(this.localStream.getAudioTracks()[0]);
        this.localStream.addTrack(this.micTrack);
        if (this.mixAudio) {
            this.mixAudio.disconnect(this.gainNode);
            this.mixAudio = null;
        }
        else if (this.buffSource) {
            this.buffSource.removeEventListener('ended', this.effectEndedListener);
            this.buffSource.stop();
            this.pauseTimes = Date.now();
            this.buffSource.disconnect(this.gainNode);
            this.buffSource = null;
        }
        this.gainNode.disconnect(this.destination);
        this.micTrack = null;
        this.ac = null;
        this.isMixAudio = false;
        return true;
    };
    audioMixUtil.prototype.setMixingAudioVolume = function (volume) {
        if (!this.gainNode) {
            this.logger.error("amu.sma.2 no mixing audio found");
            return false;
        }
        this.gainNode.gain.value = volume;
    };
    audioMixUtil.prototype.effectEndedHandler = function () {
        this.stopMixingAudio();
        this.effectEndedCallBack && this.effectEndedCallBack();
    };
    return audioMixUtil;
}());
exports.audioMixUtil = audioMixUtil;


/***/ }),

/***/ "./sdk/util/client-util.ts":
/*!*********************************!*\
  !*** ./sdk/util/client-util.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientUtil = /** @class */ (function () {
    function ClientUtil() {
    }
    ClientUtil.checkConfigParam = function (option, logger) {
        if (!option.appid || typeof option.appid !== 'number') {
            logger.error("ccp.0 appid must be number");
            return false;
        }
        if (!option.server) {
            logger.error("ccp.0 server must be string and not empty");
            return false;
        }
        if (!option.idName || typeof option.idName !== 'string') {
            logger.error("ccp.0 idName must be string and not empty");
            return false;
        }
        return true;
    };
    ClientUtil.checkLoginParam = function (roomid, token) {
        return true;
    };
    ClientUtil.registerCallback = function (fName, option, callbackList) {
        var sf, ef;
        if (option.success)
            sf = option.success;
        if (option.error)
            ef = option.error;
        callbackList[fName + "SuccessCallback"] = sf;
        callbackList[fName + "ErrorCallback"] = ef;
    };
    ClientUtil.actionErrorCallback = function (fName, callbackList) {
        return callbackList[fName + "ErrorCallback"];
    };
    // 执行成功回调函数
    ClientUtil.actionSuccessCallback = function (fName, callbackList) {
        return callbackList[fName + "SuccessCallback"];
    };
    /**
     错误管理
     */
    ClientUtil.getServerError = function (code) {
        var serverErrorList = {
            1: "parse json error.",
            1001: "login is processing.",
            1002: "liveroom request error.",
            1003: "zpush connect fail.",
            1004: "zpush handshake fail.",
            1005: "zpush login fail.",
            1006: "user login state is wrong.",
            1007: "got no zpush addr",
            1008: "token error",
            1009: "dispatch error",
            2002: "biz channel error",
            1000000000: "liveroom cmd error, result=",
        };
        if (code === 0) {
            return {
                code: "ZegoClient.Success",
                msg: "success"
            };
        }
        var err = {
            code: "ZegoClient.Error.Server",
            msg: "",
        };
        if (code > 1000000000) {
            err.msg = serverErrorList[1000000000] + code;
        }
        else if (!serverErrorList[code]) {
            err.msg = serverErrorList[code];
        }
        else {
            err.msg = "unknown error code:" + code;
        }
        return err;
    };
    ClientUtil.isKeepTryLogin = function (code) {
        switch (code) {
            case 1002: //liveroom connect error
            case 1003: //zpush connect error
                return true;
            default:
                return false;
        }
    };
    /*
    *    "msl.0": "ZegoClient.mergeStreamList",
    */
    ClientUtil.mergeStreamList = function (logger, idName, oldStreamList, newStreamList, callbackResult) {
        logger.debug("msl.0 call");
        var addStreamList = [];
        var delStreamList = [];
        var updateStreamList = [];
        var flag;
        if (!newStreamList) {
            newStreamList = [];
        }
        for (var i = 0; i < newStreamList.length; i++) {
            if (newStreamList[i].anchor_id_name == idName) {
                logger.debug("msl.0 have self stream added");
                continue;
            }
            flag = false;
            for (var j = 0; j < oldStreamList.length; j++) {
                if (newStreamList[i].stream_id === oldStreamList[j].stream_id) {
                    if (newStreamList[i].extra_info !== oldStreamList[j].extra_info) {
                        updateStreamList.push(newStreamList[i]);
                    }
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                addStreamList.push(newStreamList[i]);
            }
        }
        for (var k = 0; k < oldStreamList.length; k++) {
            flag = false;
            for (var n = 0; n < newStreamList.length; n++) {
                if (newStreamList[n].anchor_id_name == idName) {
                    logger.debug("msl.0 have self stream deleted");
                    continue;
                }
                if (oldStreamList[k].stream_id === newStreamList[n].stream_id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                delStreamList.push(oldStreamList[k]);
            }
        }
        oldStreamList.splice(0);
        for (var i = 0; i < newStreamList.length; i++) {
            oldStreamList.push(newStreamList[i]);
        }
        callbackResult(addStreamList, delStreamList, updateStreamList);
        logger.debug("msl.0 call success");
    };
    ClientUtil.checkCustomCommandParam = function (param) {
        return true;
    };
    //生成随机数
    ClientUtil.generateRandumNumber = function (maxNum) {
        return parseInt(Math.random() * (maxNum + 1) + '', 10);
    };
    //生成随机数
    ClientUtil.uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            // rfc4122, version 4 form
            var r = void 0;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    ClientUtil.isSupportWebrtc = function () {
        var e = window['RTCPeerConnection'] || window['mozRTCPeerConnection'] || window['webkitRTCPeerConnection'], t = navigator['getUserMedia'] || navigator['webkitGetUserMedia'] ||
            navigator['msGetUserMedia'] || navigator['mozGetUserMedia'] ||
            navigator['mediaDevices'] && navigator['mediaDevices']['getUserMedia'], n = window['WebSocket'];
        return !!e && !!t && !!n;
    };
    ClientUtil.isSupportH264 = function (sucCall, errCall) {
        var isInner = false;
        new RTCPeerConnection(null).createOffer({
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }).then(function (desc) {
            if (desc && desc.sdp) {
                isInner = true;
                clearTimeout(timer);
                var sdplist = desc.sdp.split('\r\n');
                var hasH264 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('H264/') > -1);
                });
                if (sucCall)
                    sucCall(hasH264);
            }
        }, function (err) {
            isInner = true;
            clearTimeout(timer);
            if (errCall)
                errCall(err);
        });
        var timer = setTimeout(function () {
            if (isInner == false)
                errCall(false);
        }, 200);
    };
    ClientUtil.supportDetection = function (screenShotReady, success, error) {
        var result = {
            webRtc: false,
            capture: false,
            videoDecodeType: {
                H264: false,
                VP8: false
            },
            screenSharing: screenShotReady
        };
        if (window['RTCPeerConnection'] || window['mozRTCPeerConnection'] || window['webkitRTCPeerConnection']) {
            result.webRtc = true;
        }
        if (navigator) {
            if (navigator['getUserMedia'] || navigator['webkitGetUserMedia'] ||
                navigator['msGetUserMedia'] || navigator['mozGetUserMedia'] ||
                navigator['mediaDevices'] && navigator['mediaDevices']['getUserMedia']) {
                result.capture = true;
            }
        }
        this.supportVideoCodeType(function (videoDecodeType) {
            result.videoDecodeType.H264 = videoDecodeType.H264;
            result.videoDecodeType.VP8 = videoDecodeType.VP8;
            success && success(result);
        }, function (err) {
            error && error(err);
        });
    };
    ClientUtil.compareVersion = function (v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    ClientUtil.isSupportLive = function (sucCall, errCall) {
        var resultList = {
            10001: '当前微信版本过低，无法使用相关组件',
            10002: '需要摄像头和录音功能的授权',
        };
        var version = wx.getSystemInfoSync().SDKVersion;
        var res = {
            code: -1,
            msg: '',
        };
        if (this.compareVersion(version, '1.7.0') < 0) {
            res = {
                code: 10001,
                msg: resultList[10001]
            };
            sucCall && sucCall(res);
        }
        wx.getSetting({
            success: function (_a) {
                var authSetting = _a.authSetting;
                if (!authSetting['scope.camera'] || !authSetting['scope.record']) {
                    res = {
                        code: 10002,
                        msg: resultList[10002]
                    };
                }
                sucCall && sucCall(res);
            },
            fail: function (err) {
                errCall && errCall(err);
            }
        });
    };
    ClientUtil.supportVideoCodeType = function (sucCall, errCall) {
        var isInner = false;
        new RTCPeerConnection(null).createOffer({
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }).then(function (desc) {
            if (desc && desc.sdp) {
                isInner = true;
                var sdplist = desc.sdp.split('\r\n');
                var hasH264 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('H264/') > -1);
                });
                var hasVP8 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('VP8/') > -1);
                });
                var hasVP9 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('VP9/') > -1);
                });
                var hasH265 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('H264/') > -1);
                });
                if (sucCall)
                    sucCall({
                        H264: hasH264,
                        VP8: hasVP8,
                        VP9: hasVP9,
                        H265: hasH265
                    });
            }
        }, function (err) {
            isInner = true;
            clearTimeout(timer);
            if (errCall)
                errCall(err);
        });
        var timer = setTimeout(function () {
            if (isInner == false)
                errCall(false);
        }, 200);
    };
    ClientUtil.inlineWorker = function (func) {
        if (Worker) {
            var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
            var url = URL.createObjectURL(new window.Blob([functionBody], {
                type: "text/javascript"
            }));
            return new Worker(url);
        }
        return null;
    };
    return ClientUtil;
}());
exports.ClientUtil = ClientUtil;


/***/ }),

/***/ "./sdk/util/mediaUtil.ts":
/*!*******************************!*\
  !*** ./sdk/util/mediaUtil.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var client_util_1 = __webpack_require__(/*! ./client-util */ "./sdk/util/client-util.ts");
var MediaUtil = /** @class */ (function () {
    function MediaUtil(_a) {
        var type = _a.type, _b = _a.channels, channels = _b === void 0 ? 1 : _b, _c = _a.bufferSize, bufferSize = _c === void 0 ? 0 : _c, _d = _a.sampleBit, sampleBit = _d === void 0 ? 16 : _d, _e = _a.sampleRate, sampleRate = _e === void 0 ? 44100 : _e;
        var _this = this;
        this.instant = 0.0;
        this.slow = 0.0;
        this.clip = 0.0;
        var context = new (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : AudioContext)();
        this.context = context;
        this.type = type;
        this.channels = channels;
        this.bufferSize = bufferSize;
        this.sampleBit = sampleBit;
        this.sampleRate = sampleRate;
        this.script = context.createScriptProcessor(bufferSize, channels, channels);
        var audioprocessTime = new Date().getTime();
        this.script.addEventListener('audioprocess', function (event) {
            var input = event.inputBuffer.getChannelData(0);
            var i;
            var sum = 0.0;
            var clipcount = 0;
            for (i = 0; i < input.length; ++i) {
                sum += input[i] * input[i];
                if (Math.abs(input[i]) > 0.99) {
                    clipcount += 1;
                }
            }
            _this.instant = Math.sqrt(sum / input.length);
            _this.slow = 0.95 * _this.slow + 0.05 * _this.instant;
            _this.clip = clipcount / input.length;
            // 需要获取音频数据
            if (type === 'pcm' || type === 'wav') {
                var buffer = [];
                for (var i_1 = 0; i_1 < _this.channels; i_1++) {
                    buffer.push(event.inputBuffer.getChannelData(i_1));
                }
                _this.recorderBuffer(buffer);
            }
        });
        // 需要获取音频数据,准备worker环境
        if (type === 'pcm' || type === 'wav') {
            this.initRecorderBuffer(type);
        }
    }
    MediaUtil.prototype.connectToSource = function (stream, callback) {
        console.log('SoundMeter connecting');
        try {
            this.mic = this.context.createMediaStreamSource(stream);
            this.mic.connect(this.script);
            // necessary to make sample run, but should not be.
            this.script.connect(this.context.destination);
            if (typeof callback !== 'undefined') {
                callback(null);
            }
        }
        catch (e) {
            console.error(e);
            if (typeof callback !== 'undefined') {
                callback(e);
            }
        }
        return this;
    };
    ;
    MediaUtil.prototype.recorderBuffer = function (audioBuffer) {
        this.worker.postMessage({
            command: 'record',
            val: audioBuffer
        });
    };
    MediaUtil.prototype.initRecorderBuffer = function (type) {
        var self = this;
        this.worker = client_util_1.ClientUtil.inlineWorker(function () {
            var record = [], sampleChannel, sampleBit, sampleRate, oldSampleRate, bufferSize, type, _self = this;
            this.onmessage = function (e) {
                switch (e.data.command) {
                    case 'init':
                        init(e.data.val);
                        break;
                    case 'record':
                        recordData(e.data.val);
                        break;
                }
            };
            function init(option) {
                sampleChannel = option.sampleChannel;
                sampleBit = option.sampleBit;
                sampleRate = option.sampleRate;
                oldSampleRate = option.oldSampleRate;
                bufferSize = option.bufferSize;
                type = option.type;
            }
            function recordData(buffer) {
                for (var i = 0; i < sampleChannel; i++) {
                    if (!record[i]) {
                        record[i] = [];
                    }
                    record[i].push(buffer[i]);
                }
                var compressRate = Math.round(oldSampleRate / sampleRate);
                if (type === 'pcm') {
                    collectPCM(compressRate);
                }
                else if (type === 'wav') {
                    collectWAV(compressRate);
                }
                record = []; //清空
            }
            function collectPCM(compressRate) {
                var result = collectBuffer(compressRate);
                var interleaveData = floatToPCM(result, sampleBit);
                _self.postMessage({
                    command: 'exportPcmLive',
                    val: interleaveData
                });
            }
            function collectWAV(compressRate) {
                var result = collectBuffer(compressRate);
                var interleaveData = encodeWave(result, sampleBit);
                _self.postMessage({
                    command: 'exportWav',
                    val: interleaveData
                });
            }
            function collectBuffer(compressRate) {
                var collect_record, compress_collect_record;
                if (sampleChannel == 1) { //单声道
                    collect_record = getAudioBuffer(record[0], bufferSize, record);
                    if (compressRate != 1) { //压缩比
                        compress_collect_record = compressHandler(compressRate, collect_record);
                    }
                }
                else if (sampleChannel == 2) { //双声道
                    //处理声道1,处理声道2
                    var collect_record_1 = getAudioBuffer(record[0], bufferSize, record);
                    var collect_record_2 = getAudioBuffer(record[1], bufferSize, record);
                    var compress_collect_record_1, compress_collect_record_2;
                    if (compressRate != 1) { //压缩声道1，2
                        compress_collect_record_1 = compressHandler(compressRate, collect_record_1);
                        compress_collect_record_2 = compressHandler(compressRate, collect_record_2);
                        compress_collect_record = combineChannels(compress_collect_record_1, compress_collect_record_2);
                    }
                    else {
                        collect_record = combineChannels(collect_record_1, collect_record_2);
                    }
                }
                if (compressRate != 1) { //输入采集概和输出采集率不同，需要压缩采集点
                    return compress_collect_record;
                }
                else {
                    return collect_record;
                }
            }
            ;
            //压缩
            function compressHandler(compressRate, data) {
                var result = new Float32Array(data.length / compressRate);
                var index = 0, j = 0;
                while (index < result.length) {
                    result[index] = data[j];
                    j += compressRate;
                    index++;
                }
                return result;
            }
            //获取buffer
            function getAudioBuffer(data, _bufferSize, _record) {
                var result = new Float32Array(_bufferSize * data.length);
                var offset = 0;
                for (var i = 0; i < _record[0].length; i++) {
                    result.set(_record[0][i], offset);
                    offset += _record[0][i].length;
                    //console.log(offset);
                }
                return result;
            }
            //合并声道
            function combineChannels(channelL, channelR) {
                var result = new Float32Array(channelL.length + channelR.length);
                for (var i = 0; i < channelL.length + channelR.length; i += 2) {
                    result[i] = channelL[(i / 2) >> 0];
                    result[i + 1] = channelR[(i / 2) >> 0];
                }
                return result;
            }
            function floatToPCM(samples, _sampleBit) {
                var dataLength;
                if (_sampleBit == 8) {
                    dataLength = samples.length;
                }
                else if (_sampleBit == 16) { //16位的需要两倍空间
                    dataLength = samples.length;
                    dataLength = dataLength * 2;
                }
                var buffer = new ArrayBuffer(dataLength);
                var view = new DataView(buffer);
                if (_sampleBit == 8) {
                    floatTo8BitPCM(view, 0, samples);
                }
                else if (sampleBit == 16) {
                    floatTo16BitPCM(view, 0, samples);
                }
                return view;
            }
            function writeString(view, offset, string) {
                for (var i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }
            function encodeWave(samples, _sampleBit) {
                var dataLength;
                if (_sampleBit == 8) {
                    dataLength = samples.length;
                }
                else if (sampleBit == 16) { //16位的需要两倍空间
                    dataLength = samples.length;
                    dataLength = dataLength * 2;
                }
                var buffer = new ArrayBuffer(dataLength + 44);
                var view = new DataView(buffer);
                var newSamepleRate = sampleRate;
                var newSampleBits = sampleBit;
                var newSampleChannel = sampleChannel;
                writeString(view, 0, 'RIFF');
                view.setUint32(4, 36 + dataLength, true);
                writeString(view, 8, 'WAVE');
                writeString(view, 12, 'fmt ');
                view.setUint32(16, 16, true);
                view.setUint16(20, 1, true);
                view.setUint16(22, newSampleChannel, true);
                view.setUint32(24, newSamepleRate, true);
                view.setUint32(28, newSamepleRate * newSampleChannel * (newSampleBits / 8), true);
                view.setUint16(32, newSampleChannel * (newSampleBits / 8), true);
                view.setUint16(34, newSampleBits, true);
                writeString(view, 36, 'data');
                view.setUint32(40, dataLength, true);
                if (sampleBit == 8) {
                    floatTo8BitPCM(view, 44, samples);
                }
                else if (sampleBit == 16) {
                    floatTo16BitPCM(view, 44, samples);
                }
                return view;
            }
            function floatTo16BitPCM(output, offset, input) {
                for (var i = 0; i < input.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, input[i]));
                    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                }
            }
            function floatTo8BitPCM(output, offset, input) {
                for (var i = 0; i < input.length; i++, offset++) { //这里只能加1了
                    var s = Math.max(-1, Math.min(1, input[i]));
                    var val = s < 0 ? s * 0x80 : s * 0x7F;
                    val += 128;
                    output.setInt8(offset, val);
                }
            }
        });
        this.worker.postMessage({
            command: 'init',
            val: {
                sampleChannel: this.channels,
                sampleBit: this.sampleBit,
                sampleRate: this.sampleRate,
                oldSampleRate: this.context.sampleRate,
                bufferSize: this.bufferSize,
                type: type
            }
        });
        this.worker.onmessage = function (e) {
            switch (e.data.command) {
                case 'exportPcmLive':
                    self.onReceiveBuffer(e.data.val);
                    break;
                case 'exportWav':
                    self.onReceiveWav(e.data.val);
                    break;
            }
        };
    };
    MediaUtil.prototype.onReceiveBuffer = function (val) {
    };
    MediaUtil.prototype.onReceiveWav = function (wavBlob) {
    };
    MediaUtil.prototype.writeString = function (view, offset, string) {
        for (var i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    MediaUtil.prototype.writeBuffer = function (view, offset, buffer) {
        for (var i = 0; i < buffer.byteLength; i++) {
            view.setUint8(offset + i, buffer[i]);
        }
    };
    MediaUtil.prototype.concatenation = function (segments) {
        var sumLength = 0;
        for (var i = 0; i < segments.length; ++i) {
            sumLength += segments[i].buffer.byteLength;
        }
        var whole = new Uint8Array(sumLength);
        var pos = 0;
        for (var i = 0; i < segments.length; ++i) {
            whole.set(new Uint8Array(segments[i].buffer), pos);
            pos += segments[i].buffer.byteLength;
        }
        return whole;
    };
    MediaUtil.prototype.encodeWave = function (samples) {
        var wholeBuffer = this.concatenation(samples);
        var dataLength = wholeBuffer.byteLength;
        var buffer = new ArrayBuffer(dataLength + 44);
        var view = new DataView(buffer);
        var newSamepleRate = this.sampleRate;
        var newSampleBits = this.sampleBit;
        var newSampleChannel = this.channels;
        this.writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + dataLength, true);
        this.writeString(view, 8, 'WAVE');
        this.writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, newSampleChannel, true);
        view.setUint32(24, newSamepleRate, true);
        view.setUint32(28, newSamepleRate * newSampleChannel * (newSampleBits / 8), true);
        view.setUint16(32, newSampleChannel * (newSampleBits / 8), true);
        view.setUint16(34, newSampleBits, true);
        this.writeString(view, 36, 'data');
        view.setUint32(40, dataLength, true);
        this.writeBuffer(view, 44, wholeBuffer);
        return view;
    };
    MediaUtil.prototype.stop = function () {
        this.mic.disconnect();
        this.script.disconnect();
    };
    ;
    return MediaUtil;
}());
exports.MediaUtil = MediaUtil;


/***/ }),

/***/ "./sdk/util/sdpUtil.ts":
/*!*****************************!*\
  !*** ./sdk/util/sdpUtil.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sdpUtil = /** @class */ (function () {
    function sdpUtil() {
    }
    sdpUtil.zegoSdp = function (sdp) {
        var sdpLines = sdp.split('\r\n');
        var h264_id = [], opus_id = [];
        sdpLines.forEach(function (item) {
            var _id = item.match(/a=rtpmap:(\d+)\s+((H264\/90000)|(opus\/48000\/2))/);
            if (_id && _id[1] && _id[2]) {
                _id[2] === 'H264/90000' && h264_id.push(_id[1]);
                _id[2] === 'opus/48000/2' && opus_id.push(_id[1]);
            }
        });
        var newSdpLines = [];
        sdpLines.map(function (item) {
            //去掉非h64和opus编解码
            var isH264_opus = true, other_needed = true;
            var _matched = item.match(/((a=rtcp-fb:)|(a=rtpmap:)|(a=fmtp:))(\d+)/);
            if (_matched && _matched[5]) {
                if (!h264_id.concat(opus_id).some(function (item) { return item == _matched[5]; })) {
                    isH264_opus = false;
                }
            }
            //去掉非h64和opus编解码 m=video
            if (item.indexOf('m=video') > -1) {
                var _videoDesc = item.split(' ');
                item = [_videoDesc[0], _videoDesc[1], _videoDesc[2]].concat(h264_id).join(' ');
            }
            else if (item.indexOf('m=audio') > -1) {
                var _videoDesc = item.split(' ');
                item = [_videoDesc[0], _videoDesc[1], _videoDesc[2]].concat(opus_id).join(' ');
            }
            //a=ssrc 非cname
            // if (item.indexOf ('a=ssrc') > -1 && item.indexOf ('cname') < 0) {
            //         other_needed = false
            // }
            isH264_opus && other_needed && newSdpLines.push(item);
        });
        return newSdpLines.join('\r\n');
    };
    sdpUtil.getSDPByVideDecodeType = function (sdp, type) {
        var videoDecodeTypes = {
            str: '',
            arr: [],
            obj: {
                'H264': [],
                'H265': [],
                'VP8': [],
                'VP9': [],
                'OHTER': [],
            }
        };
        if (!sdp.includes('m=video')) {
            return sdp;
        }
        var videoHead = /m=video.+/.exec(sdp)[0];
        videoHead = videoHead.match(/[\s|\d]+/g)[1].replace(' ', '');
        videoDecodeTypes.str = videoHead;
        videoDecodeTypes.arr = videoDecodeTypes.str.split(' ');
        videoDecodeTypes.arr.forEach(function (decodeType) {
            var reg = new RegExp('a=rtpmap:' + decodeType + '.+');
            var matched = reg.exec(sdp)[0];
            if (matched.includes('H264')) {
                videoDecodeTypes.obj.H264.push(decodeType);
            }
            else if (matched.includes('H265')) {
                videoDecodeTypes.obj.H265.push(decodeType);
            }
            else if (matched.includes('VP8')) {
                videoDecodeTypes.obj.VP8.push(decodeType);
            }
            else if (matched.includes('VP9')) {
                videoDecodeTypes.obj.VP9.push(decodeType);
            }
            else {
                videoDecodeTypes.obj.OHTER.push(decodeType);
            }
        });
        videoDecodeTypes.obj.OHTER.forEach(function (otherType) {
            var reg = new RegExp('a=fmtp:' + otherType + '.+apt=(\\d+)');
            var matchedArr = reg.exec(sdp);
            var matched = matchedArr && matchedArr[1];
            if (matched) {
                if (videoDecodeTypes.obj.H264.includes(matched)) {
                    videoDecodeTypes.obj.H264.push(otherType);
                }
                else if (videoDecodeTypes.obj.H265.includes(matched)) {
                    videoDecodeTypes.obj.H265.push(otherType);
                }
                else if (videoDecodeTypes.obj.VP8.includes(matched)) {
                    videoDecodeTypes.obj.VP8.push(otherType);
                }
                else if (videoDecodeTypes.obj.VP9.includes(matched)) {
                    videoDecodeTypes.obj.VP9.push(otherType);
                }
            }
        });
        var targetArr = [];
        if (type === 'VP9') {
            targetArr = videoDecodeTypes.obj.H265.concat(videoDecodeTypes.obj.H264, videoDecodeTypes.obj.VP8);
        }
        else if (type === 'VP8') {
            targetArr = videoDecodeTypes.obj.H265.concat(videoDecodeTypes.obj.H264, videoDecodeTypes.obj.VP9);
        }
        else if (type === 'H264') {
            targetArr = videoDecodeTypes.obj.H265.concat(videoDecodeTypes.obj.VP8, videoDecodeTypes.obj.VP9);
        }
        else if (type === 'H265') {
            targetArr = videoDecodeTypes.obj.VP8.concat(videoDecodeTypes.obj.H264, videoDecodeTypes.obj.VP9);
        }
        // targetArr.forEach(itype => {
        //         let currentIndex = videoDecodeTypes.arr.indexOf(itype);
        //         let reg;
        //         if( currentIndex!==(videoDecodeTypes.arr.length - 1)){
        //                 reg = new RegExp('a=rtpmap:' + itype + '[\\s\\S]+a=rtpmap:' + videoDecodeTypes.arr[currentIndex+1])
        //                 sdp = sdp.replace(reg, 'a=rtpmap:' + videoDecodeTypes.arr[currentIndex+1]);
        //         }else{
        //                 reg = new RegExp ('a=rtpmap:' + itype + '[\\s\\S]+a=fmtp:' + itype + '.+\\s\\n')
        //                 sdp = sdp.replace(reg, '');
        //         }
        //         videoDecodeTypes.arr.splice(currentIndex,1)
        //         //console.log('targetArr',reg)
        // });
        targetArr.forEach(function (itype) {
            var currentIndex = videoDecodeTypes.arr.indexOf(itype);
            videoDecodeTypes.arr.splice(currentIndex, 1);
            var regRtpmap = new RegExp('a=rtpmap:' + itype + '.+\\s\\n', 'g');
            var regRtcpfb = new RegExp('a=rtcp-fb:' + itype + '.+\\s\\n', 'g');
            var regFmtp = new RegExp('a=fmtp:' + itype + '.+\\s\\n', 'g');
            sdp = sdp.replace(regRtpmap, '');
            sdp = sdp.replace(regRtcpfb, '');
            sdp = sdp.replace(regFmtp, '');
        });
        sdp = sdp.replace(videoHead, videoDecodeTypes.arr.join(' '));
        return sdp;
    };
    return sdpUtil;
}());
exports.sdpUtil = sdpUtil;


/***/ }),

/***/ "./sdk/webrtc/adapter.js":
/*!*******************************!*\
  !*** ./sdk/webrtc/adapter.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */

  'use strict';

  var _adapter_factory = require('./adapter_factory.js');

  var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
  module.exports = adapter; // this is the difference from adapter_core.

  },{"./adapter_factory.js":2}],2:[function(require,module,exports){
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.adapterFactory = adapterFactory;

  var _utils = require('./utils');

  var utils = _interopRequireWildcard(_utils);

  var _chrome_shim = require('./chrome/chrome_shim');

  var chromeShim = _interopRequireWildcard(_chrome_shim);

  var _edge_shim = require('./edge/edge_shim');

  var edgeShim = _interopRequireWildcard(_edge_shim);

  var _firefox_shim = require('./firefox/firefox_shim');

  var firefoxShim = _interopRequireWildcard(_firefox_shim);

  var _safari_shim = require('./safari/safari_shim');

  var safariShim = _interopRequireWildcard(_safari_shim);

  var _common_shim = require('./common_shim');

  var commonShim = _interopRequireWildcard(_common_shim);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  // Shimming starts here.
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  function adapterFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        window = _ref.window;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      shimChrome: true,
      shimFirefox: true,
      shimEdge: true,
      shimSafari: true
    };

    // Utils.
    var logging = utils.log;
    var browserDetails = utils.detectBrowser(window);

    var adapter = {
      browserDetails: browserDetails,
      commonShim: commonShim,
      extractVersion: utils.extractVersion,
      disableLog: utils.disableLog,
      disableWarnings: utils.disableWarnings
    };

    // Shim browser if found.
    switch (browserDetails.browser) {
      case 'chrome':
        if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
          logging('Chrome shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming chrome.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = chromeShim;

        chromeShim.shimGetUserMedia(window);
        chromeShim.shimMediaStream(window);
        chromeShim.shimPeerConnection(window);
        chromeShim.shimOnTrack(window);
        chromeShim.shimAddTrackRemoveTrack(window);
        chromeShim.shimGetSendersWithDtmf(window);
        chromeShim.shimGetStats(window);
        chromeShim.shimSenderReceiverGetStats(window);
        chromeShim.fixNegotiationNeeded(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimConnectionState(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        commonShim.removeAllowExtmapMixed(window);
        break;
      case 'firefox':
        if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
          logging('Firefox shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming firefox.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = firefoxShim;

        firefoxShim.shimGetUserMedia(window);
        firefoxShim.shimPeerConnection(window);
        firefoxShim.shimOnTrack(window);
        firefoxShim.shimRemoveStream(window);
        firefoxShim.shimSenderGetStats(window);
        firefoxShim.shimReceiverGetStats(window);
        firefoxShim.shimRTCDataChannel(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimConnectionState(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        break;
      case 'edge':
        if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
          logging('MS edge shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming edge.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = edgeShim;

        edgeShim.shimGetUserMedia(window);
        edgeShim.shimGetDisplayMedia(window);
        edgeShim.shimPeerConnection(window);
        edgeShim.shimReplaceTrack(window);

        // the edge shim implements the full RTCIceCandidate object.

        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        break;
      case 'safari':
        if (!safariShim || !options.shimSafari) {
          logging('Safari shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming safari.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = safariShim;

        safariShim.shimRTCIceServerUrls(window);
        safariShim.shimCreateOfferLegacy(window);
        safariShim.shimCallbacksAPI(window);
        safariShim.shimLocalStreamsAPI(window);
        safariShim.shimRemoteStreamsAPI(window);
        safariShim.shimTrackEventTransceiver(window);
        safariShim.shimGetUserMedia(window);

        commonShim.shimRTCIceCandidate(window);
        commonShim.shimMaxMessageSize(window);
        commonShim.shimSendThrowTypeError(window);
        commonShim.removeAllowExtmapMixed(window);
        break;
      default:
        logging('Unsupported browser!');
        break;
    }

    return adapter;
  }

  // Browser shims.

  },{"./chrome/chrome_shim":3,"./common_shim":6,"./edge/edge_shim":7,"./firefox/firefox_shim":11,"./safari/safari_shim":14,"./utils":15}],3:[function(require,module,exports){

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimMediaStream = shimMediaStream;
  exports.shimOnTrack = shimOnTrack;
  exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
  exports.shimGetStats = shimGetStats;
  exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
  exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
  exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
  exports.shimPeerConnection = shimPeerConnection;
  exports.fixNegotiationNeeded = fixNegotiationNeeded;

  var _utils = require('../utils.js');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimMediaStream(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  }

  function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function get() {
          return this._ontrack;
        },
        set: function set(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
          }
          this.addEventListener('track', this._ontrack = f);
        },

        enumerable: true,
        configurable: true
      });
      var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function () {
        var _this = this;

        if (!this._ontrackpoly) {
          this._ontrackpoly = function (e) {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', function (te) {
              var receiver = void 0;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = _this.getReceivers().find(function (r) {
                  return r.track && r.track.id === te.track.id;
                });
              } else {
                receiver = { track: te.track };
              }

              var event = new Event('track');
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              _this.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(function (track) {
              var receiver = void 0;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = _this.getReceivers().find(function (r) {
                  return r.track && r.track.id === track.id;
                });
              } else {
                receiver = { track: track };
              }
              var event = new Event('track');
              event.track = track;
              event.receiver = receiver;
              event.transceiver = { receiver: receiver };
              event.streams = [e.stream];
              _this.dispatchEvent(event);
            });
          };
          this.addEventListener('addstream', this._ontrackpoly);
        }
        return origSetRemoteDescription.apply(this, arguments);
      };
    } else {
      // even if RTCRtpTransceiver is in window, it is only used and
      // emitted in unified-plan. Unfortunately this means we need
      // to unconditionally wrap the event.
      utils.wrapPeerConnectionEvent(window, 'track', function (e) {
        if (!e.transceiver) {
          Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
        }
        return e;
      });
    }
  }

  function shimGetSendersWithDtmf(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
      var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
        return {
          track: track,
          get dtmf() {
            if (this._dtmf === undefined) {
              if (track.kind === 'audio') {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };

      // augment addTrack when getSenders is not available.
      if (!window.RTCPeerConnection.prototype.getSenders) {
        window.RTCPeerConnection.prototype.getSenders = function () {
          this._senders = this._senders || [];
          return this._senders.slice(); // return a copy of the internal state.
        };
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
          var sender = origAddTrack.apply(this, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(this, track);
            this._senders.push(sender);
          }
          return sender;
        };

        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function (sender) {
          origRemoveTrack.apply(this, arguments);
          var idx = this._senders.indexOf(sender);
          if (idx !== -1) {
            this._senders.splice(idx, 1);
          }
        };
      }
      var origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function (stream) {
        var _this2 = this;

        this._senders = this._senders || [];
        origAddStream.apply(this, [stream]);
        stream.getTracks().forEach(function (track) {
          _this2._senders.push(shimSenderWithDtmf(_this2, track));
        });
      };

      var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream = function (stream) {
        var _this3 = this;

        this._senders = this._senders || [];
        origRemoveStream.apply(this, [stream]);

        stream.getTracks().forEach(function (track) {
          var sender = _this3._senders.find(function (s) {
            return s.track === track;
          });
          if (sender) {
            // remove sender
            _this3._senders.splice(_this3._senders.indexOf(sender), 1);
          }
        });
      };
    } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      window.RTCPeerConnection.prototype.getSenders = function () {
        var _this4 = this;

        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this4;
        });
        return senders;
      };

      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  }

  function shimGetStats(window) {
    if (!window.RTCPeerConnection) {
      return;
    }

    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
      var _this5 = this;

      var args = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats.apply(this, arguments);
      }

      // When spec-style getStats is supported, return those when called with
      // either no arguments or the selector argument is null.
      if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
        return origGetStats.apply(this, []);
      }

      var fixChromeStats_ = function fixChromeStats_(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function (report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[report.type] || report.type
          };
          report.names().forEach(function (name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      // shim getStats with maplike support
      var makeMapStats = function makeMapStats(stats) {
        return new Map(Object.keys(stats).map(function (key) {
          return [key, stats[key]];
        }));
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper_ = function successCallbackWrapper_(response) {
          args[1](makeMapStats(fixChromeStats_(response)));
        };

        return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
      }

      // promise-support
      return new Promise(function (resolve, reject) {
        origGetStats.apply(_this5, [function (response) {
          resolve(makeMapStats(fixChromeStats_(response)));
        }, reject]);
      }).then(successCallback, errorCallback);
    };
  }

  function shimSenderReceiverGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
      return;
    }

    // shim sender stats.
    if (!('getStats' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function () {
          var _this6 = this;

          var senders = origGetSenders.apply(this, []);
          senders.forEach(function (sender) {
            return sender._pc = _this6;
          });
          return senders;
        };
      }

      var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function () {
          var sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window.RTCRtpSender.prototype.getStats = function () {
        var sender = this;
        return this._pc.getStats().then(function (result) {
          return (
            /* Note: this will include stats of all senders that
             *   send a track with the same id as sender.track as
             *   it is not possible to identify the RTCRtpSender.
             */
            utils.filterStats(result, sender.track, true)
          );
        });
      };
    }

    // shim receiver stats.
    if (!('getStats' in window.RTCRtpReceiver.prototype)) {
      var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function () {
          var _this7 = this;

          var receivers = origGetReceivers.apply(this, []);
          receivers.forEach(function (receiver) {
            return receiver._pc = _this7;
          });
          return receivers;
        };
      }
      utils.wrapPeerConnectionEvent(window, 'track', function (e) {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window.RTCRtpReceiver.prototype.getStats = function () {
        var receiver = this;
        return this._pc.getStats().then(function (result) {
          return utils.filterStats(result, receiver.track, false);
        });
      };
    }

    if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
      return;
    }

    // shim RTCPeerConnection.getStats(track).
    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function () {
      if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
        var track = arguments[0];
        var sender = void 0;
        var receiver = void 0;
        var err = void 0;
        this.getSenders().forEach(function (s) {
          if (s.track === track) {
            if (sender) {
              err = true;
            } else {
              sender = s;
            }
          }
        });
        this.getReceivers().forEach(function (r) {
          if (r.track === track) {
            if (receiver) {
              err = true;
            } else {
              receiver = r;
            }
          }
          return r.track === track;
        });
        if (err || sender && receiver) {
          return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
        } else if (sender) {
          return sender.getStats();
        } else if (receiver) {
          return receiver.getStats();
        }
        return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
      }
      return origGetStats.apply(this, arguments);
    };
  }

  function shimAddTrackRemoveTrackWithNative(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function () {
      var _this8 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
        return _this8._shimmedLocalStreams[streamId][0];
      });
    };

    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
      if (!stream) {
        return origAddTrack.apply(this, arguments);
      }
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

      var sender = origAddTrack.apply(this, arguments);
      if (!this._shimmedLocalStreams[stream.id]) {
        this._shimmedLocalStreams[stream.id] = [stream, sender];
      } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
        this._shimmedLocalStreams[stream.id].push(sender);
      }
      return sender;
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function (stream) {
      var _this9 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};

      stream.getTracks().forEach(function (track) {
        var alreadyExists = _this9.getSenders().find(function (s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      var existingSenders = this.getSenders();
      origAddStream.apply(this, arguments);
      var newSenders = this.getSenders().filter(function (newSender) {
        return existingSenders.indexOf(newSender) === -1;
      });
      this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      delete this._shimmedLocalStreams[stream.id];
      return origRemoveStream.apply(this, arguments);
    };

    var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function (sender) {
      var _this10 = this;

      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      if (sender) {
        Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
          var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
          if (idx !== -1) {
            _this10._shimmedLocalStreams[streamId].splice(idx, 1);
          }
          if (_this10._shimmedLocalStreams[streamId].length === 1) {
            delete _this10._shimmedLocalStreams[streamId];
          }
        });
      }
      return origRemoveTrack.apply(this, arguments);
    };
  }

  function shimAddTrackRemoveTrack(window) {
    if (!window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
      return shimAddTrackRemoveTrackWithNative(window);
    }

    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function () {
      var _this11 = this;

      var nativeStreams = origGetLocalStreams.apply(this);
      this._reverseStreams = this._reverseStreams || {};
      return nativeStreams.map(function (stream) {
        return _this11._reverseStreams[stream.id];
      });
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function (stream) {
      var _this12 = this;

      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};

      stream.getTracks().forEach(function (track) {
        var alreadyExists = _this12.getSenders().find(function (s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      // Add identity mapping for consistency with addTrack.
      // Unless this is being used with a stream from addTrack.
      if (!this._reverseStreams[stream.id]) {
        var newStream = new window.MediaStream(stream.getTracks());
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(this, [stream]);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};

      origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
      delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
      delete this._streams[stream.id];
    };

    window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
      var _this13 = this;

      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      var streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
        return t === track;
      })) {
        // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
      }

      var alreadyExists = this.getSenders().find(function (s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }

      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      var oldStream = this._streams[stream.id];
      if (oldStream) {
        // this is using odd Chrome behaviour, use with caution:
        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
        // Note: we rely on the high-level addTrack/dtmf shim to
        // create the sender with a dtmf sender.
        oldStream.addTrack(track);

        // Trigger ONN async.
        Promise.resolve().then(function () {
          _this13.dispatchEvent(new Event('negotiationneeded'));
        });
      } else {
        var newStream = new window.MediaStream([track]);
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        this.addStream(newStream);
      }
      return this.getSenders().find(function (s) {
        return s.track === track;
      });
    };

    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    ['createOffer', 'createAnswer'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        var _this14 = this;

        var args = arguments;
        var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
        if (isLegacyCall) {
          return nativeMethod.apply(this, [function (description) {
            var desc = replaceInternalStreamId(_this14, description);
            args[0].apply(null, [desc]);
          }, function (err) {
            if (args[1]) {
              args[1].apply(null, err);
            }
          }, arguments[2]]);
        }
        return nativeMethod.apply(this, arguments).then(function (description) {
          return replaceInternalStreamId(_this14, description);
        });
      };
    });

    var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function () {
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(this, arguments);
      }
      arguments[0] = replaceExternalStreamId(this, arguments[0]);
      return origSetLocalDescription.apply(this, arguments);
    };

    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

    var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
      get: function get() {
        var description = origLocalDescription.get.apply(this);
        if (description.type === '') {
          return description;
        }
        return replaceInternalStreamId(this, description);
      }
    });

    window.RTCPeerConnection.prototype.removeTrack = function (sender) {
      var _this15 = this;

      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      // We can not yet check for sender instanceof RTCRtpSender
      // since we shim RTPSender. So we check if sender._pc is set.
      if (!sender._pc) {
        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
      }
      var isLocal = sender._pc === this;
      if (!isLocal) {
        throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
      }

      // Search for the native stream the senders track belongs to.
      this._streams = this._streams || {};
      var stream = void 0;
      Object.keys(this._streams).forEach(function (streamid) {
        var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
          return sender.track === track;
        });
        if (hasTrack) {
          stream = _this15._streams[streamid];
        }
      });

      if (stream) {
        if (stream.getTracks().length === 1) {
          // if this is the last track of the stream, remove the stream. This
          // takes care of any shimmed _senders.
          this.removeStream(this._reverseStreams[stream.id]);
        } else {
          // relying on the same odd chrome behaviour as above.
          stream.removeTrack(sender.track);
        }
        this.dispatchEvent(new Event('negotiationneeded'));
      }
    };
  }

  function shimPeerConnection(window) {
    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.webkitRTCPeerConnection;
    }
    if (!window.RTCPeerConnection) {
      return;
    }

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      };
    });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function () {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }

  function fixNegotiationNeeded(window) {
    utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
      var pc = e.target;
      if (pc.signalingState !== 'stable') {
        return;
      }
      return e;
    });
  }

  },{"../utils.js":15,"./getdisplaymedia":4,"./getusermedia":5}],4:[function(require,module,exports){
  /*
   *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window, getSourceId) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    // getSourceId is a function that returns a promise resolving with
    // the sourceId of the screen/window/tab to be shared.
    if (typeof getSourceId !== 'function') {
      console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
      return getSourceId(constraints).then(function (sourceId) {
        var widthSpecified = constraints.video && constraints.video.width;
        var heightSpecified = constraints.video && constraints.video.height;
        var frameRateSpecified = constraints.video && constraints.video.frameRate;
        constraints.video = {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            maxFrameRate: frameRateSpecified || 3
          }
        };
        if (widthSpecified) {
          constraints.video.mandatory.maxWidth = widthSpecified;
        }
        if (heightSpecified) {
          constraints.video.mandatory.maxHeight = heightSpecified;
        }
        return window.navigator.mediaDevices.getUserMedia(constraints);
      });
    };
  }

  },{}],5:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimGetUserMedia = shimGetUserMedia;

  var _utils = require('../utils.js');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  var logging = utils.log;

  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    if (!navigator.mediaDevices) {
      return;
    }

    var browserDetails = utils.detectBrowser(window);

    var constraintsToChrome_ = function constraintsToChrome_(c) {
      if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
        return c;
      }
      var cc = {};
      Object.keys(c).forEach(function (key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
        if (r.exact !== undefined && typeof r.exact === 'number') {
          r.min = r.max = r.exact;
        }
        var oldname_ = function oldname_(prefix, name) {
          if (prefix) {
            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
          }
          return name === 'deviceId' ? 'sourceId' : name;
        };
        if (r.ideal !== undefined) {
          cc.optional = cc.optional || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[oldname_('min', key)] = r.ideal;
            cc.optional.push(oc);
            oc = {};
            oc[oldname_('max', key)] = r.ideal;
            cc.optional.push(oc);
          } else {
            oc[oldname_('', key)] = r.ideal;
            cc.optional.push(oc);
          }
        }
        if (r.exact !== undefined && typeof r.exact !== 'number') {
          cc.mandatory = cc.mandatory || {};
          cc.mandatory[oldname_('', key)] = r.exact;
        } else {
          ['min', 'max'].forEach(function (mix) {
            if (r[mix] !== undefined) {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_(mix, key)] = r[mix];
            }
          });
        }
      });
      if (c.advanced) {
        cc.optional = (cc.optional || []).concat(c.advanced);
      }
      return cc;
    };

    var shimConstraints_ = function shimConstraints_(constraints, func) {
      if (browserDetails.version >= 61) {
        return func(constraints);
      }
      constraints = JSON.parse(JSON.stringify(constraints));
      if (constraints && _typeof(constraints.audio) === 'object') {
        var remap = function remap(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };
        constraints = JSON.parse(JSON.stringify(constraints));
        remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
        remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
        constraints.audio = constraintsToChrome_(constraints.audio);
      }
      if (constraints && _typeof(constraints.video) === 'object') {
        // Shim facingMode for mobile & surface pro.
        var face = constraints.video.facingMode;
        face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : { ideal: face });
        var getSupportedFacingModeLies = browserDetails.version < 66;

        if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
          delete constraints.video.facingMode;
          var matches = void 0;
          if (face.exact === 'environment' || face.ideal === 'environment') {
            matches = ['back', 'rear'];
          } else if (face.exact === 'user' || face.ideal === 'user') {
            matches = ['front'];
          }
          if (matches) {
            // Look for matches in label, or use last cam for back (typical).
            return navigator.mediaDevices.enumerateDevices().then(function (devices) {
              devices = devices.filter(function (d) {
                return d.kind === 'videoinput';
              });
              var dev = devices.find(function (d) {
                return matches.some(function (match) {
                  return d.label.toLowerCase().includes(match);
                });
              });
              if (!dev && devices.length && matches.includes('back')) {
                dev = devices[devices.length - 1]; // more likely the back cam
              }
              if (dev) {
                constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
              }
              constraints.video = constraintsToChrome_(constraints.video);
              logging('chrome: ' + JSON.stringify(constraints));
              return func(constraints);
            });
          }
        }
        constraints.video = constraintsToChrome_(constraints.video);
      }
      logging('chrome: ' + JSON.stringify(constraints));
      return func(constraints);
    };

    var shimError_ = function shimError_(e) {
      if (browserDetails.version >= 64) {
        return e;
      }
      return {
        name: {
          PermissionDeniedError: 'NotAllowedError',
          PermissionDismissedError: 'NotAllowedError',
          InvalidStateError: 'NotAllowedError',
          DevicesNotFoundError: 'NotFoundError',
          ConstraintNotSatisfiedError: 'OverconstrainedError',
          TrackStartError: 'NotReadableError',
          MediaDeviceFailedDueToShutdown: 'NotAllowedError',
          MediaDeviceKillSwitchOn: 'NotAllowedError',
          TabCaptureError: 'AbortError',
          ScreenCaptureError: 'AbortError',
          DeviceCaptureError: 'AbortError'
        }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint || e.constraintName,
        toString: function toString() {
          return this.name + (this.message && ': ') + this.message;
        }
      };
    };

    var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
      shimConstraints_(constraints, function (c) {
        navigator.webkitGetUserMedia(c, onSuccess, function (e) {
          if (onError) {
            onError(shimError_(e));
          }
        });
      });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);

    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
      var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (cs) {
        return shimConstraints_(cs, function (c) {
          return origGetUserMedia(c).then(function (stream) {
            if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
              throw new DOMException('', 'NotFoundError');
            }
            return stream;
          }, function (e) {
            return Promise.reject(shimError_(e));
          });
        });
      };
    }
  }

  },{"../utils.js":15}],6:[function(require,module,exports){
  /*
   *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimRTCIceCandidate = shimRTCIceCandidate;
  exports.shimMaxMessageSize = shimMaxMessageSize;
  exports.shimSendThrowTypeError = shimSendThrowTypeError;
  exports.shimConnectionState = shimConnectionState;
  exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

  var _sdp = require('sdp');

  var _sdp2 = _interopRequireDefault(_sdp);

  var _utils = require('./utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function shimRTCIceCandidate(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
      return;
    }

    var NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function (args) {
      // Remove the a= which shouldn't be part of the candidate string.
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substr(2);
      }

      if (args.candidate && args.candidate.length) {
        // Augment the native candidate with the parsed fields.
        var nativeCandidate = new NativeRTCIceCandidate(args);
        var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
        var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

        // Add a serializer that does not serialize the extra attributes.
        augmentedCandidate.toJSON = function () {
          return {
            candidate: augmentedCandidate.candidate,
            sdpMid: augmentedCandidate.sdpMid,
            sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
            usernameFragment: augmentedCandidate.usernameFragment
          };
        };
        return augmentedCandidate;
      }
      return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
      if (e.candidate) {
        Object.defineProperty(e, 'candidate', {
          value: new window.RTCIceCandidate(e.candidate),
          writable: 'false'
        });
      }
      return e;
    });
  }

  function shimMaxMessageSize(window) {
    if (window.RTCSctpTransport || !window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);

    if (!('sctp' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
        get: function get() {
          return typeof this._sctp === 'undefined' ? null : this._sctp;
        }
      });
    }

    var sctpInDescription = function sctpInDescription(description) {
      if (!description || !description.sdp) {
        return false;
      }
      var sections = _sdp2.default.splitSections(description.sdp);
      sections.shift();
      return sections.some(function (mediaSection) {
        var mLine = _sdp2.default.parseMLine(mediaSection);
        return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
      });
    };

    var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
      // TODO: Is there a better solution for detecting Firefox?
      var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (match === null || match.length < 2) {
        return -1;
      }
      var version = parseInt(match[1], 10);
      // Test for NaN (yes, this is ugly)
      return version !== version ? -1 : version;
    };

    var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
      // Every implementation we know can send at least 64 KiB.
      // Note: Although Chrome is technically able to send up to 256 KiB, the
      //       data does not reach the other peer reliably.
      //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
      var canSendMaxMessageSize = 65536;
      if (browserDetails.browser === 'firefox') {
        if (browserDetails.version < 57) {
          if (remoteIsFirefox === -1) {
            // FF < 57 will send in 16 KiB chunks using the deprecated PPID
            // fragmentation.
            canSendMaxMessageSize = 16384;
          } else {
            // However, other FF (and RAWRTC) can reassemble PPID-fragmented
            // messages. Thus, supporting ~2 GiB when sending.
            canSendMaxMessageSize = 2147483637;
          }
        } else if (browserDetails.version < 60) {
          // Currently, all FF >= 57 will reset the remote maximum message size
          // to the default value when a data channel is created at a later
          // stage. :(
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
          canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
        } else {
          // FF >= 60 supports sending ~2 GiB
          canSendMaxMessageSize = 2147483637;
        }
      }
      return canSendMaxMessageSize;
    };

    var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
      // Note: 65536 bytes is the default value from the SDP spec. Also,
      //       every implementation we know supports receiving 65536 bytes.
      var maxMessageSize = 65536;

      // FF 57 has a slightly incorrect default remote max message size, so
      // we need to adjust it here to avoid a failure when sending.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
      if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
        maxMessageSize = 65535;
      }

      var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
      if (match.length > 0) {
        maxMessageSize = parseInt(match[0].substr(19), 10);
      } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
        // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
      }
      return maxMessageSize;
    };

    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function () {
      this._sctp = null;

      if (sctpInDescription(arguments[0])) {
        // Check if the remote is FF.
        var isFirefox = getRemoteFirefoxVersion(arguments[0]);

        // Get the maximum message size the local peer is capable of sending
        var canSendMMS = getCanSendMaxMessageSize(isFirefox);

        // Get the maximum message size of the remote peer.
        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

        // Determine final maximum message size
        var maxMessageSize = void 0;
        if (canSendMMS === 0 && remoteMMS === 0) {
          maxMessageSize = Number.POSITIVE_INFINITY;
        } else if (canSendMMS === 0 || remoteMMS === 0) {
          maxMessageSize = Math.max(canSendMMS, remoteMMS);
        } else {
          maxMessageSize = Math.min(canSendMMS, remoteMMS);
        }

        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
        // attribute.
        var sctp = {};
        Object.defineProperty(sctp, 'maxMessageSize', {
          get: function get() {
            return maxMessageSize;
          }
        });
        this._sctp = sctp;
      }

      return origSetRemoteDescription.apply(this, arguments);
    };
  }

  function shimSendThrowTypeError(window) {
    if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
      return;
    }

    // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

    function wrapDcSend(dc, pc) {
      var origDataChannelSend = dc.send;
      dc.send = function () {
        var data = arguments[0];
        var length = data.length || data.size || data.byteLength;
        if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
          throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
        }
        return origDataChannelSend.apply(dc, arguments);
      };
    }
    var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function () {
      var dataChannel = origCreateDataChannel.apply(this, arguments);
      wrapDcSend(dataChannel, this);
      return dataChannel;
    };
    utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
      wrapDcSend(e.channel, e.target);
      return e;
    });
  }

  /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
   * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
   * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
   * since DTLS failures would be hidden. See
   * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
   * for the Firefox tracking bug.
   */
  function shimConnectionState(window) {
    if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
      return;
    }
    var proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, 'connectionState', {
      get: function get() {
        return {
          completed: 'connected',
          checking: 'connecting'
        }[this.iceConnectionState] || this.iceConnectionState;
      },

      enumerable: true,
      configurable: true
    });
    Object.defineProperty(proto, 'onconnectionstatechange', {
      get: function get() {
        return this._onconnectionstatechange || null;
      },
      set: function set(cb) {
        if (this._onconnectionstatechange) {
          this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
          delete this._onconnectionstatechange;
        }
        if (cb) {
          this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
        }
      },

      enumerable: true,
      configurable: true
    });

    ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
      var origMethod = proto[method];
      proto[method] = function () {
        if (!this._connectionstatechangepoly) {
          this._connectionstatechangepoly = function (e) {
            var pc = e.target;
            if (pc._lastConnectionState !== pc.connectionState) {
              pc._lastConnectionState = pc.connectionState;
              var newEvent = new Event('connectionstatechange', e);
              pc.dispatchEvent(newEvent);
            }
            return e;
          };
          this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
        }
        return origMethod.apply(this, arguments);
      };
    });
  }

  function removeAllowExtmapMixed(window) {
    /* remove a=extmap-allow-mixed for Chrome < M71 */
    if (!window.RTCPeerConnection) {
      return;
    }
    var browserDetails = utils.detectBrowser(window);
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
      return;
    }
    var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function (desc) {
      if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
        desc.sdp = desc.sdp.split('\n').filter(function (line) {
          return line.trim() !== 'a=extmap-allow-mixed';
        }).join('\n');
      }
      return nativeSRD.apply(this, arguments);
    };
  }

  },{"./utils":15,"sdp":17}],7:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimPeerConnection = shimPeerConnection;
  exports.shimReplaceTrack = shimReplaceTrack;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  var _filtericeservers = require('./filtericeservers');

  var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');

  var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if (window.RTCIceGatherer) {
      if (!window.RTCIceCandidate) {
        window.RTCIceCandidate = function (args) {
          return args;
        };
      }
      if (!window.RTCSessionDescription) {
        window.RTCSessionDescription = function (args) {
          return args;
        };
      }
      // this adds an additional event listener to MediaStrackTrack that signals
      // when a tracks enabled property was changed. Workaround for a bug in
      // addStream, see below. No longer required in 15025+
      if (browserDetails.version < 15025) {
        var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
          set: function set(value) {
            origMSTEnabled.set.call(this, value);
            var ev = new Event('enabled');
            ev.enabled = value;
            this.dispatchEvent(ev);
          }
        });
      }
    }

    // ORTC defines the DTMF sender a bit different.
    // https://github.com/w3c/ortc/issues/714
    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = new window.RTCDtmfSender(this);
            } else if (this.track.kind === 'video') {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
    // Edge currently only implements the RTCDtmfSender, not the
    // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
    if (window.RTCDtmfSender && !window.RTCDTMFSender) {
      window.RTCDTMFSender = window.RTCDtmfSender;
    }

    var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
    window.RTCPeerConnection = function (config) {
      if (config && config.iceServers) {
        config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
        utils.log('ICE servers after filtering:', config.iceServers);
      }
      return new RTCPeerConnectionShim(config);
    };
    window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
  }

  function shimReplaceTrack(window) {
    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
    if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
      window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
    }
  }

  },{"../utils":15,"./filtericeservers":8,"./getdisplaymedia":9,"./getusermedia":10,"rtcpeerconnection-shim":16}],8:[function(require,module,exports){
  /*
   *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.filterIceServers = filterIceServers;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  // Edge does not like
  // 1) stun: filtered after 14393 unless ?transport=udp is present
  // 2) turn: that does not have all of turn:host:port?transport=udp
  // 3) turn: with ipv6 addresses
  // 4) turn: occurring muliple times
  function filterIceServers(iceServers, edgeVersion) {
    var hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter(function (server) {
      if (server && (server.urls || server.url)) {
        var urls = server.urls || server.url;
        if (server.url && !server.urls) {
          utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
        }
        var isString = typeof urls === 'string';
        if (isString) {
          urls = [urls];
        }
        urls = urls.filter(function (url) {
          // filter STUN unconditionally.
          if (url.indexOf('stun:') === 0) {
            return false;
          }

          var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
          if (validTurn && !hasTurn) {
            hasTurn = true;
            return true;
          }
          return validTurn && !hasTurn;
        });

        delete server.url;
        server.urls = isString ? urls[0] : urls;
        return !!urls.length;
      }
    });
  }

  },{"../utils":15}],9:[function(require,module,exports){
  /*
   *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window) {
    if (!('getDisplayMedia' in window.navigator)) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
  }

  },{}],10:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetUserMedia = shimGetUserMedia;
  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    var shimError_ = function shimError_(e) {
      return {
        name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint,
        toString: function toString() {
          return this.name;
        }
      };
    };

    // getUserMedia error shim.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      return origGetUserMedia(c).catch(function (e) {
        return Promise.reject(shimError_(e));
      });
    };
  }

  },{}],11:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _getusermedia = require('./getusermedia');

  Object.defineProperty(exports, 'shimGetUserMedia', {
    enumerable: true,
    get: function get() {
      return _getusermedia.shimGetUserMedia;
    }
  });

  var _getdisplaymedia = require('./getdisplaymedia');

  Object.defineProperty(exports, 'shimGetDisplayMedia', {
    enumerable: true,
    get: function get() {
      return _getdisplaymedia.shimGetDisplayMedia;
    }
  });
  exports.shimOnTrack = shimOnTrack;
  exports.shimPeerConnection = shimPeerConnection;
  exports.shimSenderGetStats = shimSenderGetStats;
  exports.shimReceiverGetStats = shimReceiverGetStats;
  exports.shimRemoveStream = shimRemoveStream;
  exports.shimRTCDataChannel = shimRTCDataChannel;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimOnTrack(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  }

  function shimPeerConnection(window) {
    var browserDetails = utils.detectBrowser(window);

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.mozRTCPeerConnection;
    }

    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      };
    });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function () {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };

    var modernStatsTypes = {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    };

    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
      return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
        if (browserDetails.version < 53 && !onSucc) {
          // Shim only promise getStats with spec-hyphens in type names
          // Leave callback version alone; misc old uses of forEach before Map
          try {
            stats.forEach(function (stat) {
              stat.type = modernStatsTypes[stat.type] || stat.type;
            });
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
            stats.forEach(function (stat, i) {
              stats.set(i, Object.assign({}, stat, {
                type: modernStatsTypes[stat.type] || stat.type
              }));
            });
          }
        }
        return stats;
      }).then(onSucc, onErr);
    };
  }

  function shimSenderGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
      return;
    }
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function () {
        var _this = this;

        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this;
        });
        return senders;
      };
    }

    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function () {
        var sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window.RTCRtpSender.prototype.getStats = function () {
      return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
  }

  function shimReceiverGetStats(window) {
    if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
      return;
    }
    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function () {
        var _this2 = this;

        var receivers = origGetReceivers.apply(this, []);
        receivers.forEach(function (receiver) {
          return receiver._pc = _this2;
        });
        return receivers;
      };
    }
    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function () {
      return this._pc.getStats(this.track);
    };
  }

  function shimRemoveStream(window) {
    if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
      return;
    }
    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      var _this3 = this;

      utils.deprecated('removeStream', 'removeTrack');
      this.getSenders().forEach(function (sender) {
        if (sender.track && stream.getTracks().includes(sender.track)) {
          _this3.removeTrack(sender);
        }
      });
    };
  }

  function shimRTCDataChannel(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) {
      window.RTCDataChannel = window.DataChannel;
    }
  }

  },{"../utils":15,"./getdisplaymedia":12,"./getusermedia":13}],12:[function(require,module,exports){
  /*
   *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shimGetDisplayMedia = shimGetDisplayMedia;
  function shimGetDisplayMedia(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
      if (!(constraints && constraints.video)) {
        var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
        err.name = 'NotFoundError';
        // from https://heycam.github.io/webidl/#idl-DOMException-error-names
        err.code = 8;
        return Promise.reject(err);
      }
      if (constraints.video === true) {
        constraints.video = { mediaSource: preferredMediaSource };
      } else {
        constraints.video.mediaSource = preferredMediaSource;
      }
      return window.navigator.mediaDevices.getUserMedia(constraints);
    };
  }

  },{}],13:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimGetUserMedia = shimGetUserMedia;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimGetUserMedia(window) {
    var browserDetails = utils.detectBrowser(window);
    var navigator = window && window.navigator;
    var MediaStreamTrack = window && window.MediaStreamTrack;

    navigator.getUserMedia = function (constraints, onSuccess, onError) {
      // Replace Firefox 44+'s deprecation warning with unprefixed version.
      utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };

    if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
      var remap = function remap(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };

      var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (c) {
        if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
          remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeGetUserMedia(c);
      };

      if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
        var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
        MediaStreamTrack.prototype.getSettings = function () {
          var obj = nativeGetSettings.apply(this, arguments);
          remap(obj, 'mozAutoGainControl', 'autoGainControl');
          remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
          return obj;
        };
      }

      if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
        var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
        MediaStreamTrack.prototype.applyConstraints = function (c) {
          if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c, 'autoGainControl', 'mozAutoGainControl');
            remap(c, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeApplyConstraints.apply(this, [c]);
        };
      }
    }
  }

  },{"../utils":15}],14:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
  exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
  exports.shimCallbacksAPI = shimCallbacksAPI;
  exports.shimGetUserMedia = shimGetUserMedia;
  exports.shimConstraints = shimConstraints;
  exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
  exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
  exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

  var _utils = require('../utils');

  var utils = _interopRequireWildcard(_utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function shimLocalStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getLocalStreams = function () {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
      var _addTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addStream = function (stream) {
        var _this = this;

        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (!this._localStreams.includes(stream)) {
          this._localStreams.push(stream);
        }
        stream.getTracks().forEach(function (track) {
          return _addTrack.call(_this, track, stream);
        });
      };

      window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
        if (stream) {
          if (!this._localStreams) {
            this._localStreams = [stream];
          } else if (!this._localStreams.includes(stream)) {
            this._localStreams.push(stream);
          }
        }
        return _addTrack.call(this, track, stream);
      };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.removeStream = function (stream) {
        var _this2 = this;

        if (!this._localStreams) {
          this._localStreams = [];
        }
        var index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        var tracks = stream.getTracks();
        this.getSenders().forEach(function (sender) {
          if (tracks.includes(sender.track)) {
            _this2.removeTrack(sender);
          }
        });
      };
    }
  }

  function shimRemoteStreamsAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
        get: function get() {
          return this._onaddstream;
        },
        set: function set(f) {
          var _this3 = this;

          if (this._onaddstream) {
            this.removeEventListener('addstream', this._onaddstream);
            this.removeEventListener('track', this._onaddstreampoly);
          }
          this.addEventListener('addstream', this._onaddstream = f);
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            e.streams.forEach(function (stream) {
              if (!_this3._remoteStreams) {
                _this3._remoteStreams = [];
              }
              if (_this3._remoteStreams.includes(stream)) {
                return;
              }
              _this3._remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              _this3.dispatchEvent(event);
            });
          });
        }
      });
      var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function () {
        var pc = this;
        if (!this._onaddstreampoly) {
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            e.streams.forEach(function (stream) {
              if (!pc._remoteStreams) {
                pc._remoteStreams = [];
              }
              if (pc._remoteStreams.indexOf(stream) >= 0) {
                return;
              }
              pc._remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              pc.dispatchEvent(event);
            });
          });
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  }

  function shimCallbacksAPI(window) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    var prototype = window.RTCPeerConnection.prototype;
    var createOffer = prototype.createOffer;
    var createAnswer = prototype.createAnswer;
    var setLocalDescription = prototype.setLocalDescription;
    var setRemoteDescription = prototype.setRemoteDescription;
    var addIceCandidate = prototype.addIceCandidate;

    prototype.createOffer = function (successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = createOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    prototype.createAnswer = function (successCallback, failureCallback) {
      var options = arguments.length >= 2 ? arguments[2] : arguments[0];
      var promise = createAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    var withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;

    withCallback = function withCallback(description, successCallback, failureCallback) {
      var promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;

    withCallback = function withCallback(candidate, successCallback, failureCallback) {
      var promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  }

  function shimGetUserMedia(window) {
    var navigator = window && window.navigator;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // shim not needed in Safari 12.1
      var mediaDevices = navigator.mediaDevices;
      var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
      navigator.mediaDevices.getUserMedia = function (constraints) {
        return _getUserMedia(shimConstraints(constraints));
      };
    }

    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = function (constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
      }.bind(navigator);
    }
  }

  function shimConstraints(constraints) {
    if (constraints && constraints.video !== undefined) {
      return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
    }

    return constraints;
  }

  function shimRTCIceServerUrls(window) {
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    var OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function (pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in window.RTCPeerConnection) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  }

  function shimTrackEventTransceiver(window) {
    // Add event.transceiver member over deprecated event.receiver
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype &&
    // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
    // defined for some reason even when window.RTCTransceiver is not.
    !window.RTCTransceiver) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function get() {
          return { receiver: this.receiver };
        }
      });
    }
  }

  function shimCreateOfferLegacy(window) {
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
      if (offerOptions) {
        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
        }
        var audioTransceiver = this.getTransceivers().find(function (transceiver) {
          return transceiver.receiver.track.kind === 'audio';
        });
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === 'sendrecv') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('sendonly');
            } else {
              audioTransceiver.direction = 'sendonly';
            }
          } else if (audioTransceiver.direction === 'recvonly') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('inactive');
            } else {
              audioTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
          this.addTransceiver('audio');
        }

        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
        }
        var videoTransceiver = this.getTransceivers().find(function (transceiver) {
          return transceiver.receiver.track.kind === 'video';
        });
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === 'sendrecv') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('sendonly');
            } else {
              videoTransceiver.direction = 'sendonly';
            }
          } else if (videoTransceiver.direction === 'recvonly') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('inactive');
            } else {
              videoTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
          this.addTransceiver('video');
        }
      }
      return origCreateOffer.apply(this, arguments);
    };
  }

  },{"../utils":15}],15:[function(require,module,exports){
  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.extractVersion = extractVersion;
  exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
  exports.disableLog = disableLog;
  exports.disableWarnings = disableWarnings;
  exports.log = log;
  exports.deprecated = deprecated;
  exports.detectBrowser = detectBrowser;
  exports.compactObject = compactObject;
  exports.walkStats = walkStats;
  exports.filterStats = filterStats;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var logDisabled_ = true;
  var deprecationWarnings_ = true;

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  function extractVersion(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  }

  // Wraps the peerconnection event eventNameToWrap in a function
  // which returns the modified event object (or false to prevent
  // the event).
  function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
    if (!window.RTCPeerConnection) {
      return;
    }
    var proto = window.RTCPeerConnection.prototype;
    var nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap) {
        return nativeAddEventListener.apply(this, arguments);
      }
      var wrappedCallback = function wrappedCallback(e) {
        var modifiedEvent = wrapper(e);
        if (modifiedEvent) {
          cb(modifiedEvent);
        }
      };
      this._eventMap = this._eventMap || {};
      this._eventMap[cb] = wrappedCallback;
      return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
    };

    var nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      var unwrappedCb = this._eventMap[cb];
      delete this._eventMap[cb];
      return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
    };

    Object.defineProperty(proto, 'on' + eventNameToWrap, {
      get: function get() {
        return this['_on' + eventNameToWrap];
      },
      set: function set(cb) {
        if (this['_on' + eventNameToWrap]) {
          this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
          delete this['_on' + eventNameToWrap];
        }
        if (cb) {
          this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
        }
      },

      enumerable: true,
      configurable: true
    });
  }

  function disableLog(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
  }

  /**
   * Disable or enable deprecation warnings
   * @param {!boolean} bool set to true to disable warnings.
   */
  function disableWarnings(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
    }
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
  }

  function log() {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  }

  /**
   * Shows a deprecation warning suggesting the modern and spec-compatible API.
   */
  function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
  }

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  function detectBrowser(window) {
    var navigator = window.navigator;

    // Returned result object.

    var result = { browser: null, version: null };

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
      result.browser = 'Not a browser.';
      return result;
    }

    if (navigator.mozGetUserMedia) {
      // Firefox.
      result.browser = 'firefox';
      result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
      // Chrome, Chromium, Webview, Opera.
      // Version matches Chrome/WebRTC version.
      // Chrome 74 removed webkitGetUserMedia on http as well so we need the
      // more complicated fallback to webkitRTCPeerConnection.
      result.browser = 'chrome';
      result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
      // Edge.
      result.browser = 'edge';
      result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
      // Safari.
      result.browser = 'safari';
      result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    } else {
      // Default fallthrough: not supported.
      result.browser = 'Not a supported browser.';
      return result;
    }

    return result;
  }

  /**
   * Remove all empty objects and undefined values
   * from a nested object -- an enhanced and vanilla version
   * of Lodash's `compact`.
   */
  function compactObject(data) {
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
      return data;
    }

    return Object.keys(data).reduce(function (accumulator, key) {
      var isObject = _typeof(data[key]) === 'object';
      var value = isObject ? compactObject(data[key]) : data[key];
      var isEmptyObject = isObject && !Object.keys(value).length;
      if (value === undefined || isEmptyObject) {
        return accumulator;
      }

      return Object.assign(accumulator, _defineProperty({}, key, value));
    }, {});
  }

  /* iterates the stats graph recursively. */
  function walkStats(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) {
      return;
    }
    resultSet.set(base.id, base);
    Object.keys(base).forEach(function (name) {
      if (name.endsWith('Id')) {
        walkStats(stats, stats.get(base[name]), resultSet);
      } else if (name.endsWith('Ids')) {
        base[name].forEach(function (id) {
          walkStats(stats, stats.get(id), resultSet);
        });
      }
    });
  }

  /* filter getStats for a sender/receiver track. */
  function filterStats(result, track, outbound) {
    var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
    var filteredResult = new Map();
    if (track === null) {
      return filteredResult;
    }
    var trackStats = [];
    result.forEach(function (value) {
      if (value.type === 'track' && value.trackIdentifier === track.id) {
        trackStats.push(value);
      }
    });
    trackStats.forEach(function (trackStat) {
      result.forEach(function (stats) {
        if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
          walkStats(result, stats, filteredResult);
        }
      });
    });
    return filteredResult;
  }

  },{}],16:[function(require,module,exports){
  /*
   *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
   /* eslint-env node */
  'use strict';

  var SDPUtils = require('sdp');

  function fixStatsType(stat) {
    return {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    }[stat.type] || stat.type;
  }

  function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : dtlsRole || 'active');

    sdp += 'a=mid:' + transceiver.mid + '\r\n';

    if (transceiver.rtpSender && transceiver.rtpReceiver) {
      sdp += 'a=sendrecv\r\n';
    } else if (transceiver.rtpSender) {
      sdp += 'a=sendonly\r\n';
    } else if (transceiver.rtpReceiver) {
      sdp += 'a=recvonly\r\n';
    } else {
      sdp += 'a=inactive\r\n';
    }

    if (transceiver.rtpSender) {
      var trackId = transceiver.rtpSender._initialTrackId ||
          transceiver.rtpSender.track.id;
      transceiver.rtpSender._initialTrackId = trackId;
      // spec.
      var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
          trackId + '\r\n';
      sdp += 'a=' + msid;
      // for Chrome. Legacy should no longer be required.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;

      // RTX
      if (transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
        sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
      }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
    }
    return sdp;
  }

  // Edge does not like
  // 1) stun: filtered after 14393 unless ?transport=udp is present
  // 2) turn: that does not have all of turn:host:port?transport=udp
  // 3) turn: with ipv6 addresses
  // 4) turn: occurring muliple times
  function filterIceServers(iceServers, edgeVersion) {
    var hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter(function(server) {
      if (server && (server.urls || server.url)) {
        var urls = server.urls || server.url;
        if (server.url && !server.urls) {
          console.warn('RTCIceServer.url is deprecated! Use urls instead.');
        }
        var isString = typeof urls === 'string';
        if (isString) {
          urls = [urls];
        }
        urls = urls.filter(function(url) {
          var validTurn = url.indexOf('turn:') === 0 &&
              url.indexOf('transport=udp') !== -1 &&
              url.indexOf('turn:[') === -1 &&
              !hasTurn;

          if (validTurn) {
            hasTurn = true;
            return true;
          }
          return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
              url.indexOf('?transport=udp') === -1;
        });

        delete server.url;
        server.urls = isString ? urls[0] : urls;
        return !!urls.length;
      }
    });
  }

  // Determines the intersection of local and remote capabilities.
  function getCommonCapabilities(localCapabilities, remoteCapabilities) {
    var commonCapabilities = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: []
    };

    var findCodecByPayloadType = function(pt, codecs) {
      pt = parseInt(pt, 10);
      for (var i = 0; i < codecs.length; i++) {
        if (codecs[i].payloadType === pt ||
            codecs[i].preferredPayloadType === pt) {
          return codecs[i];
        }
      }
    };

    var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
      var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
      var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
      return lCodec && rCodec &&
          lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
    };

    localCapabilities.codecs.forEach(function(lCodec) {
      for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
        var rCodec = remoteCapabilities.codecs[i];
        if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
            lCodec.clockRate === rCodec.clockRate) {
          if (lCodec.name.toLowerCase() === 'rtx' &&
              lCodec.parameters && rCodec.parameters.apt) {
            // for RTX we need to find the local rtx that has a apt
            // which points to the same local codec as the remote one.
            if (!rtxCapabilityMatches(lCodec, rCodec,
                localCapabilities.codecs, remoteCapabilities.codecs)) {
              continue;
            }
          }
          rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
          // number of channels is the highest common number of channels
          rCodec.numChannels = Math.min(lCodec.numChannels,
              rCodec.numChannels);
          // push rCodec so we reply with offerer payload type
          commonCapabilities.codecs.push(rCodec);

          // determine common feedback mechanisms
          rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
            for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
              if (lCodec.rtcpFeedback[j].type === fb.type &&
                  lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                return true;
              }
            }
            return false;
          });
          // FIXME: also need to determine .parameters
          //  see https://github.com/openpeer/ortc/issues/569
          break;
        }
      }
    });

    localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
      for (var i = 0; i < remoteCapabilities.headerExtensions.length;
           i++) {
        var rHeaderExtension = remoteCapabilities.headerExtensions[i];
        if (lHeaderExtension.uri === rHeaderExtension.uri) {
          commonCapabilities.headerExtensions.push(rHeaderExtension);
          break;
        }
      }
    });

    // FIXME: fecMechanisms
    return commonCapabilities;
  }

  // is action=setLocalDescription with type allowed in signalingState
  function isActionAllowedInSignalingState(action, type, signalingState) {
    return {
      offer: {
        setLocalDescription: ['stable', 'have-local-offer'],
        setRemoteDescription: ['stable', 'have-remote-offer']
      },
      answer: {
        setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
        setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
      }
    }[type][action].indexOf(signalingState) !== -1;
  }

  function maybeAddCandidate(iceTransport, candidate) {
    // Edge's internal representation adds some fields therefore
    // not all fieldѕ are taken into account.
    var alreadyAdded = iceTransport.getRemoteCandidates()
        .find(function(remoteCandidate) {
          return candidate.foundation === remoteCandidate.foundation &&
              candidate.ip === remoteCandidate.ip &&
              candidate.port === remoteCandidate.port &&
              candidate.priority === remoteCandidate.priority &&
              candidate.protocol === remoteCandidate.protocol &&
              candidate.type === remoteCandidate.type;
        });
    if (!alreadyAdded) {
      iceTransport.addRemoteCandidate(candidate);
    }
    return !alreadyAdded;
  }


  function makeError(name, description) {
    var e = new Error(description);
    e.name = name;
    // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
    e.code = {
      NotSupportedError: 9,
      InvalidStateError: 11,
      InvalidAccessError: 15,
      TypeError: undefined,
      OperationError: undefined
    }[name];
    return e;
  }

  module.exports = function(window, edgeVersion) {
    // https://w3c.github.io/mediacapture-main/#mediastream
    // Helper function to add the track to the stream and
    // dispatch the event ourselves.
    function addTrackToStreamAndFireEvent(track, stream) {
      stream.addTrack(track);
      stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
          {track: track}));
    }

    function removeTrackFromStreamAndFireEvent(track, stream) {
      stream.removeTrack(track);
      stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
          {track: track}));
    }

    function fireAddTrack(pc, track, receiver, streams) {
      var trackEvent = new Event('track');
      trackEvent.track = track;
      trackEvent.receiver = receiver;
      trackEvent.transceiver = {receiver: receiver};
      trackEvent.streams = streams;
      window.setTimeout(function() {
        pc._dispatchEvent('track', trackEvent);
      });
    }

    var RTCPeerConnection = function(config) {
      var pc = this;

      var _eventTarget = document.createDocumentFragment();
      ['addEventListener', 'removeEventListener', 'dispatchEvent']
          .forEach(function(method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
          });

      this.canTrickleIceCandidates = null;

      this.needNegotiation = false;

      this.localStreams = [];
      this.remoteStreams = [];

      this._localDescription = null;
      this._remoteDescription = null;

      this.signalingState = 'stable';
      this.iceConnectionState = 'new';
      this.connectionState = 'new';
      this.iceGatheringState = 'new';

      config = JSON.parse(JSON.stringify(config || {}));

      this.usingBundle = config.bundlePolicy === 'max-bundle';
      if (config.rtcpMuxPolicy === 'negotiate') {
        throw(makeError('NotSupportedError',
            'rtcpMuxPolicy \'negotiate\' is not supported'));
      } else if (!config.rtcpMuxPolicy) {
        config.rtcpMuxPolicy = 'require';
      }

      switch (config.iceTransportPolicy) {
        case 'all':
        case 'relay':
          break;
        default:
          config.iceTransportPolicy = 'all';
          break;
      }

      switch (config.bundlePolicy) {
        case 'balanced':
        case 'max-compat':
        case 'max-bundle':
          break;
        default:
          config.bundlePolicy = 'balanced';
          break;
      }

      config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

      this._iceGatherers = [];
      if (config.iceCandidatePoolSize) {
        for (var i = config.iceCandidatePoolSize; i > 0; i--) {
          this._iceGatherers.push(new window.RTCIceGatherer({
            iceServers: config.iceServers,
            gatherPolicy: config.iceTransportPolicy
          }));
        }
      } else {
        config.iceCandidatePoolSize = 0;
      }

      this._config = config;

      // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
      // everything that is needed to describe a SDP m-line.
      this.transceivers = [];

      this._sdpSessionId = SDPUtils.generateSessionId();
      this._sdpSessionVersion = 0;

      this._dtlsRole = undefined; // role for a=setup to use in answers.

      this._isClosed = false;
    };

    Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
      configurable: true,
      get: function() {
        return this._localDescription;
      }
    });
    Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
      configurable: true,
      get: function() {
        return this._remoteDescription;
      }
    });

    // set up event handlers on prototype
    RTCPeerConnection.prototype.onicecandidate = null;
    RTCPeerConnection.prototype.onaddstream = null;
    RTCPeerConnection.prototype.ontrack = null;
    RTCPeerConnection.prototype.onremovestream = null;
    RTCPeerConnection.prototype.onsignalingstatechange = null;
    RTCPeerConnection.prototype.oniceconnectionstatechange = null;
    RTCPeerConnection.prototype.onconnectionstatechange = null;
    RTCPeerConnection.prototype.onicegatheringstatechange = null;
    RTCPeerConnection.prototype.onnegotiationneeded = null;
    RTCPeerConnection.prototype.ondatachannel = null;

    RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
      if (this._isClosed) {
        return;
      }
      this.dispatchEvent(event);
      if (typeof this['on' + name] === 'function') {
        this['on' + name](event);
      }
    };

    RTCPeerConnection.prototype._emitGatheringStateChange = function() {
      var event = new Event('icegatheringstatechange');
      this._dispatchEvent('icegatheringstatechange', event);
    };

    RTCPeerConnection.prototype.getConfiguration = function() {
      return this._config;
    };

    RTCPeerConnection.prototype.getLocalStreams = function() {
      return this.localStreams;
    };

    RTCPeerConnection.prototype.getRemoteStreams = function() {
      return this.remoteStreams;
    };

    // internal helper to create a transceiver object.
    // (which is not yet the same as the WebRTC 1.0 transceiver)
    RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
      var hasBundleTransport = this.transceivers.length > 0;
      var transceiver = {
        track: null,
        iceGatherer: null,
        iceTransport: null,
        dtlsTransport: null,
        localCapabilities: null,
        remoteCapabilities: null,
        rtpSender: null,
        rtpReceiver: null,
        kind: kind,
        mid: null,
        sendEncodingParameters: null,
        recvEncodingParameters: null,
        stream: null,
        associatedRemoteMediaStreams: [],
        wantReceive: true
      };
      if (this.usingBundle && hasBundleTransport) {
        transceiver.iceTransport = this.transceivers[0].iceTransport;
        transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
      } else {
        var transports = this._createIceAndDtlsTransports();
        transceiver.iceTransport = transports.iceTransport;
        transceiver.dtlsTransport = transports.dtlsTransport;
      }
      if (!doNotAdd) {
        this.transceivers.push(transceiver);
      }
      return transceiver;
    };

    RTCPeerConnection.prototype.addTrack = function(track, stream) {
      if (this._isClosed) {
        throw makeError('InvalidStateError',
            'Attempted to call addTrack on a closed peerconnection.');
      }

      var alreadyExists = this.transceivers.find(function(s) {
        return s.track === track;
      });

      if (alreadyExists) {
        throw makeError('InvalidAccessError', 'Track already exists.');
      }

      var transceiver;
      for (var i = 0; i < this.transceivers.length; i++) {
        if (!this.transceivers[i].track &&
            this.transceivers[i].kind === track.kind) {
          transceiver = this.transceivers[i];
        }
      }
      if (!transceiver) {
        transceiver = this._createTransceiver(track.kind);
      }

      this._maybeFireNegotiationNeeded();

      if (this.localStreams.indexOf(stream) === -1) {
        this.localStreams.push(stream);
      }

      transceiver.track = track;
      transceiver.stream = stream;
      transceiver.rtpSender = new window.RTCRtpSender(track,
          transceiver.dtlsTransport);
      return transceiver.rtpSender;
    };

    RTCPeerConnection.prototype.addStream = function(stream) {
      var pc = this;
      if (edgeVersion >= 15025) {
        stream.getTracks().forEach(function(track) {
          pc.addTrack(track, stream);
        });
      } else {
        // Clone is necessary for local demos mostly, attaching directly
        // to two different senders does not work (build 10547).
        // Fixed in 15025 (or earlier)
        var clonedStream = stream.clone();
        stream.getTracks().forEach(function(track, idx) {
          var clonedTrack = clonedStream.getTracks()[idx];
          track.addEventListener('enabled', function(event) {
            clonedTrack.enabled = event.enabled;
          });
        });
        clonedStream.getTracks().forEach(function(track) {
          pc.addTrack(track, clonedStream);
        });
      }
    };

    RTCPeerConnection.prototype.removeTrack = function(sender) {
      if (this._isClosed) {
        throw makeError('InvalidStateError',
            'Attempted to call removeTrack on a closed peerconnection.');
      }

      if (!(sender instanceof window.RTCRtpSender)) {
        throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
            'does not implement interface RTCRtpSender.');
      }

      var transceiver = this.transceivers.find(function(t) {
        return t.rtpSender === sender;
      });

      if (!transceiver) {
        throw makeError('InvalidAccessError',
            'Sender was not created by this connection.');
      }
      var stream = transceiver.stream;

      transceiver.rtpSender.stop();
      transceiver.rtpSender = null;
      transceiver.track = null;
      transceiver.stream = null;

      // remove the stream from the set of local streams
      var localStreams = this.transceivers.map(function(t) {
        return t.stream;
      });
      if (localStreams.indexOf(stream) === -1 &&
          this.localStreams.indexOf(stream) > -1) {
        this.localStreams.splice(this.localStreams.indexOf(stream), 1);
      }

      this._maybeFireNegotiationNeeded();
    };

    RTCPeerConnection.prototype.removeStream = function(stream) {
      var pc = this;
      stream.getTracks().forEach(function(track) {
        var sender = pc.getSenders().find(function(s) {
          return s.track === track;
        });
        if (sender) {
          pc.removeTrack(sender);
        }
      });
    };

    RTCPeerConnection.prototype.getSenders = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpSender;
      })
      .map(function(transceiver) {
        return transceiver.rtpSender;
      });
    };

    RTCPeerConnection.prototype.getReceivers = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpReceiver;
      })
      .map(function(transceiver) {
        return transceiver.rtpReceiver;
      });
    };


    RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
        usingBundle) {
      var pc = this;
      if (usingBundle && sdpMLineIndex > 0) {
        return this.transceivers[0].iceGatherer;
      } else if (this._iceGatherers.length) {
        return this._iceGatherers.shift();
      }
      var iceGatherer = new window.RTCIceGatherer({
        iceServers: this._config.iceServers,
        gatherPolicy: this._config.iceTransportPolicy
      });
      Object.defineProperty(iceGatherer, 'state',
          {value: 'new', writable: true}
      );

      this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
      this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
        var end = !event.candidate || Object.keys(event.candidate).length === 0;
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        iceGatherer.state = end ? 'completed' : 'gathering';
        if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
          pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
        }
      };
      iceGatherer.addEventListener('localcandidate',
        this.transceivers[sdpMLineIndex].bufferCandidates);
      return iceGatherer;
    };

    // start gathering from an RTCIceGatherer.
    RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
      var pc = this;
      var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
      if (iceGatherer.onlocalcandidate) {
        return;
      }
      var bufferedCandidateEvents =
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
      this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
      iceGatherer.removeEventListener('localcandidate',
        this.transceivers[sdpMLineIndex].bufferCandidates);
      iceGatherer.onlocalcandidate = function(evt) {
        if (pc.usingBundle && sdpMLineIndex > 0) {
          // if we know that we use bundle we can drop candidates with
          // ѕdpMLineIndex > 0. If we don't do this then our state gets
          // confused since we dispose the extra ice gatherer.
          return;
        }
        var event = new Event('icecandidate');
        event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

        var cand = evt.candidate;
        // Edge emits an empty object for RTCIceCandidateComplete‥
        var end = !cand || Object.keys(cand).length === 0;
        if (end) {
          // polyfill since RTCIceGatherer.state is not implemented in
          // Edge 10547 yet.
          if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
            iceGatherer.state = 'completed';
          }
        } else {
          if (iceGatherer.state === 'new') {
            iceGatherer.state = 'gathering';
          }
          // RTCIceCandidate doesn't have a component, needs to be added
          cand.component = 1;
          // also the usernameFragment. TODO: update SDP to take both variants.
          cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

          var serializedCandidate = SDPUtils.writeCandidate(cand);
          event.candidate = Object.assign(event.candidate,
              SDPUtils.parseCandidate(serializedCandidate));

          event.candidate.candidate = serializedCandidate;
          event.candidate.toJSON = function() {
            return {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid,
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              usernameFragment: event.candidate.usernameFragment
            };
          };
        }

        // update local description.
        var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
        if (!end) {
          sections[event.candidate.sdpMLineIndex] +=
              'a=' + event.candidate.candidate + '\r\n';
        } else {
          sections[event.candidate.sdpMLineIndex] +=
              'a=end-of-candidates\r\n';
        }
        pc._localDescription.sdp =
            SDPUtils.getDescription(pc._localDescription.sdp) +
            sections.join('');
        var complete = pc.transceivers.every(function(transceiver) {
          return transceiver.iceGatherer &&
              transceiver.iceGatherer.state === 'completed';
        });

        if (pc.iceGatheringState !== 'gathering') {
          pc.iceGatheringState = 'gathering';
          pc._emitGatheringStateChange();
        }

        // Emit candidate. Also emit null candidate when all gatherers are
        // complete.
        if (!end) {
          pc._dispatchEvent('icecandidate', event);
        }
        if (complete) {
          pc._dispatchEvent('icecandidate', new Event('icecandidate'));
          pc.iceGatheringState = 'complete';
          pc._emitGatheringStateChange();
        }
      };

      // emit already gathered candidates.
      window.setTimeout(function() {
        bufferedCandidateEvents.forEach(function(e) {
          iceGatherer.onlocalcandidate(e);
        });
      }, 0);
    };

    // Create ICE transport and DTLS transport.
    RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
      var pc = this;
      var iceTransport = new window.RTCIceTransport(null);
      iceTransport.onicestatechange = function() {
        pc._updateIceConnectionState();
        pc._updateConnectionState();
      };

      var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
      dtlsTransport.ondtlsstatechange = function() {
        pc._updateConnectionState();
      };
      dtlsTransport.onerror = function() {
        // onerror does not set state to failed by itself.
        Object.defineProperty(dtlsTransport, 'state',
            {value: 'failed', writable: true});
        pc._updateConnectionState();
      };

      return {
        iceTransport: iceTransport,
        dtlsTransport: dtlsTransport
      };
    };

    // Destroy ICE gatherer, ICE transport and DTLS transport.
    // Without triggering the callbacks.
    RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
        sdpMLineIndex) {
      var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
      if (iceGatherer) {
        delete iceGatherer.onlocalcandidate;
        delete this.transceivers[sdpMLineIndex].iceGatherer;
      }
      var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
      if (iceTransport) {
        delete iceTransport.onicestatechange;
        delete this.transceivers[sdpMLineIndex].iceTransport;
      }
      var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
      if (dtlsTransport) {
        delete dtlsTransport.ondtlsstatechange;
        delete dtlsTransport.onerror;
        delete this.transceivers[sdpMLineIndex].dtlsTransport;
      }
    };

    // Start the RTP Sender and Receiver for a transceiver.
    RTCPeerConnection.prototype._transceive = function(transceiver,
        send, recv) {
      var params = getCommonCapabilities(transceiver.localCapabilities,
          transceiver.remoteCapabilities);
      if (send && transceiver.rtpSender) {
        params.encodings = transceiver.sendEncodingParameters;
        params.rtcp = {
          cname: SDPUtils.localCName,
          compound: transceiver.rtcpParameters.compound
        };
        if (transceiver.recvEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
        }
        transceiver.rtpSender.send(params);
      }
      if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
        // remove RTX field in Edge 14942
        if (transceiver.kind === 'video'
            && transceiver.recvEncodingParameters
            && edgeVersion < 15019) {
          transceiver.recvEncodingParameters.forEach(function(p) {
            delete p.rtx;
          });
        }
        if (transceiver.recvEncodingParameters.length) {
          params.encodings = transceiver.recvEncodingParameters;
        } else {
          params.encodings = [{}];
        }
        params.rtcp = {
          compound: transceiver.rtcpParameters.compound
        };
        if (transceiver.rtcpParameters.cname) {
          params.rtcp.cname = transceiver.rtcpParameters.cname;
        }
        if (transceiver.sendEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
        }
        transceiver.rtpReceiver.receive(params);
      }
    };

    RTCPeerConnection.prototype.setLocalDescription = function(description) {
      var pc = this;

      // Note: pranswer is not supported.
      if (['offer', 'answer'].indexOf(description.type) === -1) {
        return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
      }

      if (!isActionAllowedInSignalingState('setLocalDescription',
          description.type, pc.signalingState) || pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not set local ' + description.type +
            ' in state ' + pc.signalingState));
      }

      var sections;
      var sessionpart;
      if (description.type === 'offer') {
        // VERY limited support for SDP munging. Limited to:
        // * changing the order of codecs
        sections = SDPUtils.splitSections(description.sdp);
        sessionpart = sections.shift();
        sections.forEach(function(mediaSection, sdpMLineIndex) {
          var caps = SDPUtils.parseRtpParameters(mediaSection);
          pc.transceivers[sdpMLineIndex].localCapabilities = caps;
        });

        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          pc._gather(transceiver.mid, sdpMLineIndex);
        });
      } else if (description.type === 'answer') {
        sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
        sessionpart = sections.shift();
        var isIceLite = SDPUtils.matchPrefix(sessionpart,
            'a=ice-lite').length > 0;
        sections.forEach(function(mediaSection, sdpMLineIndex) {
          var transceiver = pc.transceivers[sdpMLineIndex];
          var iceGatherer = transceiver.iceGatherer;
          var iceTransport = transceiver.iceTransport;
          var dtlsTransport = transceiver.dtlsTransport;
          var localCapabilities = transceiver.localCapabilities;
          var remoteCapabilities = transceiver.remoteCapabilities;

          // treat bundle-only as not-rejected.
          var rejected = SDPUtils.isRejected(mediaSection) &&
              SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

          if (!rejected && !transceiver.rejected) {
            var remoteIceParameters = SDPUtils.getIceParameters(
                mediaSection, sessionpart);
            var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                mediaSection, sessionpart);
            if (isIceLite) {
              remoteDtlsParameters.role = 'server';
            }

            if (!pc.usingBundle || sdpMLineIndex === 0) {
              pc._gather(transceiver.mid, sdpMLineIndex);
              if (iceTransport.state === 'new') {
                iceTransport.start(iceGatherer, remoteIceParameters,
                    isIceLite ? 'controlling' : 'controlled');
              }
              if (dtlsTransport.state === 'new') {
                dtlsTransport.start(remoteDtlsParameters);
              }
            }

            // Calculate intersection of capabilities.
            var params = getCommonCapabilities(localCapabilities,
                remoteCapabilities);

            // Start the RTCRtpSender. The RTCRtpReceiver for this
            // transceiver has already been started in setRemoteDescription.
            pc._transceive(transceiver,
                params.codecs.length > 0,
                false);
          }
        });
      }

      pc._localDescription = {
        type: description.type,
        sdp: description.sdp
      };
      if (description.type === 'offer') {
        pc._updateSignalingState('have-local-offer');
      } else {
        pc._updateSignalingState('stable');
      }

      return Promise.resolve();
    };

    RTCPeerConnection.prototype.setRemoteDescription = function(description) {
      var pc = this;

      // Note: pranswer is not supported.
      if (['offer', 'answer'].indexOf(description.type) === -1) {
        return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
      }

      if (!isActionAllowedInSignalingState('setRemoteDescription',
          description.type, pc.signalingState) || pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not set remote ' + description.type +
            ' in state ' + pc.signalingState));
      }

      var streams = {};
      pc.remoteStreams.forEach(function(stream) {
        streams[stream.id] = stream;
      });
      var receiverList = [];
      var sections = SDPUtils.splitSections(description.sdp);
      var sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart,
          'a=ice-lite').length > 0;
      var usingBundle = SDPUtils.matchPrefix(sessionpart,
          'a=group:BUNDLE ').length > 0;
      pc.usingBundle = usingBundle;
      var iceOptions = SDPUtils.matchPrefix(sessionpart,
          'a=ice-options:')[0];
      if (iceOptions) {
        pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
            .indexOf('trickle') >= 0;
      } else {
        pc.canTrickleIceCandidates = false;
      }

      sections.forEach(function(mediaSection, sdpMLineIndex) {
        var lines = SDPUtils.splitLines(mediaSection);
        var kind = SDPUtils.getKind(mediaSection);
        // treat bundle-only as not-rejected.
        var rejected = SDPUtils.isRejected(mediaSection) &&
            SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
        var protocol = lines[0].substr(2).split(' ')[2];

        var direction = SDPUtils.getDirection(mediaSection, sessionpart);
        var remoteMsid = SDPUtils.parseMsid(mediaSection);

        var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

        // Reject datachannels which are not implemented yet.
        if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
            protocol === 'UDP/DTLS/SCTP'))) {
          // TODO: this is dangerous in the case where a non-rejected m-line
          //     becomes rejected.
          pc.transceivers[sdpMLineIndex] = {
            mid: mid,
            kind: kind,
            protocol: protocol,
            rejected: true
          };
          return;
        }

        if (!rejected && pc.transceivers[sdpMLineIndex] &&
            pc.transceivers[sdpMLineIndex].rejected) {
          // recycle a rejected transceiver.
          pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
        }

        var transceiver;
        var iceGatherer;
        var iceTransport;
        var dtlsTransport;
        var rtpReceiver;
        var sendEncodingParameters;
        var recvEncodingParameters;
        var localCapabilities;

        var track;
        // FIXME: ensure the mediaSection has rtcp-mux set.
        var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
        var remoteIceParameters;
        var remoteDtlsParameters;
        if (!rejected) {
          remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
              sessionpart);
          remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
              sessionpart);
          remoteDtlsParameters.role = 'client';
        }
        recvEncodingParameters =
            SDPUtils.parseRtpEncodingParameters(mediaSection);

        var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

        var isComplete = SDPUtils.matchPrefix(mediaSection,
            'a=end-of-candidates', sessionpart).length > 0;
        var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
            .map(function(cand) {
              return SDPUtils.parseCandidate(cand);
            })
            .filter(function(cand) {
              return cand.component === 1;
            });

        // Check if we can use BUNDLE and dispose transports.
        if ((description.type === 'offer' || description.type === 'answer') &&
            !rejected && usingBundle && sdpMLineIndex > 0 &&
            pc.transceivers[sdpMLineIndex]) {
          pc._disposeIceAndDtlsTransports(sdpMLineIndex);
          pc.transceivers[sdpMLineIndex].iceGatherer =
              pc.transceivers[0].iceGatherer;
          pc.transceivers[sdpMLineIndex].iceTransport =
              pc.transceivers[0].iceTransport;
          pc.transceivers[sdpMLineIndex].dtlsTransport =
              pc.transceivers[0].dtlsTransport;
          if (pc.transceivers[sdpMLineIndex].rtpSender) {
            pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                pc.transceivers[0].dtlsTransport);
          }
          if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
            pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                pc.transceivers[0].dtlsTransport);
          }
        }
        if (description.type === 'offer' && !rejected) {
          transceiver = pc.transceivers[sdpMLineIndex] ||
              pc._createTransceiver(kind);
          transceiver.mid = mid;

          if (!transceiver.iceGatherer) {
            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                usingBundle);
          }

          if (cands.length && transceiver.iceTransport.state === 'new') {
            if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
              transceiver.iceTransport.setRemoteCandidates(cands);
            } else {
              cands.forEach(function(candidate) {
                maybeAddCandidate(transceiver.iceTransport, candidate);
              });
            }
          }

          localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

          // filter RTX until additional stuff needed for RTX is implemented
          // in adapter.js
          if (edgeVersion < 15019) {
            localCapabilities.codecs = localCapabilities.codecs.filter(
                function(codec) {
                  return codec.name !== 'rtx';
                });
          }

          sendEncodingParameters = transceiver.sendEncodingParameters || [{
            ssrc: (2 * sdpMLineIndex + 2) * 1001
          }];

          // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
          var isNewTrack = false;
          if (direction === 'sendrecv' || direction === 'sendonly') {
            isNewTrack = !transceiver.rtpReceiver;
            rtpReceiver = transceiver.rtpReceiver ||
                new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

            if (isNewTrack) {
              var stream;
              track = rtpReceiver.track;
              // FIXME: does not work with Plan B.
              if (remoteMsid && remoteMsid.stream === '-') {
                // no-op. a stream id of '-' means: no associated stream.
              } else if (remoteMsid) {
                if (!streams[remoteMsid.stream]) {
                  streams[remoteMsid.stream] = new window.MediaStream();
                  Object.defineProperty(streams[remoteMsid.stream], 'id', {
                    get: function() {
                      return remoteMsid.stream;
                    }
                  });
                }
                Object.defineProperty(track, 'id', {
                  get: function() {
                    return remoteMsid.track;
                  }
                });
                stream = streams[remoteMsid.stream];
              } else {
                if (!streams.default) {
                  streams.default = new window.MediaStream();
                }
                stream = streams.default;
              }
              if (stream) {
                addTrackToStreamAndFireEvent(track, stream);
                transceiver.associatedRemoteMediaStreams.push(stream);
              }
              receiverList.push([track, rtpReceiver, stream]);
            }
          } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
            transceiver.associatedRemoteMediaStreams.forEach(function(s) {
              var nativeTrack = s.getTracks().find(function(t) {
                return t.id === transceiver.rtpReceiver.track.id;
              });
              if (nativeTrack) {
                removeTrackFromStreamAndFireEvent(nativeTrack, s);
              }
            });
            transceiver.associatedRemoteMediaStreams = [];
          }

          transceiver.localCapabilities = localCapabilities;
          transceiver.remoteCapabilities = remoteCapabilities;
          transceiver.rtpReceiver = rtpReceiver;
          transceiver.rtcpParameters = rtcpParameters;
          transceiver.sendEncodingParameters = sendEncodingParameters;
          transceiver.recvEncodingParameters = recvEncodingParameters;

          // Start the RTCRtpReceiver now. The RTPSender is started in
          // setLocalDescription.
          pc._transceive(pc.transceivers[sdpMLineIndex],
              false,
              isNewTrack);
        } else if (description.type === 'answer' && !rejected) {
          transceiver = pc.transceivers[sdpMLineIndex];
          iceGatherer = transceiver.iceGatherer;
          iceTransport = transceiver.iceTransport;
          dtlsTransport = transceiver.dtlsTransport;
          rtpReceiver = transceiver.rtpReceiver;
          sendEncodingParameters = transceiver.sendEncodingParameters;
          localCapabilities = transceiver.localCapabilities;

          pc.transceivers[sdpMLineIndex].recvEncodingParameters =
              recvEncodingParameters;
          pc.transceivers[sdpMLineIndex].remoteCapabilities =
              remoteCapabilities;
          pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

          if (cands.length && iceTransport.state === 'new') {
            if ((isIceLite || isComplete) &&
                (!usingBundle || sdpMLineIndex === 0)) {
              iceTransport.setRemoteCandidates(cands);
            } else {
              cands.forEach(function(candidate) {
                maybeAddCandidate(transceiver.iceTransport, candidate);
              });
            }
          }

          if (!usingBundle || sdpMLineIndex === 0) {
            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters,
                  'controlling');
            }
            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          }

          // If the offer contained RTX but the answer did not,
          // remove RTX from sendEncodingParameters.
          var commonCapabilities = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

          var hasRtx = commonCapabilities.codecs.filter(function(c) {
            return c.name.toLowerCase() === 'rtx';
          }).length;
          if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
            delete transceiver.sendEncodingParameters[0].rtx;
          }

          pc._transceive(transceiver,
              direction === 'sendrecv' || direction === 'recvonly',
              direction === 'sendrecv' || direction === 'sendonly');

          // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
          if (rtpReceiver &&
              (direction === 'sendrecv' || direction === 'sendonly')) {
            track = rtpReceiver.track;
            if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
              }
              addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
              receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
            } else {
              if (!streams.default) {
                streams.default = new window.MediaStream();
              }
              addTrackToStreamAndFireEvent(track, streams.default);
              receiverList.push([track, rtpReceiver, streams.default]);
            }
          } else {
            // FIXME: actually the receiver should be created later.
            delete transceiver.rtpReceiver;
          }
        }
      });

      if (pc._dtlsRole === undefined) {
        pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
      }

      pc._remoteDescription = {
        type: description.type,
        sdp: description.sdp
      };
      if (description.type === 'offer') {
        pc._updateSignalingState('have-remote-offer');
      } else {
        pc._updateSignalingState('stable');
      }
      Object.keys(streams).forEach(function(sid) {
        var stream = streams[sid];
        if (stream.getTracks().length) {
          if (pc.remoteStreams.indexOf(stream) === -1) {
            pc.remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = stream;
            window.setTimeout(function() {
              pc._dispatchEvent('addstream', event);
            });
          }

          receiverList.forEach(function(item) {
            var track = item[0];
            var receiver = item[1];
            if (stream.id !== item[2].id) {
              return;
            }
            fireAddTrack(pc, track, receiver, [stream]);
          });
        }
      });
      receiverList.forEach(function(item) {
        if (item[2]) {
          return;
        }
        fireAddTrack(pc, item[0], item[1], []);
      });

      // check whether addIceCandidate({}) was called within four seconds after
      // setRemoteDescription.
      window.setTimeout(function() {
        if (!(pc && pc.transceivers)) {
          return;
        }
        pc.transceivers.forEach(function(transceiver) {
          if (transceiver.iceTransport &&
              transceiver.iceTransport.state === 'new' &&
              transceiver.iceTransport.getRemoteCandidates().length > 0) {
            console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                'an end-of-candidates notification');
            transceiver.iceTransport.addRemoteCandidate({});
          }
        });
      }, 4000);

      return Promise.resolve();
    };

    RTCPeerConnection.prototype.close = function() {
      this.transceivers.forEach(function(transceiver) {
        /* not yet
        if (transceiver.iceGatherer) {
          transceiver.iceGatherer.close();
        }
        */
        if (transceiver.iceTransport) {
          transceiver.iceTransport.stop();
        }
        if (transceiver.dtlsTransport) {
          transceiver.dtlsTransport.stop();
        }
        if (transceiver.rtpSender) {
          transceiver.rtpSender.stop();
        }
        if (transceiver.rtpReceiver) {
          transceiver.rtpReceiver.stop();
        }
      });
      // FIXME: clean up tracks, local streams, remote streams, etc
      this._isClosed = true;
      this._updateSignalingState('closed');
    };

    // Update the signaling state.
    RTCPeerConnection.prototype._updateSignalingState = function(newState) {
      this.signalingState = newState;
      var event = new Event('signalingstatechange');
      this._dispatchEvent('signalingstatechange', event);
    };

    // Determine whether to fire the negotiationneeded event.
    RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
      var pc = this;
      if (this.signalingState !== 'stable' || this.needNegotiation === true) {
        return;
      }
      this.needNegotiation = true;
      window.setTimeout(function() {
        if (pc.needNegotiation) {
          pc.needNegotiation = false;
          var event = new Event('negotiationneeded');
          pc._dispatchEvent('negotiationneeded', event);
        }
      }, 0);
    };

    // Update the ice connection state.
    RTCPeerConnection.prototype._updateIceConnectionState = function() {
      var newState;
      var states = {
        'new': 0,
        closed: 0,
        checking: 0,
        connected: 0,
        completed: 0,
        disconnected: 0,
        failed: 0
      };
      this.transceivers.forEach(function(transceiver) {
        if (transceiver.iceTransport && !transceiver.rejected) {
          states[transceiver.iceTransport.state]++;
        }
      });

      newState = 'new';
      if (states.failed > 0) {
        newState = 'failed';
      } else if (states.checking > 0) {
        newState = 'checking';
      } else if (states.disconnected > 0) {
        newState = 'disconnected';
      } else if (states.new > 0) {
        newState = 'new';
      } else if (states.connected > 0) {
        newState = 'connected';
      } else if (states.completed > 0) {
        newState = 'completed';
      }

      if (newState !== this.iceConnectionState) {
        this.iceConnectionState = newState;
        var event = new Event('iceconnectionstatechange');
        this._dispatchEvent('iceconnectionstatechange', event);
      }
    };

    // Update the connection state.
    RTCPeerConnection.prototype._updateConnectionState = function() {
      var newState;
      var states = {
        'new': 0,
        closed: 0,
        connecting: 0,
        connected: 0,
        completed: 0,
        disconnected: 0,
        failed: 0
      };
      this.transceivers.forEach(function(transceiver) {
        if (transceiver.iceTransport && transceiver.dtlsTransport &&
            !transceiver.rejected) {
          states[transceiver.iceTransport.state]++;
          states[transceiver.dtlsTransport.state]++;
        }
      });
      // ICETransport.completed and connected are the same for this purpose.
      states.connected += states.completed;

      newState = 'new';
      if (states.failed > 0) {
        newState = 'failed';
      } else if (states.connecting > 0) {
        newState = 'connecting';
      } else if (states.disconnected > 0) {
        newState = 'disconnected';
      } else if (states.new > 0) {
        newState = 'new';
      } else if (states.connected > 0) {
        newState = 'connected';
      }

      if (newState !== this.connectionState) {
        this.connectionState = newState;
        var event = new Event('connectionstatechange');
        this._dispatchEvent('connectionstatechange', event);
      }
    };

    RTCPeerConnection.prototype.createOffer = function() {
      var pc = this;

      if (pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createOffer after close'));
      }

      var numAudioTracks = pc.transceivers.filter(function(t) {
        return t.kind === 'audio';
      }).length;
      var numVideoTracks = pc.transceivers.filter(function(t) {
        return t.kind === 'video';
      }).length;

      // Determine number of audio and video tracks we need to send/recv.
      var offerOptions = arguments[0];
      if (offerOptions) {
        // Reject Chrome legacy constraints.
        if (offerOptions.mandatory || offerOptions.optional) {
          throw new TypeError(
              'Legacy mandatory/optional constraints not supported.');
        }
        if (offerOptions.offerToReceiveAudio !== undefined) {
          if (offerOptions.offerToReceiveAudio === true) {
            numAudioTracks = 1;
          } else if (offerOptions.offerToReceiveAudio === false) {
            numAudioTracks = 0;
          } else {
            numAudioTracks = offerOptions.offerToReceiveAudio;
          }
        }
        if (offerOptions.offerToReceiveVideo !== undefined) {
          if (offerOptions.offerToReceiveVideo === true) {
            numVideoTracks = 1;
          } else if (offerOptions.offerToReceiveVideo === false) {
            numVideoTracks = 0;
          } else {
            numVideoTracks = offerOptions.offerToReceiveVideo;
          }
        }
      }

      pc.transceivers.forEach(function(transceiver) {
        if (transceiver.kind === 'audio') {
          numAudioTracks--;
          if (numAudioTracks < 0) {
            transceiver.wantReceive = false;
          }
        } else if (transceiver.kind === 'video') {
          numVideoTracks--;
          if (numVideoTracks < 0) {
            transceiver.wantReceive = false;
          }
        }
      });

      // Create M-lines for recvonly streams.
      while (numAudioTracks > 0 || numVideoTracks > 0) {
        if (numAudioTracks > 0) {
          pc._createTransceiver('audio');
          numAudioTracks--;
        }
        if (numVideoTracks > 0) {
          pc._createTransceiver('video');
          numVideoTracks--;
        }
      }

      var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        // For each track, create an ice gatherer, ice transport,
        // dtls transport, potentially rtpsender and rtpreceiver.
        var track = transceiver.track;
        var kind = transceiver.kind;
        var mid = transceiver.mid || SDPUtils.generateIdentifier();
        transceiver.mid = mid;

        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
              pc.usingBundle);
        }

        var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
        // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js
        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(
              function(codec) {
                return codec.name !== 'rtx';
              });
        }
        localCapabilities.codecs.forEach(function(codec) {
          // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
          // by adding level-asymmetry-allowed=1
          if (codec.name === 'H264' &&
              codec.parameters['level-asymmetry-allowed'] === undefined) {
            codec.parameters['level-asymmetry-allowed'] = '1';
          }

          // for subsequent offers, we might have to re-use the payload
          // type of the last offer.
          if (transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.codecs) {
            transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
              if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                  codec.clockRate === remoteCodec.clockRate) {
                codec.preferredPayloadType = remoteCodec.payloadType;
              }
            });
          }
        });
        localCapabilities.headerExtensions.forEach(function(hdrExt) {
          var remoteExtensions = transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.headerExtensions || [];
          remoteExtensions.forEach(function(rHdrExt) {
            if (hdrExt.uri === rHdrExt.uri) {
              hdrExt.id = rHdrExt.id;
            }
          });
        });

        // generate an ssrc now, to be used later in rtpSender.send
        var sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 1) * 1001
        }];
        if (track) {
          // add RTX
          if (edgeVersion >= 15019 && kind === 'video' &&
              !sendEncodingParameters[0].rtx) {
            sendEncodingParameters[0].rtx = {
              ssrc: sendEncodingParameters[0].ssrc + 1
            };
          }
        }

        if (transceiver.wantReceive) {
          transceiver.rtpReceiver = new window.RTCRtpReceiver(
              transceiver.dtlsTransport, kind);
        }

        transceiver.localCapabilities = localCapabilities;
        transceiver.sendEncodingParameters = sendEncodingParameters;
      });

      // always offer BUNDLE and dispose on return if not supported.
      if (pc._config.bundlePolicy !== 'max-compat') {
        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      sdp += 'a=ice-options:trickle\r\n';

      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
            'offer', transceiver.stream, pc._dtlsRole);
        sdp += 'a=rtcp-rsize\r\n';

        if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
            (sdpMLineIndex === 0 || !pc.usingBundle)) {
          transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
            cand.component = 1;
            sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
          });

          if (transceiver.iceGatherer.state === 'completed') {
            sdp += 'a=end-of-candidates\r\n';
          }
        }
      });

      var desc = new window.RTCSessionDescription({
        type: 'offer',
        sdp: sdp
      });
      return Promise.resolve(desc);
    };

    RTCPeerConnection.prototype.createAnswer = function() {
      var pc = this;

      if (pc._isClosed) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer after close'));
      }

      if (!(pc.signalingState === 'have-remote-offer' ||
          pc.signalingState === 'have-local-pranswer')) {
        return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer in signalingState ' + pc.signalingState));
      }

      var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
      if (pc.usingBundle) {
        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      sdp += 'a=ice-options:trickle\r\n';

      var mediaSectionsInOffer = SDPUtils.getMediaSections(
          pc._remoteDescription.sdp).length;
      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
          return;
        }
        if (transceiver.rejected) {
          if (transceiver.kind === 'application') {
            if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
              sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
            } else {
              sdp += 'm=application 0 ' + transceiver.protocol +
                  ' webrtc-datachannel\r\n';
            }
          } else if (transceiver.kind === 'audio') {
            sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                'a=rtpmap:0 PCMU/8000\r\n';
          } else if (transceiver.kind === 'video') {
            sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                'a=rtpmap:120 VP8/90000\r\n';
          }
          sdp += 'c=IN IP4 0.0.0.0\r\n' +
              'a=inactive\r\n' +
              'a=mid:' + transceiver.mid + '\r\n';
          return;
        }

        // FIXME: look at direction.
        if (transceiver.stream) {
          var localTrack;
          if (transceiver.kind === 'audio') {
            localTrack = transceiver.stream.getAudioTracks()[0];
          } else if (transceiver.kind === 'video') {
            localTrack = transceiver.stream.getVideoTracks()[0];
          }
          if (localTrack) {
            // add RTX
            if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                !transceiver.sendEncodingParameters[0].rtx) {
              transceiver.sendEncodingParameters[0].rtx = {
                ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
              };
            }
          }
        }

        // Calculate intersection of capabilities.
        var commonCapabilities = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

        var hasRtx = commonCapabilities.codecs.filter(function(c) {
          return c.name.toLowerCase() === 'rtx';
        }).length;
        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
          delete transceiver.sendEncodingParameters[0].rtx;
        }

        sdp += writeMediaSection(transceiver, commonCapabilities,
            'answer', transceiver.stream, pc._dtlsRole);
        if (transceiver.rtcpParameters &&
            transceiver.rtcpParameters.reducedSize) {
          sdp += 'a=rtcp-rsize\r\n';
        }
      });

      var desc = new window.RTCSessionDescription({
        type: 'answer',
        sdp: sdp
      });
      return Promise.resolve(desc);
    };

    RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
      var pc = this;
      var sections;
      if (candidate && !(candidate.sdpMLineIndex !== undefined ||
          candidate.sdpMid)) {
        return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
      }

      // TODO: needs to go into ops queue.
      return new Promise(function(resolve, reject) {
        if (!pc._remoteDescription) {
          return reject(makeError('InvalidStateError',
              'Can not add ICE candidate without a remote description'));
        } else if (!candidate || candidate.candidate === '') {
          for (var j = 0; j < pc.transceivers.length; j++) {
            if (pc.transceivers[j].rejected) {
              continue;
            }
            pc.transceivers[j].iceTransport.addRemoteCandidate({});
            sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
            sections[j] += 'a=end-of-candidates\r\n';
            pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
            if (pc.usingBundle) {
              break;
            }
          }
        } else {
          var sdpMLineIndex = candidate.sdpMLineIndex;
          if (candidate.sdpMid) {
            for (var i = 0; i < pc.transceivers.length; i++) {
              if (pc.transceivers[i].mid === candidate.sdpMid) {
                sdpMLineIndex = i;
                break;
              }
            }
          }
          var transceiver = pc.transceivers[sdpMLineIndex];
          if (transceiver) {
            if (transceiver.rejected) {
              return resolve();
            }
            var cand = Object.keys(candidate.candidate).length > 0 ?
                SDPUtils.parseCandidate(candidate.candidate) : {};
            // Ignore Chrome's invalid candidates since Edge does not like them.
            if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
              return resolve();
            }
            // Ignore RTCP candidates, we assume RTCP-MUX.
            if (cand.component && cand.component !== 1) {
              return resolve();
            }
            // when using bundle, avoid adding candidates to the wrong
            // ice transport. And avoid adding candidates added in the SDP.
            if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
              if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                return reject(makeError('OperationError',
                    'Can not add ICE candidate'));
              }
            }

            // update the remoteDescription.
            var candidateString = candidate.candidate.trim();
            if (candidateString.indexOf('a=') === 0) {
              candidateString = candidateString.substr(2);
            }
            sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
            sections[sdpMLineIndex] += 'a=' +
                (cand.type ? candidateString : 'end-of-candidates')
                + '\r\n';
            pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
          } else {
            return reject(makeError('OperationError',
                'Can not add ICE candidate'));
          }
        }
        resolve();
      });
    };

    RTCPeerConnection.prototype.getStats = function(selector) {
      if (selector && selector instanceof window.MediaStreamTrack) {
        var senderOrReceiver = null;
        this.transceivers.forEach(function(transceiver) {
          if (transceiver.rtpSender &&
              transceiver.rtpSender.track === selector) {
            senderOrReceiver = transceiver.rtpSender;
          } else if (transceiver.rtpReceiver &&
              transceiver.rtpReceiver.track === selector) {
            senderOrReceiver = transceiver.rtpReceiver;
          }
        });
        if (!senderOrReceiver) {
          throw makeError('InvalidAccessError', 'Invalid selector.');
        }
        return senderOrReceiver.getStats();
      }

      var promises = [];
      this.transceivers.forEach(function(transceiver) {
        ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
            'dtlsTransport'].forEach(function(method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
      });
      return Promise.all(promises).then(function(allStats) {
        var results = new Map();
        allStats.forEach(function(stats) {
          stats.forEach(function(stat) {
            results.set(stat.id, stat);
          });
        });
        return results;
      });
    };

    // fix low-level stat names and return Map instead of object.
    var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
      'RTCIceTransport', 'RTCDtlsTransport'];
    ortcObjects.forEach(function(ortcObjectName) {
      var obj = window[ortcObjectName];
      if (obj && obj.prototype && obj.prototype.getStats) {
        var nativeGetstats = obj.prototype.getStats;
        obj.prototype.getStats = function() {
          return nativeGetstats.apply(this)
          .then(function(nativeStats) {
            var mapStats = new Map();
            Object.keys(nativeStats).forEach(function(id) {
              nativeStats[id].type = fixStatsType(nativeStats[id]);
              mapStats.set(id, nativeStats[id]);
            });
            return mapStats;
          });
        };
      }
    });

    // legacy callback shims. Should be moved to adapter.js some days.
    var methods = ['createOffer', 'createAnswer'];
    methods.forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[0] === 'function' ||
            typeof args[1] === 'function') { // legacy
          return nativeMethod.apply(this, [arguments[2]])
          .then(function(description) {
            if (typeof args[0] === 'function') {
              args[0].apply(null, [description]);
            }
          }, function(error) {
            if (typeof args[1] === 'function') {
              args[1].apply(null, [error]);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
    methods.forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[1] === 'function' ||
            typeof args[2] === 'function') { // legacy
          return nativeMethod.apply(this, arguments)
          .then(function() {
            if (typeof args[1] === 'function') {
              args[1].apply(null);
            }
          }, function(error) {
            if (typeof args[2] === 'function') {
              args[2].apply(null, [error]);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    // getStats is special. It doesn't have a spec legacy method yet we support
    // getStats(something, cb) without error callbacks.
    ['getStats'].forEach(function(method) {
      var nativeMethod = RTCPeerConnection.prototype[method];
      RTCPeerConnection.prototype[method] = function() {
        var args = arguments;
        if (typeof args[1] === 'function') {
          return nativeMethod.apply(this, arguments)
          .then(function() {
            if (typeof args[1] === 'function') {
              args[1].apply(null);
            }
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    return RTCPeerConnection;
  };

  },{"sdp":17}],17:[function(require,module,exports){
   /* eslint-env node */
  'use strict';

  // SDP helpers.
  var SDPUtils = {};

  // Generate an alphanumeric identifier for cname or mids.
  // TODO: use UUIDs instead? https://gist.github.com/jed/982883
  SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substr(2, 10);
  };

  // The RTCP CNAME used by all peerconnections from the same JS.
  SDPUtils.localCName = SDPUtils.generateIdentifier();

  // Splits SDP into lines, dealing with both CRLF and LF.
  SDPUtils.splitLines = function(blob) {
    return blob.trim().split('\n').map(function(line) {
      return line.trim();
    });
  };
  // Splits SDP into sessionpart and mediasections. Ensures CRLF.
  SDPUtils.splitSections = function(blob) {
    var parts = blob.split('\nm=');
    return parts.map(function(part, index) {
      return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
    });
  };

  // returns the session description.
  SDPUtils.getDescription = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    return sections && sections[0];
  };

  // returns the individual media sections.
  SDPUtils.getMediaSections = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
  };

  // Returns lines that start with a certain prefix.
  SDPUtils.matchPrefix = function(blob, prefix) {
    return SDPUtils.splitLines(blob).filter(function(line) {
      return line.indexOf(prefix) === 0;
    });
  };

  // Parses an ICE candidate line. Sample input:
  // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
  // rport 55996"
  SDPUtils.parseCandidate = function(line) {
    var parts;
    // Parse both variants.
    if (line.indexOf('a=candidate:') === 0) {
      parts = line.substring(12).split(' ');
    } else {
      parts = line.substring(10).split(' ');
    }

    var candidate = {
      foundation: parts[0],
      component: parseInt(parts[1], 10),
      protocol: parts[2].toLowerCase(),
      priority: parseInt(parts[3], 10),
      ip: parts[4],
      address: parts[4], // address is an alias for ip.
      port: parseInt(parts[5], 10),
      // skip parts[6] == 'typ'
      type: parts[7]
    };

    for (var i = 8; i < parts.length; i += 2) {
      switch (parts[i]) {
        case 'raddr':
          candidate.relatedAddress = parts[i + 1];
          break;
        case 'rport':
          candidate.relatedPort = parseInt(parts[i + 1], 10);
          break;
        case 'tcptype':
          candidate.tcpType = parts[i + 1];
          break;
        case 'ufrag':
          candidate.ufrag = parts[i + 1]; // for backward compability.
          candidate.usernameFragment = parts[i + 1];
          break;
        default: // extension handling, in particular ufrag
          candidate[parts[i]] = parts[i + 1];
          break;
      }
    }
    return candidate;
  };

  // Translates a candidate object into SDP candidate attribute.
  SDPUtils.writeCandidate = function(candidate) {
    var sdp = [];
    sdp.push(candidate.foundation);
    sdp.push(candidate.component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);

    var type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type !== 'host' && candidate.relatedAddress &&
        candidate.relatedPort) {
      sdp.push('raddr');
      sdp.push(candidate.relatedAddress);
      sdp.push('rport');
      sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
      sdp.push('tcptype');
      sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
      sdp.push('ufrag');
      sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return 'candidate:' + sdp.join(' ');
  };

  // Parses an ice-options line, returns an array of option tags.
  // a=ice-options:foo bar
  SDPUtils.parseIceOptions = function(line) {
    return line.substr(14).split(' ');
  };

  // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
  // a=rtpmap:111 opus/48000/2
  SDPUtils.parseRtpMap = function(line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
      payloadType: parseInt(parts.shift(), 10) // was: id
    };

    parts = parts[0].split('/');

    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
  };

  // Generate an a=rtpmap line from RTCRtpCodecCapability or
  // RTCRtpCodecParameters.
  SDPUtils.writeRtpMap = function(codec) {
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    var channels = codec.channels || codec.numChannels || 1;
    return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
        (channels !== 1 ? '/' + channels : '') + '\r\n';
  };

  // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
  // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
  // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
  SDPUtils.parseExtmap = function(line) {
    var parts = line.substr(9).split(' ');
    return {
      id: parseInt(parts[0], 10),
      direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
      uri: parts[1]
    };
  };

  // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
  // RTCRtpHeaderExtension.
  SDPUtils.writeExtmap = function(headerExtension) {
    return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
        (headerExtension.direction && headerExtension.direction !== 'sendrecv'
            ? '/' + headerExtension.direction
            : '') +
        ' ' + headerExtension.uri + '\r\n';
  };

  // Parses an ftmp line, returns dictionary. Sample input:
  // a=fmtp:96 vbr=on;cng=on
  // Also deals with vbr=on; cng=on
  SDPUtils.parseFmtp = function(line) {
    var parsed = {};
    var kv;
    var parts = line.substr(line.indexOf(' ') + 1).split(';');
    for (var j = 0; j < parts.length; j++) {
      kv = parts[j].trim().split('=');
      parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
  };

  // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
  SDPUtils.writeFmtp = function(codec) {
    var line = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    if (codec.parameters && Object.keys(codec.parameters).length) {
      var params = [];
      Object.keys(codec.parameters).forEach(function(param) {
        if (codec.parameters[param]) {
          params.push(param + '=' + codec.parameters[param]);
        } else {
          params.push(param);
        }
      });
      line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
    }
    return line;
  };

  // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
  // a=rtcp-fb:98 nack rpsi
  SDPUtils.parseRtcpFb = function(line) {
    var parts = line.substr(line.indexOf(' ') + 1).split(' ');
    return {
      type: parts.shift(),
      parameter: parts.join(' ')
    };
  };
  // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
  SDPUtils.writeRtcpFb = function(codec) {
    var lines = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
      pt = codec.preferredPayloadType;
    }
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
      // FIXME: special handling for trr-int?
      codec.rtcpFeedback.forEach(function(fb) {
        lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
        (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
            '\r\n';
      });
    }
    return lines;
  };

  // Parses an RFC 5576 ssrc media attribute. Sample input:
  // a=ssrc:3735928559 cname:something
  SDPUtils.parseSsrcMedia = function(line) {
    var sp = line.indexOf(' ');
    var parts = {
      ssrc: parseInt(line.substr(7, sp - 7), 10)
    };
    var colon = line.indexOf(':', sp);
    if (colon > -1) {
      parts.attribute = line.substr(sp + 1, colon - sp - 1);
      parts.value = line.substr(colon + 1);
    } else {
      parts.attribute = line.substr(sp + 1);
    }
    return parts;
  };

  SDPUtils.parseSsrcGroup = function(line) {
    var parts = line.substr(13).split(' ');
    return {
      semantics: parts.shift(),
      ssrcs: parts.map(function(ssrc) {
        return parseInt(ssrc, 10);
      })
    };
  };

  // Extracts the MID (RFC 5888) from a media section.
  // returns the MID or undefined if no mid line was found.
  SDPUtils.getMid = function(mediaSection) {
    var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
    if (mid) {
      return mid.substr(6);
    }
  };

  SDPUtils.parseFingerprint = function(line) {
    var parts = line.substr(14).split(' ');
    return {
      algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
      value: parts[1]
    };
  };

  // Extracts DTLS parameters from SDP media section or sessionpart.
  // FIXME: for consistency with other functions this should only
  //   get the fingerprint line as input. See also getIceParameters.
  SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=fingerprint:');
    // Note: a=setup line is ignored since we use the 'auto' role.
    // Note2: 'algorithm' is not case sensitive except in Edge.
    return {
      role: 'auto',
      fingerprints: lines.map(SDPUtils.parseFingerprint)
    };
  };

  // Serializes DTLS parameters to SDP.
  SDPUtils.writeDtlsParameters = function(params, setupType) {
    var sdp = 'a=setup:' + setupType + '\r\n';
    params.fingerprints.forEach(function(fp) {
      sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
    });
    return sdp;
  };
  // Parses ICE information from SDP media section or sessionpart.
  // FIXME: for consistency with other functions this should only
  //   get the ice-ufrag and ice-pwd lines as input.
  SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.splitLines(mediaSection);
    // Search in session part, too.
    lines = lines.concat(SDPUtils.splitLines(sessionpart));
    var iceParameters = {
      usernameFragment: lines.filter(function(line) {
        return line.indexOf('a=ice-ufrag:') === 0;
      })[0].substr(12),
      password: lines.filter(function(line) {
        return line.indexOf('a=ice-pwd:') === 0;
      })[0].substr(10)
    };
    return iceParameters;
  };

  // Serializes ICE parameters to SDP.
  SDPUtils.writeIceParameters = function(params) {
    return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
        'a=ice-pwd:' + params.password + '\r\n';
  };

  // Parses the SDP media section and returns RTCRtpParameters.
  SDPUtils.parseRtpParameters = function(mediaSection) {
    var description = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: [],
      rtcp: []
    };
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
      var pt = mline[i];
      var rtpmapline = SDPUtils.matchPrefix(
          mediaSection, 'a=rtpmap:' + pt + ' ')[0];
      if (rtpmapline) {
        var codec = SDPUtils.parseRtpMap(rtpmapline);
        var fmtps = SDPUtils.matchPrefix(
            mediaSection, 'a=fmtp:' + pt + ' ');
        // Only the first a=fmtp:<pt> is considered.
        codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
        codec.rtcpFeedback = SDPUtils.matchPrefix(
            mediaSection, 'a=rtcp-fb:' + pt + ' ')
          .map(SDPUtils.parseRtcpFb);
        description.codecs.push(codec);
        // parse FEC mechanisms from rtpmap lines.
        switch (codec.name.toUpperCase()) {
          case 'RED':
          case 'ULPFEC':
            description.fecMechanisms.push(codec.name.toUpperCase());
            break;
          default: // only RED and ULPFEC are recognized as FEC mechanisms.
            break;
        }
      }
    }
    SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
      description.headerExtensions.push(SDPUtils.parseExtmap(line));
    });
    // FIXME: parse rtcp.
    return description;
  };

  // Generates parts of the SDP media section describing the capabilities /
  // parameters.
  SDPUtils.writeRtpDescription = function(kind, caps) {
    var sdp = '';

    // Build the mline.
    sdp += 'm=' + kind + ' ';
    sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
    sdp += ' UDP/TLS/RTP/SAVPF ';
    sdp += caps.codecs.map(function(codec) {
      if (codec.preferredPayloadType !== undefined) {
        return codec.preferredPayloadType;
      }
      return codec.payloadType;
    }).join(' ') + '\r\n';

    sdp += 'c=IN IP4 0.0.0.0\r\n';
    sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach(function(codec) {
      sdp += SDPUtils.writeRtpMap(codec);
      sdp += SDPUtils.writeFmtp(codec);
      sdp += SDPUtils.writeRtcpFb(codec);
    });
    var maxptime = 0;
    caps.codecs.forEach(function(codec) {
      if (codec.maxptime > maxptime) {
        maxptime = codec.maxptime;
      }
    });
    if (maxptime > 0) {
      sdp += 'a=maxptime:' + maxptime + '\r\n';
    }
    sdp += 'a=rtcp-mux\r\n';

    if (caps.headerExtensions) {
      caps.headerExtensions.forEach(function(extension) {
        sdp += SDPUtils.writeExtmap(extension);
      });
    }
    // FIXME: write fecMechanisms.
    return sdp;
  };

  // Parses the SDP media section and returns an array of
  // RTCRtpEncodingParameters.
  SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    var encodingParameters = [];
    var description = SDPUtils.parseRtpParameters(mediaSection);
    var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
    var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

    // filter a=ssrc:... cname:, ignore PlanB-msid
    var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
    .map(function(line) {
      return SDPUtils.parseSsrcMedia(line);
    })
    .filter(function(parts) {
      return parts.attribute === 'cname';
    });
    var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    var secondarySsrc;

    var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
    .map(function(line) {
      var parts = line.substr(17).split(' ');
      return parts.map(function(part) {
        return parseInt(part, 10);
      });
    });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
      secondarySsrc = flows[0][1];
    }

    description.codecs.forEach(function(codec) {
      if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
        var encParam = {
          ssrc: primarySsrc,
          codecPayloadType: parseInt(codec.parameters.apt, 10)
        };
        if (primarySsrc && secondarySsrc) {
          encParam.rtx = {ssrc: secondarySsrc};
        }
        encodingParameters.push(encParam);
        if (hasRed) {
          encParam = JSON.parse(JSON.stringify(encParam));
          encParam.fec = {
            ssrc: primarySsrc,
            mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
          };
          encodingParameters.push(encParam);
        }
      }
    });
    if (encodingParameters.length === 0 && primarySsrc) {
      encodingParameters.push({
        ssrc: primarySsrc
      });
    }

    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
    if (bandwidth.length) {
      if (bandwidth[0].indexOf('b=TIAS:') === 0) {
        bandwidth = parseInt(bandwidth[0].substr(7), 10);
      } else if (bandwidth[0].indexOf('b=AS:') === 0) {
        // use formula from JSEP to convert b=AS to TIAS value.
        bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
            - (50 * 40 * 8);
      } else {
        bandwidth = undefined;
      }
      encodingParameters.forEach(function(params) {
        params.maxBitrate = bandwidth;
      });
    }
    return encodingParameters;
  };

  // parses http://draft.ortc.org/#rtcrtcpparameters*
  SDPUtils.parseRtcpParameters = function(mediaSection) {
    var rtcpParameters = {};

    // Gets the first SSRC. Note tha with RTX there might be multiple
    // SSRCs.
    var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(obj) {
          return obj.attribute === 'cname';
        })[0];
    if (remoteSsrc) {
      rtcpParameters.cname = remoteSsrc.value;
      rtcpParameters.ssrc = remoteSsrc.ssrc;
    }

    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;

    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
    rtcpParameters.mux = mux.length > 0;

    return rtcpParameters;
  };

  // parses either a=msid: or a=ssrc:... msid lines and returns
  // the id of the MediaStream and MediaStreamTrack.
  SDPUtils.parseMsid = function(mediaSection) {
    var parts;
    var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
    if (spec.length === 1) {
      parts = spec[0].substr(7).split(' ');
      return {stream: parts[0], track: parts[1]};
    }
    var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
    .map(function(line) {
      return SDPUtils.parseSsrcMedia(line);
    })
    .filter(function(msidParts) {
      return msidParts.attribute === 'msid';
    });
    if (planB.length > 0) {
      parts = planB[0].value.split(' ');
      return {stream: parts[0], track: parts[1]};
    }
  };

  // Generate a session ID for SDP.
  // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
  // recommends using a cryptographically random +ve 64-bit value
  // but right now this should be acceptable and within the right range
  SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 21);
  };

  // Write boilder plate for start of SDP
  // sessId argument is optional - if not supplied it will
  // be generated randomly
  // sessVersion is optional and defaults to 2
  // sessUser is optional and defaults to 'thisisadapterortc'
  SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    var sessionId;
    var version = sessVer !== undefined ? sessVer : 2;
    if (sessId) {
      sessionId = sessId;
    } else {
      sessionId = SDPUtils.generateSessionId();
    }
    var user = sessUser || 'thisisadapterortc';
    // FIXME: sess-id should be an NTP timestamp.
    return 'v=0\r\n' +
        'o=' + user + ' ' + sessionId + ' ' + version +
          ' IN IP4 127.0.0.1\r\n' +
        's=-\r\n' +
        't=0 0\r\n';
  };

  SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : 'active');

    sdp += 'a=mid:' + transceiver.mid + '\r\n';

    if (transceiver.direction) {
      sdp += 'a=' + transceiver.direction + '\r\n';
    } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
      sdp += 'a=sendrecv\r\n';
    } else if (transceiver.rtpSender) {
      sdp += 'a=sendonly\r\n';
    } else if (transceiver.rtpReceiver) {
      sdp += 'a=recvonly\r\n';
    } else {
      sdp += 'a=inactive\r\n';
    }

    if (transceiver.rtpSender) {
      // spec.
      var msid = 'msid:' + stream.id + ' ' +
          transceiver.rtpSender.track.id + '\r\n';
      sdp += 'a=' + msid;

      // for Chrome.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;
      if (transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
        sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
      }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
    }
    return sdp;
  };

  // Gets the direction from the mediaSection or the sessionpart.
  SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    var lines = SDPUtils.splitLines(mediaSection);
    for (var i = 0; i < lines.length; i++) {
      switch (lines[i]) {
        case 'a=sendrecv':
        case 'a=sendonly':
        case 'a=recvonly':
        case 'a=inactive':
          return lines[i].substr(2);
        default:
          // FIXME: What should happen here?
      }
    }
    if (sessionpart) {
      return SDPUtils.getDirection(sessionpart);
    }
    return 'sendrecv';
  };

  SDPUtils.getKind = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    return mline[0].substr(2);
  };

  SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(' ', 2)[1] === '0';
  };

  SDPUtils.parseMLine = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var parts = lines[0].substr(2).split(' ');
    return {
      kind: parts[0],
      port: parseInt(parts[1], 10),
      protocol: parts[2],
      fmt: parts.slice(3).join(' ')
    };
  };

  SDPUtils.parseOLine = function(mediaSection) {
    var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
    var parts = line.substr(2).split(' ');
    return {
      username: parts[0],
      sessionId: parts[1],
      sessionVersion: parseInt(parts[2], 10),
      netType: parts[3],
      addressType: parts[4],
      address: parts[5]
    };
  };

  // a very naive interpretation of a valid SDP.
  SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== 'string' || blob.length === 0) {
      return false;
    }
    var lines = SDPUtils.splitLines(blob);
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
        return false;
      }
      // TODO: check the modifier a bit more.
    }
    return true;
  };

  // Expose public methods.
  if (typeof module === 'object') {
    module.exports = SDPUtils;
  }

  },{}]},{},[1])(1)
  });

/***/ }),

/***/ "./sdk/webrtc/zego.client.web.ts":
/*!***************************************!*\
  !*** ./sdk/webrtc/zego.client.web.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../types/global.ts" />
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ../common/zego.extern */ "./sdk/common/zego.extern.ts");
var zego_logger_webrtc_1 = __webpack_require__(/*! ./zego.logger.webrtc */ "./sdk/webrtc/zego.logger.webrtc.ts");
var zego_streamCenter_web_1 = __webpack_require__(/*! ./zego.streamCenter.web */ "./sdk/webrtc/zego.streamCenter.web.ts");
var client_util_1 = __webpack_require__(/*! ../util/client-util */ "./sdk/util/client-util.ts");
var audioMixUtil_1 = __webpack_require__(/*! ../util/audioMixUtil */ "./sdk/util/audioMixUtil.ts");
var index_1 = __webpack_require__(/*! ../common/clientBase/index */ "./sdk/common/clientBase/index.ts");
var stateCenter_1 = __webpack_require__(/*! ../common/clientBase/stateCenter */ "./sdk/common/clientBase/stateCenter.ts");
var mediaUtil_1 = __webpack_require__(/*! ../util/mediaUtil */ "./sdk/util/mediaUtil.ts");
var ZegoClient = /** @class */ (function (_super) {
    __extends(ZegoClient, _super);
    function ZegoClient() {
        var _this = this;
        var log = new zego_logger_webrtc_1.LoggerWeb();
        var stateCenter = new stateCenter_1.StateCenter();
        var streamCenter = new zego_streamCenter_web_1.ZegoStreamCenterWeb(log, stateCenter);
        _this = _super.call(this) || this;
        _this.streamCenter = streamCenter;
        _this.logger = log;
        _this.stateCenter = stateCenter;
        _this.audioMixing = new audioMixUtil_1.audioMixUtil(log);
        _this.init();
        _this.bindWindowListener();
        return _this;
    }
    ZegoClient.prototype.getSocket = function (server) {
        return new WebSocket(server);
    };
    ZegoClient.prototype.enableCamera = function (localVideo, enable) {
        this.logger.debug("zc.p.ec.0 call");
        if (typeof enable !== "boolean") {
            this.logger.error("zc.p.ec.0 argument is not bool");
            return false;
        }
        return this.streamCenter.enableCamera(localVideo, enable);
    };
    ZegoClient.prototype.enableMicrophone = function (localVideo, enable) {
        this.logger.debug("zc.p.em.0 call");
        if (typeof enable !== "boolean") {
            this.logger.error("zc.p.em.0 argument is not bool");
            return false;
        }
        return this.streamCenter.enableMicrophone(localVideo, enable);
    };
    ZegoClient.prototype.setLocalAudioOutput = function (localVideo, audioOutput) {
        this.logger.debug("zc.p.slao call");
        if (typeof audioOutput !== "string") {
            console.error("audiooutput is not string");
            return false;
        }
        return this.streamCenter.setStreamAudioOutput(localVideo, audioOutput);
    };
    ZegoClient.prototype.setPlayAudioOutput = function (streamid, audioOutput) {
        this.logger.debug("zc.p.spao call");
        if (typeof audioOutput !== "string") {
            console.error("audiooutput is not string");
            return false;
        }
        return this.streamCenter.setPlayStreamAudioOutput(streamid, audioOutput);
    };
    ZegoClient.prototype.setCustomSignalUrl = function (signalUrl) {
        this.logger.debug("zc.p.scs.0 call: " + signalUrl);
        if (!signalUrl || signalUrl.length == 0) {
            this.logger.error("zc.p.scs.0 param error");
            return false;
        }
        if (signalUrl.indexOf("wss://") != 0) {
            this.logger.error("zc.p.scs.0 url is not correct");
            return false;
        }
        this.stateCenter.customUrl = signalUrl;
    };
    ;
    ZegoClient.prototype.setQualityMonitorCycle = function (timeInMs) {
        if (typeof timeInMs === "number" && timeInMs >= 1000) {
            this.streamCenter.setQualityMonitorCycle(timeInMs);
        }
    };
    /*
    *    "zc.p.sps.0": "ZegoClient.startPlayingStream",  // 播放流
    */
    ZegoClient.prototype.startPlayingStream = function (streamid, remoteVideo, audioOutput, playOption) {
        var _this = this;
        this.logger.debug("zc.p.sps.0 call");
        if (!streamid || streamid === "") {
            this.logger.error("zc.p.sps.0 param error");
            return false;
        }
        if (!remoteVideo) {
            this.logger.error("zc.p.sps.0 don't have remoteVideo");
            return false;
        }
        if (this.stateCenter.customUrl) {
            if (!this.streamCenter.setPlayStateStart(streamid, remoteVideo, audioOutput, playOption)) {
                this.logger.error("zc.p.sps.0 cannot start play");
                return false;
            }
            return this.streamCenter.startPlayingStream(streamid, [this.stateCenter.customUrl]);
        }
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zc.p.sps.0 not login");
            return false;
        }
        var found = false;
        for (var i = 0; i < this.stateCenter.streamList.length; i++) {
            if (this.stateCenter.streamList[i].stream_id === streamid) {
                // 根据传入的流id判断当前的流列表中是否存在该流
                found = true;
                break;
            }
        }
        if (found == false) {
            this.logger.info("zc.p.sps.0 cannot find stream");
            // return false;
        }
        //打开不能同时多次拉同一条流限制
        if (!this.stateCenter.pullLimited) {
            streamid = +'_' + streamid;
        }
        if (!this.streamCenter.setPlayStateStart(streamid, remoteVideo, audioOutput, playOption)) {
            this.logger.info("zc.p.sps.0 cannot start play");
            return false;
        }
        //send request
        var body = {
            stream_id: streamid,
            ptype: "pull",
            signals: this.streamCenter.getAllInUseUrl()
        };
        this.socketCenter.registerRouter('webrtc_url', function (msg) {
            _this.handleFetchWebRtcUrlRsp(msg);
        });
        this.socketCenter.sendMessage("webrtc_url", body, undefined, function (err, seq) {
            if (err == zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT) {
                _this.onPlayStateUpdate(zego_entity_1.ENUM_PLAY_STATE_UPDATE.error, streamid, zego_extern_1.playErrorList.DISPATCH_TIMEOUT);
            }
            else {
                _this.onPlayStateUpdate(zego_entity_1.ENUM_PLAY_STATE_UPDATE.error, streamid, zego_extern_1.playErrorList.DISPATCH_ERROR);
            }
            _this.streamCenter.stopPlayingStream(streamid);
        });
        return true;
    };
    ;
    /*
    *    "zc.p.sps.0.1": "ZegoClient.stopPlayingStream",停止拉流
    */
    ZegoClient.prototype.stopPlayingStream = function (streamid) {
        this.logger.debug("zc.p.sps.1.0 call");
        if (!streamid || streamid === "") {
            this.logger.info("zc.p.sps.1.0 param error");
            return false;
        }
        this.streamCenter.stopPlayingStream(streamid);
        for (var seq in this.stateCenter.streamUrlMap) {
            if (this.stateCenter.streamUrlMap[seq] === streamid) {
                delete this.stateCenter.streamUrlMap[seq];
                break;
            }
        }
        this.logger.debug("zc.p.sps.1.0 call success");
        return true;
    };
    ;
    /*
     *    "zc.p.sp.0": "ZegoClient.startPreview", 开始预览
     */
    ZegoClient.prototype.startPreview = function (localVideo, mediaStreamConstraints, success, error) {
        this.logger.debug("zc.p.sp.0 call");
        if (!localVideo) {
            this.logger.error("zc.p.sp.0 no localVideo");
            return false;
        }
        if (mediaStreamConstraints.audioBitRate) {
            if (typeof mediaStreamConstraints.audioBitRate !== 'number') {
                this.logger.error("zc.p.sp.0 audioBitRate must be number");
                return;
            }
            else if (mediaStreamConstraints.audioBitRate < 48000) {
                this.logger.error("zc.p.sp.0 audioBitRate cannot less 48000");
                return;
            }
            this.stateCenter.audioBitRate = mediaStreamConstraints.audioBitRate;
        }
        return this.streamCenter.startPreview(localVideo, mediaStreamConstraints, success, error);
    };
    ;
    /*
    *    "zc.p.sp.1": "ZegoClient.stopPreview",结束预览
    */
    ZegoClient.prototype.stopPreview = function (localVideo) {
        this.logger.debug("zc.p.sp.1 call");
        if (!localVideo) {
            this.logger.info("zc.p.sp.1 param error");
            return false;
        }
        return this.streamCenter.stopPreview(localVideo);
    };
    ;
    /*
    *    "zc.p.sps.1": "ZegoClient.startPublishingStream",开始推流
    */
    ZegoClient.prototype.startPublishingStream = function (streamid, localVideo, extraInfo, playOption) {
        var _this = this;
        this.logger.debug("zc.p.sps.1 call");
        if (!streamid) {
            this.logger.error("zc.p.sps.1 param error");
            return false;
        }
        if (!playOption) {
            playOption = {};
        }
        playOption.audioBitRate = this.stateCenter.audioBitRate;
        if (this.stateCenter.customUrl && this.stateCenter.customUrl.length != 0) {
            this.stateCenter.publishStreamList[streamid] = {
                state: zego_entity_1.ENUM_PUBLISH_STREAM_STATE.tryPublish,
                extra_info: extraInfo
            };
            if (!this.streamCenter.setPublishStateStart(streamid, localVideo, playOption)) {
                this.logger.info("zc.p.sps.1 cannot start publish");
                return false;
            }
            return this.streamCenter.startPublishingStream(streamid, [this.stateCenter.customUrl]);
        }
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zc.p.sps.1 not login");
            return false;
        }
        this.stateCenter.publishStreamList[streamid] = {
            state: zego_entity_1.ENUM_PUBLISH_STREAM_STATE.tryPublish,
            extra_info: extraInfo
        };
        if (!this.streamCenter.setPublishStateStart(streamid, localVideo, playOption)) {
            this.logger.error("zc.p.sps.1 cannot start publish");
            return false;
        }
        this.logger.info("zc.p.sps.1 start publish");
        var body = {
            stream_id: streamid,
            ptype: "push",
            signals: this.streamCenter.getAllInUseUrl(),
            header_kvs: [{ key: "grpc-metadata-push", value: (playOption && playOption.cdnUrl) || '' }]
        };
        this.socketCenter.registerRouter('webrtc_url', function (msg) {
            _this.handleFetchWebRtcUrlRsp(msg);
        });
        this.socketCenter.sendMessage("webrtc_url", body, undefined, function (err, seq) {
            if (err == zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT) {
                _this.onPublishStateUpdate(zego_entity_1.ENUM_PUBLISH_STATE_UPDATE.error, streamid, zego_extern_1.publishErrorList.DISPATCH_TIMEOUT);
            }
            else {
                _this.onPublishStateUpdate(zego_entity_1.ENUM_PUBLISH_STATE_UPDATE.error, streamid, zego_extern_1.publishErrorList.DISPATCH_ERROR);
            }
            _this.streamCenter.stopPublishingStream(streamid);
        });
        return true;
    };
    ;
    //结束推流
    ZegoClient.prototype.stopPublishingStream = function (streamid) {
        this.logger.debug("zc.p.sps.1.1 call");
        if (!streamid) {
            this.logger.info("zc.p.sps.1.1 param error");
            return false;
        }
        this.streamCenter.stopPublishingStream(streamid);
        if (this.stateCenter.publishStreamList[streamid]) {
            if (this.stateCenter.publishStreamList[streamid].state >= zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.streamHandler.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd);
            }
            delete this.stateCenter.publishStreamList[streamid];
        }
        return true;
    };
    ;
    //预加载音效
    ZegoClient.prototype.preloadEffect = function (id, effectUrl, callBack) {
        var _this = this;
        if (!id || typeof id !== 'number' || !effectUrl || typeof effectUrl !== 'string') {
            this.logger.error('zc.pe.0 params error');
            return;
        }
        if (this.stateCenter.audioEffectBuffer[id]) {
            this.logger.error('zc.pe.0 audio buffer already exists');
            return;
        }
        this.audioMixing.preloadEffect(effectUrl, function (err, ab) {
            if (err) {
                _this.logger.error('zc.pe.0 effect preload fail ' + err);
                callBack && callBack(err);
                return;
            }
            else if (ab) {
                _this.stateCenter.audioEffectBuffer[id] = ab;
                callBack && callBack();
            }
        });
    };
    ZegoClient.prototype.playEffect = function (audioMixConfig, start, end) {
        if (!audioMixConfig.streamId || typeof audioMixConfig.streamId !== 'string' || !audioMixConfig.effectId || typeof audioMixConfig.effectId !== 'number') {
            this.logger.error('zc.pe.1 params error');
            return;
        }
        if (!this.stateCenter.audioEffectBuffer[audioMixConfig.effectId]) {
            this.logger.error("zc,pe.1 audio buffer dosesn't exists");
            return;
        }
        var audioBuffer = this.stateCenter.audioEffectBuffer[audioMixConfig.effectId];
        var publisher = this.getPublisher(audioMixConfig.streamId);
        if (!publisher) {
            this.logger.error("zc.pe.1 publisher doesn't exist");
            return;
        }
        if (audioBuffer) {
            publisher.playEffect(audioMixConfig, audioBuffer, start, end);
        }
        else {
            this.logger.error('zc.pe.1 no audio buffer found');
        }
    };
    ZegoClient.prototype.pauseEffect = function (streamid) {
        if (!streamid || typeof streamid !== 'string') {
            this.logger.error('zc.pe.2 streamid format error');
            return;
        }
        var publisher = this.getPublisher(streamid);
        if (!publisher) {
            this.logger.error("zc.pe.2 publisher doesn't exist");
            return;
        }
        publisher.pauseEffect();
    };
    ZegoClient.prototype.resumeEffect = function (streamid) {
        if (!streamid || typeof streamid !== 'string') {
            this.logger.error('zc.re.0 streamid format error');
            return;
        }
        var publisher = this.getPublisher(streamid);
        if (!publisher) {
            this.logger.error("zc.re.0 publisher doesn't exist");
            return;
        }
        publisher.resumeEffect();
    };
    ZegoClient.prototype.unloadEffect = function (effecId) {
        if (!effecId || typeof effecId !== 'number') {
            this.logger.error('zc.ue.0 params error');
            return false;
        }
        delete this.stateCenter.audioEffectBuffer[effecId];
        return true;
    };
    //开始混音
    ZegoClient.prototype.startMixingAudio = function (streamid, audio, replace) {
        this.logger.debug("zc.sma.0 call");
        if (!streamid || typeof streamid !== 'string') {
            this.logger.error("zc.sma.0 stream id error");
            return false;
        }
        if (!audio) {
            this.logger.error("zc.sma.0 no audio");
            return false;
        }
        var publisher = this.getPublisher(streamid);
        if (!publisher) {
            this.logger.error("zc.sma.0 publisher doesn't exist");
            return false;
        }
        return publisher.startMixingAudio(audio, replace);
    };
    //停止混音
    ZegoClient.prototype.stopMixingAudio = function (streamid) {
        if (!streamid || typeof streamid !== 'string') {
            this.logger.error('zc.sma.1 param streamid format error');
            return false;
        }
        var publisher = this.getPublisher(streamid);
        if (!publisher) {
            this.logger.error("zc.sma.1 publisher doesn't exist");
            return false;
        }
        return publisher.stopMixingAudio();
    };
    ZegoClient.prototype.setMixingAudioVolume = function (streamid, volume) {
        this.logger.debug("zc.sma.2 call");
        if (!streamid || typeof streamid !== 'string' || typeof volume !== 'number' || volume < 0 || volume > 100) {
            this.logger.error("zc.sma.2 param error");
            return false;
        }
        var publisher = this.getPublisher(streamid);
        if (!publisher) {
            this.logger.error("zc.sma.2 publisher doesn't exist");
            return false;
        }
        return publisher.audioMixing.setMixingAudioVolume(volume / 100);
    };
    ZegoClient.prototype.getPublisher = function (streamid) {
        var publisher = null;
        var tototalStreamId = this.streamCenter.getTotalStreamId(streamid);
        if (this.streamCenter.publisherList[tototalStreamId] && this.streamCenter.publisherList[tototalStreamId].publisher) {
            publisher = this.streamCenter.publisherList[tototalStreamId].publisher;
        }
        return publisher;
    };
    ZegoClient.prototype.startScreenShotChrome = function (callBack) {
        if (!ZegoClient.screenShotReady) {
            this.logger.error("zc.b.ss Please install the extension:1. Go to chrome://extensions  2. Check: \"Enable Developer mode   3. Click: \"Load the unpacked extension... 4. Choose \"extension\" folder from the repository 5. Reload this page");
            return false;
        }
        else {
            window.postMessage({ type: 'SS_UI_REQUEST', text: 'start' }, '*');
            // listen for messages from the content-script
            client_util_1.ClientUtil.registerCallback('screenShare', { success: callBack }, this.stateCenter.callbackList);
        }
    };
    ZegoClient.prototype.startScreenSharingChrome = function (audio, callBack) {
        var _this = this;
        if ('getDisplayMedia' in navigator.mediaDevices) {
            var zegoMediaDevices = navigator.mediaDevices;
            zegoMediaDevices.getDisplayMedia({ audio: audio })
                .then(function (stream) {
                _this.stateCenter.screenShotStream = stream;
                callBack(true, stream);
            }).catch(function (err) {
                _this.logger.error('zc.b.sss ' + err);
                callBack(false, null, err);
            });
        }
        else {
            this.logger.error('zc.b.sss brower does not support getDisplayMedia');
        }
    };
    ZegoClient.prototype.startScreenShotFirFox = function (mediaSource, audio, callBack) {
        var _this = this;
        var config = {
            video: {},
            audio: audio
        };
        config.video['mediaSource'] = mediaSource;
        navigator.mediaDevices
            .getUserMedia(config)
            .then(function (stream) {
            _this.stateCenter.screenShotStream = stream;
            callBack(true, stream);
        }).catch(function (err) {
            _this.logger.error('zc.b.ssf ' + err);
            callBack(false, null);
        });
    };
    ZegoClient.prototype.stopScreenShot = function () {
        this.stateCenter.screenShotStream.getTracks().forEach(function (track) {
            track.stop();
        });
        window.postMessage({ type: 'SS_UI_CANCEL', text: 'start' }, '*');
    };
    ZegoClient.prototype.switchDevice = function (type, localVideo, deviceId, success, error) {
        var _this = this;
        if ((type !== 'audio' && type !== 'video') || typeof deviceId !== 'string') {
            this.logger.error('zg.sd.0 param error');
            return;
        }
        this.enumDevices(function (devicesInfos) {
            var cameras = devicesInfos.cameras;
            var microphones = devicesInfos.microphones;
            if (!cameras.find(function (camera) { return camera.deviceId == deviceId; }) && !microphones.find(function (microphone) { return microphone.deviceId == deviceId; })) {
                _this.logger.error('zg.sd.0 can not switch device');
                return;
            }
            _this.streamCenter.switchDevice(type, localVideo, deviceId, success, error);
        }, function (err) { return error && error(err); });
    };
    // web独有
    ZegoClient.prototype.WebrtcOnPublishStateUpdateHandle = function (type, streamid, error) {
        if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing) {
            this.onPublishStateUpdate(type, streamid, error);
        }
    };
    ;
    // web独有
    ZegoClient.prototype.setCDNInfo = function (streamInfo, streamItem) {
        streamInfo.urls_flv = streamItem.urls_flv;
        streamInfo.urls_hls = streamItem.urls_m3u8;
        streamInfo.urls_https_flv = streamItem.urls_https_flv;
        streamInfo.urls_https_hls = streamItem.urls_https_m3u8;
        streamInfo.urls_rtmp = streamItem.urls_rtmp;
    };
    ;
    ZegoClient.prototype.loginBodyData = function () {
        return {
            "id_name": this.stateCenter.idName,
            "nick_name": this.stateCenter.nickName,
            "role": this.stateCenter.role,
            "token": this.stateCenter.token,
            "version": zego_entity_1.PROTO_VERSION,
            "room_name": this.stateCenter.roomid,
            "user_state_flag": this.stateCenter.userStateUpdate ? 1 : 0,
            "room_create_flag": this.stateCenter.roomCreateFlag,
            "client_type": zego_entity_1.E_CLIENT_TYPE.ClientType_Webrtc,
            third_token: this.stateCenter.third_token
        };
    };
    ZegoClient.prototype.screenStreamFrom = function (streamId, canRequestAudioTrack, callBack) {
        var _this = this;
        var config = {};
        config['audio'] = {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        };
        config['video'] = {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        };
        !canRequestAudioTrack && (config['audio'] = false);
        navigator.mediaDevices
            .getUserMedia(config)
            .then(function (stream) {
            _this.stateCenter.screenShotStream = stream;
            callBack(true, stream);
        }).catch(function (err) {
            _this.logger.error('zc.b.ssf ' + err);
            callBack(false, null, err);
        });
    };
    ZegoClient.prototype.filterStreamList = function (streamId) {
        var flv = {};
        var hls = {};
        var rtmp = {};
        var streamListUrl = [];
        var index = 0;
        this.stateCenter.streamList.forEach(function (item, ind) {
            if (item.stream_id == streamId)
                index = ind;
        });
        for (var key in this.stateCenter.streamList[index]) {
            if (key == 'urls_flv' || key == 'urls_https_flv') {
                flv[key] = this.stateCenter.streamList[index][key];
            }
            if (key == 'urls_m3u8' || key == 'urls_https_m3u8') {
                hls[key] = this.stateCenter.streamList[index][key];
            }
            if (key == 'urls_rtmp') {
                rtmp[key] = this.stateCenter.streamList[index][key];
            }
        }
        var pro = window.location.protocol;
        var ua = window.navigator.userAgent;
        if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
            for (var key in hls) {
                if (hls[key]) {
                    hls[key].forEach(function (item) {
                        if (item.indexOf(pro) !== -1)
                            streamListUrl.push(item);
                    });
                }
            }
        }
        else if (pro == 'http:') {
            for (var key in flv) {
                if (flv[key]) {
                    flv[key].forEach(function (item) {
                        if (item.indexOf('http') !== -1 || item.indexOf('https') !== -1)
                            streamListUrl.push(item);
                    });
                }
            }
        }
        else if (pro == 'https:') {
            for (var key in flv) {
                if (flv[key]) {
                    flv[key].forEach(function (item) {
                        if (item.indexOf(pro) !== -1)
                            streamListUrl.push(item);
                    });
                }
            }
        }
        else if (pro == 'rtmp:') {
            for (var key in rtmp) {
                if (rtmp[key]) {
                    rtmp[key].forEach(function (item) {
                        if (item.indexOf(pro) !== -1)
                            streamListUrl.push(item);
                    });
                }
            }
        }
        return streamListUrl.filter(function (ele, index, self) { return self.indexOf(ele) == index; });
    };
    ZegoClient.isSupportWebrtc = function () {
        return client_util_1.ClientUtil.isSupportWebrtc();
    };
    ZegoClient.isSupportH264 = function (sucCall, errCall) {
        client_util_1.ClientUtil.isSupportH264(sucCall, errCall);
    };
    ZegoClient.supportDetection = function (success, error) {
        if (navigator && navigator.mediaDevices && (this.screenShotReady || 'getDisplayMedia' in navigator.mediaDevices)) {
            client_util_1.ClientUtil.supportDetection(true, success, error);
        }
        else {
            client_util_1.ClientUtil.supportDetection(false, success, error);
        }
    };
    ZegoClient.prototype.enumDevices = function (deviceInfoCallback, error) {
        ZegoClient.enumDevices(deviceInfoCallback, error);
    };
    ZegoClient.enumDevices = function (deviceInfoCallback, error) {
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.enumerateDevices === undefined) {
            if (error) {
                error("browser don't support enumerate devices");
            }
            return;
        }
        navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
            var microphone = [];
            var speaker = [];
            var camera = [];
            for (var i = 0; i < deviceInfos.length; i++) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'audioinput') {
                    microphone.push({
                        label: deviceInfo.label,
                        deviceId: deviceInfo.deviceId
                    });
                }
                if (deviceInfo.kind === 'audiooutput') {
                    speaker.push({
                        label: deviceInfo.label,
                        deviceId: deviceInfo.deviceId
                    });
                }
                if (deviceInfo.kind === 'videoinput') {
                    camera.push({
                        label: deviceInfo.label,
                        deviceId: deviceInfo.deviceId
                    });
                }
            }
            if (deviceInfoCallback) {
                deviceInfoCallback({
                    microphones: microphone,
                    speakers: speaker,
                    cameras: camera
                });
            }
        }).catch(function (err) {
            if (error) {
                error(err);
            }
        });
    };
    ;
    ZegoClient.getAudioInfo = function (el, errCallBack, option) {
        if (!el.srcObject) {
            console.error('srcObject is empty!');
            return false;
        }
        var _option = __assign({}, option);
        return new mediaUtil_1.MediaUtil(_option).connectToSource(el.srcObject, function (e) {
            errCallBack(e);
        });
    };
    ZegoClient.handleDataAvailable = function (event) {
        if (event.data && event.data.size > 0) {
            ZegoClient.recordedBlobs.push(event.data);
        }
    };
    ZegoClient.startRecord = function (el) {
        var playStream = el.captureStream();
        ZegoClient.recordedBlobs = [];
        var options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm;codecs=vp8' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    options = { mimeType: '' };
                }
            }
        }
        try {
            ZegoClient.mediaRecorder = new MediaRecorder(playStream, options);
        }
        catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }
        ZegoClient.mediaRecorder.onstop = function (event) {
            console.log('Recorder stopped: ', event);
        };
        ZegoClient.mediaRecorder.ondataavailable = ZegoClient.handleDataAvailable;
        ZegoClient.mediaRecorder.start(10); // collect 10ms of data
    };
    ZegoClient.stopRecord = function () {
        if (ZegoClient.mediaRecorder) {
            ZegoClient.mediaRecorder.stop();
        }
        else {
            console.warn('please invoke startRecord first');
        }
    };
    ZegoClient.resumeRecord = function () {
        if (ZegoClient.mediaRecorder) {
            ZegoClient.mediaRecorder.resume();
        }
        else {
            console.warn('please invoke startRecord first');
        }
    };
    ZegoClient.pauseRecord = function () {
        if (ZegoClient.mediaRecorder) {
            ZegoClient.mediaRecorder.pause();
        }
        else {
            console.warn('please invoke startRecord first');
        }
    };
    ZegoClient.saveRecord = function (name) {
        if (ZegoClient.mediaRecorder && ZegoClient.recordedBlobs) {
            var blob = new Blob(ZegoClient.recordedBlobs, { type: 'video/webm' });
            var url_1 = window.URL.createObjectURL(blob);
            var a_1 = document.createElement('a');
            a_1.style.display = 'none';
            a_1.href = url_1;
            a_1.download = name + '.webm';
            document.body.appendChild(a_1);
            a_1.click();
            setTimeout(function () {
                document.body.removeChild(a_1);
                window.URL.revokeObjectURL(url_1);
            }, 100);
        }
        else {
            console.warn('please invoke startRecord first');
        }
    };
    ZegoClient.takeSnapShot = function (el, img) {
        if (el && el.videoHeight !== 0) {
            var canvas = document.createElement("canvas");
            canvas.width = el.videoWidth;
            canvas.height = el.videoHeight;
            var canvasContext = canvas.getContext('2d');
            canvasContext.drawImage(el, 0, 0, canvas.width, canvas.height);
            img.src = canvas.toDataURL('image/jpeg');
        }
        else {
            console.error("video can not empty");
        }
    };
    ZegoClient.saveSnapShot = function (el, name) {
        if (el && el.videoHeight !== 0) {
            var canvas = document.createElement("canvas");
            canvas.width = el.videoWidth;
            canvas.height = el.videoHeight;
            var canvasContext = canvas.getContext('2d');
            canvasContext.drawImage(el, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function (blob) {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = name + '.jpeg';
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100);
            });
        }
        else {
            console.error("video can not empty");
        }
    };
    ZegoClient.prototype.bindWindowListener = function () {
        var _this = this;
        //防止，暴力退出（关闭或刷新页面）
        var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
        var eventName = isOnIOS ? "pagehide" : "beforeunload";
        window.addEventListener(eventName, function (event) {
            window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
            for (var key in _this.streamCenter.publisherList) {
                _this.stopPublishingStream(key);
            }
            for (var key in _this.streamCenter.playerList) {
                _this.stopPublishingStream(key);
            }
            console.log(_this.streamCenter.playerList);
            console.log(_this.streamCenter.publisherList);
            _this.logout();
        });
        window.addEventListener('message', function (event) {
            var _a = event.data, type = _a.type, streamId = _a.streamId, canRequestAudioTrack = _a.canRequestAudioTrack, origin = event.origin;
            if (type === 'SS_DIALOG_SUCCESS') { //user chose a stream
                _this.screenStreamFrom(streamId, canRequestAudioTrack, client_util_1.ClientUtil.actionSuccessCallback('screenShare', _this.stateCenter.callbackList));
            }
            if (type === 'SS_DIALOG_CANCEL') {
                _this.logger.error('zc.b.ss ' + type);
                client_util_1.ClientUtil.actionSuccessCallback('screenShare', _this.stateCenter.callbackList)(false, null, type);
            }
        });
    };
    ZegoClient.screenShotReady = false;
    return ZegoClient;
}(index_1.BaseCenter));
exports.ZegoClient = ZegoClient;
// listen for messages from the content-script
window.addEventListener('message', function (event) {
    var _a = event.data, type = _a.type, streamId = _a.streamId, origin = event.origin;
    // NOTE: you should discard foreign events
    if (origin !== window.location.origin) {
        console.warn('ScreenStream: you should discard foreign event from origin:', origin);
        // return;
    }
    // content-script will send a 'SS_PING' msg if extension is installed
    if (type === 'SS_PING') {
        ZegoClient.screenShotReady = true;
    }
});


/***/ }),

/***/ "./sdk/webrtc/zego.logger.webrtc.ts":
/*!******************************************!*\
  !*** ./sdk/webrtc/zego.logger.webrtc.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var zego_logger_1 = __webpack_require__(/*! ../common/zego.logger */ "./sdk/common/zego.logger.ts");
var LoggerWeb = /** @class */ (function (_super) {
    __extends(LoggerWeb, _super);
    function LoggerWeb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoggerWeb.prototype.openWebSocketLogServer = function (url) {
        if (this.url != url) {
            this.url = url;
            if (!url)
                return;
            if (this.websocket == null || this.websocket.readyState == 2 || this.websocket.readyState == 3) {
            }
            else {
                return;
            }
            this.stopWebSocketServer();
            this.websocket = new WebSocket(url);
            this.websocket.onopen = function (evt) {
            };
            this.websocket.onclose = function (evt) {
                console.error("onclose   websocket error:", evt);
            };
            this.websocket.onmessage = function (evt) {
            };
            this.websocket.onerror = function (err) {
                console.error("open log websocket error:" + err);
            };
        }
    };
    LoggerWeb.prototype.SendHttpsLog = function () {
        var _this = this;
        if (this.logCacheSend.length == 0) {
            return;
        }
        var uploadData = this.logCacheSend.join("\n");
        //console.log("url " + this.url);
        //console.log(uploadData);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    if (xmlhttp.responseText.length == 0) {
                        return;
                    }
                    try {
                        var json = JSON.parse(xmlhttp.responseText);
                        var interval = json.interval;
                        if (typeof interval === "number" && _this.logUploadInterval !== interval) {
                            _this.timeInterval = interval;
                            _this.openHttpsLogServer(_this.url);
                        }
                    }
                    catch (e) {
                        console.log("send result failed " + e);
                    }
                }
                else {
                    console.log("send failed " + xmlhttp.status);
                }
            }
        };
        xmlhttp.open("POST", this.url, true);
        xmlhttp.send(uploadData);
        this.logCacheSend = [];
    };
    LoggerWeb.prototype.logReportParamList = function (level, logInfo) {
        var t = new Date();
        var stringTime = t.getFullYear() + "/";
        stringTime += (zego_logger_1.D[t.getMonth() + 1] || t.getMonth() + 1) + "/";
        stringTime += (zego_logger_1.D[t.getDate()] || t.getDate()) + " ";
        stringTime += (zego_logger_1.D[t.getHours()] || t.getHours()) + ":";
        stringTime += (zego_logger_1.D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (zego_logger_1.D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;
        logInfo["time"] = stringTime;
        logInfo["level"] = level;
        logInfo["console"] = "rtc";
        logInfo["appid"] = this.appid;
        logInfo["roomid"] = this.roomid;
        logInfo["userid"] = this.userid;
        logInfo["id_name"] = this.userid;
        logInfo["userName"] = this.userName;
        logInfo["sessionid"] = this.sessionid;
        logInfo["version"] = this.version;
        return [JSON.stringify(logInfo)];
    };
    return LoggerWeb;
}(zego_logger_1.Logger));
exports.LoggerWeb = LoggerWeb;


/***/ }),

/***/ "./sdk/webrtc/zego.play.web.ts":
/*!*************************************!*\
  !*** ./sdk/webrtc/zego.play.web.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ../common/zego.extern */ "./sdk/common/zego.extern.ts");
var sdpUtil_1 = __webpack_require__(/*! ../util/sdpUtil */ "./sdk/util/sdpUtil.ts");
var ZegoPlayWeb = /** @class */ (function () {
    function ZegoPlayWeb(log, signal, dataReport, qualityTimeInterval) {
        this.state = zego_entity_1.ENUM_PLAY_STATE.stop;
        this.candidateInfo = [];
        this.waitICETimer = null;
        this.waitingICETimeInterval = 5000;
        this.waitingOfferTimer = null;
        this.waitingOfferTimeInterval = 5000;
        this.waitingServerTimer = null;
        this.waitingServerTimerInterval = 3000;
        // waitingAnswerTimer: number;
        // waitingAnswerTimeInterval = 0;
        this.qualityTimer = null;
        this.playQualityList = [];
        this.maxQualityListCount = 10;
        this.lastPlayStats = {
            audioPacketsLost: 0,
            videoPacketsLost: 0,
            time: 0,
            audioTime: 0,
            videoTime: 0,
            audioBytesReceived: 0,
            videoBytesReceived: 0,
            framesDecoded: 0,
            framesReceived: 0,
            framesDropped: 0
        };
        this.reportSeq = zego_extern_1.getSeq();
        this.videoSizeCallback = false;
        this.qualityUpload = false;
        this.qualityUploadInterval = 30 * 1000;
        this.qualityUploadLastTime = 0;
        //retry
        this.maxRetryCount = 3;
        this.currentRetryCount = 0;
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.didNotStart;
        this.closeSessionSignal = false;
        this.logger = log;
        this.signal = signal;
        this.dataReport = dataReport;
        this.qualityTimeInterval = qualityTimeInterval;
        dataReport.newReport(this.reportSeq);
    }
    /*
     *    "zp.sad.1": "ZegoPlayWeb.setAudioDestination"
     */
    ZegoPlayWeb.prototype.setAudioDestination = function (audioOutput) {
        var _this = this;
        if (!this.remoteVideo) {
            this.logger.info('zp.sad.1 no remoteVideo');
            return false;
        }
        if (this.remoteVideo.sinkId !== 'undefined') {
            this.remoteVideo.setSinkId(audioOutput).then(function () {
                _this.logger.info('zp.sad.1 success device: ' + audioOutput);
                // this.audioOutput = audioOutput;
            }).catch(function (error) {
                _this.logger.info('zp.sad.1 ' + error.name);
            });
            return true;
        }
        else {
            this.logger.error('zp.sad.1 browser does not suppport');
            return false;
        }
    };
    ;
    /*
     *    "zp.sp.1": "ZegoPlayWeb.startPlay"
     */
    ZegoPlayWeb.prototype.startPlay = function (streamId, remoteVideo, audioOutput, playOption) {
        var _this = this;
        this.logger.info('zp.sp.1 called ', streamId);
        if (!streamId) {
            this.logger.warn('zp.sp.1 streamId is null');
            return;
        }
        this.streamId = streamId;
        this.remoteVideo = remoteVideo;
        this.audioOutput = audioOutput;
        this.playOption = playOption || {};
        if (playOption && playOption.videoDecodeType) {
            this.playOption.videoDecodeType = playOption.videoDecodeType;
        }
        //create session
        this.sessionSeq = zego_extern_1.getSeq();
        this.dataReport.eventStart(this.reportSeq, 'CreateSession');
        this.signal.createSession(this.sessionSeq, 1, 0, streamId, playOption && playOption.streamParams, function (seq, sessionId, data) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'CreateSession', {
                sessionId: data.session_id
            });
            _this.logger.info('zp.sp.1 sessionId:' + data.session_id);
            if (_this.sessionSeq != seq) {
                _this.logger.error('zp.sp.1 seq is not match.');
                return;
            }
            if (data.result !== 0) {
                _this.logger.error('zp.sp.1 create error');
                _this.playStateUpdateError(zego_extern_1.playErrorList.CREATE_SESSION_ERROR);
            }
            else {
                _this.sessionId = data.session_id;
                _this.onCreatePlaySessionSuccess(data);
            }
        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'CreateSession', {
                error: err
            });
            _this.playStateUpdateError(zego_extern_1.playErrorList.SEND_SESSION_TIMEOUT);
        });
        this.state = zego_entity_1.ENUM_PLAY_STATE.waitingSessionRsp;
        this.logger.debug('zp.sp.1 called success');
    };
    ;
    //////////////////////////////////////////////////////////////////////////////////////////////
    // create session result
    /*
     *    "zp.ops.1": "ZegoPlayWeb.onCreatePlaySessionSuccess"
     */
    ZegoPlayWeb.prototype.onCreatePlaySessionSuccess = function (data) {
        var _this = this;
        this.logger.info('zp.ops.1 success');
        var urls = [];
        if (data.turn_server)
            urls.push(data.turn_server);
        if (data.stun_server)
            urls.push(data.stun_server);
        var configuration = {
            iceTransportPolicy: 'relay',
            iceServers: [{
                    urls: urls,
                    username: data.turn_username,
                    credential: data.turn_auth_key
                }]
        };
        this.logger.info('zp.ops.1 username: ' + data.turn_username);
        this.logger.info('zp.ops.1 credential: ' + data.turn_auth_key);
        this.peerConnection = new RTCPeerConnection(configuration);
        this.peerConnection.onicecandidate = function (e) {
            _this.onIceCandidate(e);
        };
        this.peerConnection.onsignalingstatechange = function (e) {
            _this.onConnectionStateChange(e);
        };
        this.peerConnection.oniceconnectionstatechange = function (e) {
            _this.onIceConnectionStateChange(e);
        };
        this.peerConnection.ontrack = function (e) {
            _this.onGotRemoteStream(e.streams[0]);
        };
        // this.peerConnection.onaddstream = (e) => {
        //         console.warn('onaddstream',e);
        //         this.onGotRemoteStream (e.stream);
        // };
        this.remoteVideo.oncanplay = function () {
            _this.logger.debug('zp.ops.1 ' + _this.remoteVideo.videoWidth + ' X ' + _this.remoteVideo.videoHeight);
            if (!_this.videoSizeCallback) {
                _this.logger.debug('zp.ops.1 onresize callback');
                _this.onVideoSizeChanged(_this.streamId, _this.remoteVideo.videoWidth, _this.remoteVideo.videoHeight);
                _this.videoSizeCallback = true;
            }
        };
        var offerOptions = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1,
        };
        if (this.playOption && this.playOption.playType === 'audio')
            offerOptions.offerToReceiveVideo = 0;
        if (this.playOption && this.playOption.playType === 'video')
            offerOptions.offerToReceiveAudio = 0;
        this.logger.info('zp.ops.1 createOffer: ' + offerOptions);
        //create offer
        this.dataReport.eventStart(this.reportSeq, 'CreateOffer');
        this.peerConnection.createOffer(offerOptions).then(function (desc) {
            _this.dataReport.eventEnd(_this.reportSeq, 'CreateOffer');
            _this.onCreateOfferSuccess(desc);
        }, function (error) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'CreateOffer', {
                error: error.toString()
            });
            _this.logger.error('zp.ops.0 create offer error ' + error.toString());
            _this.playStateUpdateError(zego_extern_1.playErrorList.CREATE_OFFER_ERROR);
        });
        //register callback
        this.signal.registerPushCallback('MediaDescPush', this.sessionId, function (seq, sessionId, data) {
            _this.onRecvMediaDesc(seq, sessionId, data);
        });
        this.signal.registerPushCallback('CandidateInfoPush', this.sessionId, function (seq, sessionId, data) {
            _this.onRecvCandidateInfo(seq, sessionId, data);
        });
        this.signal.registerPushCallback('CloseSessionPush', this.sessionId, function (seq, sessionId, data) {
            _this.onRecvCloseSession(seq, sessionId, data);
        });
        // this.signal.registerPushCallback("WebSocketDisconnect", this.sessionId, onDisconnect, this);
        this.signal.registerPushCallback('SessionResetPush', this.sessionId, function (seq, sessionId, data) {
            _this.onRecvResetSession(seq, sessionId, data);
        });
        this.logger.debug('zp.ops.1 call success');
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // create offer result
    /*
     *    "zp.oco.1": "ZegoPlayWeb.onCreateOfferSuccess"
     */
    ZegoPlayWeb.prototype.onCreateOfferSuccess = function (desc) {
        //desc.sdp = sdpUtil.zegoSdp(desc.sdp);
        var _this = this;
        //this.logger.info ("zp.oco.1 localSdp ", desc.sdp);
        this.logger.info('zp.oco.1 localSdp1 ' + desc.sdp.substr(0, desc.sdp.length / 2));
        this.logger.info('zp.oco.1 localSdp2 ' + desc.sdp.substr(desc.sdp.length / 2));
        desc.sdp = desc.sdp.replace(/sendrecv/g, 'recvonly');
        if (this.playOption.videoDecodeType) {
            desc.sdp = sdpUtil_1.sdpUtil.getSDPByVideDecodeType(desc.sdp, this.playOption.videoDecodeType);
        }
        this.dataReport.eventStart(this.reportSeq, 'SetLocalDescription');
        this.peerConnection.setLocalDescription(desc).then(function () {
            _this.dataReport.eventEnd(_this.reportSeq, 'SetLocalDescription');
            _this.onSetLocalDescriptionSuccess(desc);
        }, function (error) {
            _this.logger.error('zp.oca.1 set error ' + error.toString());
            _this.dataReport.eventEnd(_this.reportSeq, 'SetLocalDescription', {
                error: error.toString()
            });
            _this.playStateUpdateError(zego_extern_1.playErrorList.SET_LOCAL_DESC_ERROR);
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // setLocalDescription result
    /*
     *    "zp.osd.1": "ZegoPlayWeb.onSetLocalDescriptionSuccess"
     */
    ZegoPlayWeb.prototype.onSetLocalDescriptionSuccess = function (desc) {
        var _this = this;
        this.logger.info('zp.osd.1 success');
        var mediaDescription = {
            sdp: desc.sdp
        };
        this.answerSeq = zego_extern_1.getSeq();
        this.dataReport.eventStart(this.reportSeq, 'SendMediaDesc');
        this.signal.sendMediaDesc(this.answerSeq, this.sessionId, 0, mediaDescription, function (seq, sessionId, data) {
            if (_this.answerSeq != seq || _this.sessionId != sessionId) {
                _this.logger.error('zp.osd.1 seq or sessionId is not equal ' + _this.answerSeq + ' ' + seq, +' ' + _this.sessionId + ' ' + sessionId);
                return;
            }
            _this.logger.info('zp.osd.1 send success');
            _this.dataReport.eventEnd(_this.reportSeq, 'SendMediaDesc');
            //setTimer
            _this.waitingOfferTimer = setTimeout(function () {
                if (_this.state == zego_entity_1.ENUM_PLAY_STATE.waitingOffserRsp) {
                    _this.logger.error('zp.osd.1 waiting timeout');
                    _this.playStateUpdateError(zego_extern_1.playErrorList.SERVER_CANDIDATE_TIMEOUT);
                }
            }, _this.waitingOfferTimeInterval);
            _this.state = zego_entity_1.ENUM_PLAY_STATE.waitingServerAnswer;
        }, function (err, seq) {
            _this.logger.error('zp.osd.1 failed to send ' + err);
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'SendMediaDesc', {
                error: err
            });
            _this.playStateUpdateError(zego_extern_1.playErrorList.SEND_MEDIA_DESC_TIMEOUT);
        });
        this.state = zego_entity_1.ENUM_PLAY_STATE.waitingOffserRsp;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push offer (setRemoteDescription)
    /*
     *    "zp.orm.1": "ZegoPlayWeb.onRecvMediaDesc"
     */
    ZegoPlayWeb.prototype.onRecvMediaDesc = function (seq, sessionId, data) {
        var _this = this;
        this.logger.info('zp.orm.1 received ', data);
        if (this.state !== zego_entity_1.ENUM_PLAY_STATE.waitingServerAnswer) {
            this.logger.error('zp.orm.1 current state ' + this.state + ' not allowed');
            return;
        }
        if (this.waitingOfferTimer != null) {
            clearTimeout(this.waitingOfferTimer);
            this.waitingOfferTimer = null;
        }
        this.dataReport.addEvent(this.reportSeq, 'RecvMediaDesc');
        this.signal.sendMediaDescAck(seq, this.sessionId, 0);
        var offerDescription = {
            type: 'answer',
            sdp: data.sdp,
            toJSON: function () {
            }
        };
        //setRemoteDescritpion
        this.dataReport.eventStart(this.reportSeq, 'SetRemoteDescription');
        this.logger.info('zp.orm.1 remoteSdp ', offerDescription.sdp);
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription)).then(function () {
            _this.dataReport.eventEnd(_this.reportSeq, 'SetRemoteDescription');
            _this.logger.info('zp.orm.1 set success');
        }, function (error) {
            _this.logger.error('zp.orm.1 set remote error ' + error.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'SetRemoteDescription', {
                error: error.toString()
            });
            _this.playStateUpdateError(zego_extern_1.playErrorList.SET_REMOTE_DESC_ERROR);
        });
        //send candidate
        this.sendCandidateInfo(this.candidateInfo);
        this.candidateInfo = [];
        //setTimer
        this.waitICETimer = setTimeout(function () {
            if (_this.state == zego_entity_1.ENUM_PLAY_STATE.waitingServerICE) {
                _this.logger.error('zp.orm.1 waiting server timeout');
                _this.playStateUpdateError(zego_extern_1.playErrorList.SERVER_CANDIDATE_TIMEOUT);
            }
        }, this.waitingICETimeInterval);
        this.state = zego_entity_1.ENUM_PLAY_STATE.waitingServerICE;
        this.logger.debug('zp.orm.1 call success');
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push ICE (addIceCandidate)
    /*
     *    "zp.orci.1": "ZegoPlayWeb.onRecvCandidateInfo"
     */
    ZegoPlayWeb.prototype.onRecvCandidateInfo = function (seq, sessionId, data) {
        var _this = this;
        this.logger.debug('zp.orci.1 received ');
        if (this.state != zego_entity_1.ENUM_PLAY_STATE.waitingServerICE) {
            this.logger.warn('zp.orci.1 current state ' + this.state + ' not allowed');
            return;
        }
        if (this.waitICETimer != null) {
            clearTimeout(this.waitICETimer);
            this.waitICETimer = null;
        }
        this.dataReport.addEvent(this.reportSeq, 'RecvIceCandidate');
        this.signal.sendCandidateInfoAck(seq, this.sessionId, 0);
        for (var i = 0; i < data.infos.length; i++) {
            var ice = {
                sdpMid: data.infos[i].sdpMid,
                sdpMLineIndex: data.infos[i].sdpMLineIndex,
                candidate: data.infos[i].candidate
            };
            this.logger.debug('zp.orci.1 candidate ' + ice.candidate);
            this.peerConnection.addIceCandidate(new RTCIceCandidate(ice)).then(function () {
                _this.logger.debug('zp.orci.1 add success');
            }, function (error) {
                _this.logger.error('zp.orci.1 add error ' + error.toString());
                _this.playStateUpdateError(zego_extern_1.playErrorList.SERVER_CANDIDATE_ERROR);
            });
        }
        this.state = zego_entity_1.ENUM_PLAY_STATE.connecting;
        this.logger.debug('zp.orci.1 call success');
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceCandidate callback
    /*
     *    "zp.oic.1": "ZegoPlayWeb.onIceCandidate"
     */
    ZegoPlayWeb.prototype.onIceCandidate = function (event) {
        this.logger.info('zp.oic.1 called');
        //send candidate to other peer
        if (event.candidate == undefined) {
            return;
        }
        this.logger.debug('zp.oic.1 candidate ' + event.candidate.candidate);
        if (this.state < zego_entity_1.ENUM_PLAY_STATE.waitingServerICE || this.state == zego_entity_1.ENUM_PLAY_STATE.stop) {
            //save candidate Info
            this.logger.debug('zp.oic.1 cached');
            this.candidateInfo.push({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            });
        }
        else {
            this.logger.debug('zp.oic.1 send');
            var candidate = {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            };
            this.sendCandidateInfo([candidate]);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceStateChange callback
    /*
     *    "zp.ocs.1": "ZegoPlayWeb.onConnectionStateChange"
     */
    ZegoPlayWeb.prototype.onConnectionStateChange = function (event) {
        this.logger.info('zp.oisc.1 called ' + event.target.signalingState);
    };
    /*
     *    "zp.oics.1": "ZegoPlayWeb.onIceConnectionStateChange"
     */
    ZegoPlayWeb.prototype.onIceConnectionStateChange = function (event) {
        if (this.state == zego_entity_1.ENUM_PLAY_STATE.stop || this.peerConnection == null) {
            return;
        }
        this.logger.info('zp.oisc.1  stateChanged ' + this.peerConnection.iceConnectionState);
        if (this.peerConnection.iceConnectionState === 'connected') {
            this.dataReport.addEvent(this.reportSeq, 'IceConnected');
            if (this.state != zego_entity_1.ENUM_PLAY_STATE.playing) {
                this.onPlayStateUpdate(zego_extern_1.ENUM_PLAY_STATE_UPDATE.start, this.streamId);
            }
            this.state = zego_entity_1.ENUM_PLAY_STATE.playing;
            if (this.retryState != zego_entity_1.ENUM_RETRY_STATE.didNotStart) {
                this.retryState = zego_entity_1.ENUM_RETRY_STATE.finished;
                this.currentRetryCount = 0;
            }
            //play started
            this.dataReport.eventStart(this.reportSeq, 'PlayState');
            //start quality timeInterval
            this.setPlayQualityTimer();
        }
        else if (this.peerConnection.iceConnectionState === 'closed') {
            this.dataReport.addEvent(this.reportSeq, 'IceClosed');
            this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState);
        }
        else if (this.peerConnection.iceConnectionState === 'failed') {
            this.dataReport.addEvent(this.reportSeq, 'IceFailed');
            this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState);
        }
    };
    ZegoPlayWeb.prototype.checkPlayConnectionFailedState = function (connectionState) {
        var state = null;
        if (connectionState == 'failed') {
            state = zego_extern_1.playErrorList.MEDIA_CONNECTION_FAILED;
        }
        else if (connectionState == 'closed') {
            state = zego_extern_1.playErrorList.MEDIA_CONNECTION_CLOSED;
        }
        if (state == null) {
            return;
        }
        if (this.state != zego_entity_1.ENUM_PLAY_STATE.playing && this.retryState == zego_entity_1.ENUM_PLAY_STATE.didNotStart) {
            this.logger.info('zp.oics.1  state ' + this.state + ' retryState ' + this.retryState + ' connectionState ' + connectionState);
            this.playStateUpdateError(state);
        }
        else {
            if (this.shouldRetryPlay()) {
                this.onPlayStateUpdate(zego_extern_1.ENUM_PLAY_STATE_UPDATE.retry, this.streamId);
                this.startRetryPlay();
            }
            else {
                this.playStateUpdateError(state);
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // retry play
    /*
     *    "zp.srp.1.0": "ZegoPlayWeb.shouldRetryPlay"
     */
    ZegoPlayWeb.prototype.shouldRetryPlay = function () {
        if (this.retryState == zego_entity_1.ENUM_RETRY_STATE.didNotStart && this.state != zego_entity_1.ENUM_PLAY_STATE.playing) {
            this.logger.info('zp.srp.1.0 connection didn\'t success');
            return false;
        }
        if (this.retryState == zego_entity_1.ENUM_RETRY_STATE.retrying) {
            this.logger.info('zp.srp.0.0 already retrying');
            return false;
        }
        if (this.currentRetryCount > this.maxRetryCount) {
            this.logger.info('zp.srp.1.0 beyond max');
            return false;
        }
        this.logger.debug('zp.srp.1.0 call success');
        return true;
    };
    /*
     *    "zp.srp.1": "ZegoPlayWeb.startRetryPlay"
     */
    ZegoPlayWeb.prototype.startRetryPlay = function () {
        this.logger.debug('zp.srp.0 call');
        var streamId = this.streamId;
        var remoteVideo = this.remoteVideo;
        var audioOutput = this.audioOutput;
        this.resetPlay();
        this.tryStartPlay(streamId, remoteVideo, audioOutput);
    };
    ZegoPlayWeb.prototype.clearTryPlayTimer = function () {
        if (this.waitingServerTimer != null) {
            clearTimeout(this.waitingServerTimer);
            this.waitingServerTimer = null;
        }
    };
    /*
    *    "zp.tsp.1": "ZegoPublish.tryStartPlay"
    */
    ZegoPlayWeb.prototype.tryStartPlay = function (streamId, remoteVideo, audioOputput) {
        var _this = this;
        this.logger.debug('zp.tsp.1 call');
        this.clearTryPlayTimer();
        this.streamId = streamId;
        this.remoteVideo = remoteVideo;
        this.audioOutput = audioOputput;
        if (this.currentRetryCount > this.maxRetryCount) {
            this.logger.error('zp.tsp.1 beyond max limit');
            //callback error
            this.playStateUpdateError(zego_extern_1.playErrorList.WEBSOCKET_ERROR);
            return;
        }
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.retrying;
        this.currentRetryCount += 1;
        if (this.signal.isServerConnected()) {
            this.logger.debug('zp.tsp.1 signal connected');
            this.startPlay(streamId, this.remoteVideo, this.audioOputput);
        }
        else {
            //setTimer
            this.logger.debug('zp.tsp.1 signal server not connected');
            this.waitingServerTimer = setTimeout(function () {
                _this.tryStartPlay(streamId, _this.remoteVideo, _this.audioOputput);
            }, this.waitingServerTimerInterval);
        }
    };
    ZegoPlayWeb.prototype.clearPlayQualityTimer = function () {
        if (this.qualityTimer != null) {
            clearInterval(this.qualityTimer);
            this.qualityTimer = null;
        }
        this.lastPlayStats = {
            audioPacketsLost: null,
            videoPacketsLost: null,
            time: null,
            audioTime: null,
            videoTime: null,
            audioBytesReceived: null,
            videoBytesReceived: null,
            framesDecoded: null,
            framesDropped: null,
            framesReceived: null
        };
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // reset function
    /*
     *    "zp.rp.1": "ZegoPlayWeb.resetPlay"
     */
    ZegoPlayWeb.prototype.resetPlay = function () {
        this.logger.info('zp.rp.1 call');
        this.streamId = null;
        this.state = zego_entity_1.ENUM_PLAY_STATE.stop;
        if (this.peerConnection != undefined) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.waitingOfferTimer != null) {
            clearTimeout(this.waitingOfferTimer);
            this.waitingOfferTimer = null;
        }
        if (this.waitICETimer != null) {
            clearTimeout(this.waitICETimer);
            this.waitICETimer = null;
        }
        this.clearPlayQualityTimer();
        if (this.remoteVideo) {
            this.remoteVideo.srcObject = null;
            this.remoteVideo.oncanplay = null;
            this.remoteVideo = null;
        }
        this.audioOputput = null;
        if (this.signal) {
            this.signal.unregisterPushCallback('MediaDescPush', this.sessionId);
            this.signal.unregisterPushCallback('CandidateInfoPush', this.sessionId);
            this.signal.unregisterPushCallback('CloseSessionPush', this.sessionId);
            // this.signal.unregisterPushCallback('WebSocketDisconnect', this.sessionId);
        }
        // this.sessionId = 0;
        this.sessionSeq = 0;
        this.answerSeq = 0;
        this.videoSizeCallback = false;
        this.currentRetryCount = 0;
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.didNotStart;
        this.clearTryPlayTimer();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // quality timer
    /*
     *    "zp.spq.1": "ZegoPlayWeb.setPlayQualityTimer"
     */
    ZegoPlayWeb.prototype.setPlayQualityTimer = function () {
        var _this = this;
        if (this.qualityTimer != null) {
            return;
        }
        this.logger.debug('zp.spq.1 startTimer');
        this.clearPlayQualityTimer();
        this.qualityTimer = setInterval(function () {
            if (_this.peerConnection) {
                _this.peerConnection.getStats(null).then(function (results) {
                    _this.getPlayStats(results);
                }, function (error) {
                    _this.logger.info('zp.spq.1 getStats error ' + error.toString());
                });
            }
        }, this.qualityTimeInterval);
        this.lastPlayStats = {
            audioPacketsLost: 0,
            videoPacketsLost: 0,
            time: 0,
            audioTime: 0,
            videoTime: 0,
            audioBytesReceived: 0,
            videoBytesReceived: 0,
            framesDecoded: 0,
            framesReceived: 0,
            framesDropped: 0
        };
    };
    /*
     *    "zp.gps.1": "ZegoPlayWeb.getPlayStats"
     */
    ZegoPlayWeb.prototype.getPlayStats = function (results) {
        var _this = this;
        if (results == undefined) {
            return;
        }
        var playData = {
            audioFractionLost: null,
            audioPacketsLost: 0,
            audioPacketsLostRate: 0,
            audioBitrate: 0,
            audioLevel: 0,
            audioSendLevel: 0,
            audioSamplingRate: 0,
            audioCodecType: 'opus',
            audioQuality: null,
            videoQuality: null,
            videoPacketsLostRate: 0,
            videoBitrate: 0,
            videoFPS: 0,
            playData: 0,
            nackCount: 0,
            pliCount: 0,
            //sliCount: 0,
            audioJitter: 0,
            videoFractionLost: null,
            videoFramesDecoded: 0,
            frameHeight: 0,
            frameWidth: 0,
            videoTransferFPS: 0,
            videoFramesDropped: 0,
            totalRoundTripTime: 0,
            currentRoundTripTime: 0
        };
        var time = this.lastPlayStats.time;
        var rtt = null;
        results.forEach(function (result) {
            if ((result.type == 'inbound-rtp' || (result.type == 'ssrc' && result.bytesReceived != undefined)) && (result.mediaType == 'audio' || result.id.indexOf('AudioStream') >= 0)) {
                //audio
                //debugger
                if (time != 0) {
                    playData['audioBitrate'] = 8 * (result.bytesReceived - _this.lastPlayStats['audioBytesReceived']) / (result.timestamp - time);
                }
                if (playData['audioBitrate'] < 0) {
                    playData['audioBitrate'] = 0;
                }
                playData.audioJitter = result.jitter;
                playData.audioPacketsLost = result.packetsLost;
                playData.audioFractionLost = result.fractionLost;
                playData.audioPacketsLostRate = (result.packetsLost - _this.lastPlayStats.audioPacketsLost) / (result.timestamp - _this.lastPlayStats.audioTime);
                _this.lastPlayStats.audioBytesReceived = result.bytesReceived;
                _this.lastPlayStats.audioPacketsLost = result.packetsLost;
                _this.lastPlayStats.audioTime = result.timestamp;
                _this.lastPlayStats.time = result.timestamp;
            }
            else if ((result.type == 'inbound-rtp' || (result.type == 'ssrc' && result.bytesReceived != undefined)) && (result.mediaType == 'video' || result.id.indexOf('VideoStream') >= 0)) {
                //video
                if (time != 0) {
                    playData.videoBitrate = 8 * (result.bytesReceived - _this.lastPlayStats.videoBytesReceived) / (result.timestamp - time);
                    playData.videoFPS = 1000 * (result.framesDecoded - _this.lastPlayStats.framesDecoded) / (result.timestamp - time);
                }
                if (playData.videoBitrate < 0) {
                    playData.videoBitrate = 0;
                }
                if (playData.videoFPS < 0) {
                    playData.videoFPS = 0;
                }
                //playData.jitter = result.jitter;
                playData.nackCount = result.nackCount;
                playData.pliCount = result.pliCount;
                //playData.sliCount = result.sliCount;
                playData.videoFractionLost = result.fractionLost;
                playData.videoFramesDecoded = result.framesDecoded;
                playData.videoPacketsLostRate = (result.packetsLost - _this.lastPlayStats.videoPacketsLost) / (result.timestamp - _this.lastPlayStats.videoTime);
                _this.lastPlayStats.videoBytesReceived = result.bytesReceived;
                _this.lastPlayStats.framesDecoded = result.framesDecoded;
                _this.lastPlayStats.videoPacketsLost = result.packetsLost;
                _this.lastPlayStats.videoTime = result.timestamp;
                _this.lastPlayStats.time = result.timestamp;
            }
            else if (result.type == 'track' && (result.kind == 'video' || result.id.indexOf('video') >= 0)) {
                playData.frameHeight = result.frameHeight;
                playData.frameWidth = result.frameWidth;
                if (time != 0) {
                    playData.videoTransferFPS = 1000 * (result.framesReceived - _this.lastPlayStats.framesReceived) / (result.timestamp - time);
                    playData.videoFramesDropped = result.framesDropped - _this.lastPlayStats.framesDropped;
                }
                if (playData.videoTransferFPS < 0) {
                    playData.videoTransferFPS = 0;
                }
                if (playData.videoFramesDropped < 0) {
                    playData.videoFramesDropped = 0;
                }
                _this.lastPlayStats.framesReceived = result.framesReceived;
                _this.lastPlayStats.framesDropped = result.framesDropped;
            }
            else if (result.type == "track" && (result.kind == "audio" || result.id.indexOf("audio") >= 0)) {
                playData.audioLevel = result.audioLevel;
                playData.audioSendLevel = result.totalAudioEnergy;
                playData.audioSamplingRate = result.totalSamplesDuration;
            }
            else if (result.type == 'candidate-pair') {
                if (result.totalRoundTripTime != undefined) {
                    playData.totalRoundTripTime = result.totalRoundTripTime;
                }
                if (result.currentRoundTripTime != undefined) {
                    playData.currentRoundTripTime = result.currentRoundTripTime;
                    rtt = playData.currentRoundTripTime * 1000;
                }
            }
        });
        playData.audioQuality = this.getNetQuality(rtt, playData.audioFractionLost);
        playData.videoQuality = this.getNetQuality(rtt, playData.videoFractionLost);
        // this.logger.debug("zp.gps.1 audio: " + playData.audioBitrate + " video: " + playData.videoBitrate +
        // " FPS: " + playData.videoFPS + " transfer: " + playData.videoTransferFPS);
        this.uploadPlayQuality(playData);
        if (time != 0) {
            this.onPlayQualityUpdate(this.streamId, playData);
        }
    };
    ZegoPlayWeb.prototype.getNetQuality = function (rtt, fractionLost) {
        var netQuality = 0;
        if (rtt && rtt < 600) {
            if (fractionLost > 0.4) {
                netQuality = 2;
            }
            else if (fractionLost > 0.3) {
                netQuality = 4;
            }
            else {
                netQuality = 5;
            }
        }
        else if (rtt < 900) {
            if (fractionLost > 0.4) {
                netQuality = 2;
            }
            else if (fractionLost > 0.2) {
                netQuality = 3;
            }
            else {
                netQuality = 4;
            }
        }
        else {
            if (fractionLost > 0.2) {
                netQuality = 2;
            }
            else {
                netQuality = 3;
            }
        }
        return netQuality;
    };
    /*
     *    "zp.upq.1": "ZegoPlayWeb.uploadPlayQuality"
     */
    ZegoPlayWeb.prototype.uploadPlayQuality = function (playData) {
        var _this = this;
        if (!this.qualityUpload) {
            return;
        }
        var timeStamp = Date.parse(new Date() + '');
        if (this.qualityUploadLastTime == 0 || timeStamp - this.qualityUploadLastTime >= this.qualityUploadInterval) {
            this.logger.debug('zp.upq.1 upload');
            playData['stream_type'] = 'play';
            playData['stream_id'] = this.streamId;
            playData['timeStamp'] = timeStamp / 1000;
            this.signal.QualityReport(zego_extern_1.getSeq(), this.sessionId, playData, function (seq, sessionId, data) {
                if (data.report !== undefined) {
                    _this.qualityUpload = data.report;
                    _this.qualityUploadInterval = data.report_interval_ms;
                }
            }, function (err, seq) {
                _this.logger.info('zp.upq.1 upload failed ' + err);
            });
            this.qualityUploadLastTime = timeStamp;
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push resetSession
    /*
     *    "zp.orrs.1": "ZegoPlayWeb.onRecvResetSession"
     */
    ZegoPlayWeb.prototype.onRecvResetSession = function (seq, sessionId, data) {
        this.logger.info('zp.orrs.1 received ');
        if (sessionId != this.sessionId) {
            this.logger.info('zp.orrs.1 cannot find session');
            return;
        }
        this.dataReport.addEvent(this.reportSeq, 'RecvResetSession');
        //check should retry
        if (this.shouldRetryPlay()) {
            this.startRetryPlay();
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push closeSession
    /*
     *    "zp.orcs.1": "ZegoPlayWeb.onRecvCloseSession"
     */
    ZegoPlayWeb.prototype.onRecvCloseSession = function (seq, sessionId, data) {
        this.logger.info('zp.orcs.1 reason: ' + data.reason);
        this.dataReport.addEvent(this.reportSeq, 'RecvCloseSession');
        this.signal.sendCloseSessionAck(seq, this.sessionId, 0);
        var error = JSON.parse(JSON.stringify(zego_extern_1.playErrorList.SESSION_CLOSED));
        error.msg += data.reason;
        if (data.reason === 24) {
            this.startRetryPlay();
        }
        else {
            this.playStateUpdateError(error);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // onGotRemoteStream callback
    /*
     *    "zp.ogrs.1": "ZegoPlayWeb.onGotRemoteStream"
     */
    ZegoPlayWeb.prototype.onGotRemoteStream = function (stream) {
        this.logger.info('zp.ogrs.0 called ' + stream);
        if (!this.remoteVideo) {
            this.logger.error('zp.ogrs.0 no remoteVideo');
            return;
        }
        this.remoteVideo.srcObject = stream;
        if (this.audioOputput) {
            this.setAudioDestination(this.audioOputput);
        }
        this.dataReport.addEvent(this.reportSeq, 'GetRemoteStream');
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // send candidate Info
    /*
     *    "zp.sci.1": "ZegoPlayWeb.sendCandidateInfo"
     */
    ZegoPlayWeb.prototype.sendCandidateInfo = function (candidateInfo) {
        var _this = this;
        this.logger.debug('zp.sci.1 called');
        candidateInfo = candidateInfo.filter(function (item) {
            if (item.candidate.indexOf('tcp') > 0) {
                return false;
            }
            else if (item.candidate) {
                return true;
            }
        });
        if (!candidateInfo || candidateInfo.length < 1) {
            this.logger.info('zp.sci.1 cancelled');
            return;
        }
        // console.error(candidateInfo);
        this.dataReport.eventStart(this.reportSeq, 'SendIceCandidate');
        this.signal.sendCandidateInfo(zego_extern_1.getSeq(), this.sessionId, candidateInfo, function (seq, sessionId, data) {
            _this.logger.debug('zp.sci.1 send success');
            _this.dataReport.eventEnd(_this.reportSeq, 'SendIceCandidate');
        }, function (err, seq) {
            _this.logger.error('zp.sci.1 failed to send: ' + err.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, 'SendIceCandidate', {
                error: err
            });
            _this.playStateUpdateError(zego_extern_1.playErrorList.SEND_CANDIDATE_ERROR);
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // error function
    ZegoPlayWeb.prototype.shouldSendCloseSession = function (errorCode) {
        if (this.state != zego_extern_1.ENUM_PLAY_STATE_UPDATE.stop && this.state != zego_entity_1.ENUM_PLAY_STATE.waitingSessionRsp) {
            return true;
        }
        return false;
    };
    ZegoPlayWeb.prototype.playStateUpdateError = function (errorCode) {
        this.logger.debug('zp.psue.1 called ', errorCode.code);
        if (this.sessionId != 0 && this.shouldSendCloseSession(errorCode)) {
            this.signal.sendCloseSession(zego_extern_1.getSeq(), this.sessionId, 1);
            this.closeSessionSignal = true;
        }
        this.state = zego_entity_1.ENUM_PLAY_STATE.stop;
        this.onPlayStateUpdate(zego_extern_1.ENUM_PLAY_STATE_UPDATE.error, this.streamId, errorCode);
        this.resetPlay();
    };
    ZegoPlayWeb.prototype.onPlayStateUpdate = function (type, streamId, error) {
    };
    ;
    ZegoPlayWeb.prototype.onPlayQualityUpdate = function (streamId, quality) {
    };
    ;
    ZegoPlayWeb.prototype.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
    };
    ;
    /*
     *    "zp.sp.1.1": "ZegoPlayWeb.stopPlay"
     */
    ZegoPlayWeb.prototype.stopPlay = function () {
        this.logger.debug('zp.sp.1.1 called');
        //send to server
        if (this.sessionId && !this.closeSessionSignal) {
            this.signal.sendCloseSession(zego_extern_1.getSeq(), this.sessionId, 0);
        }
        this.dataReport.eventEndWithMsg(this.reportSeq, 'PlayState', {
            'state': this.state + ''
        });
        this.dataReport.addEvent(this.reportSeq, 'StopPlay');
        this.dataReport.addMsgExt(this.reportSeq, {
            'stream': this.streamId,
            'sessionId': this.sessionId
        });
        this.dataReport.uploadReport(this.reportSeq, 'RTCPlayStream');
        this.resetPlay();
    };
    ;
    /*
     *    "zp.od.1": "ZegoPlayWeb.onDisconnect"
     */
    ZegoPlayWeb.prototype.onDisconnect = function () {
        this.logger.info('zp.od.1 call');
        // if (this.sessionId !== sessionId) {
        //     this.logger.info("zp.od.1 session is not same");
        //     return;
        // }
        this.logger.info('zp.od.1 websocket disconnect');
        this.dataReport.addEvent(this.reportSeq, 'OnDisconnect');
        this.playStateUpdateError(zego_extern_1.playErrorList.WEBSOCKET_ERROR);
    };
    ;
    return ZegoPlayWeb;
}());
exports.ZegoPlayWeb = ZegoPlayWeb;


/***/ }),

/***/ "./sdk/webrtc/zego.preview.ts":
/*!************************************!*\
  !*** ./sdk/webrtc/zego.preview.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var ZegoPreview = /** @class */ (function () {
    function ZegoPreview(log) {
        var _this = this;
        this.log = log;
        this.localVideo = null;
        this.localStream = null;
        this.videoInfo = {};
        this.previewSuc = false;
        /*
         *    "zp.em.2": "enableMicrophone"
         */
        this.enableMicrophone = function (enable) {
            if (!_this.localStream) {
                _this.logger.error('zp.em.2 no localStream');
                return false;
            }
            _this.localStream.getAudioTracks().forEach(function (track) {
                track.enabled = enable;
            });
            _this.logger.debug('zp.em.2 call success');
            return true;
        };
        /*
         *    "zp.ec.2": "enableCamera"
         */
        this.enableCamera = function (enable) {
            if (!_this.localStream) {
                _this.logger.error('zp.ec.2 no localStream');
                return false;
            }
            _this.localStream.getVideoTracks().forEach(function (track) {
                track.enabled = enable;
            });
            _this.logger.debug('zp.ec.2 call success');
            return true;
        };
        /*
         *    "zp.sad.2": "setAudioDestination"
         */
        this.setAudioDestination = function (audioOutput) {
            if (!_this.localVideo) {
                _this.logger.error('zp.sad.2 no localVideo');
                return false;
            }
            if (_this.localVideo.sinkId !== 'undefined') {
                _this.localVideo.setSinkId(audioOutput).then(function () {
                    _this.logger.info('zp.sad.2 success device: ' + audioOutput);
                    // _this.audioOutput = audioOutput;
                }).catch(function (error) {
                    _this.logger.info('zp.sad.2 ' + error.name);
                });
                return true;
            }
            else {
                _this.logger.error('zp.sad.2 browser does not suppport');
                return false;
            }
        };
        this.logger = log;
    }
    /*
     *    "zp.gmsc.2": "getMediaStreamConstraints"
     */
    ZegoPreview.prototype.getMediaStreamConstraints = function (mediaStreamConfig) {
        var mediaStreamConstraints = {
            audio: null,
            video: null,
        };
        mediaStreamConstraints['audio'] = false;
        mediaStreamConstraints['video'] = false;
        console.log('mediaStreamConfig', mediaStreamConfig);
        //audio
        if (mediaStreamConfig.audio) {
            if (mediaStreamConfig.audioInput === undefined
                && mediaStreamConfig.noiseSuppression === undefined
                && mediaStreamConfig.autoGainControl === undefined
                && mediaStreamConfig.echoCancellation === undefined) {
                mediaStreamConstraints.audio = true;
                mediaStreamConstraints.audio.noiseSuppression = true;
                mediaStreamConstraints.audio.autoGainControl = true;
                mediaStreamConstraints.audio.echoCancellation = true;
            }
            else {
                mediaStreamConstraints.audio = {};
                if (mediaStreamConfig.audioInput !== undefined && mediaStreamConfig.audioInput !== null)
                    mediaStreamConstraints.audio.deviceId = mediaStreamConfig.audioInput;
                if (mediaStreamConfig.noiseSuppression !== undefined)
                    mediaStreamConstraints.audio.noiseSuppression = mediaStreamConfig.noiseSuppression;
                if (mediaStreamConfig.autoGainControl !== undefined)
                    mediaStreamConstraints.audio.autoGainControl = mediaStreamConfig.autoGainControl;
                if (mediaStreamConfig.echoCancellation !== undefined)
                    mediaStreamConstraints.audio.echoCancellation = mediaStreamConfig.echoCancellation;
            }
        }
        //video
        if (mediaStreamConfig.video) {
            var width = 640;
            var height = 480;
            var frameRate = 15;
            var bitRate = 800;
            //videoQuality
            //1 QVGA
            if (mediaStreamConfig.videoQuality === 1) {
                width = zego_entity_1.ENUM_RESOLUTION_TYPE.LOW.width;
                height = zego_entity_1.ENUM_RESOLUTION_TYPE.LOW.height;
                frameRate = zego_entity_1.ENUM_RESOLUTION_TYPE.LOW.frameRate;
                bitRate = zego_entity_1.ENUM_RESOLUTION_TYPE.LOW.bitRate;
            }
            //2 VGA
            else if (mediaStreamConfig.videoQuality === 2) {
                width = zego_entity_1.ENUM_RESOLUTION_TYPE.MEDIUM.width;
                height = zego_entity_1.ENUM_RESOLUTION_TYPE.MEDIUM.height;
                frameRate = zego_entity_1.ENUM_RESOLUTION_TYPE.MEDIUM.frameRate;
                bitRate = zego_entity_1.ENUM_RESOLUTION_TYPE.MEDIUM.bitRate;
            }
            //3 HD
            else if (mediaStreamConfig.videoQuality === 3) {
                width = zego_entity_1.ENUM_RESOLUTION_TYPE.HIGH.width;
                height = zego_entity_1.ENUM_RESOLUTION_TYPE.HIGH.height;
                frameRate = zego_entity_1.ENUM_RESOLUTION_TYPE.HIGH.frameRate;
                bitRate = zego_entity_1.ENUM_RESOLUTION_TYPE.HIGH.bitRate;
            }
            //custom
            else if (mediaStreamConfig.videoQuality === 4) {
                width = mediaStreamConfig.width;
                height = mediaStreamConfig.height;
                frameRate = mediaStreamConfig.frameRate;
                bitRate = mediaStreamConfig.bitRate || 800;
            }
            else {
                this.logger.info('zp.gmsc.2 user default');
            }
            //horizontal
            if (mediaStreamConfig.horizontal === true) {
                var temp = height;
                height = width;
                width = temp;
            }
            mediaStreamConstraints.video = {
                width: width,
                height: height,
                frameRate: frameRate,
                bitRate: bitRate
            };
            //facingMode
            if (mediaStreamConfig.facingMode != undefined) {
                mediaStreamConstraints.video.facingMode = mediaStreamConfig.facingMode;
            }
            else if (mediaStreamConfig.videoInput != undefined && mediaStreamConfig.videoInput != null) {
                mediaStreamConstraints.video.deviceId = {
                    exact: mediaStreamConfig.videoInput
                };
            }
            this.logger.info('zp.gmsc.2 width: ' + width + ' height: ' + height + ' rate: ' + frameRate);
        }
        return mediaStreamConstraints;
    };
    /*
     *    "zp.sv.2": "startPreview"
     */
    ZegoPreview.prototype.startPreview = function (localVideo, mediaStreamConfig, successCallback, errorCallback) {
        var _this = this;
        this.logger.debug('zp.sv.2 called');
        this.localVideo = localVideo;
        this.mediaStreamConfig = mediaStreamConfig;
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia == undefined) {
            if (errorCallback) {
                errorCallback('browser don\'t support');
            }
            return;
        }
        //external media stream
        if (mediaStreamConfig.externalMediaStream instanceof MediaStream) {
            this.logger.debug('zp.sv.2 use external media stream');
            this.previewSuc = true;
            this.localStream = mediaStreamConfig.externalMediaStream;
            this.videoInfo = {
                width: mediaStreamConfig.width,
                height: mediaStreamConfig.height,
                frameRate: mediaStreamConfig.frameRate,
                bitRate: mediaStreamConfig.bitRate
            };
            if (successCallback) {
                successCallback();
            }
            return;
        }
        else if (mediaStreamConfig.externalCapture) {
            var result = this.captureStream(localVideo);
            if (result) {
                this.previewSuc = true;
                if (successCallback) {
                    successCallback();
                }
            }
            else {
                if (errorCallback) {
                    errorCallback('browser don\'t support');
                }
            }
            return;
        }
        var mediaStreamConstraints = this.getMediaStreamConstraints(mediaStreamConfig);
        this.videoInfo = mediaStreamConstraints.video;
        this.logger.info('zp.sv.2 ', JSON.stringify(mediaStreamConstraints));
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(function (stream) {
            _this.logger.info('zp.sv.2 success');
            if (!_this.localVideo) {
                _this.logger.info('zp.sv.2 no localVideo');
                if (errorCallback) {
                    errorCallback('no localVideo');
                }
                return;
            }
            _this.localVideo.srcObject = stream;
            _this.localStream = stream;
            _this.previewSuc = true;
            if (successCallback) {
                successCallback();
            }
        }, function (error) {
            _this.logger.info('zp.sv.2 failed');
            if (errorCallback) {
                errorCallback(error.name);
            }
        });
    };
    ;
    /*
     *    "zp.cs.2": "captureStream"
     */
    ZegoPreview.prototype.captureStream = function (localVideo) {
        if (!localVideo) {
            this.logger.info('zp.cs.2 no local video');
            return false;
        }
        if (localVideo['captureStream']) {
            this.localStream = localVideo['captureStream']();
            this.logger.debug('zp.cs.2 captureStream');
        }
        else if (localVideo['mozCaptureStream']) {
            this.localStream = localVideo['mozCaptureStream']();
            this.logger.debug('zp.cs.2 mozCaptureStream');
        }
        else {
            this.logger.info('zp.cs.2 don\'t support');
            return false;
        }
        this.videoInfo = {
            width: localVideo['videoWidth'],
            height: localVideo['videoHeight'],
            frameRate: 0,
            bitRate: 0
        };
        this.logger.debug('zp.cs.2 called success');
        return true;
    };
    /*
     *    "zp.sv.2.1": "stopPreview"
     */
    ZegoPreview.prototype.stopPreview = function () {
        this.logger.info('zp.sv.2.1 called');
        if (!this.localStream) {
            return;
        }
        var tracks = this.localStream.getTracks();
        tracks.reverse();
        tracks.forEach(function (track) {
            track.stop();
        });
        this.localStream = null;
        this.localVideo.srcObject = null;
        this.localVideo = null;
        this.videoInfo = {};
    };
    ;
    return ZegoPreview;
}());
exports.ZegoPreview = ZegoPreview;


/***/ }),

/***/ "./sdk/webrtc/zego.publish.ts":
/*!************************************!*\
  !*** ./sdk/webrtc/zego.publish.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ../common/zego.extern */ "./sdk/common/zego.extern.ts");
var adapter = __webpack_require__(/*! ./adapter.js */ "./sdk/webrtc/adapter.js");
var audioMixUtil_1 = __webpack_require__(/*! ../util/audioMixUtil */ "./sdk/util/audioMixUtil.ts");
var sdpUtil_1 = __webpack_require__(/*! ../util/sdpUtil */ "./sdk/util/sdpUtil.ts");
var ZegoPublish = /** @class */ (function () {
    function ZegoPublish(log, signal, dataReport, qualityTimeInterval) {
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.stop;
        this.sessionId = 0;
        // localVideo = null;
        // localStream = null;
        this.waitingICETimeInterval = 5000;
        this.waitingAnswerTimeInterval = 5000;
        this.candidateInfo = [];
        this.waitingICETimer = null;
        this.waitingAnswerTimer = null;
        this.qualityTimer = null;
        this.publishQualityList = [];
        this.maxQualityListCount = 10;
        this.lastPublishStats = {};
        this.reportSeq = zego_extern_1.getSeq();
        //quality signal
        this.qualityUpload = false;
        this.qualityUploadInterval = 30 * 1000;
        this.qualityUploadLastTime = 0;
        this.qualitySeq = 0;
        //retry
        this.maxRetryCount = 3;
        this.currentRetryCount = 0;
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.didNotStart;
        this.waitingServerTimerInterval = 3 * 1000;
        this.waitingServerTimer = null;
        this.videoInfo = {
            width: 0,
            height: 0,
            frameRate: 0,
            bitRate: 0
        };
        this.offerSeq = 0;
        this.qualityCount = 0;
        this.closeSessionSignal = false;
        // playOption:PlayOption;
        this.audioBitRate = 48000;
        this.localSdpRevert = false;
        this.videoDecodeType = 'H264';
        this.logger = log;
        this.signal = signal;
        this.dataReport = dataReport;
        this.qualityTimeInterval = qualityTimeInterval;
        this.audioMixing = new audioMixUtil_1.audioMixUtil(log);
        dataReport.newReport(this.reportSeq);
    }
    ZegoPublish.prototype.publishStateUpdateError = function (errorCode) {
        if (this.sessionId != 0 && this.shouldSendCloseSession(errorCode)) {
            //send close session request
            this.signal.sendCloseSession(zego_extern_1.getSeq(), this.sessionId, 1);
            this.closeSessionSignal = true;
        }
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.stop;
        this.onPublishStateUpdate(zego_extern_1.ENUM_PUBLISH_STATE_UPDATE.error, this.streamId, errorCode);
        this.resetPublish();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // reset
    /*
     *    "zp.rp.0": "ZegoPublish.resetPublish"
     */
    ZegoPublish.prototype.resetPublish = function () {
        this.logger.info("zp.rp.0 call");
        this.streamId = null;
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.stop;
        if (this.peerConnection != undefined || this.peerConnection != null) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.waitingAnswerTimer != null) {
            clearTimeout(this.waitingAnswerTimer);
            this.waitingAnswerTimer = null;
        }
        if (this.waitingICETimer != null) {
            clearTimeout(this.waitingICETimer);
            this.waitingICETimer = null;
        }
        this.clearPublishQualityTimer();
        if (this.signal) {
            this.signal.unregisterPushCallback("CandidateInfoPush", this.sessionId);
            this.signal.unregisterPushCallback("MediaDescPush", this.sessionId);
            this.signal.unregisterPushCallback("CloseSessionPush", this.sessionId);
            // this.signal.unregisterPushCallback('WebSocketDisconnect', this.sessionId);
        }
        // this.sessionId = 0;
        this.sessionSeq = 0;
        this.offerSeq = 0;
        this.candidateInfo = [];
        this.publishQualityList = [];
        this.qualityUploadLastTime = 0;
        this.currentRetryCount = 0;
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.didNotStart;
        this.clearTryPublishTimer();
    };
    ZegoPublish.prototype.clearTryPublishTimer = function () {
        if (this.waitingServerTimer != null) {
            clearTimeout(this.waitingServerTimer);
            this.waitingServerTimer = null;
        }
    };
    ZegoPublish.prototype.clearPublishQualityTimer = function () {
        if (this.qualityTimer != null) {
            clearInterval(this.qualityTimer);
            this.qualityTimer = null;
        }
        this.lastPublishStats = {};
        this.qualityCount = 0;
        //this.dataReport.uploadReport(this.qualitySeq, "RTCPublishQuality");
    };
    ZegoPublish.prototype.shouldSendCloseSession = function (errorCode) {
        if (this.state != zego_entity_1.ENUM_PUBLISH_STATE.stop && this.state != zego_entity_1.ENUM_PUBLISH_STATE.waitingSessionRsp) {
            return true;
        }
        return false;
    };
    /*
   *    "zp.sp.0": "ZegoPublish.startPublish"
   */
    ZegoPublish.prototype.startPublish = function (streamId, localStream, videoInfo, playOption) {
        var _this = this;
        this.logger.info("zp.sp.0 called");
        if (!streamId) {
            this.logger.error("zp.sp.0 streamId is null");
            return;
        }
        this.streamId = streamId;
        this.localStream = localStream;
        if (videoInfo) {
            this.videoInfo = videoInfo;
        }
        if (playOption && playOption.audioBitRate) {
            this.audioBitRate = playOption.audioBitRate;
        }
        if (playOption && playOption.videoDecodeType) {
            this.videoDecodeType = playOption.videoDecodeType;
        }
        //send to server
        this.sessionSeq = zego_extern_1.getSeq();
        this.dataReport.eventStart(this.reportSeq, "CreateSession");
        this.signal.createSession(this.sessionSeq, 0, 0, streamId, playOption && playOption.streamParams, function (seq, sessionId, data) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                sessionId: data.session_id
            });
            _this.logger.info('zp.sp.0 sessionId:' + data.session_id);
            if (_this.sessionSeq != seq) {
                _this.logger.error("zp.sp.0 seq is not match.");
                return;
            }
            if (data.result !== 0) {
                _this.logger.error("zp.sp.0 create session failed " + data.result);
                _this.publishStateUpdateError(zego_extern_1.publishErrorList.CREATE_SESSION_ERROR);
            }
            else {
                _this.sessionId = data.session_id;
                _this.logger.debug("zp.sp.0 create session success " + _this.sessionId);
                _this.onCreatePublishSessionSuccess(data);
            }
        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                error: err
            });
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.SEND_SESSION_TIMEOUT);
        });
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.waitingSessionRsp;
        this.logger.debug("zp.sp.0 called success");
    };
    ;
    //////////////////////////////////////////////////////////////////////////////////////////////
    // create session result
    /*
     *    "zp.ops.0": "ZegoPublish.onCreatePublishSessionSuccess"
     */
    ZegoPublish.prototype.onCreatePublishSessionSuccess = function (data) {
        var _this = this;
        //create offer
        this.logger.info("zp.ops.0 called");
        // this.state = ENUM_PUBLISH_STATE.Start;
        var urls = [];
        if (data.turn_server)
            urls.push(data.turn_server);
        if (data.stun_server)
            urls.push(data.stun_server);
        var configuration = {
            iceTransportPolicy: 'relay',
            iceServers: [{
                    urls: urls,
                    username: data.turn_username,
                    credential: data.turn_auth_key
                }]
        };
        this.logger.info("zp.ops.0 username: " + data.turn_username);
        this.logger.info("zp.ops.0 credential: " + data.turn_auth_key);
        this.peerConnection = new RTCPeerConnection(configuration);
        this.peerConnection.onicecandidate = function (e) {
            _this.onIceCandidate(e);
        };
        this.peerConnection.onsignalingstatechange = function (e) {
            _this.onConnectionStateChange(e);
        };
        this.peerConnection.oniceconnectionstatechange = function (e) {
            _this.onIceConnectionStateChange(e);
        };
        var videoTracks = [];
        var audioTracks = [];
        if (this.localStream) {
            this.localStream.getTracks().forEach(function (track) {
                // if(track.kind === 'audio'){
                //         // @ts-ignore
                //         track.applyConstraints({noiseSuppression:{exact:true}})
                // }
                _this.peerConnection.addTrack(track, _this.localStream);
            });
            videoTracks = this.localStream.getVideoTracks();
            audioTracks = this.localStream.getAudioTracks();
            console.warn('getConstraints', audioTracks && audioTracks[0] && audioTracks[0].getConstraints && audioTracks[0].getConstraints());
            if (videoTracks.length > 0)
                this.logger.info("zp.ops.0 video device: " + videoTracks[0].label);
            if (audioTracks.length > 0)
                this.logger.info("zp.ops.0 audio device: " + audioTracks[0].label);
        }
        var offerOptions = {
            offerToReceiveAudio: audioTracks.length > 0 ? 1 : 0,
            offerToReceiveVideo: videoTracks.length > 0 ? 1 : 0,
        };
        this.logger.info("zp.ops.0 createOffer: " + offerOptions);
        //create offer
        this.dataReport.eventStart(this.reportSeq, "CreateOffer");
        this.peerConnection.createOffer(offerOptions).then(function (desc) {
            _this.dataReport.eventEnd(_this.reportSeq, "CreateOffer");
            _this.onCreateOfferSuccess(desc);
        }, function (error) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateOffer", {
                error: error.toString()
            });
            _this.logger.error("zp.ops.0 create offer error " + error.toString());
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.CREATE_OFFER_ERROR);
        });
        //register callback
        this.signal.registerPushCallback("CandidateInfoPush", this.sessionId, function (seq, sessionId, data) {
            _this.onRecvCandidateInfo(seq, sessionId, data);
        });
        this.signal.registerPushCallback("CloseSessionPush", this.sessionId, function (seq, sessionId, data) {
            _this.onRecvCloseSession(seq, sessionId, data);
        });
        this.signal.registerPushCallback("MediaDescPush", this.sessionId, function (seq, sessionId, data) {
            _this.onRecvMediaDescription(seq, sessionId, data);
        });
        // this.signal.registerPushCallback("WebSocketDisconnect", this.sessionId, onDisconnect, this);
        this.signal.registerPushCallback("SessionResetPush", this.sessionId, function (seq, sessionId, data) {
            _this.onRecvResetSession(seq, sessionId, data);
        });
        this.logger.debug("zp.ops.0 call success");
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // create offer result
    /*
     *    "zp.oco.0": "ZegoPublish.onCreateOfferSuccess"
     */
    ZegoPublish.prototype.onCreateOfferSuccess = function (desc) {
        //this.logger.debug("zp.oco.0 success. before desc: " + desc.sdp);
        var _this = this;
        //change bandwidth
        if (this.videoInfo.bitRate != 0)
            desc.sdp = this.updateBandwidthRestriction(desc.sdp, this.videoInfo.bitRate);
        desc.sdp = desc.sdp.replace(/sendrecv/g, 'sendonly');
        desc.sdp = desc.sdp.replace(/useinbandfec=\d+/, 'maxaveragebitrate=' + this.audioBitRate);
        // 部分浏览器 video和audio顺序是反过来的---这里做一下特殊处理
        if (/m=video[\s\S]*m=audio/.test(desc.sdp)) {
            this.localSdpRevert = true;
            //         console.log('befor localSdp:',desc.sdp);
            //         let [headerSdp,videoSdp,audioSdp]= [
            //                 /[\s\S]*m=video/.exec(desc.sdp)[0].replace('m=video',''),
            //                 /m=video[\s\S]*m=audio/.exec(desc.sdp)[0].replace('m=audio',''),
            //                 /m=audio[\s\S]*/.exec(desc.sdp)[0],
            //         ];
            //
            //         let mids = /a=group:BUNDLE\s+(\w+)\s+(\w+)/.exec(headerSdp);
            //
            //         headerSdp = headerSdp.replace(/a=group:BUNDLE\s+(\w+)\s+(\w+)/,'a=group:BUNDLE '+ mids[2]+' '+ mids[1]);
            //
            //         desc.sdp = headerSdp + audioSdp.replace('b=AS:800\r\n','') + videoSdp.replace('c=IN IP4 0.0.0.0','c=IN IP4 0.0.0.0\r\nb=AS:800');
            //         console.log('localSdp:',desc.sdp);
        }
        // desc.sdp = sdpUtil.zegoSdp(desc.sdp);
        desc.sdp = sdpUtil_1.sdpUtil.getSDPByVideDecodeType(desc.sdp, this.videoDecodeType);
        this.logger.info("zp.oco.0 localSdp1 " + desc.sdp.substr(0, desc.sdp.length / 2));
        this.logger.info("zp.oco.0 localSdp2 " + desc.sdp.substr(desc.sdp.length / 2));
        this.dataReport.eventStart(this.reportSeq, "SetLocalDescription");
        this.peerConnection.setLocalDescription(desc).then(function () {
            _this.dataReport.eventEnd(_this.reportSeq, "SetLocalDescription");
            _this.onSetLocalDescriptionSuccess(desc);
        }, function (error) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SetLocalDescription", {
                error: error.toString()
            });
            _this.logger.error("zp.oco.0 error " + error.toString());
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.SET_LOCAL_DESC_ERROR);
        });
    };
    ZegoPublish.prototype.updateBandwidthRestriction = function (sdp, bandwidth) {
        var modifier = 'AS';
        if (adapter.browserDetails.browser === 'firefox') {
            bandwidth = (bandwidth >>> 0) * 1000;
            modifier = 'TIAS';
        }
        if (sdp.indexOf('b=' + modifier + ':') === -1) {
            // insert b= after c= line.
            sdp = sdp.replace(/c=IN (.*)\r\n/g, 'c=IN $1\r\nb=' + modifier + ':' + bandwidth + '\r\n');
            sdp = sdp.replace('b=' + modifier + ':' + bandwidth + '\r\n', '');
        }
        else {
            sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n', 'g'), 'b=' + modifier + ':' + bandwidth + '\r\n');
            sdp = sdp.replace('b=' + modifier + ':' + bandwidth + '\r\n', '');
        }
        return sdp;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // setLocalDescription result
    /*
     *    "zp.osd.0": "ZegoPublish.onSetLocalDescriptionSuccess"
     */
    ZegoPublish.prototype.onSetLocalDescriptionSuccess = function (desc) {
        var _this = this;
        this.logger.info("zp.osd.0 success");
        //send offer to other peer
        var mediaDescription = {
            sdp: desc.sdp,
            width: this.videoInfo.width,
            height: this.videoInfo.height,
            frameRate: this.videoInfo.frameRate,
            video_min_kpbs: this.videoInfo.bitRate,
            video_max_kpbs: this.videoInfo.bitRate,
            audio_kpbs: 48
        };
        this.offerSeq = zego_extern_1.getSeq();
        this.dataReport.eventStart(this.reportSeq, "SendMediaDesc");
        this.signal.sendMediaDesc(this.offerSeq, this.sessionId, 0, mediaDescription, function (seq, sessionId, data) {
            if (_this.offerSeq != seq || _this.sessionId != sessionId) {
                _this.logger.error("zp.osd.0 seq or sessionId is not equal");
                return;
            }
            _this.logger.info("zp.osd.0 send success");
            _this.dataReport.eventEnd(_this.reportSeq, "SendMediaDesc");
            //set timer for waiting
            _this.waitingAnswerTimer = setTimeout(function () {
                if (_this.state == zego_entity_1.ENUM_PUBLISH_STATE.waitingServerAnswer) {
                    _this.logger.error("zp.osd.0 waiting timeout");
                    _this.publishStateUpdateError(zego_extern_1.publishErrorList.SERVER_MEDIA_DESC_TIMEOUT);
                }
            }, _this.waitingAnswerTimeInterval);
            _this.state = zego_entity_1.ENUM_PUBLISH_STATE.waitingServerAnswer;
        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendMediaDesc", {
                error: err
            });
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.SEND_MEDIA_DESC_TIMEOUT);
        });
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.waitingOffserRsp;
        this.logger.debug("zp.osd.0 call success");
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push SDP (setRemoteDesription)
    /*
     *    "zp.ormd.0": "ZegoPublish.onRecvMediaDescription"
     */
    ZegoPublish.prototype.onRecvMediaDescription = function (seq, sessionId, data) {
        this.logger.info("zp.ormd.0 received");
        if (this.state != zego_entity_1.ENUM_PUBLISH_STATE.waitingServerAnswer) {
            this.logger.info("zp.ormd.0 current state " + this.state + " not allowed");
            return;
        }
        //clear timer
        if (this.waitingAnswerTimer != null) {
            clearTimeout(this.waitingAnswerTimer);
            this.waitingAnswerTimer = null;
        }
        this.dataReport.addEvent(this.reportSeq, "RecvMediaDesc");
        this.signal.sendMediaDescAck(seq, this.sessionId, 0);
        //not answer
        if (data.type == 1) {
            //临时修改
            //console.warn( 'profile-level-id before',data.sdp);
            // data.sdp = data.sdp.replace(/profile-level-id=.*/,'profile-level-id=640032');
            // console.warn( 'profile-level-id after',data.sdp);
            this.onGetRemoteOfferSucceses(data.sdp);
        }
        else {
            //server send error
            this.publishStateUpdateError(zego_extern_1.publishErrorList.SERVER_MEDIA_DESC_ERROR);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push offer (setRemoteDescription)
    /*
     *    "zp.oro.0": "ZegoPublish.onGetRemoteOfferSucceses"
     */
    ZegoPublish.prototype.onGetRemoteOfferSucceses = function (desc) {
        var _this = this;
        if (this.audioBitRate !== 48000) {
            desc = desc.replace(/maxaveragebitrate=(\d+)/, 'maxaveragebitrate=' + this.audioBitRate);
        }
        // 部分浏览器 video和audio顺序是反过来的---这里做一下特殊处理  safari-macos-choui's
        if (this.localSdpRevert) {
            //console.log('befor remotelocalSdp:',desc);
            var _a = [
                /[\s\S]*m=audio/.exec(desc)[0].replace('m=audio', ''),
                /m=video[\s\S]*/.exec(desc)[0],
                /m=audio[\s\S]*m=video/.exec(desc)[0].replace('m=video', ''),
            ], headerSdp = _a[0], videoSdp = _a[1], audioSdp = _a[2];
            var mids = /a=group:BUNDLE\s+(\w+)\s+(\w+)/.exec(headerSdp);
            headerSdp = headerSdp.replace(/a=group:BUNDLE\s+(\w+)\s+(\w+)/, 'a=group:BUNDLE ' + mids[2] + ' ' + mids[1]);
            desc = headerSdp + videoSdp + audioSdp;
            //console.log('localSdp:',desc);
        }
        this.logger.info("zp.oro.0 remoteSdp:", desc);
        var answerDescription = {
            type: "answer",
            sdp: desc,
            toJSON: function () {
            }
        };
        this.dataReport.eventStart(this.reportSeq, "SetRemoteDescription");
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerDescription)).then(function () {
            _this.logger.info("zp.oro.0 set success");
            _this.dataReport.eventEnd(_this.reportSeq, "SetRemoteDescription");
        }, function (error) {
            _this.logger.error("zp.oro.0 failed: " + error.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SetRemoteDescription", {
                error: error.toString()
            });
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.SET_REMOTE_DESC_ERROR);
        });
        this.sendCandidateInfo(this.candidateInfo);
        this.candidateInfo = [];
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.waitingServerICE;
        //setTimer
        this.waitingICETimer = setTimeout(function () {
            if (_this.state == zego_entity_1.ENUM_PUBLISH_STATE.waitingServerICE) {
                _this.logger.error("zp.orod.0 waiting server timeout");
                _this.publishStateUpdateError(zego_extern_1.publishErrorList.SERVER_CANDIDATE_TIMEOUT);
            }
        }, this.waitingICETimeInterval);
        this.logger.debug("zp.oro.0 call success");
    };
    /*
    *    "zp.oics.0": "ZegoPublish.onIceConnectionStateChange"
    */
    ZegoPublish.prototype.onIceConnectionStateChange = function (event) {
        if (this.state == zego_entity_1.ENUM_PUBLISH_STATE.stop || this.peerConnection == null) {
            return;
        }
        this.logger.info("zp.oics.0 stateChanged " + this.peerConnection.iceConnectionState);
        if (this.peerConnection.iceConnectionState === "connected") {
            this.logger.info("zp.oics.0 connected state " + this.state);
            this.dataReport.eventEnd(this.reportSeq, "IceConnected");
            if (this.state != zego_entity_1.ENUM_PUBLISH_STATE.publishing) {
                this.onPublishStateUpdate(zego_extern_1.ENUM_PUBLISH_STATE_UPDATE.start, this.streamId);
            }
            this.state = zego_entity_1.ENUM_PUBLISH_STATE.publishing;
            if (this.retryState != zego_entity_1.ENUM_RETRY_STATE.didNotStart) {
                this.retryState = zego_entity_1.ENUM_RETRY_STATE.finished;
                this.currentRetryCount = 0;
            }
            //publish started
            this.dataReport.eventStart(this.reportSeq, "PublishState");
            //start quality timeInterval
            this.setPublishQualityTimer();
        }
        else if (this.peerConnection.iceConnectionState === "closed") {
            this.dataReport.addEvent(this.reportSeq, "IceClosed");
            this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState);
        }
        else if (this.peerConnection.iceConnectionState === "failed") {
            this.dataReport.addEvent(this.reportSeq, "IceFailed");
            this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceCandidate callback
    /*
     *    "zp.oic.0": "ZegoPublish.onIceCandidate"
     */
    ZegoPublish.prototype.onIceCandidate = function (event) {
        this.logger.info("zp.oic.0 candidate" + event.candidate);
        if (!event.candidate) {
            return;
        }
        this.logger.info("zp.oic.0 candidate" + event.candidate.candidate);
        if (this.state < zego_entity_1.ENUM_PUBLISH_STATE.waitingServerICE || this.state == zego_entity_1.ENUM_PUBLISH_STATE.stop) {
            //save candidate Info
            this.candidateInfo.push({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            });
        }
        else {
            var candidate = {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            };
            this.sendCandidateInfo([candidate]);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // send candidate Info
    /*
     *    "zp.sci.0": "ZegoPublish.sendCandidateInfo"
     */
    ZegoPublish.prototype.sendCandidateInfo = function (candidateInfo) {
        var _this = this;
        this.logger.info("zp.sci.0 called");
        candidateInfo = candidateInfo.filter(function (item) {
            if (item.candidate.indexOf('relay') > 0) {
                return true;
            }
            return false;
        });
        if (!candidateInfo || candidateInfo.length < 1) {
            this.logger.info("zp.sci.0 cancelled");
            return;
        }
        this.dataReport.eventStart(this.reportSeq, "SendIceCandidate");
        this.signal.sendCandidateInfo(zego_extern_1.getSeq(), this.sessionId, candidateInfo, function (seq, sessionId, data) {
            _this.logger.debug("zp.sci.0 send success");
            _this.dataReport.eventEnd(_this.reportSeq, "SendIceCandidate");
        }, function (err, seq) {
            _this.logger.error("zp.sci.0 failed to send: " + err.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendIceCandidate", {
                error: err
            });
            _this.publishStateUpdateError(zego_extern_1.publishErrorList.SEND_CANDIDATE_TIMEOUT);
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceStateChange callback
    /*
     *    "zp.ocs.0": "ZegoPublish.onConnectionStateChange"
     */
    ZegoPublish.prototype.onConnectionStateChange = function (event) {
        this.logger.info("zp.ocs.0 called " + event.target.signalingState);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push ICE (addICECandidate)
    /*
     *    "zp.oci.0": "ZegoPublish.onRecvCandidateInfo"
     */
    ZegoPublish.prototype.onRecvCandidateInfo = function (seq, sessionId, data) {
        var _this = this;
        this.logger.debug("zp.oci.0 received " + data.infos.length);
        if (this.state != zego_entity_1.ENUM_PUBLISH_STATE.waitingServerICE) {
            this.logger.info("zp.oci.0 current state " + this.state + " not allowed");
            return;
        }
        if (this.waitingICETimer != null) {
            clearTimeout(this.waitingICETimer);
            this.waitingICETimer = null;
        }
        this.dataReport.addEvent(this.reportSeq, "RecvIceCandidate");
        this.signal.sendCandidateInfoAck(seq, this.sessionId, 0);
        for (var i = 0; i < data.infos.length; i++) {
            var ice = {
                sdpMid: data.infos[i].sdpMid,
                sdpMLineIndex: data.infos[i].sdpMLineIndex,
                candidate: data.infos[i].candidate
            };
            this.logger.debug("zp.orci.0 candidate " + ice.candidate);
            this.peerConnection.addIceCandidate(new RTCIceCandidate(ice)).then(function () {
                _this.logger.debug("zp.oci.0 add success");
            }, function (error) {
                _this.logger.error("zp.oci.0 add error " + error.toString());
                _this.publishStateUpdateError(zego_extern_1.publishErrorList.SERVER_CANDIDATE_ERROR);
            });
        }
        this.state = zego_entity_1.ENUM_PUBLISH_STATE.connecting;
        this.dataReport.eventStart(this.reportSeq, "IceConnected");
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push closeSession
    /*
     *    "zp.orcs.0": "ZegoPublish.onRecvCloseSession"
     */
    ZegoPublish.prototype.onRecvCloseSession = function (seq, sessionId, data) {
        this.logger.info("zp.orcs.0 reason: " + data.reason);
        this.dataReport.addEvent(this.reportSeq, "RecvCloseSession");
        this.signal.sendCloseSessionAck(seq, this.sessionId, 0);
        var error = JSON.parse(JSON.stringify(zego_extern_1.publishErrorList.SESSION_CLOSED));
        error.msg += data.reason;
        this.publishStateUpdateError(error);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push resetSession
    /*
     *    "zp.orrs.0": "ZegoPublish.onRecvResetSession"
     */
    ZegoPublish.prototype.onRecvResetSession = function (seq, sessionId, data) {
        this.logger.info("zp.orrs.0 received ");
        if (sessionId != this.sessionId) {
            this.logger.error("zp.orrs.0 cannot find session");
            return;
        }
        this.dataReport.addEvent(this.reportSeq, "RecvResetSession");
        //check should retry
        if (this.shouldRetryPublish()) {
            this.startRetryPublish();
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // retry publish
    /*
     *    "zp.srp.0.0": "ZegoPublish.shouldRetryPublish"
     */
    ZegoPublish.prototype.shouldRetryPublish = function () {
        if (this.retryState == zego_entity_1.ENUM_RETRY_STATE.didNotStart && this.state != zego_entity_1.ENUM_PUBLISH_STATE.publishing) {
            this.logger.info("zp.srp.0.0 connection didn't success");
            return false;
        }
        if (this.retryState == zego_entity_1.ENUM_RETRY_STATE.retrying) {
            this.logger.info("zp.srp.0.0 already retrying");
            return false;
        }
        if (this.currentRetryCount > this.maxRetryCount) {
            this.logger.info("zp.srp.0.0 beyond max");
            return false;
        }
        this.logger.info("zp.srp.1.0 call success");
        return true;
    };
    /*
     *    "zp.srp.0": "ZegoPublish.startRetryPublish"
     */
    ZegoPublish.prototype.startRetryPublish = function () {
        this.logger.info("zp.srp.0 call");
        var streamId = this.streamId;
        if (!streamId) {
            this.logger.info("zp.srp.0 no streamid");
            return;
        }
        this.resetPublish();
        this.tryStartPublish(streamId);
    };
    /*
     *    "zp.tsp.0": "ZegoPublish.tryStartPublish"
     */
    ZegoPublish.prototype.tryStartPublish = function (streamId) {
        var _this = this;
        this.logger.info("zp.tsp.0 call");
        this.clearTryPublishTimer();
        this.streamId = streamId;
        if (this.currentRetryCount > this.maxRetryCount) {
            this.logger.info("zp.tsp.0 beyond max limit");
            //callback error
            this.publishStateUpdateError(zego_extern_1.publishErrorList.WEBSOCKET_ERROR);
            return;
        }
        this.retryState = zego_entity_1.ENUM_RETRY_STATE.retrying;
        this.currentRetryCount += 1;
        if (this.signal.isServerConnected()) {
            this.logger.debug("zp.tsp.0 signal connected");
            this.startPublish(streamId, this.localStream, this.videoInfo);
        }
        else {
            //setTimer
            this.logger.debug("zp.tsp.0 signal server not connected");
            this.waitingAnswerTimer = setTimeout(function () {
                _this.tryStartPublish(streamId);
            }, this.waitingAnswerTimeInterval);
        }
    };
    ZegoPublish.prototype.checkPublishConnectionFailedState = function (connectionState) {
        var state = null;
        if (connectionState == "failed") {
            state = zego_extern_1.publishErrorList.MEDIA_CONNECTION_FAILED;
        }
        else if (connectionState == "closed") {
            state = zego_extern_1.publishErrorList.MEDIA_CONNECTION_CLOSED;
        }
        if (state == null) {
            return;
        }
        if (this.state != zego_entity_1.ENUM_PUBLISH_STATE.publishing && this.retryState == zego_entity_1.ENUM_PUBLISH_STATE.didNotStart) {
            this.logger.info("zp.oics.0  state " + this.state + " retryState " + this.retryState + " connectionState " + connectionState);
            this.publishStateUpdateError(state);
        }
        else {
            if (this.shouldRetryPublish()) {
                this.onPublishStateUpdate(zego_extern_1.ENUM_PUBLISH_STATE_UPDATE.retry, this.streamId);
                this.startRetryPublish();
            }
            else {
                this.publishStateUpdateError(state);
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // quality timer
    /*
     *    "zp.spq.0": "ZegoPublish.setPublishQualityTimer"
     */
    ZegoPublish.prototype.setPublishQualityTimer = function () {
        var _this = this;
        if (this.qualityTimer != null) {
            return;
        }
        this.logger.debug("zp.spq.0 called");
        this.clearPublishQualityTimer();
        this.qualityTimer = setInterval(function () {
            if (_this.peerConnection) {
                _this.peerConnection.getStats(null).then(function (results) {
                    _this.getPublishStats(results);
                }, function (error) {
                    _this.logger.info("zp.spq.0 getStats error " + error.toString());
                });
            }
        }, this.qualityTimeInterval);
        this.lastPublishStats = {
            time: 0,
            audioBytesSent: 0,
            videoBytesSent: 0,
            framesEncoded: 0,
            framesSent: 0
        };
        this.qualitySeq = zego_extern_1.getSeq();
        this.qualityCount = 0;
        this.dataReport.newReport(this.qualitySeq);
    };
    /*
     *    "zp.gps.0": "ZegoPublish.getPublishStats"
     */
    ZegoPublish.prototype.getPublishStats = function (results) {
        var _this = this;
        if (!results) {
            return;
        }
        var publishData = {
            audioCodeType: "opus",
            audioBitrate: 0,
            videoBitrate: 0,
            videoFPS: 0,
            nackCount: 0,
            pliCount: 0,
            //sliCount: 0,
            frameHeight: 0,
            frameWidth: 0,
            videoTransferFPS: 0,
            totalRoundTripTime: 0,
            currentRoundTripTime: 0
        };
        var time = this.lastPublishStats.time;
        results.forEach(function (result) {
            if ((result.type == "outbound-rtp" || (result.type == "ssrc" && result.bytesSent != undefined)) && result.mediaType == "audio") {
                //audio
                if (time != 0) {
                    publishData.audioBitrate = 8 * (result.bytesSent - _this.lastPublishStats.audioBytesSent) / (result.timestamp - time);
                }
                if (publishData.audioBitrate < 0) {
                    publishData.audioBitrate = 0;
                }
                _this.lastPublishStats.audioBytesSent = result.bytesSent;
                _this.lastPublishStats.time = result.timestamp;
            }
            else if ((result.type == "outbound-rtp" || (result.type == "ssrc" && result.bytesSent != undefined)) && result.mediaType == "video") {
                //video
                if (time != 0) {
                    publishData.videoBitrate = 8 * (result.bytesSent - _this.lastPublishStats.videoBytesSent) / (result.timestamp - time);
                    publishData.videoFPS = 1000 * (result.framesEncoded - _this.lastPublishStats.framesEncoded) / (result.timestamp - time);
                }
                if (publishData.videoBitrate < 0) {
                    publishData.videoBitrate = 0;
                }
                if (publishData.videoFPS < 0) {
                    publishData.videoFPS = 0;
                }
                publishData.nackCount = result.nackCount;
                publishData.pliCount = result.pliCount;
                //publishData.sliCount = result.sliCount;
                _this.lastPublishStats.videoBytesSent = result.bytesSent;
                _this.lastPublishStats.framesEncoded = result.framesEncoded;
                _this.lastPublishStats.time = result.timestamp;
            }
            //safari don't have this type
            else if (result.type == "track" && (result.kind == "video" || result.id.indexOf("video") >= 0)) {
                publishData.frameHeight = result.frameHeight;
                publishData.frameWidth = result.frameWidth;
                if (time != 0) {
                    publishData.videoTransferFPS = 1000 * (result.framesSent - _this.lastPublishStats.framesSent) / (result.timestamp - time);
                }
                if (publishData.videoTransferFPS < 0) {
                    publishData.videoTransferFPS = 0;
                }
                _this.lastPublishStats.framesSent = result.framesSent;
            }
            else if (result.type == "candidate-pair") {
                if (result.totalRoundTripTime != undefined) {
                    publishData.totalRoundTripTime = result.totalRoundTripTime;
                }
                if (result.currentRoundTripTime != undefined) {
                    publishData.currentRoundTripTime = result.currentRoundTripTime;
                }
            }
        });
        // this.logger.debug("zp.gps.0 audio: " + publishData.audioBitrate + " video: " + publishData.videoBitrate +
        //  " FPS: " + publishData.videoFPS + " transfer: " + publishData.videoTransferFPS);
        // this.dataReport.addEvent(this.qualitySeq, "PublishQuality", publishData);
        // this.qualityCount += 1;
        // if (this.qualityCount > this.maxQualityListCount) {
        //     this.dataReport.uploadReport(this.qualitySeq, "RTCPublishQuality");
        //     this.qualityCount = 0;
        //     this.qualitySeq = getSeq();
        //     this.dataReport.newReport(this.qualitySeq);
        // }
        //upload quality
        this.uploadPublishQuality(publishData);
        if (time != 0) {
            this.onPublishQualityUpdate(this.streamId, publishData);
        }
    };
    /*
     *    "zp.upq.0": "ZegoPublish.uploadPublishQuality"
     */
    ZegoPublish.prototype.uploadPublishQuality = function (publishData) {
        var _this = this;
        if (!this.qualityUpload) {
            return;
        }
        var timeStamp = Date.parse(new Date() + '');
        if (this.qualityUploadLastTime == 0 || timeStamp - this.qualityUploadLastTime >= this.qualityUploadInterval) {
            this.logger.debug("zp.upq.0 upload");
            publishData["stream_type"] = "publish";
            publishData["stream_id"] = this.streamId;
            publishData["timeStamp"] = timeStamp / 1000;
            this.signal.QualityReport(zego_extern_1.getSeq(), this.sessionId, publishData, function (seq, sessionId, data) {
                if (data.report !== undefined) {
                    _this.qualityUpload = data.report;
                    _this.qualityUploadInterval = data.report_interval_ms;
                }
            }, function (err, seq) {
                _this.logger.info("zp.upq.0 upload failed " + err);
            });
            this.qualityUploadLastTime = timeStamp;
        }
    };
    /*
    *    "zp.sp.0.1": "ZegoPublish.stopPublish"
    */
    ZegoPublish.prototype.stopPublish = function () {
        this.logger.debug("zp.sp.0.1 called");
        //close session
        if (this.sessionId && !this.closeSessionSignal) {
            this.signal.sendCloseSession(zego_extern_1.getSeq(), this.sessionId, 0);
        }
        this.dataReport.eventEndWithMsg(this.reportSeq, "PublishState", {
            "state": this.state + ''
        });
        this.dataReport.addEvent(this.reportSeq, "StopPublish");
        this.dataReport.addMsgExt(this.reportSeq, {
            "stream": this.streamId,
            "sessionId": this.sessionId
        });
        this.dataReport.uploadReport(this.reportSeq, "RTCPublishStream");
        this.resetPublish();
    };
    ;
    ZegoPublish.prototype.onPublishStateUpdate = function (type, streamId, error) {
    };
    ;
    ZegoPublish.prototype.onPublishQualityUpdate = function (streamId, quality) {
    };
    ;
    /*
     *    "zp.od.0": "ZegoPublish.onDisconnect"
     */
    ZegoPublish.prototype.onDisconnect = function () {
        this.logger.info("zp.od.0 call");
        // if (this.sessionId !== sessionId) {
        //     this.logger.info("zp.od.0 session is not same");
        //     return;
        // }
        this.logger.info("zp.od.0 websocket disconnect");
        this.dataReport.addEvent(this.reportSeq, "OnDisconnect");
        this.publishStateUpdateError(zego_extern_1.publishErrorList.WEBSOCKET_ERROR);
    };
    ;
    //音效相关
    ZegoPublish.prototype.playEffect = function (audioMixConfig, audioBuffer, start, end) {
        this.audioMixing.localStream = this.localStream;
        this.audioMixing.peerConnection = this.peerConnection;
        this.audioMixing.audioBuffer = audioBuffer;
        this.audioMixing.playEffect(audioMixConfig.playTime, audioMixConfig.loop, audioMixConfig.replace, start, end);
    };
    ZegoPublish.prototype.pauseEffect = function () {
        this.audioMixing.pauseEffect();
    };
    ZegoPublish.prototype.resumeEffect = function () {
        this.audioMixing.resumeEffect();
    };
    ZegoPublish.prototype.startMixingAudio = function (audio, replace) {
        this.audioMixing.localStream = this.localStream;
        this.audioMixing.peerConnection = this.peerConnection;
        return this.audioMixing.startMixingAudio(audio, replace);
    };
    ZegoPublish.prototype.stopMixingAudio = function () {
        return this.audioMixing.stopMixingAudio();
    };
    return ZegoPublish;
}());
exports.ZegoPublish = ZegoPublish;


/***/ }),

/***/ "./sdk/webrtc/zego.streamCenter.web.ts":
/*!*********************************************!*\
  !*** ./sdk/webrtc/zego.streamCenter.web.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var zego_datareport_1 = __webpack_require__(/*! ../common/zego.datareport */ "./sdk/common/zego.datareport.ts");
var zego_preview_1 = __webpack_require__(/*! ./zego.preview */ "./sdk/webrtc/zego.preview.ts");
var zego_publish_1 = __webpack_require__(/*! ./zego.publish */ "./sdk/webrtc/zego.publish.ts");
var zego_extern_1 = __webpack_require__(/*! ../common/zego.extern */ "./sdk/common/zego.extern.ts");
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var zego_signal_1 = __webpack_require__(/*! ../common/zego.signal */ "./sdk/common/zego.signal.ts");
var zego_play_web_1 = __webpack_require__(/*! ./zego.play.web */ "./sdk/webrtc/zego.play.web.ts");
var ZegoStreamCenter_1 = __webpack_require__(/*! ../common/ZegoStreamCenter */ "./sdk/common/ZegoStreamCenter.ts");
var ZegoStreamCenterWeb = /** @class */ (function (_super) {
    __extends(ZegoStreamCenterWeb, _super);
    function ZegoStreamCenterWeb(log, stateCenter) {
        var _this = _super.call(this, log, stateCenter) || this;
        _this.testEnvironment = false;
        //由streamcenter统一管理每个signal的心跳逻辑
        _this.heartbeatTimer = null;
        _this.heartbeatInterval = 10 * 1000;
        //质量回调时间间隔,默认3s
        _this.qualityTimerInterval = 3 * 1000;
        _this.maxRetryCount = 5;
        _this.previewVideoList = [];
        _this.signalList = {};
        _this.checkMessageTimeout = function () {
            for (var serverUrl in _this.signalList) {
                if (_this.signalList[serverUrl].signal) {
                    _this.signalList[serverUrl].signal.checkMessageTimeout();
                }
            }
        };
        _this.getAllInUseUrl = function () {
            var serverUrls = [];
            for (var serverUrl in _this.signalList) {
                serverUrls.push(serverUrl);
            }
            return serverUrls;
        };
        /*
         *    "zsc.od.0": "ZegoStreamCenter.onDisconnectHandle"
         */
        _this.onDisconnectHandle = function (server) {
            _this.logger.info('zsc.od.0 call');
            if (_this.signalList[server]) {
                var signalInfo = _this.signalList[server];
                for (var i = 0; i < signalInfo.publishConnectedList.length; i++) {
                    var publish = _this.publisherList[signalInfo.publishConnectedList[i]];
                    if (publish && publish.publisher) {
                        publish.publisher.onDisconnect();
                    }
                }
                for (var i = 0; i < signalInfo.playConnectedList.length; i++) {
                    var play = _this.playerList[signalInfo.playConnectedList[i]];
                    if (play && play.player) {
                        play.player.onDisconnect();
                    }
                }
                delete _this.signalList[server];
                _this.stopSignalHeartbeat();
            }
        };
        _this.logger = log;
        _this.stateCenter = stateCenter;
        _this.dataReport = new zego_datareport_1.ZegoDataReport(_this.logger);
        return _this;
    }
    ZegoStreamCenterWeb.prototype.onSignalDisconnected = function (server) {
    };
    ;
    /*
     *    "zsc.qmc.0": "ZegoStreamCenter.setQualityMonitorCycle"
     */
    ZegoStreamCenterWeb.prototype.setQualityMonitorCycle = function (timeInMs) {
        this.logger.debug('zsc.qmc.0 timeInterval ' + timeInMs);
        this.qualityTimerInterval = timeInMs;
    };
    ;
    /*
     *    "zsc.ssi.0": "ZegoStreamCenter.setSessionInfo"
     */
    ZegoStreamCenterWeb.prototype.setSessionInfo = function (appid, userid, token, testEnvironment) {
        this.logger.debug('zsc.ssi.0 called');
        // this.signal.setSessionInfo(appid, userid, serverUrl);
        this.appid = appid;
        this.userid = userid;
        this.token = token;
        this.testEnvironment = testEnvironment;
    };
    ;
    ZegoStreamCenterWeb.prototype.onPlayStateUpdate = function (type, streamid, error) {
    };
    ;
    ZegoStreamCenterWeb.prototype.onPlayQualityUpdate = function (streamid, streamQuality) {
    };
    ;
    ZegoStreamCenterWeb.prototype.onPublishStateUpdate = function (type, streamid, error) {
    };
    ;
    ZegoStreamCenterWeb.prototype.onPublishQualityUpdate = function (streamid, streamQuality) {
    };
    ;
    /*
     *    "zsc.uhb.0": "ZegoStreamCenter.onUpdateHeartBeartIntervalHandle"
     */
    ZegoStreamCenterWeb.prototype.onUpdateHeartBeartIntervalHandle = function (interval) {
        if (interval != this.heartbeatInterval) {
            this.logger.debug('zsc.uhb.0 update ' + interval);
            if (this.heartbeatTimer) {
                clearTimeout(this.heartbeatTimer);
                this.heartbeatTimer = null;
            }
            this.heartbeatInterval = interval;
            this.startSignalHeartbeat();
        }
    };
    ;
    ZegoStreamCenterWeb.prototype.switchDevice = function (type, localVideo, deviceId, success, error) {
        var _this = this;
        var preview;
        var mediaStreamConfig;
        var sender;
        var mediaStreamTrack;
        var streamId;
        var publisher = null;
        preview = this.previewVideoList.find(function (preview) { return preview.localVideo === localVideo; });
        if (!preview) {
            this.logger.error('zg.sd.0 no preview found');
            return;
        }
        mediaStreamConfig = preview.mediaStreamConfig;
        if (type === 'video') {
            mediaStreamConfig.videoInput = deviceId;
        }
        else {
            mediaStreamConfig.audioInput = deviceId;
        }
        var mediaStreamConstraints = preview.getMediaStreamConstraints(mediaStreamConfig);
        // 部分手机不关闭上次的流  会导致预览失败（比如 小米8）
        var tracks = localVideo.srcObject.getTracks();
        tracks.reverse();
        tracks.forEach(function (track) {
            track.stop();
        });
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(function (stream) {
            if (type === 'video') {
                mediaStreamTrack = stream.getVideoTracks()[0];
                preview.localStream.removeTrack(preview.localStream.getVideoTracks()[0]);
            }
            else {
                mediaStreamTrack = stream.getAudioTracks()[0];
                preview.localStream.removeTrack(preview.localStream.getAudioTracks()[0]);
            }
            for (var streamid in _this.publisherList) {
                if (_this.publisherList[streamid].localVideo === localVideo) {
                    streamId = streamid;
                }
            }
            if (streamId) {
                publisher = _this.publisherList[_this.getTotalStreamId(streamId)].publisher;
                sender = publisher.peerConnection.getSenders().find(function (s) { return s.track.kind === mediaStreamTrack.kind; });
                if (sender) {
                    sender.replaceTrack(mediaStreamTrack);
                }
                else {
                    _this.logger.warn('zg.sd.0 no sender found, only swithcing device on localMediaElement');
                }
            }
            preview.localStream.addTrack(mediaStreamTrack);
            success && success();
        }, function (err) { return error && error(err); });
    };
    /*
     *    "zsc.em.0": "ZegoStreamCenter.enableMicrophone"
     */
    ZegoStreamCenterWeb.prototype.enableMicrophone = function (localVideo, enable) {
        var preview = this.checkPreview(localVideo);
        if (!preview) {
            this.logger.info('zsc.em.0 no preview');
            return false;
        }
        return preview.enableMicrophone(enable);
    };
    ;
    /*
     *    "zsc.ec.0": "ZegoStreamCenter.enableCamera"
     */
    ZegoStreamCenterWeb.prototype.enableCamera = function (localVideo, enable) {
        var preview = this.checkPreview(localVideo);
        if (!preview) {
            this.logger.error('zsc.ec.0 no preview');
            return false;
        }
        return preview.enableCamera(enable);
    };
    ;
    /*
     *    "zsc.sp.0": "ZegoStreamCenter.startPreview"
     */
    ZegoStreamCenterWeb.prototype.startPreview = function (localVideo, mediaStreamConstraints, success, error) {
        if (!localVideo) {
            this.logger.error('zsc.sp.0 localVideo null');
            return false;
        }
        var preview = this.checkPreview(localVideo);
        if (preview) {
            this.logger.warn('zsc.sp.0 localvideo already exist');
            return true;
        }
        preview = new zego_preview_1.ZegoPreview(this.logger);
        this.previewVideoList.push(preview);
        preview.startPreview(localVideo, mediaStreamConstraints, success, error);
        this.logger.debug('zsc.sp.0 call success');
        return true;
    };
    ;
    /*
     *    "zsc.sp.1": "ZegoStreamCenter.stopPreview"
     */
    ZegoStreamCenterWeb.prototype.stopPreview = function (localVideo) {
        if (!localVideo) {
            this.logger.warn('zsc.sp.0 localVideo null');
            return false;
        }
        for (var streamid in this.publisherList) {
            if (this.publisherList[streamid].localVideo === localVideo) {
                this.publisherList[streamid].localVideo = null;
            }
        }
        var preview = this.checkPreview(localVideo);
        if (!preview) {
            this.logger.warn('zsc.sp.0 no preview');
            return false;
        }
        if (preview.previewSuc) {
            preview.stopPreview();
            this.removePreview(preview);
        }
        return true;
    };
    ;
    /*
     *    "zsc.pss.0": "ZegoStreamCenter.setPublishStateStart"
     */
    ZegoStreamCenterWeb.prototype.setPublishStateStart = function (streamid, localVideo, playOption) {
        var _this = this;
        var totalStreamId = this.getTotalStreamId(streamid);
        var publish = this.publisherList[totalStreamId];
        if (publish) {
            this.logger.error('zsc.pss.0 publisher already exist');
            return false;
        }
        var publisher = new zego_publish_1.ZegoPublish(this.logger, null, this.dataReport, this.qualityTimerInterval);
        publisher.onPublishStateUpdate = function (type, _streamid, error) {
            var publish = _this.publisherList[_streamid];
            if (publish) {
                _this.onPublishStateUpdate(type, publish.streamId, error);
            }
            else {
                _this.logger.error('zsc.psuh.0 cannot find publish ' + streamid);
            }
        };
        publisher.onPublishQualityUpdate = function (_streamid, streamQuality) {
            var publish = _this.publisherList[_streamid];
            if (publish) {
                _this.onPublishQualityUpdate(publish.streamId, streamQuality);
            }
            else {
                _this.logger.error('zsc.psuh.0 cannot find publish ' + streamid);
            }
        };
        this.publisherList[totalStreamId] = {
            localVideo: localVideo,
            publisher: publisher,
            serverUrls: [],
            retryCount: 0,
            streamId: streamid,
            playOption: playOption
        };
        this.dataReport.eventStart(publisher.reportSeq, 'GetSignalUrl');
        return true;
    };
    ;
    /*
   *    "zsc.gts.0": "ZegoStreamCenter.getTotalStreamId"
   */
    ZegoStreamCenterWeb.prototype.getTotalStreamId = function (streamid) {
        if (this.testEnvironment) {
            var testStreamId = 'zegotest-' + this.appid + '-' + streamid;
            this.logger.info('zsc.gts.0 test streamid ' + testStreamId);
            return testStreamId;
        }
        return streamid;
    };
    /*
     *    "zsc.sps.0": "ZegoStreamCenter.startPublishingStream"
     */
    ZegoStreamCenterWeb.prototype.startPublishingStream = function (streamid, serverUrls, preferPublishSourceType) {
        this.logger.info('zsc.sps.0 call');
        var totalStreamid = this.getTotalStreamId(streamid);
        var publish = this.publisherList[totalStreamid];
        if (!publish) {
            this.logger.error('zsc.sps.0 publisher don\'t exist');
            return false;
        }
        var publisher = publish.publisher;
        this.dataReport.eventEndWithMsg(publisher.reportSeq, 'GetSignalUrl', {
            urls: serverUrls
        });
        if (!serverUrls || serverUrls.length === 0) {
            this.onPublishStateUpdate(zego_extern_1.ENUM_PUBLISH_STATE_UPDATE.error, streamid, zego_extern_1.publishErrorList.DISPATCH_ERROR);
            this.logger.info('zsc.sps.0 server don\'t have signal url');
            return false;
        }
        var serverUrl = serverUrls[0];
        publish.serverUrls = publish.serverUrls.concat(serverUrls);
        return this.connectPublishServer(totalStreamid, serverUrl);
    };
    ;
    ZegoStreamCenterWeb.prototype.updateWaitingList = function (signalInfo, isPublish, streamId, success, error) {
        if (isPublish) {
            signalInfo.publishWaitingList.push({
                streamId: streamId,
                success: success,
                error: error
            });
        }
        else {
            signalInfo.playWaitingList.push({
                streamId: streamId,
                success: success,
                error: error
            });
        }
    };
    /*
     *    "zsc.ps.0": "ZegoStreamCenter.publishStream"
     */
    ZegoStreamCenterWeb.prototype.publishStream = function (streamid) {
        var publisher = this.publisherList[streamid].publisher;
        if (!publisher) {
            this.logger.info('zsc.ps.0 publisher don\'t exist');
            return;
        }
        var localStream = null, videoInfo = null;
        var playOption = this.publisherList[streamid].playOption;
        var preview = this.checkPreview(this.publisherList[streamid].localVideo);
        if (preview) {
            localStream = preview.localStream;
            videoInfo = preview.videoInfo;
        }
        if (!localStream) {
            this.logger.info('zsc.ps.0 no localStream');
        }
        this.logger.debug('zsc.ps.0 call success');
        publisher.startPublish(streamid, localStream, videoInfo, playOption);
    };
    ZegoStreamCenterWeb.prototype.connectPublishServer = function (streamId, serverUrl) {
        var _this = this;
        var publish = this.publisherList[streamId];
        if (!publish) {
            this.logger.error('zsc.cps.0 publisher don\'t exist');
            return false;
        }
        this.dataReport.eventStart(publish.publisher.reportSeq, 'ConnectServer');
        this.connetWithReuseSignalServer(streamId, true, serverUrl, function (streamid, signalInfo) {
            //check streamid exist
            var checkPublish = _this.publisherList[streamid];
            if (!checkPublish) {
                _this.logger.info('zsc.cps.0 after connect publisher don\'t exist');
                return;
            }
            var checkPublisher = checkPublish.publisher;
            if (!checkPublisher) {
                _this.logger.info('zsc.cps.1 check publisher don\'t exist');
                return;
            }
            _this.dataReport.eventEndWithMsg(checkPublisher.reportSeq, 'ConnectServer', {
                result: 0,
                server: serverUrl
            });
            var tokenInfo = signalInfo.tokenInfo;
            _this.logger.info('zsc.cps.0 update token success');
            if (tokenInfo && tokenInfo.report) {
                checkPublisher.qualityUpload = tokenInfo.report;
                checkPublisher.qualityUploadInterval = tokenInfo.report_interval;
            }
            checkPublisher.signal = signalInfo.signal;
            checkPublish.retryCount = 0;
            _this.publishStream(streamid);
            _this.getTokenSuccess();
        }, function (streamid, result) {
            _this.logger.error('zsc.cps.0 update token failed ' + result);
            //check streamid exist
            var checkPublish = _this.publisherList[streamid];
            if (!checkPublish) {
                _this.logger.info('zsc.cps.0 after connect publisher don\'t exist');
                return;
            }
            if (_this.shouldRetry(checkPublish, result)) {
                _this.logger.info('zsc.cps.1 retry connect');
                var retryServerUrl = checkPublish.serverUrls[0];
                checkPublish.serverUrls.splice(0, 1);
                checkPublish.retryCount += 1;
                _this.connectPublishServer(streamid, retryServerUrl);
            }
            else {
                _this.onPublishStateUpdate(zego_extern_1.ENUM_PUBLISH_STATE_UPDATE.error, streamid, zego_extern_1.publishErrorList.TOKEN_ERROR);
            }
        });
        return true;
    };
    ZegoStreamCenterWeb.prototype.shouldRetry = function (stream, errorCode) {
        if (stream.serverUrls.length == 0) {
            return false;
        }
        if (stream.retryCount >= this.maxRetryCount) {
            return false;
        }
        if (errorCode != 3) {
            return false;
        }
        return true;
    };
    /*
     *    "zsc.gts.0": "ZegoStreamCenter.getTokenSuccess"
     */
    ZegoStreamCenterWeb.prototype.getTokenSuccess = function () {
        this.logger.debug('zsc.gts.0 call');
    };
    /*
     *    "zsc.sps.0.1": "ZegoStreamCenter.stopPublishingStream"
     */
    ZegoStreamCenterWeb.prototype.stopPublishingStream = function (streamid) {
        var totalStreamId = this.getTotalStreamId(streamid);
        var publish = this.publisherList[totalStreamId];
        if (!publish) {
            this.logger.warn('zsc.sps.0.1 publisher don\'t exist');
            return;
        }
        if (publish.publisher) {
            publish.publisher.stopPublish();
            delete publish.publisher;
        }
        //update signal
        this.removeStreamFromSignal(true, totalStreamId);
        this.stopSignalHeartbeat();
        delete this.publisherList[totalStreamId];
        this.logger.debug('zsc.sps.0.1 call success');
    };
    ;
    /*
     *    "zsc.psao.1": "ZegoStreamCenter.setPlayStreamAudioOutput"
     */
    ZegoStreamCenterWeb.prototype.setPlayStreamAudioOutput = function (streamid, audioOutput) {
        var totalStreamId = this.getTotalStreamId(streamid);
        if (audioOutput != undefined && audioOutput.length != 0) {
            this.logger.debug('zsc.psao.1 device ' + audioOutput);
            var play = this.playerList[totalStreamId];
            if (!play) {
                this.logger.info('zsc.psao.1 play don\'t exist');
                return false;
            }
            if (!play.player) {
                this.logger.info('zsc.psao.1 player don\'t exist');
                return false;
            }
            return play.player.setAudioDestination(audioOutput);
        }
        return false;
    };
    ;
    /*
     *    "zsc.psao.0": "ZegoStreamCenter.setPublishStreamAudioOutput"
     */
    ZegoStreamCenterWeb.prototype.setStreamAudioOutput = function (localVideo, audioOutput) {
        var _this = this;
        if (audioOutput != undefined && audioOutput.length != 0 && localVideo) {
            this.logger.debug('zsc.ssao.0 device ' + audioOutput);
            if (!localVideo) {
                this.logger.error('zsc.ssao.0 no localVideo');
                return false;
            }
            if (localVideo.sinkId !== 'undefined') {
                localVideo.setSinkId(audioOutput).then(function () {
                    _this.logger.info('zsc.ssao.0 success device: ' + audioOutput);
                    // _this.audioOutput = audioOutput;
                }).catch(function (error) {
                    _this.logger.info('zsc.ssao.0 ' + error.name);
                });
                return true;
            }
            else {
                this.logger.error('zsc.ssao.0 browser does not suppport');
                return false;
            }
        }
        return false;
    };
    ;
    /*
      *    "zsc.crss.0": "ZegoStreamCenter.connetWithReuseSignalServer"
      */
    ZegoStreamCenterWeb.prototype.connetWithReuseSignalServer = function (streamId, isPublish, serverUrl, success, error) {
        var _this = this;
        this.logger.info('zsc.crss.0 begin ' + serverUrl);
        var signalInfo = null;
        if (this.signalList[serverUrl]) {
            signalInfo = this.signalList[serverUrl];
            //already connected
            if (signalInfo.state == zego_entity_1.ENUM_SIGNAL_STATE.connected) {
                this.logger.info('zsc.crss.0 already connected ' + serverUrl + ' streamId: ' + streamId);
                if (isPublish) {
                    signalInfo.publishConnectedList.push(streamId);
                }
                else {
                    signalInfo.playConnectedList.push(streamId);
                }
                success(streamId, signalInfo);
            }
            else if (signalInfo.state == zego_entity_1.ENUM_SIGNAL_STATE.connecting) { //isConnecting
                this.logger.debug('zsc.crss.0 signal is connecting ' + serverUrl + ' streamId: ' + streamId);
                this.updateWaitingList(signalInfo, isPublish, streamId, success, error);
            }
        }
        else {
            //no connect
            this.logger.info('zsc.crss.0 new signal ' + serverUrl + ' streamId: ' + streamId);
            var signal = new zego_signal_1.ZegoSignal(this.logger, this.stateCenter);
            signal.setSessionInfo(this.appid, this.userid);
            signal.onUpdateHeartBeartInterval = this.onUpdateHeartBeartIntervalHandle;
            signal.onDisconnect = this.onDisconnectHandle;
            this.signalList[serverUrl] = {
                signal: signal,
                state: zego_entity_1.ENUM_SIGNAL_STATE.connecting,
                publishWaitingList: [],
                playWaitingList: [],
                publishConnectedList: [],
                playConnectedList: [],
                tokenInfo: null
            };
            this.updateWaitingList(this.signalList[serverUrl], isPublish, streamId, success, error);
            signal.connectServer(this.token, serverUrl, function (result, server, tokenInfo) {
                signalInfo = _this.signalList[serverUrl];
                var i = 0;
                var publishCallback;
                var playCallback;
                if (result != 0) {
                    //connected failed, notify and delete
                    _this.logger.debug('zsc.crss.0 connect failed ' + server);
                    for (i = 0; i < signalInfo.publishWaitingList.length; i++) {
                        publishCallback = signalInfo.publishWaitingList[i];
                        if (publishCallback.error) {
                            publishCallback.error(publishCallback.streamId, result);
                        }
                    }
                    for (i = 0; i < signalInfo.playWaitingList.length; i++) {
                        playCallback = signalInfo.playWaitingList[i];
                        if (playCallback.error) {
                            playCallback.error(playCallback.streamId, result);
                        }
                    }
                    delete _this.signalList[serverUrl];
                }
                else {
                    //connected success, notify and update state
                    _this.logger.debug('zsc.crss.0 connected success ' + server);
                    signalInfo.state = zego_entity_1.ENUM_SIGNAL_STATE.connected;
                    signalInfo.tokenInfo = tokenInfo;
                    for (i = 0; i < signalInfo.publishWaitingList.length; i++) {
                        publishCallback = signalInfo.publishWaitingList[i];
                        if (publishCallback.success) {
                            publishCallback.success(publishCallback.streamId, signalInfo);
                        }
                        signalInfo.publishConnectedList.push(publishCallback.streamId);
                    }
                    for (i = 0; i < signalInfo.playWaitingList.length; i++) {
                        playCallback = signalInfo.playWaitingList[i];
                        if (playCallback.success) {
                            playCallback.success(playCallback.streamId, signalInfo);
                        }
                        signalInfo.playConnectedList.push(playCallback.streamId);
                    }
                    signalInfo.publishWaitingList = [];
                    signalInfo.playWaitingList = [];
                    if (_this.heartbeatTimer == null)
                        _this.startSignalHeartbeat();
                }
            });
        }
    };
    /*
     *    "zsc.pss.1": "ZegoStreamCenter.setPlayStateStart"
     */
    ZegoStreamCenterWeb.prototype.setPlayStateStart = function (streamid, remoteVideo, audioOutput, playOption) {
        var totalStreamId = this.getTotalStreamId(streamid);
        var play = this.playerList[totalStreamId];
        if (play) {
            this.logger.warn('zsc.pss.1 player already exist');
            return false;
        }
        var player = new zego_play_web_1.ZegoPlayWeb(this.logger, null, this.dataReport, this.qualityTimerInterval);
        player.onPlayStateUpdate = this.onPlayStateUpdate;
        player.onPlayQualityUpdate = this.onPlayQualityUpdate;
        player.onVideoSizeChanged = this.onVideoSizeChanged;
        this.playerList[totalStreamId] = {
            player: player,
            remoteVideo: remoteVideo,
            audioOutput: audioOutput,
            signal: null,
            serverUrls: [],
            retryCount: 0,
            playOption: playOption
        };
        this.dataReport.eventStart(player.reportSeq, 'GetSignalUrl');
        return true;
    };
    ;
    /*
     *    "zsc.sps.1": "ZegoStreamCenter.startPlayingStream"
     */
    ZegoStreamCenterWeb.prototype.startPlayingStream = function (streamid, serverUrls, currentPlaySourceType) {
        this.logger.info('zsc.sps.1 start play called');
        var totalStreamId = this.getTotalStreamId(streamid);
        var play = this.playerList[totalStreamId];
        if (!play) {
            this.logger.error('zsc.sps.1 player don\'t exist');
            return false;
        }
        var player = play.player;
        this.dataReport.eventEndWithMsg(player.reportSeq, 'GetSignalUrl', {
            urls: serverUrls
        });
        if (serverUrls.length == 0) {
            this.onPlayStateUpdate(zego_extern_1.ENUM_PLAY_STATE_UPDATE.error, streamid, zego_extern_1.playErrorList.DISPATCH_ERROR);
            this.logger.info('zsc.sps.1 server don\'t have signal url');
            return false;
        }
        play.serverUrls = play.serverUrls.concat(serverUrls);
        return this.connectPlayServer(totalStreamId, serverUrls[0]);
    };
    ;
    /*
     *    "zsc.cps.1": "ZegoStreamCenter.connectPlayServer"
     */
    ZegoStreamCenterWeb.prototype.connectPlayServer = function (streamId, serverUrl) {
        var _this = this;
        var play = this.playerList[streamId];
        if (!play) {
            this.logger.error('zsc.cps.1 player don\'t exist');
            return false;
        }
        this.dataReport.eventStart(play.player.reportSeq, 'ConnectServer');
        this.connetWithReuseSignalServer(streamId, false, serverUrl, function (streamid, signalInfo) {
            //check streamid exist
            var checkPlay = _this.playerList[streamid];
            if (!checkPlay) {
                _this.logger.error('zsc.cps.1 after connect player don\'t exist');
                return;
            }
            var checkPlayer = checkPlay.player;
            if (!checkPlayer) {
                _this.logger.error('zsc.cps.1 checkplayer don\'t exist');
                return;
            }
            _this.dataReport.eventEndWithMsg(checkPlayer.reportSeq, 'ConnectServer', {
                result: 0,
                server: serverUrl
            });
            var tokenInfo = signalInfo.tokenInfo;
            _this.logger.info('zsc.cps.1 update token success');
            if (tokenInfo && tokenInfo.report) {
                checkPlayer.qualityUpload = tokenInfo.report;
                checkPlayer.qualityUploadInterval = tokenInfo.report_interval;
            }
            checkPlayer.signal = signalInfo.signal;
            checkPlay.retryCount = 0;
            _this.playStream(streamid);
            _this.getTokenSuccess();
        }, function (streamid, result) {
            var checkPlay = _this.playerList[streamid];
            if (!checkPlay) {
                _this.logger.error('zsc.cps.1 after connect player don\'t exist');
                return;
            }
            if (_this.shouldRetry(checkPlay, result)) {
                _this.logger.info('zsc.cps.1 retry connect');
                var retryServerUrl = checkPlay.serverUrls[0];
                checkPlay.serverUrls.splice(0, 1);
                checkPlay.retryCount += 1;
                _this.connectPlayServer(streamid, retryServerUrl);
            }
            else {
                _this.onPlayStateUpdate(zego_extern_1.ENUM_PLAY_STATE_UPDATE.error, streamid, zego_extern_1.playErrorList.TOKEN_ERROR);
            }
        });
        return true;
    };
    /*
     *    "zsc.ps.1": "ZegoStreamCenter.playStream"
     */
    ZegoStreamCenterWeb.prototype.playStream = function (streamid) {
        var player = this.playerList[streamid].player;
        if (!player) {
            this.logger.warn('zsc.ps.1 player don\'t exist');
            return;
        }
        this.logger.info('zsc.ps.1 call success');
        player.startPlay(streamid, this.playerList[streamid].remoteVideo, this.playerList[streamid].audioOutput, this.playerList[streamid].playOption);
    };
    /*
     *    "zsc.rsfs.0": "ZegoStreamCenter.removeStreamFromSignal"
     */
    ZegoStreamCenterWeb.prototype.removeStreamFromSignal = function (isPublish, streamId) {
        var deleteSignal = [];
        for (var serverUrl in this.signalList) {
            var signalInfo = this.signalList[serverUrl];
            if (isPublish) {
                for (var i = 0; i < signalInfo.publishConnectedList.length; i++) {
                    if (signalInfo.publishConnectedList[i] === streamId) {
                        this.logger.debug('zsc.rsfs.0 found from publish');
                        signalInfo.publishConnectedList.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var j = 0; j < signalInfo.playConnectedList.length; j++) {
                    if (signalInfo.playConnectedList[j] === streamId) {
                        this.logger.debug('zsc.rsfs.0 found from play');
                        signalInfo.playConnectedList.splice(j, 1);
                        break;
                    }
                }
            }
            if (signalInfo.publishConnectedList.length == 0 && signalInfo.playConnectedList.length == 0) {
                signalInfo.signal.disconnectServer();
                deleteSignal.push(serverUrl);
            }
        }
        for (var k = 0; k < deleteSignal.length; k++) {
            delete this.signalList[deleteSignal[k]];
        }
    };
    /*
     *    "zsc.ssh.1": "ZegoStreamCenter.stopSignalHeartbeat"
     */
    ZegoStreamCenterWeb.prototype.stopSignalHeartbeat = function () {
        this.logger.debug('zsc.ssh.1 call');
        var count = 0;
        for (var url in this.signalList) {
            count += 1;
        }
        if (this.heartbeatTimer && count == 0) {
            this.logger.info('zsc.ssh.1 stop');
            clearTimeout(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    };
    /*
     *    "zsc.sps.1.1": "ZegoStreamCenter.stopPlayingStream"
     */
    ZegoStreamCenterWeb.prototype.stopPlayingStream = function (streamid) {
        var totalStreamId = this.getTotalStreamId(streamid);
        var player = this.playerList[totalStreamId];
        if (!player) {
            this.logger.info('zsc.sps.1.1 player don\'t exist');
            return;
        }
        if (player.player) {
            player.player.stopPlay();
            delete player.player;
        }
        //update signal
        this.removeStreamFromSignal(false, totalStreamId);
        this.stopSignalHeartbeat();
        delete this.playerList[totalStreamId];
        this.logger.debug('zsc.sps.1.1 call success');
    };
    ;
    ZegoStreamCenterWeb.prototype.reset = function () {
        for (var publishStreamId in this.publisherList) {
            if (this.publisherList[publishStreamId].publisher) {
                this.publisherList[publishStreamId].publisher.stopPublish();
            }
        }
        for (var playStreamId in this.playerList) {
            if (this.playerList[playStreamId].player) {
                this.playerList[playStreamId].player.stopPlay();
            }
        }
        for (var serverUrl in this.signalList) {
            if (this.signalList[serverUrl].signal) {
                this.signalList[serverUrl].signal.disconnectServer();
            }
        }
        this.playerList = {};
        this.publisherList = {};
        this.signalList = {};
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    };
    ;
    ZegoStreamCenterWeb.prototype.startSignalHeartbeat = function () {
        var _this = this;
        this.logger.debug('zsc.ssh.0 call');
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
        this.heartbeatTimer = setTimeout(function () {
            _this.checkSignalHeartbeat();
        }, this.heartbeatInterval);
    };
    ZegoStreamCenterWeb.prototype.checkSignalHeartbeat = function () {
        this.logger.debug('zsc.csh.0 call');
        for (var streamUrl in this.signalList) {
            if (this.signalList[streamUrl].signal) {
                this.signalList[streamUrl].signal.sendHeartbeat();
            }
        }
        if (this.heartbeatTimer)
            this.startSignalHeartbeat();
    };
    ZegoStreamCenterWeb.prototype.checkPreview = function (localVideo) {
        for (var i = 0; i < this.previewVideoList.length; i++) {
            if (this.previewVideoList[i].localVideo === localVideo) {
                return this.previewVideoList[i];
            }
        }
        return null;
    };
    ZegoStreamCenterWeb.prototype.removePreview = function (preview) {
        for (var i = 0; i < this.previewVideoList.length; i++) {
            if (this.previewVideoList[i] === preview) {
                this.previewVideoList.splice(i, 1);
                break;
            }
        }
    };
    ZegoStreamCenterWeb.prototype.onPlayerStreamUrlUpdate = function (streamid, url, type) {
    };
    ZegoStreamCenterWeb.prototype.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
    };
    return ZegoStreamCenterWeb;
}(ZegoStreamCenter_1.ZegoStreamCenter));
exports.ZegoStreamCenterWeb = ZegoStreamCenterWeb;


/***/ })

/******/ });
});