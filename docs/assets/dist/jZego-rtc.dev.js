"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var r = t();

    for (var i in r) {
      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[i] = r[i];
    }
  }
}("undefined" != typeof self ? self : void 0, function () {
  return function (e) {
    var t = {};

    function r(i) {
      if (t[i]) return t[i].exports;
      var s = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
    }

    return r.m = e, r.c = t, r.d = function (e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: i
      });
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
      var i = Object.create(null);
      if (r.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var s in e) {
        r.d(i, s, function (t) {
          return e[t];
        }.bind(null, s));
      }
      return i;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 5);
  }([function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.PROTO_VERSION = "1.9.1", t.ROOMVERSION = "V1", function (e) {
      e[e.debug = 0] = "debug", e[e.info = 1] = "info", e[e.warn = 2] = "warn", e[e.error = 3] = "error", e[e.report = 99] = "report", e[e.disable = 100] = "disable";
    }(t.ENUM_LOG_LEVEL || (t.ENUM_LOG_LEVEL = {})), function (e) {
      e[e.disable = 0] = "disable", e[e.websocket = 1] = "websocket", e[e.https = 2] = "https";
    }(t.ENUM_REMOTE_TYPE || (t.ENUM_REMOTE_TYPE = {}));

    var i = function () {
      function e(e, t) {
        void 0 === e && (e = null), void 0 === t && (t = null), this._id = null, this.next = null, this.prev = null, this._id = e, this._data = t;
      }

      return Object.defineProperty(e.prototype, "id", {
        get: function get() {
          return this._id;
        },
        set: function set(e) {
          this._id = e;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(e.prototype, "data", {
        get: function get() {
          return this._data;
        },
        set: function set(e) {
          this._data = e;
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.hasNext = function () {
        return this.next && this.next.id;
      }, e.prototype.hasPrev = function () {
        return this.prev && this.prev.id;
      }, e;
    }();

    t.ListNode = i;

    var s = function () {
      function e() {
        this.start = new i(), this.end = new i(), this._idCounter = 0, this._numNodes = 0, this.start.next = this.end, this.start.prev = null, this.end.prev = this.start, this.end.next = null;
      }

      return e.prototype.insertBefore = function (e, t) {
        var r = new i(this._idCounter, t);
        return r.next = e, r.prev = e.prev, e.prev.next = r, e.prev = r, ++this._idCounter, ++this._numNodes, r;
      }, e.prototype.addLast = function (e) {
        return this.insertBefore(this.end, e);
      }, e.prototype.add = function (e) {
        return this.addLast(e);
      }, e.prototype.getFirst = function () {
        return 0 === this._numNodes ? null : this.start.next;
      }, e.prototype.getLast = function () {
        return 0 === this._numNodes ? null : this.end.prev;
      }, e.prototype.size = function () {
        return this._numNodes;
      }, e.prototype.getFromFirst = function (e) {
        var t = 0,
            r = this.start.next;
        if (e >= 0) for (; t < e && null !== r;) {
          r = r.next, ++t;
        } else r = null;
        if (null === r) throw "Index out of bounds.";
        return r;
      }, e.prototype.get = function (e) {
        return 0 === e ? this.getFirst() : e === this._numNodes - 1 ? this.getLast() : this.getFromFirst(e);
      }, e.prototype.remove = function (e) {
        return e.prev.next = e.next, e.next.prev = e.prev, --this._numNodes, e;
      }, e.prototype.removeFirst = function () {
        var e = null;
        return this._numNodes > 0 && (e = this.remove(this.start.next)), e;
      }, e.prototype.removeLast = function () {
        var e = null;
        return this._numNodes > 0 && (e = this.remove(this.end.prev)), e;
      }, e.prototype.removeAll = function () {
        this.start.next = this.end, this.end.prev = this.start, this._numNodes = 0, this._idCounter = 0;
      }, e.prototype.each = function (e) {
        for (var t = this.start; t.hasNext();) {
          e(t = t.next);
        }
      }, e.prototype.find = function (e) {
        for (var t = this.start, r = !1, i = null; t.hasNext() && !r;) {
          e(t = t.next) && (i = t, r = !0);
        }

        return i;
      }, e.prototype.map = function (e) {
        for (var t = this.start, r = []; t.hasNext();) {
          e(t = t.next) && r.push(t);
        }

        return r;
      }, e.prototype.push = function (e) {
        return this.addLast(e);
      }, e.prototype.unshift = function (e) {
        this._numNodes > 0 ? this.insertBefore(this.start.next, e) : this.insertBefore(this.end, e);
      }, e.prototype.pop = function () {
        return this.removeLast();
      }, e.prototype.shift = function () {
        return this.removeFirst();
      }, e;
    }();

    t.LinkedList = s, t.sdkErrorList = {
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
    }, function (e) {
      e[e.disconnected = 0] = "disconnected", e[e.connecting = 1] = "connecting", e[e.connected = 2] = "connected";
    }(t.ENUM_SIGNAL_STATE || (t.ENUM_SIGNAL_STATE = {})), t.ENUM_RESOLUTION_TYPE = {
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
    }, t.ENUM_RETRY_STATE = {
      didNotStart: 0,
      retrying: 1,
      finished: 2
    }, t.ENUM_PUBLISH_STATE = {
      start: 0,
      waitingSessionRsp: 1,
      waitingOffserRsp: 2,
      waitingServerAnswer: 3,
      waitingServerICE: 4,
      connecting: 5,
      publishing: 6,
      stop: 7,
      didNotStart: 8
    }, t.ENUM_PUBLISH_STATE_NEGO = {
      stop: 0,
      start: 1,
      waiterAnswer: 2,
      waitingCandidate: 3,
      sendCandidate: 4,
      iceConnected: 5
    }, t.ENUM_PLAY_STATE = {
      start: 0,
      waitingSessionRsp: 1,
      waitingOffserRsp: 2,
      waitingServerAnswer: 3,
      waitingServerICE: 4,
      connecting: 5,
      playing: 6,
      stop: 7,
      didNotStart: 8
    }, t.ENUM_PLAY_STATE_NEGO = {
      stop: 0,
      start: 1,
      waiterAnswer: 2,
      waitingCandidate: 3,
      sendCandidate: 4,
      iceConnected: 5
    }, t.ENUM_CONNECT_STATE = {
      disconnect: 0,
      connecting: 1,
      connected: 2
    }, t.MAX_TRY_CONNECT_COUNT = 1, t.SEND_MSG_RESET = 2, t.SEND_MSG_TIMEOUT = 1, t.MAX_TRY_HEARTBEAT_COUNT = 5, t.ENUM_PUBLISH_STREAM_STATE = {
      waiting_url: 1,
      tryPublish: 2,
      update_info: 3,
      publishing: 4,
      stop: 5
    }, t.ENUM_STREAM_SUB_CMD = {
      liveNone: 0,
      liveBegin: 2001,
      liveEnd: 2002,
      liveUpdate: 2003
    }, t.ENUM_STREAM_UPDATE_TYPE = {
      added: 0,
      deleted: 1
    }, function (e) {
      e[e.logout = 0] = "logout", e[e.trylogin = 1] = "trylogin", e[e.login = 2] = "login";
    }(t.ENUM_RUN_STATE || (t.ENUM_RUN_STATE = {})), t.ENUM_PUBLISH_STATE_UPDATE = {
      start: 0,
      error: 1,
      retry: 2
    }, t.ENUM_PLAY_STATE_UPDATE = {
      start: 0,
      error: 1,
      retry: 2
    }, t.MAX_TRY_LOGIN_COUNT = 5, t.TRY_LOGIN_INTERVAL = [2e3, 4e3, 6e3, 8e3, 1e4], t.MINIUM_HEARTBEAT_INTERVAL = 3e3, t.ENUM_STREAM_UPDATE_CMD = {
      added: 12001,
      deleted: 12002,
      updated: 12003
    }, t.SERVER_ERROR_CODE = 1e4, t.MIXSTREAM_ERROR_CODE = 1e4, function (e) {
      e[e.low = 1] = "low", e[e.stantard = 2] = "stantard", e[e.hight = 3] = "hight", e[e.custome = 4] = "custome";
    }(t.QUALITYLEVEL || (t.QUALITYLEVEL = {})), t.ENUM_SIGNAL_SUB_CMD = {
      none: 0,
      joinLiveRequest: 1001,
      joinLiveResult: 1002,
      joinLiveInvite: 1003,
      joinLiveStop: 1004
    }, t.ENUM_PUSH_SIGNAL_SUB_CMD = {
      none: 0,
      pushJoinLiveRequest: 11001,
      pushJoinLiveResult: 11002,
      pushJoinLiveInvite: 11003,
      pushJoinLiveStop: 11004
    }, function (e) {
      e[e.auto = 0] = "auto", e[e.ultra = 1] = "ultra";
    }(t.ENUM_PLAY_SOURCE_TYPE || (t.ENUM_PLAY_SOURCE_TYPE = {})), function (e) {
      e[e.stop = 0] = "stop", e[e.start = 1] = "start";
    }(t.ENUM_BROADCASTER_STATUS || (t.ENUM_BROADCASTER_STATUS = {})), function (e) {
      e[e.cdn = 0] = "cdn", e[e.ultra = 1] = "ultra", e[e.customUrl = 2] = "customUrl";
    }(t.ENUM_DISPATCH_TYPE || (t.ENUM_DISPATCH_TYPE = {})), function (e) {
      e[e.ClientType_None = 0] = "ClientType_None", e[e.ClientType_H5 = 1] = "ClientType_H5", e[e.ClientType_SmallPragram = 2] = "ClientType_SmallPragram", e[e.ClientType_Webrtc = 3] = "ClientType_Webrtc";
    }(t.E_CLIENT_TYPE || (t.E_CLIENT_TYPE = {}));
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      function e() {}

      return e.checkConfigParam = function (e, t) {
        return e.appid && "number" == typeof e.appid ? !e.server || e.server.length < 1 || "string" != typeof e.server && !Array.isArray(e.server) ? (t.error("ccp.0 server must be string or string[] and not empty"), !1) : !(!e.idName || "string" != typeof e.idName) || (t.error("ccp.0 idName must be string and not empty"), !1) : (t.error("ccp.0 appid must be number"), !1);
      }, e.checkLoginParam = function (e, t) {
        return !0;
      }, e.checkPreviewParam = function (e, t) {
        var r = e.bitRate;

        if (4 === e.videoQuality || e.externalMediaStream) {
          if ("number" != typeof e.width) return t.error("zc.p.sp.0 width must be number"), !1;
          if ("number" != typeof e.height) return t.error("zc.p.sp.0 height must be number"), !1;
          if ("number" != typeof e.frameRate) return t.error("zc.p.sp.0 frameRate must be number"), !1;
          if ("number" == typeof r) r < 48 && (r = 48), r > 1e4 && (r = 1e4), e.minBitRate = e.maxBitRate = e.bitRate;else if (r.minBitRate && r.maxBitRate && "number" == typeof r.minBitRate && "number" == typeof r.maxBitRate && r.minBitRate <= r.maxBitRate) e.minBitRate = r.minBitRate < 48 ? 48 : r.minBitRate, e.maxBitRate = r.maxBitRate > 1e4 ? 1e4 : r.maxBitRate;else if (r) return t.error("zc.p.sp.0 bitRate must be number or object which has minBitRate and maxBitRate"), !1;
        }

        return !0;
      }, e.registerCallback = function (e, t, r) {
        var i, s;
        t.success && (i = t.success), t.error && (s = t.error), r[e + "SuccessCallback"] = i, r[e + "ErrorCallback"] = s;
      }, e.actionErrorCallback = function (e, t) {
        return t[e + "ErrorCallback"];
      }, e.actionSuccessCallback = function (e, t) {
        return t[e + "SuccessCallback"];
      }, e.getDevices = function (e, t) {
        void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function (t) {
          for (var r = [], i = [], s = [], n = 0; n < t.length; n++) {
            var o = t[n];
            "audioinput" === o.kind && r.push({
              deviceName: o.label,
              deviceID: o.deviceId
            }), "audiooutput" === o.kind && i.push({
              deviceName: o.label,
              deviceID: o.deviceId
            }), "videoinput" === o.kind && s.push({
              deviceName: o.label,
              deviceID: o.deviceId
            });
          }

          e && e({
            microphones: r,
            speakers: i,
            cameras: s
          });
        })["catch"](function (e) {
          console.error("enumerate devices wrong " + e), t && t({
            code: "2000000007",
            msg: "enumerate devices fail"
          });
        }) : t && t({
          code: "2002000002",
          msg: "browser do not support"
        });
      }, e.getServerError = function (e) {
        var t = {
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
          1010: "token expired",
          2002: "biz channel error",
          1e9: "liveroom cmd error, result="
        };
        if (0 === e) return {
          code: "ZegoClient.Success",
          msg: "success"
        };
        var r = {
          code: "ZegoClient.Error.Server",
          msg: ""
        };
        return r.msg = e > 1e9 ? t[1e9] + e : t[e] ? t[e] : "unknown error code:" + e, r;
      }, e.isKeepTryLogin = function (e) {
        switch (e) {
          case 1002:
          case 1003:
            return !0;

          default:
            return !1;
        }
      }, e.mergeStreamList = function (e, t, r, i, s) {
        e.debug("msl.0 call");
        var n,
            o = [],
            a = [],
            c = [];
        i || (i = []);

        for (var l = 0; l < i.length; l++) {
          if (i[l].anchor_id_name != t) {
            n = !1;

            for (var d = 0; d < r.length; d++) {
              if (i[l].stream_id === r[d].stream_id) {
                i[l].extra_info !== r[d].extra_info && c.push(i[l]), n = !0;
                break;
              }
            }

            n || o.push(i[l]);
          } else e.debug("msl.0 have self stream added");
        }

        for (var h = 0; h < r.length; h++) {
          n = !1;

          for (var u = 0; u < i.length; u++) {
            if (r[h].stream_id === i[u].stream_id) {
              n = !0;
              break;
            }
          }

          n || a.push(r[h]);
        }

        r.splice(0);

        for (l = 0; l < i.length; l++) {
          r.push(i[l]);
        }

        s(o, a, c), e.debug("msl.0 call success");
      }, e.checkCustomCommandParam = function (e) {
        return !0;
      }, e.generateRandumNumber = function (e) {
        return parseInt(Math.random() * (e + 1) + "", 10);
      }, e.uuid = function (e, t) {
        var r,
            i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
            s = [];
        if (t = t || i.length, e) for (r = 0; r < e; r++) {
          s[r] = i[0 | Math.random() * t];
        } else {
          var n = void 0;

          for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", r = 0; r < 36; r++) {
            s[r] || (n = 0 | 16 * Math.random(), s[r] = i[19 == r ? 3 & n | 8 : n]);
          }
        }
        return s.join("");
      }, e.supportDetection = function (e, t, r) {
        var i = {
          webRtc: !1,
          capture: !1,
          videoDecodeType: {
            H264: !1,
            VP8: !1
          },
          screenSharing: e
        };
        navigator && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && (i.capture = !0), window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection ? (i.webRtc = !0, this.supportVideoCodeType(function (e) {
          i.videoDecodeType.H264 = e.H264, i.videoDecodeType.VP8 = e.VP8, t && t(i);
        }, function (e) {
          r && r(e);
        })) : t && t(i);
      }, e.compareVersion = function (e, t) {
        e = e.split("."), t = t.split(".");

        for (var r = Math.max(e.length, t.length); e.length < r;) {
          e.push("0");
        }

        for (; t.length < r;) {
          t.push("0");
        }

        for (var i = 0; i < r; i++) {
          var s = parseInt(e[i]),
              n = parseInt(t[i]);
          if (s > n) return 1;
          if (s < n) return -1;
        }

        return 0;
      }, e.isSupportLive = function (e, t) {
        var r = "当前微信版本过低，无法使用相关组件",
            i = "需要摄像头和录音功能的授权",
            s = wx.getSystemInfoSync().SDKVersion,
            n = {
          code: -1,
          msg: ""
        };
        this.compareVersion(s, "1.7.0") < 0 && (n = {
          code: 10001,
          msg: r
        }, e && e(n)), wx.getSetting({
          success: function success(t) {
            var r = t.authSetting;
            r["scope.camera"] && r["scope.record"] || (n = {
              code: 10002,
              msg: i
            }), e && e(n);
          },
          fail: function fail(e) {
            t && t(e);
          }
        });
      }, e.isSupportQQLive = function (e, t) {
        var r = "当前微信版本过低，无法使用相关组件",
            i = "需要摄像头和录音功能的授权",
            s = qq.getSystemInfoSync().SDKVersion,
            n = {
          code: -1,
          msg: ""
        };
        this.compareVersion(s, "1.7.0") < 0 && (n = {
          code: 10001,
          msg: r
        }, e && e(n)), qq.getSetting({
          success: function success(t) {
            var r = t.authSetting;
            r["scope.camera"] && r["scope.record"] || (n = {
              code: 10002,
              msg: i
            }), e && e(n);
          },
          fail: function fail(e) {
            t && t(e);
          }
        });
      }, e.supportVideoCodeType = function (e, t) {
        var r = !1;
        new RTCPeerConnection(null).createOffer({
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        }).then(function (t) {
          if (t && t.sdp) {
            r = !0;
            var i = t.sdp.split("\r\n"),
                s = i.some(function (e) {
              return e.startsWith("a=rtpmap:") && e.indexOf("H264/") > -1;
            }),
                n = i.some(function (e) {
              return e.startsWith("a=rtpmap:") && e.indexOf("VP8/") > -1;
            }),
                o = i.some(function (e) {
              return e.startsWith("a=rtpmap:") && e.indexOf("VP9/") > -1;
            }),
                a = i.some(function (e) {
              return e.startsWith("a=rtpmap:") && e.indexOf("H264/") > -1;
            });
            e && e({
              H264: s,
              VP8: n,
              VP9: o,
              H265: a
            });
          }
        }, function (e) {
          r = !0, clearTimeout(i), t && t(e);
        });
        var i = setTimeout(function () {
          0 == r && t(!1);
        }, 200);
      }, e.inlineWorker = function (e) {
        if (Worker) {
          var t = e.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1],
              r = URL.createObjectURL(new window.Blob([t], {
            type: "text/javascript"
          }));
          return new Worker(r);
        }

        return null;
      }, e;
    }();

    t.ClientUtil = i;
  }, function (e, t, r) {
    "use strict";

    var i;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.playErrorList = {
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
      SERVER_NEGO_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.negotiation",
        msg: "negotiation timeout"
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
    }, t.publishErrorList = {
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
      SERVER_NEGO_TIMEOUT: {
        code: "ZegoPublish.Timeout.negotiation",
        msg: "negotiation timeout"
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
      MEDIA_CONNECTION_DISCONNECTED: {
        code: "ZegoPublish.Error.IConnectionDisconnected",
        msg: "ice connection state disconnected"
      },
      WEBSOCKET_ERROR: {
        code: "ZegoPublish.Error.SocketError",
        msg: "network error"
      }
    }, t.ENUM_PUBLISH_STATE_UPDATE = {
      start: 0,
      error: 1,
      retry: 2
    }, t.ENUM_PLAY_STATE_UPDATE = {
      start: 0,
      error: 1,
      retry: 2,
      stop: 3
    }, t.ENUM_RETRY_STATE = {
      didNotStart: 0,
      retrying: 1,
      finished: 2
    }, t.getSeq = (i = 1, function () {
      return i++;
    });
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      function e(e, t) {
        this.audioBufferList = [], this.loop = !1, this.replace = !1, this.effectEndedCallBack = null, this.effectEndedListener = null, this.startTimes = 0, this.startOffset = 0, this.pauseTimes = 0, this.resumeOffset = 0, this.isMixAudio = !1, this.isMixingBuffer = !1, this.logger = e, this.ac = t;
      }

      return e.prototype.preloadEffect = function (e, t) {
        var r = this;
        this.logger.info("amu.pe.0 start preload effect");
        var i = new XMLHttpRequest();
        i.open("GET", e, !0), i.responseType = "arraybuffer", i.onload = function () {
          if (200 == i.status || 304 == i.status) {
            var e = i.response;
            r.ac.decodeAudioData(e, function (e) {
              r.logger.info("amu.pe.0 effect preload success"), t("", e);
            }, function (e) {
              t(e);
            });
          } else {
            var s = i.statusText;
            t(s);
          }
        }, i.send();
      }, e.prototype.playEffect = function (e, t, r, i, s) {
        var n = this;
        !0 !== this.isMixAudio ? this.audioBuffer ? (this.startOffset = e || 0, this.loop = t || !1, this.replace = r || !1, this.effectEndedCallBack = s, this.mixEffect(this.audioBuffer, function () {
          n.buffSource.loop = !!t, e ? n.buffSource.start(0, e / 1e3) : n.buffSource.start(0), n.startTimes = Date.now(), n.effectEndedListener = n.effectEndedHandler.bind(n), n.buffSource.addEventListener("ended", n.effectEndedListener), i && i();
        })) : this.logger.error("amu.pe.1 no audio buffer found") : this.logger.error("amu.pe.1 audio is mixing");
      }, e.prototype.mixingBuffer = function (e, t) {
        var r = this;
        !0 !== this.isMixAudio || 0 != this.audioBufferList.length || 0 != this.isMixingBuffer ? this.ac.decodeAudioData(e, function (e) {
          r.audioBufferList.push(e), 1 == r.audioBufferList.length && r.playRealTimeEffect(r.audioBufferList[0]), r.isMixingBuffer = !0, t && t();
        }, function (e) {
          r.logger.error("amu.mb.0 " + e), t && t(e);
        }) : this.logger.error("amu.mb.0 audio is mixing");
      }, e.prototype.stopMingBuffer = function () {
        return this.isMixingBuffer = !1, this.stopMixingAudio();
      }, e.prototype.playRealTimeEffect = function (e) {
        var t = this;
        this.mixEffect(e, function () {
          t.buffSource.start(0), t.buffSource.addEventListener("ended", function () {
            t.audioBufferList.shift(), t.audioBufferList.length > 0 && t.isMixAudio && t.playRealTimeEffect(t.audioBufferList[0]);
          });
        });
      }, e.prototype.pauseEffect = function () {
        this.audioBufferList.length > 0 ? this.logger.error("amu.pe.0 real time buffer can not be paused") : (this.stopMixingAudio(), this.resumeOffset = (this.pauseTimes - this.startTimes + this.startOffset) % (1e3 * this.audioBuffer.duration));
      }, e.prototype.resumeEffect = function () {
        this.audioBufferList.length > 0 ? this.logger.error("amu.pe.0 real time buffer can not be resume") : (this.playEffect(this.resumeOffset, this.loop, this.replace, null, this.effectEndedCallBack), this.startOffset = this.resumeOffset);
      }, e.prototype.mixEffect = function (e, t) {
        this.localStream ? (this.gainNode = this.ac.createGain(), this.buffSource = this.ac.createBufferSource(), this.buffSource.buffer = e, this.buffSource.connect(this.gainNode), this.gainNode.connect(this.ac.destination), this.replaceTrack() && t()) : this.logger.error("amu.me.0 localStream can not be found");
      }, e.prototype.startMixingAudio = function (e, t) {
        return this.replace = t || !1, this.isMixAudio ? (this.logger.error("amu.sma.0 audio is mixing"), !1) : this.localStream ? (e.captureStream = e.captureStream || e.mozCaptureStream || e.webkitCaptureStream, this.gainNode = this.ac.createGain(), this.mixAudio = this.ac.createMediaStreamSource(e.captureStream()), this.mixAudio.connect(this.gainNode), this.replaceTrack()) : (this.logger.error("amu.sma.0 localStream can not be found"), !1);
      }, e.prototype.replaceTrack = function () {
        this.streamSource = this.ac.createMediaStreamSource(this.localStream), this.destination = this.ac.createMediaStreamDestination(), !this.replace && this.streamSource.connect(this.destination), this.gainNode.connect(this.destination);
        var e = this.destination.stream.getAudioTracks()[0],
            t = this.peerConnection.getSenders().find(function (t) {
          return t.track.kind === e.kind;
        });
        return t ? (this.micTrack = this.localStream.getAudioTracks()[0], t.replaceTrack(e), this.localStream.removeTrack(this.micTrack), this.localStream.addTrack(e), this.isMixAudio = !0, !0) : (this.logger.error("amu.rt.0 no sender"), !1);
      }, e.prototype.stopMixingAudio = function () {
        return this.isMixAudio ? this.localStream ? (this.mixAudio ? (this.mixAudio.disconnect(this.gainNode), this.mixAudio = null) : this.buffSource && (this.buffSource.removeEventListener("ended", this.effectEndedListener), this.buffSource.stop(), this.pauseTimes = Date.now(), this.buffSource.disconnect(this.gainNode), this.buffSource = null), this.gainNode.disconnect(this.destination), this.isMixAudio = !1, this.audioBufferList = [], !0) : (this.logger.error("amu.sma.1 localStream can not be found"), !1) : (this.logger.error("amu.sma.1 no mixing audio found"), !1);
      }, e.prototype.setMixingAudioVolume = function (e) {
        if (!this.gainNode) return this.logger.error("amu.sma.2 no mixing audio found"), !1;
        this.gainNode.gain.value = e;
      }, e.prototype.effectEndedHandler = function () {
        this.stopMixingAudio(), this.effectEndedCallBack && this.effectEndedCallBack();
      }, e;
    }();

    t.audioMixUtil = i;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      function e() {}

      return e.zegoSdp = function (e) {
        var t = e.split("\r\n"),
            r = [],
            i = [];
        t.forEach(function (e) {
          var t = e.match(/a=rtpmap:(\d+)\s+((H264\/90000)|(opus\/48000\/2))/);
          t && t[1] && t[2] && ("H264/90000" === t[2] && r.push(t[1]), "opus/48000/2" === t[2] && i.push(t[1]));
        });
        var s = [];
        return t.map(function (e) {
          var t = !0,
              n = e.match(/((a=rtcp-fb:)|(a=rtpmap:)|(a=fmtp:))(\d+)/);

          if (n && n[5] && (r.concat(i).some(function (e) {
            return e == n[5];
          }) || (t = !1)), e.indexOf("m=video") > -1) {
            var o = e.split(" ");
            e = [o[0], o[1], o[2]].concat(r).join(" ");
          } else if (e.indexOf("m=audio") > -1) {
            o = e.split(" ");
            e = [o[0], o[1], o[2]].concat(i).join(" ");
          }

          t && s.push(e);
        }), s.join("\r\n");
      }, e.getSDPByVideDecodeType = function (e, t) {
        var r = {
          str: "",
          arr: [],
          obj: {
            H264: [],
            H265: [],
            VP8: [],
            VP9: [],
            OHTER: []
          }
        };
        if (!e.includes("m=video")) return e;
        var i = /m=video.+/.exec(e)[0];
        i = i.match(/[\s|\d]+/g)[1].replace(" ", ""), r.str = i, r.arr = r.str.split(" "), r.arr.forEach(function (t) {
          var i = new RegExp("a=rtpmap:" + t + ".+").exec(e)[0];
          i.includes("H264") ? r.obj.H264.push(t) : i.includes("H265") ? r.obj.H265.push(t) : i.includes("VP8") ? r.obj.VP8.push(t) : i.includes("VP9") ? r.obj.VP9.push(t) : r.obj.OHTER.push(t);
        }), r.obj.OHTER.forEach(function (t) {
          var i = new RegExp("a=fmtp:" + t + ".+apt=(\\d+)").exec(e),
              s = i && i[1];
          s && (r.obj.H264.includes(s) ? r.obj.H264.push(t) : r.obj.H265.includes(s) ? r.obj.H265.push(t) : r.obj.VP8.includes(s) ? r.obj.VP8.push(t) : r.obj.VP9.includes(s) && r.obj.VP9.push(t));
        });
        var s = [];
        return "VP9" === t ? s = r.obj.H265.concat(r.obj.H264, r.obj.VP8) : "VP8" === t ? s = r.obj.H265.concat(r.obj.H264, r.obj.VP9) : "H264" === t ? s = r.obj.H265.concat(r.obj.VP8, r.obj.VP9) : "H265" === t && (s = r.obj.VP8.concat(r.obj.H264, r.obj.VP9)), s.forEach(function (t) {
          var i = r.arr.indexOf(t);
          r.arr.splice(i, 1);
          var s = new RegExp("a=rtpmap:" + t + ".+\\s\\n", "g"),
              n = new RegExp("a=rtcp-fb:" + t + ".+\\s\\n", "g"),
              o = new RegExp("a=fmtp:" + t + ".+\\s\\n", "g");
          e = (e = (e = e.replace(s, "")).replace(n, "")).replace(o, "");
        }), e = e.replace(i, r.arr.join(" "));
      }, e;
    }();

    t.sdpUtil = i;
  }, function (e, t, r) {
    "use strict";

    var i,
        s = this && this.__extends || (i = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (e[r] = t[r]);
      }
    }, function (e, t) {
      function r() {
        this.constructor = e;
      }

      i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
    }),
        n = this && this.__assign || Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++) {
        for (var s in t = arguments[r]) {
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
      }

      return e;
    },
        o = this && this.__awaiter || function (e, t, r, i) {
      return new (r || (r = Promise))(function (s, n) {
        function o(e) {
          try {
            c(i.next(e));
          } catch (e) {
            n(e);
          }
        }

        function a(e) {
          try {
            c(i["throw"](e));
          } catch (e) {
            n(e);
          }
        }

        function c(e) {
          e.done ? s(e.value) : new r(function (t) {
            t(e.value);
          }).then(o, a);
        }

        c((i = i.apply(e, t || [])).next());
      });
    },
        a = this && this.__generator || function (e, t) {
      var r,
          i,
          s,
          n,
          o = {
        label: 0,
        sent: function sent() {
          if (1 & s[0]) throw s[1];
          return s[1];
        },
        trys: [],
        ops: []
      };
      return n = {
        next: a(0),
        "throw": a(1),
        "return": a(2)
      }, "function" == typeof Symbol && (n[Symbol.iterator] = function () {
        return this;
      }), n;

      function a(n) {
        return function (a) {
          return function (n) {
            if (r) throw new TypeError("Generator is already executing.");

            for (; o;) {
              try {
                if (r = 1, i && (s = 2 & n[0] ? i["return"] : n[0] ? i["throw"] || ((s = i["return"]) && s.call(i), 0) : i.next) && !(s = s.call(i, n[1])).done) return s;

                switch (i = 0, s && (n = [2 & n[0], s.value]), n[0]) {
                  case 0:
                  case 1:
                    s = n;
                    break;

                  case 4:
                    return o.label++, {
                      value: n[1],
                      done: !1
                    };

                  case 5:
                    o.label++, i = n[1], n = [0];
                    continue;

                  case 7:
                    n = o.ops.pop(), o.trys.pop();
                    continue;

                  default:
                    if (!(s = o.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== n[0] && 2 !== n[0])) {
                      o = 0;
                      continue;
                    }

                    if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) {
                      o.label = n[1];
                      break;
                    }

                    if (6 === n[0] && o.label < s[1]) {
                      o.label = s[1], s = n;
                      break;
                    }

                    if (s && o.label < s[2]) {
                      o.label = s[2], o.ops.push(n);
                      break;
                    }

                    s[2] && o.ops.pop(), o.trys.pop();
                    continue;
                }

                n = t.call(e, o);
              } catch (e) {
                n = [6, e], i = 0;
              } finally {
                r = s = 0;
              }
            }

            if (5 & n[0]) throw n[1];
            return {
              value: n[0] ? n[1] : void 0,
              done: !0
            };
          }([n, a]);
        };
      }
    };

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var c = r(0),
        l = r(2),
        d = r(6),
        h = r(8),
        u = r(1),
        p = r(3),
        g = r(17),
        f = r(26),
        m = r(27),
        v = function (e) {
      function t() {
        var t = this,
            r = new d.LoggerWeb(),
            i = new f.StateCenter(),
            s = new ("undefined" != typeof webkitAudioContext ? webkitAudioContext : AudioContext)(),
            n = new h.ZegoStreamCenterWeb(r, i, s);
        return (t = e.call(this) || this).ac = s, t.streamCenter = n, t.logger = r, t.stateCenter = i, t.audioMixing = new p.audioMixUtil(r, t.ac), t.init(), t.bindWindowListener(), t;
      }

      return s(t, e), t.prototype.getSocket = function (e) {
        return new WebSocket(e);
      }, t.prototype.enableCamera = function (e, t) {
        return this.logger.debug("zc.p.ec.0 call"), "boolean" != typeof t ? (this.logger.error("zc.p.ec.0 argument is not bool"), !1) : this.streamCenter.enableCamera(e, t);
      }, t.prototype.enableMicrophone = function (e, t) {
        return this.logger.debug("zc.p.em.0 call"), "boolean" != typeof t ? (this.logger.error("zc.p.em.0 argument is not bool"), !1) : this.streamCenter.enableMicrophone(e, t);
      }, t.prototype.setLocalAudioOutput = function (e, t) {
        return this.logger.debug("zc.p.slao call"), "string" != typeof t ? (console.error("audiooutput is not string"), !1) : this.streamCenter.setStreamAudioOutput(e, t);
      }, t.prototype.setPlayAudioOutput = function (e, t) {
        return this.logger.debug("zc.p.spao call"), "string" != typeof t ? (console.error("audiooutput is not string"), !1) : this.streamCenter.setPlayStreamAudioOutput(e, t);
      }, t.prototype.setCustomSignalUrl = function (e) {
        if (this.logger.debug("zc.p.scs.0 call: " + e), !e || 0 == e.length) return this.logger.error("zc.p.scs.0 param error"), !1;
        var t = !0;
        if (e.forEach(function (e) {
          return 0 != e.indexOf("wss://") && (t = !1);
        }), !t) return this.logger.error("zc.p.scs.0 url is not correct"), !1;
        this.stateCenter.customUrl = e;
      }, t.prototype.setQualityMonitorCycle = function (e) {
        "number" == typeof e && e >= 1e3 && this.streamCenter.setQualityMonitorCycle(e);
      }, t.prototype.startPlayingStream = function (e, t, r, i) {
        var s = this;
        if (this.logger.info("zc.p.sps.0 call streamid " + e), !e || "" === e) return this.logger.error("zc.p.sps.0 param error"), !1;
        if (!t) return this.logger.error("zc.p.sps.0 don't have remoteVideo"), !1;
        if (this.stateCenter.customUrl) return this.streamCenter.setPlayStateStart(e, t, r, i) ? this.streamCenter.startPlayingStream(e, this.stateCenter.customUrl) : (this.logger.error("zc.p.sps.0 cannot start play"), !1);
        if (!this.stateCenter.isLogin()) return this.logger.error("zc.p.sps.0 not login"), !1;

        for (var n = !1, o = 0; o < this.stateCenter.streamList.length; o++) {
          if (this.stateCenter.streamList[o].stream_id === e) {
            n = !0;
            break;
          }
        }

        if (0 == n && this.logger.info("zc.p.sps.0 cannot find stream"), this.stateCenter.pullLimited || (e = NaN + e), !this.streamCenter.setPlayStateStart(e, t, r, i)) return this.logger.info("zc.p.sps.0 cannot start play"), !1;
        var a = {
          stream_id: e,
          ptype: "pull",
          signals: this.streamCenter.getAllInUseUrl()
        };
        return this.socketCenter.registerRouter("webrtc_url", function (e) {
          s.handleFetchWebRtcUrlRsp(e);
        }), this.socketCenter.sendMessage("webrtc_url", a, void 0, function (t, r) {
          t == c.sdkErrorList.SEND_MSG_TIMEOUT ? s.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, l.playErrorList.DISPATCH_TIMEOUT) : s.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, l.playErrorList.DISPATCH_ERROR), s.streamCenter.stopPlayingStream(e);
        }), !0;
      }, t.prototype.stopPlayingStream = function (e) {
        if (this.logger.info("zc.p.sps.1.0 call"), !e || "" === e) return this.logger.info("zc.p.sps.1.0 param error"), !1;
        var t = this.streamCenter.getTotalStreamId(e),
            r = this.streamCenter.playerList[t];
        if (!r || 0 == r.serverUrls.length || !r.player.signal) return r && this.logger.error("zc.p.sps.1.0 stream can not be destroyed"), !1;

        for (var i in this.streamCenter.stopPlayingStream(e), this.stateCenter.streamUrlMap) {
          if (this.stateCenter.streamUrlMap[i] === e) {
            delete this.stateCenter.streamUrlMap[i];
            break;
          }
        }

        return this.logger.debug("zc.p.sps.1.0 call success"), !0;
      }, t.prototype.startPreview = function (e, t, r, i) {
        if (this.logger.debug("zc.p.sp.0 call"), !e) return this.logger.error("zc.p.sp.0 no localVideo"), !1;

        if (t.audioBitRate) {
          if ("number" != typeof t.audioBitRate) return void this.logger.error("zc.p.sp.0 audioBitRate must be number");
          if (t.audioBitRate < 48e3) return void this.logger.error("zc.p.sp.0 audioBitRate cannot less 48000");
          this.stateCenter.audioBitRate = t.audioBitRate;
        }

        return !!u.ClientUtil.checkPreviewParam(t, this.logger) && this.streamCenter.startPreview(e, t, r, i);
      }, t.prototype.stopPreview = function (e) {
        return this.logger.debug("zc.p.sp.1 call"), e ? this.streamCenter.stopPreview(e) : (this.logger.info("zc.p.sp.1 param error"), !1);
      }, t.prototype.startPublishingStream = function (e, t, r, i) {
        var s = this;
        if (this.logger.info("zc.p.sps.1 call streamid: " + e), !e) return this.logger.error("zc.p.sps.1 param error"), !1;
        if (!this.streamCenter.checkPreview(t)) return this.logger.error("zc.p.sps.1 need preview before publish"), !1;
        if (i || (i = {}), i.audioBitRate = this.stateCenter.audioBitRate, this.stateCenter.customUrl && 0 != this.stateCenter.customUrl.length) return this.stateCenter.publishStreamList[e] = {
          state: c.ENUM_PUBLISH_STREAM_STATE.tryPublish,
          extra_info: r
        }, this.streamCenter.setPublishStateStart(e, t, i) ? this.streamCenter.startPublishingStream(e, this.stateCenter.customUrl) : (this.logger.info("zc.p.sps.1 cannot start publish"), !1);
        if (!this.stateCenter.isLogin()) return this.logger.error("zc.p.sps.1 not login"), !1;
        if (this.stateCenter.publishStreamList[e] = {
          state: c.ENUM_PUBLISH_STREAM_STATE.tryPublish,
          extra_info: r
        }, !this.streamCenter.setPublishStateStart(e, t, i)) return this.logger.error("zc.p.sps.1 cannot start publish"), !1;
        this.logger.info("zc.p.sps.1 start publish");
        var n = {
          stream_id: e,
          ptype: "push",
          signals: this.streamCenter.getAllInUseUrl(),
          header_kvs: [{
            key: "grpc-metadata-push",
            value: i && i.cdnUrl || ""
          }]
        };
        return this.socketCenter.registerRouter("webrtc_url", function (e) {
          s.handleFetchWebRtcUrlRsp(e);
        }), this.socketCenter.sendMessage("webrtc_url", n, void 0, function (t, r) {
          t == c.sdkErrorList.SEND_MSG_TIMEOUT ? s.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, l.publishErrorList.DISPATCH_TIMEOUT) : s.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, l.publishErrorList.DISPATCH_ERROR), s.streamCenter.stopPublishingStream(e);
        }), !0;
      }, t.prototype.stopPublishingStream = function (e) {
        if (this.logger.info("zc.p.sps.1.1 call streamid: " + e), !e) return this.logger.info("zc.p.sps.1.1 param error"), !1;
        var t = this.streamCenter.getTotalStreamId(e),
            r = this.streamCenter.publisherList[t];
        return r && 0 != r.serverUrls.length && r.publisher.signal ? (this.streamCenter.stopPublishingStream(e), this.stateCenter.publishStreamList[e] && (this.stateCenter.publishStreamList[e].state >= c.ENUM_PUBLISH_STREAM_STATE.update_info && this.streamHandler.updateStreamInfo(e, c.ENUM_STREAM_SUB_CMD.liveEnd), delete this.stateCenter.publishStreamList[e]), !0) : (r && this.logger.error("zc.p.sps.1.1 stream can not be destroyed when dispatching"), !1);
      }, t.prototype.preloadEffect = function (e, t, r) {
        var i = this;
        e && "number" == typeof e && t && "string" == typeof t ? this.stateCenter.audioEffectBuffer[e] ? this.logger.error("zc.pe.0 audio buffer already exists") : this.audioMixing.preloadEffect(t, function (t, s) {
          if (t) return i.logger.error("zc.pe.0 effect preload fail " + t), void (r && r(t));
          s && (i.stateCenter.audioEffectBuffer[e] = s, r && r());
        }) : this.logger.error("zc.pe.0 params error");
      }, t.prototype.playEffect = function (e, t, r) {
        if (e.streamId && "string" == typeof e.streamId && e.effectId && "number" == typeof e.effectId) {
          if (this.stateCenter.audioEffectBuffer[e.effectId]) {
            var i = this.stateCenter.audioEffectBuffer[e.effectId],
                s = this.getPublisher(e.streamId);
            s ? i ? s.playEffect(e, i, t, r) : this.logger.error("zc.pe.1 no audio buffer found") : this.logger.error("zc.pe.1 publisher doesn't exist");
          } else this.logger.error("zc,pe.1 audio buffer dosesn't exists");
        } else this.logger.error("zc.pe.1 params error");
      }, t.prototype.pauseEffect = function (e) {
        if (e && "string" == typeof e) {
          var t = this.getPublisher(e);
          t ? t.pauseEffect() : this.logger.error("zc.pe.2 publisher doesn't exist");
        } else this.logger.error("zc.pe.2 streamid format error");
      }, t.prototype.resumeEffect = function (e) {
        if (e && "string" == typeof e) {
          var t = this.getPublisher(e);
          t ? t.resumeEffect() : this.logger.error("zc.re.0 publisher doesn't exist");
        } else this.logger.error("zc.re.0 streamid format error");
      }, t.prototype.unloadEffect = function (e) {
        return e && "number" == typeof e ? (delete this.stateCenter.audioEffectBuffer[e], !0) : (this.logger.error("zc.ue.0 params error"), !1);
      }, t.prototype.startMixingAudio = function (e, t, r) {
        return this.logger.debug("zc.sma.0 call"), e && "string" == typeof e ? t ? Array.isArray(t) && 0 !== t.length ? this.streamCenter.startMixingAudio(e, t) : t instanceof HTMLMediaElement ? this.streamCenter.startMixingAudio(e, [t]) : (this.logger.error("zc.sma.0 audio param type error"), !1) : (this.logger.error("zc.sma.0 no audio"), !1) : (this.logger.error("zc.sma.0 stream id type error"), !1);
      }, t.prototype.stopMixingAudio = function (e, t) {
        return e && "string" == typeof e ? Array.isArray(t) && 0 !== t.length || void 0 === t ? this.streamCenter.stopMixingAudio(e, t) : (this.logger.error("zc.sma.0 audio param type error"), !1) : (this.logger.error("zc.sma.1 param streamID format error"), !1);
      }, t.prototype.mixingBuffer = function (e, t, r, i) {
        var s = this.getPublisher(e);
        s ? r instanceof ArrayBuffer ? s.mixingBuffer(r, i) : this.logger.error("zc.mb.0 array buffer not found") : this.logger.error("zc.mb.0 publisher doesn't exist");
      }, t.prototype.stopMixingBuffer = function (e, t) {
        if (!e || "string" != typeof e) return this.logger.error("zc.sma.1 param streamid format error"), !1;
        var r = this.getPublisher(e);
        return r ? r.stopMixingBuffer() : (this.logger.error("zc.sma.1 publisher doesn't exist"), !1);
      }, t.prototype.setMixingAudioVolume = function (e, t) {
        if (this.logger.debug("zc.sma.2 call"), !e || "string" != typeof e || "number" != typeof t || t < 0 || t > 100) return this.logger.error("zc.sma.2 param error"), !1;
        var r = this.getPublisher(e);
        return r ? r.audioMixing.setMixingAudioVolume(t / 100) : (this.logger.error("zc.sma.2 publisher doesn't exist"), !1);
      }, t.prototype.getPublisher = function (e) {
        var t = null,
            r = this.streamCenter.getTotalStreamId(e);
        return this.streamCenter.publisherList[r] && this.streamCenter.publisherList[r].publisher && (t = this.streamCenter.publisherList[r].publisher), t;
      }, t.prototype.startScreenShotChrome = function (e) {
        if (!t.screenShotReady) return this.logger.error('zc.b.ss Please install the extension:1. Go to chrome://extensions  2. Check: "Enable Developer mode   3. Click: "Load the unpacked extension... 4. Choose "extension" folder from the repository 5. Reload this page'), !1;
        window.postMessage({
          type: "SS_UI_REQUEST",
          text: "start"
        }, "*"), u.ClientUtil.registerCallback("screenShare", {
          success: e
        }, this.stateCenter.callbackList);
      }, t.prototype.startScreenSharing = function (e, t, r) {
        var i = this;
        "getDisplayMedia" in navigator.mediaDevices ? navigator.mediaDevices.getDisplayMedia({
          audio: t,
          video: {
            width: e.width || window.screen.width,
            height: e.height || window.screen.height,
            frameRate: e.frameRate || 15,
            displaySurface: e.displaySurface || "minitor"
          }
        }).then(function (e) {
          i.stateCenter.screenShotStreamList.push({
            stream: e,
            type: 0
          }), e.getVideoTracks()[0].onended = function () {
            var t = i.stateCenter.screenShotStreamList.findIndex(function (t) {
              return t.stream === e;
            });
            t > -1 && i.stateCenter.screenShotStreamList.splice(t, 1), i.onScreenSharingEnded(e);
          }, r(!0, e);
        })["catch"](function (e) {
          i.logger.error("zc.b.sss " + e), r(!1, null, e);
        }) : this.logger.error("zc.b.sss getDisplayMedia is not supported ");
      }, t.prototype.startScreenShotFirFox = function (e, t, r, i) {
        var s = this,
            n = {
          video: {
            width: e.width || window.screen.width,
            height: e.height || window.screen.height,
            frameRate: e.frameRate || 15
          },
          audio: r
        };
        n.video.mediaSource = t, navigator.mediaDevices.getUserMedia(n).then(function (e) {
          s.stateCenter.screenShotStreamList.push({
            stream: e,
            type: 0
          }), e.getVideoTracks()[0].onended = function () {
            var t = s.stateCenter.screenShotStreamList.findIndex(function (t) {
              return t.stream === e;
            });
            t > -1 && s.stateCenter.screenShotStreamList.splice(t, 1), s.onScreenSharingEnded(e);
          }, i(!0, e);
        })["catch"](function (e) {
          s.logger.error("zc.b.ssf " + e), i(!1, null);
        });
      }, t.prototype.stopScreenShot = function (e) {
        var t = this,
            r = [];
        void 0 === e ? r = this.stateCenter.screenShotStreamList.slice() : r.push({
          stream: e,
          type: -1
        }), r.forEach(function (e) {
          var r = t.stateCenter.screenShotStreamList.findIndex(function (t) {
            return t.stream === e.stream;
          });
          r > -1 && (e.stream.getTracks().forEach(function (e) {
            e.stop();
          }), 1 === t.stateCenter.screenShotStreamList[r].type && window.postMessage({
            type: "SS_UI_CANCEL",
            text: "start"
          }, "*"), t.stateCenter.screenShotStreamList.splice(r, 1));
        });
      }, t.prototype.switchDevice = function (e, t, r, i, s) {
        var n = this;
        "audio" !== e && "video" !== e || "string" != typeof r ? this.logger.error("zg.sd.0 param error") : this.enumDevices(function (o) {
          var a = o.cameras,
              c = o.microphones;
          a.find(function (e) {
            return e.deviceId == r;
          }) || c.find(function (e) {
            return e.deviceId == r;
          }) ? n.streamCenter.switchDevice(e, t, r, i, s) : n.logger.error("zg.sd.0 can not switch device");
        }, function (e) {
          return s && s(e);
        });
      }, t.prototype.WebrtcOnPublishStateUpdateHandle = function (e, t, r) {
        this.stateCenter.publishStreamList[t].state == c.ENUM_PUBLISH_STREAM_STATE.publishing && this.onPublishStateUpdate(e, t, r);
      }, t.prototype.setCDNInfo = function (e, t) {
        e.urls_flv = t.urls_flv, e.urls_hls = t.urls_m3u8, e.urls_https_flv = t.urls_https_flv, e.urls_https_hls = t.urls_https_m3u8, e.urls_rtmp = t.urls_rtmp;
      }, t.prototype.onScreenSharingEnded = function (e) {}, t.prototype.loginBodyData = function () {
        return {
          id_name: this.stateCenter.idName,
          nick_name: this.stateCenter.nickName,
          role: this.stateCenter.role,
          token: this.stateCenter.token,
          version: c.PROTO_VERSION,
          room_name: this.stateCenter.roomid,
          user_state_flag: this.stateCenter.userStateUpdate ? 1 : 0,
          room_create_flag: this.stateCenter.roomCreateFlag,
          client_type: c.E_CLIENT_TYPE.ClientType_Webrtc,
          third_token: this.stateCenter.third_token
        };
      }, t.prototype.screenStreamFrom = function (e, t, r) {
        var i = this,
            s = {};
        s.audio = {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: e
          }
        }, s.video = {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: e,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height
          }
        }, !t && (s.audio = !1), navigator.mediaDevices.getUserMedia(s).then(function (e) {
          i.stateCenter.screenShotStreamList.push({
            stream: e,
            type: 1
          }), e.getVideoTracks()[0].onended = function () {
            var t = i.stateCenter.screenShotStreamList.findIndex(function (t) {
              return t.stream === e;
            });
            t > -1 && i.stateCenter.screenShotStreamList.splice(t, 1), i.onScreenSharingEnded(e);
          }, r(!0, e);
        })["catch"](function (e) {
          i.logger.error("zc.b.ssf " + e), r(!1, null, e);
        });
      }, t.prototype.filterStreamList = function (e) {
        var t = {},
            r = {},
            i = {},
            s = [],
            n = 0;

        for (var o in this.stateCenter.streamList.forEach(function (t, r) {
          t.stream_id == e && (n = r);
        }), this.stateCenter.streamList[n]) {
          "urls_flv" != o && "urls_https_flv" != o || (t[o] = this.stateCenter.streamList[n][o]), "urls_m3u8" != o && "urls_https_m3u8" != o || (r[o] = this.stateCenter.streamList[n][o]), "urls_rtmp" == o && (i[o] = this.stateCenter.streamList[n][o]);
        }

        var a = window.location.protocol,
            c = window.navigator.userAgent;
        if (/Safari/.test(c) && !/Chrome/.test(c)) for (var o in r) {
          r[o] && r[o].forEach(function (e) {
            -1 !== e.indexOf(a) && s.push(e);
          });
        } else if ("http:" == a) for (var o in t) {
          t[o] && t[o].forEach(function (e) {
            -1 === e.indexOf("http") && -1 === e.indexOf("https") || s.push(e);
          });
        } else if ("https:" == a) for (var o in t) {
          t[o] && t[o].forEach(function (e) {
            -1 !== e.indexOf(a) && s.push(e);
          });
        } else if ("rtmp:" == a) for (var o in i) {
          i[o] && i[o].forEach(function (e) {
            -1 !== e.indexOf(a) && s.push(e);
          });
        }
        return s.filter(function (e, t, r) {
          return r.indexOf(e) == t;
        });
      }, t.prototype.voiceChange = function (e, t) {
        return e && "number" == typeof e ? t && "string" == typeof t ? this.getPublisher(t).voiceChange(e) : (this.logger.error("zc.vc.0 stream id error"), !1) : (this.logger.error("zc.vc.0 mult error"), !1);
      }, t.prototype.voiceBack = function (e) {
        return this.getPublisher(e).voiceBack();
      }, t.prototype.setPublishStreamConstraints = function (e, t, r, i) {
        this.logger.info("zc.spsc.0 call"), "string" == typeof e && "" != e ? this.streamCenter.setPublishStreamConstraints(e, t, r, i) : this.logger.error("zc.spsc.0 stream ID must be string and not empty");
      }, t.prototype.setSoundLevelDelegate = function (e, t) {
        this.logger.info("zc.ssd.0 call"), "boolean" == typeof e ? t && ("number" != typeof t || t < 100 || t > 3e3) ? this.logger.error("zc.ssd.0 soundLevel interval must be number which is between 100 and 3000") : this.streamCenter.setSoundLevelDelegate(e, t) : this.logger.error("zc.ssd.0 param 1 must be boolean");
      }, t.supportDetection = function (e, t) {
        navigator && navigator.mediaDevices && (this.screenShotReady || "getDisplayMedia" in navigator.mediaDevices) ? u.ClientUtil.supportDetection(!0, e, t) : u.ClientUtil.supportDetection(!1, e, t);
      }, t.prototype.enumDevices = function (e, r) {
        t.enumDevices(e, r);
      }, t.enumDevices = function (e, t) {
        void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function (t) {
          for (var r = [], i = [], s = [], n = 0; n < t.length; n++) {
            var o = t[n];
            "audioinput" === o.kind && r.push({
              label: o.label,
              deviceId: o.deviceId
            }), "audiooutput" === o.kind && i.push({
              label: o.label,
              deviceId: o.deviceId
            }), "videoinput" === o.kind && s.push({
              label: o.label,
              deviceId: o.deviceId
            });
          }

          e && e({
            microphones: r,
            speakers: i,
            cameras: s
          });
        })["catch"](function (e) {
          t && t(e);
        }) : t && t("browser don't support enumerate devices");
      }, t.getAudioInfo = function (e, t, r) {
        if (!e.srcObject) return console.error("srcObject is empty!"), !1;
        var i = n({}, r);
        return new m.MediaUtil(i).connectToSource(e.srcObject, function (e) {
          t(e);
        });
      }, t.handleDataAvailable = function (e) {
        e.data && e.data.size > 0 && t.recordedBlobs.push(e.data);
      }, t.startRecord = function (e, r, i) {
        return o(this, void 0, void 0, function () {
          var s, n;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return t.recordedBlobs = [], n = {
                  mimeType: "video/webm;codecs=vp9"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (n = {
                  mimeType: "video/webm;codecs=vp8"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (n = {
                  mimeType: "video/webm"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (n = {
                  mimeType: ""
                }))), r && r.audio ? (n = {
                  mimeType: "audio/webm"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (n = {
                  mimeType: ""
                }), [4, navigator.mediaDevices.getUserMedia({
                  audio: {
                    deviceId: r.audioInput ? r.audioInput : ""
                  }
                })]) : [3, 2];

              case 1:
                return s = o.sent(), t.recordType = "audio", [3, 3];

              case 2:
                s = e.captureStream(), o.label = 3;

              case 3:
                try {
                  t.mediaRecorder = new MediaRecorder(s, n);
                } catch (e) {
                  return console.error("Exception while creating MediaRecorder:", e), i && i(e), [2];
                }

                return t.mediaRecorder.onstop = function (e) {
                  console.log("Recorder stopped: ", e), r && r.audio && s.getTracks().forEach(function (e) {
                    return e.stop();
                  });
                }, t.mediaRecorder.ondataavailable = t.handleDataAvailable, t.mediaRecorder.start(10), i && i(), [2];
            }
          });
        });
      }, t.stopRecord = function () {
        t.mediaRecorder ? t.mediaRecorder.stop() : console.warn("please invoke startRecord first");
      }, t.resumeRecord = function () {
        t.mediaRecorder ? t.mediaRecorder.resume() : console.warn("please invoke startRecord first");
      }, t.pauseRecord = function () {
        t.mediaRecorder ? t.mediaRecorder.pause() : console.warn("please invoke startRecord first");
      }, t.saveRecord = function (e) {
        if (t.mediaRecorder && t.recordedBlobs) {
          var r = new Blob(t.recordedBlobs, {
            type: "video" === t.recordType ? "video/webm" : "audio/webm"
          }),
              i = window.URL.createObjectURL(r);

          if ("string" == typeof e && "" !== e) {
            var s = document.createElement("a");
            s.style.display = "none", s.href = i, s.download = e + ".webm", document.body.appendChild(s), s.click(), setTimeout(function () {
              document.body.removeChild(s), window.URL.revokeObjectURL(i);
            }, 100);
          }

          return i;
        }

        console.warn("please invoke startRecord first");
      }, t.resumeRecordAudio = function () {
        t.mediaRecorder ? t.mediaRecorder.resume() : console.warn("please invoke startRecordAudio first");
      }, t.pauseRecordAudio = function () {
        t.mediaRecorder ? t.mediaRecorder.pause() : console.warn("please invoke startRecordAudio first");
      }, t.getRecordAudio = function () {
        if (t.mediaRecorder && t.recordedBlobs) {
          var e = new Blob(t.recordedBlobs);
          return window.URL.createObjectURL(e);
        }

        console.warn("please invoke startRecordAudio first");
      }, t.takeSnapShot = function (e, t) {
        if (e && 0 !== e.videoHeight) {
          var r = document.createElement("canvas");
          r.width = e.videoWidth, r.height = e.videoHeight, r.getContext("2d").drawImage(e, 0, 0, r.width, r.height), t.src = r.toDataURL("image/jpeg");
        } else console.error("video can not empty");
      }, t.saveSnapShot = function (e, t) {
        if (e && 0 !== e.videoHeight) {
          var r = document.createElement("canvas");
          r.width = e.videoWidth, r.height = e.videoHeight, r.getContext("2d").drawImage(e, 0, 0, r.width, r.height), r.toBlob(function (e) {
            var r = window.URL.createObjectURL(e),
                i = document.createElement("a");
            i.style.display = "none", i.href = r, i.download = t + ".jpeg", document.body.appendChild(i), i.click(), setTimeout(function () {
              document.body.removeChild(i), window.URL.revokeObjectURL(r);
            }, 100);
          });
        } else console.error("video can not empty");
      }, t.prototype.bindWindowListener = function () {
        var e = this,
            t = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) ? "pagehide" : "beforeunload";
        window.addEventListener(t, function (t) {
          for (var r in window.event.cancelBubble = !0, e.streamCenter.publisherList) {
            e.stopPublishingStream(r);
          }

          for (var r in e.streamCenter.playerList) {
            e.stopPublishingStream(r);
          }

          console.log(e.streamCenter.playerList), console.log(e.streamCenter.publisherList), e.logout();
        }), window.addEventListener("message", function (t) {
          var r = t.data,
              i = r.type,
              s = r.streamId,
              n = r.canRequestAudioTrack;
          t.origin;
          "SS_DIALOG_SUCCESS" === i && e.screenStreamFrom(s, n, u.ClientUtil.actionSuccessCallback("screenShare", e.stateCenter.callbackList)), "SS_DIALOG_CANCEL" === i && (e.logger.error("zc.b.ss " + i), u.ClientUtil.actionSuccessCallback("screenShare", e.stateCenter.callbackList)(!1, null, i));
        });
      }, t.screenShotReady = !1, t.recordType = "video", t;
    }(g.BaseCenter);

    t.ZegoClient = v, window.addEventListener("message", function (e) {
      var t = e.data,
          r = t.type,
          i = (t.streamId, e.origin);
      i !== window.location.origin && console.warn("ScreenStream: you should discard foreign event from origin:", i), "SS_PING" === r && (v.screenShotReady = !0);
    });
  }, function (e, t, r) {
    "use strict";

    var i,
        s = this && this.__extends || (i = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (e[r] = t[r]);
      }
    }, function (e, t) {
      function r() {
        this.constructor = e;
      }

      i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = r(7),
        o = function (e) {
      function t() {
        return null !== e && e.apply(this, arguments) || this;
      }

      return s(t, e), t.prototype.openWebSocketLogServer = function (e) {
        if (this.url != e) {
          if (this.url = e, !e) return;
          if (null != this.websocket && 2 != this.websocket.readyState && 3 != this.websocket.readyState) return;
          this.stopWebSocketServer(), this.websocket = new WebSocket(e), this.websocket.onopen = function (e) {}, this.websocket.onclose = function (e) {
            console.error("onclose   websocket error:", e);
          }, this.websocket.onmessage = function (e) {}, this.websocket.onerror = function (e) {
            console.error("open log websocket error:" + e);
          };
        }
      }, t.prototype.SendHttpsLog = function () {
        var e = this;

        if (0 != this.logCacheSend.length) {
          var t = this.logCacheSend.join("\n"),
              r = new XMLHttpRequest();
          r.onreadystatechange = function () {
            if (4 == r.readyState) if (200 == r.status) {
              if (0 == r.responseText.length) return;

              try {
                var t = JSON.parse(r.responseText).interval;
                "number" == typeof t && e.logUploadInterval !== t && (e.timeInterval = t, e.openHttpsLogServer(e.url));
              } catch (e) {
                console.log("send result failed " + e);
              }
            } else console.log("send failed " + r.status);
          }, r.open("POST", this.url, !0), r.send(t), this.logCacheSend = [];
        }
      }, t.prototype.logReportParamList = function (e, t) {
        var r = new Date(),
            i = r.getFullYear() + "/";
        return i += (n.D[r.getMonth() + 1] || r.getMonth() + 1) + "/", i += (n.D[r.getDate()] || r.getDate()) + " ", i += (n.D[r.getHours()] || r.getHours()) + ":", i += (n.D[r.getMinutes()] || r.getMinutes()) + ":", i += n.D[r.getSeconds()] || r.getSeconds(), i += "." + r.getTime() % 1e3, t.time = i, t.level = e, t.console = "rtc", t.appid = this.appid, t.roomid = this.roomid, t.userid = this.userid, t.id_name = this.userid, t.userName = this.userName, t.sessionid = this.sessionid, t.version = this.version, [JSON.stringify(t)];
      }, t;
    }(n.Logger);

    t.LoggerWeb = o;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = r(0);
    t.D = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

    var s = function () {
      function e() {
        this.logLevel = i.ENUM_LOG_LEVEL.info, this.logUploadTimer = null, this.logUploadInterval = 1e4, this.logCache = [], this.logCacheSend = [], this.logCacheMax = 100;
      }

      return e.prototype.setLogLevel = function (e) {
        this.logLevel < i.ENUM_LOG_LEVEL.debug || this.logLevel > i.ENUM_LOG_LEVEL.report ? this.logLevel = i.ENUM_LOG_LEVEL.disable : this.logLevel = e;
      }, e.prototype.setRemoteLogLevel = function (e) {
        this.logRemoteLevel < i.ENUM_LOG_LEVEL.debug || this.logRemoteLevel > i.ENUM_LOG_LEVEL.report ? this.logRemoteLevel = i.ENUM_LOG_LEVEL.disable : this.logRemoteLevel = e;
      }, e.prototype.setSessionInfo = function (e, t, r, i, s, n) {
        this.appid = e, this.roomid = t, this.sessionid = r, this.userid = i, this.userName = s, this.version = n;
      }, e.prototype.openLogServer = function (e) {
        try {
          e.startsWith("wss:") ? (this.logType = i.ENUM_REMOTE_TYPE.websocket, this.openWebSocketLogServer(e)) : e.startsWith("https:") ? (this.logType = i.ENUM_REMOTE_TYPE.https, this.openHttpsLogServer(e)) : this.logType = i.ENUM_REMOTE_TYPE.disable;
        } catch (e) {
          this.error(JSON.stringify(e));
        }
      }, e.prototype.stopLogServer = function () {
        this.logType == i.ENUM_REMOTE_TYPE.websocket ? this.stopWebSocketServer() : this.logType == i.ENUM_REMOTE_TYPE.https && (this.SendHttpsLog(), this.stopHttpsServer()), this.logType = i.ENUM_REMOTE_TYPE.disable;
      }, e.prototype.stopWebSocketServer = function () {
        this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null);
      }, e.prototype.openHttpsLogServer = function (e) {
        var t = this;
        this.url = e, e && (this.stopHttpsServer(), this.logUploadTimer || (this.logUploadTimer = setInterval(function () {
          t.SendHttpsLog();
        }, this.logUploadInterval)));
      }, e.prototype.stopHttpsServer = function () {
        this.logUploadTimer && (clearInterval(this.logUploadTimer), this.logUploadTimer = null);
      }, e.prototype.report = function (e) {
        var t = this.logReportParamList(i.ENUM_LOG_LEVEL.report, e);
        this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.report && console.debug.apply(console, t), this.RemoteLog(i.ENUM_LOG_LEVEL.report, t, !0);
      }, e.prototype.debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }

        var r = this.logParamList(i.ENUM_LOG_LEVEL.debug, e.join(""));
        this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.debug && console.debug.apply(console, r), this.log(i.ENUM_LOG_LEVEL.debug, r);
      }, e.prototype.info = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }

        var r = this.logParamList(i.ENUM_LOG_LEVEL.info, e.join(""));
        this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.info && console.info.apply(console, r), this.log(i.ENUM_LOG_LEVEL.info, r);
      }, e.prototype.warn = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }

        var r = this.logParamList(i.ENUM_LOG_LEVEL.warn, e.join(""));
        this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.warn && console.warn.apply(console, r), this.log(i.ENUM_LOG_LEVEL.warn, r);
      }, e.prototype.error = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }

        var r = this.logParamList(i.ENUM_LOG_LEVEL.error, e.join(""));
        this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.error && console.error.apply(console, r), this.log(i.ENUM_LOG_LEVEL.error, r);
      }, e.prototype.log = function (e, t) {
        this.logRemoteLevel !== i.ENUM_LOG_LEVEL.disable && this.logRemoteLevel <= e && this.RemoteLog(e, t);
      }, e.prototype.RemoteLog = function (e, t, r) {
        if (void 0 === r && (r = !1), "" != this.url) if (this.logType == i.ENUM_REMOTE_TYPE.websocket) this.RemoteWebSocketLog(e, t);else if (this.logType == i.ENUM_REMOTE_TYPE.https) this.RemoteHttpsLog(e, t, r);else if (this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= e) for (this.logCacheSend.push(t); this.logCacheSend.length > this.logCacheMax;) {
          this.logCacheSend.shift();
        }
      }, e.prototype.RemoteWebSocketLog = function (e, t) {
        if ("string" == typeof t && t.length > 4e3) console.info("log over maximum, ignore");else if (null == this.websocket || 2 == this.websocket.readyState || 3 == this.websocket.readyState) {
          var r = this.url;
          this.url = "", this.openLogServer(r), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);
        } else if (0 == this.websocket.readyState) this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);else if (1 == this.websocket.readyState) {
          if (this.logCacheSend.length > 0) {
            for (var i = "", s = 0; s < this.logCacheSend.length; s++) {
              (i + this.logCacheSend[s]).length > 4e3 && (this.websocket.send(i), i = ""), i = i + this.logCacheSend[s] + "\n";
            }

            t = i + t, this.logCacheSend = [], this.websocket.send(t);
          } else this.websocket.send(t);
        } else console.warn("wrong socket state:" + this.websocket.readyState), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);
      }, e.prototype.RemoteHttpsLog = function (e, t, r) {
        this.logCacheSend.push(t), (this.logCacheSend.length >= this.logCacheMax || !0 === r) && this.SendHttpsLog();
      }, e.prototype.logParamList = function (e, r) {
        var i = new Date(),
            s = i.getFullYear() + "/";
        s += (t.D[i.getMonth() + 1] || i.getMonth() + 1) + "/", s += (t.D[i.getDate()] || i.getDate()) + " ", s += (t.D[i.getHours()] || i.getHours()) + ":", s += (t.D[i.getMinutes()] || i.getMinutes()) + ":", s += t.D[i.getSeconds()] || i.getSeconds(), s += "." + i.getTime() % 1e3;
        var n = r.substr(0, r.indexOf(" "));
        0 == n.length && (n = r);
        var o = r.substr(r.indexOf(" ") + 1, 4500);
        0 == o.length && (o = "");
        var a = {
          time: s,
          level: e,
          action: n,
          content: o,
          appid: this.appid,
          roomid: this.roomid,
          userid: this.userid,
          userName: this.userName,
          sessionid: this.sessionid
        };
        return [JSON.stringify(a)];
      }, e;
    }();

    t.Logger = s;
  }, function (e, t, r) {
    "use strict";

    var i,
        s = this && this.__extends || (i = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (e[r] = t[r]);
      }
    }, function (e, t) {
      function r() {
        this.constructor = e;
      }

      i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = r(9),
        o = r(10),
        a = r(11),
        c = r(2),
        l = r(0),
        d = r(14),
        h = r(15),
        u = r(16),
        p = r(1),
        g = function (e) {
      function t(t, r, i) {
        var s = e.call(this, t, r) || this;
        return s.testEnvironment = !1, s.heartbeatTimer = null, s.heartbeatInterval = 1e4, s.chargeInfos = {
          itemtype: "ChargeInfos",
          timestamp_begin: 0,
          timestamp_end: 0,
          timestamp_diff_flag: 0,
          timestamp_diff: 0,
          infos: []
        }, s.chargeInfosTimer = null, s.chargeInfosInterval = 6e4, s.qualityTimerInterval = 3e3, s.maxRetryCount = 5, s.previewVideoList = [], s.signalList = {}, s.deviceStates = {
          camera: 0,
          microphone: 0
        }, s.soundLevelDelegate = !1, s.soundLevelInterval = 1e3, s.soundLevelTimer = null, s.tryCountConnectInterval = 3e3, s.checkMessageTimeout = function () {
          for (var e in s.signalList) {
            s.signalList[e].signal && s.signalList[e].signal.checkMessageTimeout();
          }
        }, s.getAllInUseUrl = function () {
          var e = [];

          for (var t in s.signalList) {
            e.push(t);
          }

          return e;
        }, s.onDisconnectHandle = function (e) {
          if (s.logger.info("zsc.od.0 call"), s.signalList[e]) {
            var t = s.signalList[e];
            delete s.signalList[e];

            for (var r = 0; r < t.publishConnectedList.length; r++) {
              var i = s.publisherList[t.publishConnectedList[r]];
              i && i.publisher && i.publisher.onDisconnect();
            }

            for (r = 0; r < t.playConnectedList.length; r++) {
              var n = s.playerList[t.playConnectedList[r]];
              n && n.player && n.player.onDisconnect();
            }

            s.stopSignalHeartbeat(), s.stopChargeInfosUpload(), s.stopSoundLevel();
          }
        }, s.logger = t, s.stateCenter = r, s.dataReport = new n.ZegoDataReport(s.logger), s.ac = i, s;
      }

      return s(t, e), t.prototype.onSignalDisconnected = function (e) {}, t.prototype.setQualityMonitorCycle = function (e) {
        this.logger.debug("zsc.qmc.0 timeInterval " + e), this.qualityTimerInterval = e;
      }, t.prototype.setSessionInfo = function (e, t, r, i) {
        this.logger.debug("zsc.ssi.0 called"), this.appid = e, this.userid = t, this.token = r, this.testEnvironment = i;
      }, t.prototype.onPlayStateUpdate = function (e, t, r) {}, t.prototype.onPlayQualityUpdate = function (e, t) {}, t.prototype.onPublishStateUpdate = function (e, t, r) {}, t.prototype.onPublishQualityUpdate = function (e, t) {}, t.prototype.onUpdateHeartBeartIntervalHandle = function (e) {
        e != this.heartbeatInterval && (this.logger.debug("zsc.uhb.0 update " + e), this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null), this.heartbeatInterval = e, this.startSignalHeartbeat());
      }, t.prototype.switchDevice = function (e, t, r, i, s) {
        var n,
            o,
            a,
            l,
            d,
            h,
            u = this,
            p = null,
            g = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

        if (n = this.checkPreview(t)) {
          delete (o = n.mediaStreamConfig).facingMode, "video" === e ? (o.videoInput = r, l = t.srcObject.getVideoTracks()[0]) : (o.audioInput = r, l = t.srcObject.getAudioTracks()[0]), !g && l.stop();
          var f = n.getMediaStreamConstraints(o);
          navigator.mediaDevices.getUserMedia(f).then(function (r) {
            for (var s in "video" === e ? (d = r.getVideoTracks()[0], n.localStream.removeTrack(n.localStream.getVideoTracks()[0])) : (d = r.getAudioTracks()[0], n.localStream.removeTrack(n.localStream.getAudioTracks()[0])), u.publisherList) {
              u.publisherList[s].localVideo === t && (h = s);
            }

            h && (p = u.publisherList[h].publisher, (a = p.peerConnection.getSenders().find(function (e) {
              return e.track.kind === d.kind;
            })) ? a.replaceTrack(d) : u.logger.warn("zg.sd.0 no sender found, only swithcing device on localMediaElement")), n.localStream.addTrack(d), p.signal.sendStreamStatus(c.getSeq(), p.sessionId, n.localStream.getVideoTracks()[0].enabled ? 0 : 2, n.localStream.getAudioTracks()[0].enabled ? 0 : 2), i && i();
          }, function (e) {
            return s && s(e);
          });
        } else this.logger.error("zg.sd.0 no preview found");
      }, t.prototype.enableMicrophone = function (e, t) {
        var r = this.checkPreview(e);
        return r ? r.enableMicrophone(t, this) : (this.logger.info("zsc.em.0 no preview"), !1);
      }, t.prototype.enableCamera = function (e, t) {
        var r = this.checkPreview(e);
        return r ? r.enableCamera(t, this) : (this.logger.error("zsc.ec.0 no preview"), !1);
      }, t.prototype.recordDevices = function (e) {
        var t = this,
            r = this.checkPreview(e);
        r ? (this.logger.info("zsc.rd.0 call"), p.ClientUtil.getDevices(function (e) {
          t.stateCenter.deviceInfos = {
            microphones: e.microphones,
            speakers: e.speakers,
            cameras: e.cameras
          };
        }, function (e) {
          t.logger.warn("zsc.rd.0 getDevices err:", e);
        }), this.videoDeviceName = 0 !== r.localStream.getVideoTracks().length ? r.localStream.getVideoTracks()[0].label : "", this.audioDeviceName = 0 !== r.localStream.getAudioTracks().length ? r.localStream.getAudioTracks()[0].label : "", navigator.mediaDevices && void 0 !== navigator.mediaDevices.ondevicechange && (navigator.mediaDevices.ondevicechange = function (r) {
          t.logger.info("zsc.rd.0 devicechange"), t.stateCenter.deviceChangeTimer && (clearTimeout(t.stateCenter.deviceChangeTimer), t.stateCenter.deviceChangeTimer = null), t.stateCenter.deviceChangeTimer = setTimeout(function () {
            p.ClientUtil.getDevices(function (r) {
              var i,
                  s = !1;

              for (var n in r.cameras.find(function (e) {
                return e.deviceName === t.videoDeviceName;
              }) ? t.deviceStates.camera = 0 : (t.deviceStates.camera = -6, s = !0, t.onDeviceError({
                deviceName: t.videoDeviceName,
                deviceType: "camera",
                errorCode: -6
              })), r.microphones.find(function (e) {
                return e.deviceName === t.audioDeviceName;
              }) ? t.deviceStates.microphone = 0 : (t.deviceStates.microphone = -6, s = !0, t.onDeviceError({
                deviceName: t.audioDeviceName,
                deviceType: "microphone",
                errorCode: -6
              })), t.publisherList) {
                t.publisherList[n].localVideo === e && (i = n);
              }

              if (s && i) {
                var o = t.getPublisher(i);
                o.signal.sendStreamStatus(c.getSeq(), o.sessionId, t.deviceStates.camera, t.deviceStates.microphone);
              }

              var a = t.stateCenter.deviceInfos.cameras.filter(function (e) {
                return !r.cameras.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              }),
                  l = t.stateCenter.deviceInfos.microphones.filter(function (e) {
                return !r.microphones.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              }),
                  d = t.stateCenter.deviceInfos.speakers.filter(function (e) {
                return !r.speakers.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              }),
                  h = r.cameras.filter(function (e) {
                return !t.stateCenter.deviceInfos.cameras.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              }),
                  u = r.microphones.filter(function (e) {
                return !t.stateCenter.deviceInfos.microphones.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              }),
                  p = r.speakers.filter(function (e) {
                return !t.stateCenter.deviceInfos.speakers.find(function (t) {
                  return t.deviceID === e.deviceID;
                });
              });
              a.forEach(function (e) {
                var r = {
                  deviceInfo: e,
                  state: "DELETE"
                };
                t.OnVideoDeviceStateChanged(r);
              }), l.forEach(function (e) {
                var r = {
                  deviceType: "Input",
                  deviceInfo: e,
                  state: "DELETE"
                };
                t.OnAudioDeviceStateChanged(r);
              }), d.forEach(function (e) {
                var r = {
                  deviceType: "Output",
                  deviceInfo: e,
                  state: "DELETE"
                };
                t.OnAudioDeviceStateChanged(r);
              }), h.forEach(function (e) {
                var r = {
                  deviceInfo: e,
                  state: "ADD"
                };
                t.OnVideoDeviceStateChanged(r);
              }), u.forEach(function (e) {
                var r = {
                  deviceType: "Input",
                  deviceInfo: e,
                  state: "ADD"
                };
                t.OnAudioDeviceStateChanged(r);
              }), p.forEach(function (e) {
                var r = {
                  deviceType: "Output",
                  deviceInfo: e,
                  state: "ADD"
                };
                t.OnAudioDeviceStateChanged(r);
              }), t.stateCenter.deviceInfos = {
                microphones: r.microphones,
                speakers: r.speakers,
                cameras: r.cameras
              };
            }, function (e) {
              t.logger.warn("zsc.rd.0 getDevices err:", e);
            });
          }, 10);
        })) : this.logger.error("zsc.rd.0 no localVideo found");
      }, t.prototype.startPreview = function (e, t, r, i) {
        var s = this;
        if (!e) return this.logger.error("zsc.sp.0 localVideo null"), !1;
        var n = this.checkPreview(e);
        return n ? (this.logger.warn("zsc.sp.0 localvideo already exist"), !0) : (n = new o.ZegoPreview(this.logger), this.previewVideoList.push(n), n.startPreview(e, t, function () {
          s.logger.debug("zsc.sp.0 call success"), s.recordDevices(e), r && r();
        }, function (e) {
          s.previewVideoList = s.previewVideoList.filter(function (e) {
            return e !== n;
          }), i && i(e);
        }), !0);
      }, t.prototype.stopPreview = function (e) {
        if (!e) return this.logger.warn("zsc.sp.0 localVideo null"), !1;

        for (var t in this.publisherList) {
          this.publisherList[t].localVideo === e && (this.publisherList[t].localVideo = null);
        }

        var r = this.checkPreview(e);
        return r ? (r.previewSuc && (r.stopPreview(), this.removePreview(r)), !0) : (this.logger.warn("zsc.sp.0 no preview"), !1);
      }, t.prototype.setPublishStateStart = function (e, t, r) {
        var i = this,
            s = this.getTotalStreamId(e);
        if (this.publisherList[s]) return this.logger.error("zsc.pss.0 publisher already exist"), !1;
        var n = new a.ZegoPublish(this.logger, null, this.dataReport, this.qualityTimerInterval, this);
        return n.onPublishStateUpdate = function (t, r, s) {
          var n = i.publisherList[r];
          n ? i.onPublishStateUpdate(t, n.streamId, s) : i.logger.error("zsc.psuh.0 cannot find publish " + e);
        }, n.onPublishQualityUpdate = function (t, r) {
          var s = i.publisherList[t];
          s ? i.onPublishQualityUpdate(s.streamId, r) : i.logger.error("zsc.psuh.0 cannot find publish " + e);
        }, this.publisherList[s] = {
          localVideo: t,
          publisher: n,
          serverUrls: [],
          retryCount: 0,
          streamId: e,
          playOption: r,
          tryCountConnect: 1,
          countConnectTimer: void 0
        }, this.dataReport.eventStart(n.reportSeq, "GetSignalUrl"), !0;
      }, t.prototype.getTotalStreamId = function (e) {
        if (this.testEnvironment && -1 == e.indexOf("zegotest-")) {
          var t = "zegotest-" + this.appid + "-" + e;
          return this.logger.info("zsc.gts.0 test streamid " + t), t;
        }

        return e;
      }, t.prototype.getBackStreamId = function (e) {
        return this.testEnvironment && e ? e.replace("zegotest-" + this.appid + "-", "") : e;
      }, t.prototype.startPublishingStream = function (e, t, r) {
        this.logger.info("zsc.sps.0 call");
        var i = this.getTotalStreamId(e),
            s = this.publisherList[i];
        if (!s) return this.logger.error("zsc.sps.0 publisher don't exist"), !1;
        var n = s.publisher;
        if (this.dataReport.eventEndWithMsg(n.reportSeq, "GetSignalUrl", {
          urls: t
        }), !t || 0 === t.length) return this.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, c.publishErrorList.DISPATCH_ERROR), this.logger.info("zsc.sps.0 server don't have signal url"), !1;
        s.serverUrls = s.serverUrls.concat(t);
        var o = t.indexOf(this.server);
        return -1 !== o && (s.serverUrls.splice(o, 1), s.serverUrls.unshift(this.server)), this.connectPublishServer(i);
      }, t.prototype.updateWaitingList = function (e, t, r, i, s) {
        t ? e.publishWaitingList.push({
          streamId: r,
          success: i,
          error: s
        }) : e.playWaitingList.push({
          streamId: r,
          success: i,
          error: s
        });
      }, t.prototype.publishStream = function (e) {
        var t = this.publisherList[e].publisher;

        if (t) {
          var r = null,
              i = null,
              s = this.publisherList[e].playOption,
              n = this.checkPreview(this.publisherList[e].localVideo);
          n && (r = n.localStream, i = n.videoInfo), r ? (this.logger.debug("zsc.ps.0 call success"), t.startPublish(e, r, i, n.mediaStreamConfig, s)) : this.logger.error("zsc.ps.0 no localStream found before publish");
        } else this.logger.info("zsc.ps.0 publisher don't exist");
      }, t.prototype.connectPublishServer = function (e) {
        var t = this,
            r = this.publisherList[e];
        return r ? (this.dataReport.eventStart(r.publisher.reportSeq, "ConnectServer"), this.connetWithReuseSignalServerTimer(e, !0, function (e, r, i) {
          var s = t.publisherList[e];

          if (s) {
            var n = s.publisher;

            if (n) {
              t.dataReport.eventEndWithMsg(n.reportSeq, "ConnectServer", {
                result: 0,
                server: i
              });
              var o = r.tokenInfo;
              t.logger.info("zsc.cps.0 update token success"), o && o.report && (n.qualityUpload = o.report, n.qualityUploadInterval = o.report_interval), n.signal = r.signal, s.retryCount = 0, t.server = i, t.publishStream(e), t.getTokenSuccess();
            } else t.logger.info("zsc.cps.1 check publisher don't exist");
          } else t.logger.info("zsc.cps.0 after connect publisher don't exist");
        }, function (e, r) {
          t.logger.error("zsc.cps.0 " + e + " connect fail " + r);
          var i = t.publisherList[e];
          i ? t.shouldRetry(i, r) ? (t.logger.info("zsc.cps.1 retry connect"), i.serverUrls.splice(0, 1), i.retryCount += 1, t.connectPublishServer(e)) : t.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, c.publishErrorList.DISPATCH_TIMEOUT) : t.logger.info("zsc.cps.0 after connect publisher don't exist");
        }), !0) : (this.logger.error("zsc.cps.0 publisher don't exist"), !1);
      }, t.prototype.shouldRetry = function (e, t) {
        return 0 != e.serverUrls.length && !(e.retryCount >= this.maxRetryCount) && 3 == t;
      }, t.prototype.getTokenSuccess = function () {
        this.logger.debug("zsc.gts.0 call");
      }, t.prototype.stopPublishingStream = function (e) {
        var t = this.getTotalStreamId(e),
            r = this.publisherList[t];
        r ? (this.publisherList[t].countConnectTimer && clearTimeout(this.publisherList[t].countConnectTimer), delete this.publisherList[t], r.publisher && (r.publisher.stopPublish(), delete r.publisher), this.removeStreamFromSignal(!0, t), this.stopSignalHeartbeat(), this.stopChargeInfosUpload(), this.stopSoundLevel(), this.logger.debug("zsc.sps.0.1 call success")) : this.logger.warn("zsc.sps.0.1 publisher don't exist");
      }, t.prototype.setPlayStreamAudioOutput = function (e, t) {
        var r = this.getTotalStreamId(e);

        if (null != t && 0 != t.length) {
          this.logger.debug("zsc.psao.1 device " + t);
          var i = this.playerList[r];
          return i ? i.player ? i.player.setAudioDestination(t) : (this.logger.info("zsc.psao.1 player don't exist"), !1) : (this.logger.info("zsc.psao.1 play don't exist"), !1);
        }

        return !1;
      }, t.prototype.setStreamAudioOutput = function (e, t) {
        var r = this;
        return !(null == t || 0 == t.length || !e) && (this.logger.debug("zsc.ssao.0 device " + t), e ? "undefined" !== e.sinkId ? (e.setSinkId(t).then(function () {
          r.logger.info("zsc.ssao.0 success device: " + t);
        })["catch"](function (e) {
          r.logger.info("zsc.ssao.0 " + e.name);
        }), !0) : (this.logger.error("zsc.ssao.0 browser does not suppport"), !1) : (this.logger.error("zsc.ssao.0 no localVideo"), !1));
      }, t.prototype.connetWithReuseSignalServer = function (e, t, r, i, s) {
        var n = this;
        this.logger.info("zsc.crss.0 begin " + r);
        var o = null;
        if (this.signalList[r]) (o = this.signalList[r]).state == l.ENUM_SIGNAL_STATE.connected ? (this.logger.info("zsc.crss.0 already connected " + r + " streamId: " + e), t ? o.publishConnectedList.push(e) : o.playConnectedList.push(e), i(e, o)) : o.state == l.ENUM_SIGNAL_STATE.connecting && (this.logger.debug("zsc.crss.0 signal is connecting " + r + " streamId: " + e), this.updateWaitingList(o, t, e, i, s));else {
          this.logger.info("zsc.crss.0 new signal " + r + " streamId: " + e);
          var a = new d.ZegoSignal(this.logger, this.stateCenter);
          a.setSessionInfo(this.appid, this.userid), a.onUpdateHeartBeartInterval = this.onUpdateHeartBeartIntervalHandle.bind(this), a.onDisconnect = this.onDisconnectHandle, this.signalList[r] = {
            signal: a,
            state: l.ENUM_SIGNAL_STATE.connecting,
            publishWaitingList: [],
            playWaitingList: [],
            publishConnectedList: [],
            playConnectedList: [],
            tokenInfo: null,
            isTimeOut: !1
          }, this.updateWaitingList(this.signalList[r], t, e, i, s), a.connectServer(this.token, r, function (e, t, i) {
            (o = n.signalList[r]).isTimeOut && (n.logger.error("zsc.crss.0 connected " + t + " over time"), a.disconnectServer(), delete n.signalList[r]);
            var s,
                c,
                d = 0;

            if (0 != e) {
              for (n.logger.debug("zsc.crss.0 connect failed " + t), d = 0; d < o.publishWaitingList.length; d++) {
                (s = o.publishWaitingList[d]).error && s.error(s.streamId, e);
              }

              for (d = 0; d < o.playWaitingList.length; d++) {
                (c = o.playWaitingList[d]).error && c.error(c.streamId, e);
              }

              delete n.signalList[r];
            } else {
              for (n.logger.debug("zsc.crss.0 connected success " + t), o.state = l.ENUM_SIGNAL_STATE.connected, o.tokenInfo = i, d = 0; d < o.publishWaitingList.length; d++) {
                (s = o.publishWaitingList[d]).success && s.success(s.streamId, o), o.publishConnectedList.push(s.streamId);
              }

              for (d = 0; d < o.playWaitingList.length; d++) {
                (c = o.playWaitingList[d]).success && c.success(c.streamId, o), o.playConnectedList.push(c.streamId);
              }

              o.publishWaitingList = [], o.playWaitingList = [], null == n.heartbeatTimer && n.startSignalHeartbeat(), null == n.chargeInfosTimer && n.startChargeInfosUpload(), null == n.soundLevelTimer && n.soundLevelDelegate && n.startSoundLevel();
            }
          });
        }
      }, t.prototype.setPlayStateStart = function (e, t, r, i) {
        var s = this.getTotalStreamId(e);
        if (this.playerList[s]) return this.logger.warn("zsc.pss.1 player already exist"), !1;
        var n = new h.ZegoPlayWeb(this.logger, null, this.dataReport, this.qualityTimerInterval, this);
        return n.onPlayStateUpdate = this.onPlayStateUpdate, n.onPlayQualityUpdate = this.onPlayQualityUpdate, n.onVideoSizeChanged = this.onVideoSizeChanged, n.onRemoteCameraStatusUpdate = this.onRemoteCameraStatusUpdate, n.onRemoteMicStatusUpdate = this.onRemoteMicStatusUpdate, this.playerList[s] = {
          player: n,
          remoteVideo: t,
          audioOutput: r,
          signal: null,
          serverUrls: [],
          retryCount: 0,
          playOption: i,
          tryCountConnect: 1,
          countConnectTimer: void 0
        }, this.dataReport.eventStart(n.reportSeq, "GetSignalUrl"), !0;
      }, t.prototype.startPlayingStream = function (e, t, r) {
        this.logger.info("zsc.sps.1 start play called");
        var i = this.getTotalStreamId(e),
            s = this.playerList[i];
        if (!s) return this.logger.error("zsc.sps.1 player don't exist"), !1;
        var n = s.player;
        if (this.dataReport.eventEndWithMsg(n.reportSeq, "GetSignalUrl", {
          urls: t
        }), 0 == t.length) return this.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, c.playErrorList.DISPATCH_ERROR), this.logger.info("zsc.sps.1 server don't have signal url"), !1;
        s.serverUrls = s.serverUrls.concat(t);
        var o = t.indexOf(this.server);
        return -1 !== o && (s.serverUrls.splice(o, 1), s.serverUrls.unshift(this.server)), this.connectPlayServer(i);
      }, t.prototype.connectPlayServer = function (e) {
        var t = this,
            r = this.playerList[e];
        return r ? (this.dataReport.eventStart(r.player.reportSeq, "ConnectServer"), this.connetWithReuseSignalServerTimer(e, !1, function (e, r, i) {
          var s = t.playerList[e];

          if (s) {
            var n = s.player;

            if (n) {
              t.dataReport.eventEndWithMsg(n.reportSeq, "ConnectServer", {
                result: 0,
                server: i
              });
              var o = r.tokenInfo;
              t.logger.info("zsc.cps.1 update token success"), o && o.report && (n.qualityUpload = o.report, n.qualityUploadInterval = o.report_interval), n.signal = r.signal, s.retryCount = 0, t.server = i, t.playStream(e), t.getTokenSuccess();
            } else t.logger.error("zsc.cps.1 checkplayer don't exist");
          } else t.logger.error("zsc.cps.1 after connect player don't exist");
        }, function (e, r) {
          var i = t.playerList[e];
          if (i) {
            if (t.shouldRetry(i, r)) {
              t.logger.info("zsc.cps.1 retry connect");
              i.serverUrls[0];
              i.serverUrls.splice(0, 1), i.retryCount += 1, t.connectPlayServer(e);
            } else t.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, c.playErrorList.TOKEN_ERROR);
          } else t.logger.error("zsc.cps.1 after connect player don't exist");
        }), !0) : (this.logger.error("zsc.cps.1 player don't exist"), !1);
      }, t.prototype.connetWithReuseSignalServerTimer = function (e, t, r, i) {
        var s,
            n,
            o,
            a,
            c = this;

        if (t && this.publisherList[e]) {
          if (o = (s = this.publisherList[e].serverUrls)[0 == (a = (this.publisherList[e].tryCountConnect - 1) % s.length) ? s.length - 1 : a - 1], 1 !== this.publisherList[e].tryCountConnect && this.signalList[o] && (this.signalList[o].isTimeOut = !0), this.publisherList[e].tryCountConnect > 3 * s.length) return void this.logger.error("zs.crsst.0 beyond max limit");
          this.publisherList[e].countConnectTimer = setTimeout(function () {
            c.connetWithReuseSignalServerTimer(e, t, r, i);
          }, this.tryCountConnectInterval), n = s[a], this.logger.info("zs.crsst.0 called " + this.publisherList[e].tryCountConnect + " " + n), this.connetWithReuseSignalServer(e, t, n, function (t, i) {
            clearTimeout(c.publisherList[e].countConnectTimer), c.publisherList[e].tryCountConnect = 1, r(t, i, n);
          }, this.publisherList[e].tryCountConnect === 3 * s.length ? i : void 0), ++this.publisherList[e].tryCountConnect;
        } else if (!t && this.playerList[e]) {
          if (o = (s = this.playerList[e].serverUrls)[0 == (a = (this.playerList[e].tryCountConnect - 1) % s.length) ? s.length - 1 : a - 1], 1 !== this.playerList[e].tryCountConnect && this.signalList[o] && (this.signalList[o].isTimeOut = !0), this.playerList[e].tryCountConnect > 3 * s.length) return void this.logger.error("zs.crsst.0 beyond max limit");
          this.logger.info("zs.crsst.0 called " + this.playerList[e].tryCountConnect), this.playerList[e].countConnectTimer = setTimeout(function () {
            c.connetWithReuseSignalServerTimer(e, t, r, i);
          }, this.tryCountConnectInterval), n = s[(this.playerList[e].tryCountConnect - 1) % s.length], this.connetWithReuseSignalServer(e, t, n, function (t, i) {
            clearTimeout(c.playerList[e].countConnectTimer), c.playerList[e].tryCountConnect = 1, r(t, i, n);
          }, this.playerList[e].tryCountConnect === 3 * s.length ? i : void 0), ++this.playerList[e].tryCountConnect;
        }
      }, t.prototype.playStream = function (e) {
        var t = this.playerList[e].player;
        t ? (this.logger.info("zsc.ps.1 call success"), t.startPlay(e, this.playerList[e].remoteVideo, this.playerList[e].audioOutput, this.playerList[e].playOption)) : this.logger.warn("zsc.ps.1 player don't exist");
      }, t.prototype.removeStreamFromSignal = function (e, t) {
        var r = [];

        for (var i in this.signalList) {
          var s = this.signalList[i];

          if (e) {
            for (var n = 0; n < s.publishConnectedList.length; n++) {
              if (s.publishConnectedList[n] === t) {
                this.logger.debug("zsc.rsfs.0 found from publish"), s.publishConnectedList.splice(n, 1);
                break;
              }
            }
          } else for (var o = 0; o < s.playConnectedList.length; o++) {
            if (s.playConnectedList[o] === t) {
              this.logger.debug("zsc.rsfs.0 found from play"), s.playConnectedList.splice(o, 1);
              break;
            }
          }

          0 == s.publishConnectedList.length && 0 == s.playConnectedList.length && (s.signal.disconnectServer(), r.push(i));
        }

        for (var a = 0; a < r.length; a++) {
          delete this.signalList[r[a]];
        }
      }, t.prototype.stopSignalHeartbeat = function () {
        this.logger.debug("zsc.ssh.1 call");
        var e = 0;

        for (var t in this.signalList) {
          e += 1;
        }

        this.heartbeatTimer && 0 == e && (this.logger.info("zsc.ssh.1 stop"), clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null);
      }, t.prototype.stopChargeInfosUpload = function () {
        this.logger.debug("zsc.sciu.0 call");
        var e = 0;

        for (var t in this.signalList) {
          e += 1;
        }

        this.chargeInfosTimer && 0 == e && (this.logger.info("zsc.sciu.0 stop"), clearTimeout(this.chargeInfosTimer), this.chargeInfosTimer = null);
      }, t.prototype.getPublisher = function (e) {
        var t = null,
            r = this.getTotalStreamId(e);
        return this.publisherList[r] && this.publisherList[r].publisher && (t = this.publisherList[r].publisher), t;
      }, t.prototype.stopPlayingStream = function (e) {
        var t = this.getTotalStreamId(e),
            r = this.playerList[t];
        r ? (this.playerList[t].countConnectTimer && clearTimeout(this.playerList[t].countConnectTimer), delete this.playerList[t], r.player && (r.player.stopPlay(), delete r.player), this.removeStreamFromSignal(!1, t), this.stopSignalHeartbeat(), this.stopChargeInfosUpload(), this.stopSoundLevel(), this.logger.debug("zsc.sps.1.1 call success")) : this.logger.info("zsc.sps.1.1 player don't exist");
      }, t.prototype.reset = function () {
        for (var e in this.publisherList) {
          this.publisherList[e].publisher && this.publisherList[e].publisher.stopPublish();
        }

        for (var t in this.playerList) {
          this.playerList[t].player && this.playerList[t].player.stopPlay();
        }

        for (var r in this.signalList) {
          this.signalList[r].signal && this.signalList[r].signal.disconnectServer();
        }

        this.playerList = {}, this.publisherList = {}, this.signalList = {}, this.server = "", this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null);
      }, t.prototype.startSignalHeartbeat = function () {
        var e = this;
        this.logger.debug("zsc.ssh.0 call"), this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null), this.heartbeatTimer = setTimeout(function () {
          e.checkSignalHeartbeat();
        }, this.heartbeatInterval);
      }, t.prototype.checkSignalHeartbeat = function () {
        for (var e in this.logger.debug("zsc.csh.0 call"), this.signalList) {
          this.signalList[e].signal && this.signalList[e].signal.sendHeartbeat();
        }

        this.heartbeatTimer && this.startSignalHeartbeat();
      }, t.prototype.startChargeInfosUpload = function () {
        var e = this;
        this.logger.debug("zsc.sciu.0 call"), this.chargeInfosTimer && (clearTimeout(this.chargeInfosTimer), this.chargeInfosTimer = null), this.chargeInfosTimer = setTimeout(function () {
          e.checkChargeInfos();
        }, this.chargeInfosInterval);
      }, t.prototype.checkChargeInfos = function () {
        this.logger.debug("zsc.cci.0 call");
        var e = {
          is_publishing: 0,
          play_max_audio_bitrate: 0,
          play_stream_resolution_infos: []
        };

        for (var t in this.chargeInfos.timestamp_begin = new Date().getTime(), this.publisherList) {
          this.publisherList[t].publisher.state === l.ENUM_PUBLISH_STATE.publishing && (e.is_publishing = 1);
          break;
        }

        e.play_max_audio_bitrate = 0;

        var r = function r(t) {
          var r = i.playerList[t].remoteVideo,
              s = {
            video_width: r.videoWidth || 0,
            video_height: r.videoHeight || 0,
            count: 1
          };

          if (!e.play_stream_resolution_infos.find(function (e) {
            return e.video_width == s.video_width && e.video_height == s.video_height && (e.count++, !0);
          }) && e.play_stream_resolution_infos.push(s), 0 == s.video_width && 0 == s.video_height) {
            var n = 1e3 * i.playerList[t].player.lastPlayStats.audioBitrate;
            n > e.play_max_audio_bitrate && (e.play_max_audio_bitrate = n);
          }
        },
            i = this;

        for (var s in this.playerList) {
          r(s);
        }

        0 !== this.chargeInfos.timestamp_end ? (this.chargeInfos.timestamp_diff = this.chargeInfos.timestamp_begin - this.chargeInfos.timestamp_end, this.chargeInfos.timestamp_diff_flag = 1) : (this.chargeInfos.timestamp_diff = 0, this.chargeInfos.timestamp_diff_flag = 0), this.chargeInfos.timestamp_end = new Date().getTime(), this.chargeInfos.infos = [e], 0 !== e.play_stream_resolution_infos.length && this.logger.report(this.chargeInfos), this.chargeInfosTimer && this.startChargeInfosUpload();
      }, t.prototype.startSoundLevel = function () {
        var e = this;
        this.logger.debug("zsc.ssl.0 call"), this.soundLevelTimer && (clearTimeout(this.soundLevelTimer), this.soundLevelTimer = null), this.soundLevelTimer = setTimeout(function () {
          e.checkSoundLevel();
        }, this.soundLevelInterval);
      }, t.prototype.checkSoundLevel = function () {
        this.logger.debug("zsc.csl.0 call");
        var e = [];

        for (var t in this.publisherList) {
          var r = this.publisherList[t].publisher;
          e.push({
            streamID: this.getBackStreamId(r.streamId),
            soundLevel: r.soundLevel,
            type: "push"
          });
        }

        for (var t in this.playerList) {
          var i = this.playerList[t].player;
          e.push({
            streamID: this.getBackStreamId(i.streamId),
            soundLevel: i.soundLevel,
            type: "pull"
          });
        }

        this.soundLevelDelegate && e.length > 0 && this.onSoundLevelUpdate(e), this.soundLevelDelegate && this.startSoundLevel();
      }, t.prototype.setSoundLevelDelegate = function (e, t) {
        for (var r in this.logger.info("zsc.ssd.0 call"), t && (this.soundLevelInterval = t), this.soundLevelDelegate = e, this.publisherList) {
          var i = this.publisherList[r].publisher;
          e ? i.startSoundLevel() : i.stopSoundLevel();
        }

        for (var r in this.playerList) {
          var s = this.playerList[r].player;
          e ? s.startSoundLevel() : s.stopSoundLevel();
        }

        if (e) {
          this.logger.info("zsc.ssd.0 start getting sound");
          var n = 0;

          for (var o in this.signalList) {
            n += 1;
          }

          null == this.soundLevelTimer && n > 0 && this.startSoundLevel();
        } else this.logger.info("zsc.ssd.0 stop getting sound"), this.soundLevelTimer && clearTimeout(this.soundLevelTimer), this.soundLevelTimer = null, this.soundLevelInterval = 1e3;
      }, t.prototype.stopSoundLevel = function () {
        var e = 0;

        for (var t in this.signalList) {
          e += 1;
        }

        this.soundLevelTimer && 0 == e && (this.logger.info("zsc.ssl.0 stop"), clearTimeout(this.soundLevelTimer), this.soundLevelTimer = null, this.soundLevelInterval = 1e3);
      }, t.prototype.checkPreview = function (e) {
        for (var t = 0; t < this.previewVideoList.length; t++) {
          if (this.previewVideoList[t].localVideo === e) return this.previewVideoList[t];
        }

        return null;
      }, t.prototype.removePreview = function (e) {
        for (var t = 0; t < this.previewVideoList.length; t++) {
          if (this.previewVideoList[t] === e) {
            this.previewVideoList.splice(t, 1);
            break;
          }
        }
      }, t.prototype.onDeviceError = function (e) {}, t.prototype.OnAudioDeviceStateChanged = function (e) {}, t.prototype.OnVideoDeviceStateChanged = function (e) {}, t.prototype.onPlayerStreamUrlUpdate = function (e, t, r) {}, t.prototype.onVideoSizeChanged = function (e, t, r) {}, t.prototype.onRemoteCameraStatusUpdate = function (e, t) {}, t.prototype.onRemoteMicStatusUpdate = function (e, t) {}, t.prototype.onSoundLevelUpdate = function (e) {}, t.prototype.setPublishStreamConstraints = function (e, t, r, i) {
        var s = this;
        e = this.getTotalStreamId(e);
        var n = this.publisherList[e],
            o = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

        if (n) {
          var a = this.checkPreview(n.localVideo);
          if (a) {
            if (t && 0 != Object.keys(t).length) {
              var c = !1,
                  l = !1;
              t.minBitRate && t.maxBitRate && (t.bitRate = {
                minBitRate: t.minBitRate,
                maxBitRate: t.maxBitRate
              }), t.width && t.width != a.mediaStreamConfig.width || t.height && t.height != a.mediaStreamConfig.height || t.frameRate && t.frameRate != a.mediaStreamConfig.frameRate ? c = !0 : t.minBitRate == a.mediaStreamConfig.bitRate.minBitRate && t.maxBitRate == a.mediaStreamConfig.bitRate.maxBitRate || t.minBitRate && t.maxBitRate && (l = !0), a.mediaStreamConfig.videoInput !== t.videoInput && delete a.mediaStreamConfig.facingMode && delete t.facingMode;
              var d = Object.assign(a.mediaStreamConfig, t);
              if (d.externalCapture || d.externalMediaStream) this.logger.error("zc.spsc.0 do not support external stream");else {
                var h = a.getMediaStreamConstraints(d),
                    u = n.publisher.localStream;
                if (!n.publisher.peerConnection.getSenders || !n.publisher.peerConnection.getSenders()[0].replaceTrack) return this.logger.error("zc.spsc.0 set publish constraints is not supported"), void (i && i({
                  code: 1,
                  msg: "not supported"
                }));
                if (c && (!o && u.getTracks().forEach(function (e) {
                  return e.stop();
                }), navigator.mediaDevices.getUserMedia(h).then(function (e) {
                  e.getTracks().forEach(function (e) {
                    var t = u.getTracks().find(function (t) {
                      return t.kind === e.kind;
                    }),
                        r = n.publisher.peerConnection.getSenders().find(function (t) {
                      return t.track.kind === e.kind;
                    });
                    d.minBitRate && d.maxBitRate && "video" === r.track.kind && s.setVideoBitRate(r, d.minBitRate, d.maxBitRate), r.replaceTrack(e), u.removeTrack(t), u.addTrack(e), s.logger.info("zc.spsc.0 set constraints success");
                  }), r && r();
                })["catch"](function (e) {
                  s.logger.error("zc.spsc.0 fail reason ", e.name), i && i({
                    code: 2,
                    msg: e.name
                  });
                })), l) try {
                  var p = n.publisher.peerConnection.getSenders().find(function (e) {
                    return "video" === e.track.kind;
                  });
                  this.setVideoBitRate(p, t.minBitRate, t.maxBitRate), r && r();
                } catch (e) {
                  this.logger.error("zc.spsc.0 fail reason ", e.name), i && i({
                    code: 2,
                    msg: e.name
                  });
                }
              }
            } else this.logger.error("zc.spsc.0 constraints wrong");
          } else this.logger.error("zc.spsc.0 preview no found");
        } else this.logger.error("zc.spsc.0 publisher not found");
      }, t.prototype.setVideoBitRate = function (e, t, r) {
        var i = this,
            s = e.getParameters();
        return s.encodings || (s.encodings = [{}]), s.encodings[0].minBitrate = 1e3 * t, s.encodings[0].maxBitrate = 1e3 * r, e.setParameters(s).then(function () {
          i.logger.info("zc.spsc.0 set video bitrate success");
        })["catch"](function (e) {
          i.logger.error("zc.spsc.0 set video bitrate fail " + e);
        }), !0;
      }, t.prototype.startMixingAudio = function (e, t) {
        var r = this.getPublisher(e);
        return r ? r.startMixingAudio(t) : (this.logger.error("zc.sma.0 publisher doesn't exist"), !1);
      }, t.prototype.stopMixingAudio = function (e, t) {
        var r = this.getPublisher(e);
        return r ? r.stopMixingAudio(t) : (this.logger.error("zc.sma.1 publisher doesn't exist"), !1);
      }, t;
    }(u.ZegoStreamCenter);

    t.ZegoStreamCenterWeb = g;
  }, function (e, t, r) {
    "use strict";

    var i = this && this.__assign || Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++) {
        for (var s in t = arguments[r]) {
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
      }

      return e;
    };

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var s = function () {
      function e(e) {
        this.log = e, this.dataStatistics = {}, this.logger = e;
      }

      return e.prototype.newReport = function (e) {
        this.dataStatistics[e] = {
          abs_time: Date.now(),
          time_consumed: 0,
          error: 0,
          events: []
        };
      }, e.prototype.addMsgExt = function (e, t) {
        this.dataStatistics[e] ? this.dataStatistics[e].msg_ext = t : console.warn(e + " not exist");
      }, e.prototype.eventStart = function (e, t) {
        this.dataStatistics[e] ? null != this.dataStatistics[e].events ? this.dataStatistics[e].events.push({
          event: t,
          abs_time: Date.now(),
          time_consumed: 0
        }) : this.logger.warn("zd.es.0 no events") : this.logger.warn("zd.es.0 no seq match");
      }, e.prototype.eventEnd = function (e, t, r) {
        if (this.dataStatistics[e]) {
          var i = this.dataStatistics[e].events;

          if (i && 0 !== i.length) {
            for (var s = i.length - 1; s >= 0; s--) {
              if (i[s].event == t && i[s].time_consumed) {
                i[s].time_consumed = Date.now() - i[s].abs_time;
                break;
              }
            }
          } else this.logger.info("zd.ee.0 no events");
        } else this.logger.info("zd.ee.0 no seq match");
      }, e.prototype.eventEndWithMsg = function (e, t, r) {
        if (this.dataStatistics[e]) {
          var s = this.dataStatistics[e].events;

          if (s) {
            for (var n = s.length - 1; n >= 0; n--) {
              if (s[n].event == t && s[n].time_consumed) {
                s[n].time_consumed = Date.now() - s[n].abs_time, null == s[n].msg_ext && (s[n].msg_ext = {}), s[n].msg_ext = i({}, r);
                break;
              }
            }
          } else this.logger.warn("zd.ee.0 no events");
        } else this.logger.warn("zd.ee.0 no seq match");
      }, e.prototype.addEventInfo = function (e, t, r, i) {
        if (this.dataStatistics[e]) {
          var s = this.dataStatistics[e].events;

          if (null != s) {
            for (var n = s.length - 1; n >= 0; n--) {
              if (s[n].event == t && null != s[n].time_consumed && s[n].event == t && null != s[n].time_consumed) {
                null == s[n].msg_ext && (s[n].msg_ext = {}), s[n].msg_ext[r] = i;
                break;
              }
            }
          } else this.logger.warn("zd.aei.0 no events");
        } else this.logger.warn("zd.aei.0 no seq match");
      }, e.prototype.addEvent = function (e, t, r) {
        this.dataStatistics[e] ? this.dataStatistics[e].events && (r ? this.dataStatistics[e].events.push({
          event: t,
          abs_time: Date.now(),
          msg_ext: r
        }) : this.dataStatistics[e].events.push({
          event: t,
          abs_time: Date.now()
        })) : this.logger.warn("zd.ae.0 no seq match");
      }, e.prototype.uploadReport = function (e, t) {
        var r = this.dataStatistics[e];
        null != r && (r.itemtype = t, r.time_consumed = Date.now() - r.abs_time, this.logger.report(r), delete this.dataStatistics[e]);
      }, e;
    }();

    t.ZegoDataReport = s;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(2),
        n = function () {
      function e(e) {
        var t = this;
        this.log = e, this.localVideo = null, this.localStream = null, this.previewSuc = !1, this.enableMicrophone = function (e, r) {
          if (!t.localStream) return t.logger.error("zp.em.2 no localStream"), !1;

          for (var i in t.localStream.getAudioTracks().forEach(function (t) {
            t.enabled = e;
          }), r.publisherList) {
            var n = r.publisherList[i].publisher;
            n.localStream == t.localStream && n.signal.sendStreamStatus(s.getSeq(), n.sessionId, t.localStream && t.localStream.getVideoTracks()[0] && !0 === t.localStream.getVideoTracks()[0].enabled ? 0 : 2, e ? 0 : 2);
          }

          return t.logger.debug("zp.em.2 call success"), !0;
        }, this.enableCamera = function (e, r) {
          if (!t.localStream) return t.logger.error("zp.ec.2 no localStream"), !1;

          for (var i in t.localStream.getVideoTracks().forEach(function (t) {
            t.enabled = e;
          }), r.publisherList) {
            var n = r.publisherList[i].publisher;
            n.localStream == t.localStream && n.signal.sendStreamStatus(s.getSeq(), n.sessionId, e ? 0 : 2, t.localStream && t.localStream.getAudioTracks()[0] && 1 == t.localStream.getAudioTracks()[0].enabled ? 0 : 2);
          }

          return t.logger.debug("zp.ec.2 call success"), !0;
        }, this.setAudioDestination = function (e) {
          return t.localVideo ? "undefined" !== t.localVideo.sinkId ? (t.localVideo.setSinkId(e).then(function () {
            t.logger.info("zp.sad.2 success device: " + e);
          })["catch"](function (e) {
            t.logger.info("zp.sad.2 " + e.name);
          }), !0) : (t.logger.error("zp.sad.2 browser does not suppport"), !1) : (t.logger.error("zp.sad.2 no localVideo"), !1);
        }, this.logger = e;
      }

      return e.prototype.getMediaStreamConstraints = function (e) {
        var t = {
          audio: null,
          video: null
        };

        if (t.audio = !1, t.video = !1, console.log("mediaStreamConfig", e), e.audio && (void 0 === e.audioInput && void 0 === e.noiseSuppression && void 0 === e.autoGainControl && void 0 === e.echoCancellation ? (t.audio = {}, t.audio.noiseSuppression = !0, t.audio.autoGainControl = !0, t.audio.echoCancellation = !0) : (t.audio = {}, void 0 !== e.audioInput && null !== e.audioInput && (t.audio.deviceId = e.audioInput), void 0 !== e.noiseSuppression && (t.audio.noiseSuppression = e.noiseSuppression), void 0 !== e.autoGainControl && (t.audio.autoGainControl = e.autoGainControl), void 0 !== e.echoCancellation && (t.audio.echoCancellation = e.echoCancellation))), e.video) {
          var r = 640,
              s = 480,
              n = 15,
              o = 800;

          if (1 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.LOW.width, s = i.ENUM_RESOLUTION_TYPE.LOW.height, n = i.ENUM_RESOLUTION_TYPE.LOW.frameRate, o = i.ENUM_RESOLUTION_TYPE.LOW.bitRate) : 2 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.MEDIUM.width, s = i.ENUM_RESOLUTION_TYPE.MEDIUM.height, n = i.ENUM_RESOLUTION_TYPE.MEDIUM.frameRate, o = i.ENUM_RESOLUTION_TYPE.MEDIUM.bitRate) : 3 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.HIGH.width, s = i.ENUM_RESOLUTION_TYPE.HIGH.height, n = i.ENUM_RESOLUTION_TYPE.HIGH.frameRate, o = i.ENUM_RESOLUTION_TYPE.HIGH.bitRate) : 4 === e.videoQuality ? (r = e.width, s = e.height, n = e.frameRate, o = e.maxBitRate || 800) : this.logger.info("zp.gmsc.2 user default"), !0 === e.horizontal) {
            var a = s;
            s = r, r = a;
          }

          t.video = {
            width: r,
            height: s,
            frameRate: n,
            bitRate: o
          }, null != e.facingMode ? t.video.facingMode = e.facingMode : null != e.videoInput && null != e.videoInput && (t.video.deviceId = {
            exact: e.videoInput
          }), this.logger.info("zp.gmsc.2 width: " + r + " height: " + s + " rate: " + n);
        }

        return t;
      }, e.prototype.startPreview = function (e, t, r, i) {
        var s = this;

        if (this.logger.debug("zp.sv.2 called"), this.localVideo = e, this.mediaStreamConfig = t, void 0 !== navigator.mediaDevices && null != navigator.mediaDevices.getUserMedia) {
          if (t.externalMediaStream instanceof MediaStream) return this.logger.debug("zp.sv.2 use external media stream"), this.previewSuc = !0, this.localStream = t.externalMediaStream, this.videoInfo = {
            width: t.width,
            height: t.height,
            frameRate: t.frameRate,
            minBitRate: t.minBitRate,
            maxBitRate: t.maxBitRate
          }, void (r && r());
          if (t.externalCapture) this.captureStream(e, t) ? (this.previewSuc = !0, r && r()) : i && i("external capture fail");else {
            var n = this.getMediaStreamConstraints(t);
            this.videoInfo = n.video, this.videoInfo && (this.videoInfo.minBitRate = t.minBitRate || n.video.bitRate), this.videoInfo && (this.videoInfo.maxBitRate = t.maxBitRate || n.video.bitRate), this.logger.info("zp.sv.2 ", JSON.stringify(n)), navigator.mediaDevices.getUserMedia(n).then(function (e) {
              if (s.logger.info("zp.sv.2 success"), !s.localVideo) return s.logger.info("zp.sv.2 no localVideo"), void (i && i("no localVideo"));
              s.localVideo.srcObject = e, s.localStream = e, s.previewSuc = !0, r && r();
            }, function (e) {
              s.logger.info("zp.sv.2 failed " + e.message), i && i(e);
            });
          }
        } else i && i("browser don't support");
      }, e.prototype.captureStream = function (e, t) {
        if (!e) return this.logger.info("zp.cs.2 no local video"), !1;
        var r, i;
        if (e.captureStream) r = e.captureStream(), this.logger.debug("zp.cs.2 captureStream");else {
          if (!e.mozCaptureStream) return this.logger.info("zp.cs.2 don't support capture stream"), !1;
          r = e.mozCaptureStream(), this.logger.debug("zp.cs.2 mozCaptureStream");
        }
        return 0 == r.getTracks().length ? (this.logger.error("zp.cs.2 external capture tracks no found"), !1) : (this.localStream = r, this.videoInfo = {
          width: e.videoWidth,
          height: e.videoHeight,
          frameRate: t.frameRate || 15,
          minBitRate: 800,
          maxBitRate: 800
        }, "number" == typeof t.bitRate ? (i < 48 && (i = 48), i > 1e4 && (i = 1e4), this.videoInfo.minBitRate = this.videoInfo.maxBitRate = t.bitRate) : t.bitRate && t.bitRate.minBitRate && t.bitRate.maxBitRate && "number" == typeof t.bitRate.minBitRate && "number" == typeof t.bitRate.maxBitRate && t.bitRate.minBitRate <= t.bitRate.maxBitRate && (this.videoInfo.minBitRate = t.bitRate.minBitRate < 48 ? 48 : t.bitRate.minBitRate, this.videoInfo.maxBitRate = t.bitRate.maxBitRate > 1e4 ? 1e4 : t.bitRate.maxBitRate), this.logger.debug("zp.cs.2 called success"), !0);
      }, e.prototype.stopPreview = function () {
        if (this.logger.info("zp.sv.2.1 called"), this.localStream) {
          var e = this.localStream.getTracks();
          e.reverse(), e.forEach(function (e) {
            e.stop();
          }), this.localStream = null, this.localVideo.srcObject = null, this.localVideo = null, this.videoInfo = null;
        }
      }, e;
    }();

    t.ZegoPreview = n;
  }, function (e, t, r) {
    "use strict";

    var i = this && this.__assign || Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++) {
        for (var s in t = arguments[r]) {
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
      }

      return e;
    };

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var s = r(0),
        n = r(2),
        o = r(12),
        a = r(3),
        c = r(4),
        l = r(13),
        d = function () {
      function e(e, t, r, i, o) {
        this.state = s.ENUM_PUBLISH_STATE.stop, this.sessionId = 0, this.waitingICETimeInterval = 5e3, this.waitingAnswerTimeInterval = 5e3, this.candidateInfo = [], this.waitingICETimer = null, this.waitingAnswerTimer = null, this.qualityTimer = null, this.publishQualityList = [], this.maxQualityListCount = 10, this.lastPublishStats = {}, this.reportSeq = n.getSeq(), this.qualityUpload = !1, this.qualityUploadInterval = 3e4, this.qualityUploadLastTime = 0, this.qualitySeq = 0, this.maxRetryCount = 3, this.currentRetryCount = 0, this.retryState = s.ENUM_RETRY_STATE.didNotStart, this.waitingServerTimerInterval = 3e3, this.waitingServerTimer = null, this.videoInfo = {
          width: 0,
          height: 0,
          frameRate: 0,
          minBitRate: 0,
          maxBitRate: 0
        }, this.streamGoogInfo = {}, this.mediaStreamConfig = null, this.offerSeq = 0, this.audioMixList = [], this.arrayBufferMap = {}, this.qualityCount = 0, this.closeSessionSignal = !1, this.audioBitRate = 48e3, this.localSdpRevert = !1, this.videoDecodeType = "H264", this.stateNego = s.ENUM_PUBLISH_STATE_NEGO.stop, this.negoInterval = 25e3, this.negoTryCount = 1, this.negoTryMaxCount = 2, this.publishEvent = !1, this.nextSignalTryCount = 1, this.waittingConnectedTimer = null, this.waittingConnectedInerval = 15e3, this.tryingNexitSignal = !1, this.soundLevel = 0, this.script = null, this.mic = null, this.logger = e, this.signal = t, this.dataReport = r, this.streamCenter = o, this.ac = this.streamCenter.ac, this.qualityTimeInterval = i, this.audioMixing = new a.audioMixUtil(e, this.ac), r.newReport(this.reportSeq);
      }

      return e.prototype.publishStateUpdateError = function (e, t) {
        this.logger.error("zp.psu.0 call " + JSON.stringify(e)), t || !(this.state === s.ENUM_PUBLISH_STATE.stop || this.negoTryCount < this.negoTryMaxCount && this.stateNego < s.ENUM_PUBLISH_STATE_NEGO.iceConnected) ? (0 != this.sessionId && this.shouldSendCloseSession(e) && (this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.closeSessionSignal = !0), this.state = s.ENUM_PUBLISH_STATE.stop, this.onPublishStateUpdate(n.ENUM_PUBLISH_STATE_UPDATE.error, this.streamId, e), this.logger.info("zp.psu.0 ended"), this.resetPublish()) : this.logger.info("zp.psu.0 already reset");
      }, e.prototype.resetPublish = function () {
        this.logger.info("zp.rp.0 call"), this.streamId = null, this.state = s.ENUM_PUBLISH_STATE.stop, this.publishEvent = !1, null == this.peerConnection && null == this.peerConnection || (this.peerConnection.close(), this.peerConnection = null), null != this.waitingAnswerTimer && (clearTimeout(this.waitingAnswerTimer), this.waitingAnswerTimer = null), null != this.waitingICETimer && (clearTimeout(this.waitingICETimer), this.waitingICETimer = null), null != this.negoTimer && (clearTimeout(this.negoTimer), this.negoTimer = null), null != this.waittingConnectedTimer && (clearTimeout(this.waittingConnectedTimer), this.waittingConnectedTimer = null), this.clearPublishQualityTimer(), this.signal && (this.signal.unregisterPushCallback("CandidateInfoPush", this.sessionId), this.signal.unregisterPushCallback("MediaDescPush", this.sessionId), this.signal.unregisterPushCallback("CloseSessionPush", this.sessionId)), this.sessionSeq = 0, this.offerSeq = 0, this.candidateInfo = [], this.publishQualityList = [], this.qualityUploadLastTime = 0, this.currentRetryCount = 0, this.retryState = s.ENUM_RETRY_STATE.didNotStart, this.clearTryPublishTimer();
      }, e.prototype.clearTryPublishTimer = function () {
        null != this.waitingServerTimer && (clearTimeout(this.waitingServerTimer), this.waitingServerTimer = null);
      }, e.prototype.clearPublishQualityTimer = function () {
        null != this.qualityTimer && (clearInterval(this.qualityTimer), this.qualityTimer = null), this.lastPublishStats = {}, this.qualityCount = 0;
      }, e.prototype.shouldSendCloseSession = function (e) {
        return this.state != s.ENUM_PUBLISH_STATE.stop && this.state != s.ENUM_PUBLISH_STATE.waitingSessionRsp;
      }, e.prototype.startPublish = function (e, t, r, i, o) {
        var a = this;
        this.logger.info("zp.sp.0 called"), this.signal && this.signal.negoInterval && (this.negoInterval = this.signal.negoInterval), this.signal && this.signal.negoTryCount && (this.negoTryCount = this.signal.negoTryCount), this.signal && this.signal.negoTryMaxCount && (this.negoTryMaxCount = this.signal.negoTryMaxCount), e ? (this.streamId = e, this.localStream = t, this.mediaStreamConfig = i, this.playOption = o || {}, navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (i.externalCapture || i.externalMediaStream) && (this.localStream.onaddtrack = function () {
          a.logger.info("zp.sp.0 Track added");
          var e = a.localStream.getVideoTracks(),
              t = a.localStream.getAudioTracks();
          if (e.length > 1) a.peerConnection.getSenders().find(function (t) {
            return t.track.kind === e[1].kind;
          }).replaceTrack(e[1]), a.localStream.removeTrack(e[0]);else if (t.length > 1) {
            a.peerConnection.getSenders().find(function (e) {
              return e.track.kind === t[1].kind;
            }).replaceTrack(t[1]), a.localStream.removeTrack(t[0]);
          }
        }), r && (this.videoInfo = r), o && o.audioBitRate && (this.audioBitRate = o.audioBitRate), o && o.videoDecodeType && (this.videoDecodeType = o.videoDecodeType), this.sessionSeq = n.getSeq(), this.dataReport.eventStart(this.reportSeq, "CreateSession"), this.signal.createSession(this.sessionSeq, 0, 0, e, o && o.streamParams, function (e, t, r) {
          a.dataReport.eventEndWithMsg(a.reportSeq, "CreateSession", {
            sessionId: r.session_id
          }), a.logger.info("zp.sp.0 sessionId:" + r.session_id), a.sessionSeq == e ? 0 !== r.result ? (a.logger.error("zp.sp.0 create session failed " + r.result), a.publishStateUpdateError(n.publishErrorList.CREATE_SESSION_ERROR)) : (a.sessionId = r.session_id, a.logger.debug("zp.sp.0 create session success " + a.sessionId), a.onCreatePublishSessionSuccess(r)) : a.logger.error("zp.sp.0 seq is not match.");
        }, function (e, t) {
          a.dataReport.eventEndWithMsg(a.reportSeq, "CreateSession", {
            error: e
          }), a.publishStateUpdateError(n.publishErrorList.SEND_SESSION_TIMEOUT);
        }), this.state = s.ENUM_PUBLISH_STATE.waitingSessionRsp, this.logger.info("zp.sp.0 called success"), this.stateNego = s.ENUM_PUBLISH_STATE_NEGO.start, this.negoTimer = setTimeout(function () {
          a.stateNego !== s.ENUM_PUBLISH_STATE_NEGO.iceConnected && a.negoTryCount < a.negoTryMaxCount ? (a.signal.sendCloseSession(n.getSeq(), a.sessionId, 1), a.resetPublish(), a.startPublish(e, t, r, i, o), ++a.negoTryCount) : a.stateNego !== s.ENUM_PUBLISH_STATE_NEGO.iceConnected && a.negoTryCount === a.negoTryMaxCount && (a.logger.error("zp.sp.0 waiting timeout"), a.publishStateUpdateError(n.publishErrorList.SERVER_NEGO_TIMEOUT));
        }, this.negoInterval)) : this.logger.error("zp.sp.0 streamId is null");
      }, e.prototype.onCreatePublishSessionSuccess = function (e) {
        var t = this;
        this.logger.info("zp.ops.0 called");
        var r = [];
        e.turn_server && r.push(e.turn_server), e.stun_server && r.push(e.stun_server);
        var i = {
          iceTransportPolicy: "relay",
          iceServers: [{
            urls: r,
            username: e.turn_username,
            credential: e.turn_auth_key
          }]
        };
        this.logger.info("zp.ops.0 username: " + e.turn_username), this.logger.info("zp.ops.0 credential: " + e.turn_auth_key), this.peerConnection = new RTCPeerConnection(i), this.peerConnection.onicecandidate = function (e) {
          t.onIceCandidate(e);
        }, this.peerConnection.onsignalingstatechange = function (e) {
          t.onConnectionStateChange(e);
        }, this.peerConnection.oniceconnectionstatechange = function (e) {
          t.onIceConnectionStateChange(e);
        };
        var s = [],
            o = [];
        this.localStream && (this.localStream.getTracks().forEach(function (e) {
          t.peerConnection.addTrack(e, t.localStream);
        }), s = this.localStream.getVideoTracks(), o = this.localStream.getAudioTracks(), console.warn("getConstraints", o && o[0] && o[0].getConstraints && o[0].getConstraints()), s.length > 0 && this.logger.info("zp.ops.0 video device: " + s[0].label), o.length > 0 && this.logger.info("zp.ops.0 audio device: " + o[0].label));
        var a = {
          offerToReceiveAudio: o.length > 0 ? 1 : 0,
          offerToReceiveVideo: s.length > 0 ? 1 : 0
        };
        this.logger.info("zp.ops.0 createOffer: " + JSON.stringify(a)), this.dataReport.eventStart(this.reportSeq, "CreateOffer"), this.peerConnection.createOffer(a).then(function (e) {
          t.dataReport.eventEnd(t.reportSeq, "CreateOffer"), t.onCreateOfferSuccess(e);
        }, function (e) {
          t.dataReport.eventEndWithMsg(t.reportSeq, "CreateOffer", {
            error: e.toString()
          }), t.logger.error("zp.ops.0 create offer error " + e.toString()), t.publishStateUpdateError(n.publishErrorList.CREATE_OFFER_ERROR, !0);
        }), this.signal.registerPushCallback("CandidateInfoPush", this.sessionId, function (e, r, i) {
          t.onRecvCandidateInfo(e, r, i);
        }), this.signal.registerPushCallback("CloseSessionPush", this.sessionId, function (e, r, i) {
          t.onRecvCloseSession(e, r, i);
        }), this.signal.registerPushCallback("MediaDescPush", this.sessionId, function (e, r, i) {
          t.onRecvMediaDescription(e, r, i);
        }), this.signal.registerPushCallback("SessionResetPush", this.sessionId, function (e, r, i) {
          t.onRecvResetSession(e, r, i);
        }), this.signal.registerPushCallback("PublishEventPush", this.sessionId, function (e, r, i) {
          t.onRecvPublishEvent(e, r, i);
        }), this.logger.debug("zp.ops.0 call success");
      }, e.prototype.onCreateOfferSuccess = function (e) {
        var t = this;
        0 != this.videoInfo.maxBitRate && (e.sdp = this.updateBandwidthRestriction(e.sdp, this.videoInfo.maxBitRate)), e.sdp = e.sdp.replace(/sendrecv/g, "sendonly"), e.sdp = e.sdp.replace(/useinbandfec=\d+/, "maxaveragebitrate=" + this.audioBitRate), /m=video[\s\S]*m=audio/.test(e.sdp) && (this.localSdpRevert = !0), e.sdp = c.sdpUtil.getSDPByVideDecodeType(e.sdp, this.videoDecodeType), this.logger.info("zp.oco.0 localSdp1 " + e.sdp.substr(0, e.sdp.length / 2)), this.logger.info("zp.oco.0 localSdp2 " + e.sdp.substr(e.sdp.length / 2)), this.dataReport.eventStart(this.reportSeq, "SetLocalDescription"), this.peerConnection.setLocalDescription(e).then(function () {
          t.dataReport.eventEnd(t.reportSeq, "SetLocalDescription"), t.onSetLocalDescriptionSuccess(e);
        }, function (e) {
          t.dataReport.eventEndWithMsg(t.reportSeq, "SetLocalDescription", {
            error: e.toString()
          }), t.logger.error("zp.oco.0 error " + e.toString()), t.publishStateUpdateError(n.publishErrorList.SET_LOCAL_DESC_ERROR, !0);
        });
      }, e.prototype.updateBandwidthRestriction = function (e, t) {
        var r = "AS";
        return "firefox" === o.browserDetails.browser && (t = 1e3 * (t >>> 0), r = "TIAS"), e = -1 === e.indexOf("b=" + r + ":") ? (e = e.replace(/c=IN (.*)\r\n/g, "c=IN $1\r\nb=" + r + ":" + t + "\r\n")).replace("b=" + r + ":" + t + "\r\n", "") : (e = e.replace(new RegExp("b=" + r + ":.*\r\n", "g"), "b=" + r + ":" + t + "\r\n")).replace("b=" + r + ":" + t + "\r\n", "");
      }, e.prototype.onSetLocalDescriptionSuccess = function (e) {
        var t = this;
        this.logger.info("zp.osd.0 success");
        var r = {
          sdp: e.sdp,
          width: this.videoInfo.width,
          height: this.videoInfo.height,
          frameRate: this.videoInfo.frameRate,
          video_min_kpbs: this.videoInfo.minBitRate,
          video_max_kpbs: this.videoInfo.maxBitRate,
          audio_kpbs: 48,
          keyframe_intv: 2
        };
        this.offerSeq = n.getSeq(), this.dataReport.eventStart(this.reportSeq, "SendMediaDesc"), this.signal.sendMediaDesc(this.offerSeq, this.sessionId, 0, r, function (e, r, i) {
          t.offerSeq == e && t.sessionId == r ? (t.logger.info("zp.osd.0 send success"), t.dataReport.eventEnd(t.reportSeq, "SendMediaDesc"), t.waitingAnswerTimer = setTimeout(function () {
            t.state == s.ENUM_PUBLISH_STATE.waitingServerAnswer && (t.logger.error("zp.osd.0 waiting timeout"), t.publishStateUpdateError(n.publishErrorList.SERVER_MEDIA_DESC_TIMEOUT));
          }, t.waitingAnswerTimeInterval), t.logger.info("zp.osd.0 send success stateNego:waiterAnswer"), t.stateNego = s.ENUM_PUBLISH_STATE_NEGO.waiterAnswer, t.state = s.ENUM_PUBLISH_STATE.waitingServerAnswer) : t.logger.error("zp.osd.0 seq or sessionId is not equal");
        }, function (e, r) {
          t.dataReport.eventEndWithMsg(t.reportSeq, "SendMediaDesc", {
            error: e
          }), t.publishStateUpdateError(n.publishErrorList.SEND_MEDIA_DESC_TIMEOUT);
        }), this.state = s.ENUM_PUBLISH_STATE.waitingOffserRsp, this.logger.debug("zp.osd.0 call success");
      }, e.prototype.onRecvMediaDescription = function (e, t, r) {
        this.logger.info("zp.ormd.0 received"), this.state == s.ENUM_PUBLISH_STATE.waitingServerAnswer ? (this.stateNego = s.ENUM_PUBLISH_STATE_NEGO.waitingCandidate, this.logger.info("zp.orm.0 received stateNego:waitingCandidate"), null != this.waitingAnswerTimer && (clearTimeout(this.waitingAnswerTimer), this.waitingAnswerTimer = null), this.dataReport.addEvent(this.reportSeq, "RecvMediaDesc"), this.signal.sendMediaDescAck(e, this.sessionId, 0), 1 == r.type ? this.onGetRemoteOfferSucceses(r.sdp) : this.publishStateUpdateError(n.publishErrorList.SERVER_MEDIA_DESC_ERROR)) : this.logger.info("zp.ormd.0 current state " + this.state + " not allowed");
      }, e.prototype.onGetRemoteOfferSucceses = function (e) {
        var t = this;

        if (48e3 !== this.audioBitRate && (e = e.replace(/maxaveragebitrate=(\d+)/, "maxaveragebitrate=" + this.audioBitRate)), this.localSdpRevert) {
          var r = [/[\s\S]*m=audio/.exec(e)[0].replace("m=audio", ""), /m=video[\s\S]*/.exec(e)[0], /m=audio[\s\S]*m=video/.exec(e)[0].replace("m=video", "")],
              i = r[0],
              o = r[1],
              a = r[2],
              c = /a=group:BUNDLE\s+(\w+)\s+(\w+)/.exec(i);
          e = (i = i.replace(/a=group:BUNDLE\s+(\w+)\s+(\w+)/, "a=group:BUNDLE " + c[2] + " " + c[1])) + o + a;
        }

        this.logger.info("zp.oro.0 remoteSdp:", e);
        var l = {
          type: "answer",
          sdp: e,
          toJSON: function toJSON() {}
        };
        this.dataReport.eventStart(this.reportSeq, "SetRemoteDescription"), this.peerConnection.setRemoteDescription(new RTCSessionDescription(l)).then(function () {
          t.logger.info("zp.oro.0 set success"), t.dataReport.eventEnd(t.reportSeq, "SetRemoteDescription");
        }, function (e) {
          t.logger.error("zp.oro.0 failed: " + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, "SetRemoteDescription", {
            error: e.toString()
          }), t.publishStateUpdateError(n.publishErrorList.SET_REMOTE_DESC_ERROR);
        }), this.state = s.ENUM_PUBLISH_STATE.waitingServerICE, this.waitingICETimer = setTimeout(function () {
          t.state == s.ENUM_PUBLISH_STATE.waitingServerICE && (t.logger.error("zp.orod.0 waiting server timeout"), t.publishStateUpdateError(n.publishErrorList.SERVER_CANDIDATE_TIMEOUT));
        }, this.waitingICETimeInterval), this.logger.debug("zp.oro.0 call success");
      }, e.prototype.onIceConnectionStateChange = function (e) {
        var t = this;
        this.state != s.ENUM_PUBLISH_STATE.stop && null != this.peerConnection && (this.logger.info("zp.oics.0 stateChanged " + this.peerConnection.iceConnectionState), "connected" === this.peerConnection.iceConnectionState ? (this.logger.info("zp.oics.0 connected state " + this.state), this.dataReport.eventEnd(this.reportSeq, "IceConnected"), this.stateNego = s.ENUM_PUBLISH_STATE_NEGO.iceConnected, this.waittingConnectedTimer && clearTimeout(this.waittingConnectedTimer), this.waittingConnectedTimer = null, this.logger.info("zp.oisc.0  stateNego:iceConnected"), this.negoTryCount = 1, this.nextSignalTryCount = 1, this.negoTimer && (clearTimeout(this.negoTimer), this.negoTimer = null), this.publishEvent && this.publishSuccess()) : "closed" === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, "IceClosed"), this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState)) : "failed" === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, "IceFailed"), this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState)) : "disconnected" === this.peerConnection.iceConnectionState && (this.dataReport.addEvent(this.reportSeq, "IceDisconnected"), this.waittingConnectedTimer = setTimeout(function () {
          !t.tryingNexitSignal && t.tryNextSignal(n.publishErrorList.MEDIA_CONNECTION_DISCONNECTED);
        }, this.waittingConnectedInerval)));
      }, e.prototype.onIceCandidate = function (e) {
        if (this.logger.info("zp.oic.0 candidate" + e.candidate), e.candidate) if (this.logger.info("zp.oic.0 candidate" + e.candidate.candidate), this.state < s.ENUM_PUBLISH_STATE.connecting || this.state == s.ENUM_PUBLISH_STATE.stop) this.candidateInfo.push({
          candidate: e.candidate.candidate,
          sdpMid: e.candidate.sdpMid,
          sdpMLineIndex: e.candidate.sdpMLineIndex
        });else {
          var t = {
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
            sdpMLineIndex: e.candidate.sdpMLineIndex
          };
          this.sendCandidateInfo([t]);
        }
      }, e.prototype.sendCandidateInfo = function (e) {
        var t = this;
        this.logger.info("zp.sci.0 called"), !(e = e.filter(function (e) {
          return e.candidate.indexOf("relay") > 0;
        })) || e.length < 1 ? this.logger.info("zp.sci.0 cancelled") : (this.dataReport.eventStart(this.reportSeq, "SendIceCandidate"), this.stateNego !== s.ENUM_PUBLISH_STATE_NEGO.iceConnected && (this.stateNego = s.ENUM_PUBLISH_STATE_NEGO.sendCandidate), this.logger.info("zp.sci.0  stateNego:sendCandidate"), this.signal.sendCandidateInfo(n.getSeq(), this.sessionId, e, function (e, r, i) {
          t.logger.info("zp.sci.0 send success"), t.dataReport.eventEnd(t.reportSeq, "SendIceCandidate");
        }, function (e, r) {
          t.logger.error("zp.sci.0 failed to send: " + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, "SendIceCandidate", {
            error: e
          }), t.publishStateUpdateError(n.publishErrorList.SEND_CANDIDATE_TIMEOUT);
        }));
      }, e.prototype.onConnectionStateChange = function (e) {
        this.logger.info("zp.ocs.0 called " + e.target.signalingState);
      }, e.prototype.onRecvCandidateInfo = function (e, t, r) {
        var i = this;

        if (this.logger.info("zp.oci.0 received " + JSON.stringify(r.infos)), this.state == s.ENUM_PUBLISH_STATE.waitingServerICE) {
          null != this.waitingICETimer && (clearTimeout(this.waitingICETimer), this.waitingICETimer = null), this.dataReport.addEvent(this.reportSeq, "RecvIceCandidate"), this.signal.sendCandidateInfoAck(e, this.sessionId, 0), this.sendCandidateInfo(this.candidateInfo), this.candidateInfo = [];

          for (var o = 0; o < r.infos.length; o++) {
            var a = {
              sdpMid: r.infos[o].sdpMid,
              sdpMLineIndex: r.infos[o].sdpMLineIndex,
              candidate: r.infos[o].candidate
            };
            this.logger.debug("zp.orci.0 candidate " + a.candidate), this.peerConnection.addIceCandidate(new RTCIceCandidate(a)).then(function () {
              i.logger.debug("zp.oci.0 add success");
            }, function (e) {
              i.logger.error("zp.oci.0 add error " + e.toString()), i.publishStateUpdateError(n.publishErrorList.SERVER_CANDIDATE_ERROR);
            });
          }

          this.state = s.ENUM_PUBLISH_STATE.connecting, this.dataReport.eventStart(this.reportSeq, "IceConnected");
        } else this.logger.info("zp.oci.0 current state " + this.state + " not allowed");
      }, e.prototype.onRecvCloseSession = function (e, t, r) {
        this.logger.info("zp.orcs.0 reason: " + r.reason), this.dataReport.addEvent(this.reportSeq, "RecvCloseSession"), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
        var i = JSON.parse(JSON.stringify(n.publishErrorList.SESSION_CLOSED));
        i.msg += r.reason, this.negoTimer && clearTimeout(this.negoTimer);
        var s = 1 * r.reason,
            o = r.err_info && JSON.parse(r.err_info).action ? JSON.parse(r.err_info).action : null;

        if ("number" == typeof s && [26].includes(s) && this.negoTryCount < this.negoTryMaxCount || 5 == o) {
          this.logger.info("zp.orcs.0 retry: " + this.streamId);
          var a = this.streamId,
              c = this.localStream,
              l = this.videoInfo,
              d = this.mediaStreamConfig,
              h = this.playOption;
          this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.resetPublish(), this.startPublish(a, c, l, d, h), ++this.negoTryCount;
        } else [4, 8, 10, 11, 12, 14, 27].includes(s) || 2 == o ? (this.logger.info("zp.orcs.0 try next signal " + this.tryingNexitSignal), !this.tryingNexitSignal && this.tryNextSignal(i)) : this.publishStateUpdateError(i, !0);
      }, e.prototype.onRecvResetSession = function (e, t, r) {
        if (this.logger.info("zp.orrs.0 received "), t == this.sessionId) {
          this.dataReport.addEvent(this.reportSeq, "RecvResetSession"), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
          var i = JSON.parse(JSON.stringify(n.publishErrorList.SESSION_CLOSED));
          this.negoTimer && clearTimeout(this.negoTimer), !this.tryingNexitSignal && this.tryNextSignal(i);
        } else this.logger.error("zp.orrs.0 cannot find session");
      }, e.prototype.onRecvPublishEvent = function (e, t, r) {
        this.logger.info("zp.orpe.0 received"), this.publishEvent = !0, this.stateNego === s.ENUM_PUBLISH_STATE_NEGO.iceConnected && 0 == r.event && this.publishSuccess();
      }, e.prototype.shouldRetryPublish = function () {
        return this.retryState == s.ENUM_RETRY_STATE.didNotStart && this.state != s.ENUM_PUBLISH_STATE.publishing ? (this.logger.info("zp.srp.0.0 connection didn't success"), !1) : this.retryState == s.ENUM_RETRY_STATE.retrying ? (this.logger.info("zp.srp.0.0 already retrying"), !1) : this.currentRetryCount > this.maxRetryCount ? (this.logger.info("zp.srp.0.0 beyond max"), !1) : (this.logger.info("zp.srp.1.0 call success"), !0);
      }, e.prototype.startRetryPublish = function () {
        this.logger.info("zp.srp.0 call");
        var e = this.streamId;
        e ? (this.resetPublish(), this.tryStartPublish(e)) : this.logger.info("zp.srp.0 no streamid");
      }, e.prototype.tryStartPublish = function (e) {
        var t = this;
        if (this.logger.info("zp.tsp.0 call"), this.clearTryPublishTimer(), this.streamId = e, this.currentRetryCount > this.maxRetryCount) return this.logger.info("zp.tsp.0 beyond max limit"), void this.publishStateUpdateError(n.publishErrorList.WEBSOCKET_ERROR);
        this.retryState = s.ENUM_RETRY_STATE.retrying, this.currentRetryCount += 1, this.signal.isServerConnected() ? (this.logger.info("zp.tsp.0 signal connected"), this.startPublish(e, this.localStream, this.videoInfo, this.mediaStreamConfig, this.playOption)) : (this.logger.debug("zp.tsp.0 signal server not connected"), this.waitingAnswerTimer = setTimeout(function () {
          t.tryStartPublish(e), console.warn(new Date());
        }, this.waitingAnswerTimeInterval));
      }, e.prototype.checkPublishConnectionFailedState = function (e) {
        var t = null;
        "failed" == e ? t = n.publishErrorList.MEDIA_CONNECTION_FAILED : "closed" == e && (t = n.publishErrorList.MEDIA_CONNECTION_CLOSED), null != t && (this.state != s.ENUM_PUBLISH_STATE.publishing && this.retryState == s.ENUM_PUBLISH_STATE.didNotStart ? (this.logger.info("zp.oics.0  state " + this.state + " retryState " + this.retryState + " connectionState " + e), this.publishStateUpdateError(t)) : this.shouldRetryPublish() ? (this.onPublishStateUpdate(n.ENUM_PUBLISH_STATE_UPDATE.retry, this.streamId), this.startRetryPublish()) : this.publishStateUpdateError(t));
      }, e.prototype.setPublishQualityTimer = function () {
        var e = this;

        if (null == this.qualityTimer) {
          this.logger.info("zp.spq.0 called"), this.clearPublishQualityTimer();
          var t = !0;
          this.peerConnection.getStats(function () {})["catch"](function (r) {
            e.logger.info("zp.spq.0 " + e.streamId + " getStats callback not support"), t = !1;
          }), this.qualityTimer = setInterval(function () {
            e.peerConnectionGetStats(t);
          }, this.qualityTimeInterval), this.lastPublishStats = {
            time: 0,
            audioBytesSent: 0,
            videoBytesSent: 0,
            framesEncoded: 0,
            framesSent: 0
          }, this.qualitySeq = n.getSeq(), this.qualityCount = 0, this.dataReport.newReport(this.qualitySeq);
        }
      }, e.prototype.peerConnectionGetStats = function (e) {
        var t = this;
        this.peerConnection && (e && this.peerConnection.getStats(function (e) {
          t.getOldGoogStats(e);
        }, function (e) {
          t.logger.info("zp.spq.0 getOldGoogStats error " + e.toString());
        }), this.peerConnection.getStats(null).then(function (e) {
          t.getPublishStats(e);
        }, function (e) {
          t.logger.info("zp.spq.0 getStats error " + e.toString());
        }));
      }, e.prototype.getOldGoogStats = function (e) {
        var t = this;
        e && e.result && e.result().forEach(function (e) {
          var r = ["audioInputLevel", "googCpuLimitedResolution", "googBandwidthLimitedResolution", "googCodecName", "googActualEncBitrate", "googFrameWidthInput", "googFrameHeightInput", "googFrameRateInput", "codecImplementationName"];
          if ("VideoBwe" === e.type && (t.streamGoogInfo.googAvailableSendBandwidth = e.stat("googAvailableSendBandwidth") || ""), "ssrc" === e.type) for (var i = 0; i < r.length; i++) {
            var s = r[i];
            e.names().includes(s) && (t.streamGoogInfo[s] = e.stat(s) || "");
          }
        });
      }, e.prototype.getPublishStats = function (e) {
        var t = this;

        if (e) {
          var r = i({
            audioCodeType: "opus",
            audioBitrate: 0,
            videoBitrate: 0,
            audioLevel: 0,
            videoFPS: 0,
            nackCount: 0,
            pliCount: 0,
            frameHeight: 0,
            frameWidth: 0,
            videoTransferFPS: 0,
            totalRoundTripTime: 0,
            currentRoundTripTime: 0,
            muted: !this.localVideo || this.localVideo.muted,
            paused: !this.localVideo || this.localVideo.paused,
            volume: this.localVideo ? this.localVideo.volume : 0,
            audioDeviceLabel: this.streamCenter.audioDeviceName,
            videoDeviceLbabel: this.streamCenter.videoDeviceName
          }, this.streamCenter.deviceStates, this.streamGoogInfo),
              s = this.lastPublishStats.time;
          e.forEach(function (e) {
            ("outbound-rtp" == e.type || "ssrc" == e.type && null != e.bytesSent) && "audio" == e.mediaType ? (0 != s && (r.audioBitrate = 8 * (e.bytesSent - t.lastPublishStats.audioBytesSent) / (e.timestamp - s)), r.audioBitrate < 0 && (r.audioBitrate = 0), t.lastPublishStats.audioBytesSent = e.bytesSent, t.lastPublishStats.time = e.timestamp) : ("outbound-rtp" == e.type || "ssrc" == e.type && null != e.bytesSent) && "video" == e.mediaType ? (0 != s && (r.videoBitrate = 8 * (e.bytesSent - t.lastPublishStats.videoBytesSent) / (e.timestamp - s), r.videoFPS = 1e3 * (e.framesEncoded - t.lastPublishStats.framesEncoded) / (e.timestamp - s)), r.videoBitrate < 0 && (r.videoBitrate = 0), r.videoFPS < 0 && (r.videoFPS = 0), r.nackCount = e.nackCount, r.pliCount = e.pliCount, t.lastPublishStats.videoBytesSent = e.bytesSent, t.lastPublishStats.framesEncoded = e.framesEncoded, t.lastPublishStats.time = e.timestamp) : "track" == e.type && ("video" == e.kind || e.id.indexOf("video") >= 0) || e.frameWidth ? (r.frameHeight = e.frameHeight, r.frameWidth = e.frameWidth, 0 != s && (r.videoTransferFPS = 1e3 * (e.framesSent - t.lastPublishStats.framesSent) / (e.timestamp - s)), r.videoTransferFPS < 0 && (r.videoTransferFPS = 0), t.lastPublishStats.framesSent = e.framesSent) : "candidate-pair" == e.type ? (null != e.totalRoundTripTime && (r.totalRoundTripTime = e.totalRoundTripTime), null != e.currentRoundTripTime && (r.currentRoundTripTime = e.currentRoundTripTime)) : "media-source" == e.type && ("audio" == e.kind || e.id.toLowerCase().indexOf("audio") >= 0) && (r.audioLevel = e.audioLevel);
          }), this.uploadPublishQuality(r), 0 != s && this.onPublishQualityUpdate(this.streamId, r);
        }
      }, e.prototype.uploadPublishQuality = function (e) {
        var t = this;

        if (this.qualityUpload) {
          var r = Date.parse(new Date() + "");
          (0 == this.qualityUploadLastTime || r - this.qualityUploadLastTime >= this.qualityUploadInterval) && (e.stream_type = "publish", e.stream_id = this.streamId, e.timeStamp = r / 1e3, this.logger.info("zp.upq.0 upload" + JSON.stringify(e)), this.signal.QualityReport(n.getSeq(), this.sessionId, e, function (e, r, i) {
            void 0 !== i.report && (t.qualityUpload = i.report, t.qualityUploadInterval = i.report_interval_ms);
          }, function (e, r) {
            t.logger.info("zp.upq.0 upload failed " + e);
          }), this.qualityUploadLastTime = r);
        }
      }, e.prototype.stopPublish = function () {
        if (this.logger.info("zp.sp.0.1 called"), Object.keys(this.streamCenter.publisherList).length = 1) for (var e in this.streamCenter.playerList) {
          var t = this.streamCenter.playerList[e].player;
          t.state == s.ENUM_PLAY_STATE.playing && t.broadcasterStatus == s.ENUM_BROADCASTER_STATUS.start && (this.signal && this.signal.sendBroadcasterStatus(n.getSeq(), t.sessionId, 0), t.broadcasterStatus = s.ENUM_BROADCASTER_STATUS.stop);
        }
        this.sessionId && !this.closeSessionSignal && this.signal.sendCloseSession(n.getSeq(), this.sessionId, 0), this.dataReport.eventEndWithMsg(this.reportSeq, "PublishState", {
          state: this.state + ""
        }), this.dataReport.addEvent(this.reportSeq, "StopPublish"), this.dataReport.addMsgExt(this.reportSeq, {
          stream: this.streamId,
          sessionId: this.sessionId
        }), this.dataReport.uploadReport(this.reportSeq, "RTCPublishStream"), this.resetPublish();
      }, e.prototype.onPublishStateUpdate = function (e, t, r) {}, e.prototype.onPublishQualityUpdate = function (e, t) {}, e.prototype.onDisconnect = function () {
        this.logger.info("zp.od.0 call"), this.logger.info("zp.od.0 websocket disconnect"), this.dataReport.addEvent(this.reportSeq, "OnDisconnect"), !this.tryingNexitSignal && this.tryNextSignal(n.publishErrorList.WEBSOCKET_ERROR);
      }, e.prototype.playEffect = function (e, t, r, i) {
        this.audioMixing.localStream = this.localStream, this.audioMixing.peerConnection = this.peerConnection, this.audioMixing.audioBuffer = t, this.audioMixing.playEffect(e.playTime, e.loop, e.replace, r, i);
      }, e.prototype.pauseEffect = function () {
        this.audioMixing.pauseEffect();
      }, e.prototype.resumeEffect = function () {
        this.audioMixing.resumeEffect();
      }, e.prototype.stopMixingBuffer = function () {
        return this.audioMixing.stopMingBuffer();
      }, e.prototype.mixingBuffer = function (e, t) {
        this.audioMixing.localStream = this.localStream, this.audioMixing.peerConnection = this.peerConnection, this.audioMixing.mixingBuffer(e, t);
      }, e.prototype.voiceChange = function (e) {
        var t = null,
            r = null;

        if (this.pitchEffect || (this.pitchEffect = new l.pitchUtil(this.ac), t = this.ac.createMediaStreamSource(this.localStream), r = this.ac.createMediaStreamDestination(), t.connect(this.pitchEffect.input), this.pitchEffect.output.connect(r)), this.pitchEffect.setPitchOffset(e), !this.micTrack) {
          var i = r.stream.getAudioTracks()[0],
              s = this.peerConnection.getSenders().find(function (e) {
            return e.track.kind === i.kind;
          });
          if (!s) return this.logger.error("zp.vc.0 no sender"), !1;
          this.micTrack = this.localStream.getAudioTracks()[0], s.replaceTrack(i), this.localStream.removeTrack(this.micTrack), this.localStream.addTrack(i);
        }
      }, e.prototype.voiceBack = function () {
        var e = this;
        this.micTrack ? (this.peerConnection.getSenders().find(function (t) {
          return t.track.kind === e.micTrack.kind;
        }).replaceTrack(this.micTrack), this.localStream.removeTrack(this.localStream.getAudioTracks()[0]), this.localStream.addTrack(this.micTrack), this.micTrack = null, this.pitchEffect = null) : this.logger.error("zp.vb.0 mo mickTrack found");
      }, e.prototype.publishSuccess = function () {
        for (var e in this.state != s.ENUM_PUBLISH_STATE.publishing && this.onPublishStateUpdate(n.ENUM_PUBLISH_STATE_UPDATE.start, this.streamId), this.state = s.ENUM_PUBLISH_STATE.publishing, this.retryState != s.ENUM_RETRY_STATE.didNotStart && (this.retryState = s.ENUM_RETRY_STATE.finished, this.currentRetryCount = 0), this.dataReport.eventStart(this.reportSeq, "PublishState"), this.streamCenter.playerList) {
          var t = this.streamCenter.playerList[e].player;
          t.state == s.ENUM_PLAY_STATE.playing && t.broadcasterStatus == s.ENUM_BROADCASTER_STATUS.stop && (this.signal && this.signal.sendBroadcasterStatus(n.getSeq(), t.sessionId, 1), t.broadcasterStatus = s.ENUM_BROADCASTER_STATUS.start);
        }

        this.setPublishQualityTimer();
        var r = 2,
            i = 2;
        0 !== this.localStream.getVideoTracks().length && 1 == this.localStream.getVideoTracks()[0].enabled && (r = 0), 0 !== this.localStream.getAudioTracks().length && 1 == this.localStream.getAudioTracks()[0].enabled && (i = 0), this.signal.sendStreamStatus(n.getSeq(), this.sessionId, r, i), this.streamCenter.soundLevelDelegate && this.startSoundLevel();
      }, e.prototype.tryNextSignal = function (e) {
        this.tryingNexitSignal = !0;
        var t = this.streamId,
            r = this.signal.server,
            i = this.streamCenter.publisherList[t],
            o = [];
        i && i.serverUrls && (o = i.serverUrls), this.nextSignalTryCount > 3 * o.length ? (this.logger.error("zp.tns.0 try max limit"), this.publishStateUpdateError(e, !0)) : (o.forEach(function (e, t) {
          return t <= o.indexOf(r) && o.push(e);
        }), o.splice(0, o.indexOf(r) + 1), this.logger.info("zp.tns.0 try next signal " + t), this.signal && this.signal.state == s.ENUM_CONNECT_STATE.connected && this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.signal && this.signal.removeSession(this.sessionId), this.resetPublish(), this.streamCenter.connectPublishServer(t), this.nextSignalTryCount++);
      }, e.prototype.startSoundLevel = function () {
        var e = this;

        if (this.logger.info("zp.ssl.0 call streamID: " + this.streamId), this.localStream && 0 != this.localStream.getAudioTracks().length) {
          this.script && this.script.disconnect() && (this.script = null), this.mic && this.mic.disconnect() && (this.mic = null);

          try {
            this.mic = this.ac.createMediaStreamSource(this.localStream), this.script = this.ac.createScriptProcessor(4096, 1, 1), this.mic.connect(this.script), this.script.connect(this.ac.destination), this.script.onaudioprocess = function (t) {
              for (var r = t.inputBuffer.getChannelData(0), i = 0, s = 0; s < r.length; s++) {
                i < r[s] && (i = r[s]);
              }

              e.soundLevel = 100 * i;
            }, this.ac.resume();
          } catch (e) {
            this.logger.error("zp.ssl.0 get sound level failed " + e);
          }
        } else this.logger.info("zp.ssl.0 local stream no found");
      }, e.prototype.stopSoundLevel = function () {
        this.logger.info("zp.ssl.0.1 call streamID: " + this.streamId), this.script && this.script.disconnect(), this.mic && this.mic.disconnect(), this.script = null, this.mic = null;
      }, e.prototype.startMixingAudio = function (e) {
        var t = this;
        return this.logger.info("zp.sma.0 call"), e.forEach(function (e) {
          if (t.audioMixList.find(function (t) {
            return t.media == e;
          })) t.logger.info("zp.sma.0 mix audio already exist");else {
            var r = new a.audioMixUtil(t.logger, t.ac);
            r.localStream = t.localStream, r.peerConnection = t.peerConnection, t.audioMixList.push({
              audioMix: r,
              media: e
            }), r.startMixingAudio(e);
          }
        }), !0;
      }, e.prototype.stopMixingAudio = function (e) {
        var t = this;
        return this.logger.info("zp.sma.0.0 call"), e ? e.forEach(function (e) {
          for (var r = 0; r < t.audioMixList.length; r++) {
            if (t.audioMixList[r].media == e) {
              t.audioMixList[r].audioMix.stopMixingAudio() && t.audioMixList.splice(r--, 1);
              break;
            }
          }
        }) : (this.audioMixList.forEach(function (e) {
          return e.audioMix.stopMixingAudio();
        }), this.audioMixList = [], this.audioMixing.isMixAudio && this.audioMixing.stopMixingAudio()), !0;
      }, e;
    }();

    t.ZegoPublish = d;
  }, function (e, t, r) {
    e.exports = function e(t, r, i) {
      function s(o, a) {
        if (!r[o]) {
          if (!t[o]) {
            if (n) return n(o, !0);
            var c = new Error("Cannot find module '" + o + "'");
            throw c.code = "MODULE_NOT_FOUND", c;
          }

          var l = r[o] = {
            exports: {}
          };
          t[o][0].call(l.exports, function (e) {
            return s(t[o][1][e] || e);
          }, l, l.exports, e, t, r, i);
        }

        return r[o].exports;
      }

      for (var n = !1, o = 0; o < i.length; o++) {
        s(i[o]);
      }

      return s;
    }({
      1: [function (e, t, r) {
        "use strict";

        var i = (0, e("./adapter_factory.js").adapterFactory)({
          window: window
        });
        t.exports = i;
      }, {
        "./adapter_factory.js": 2
      }],
      2: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.adapterFactory = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.window,
              r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            shimChrome: !0,
            shimFirefox: !0,
            shimEdge: !0,
            shimSafari: !0
          },
              l = i.log,
              d = i.detectBrowser(t),
              h = {
            browserDetails: d,
            commonShim: c,
            extractVersion: i.extractVersion,
            disableLog: i.disableLog,
            disableWarnings: i.disableWarnings
          };

          switch (d.browser) {
            case "chrome":
              if (!s || !s.shimPeerConnection || !r.shimChrome) return l("Chrome shim is not included in this adapter release."), h;
              l("adapter.js shimming chrome."), h.browserShim = s, s.shimGetUserMedia(t), s.shimMediaStream(t), s.shimPeerConnection(t), s.shimOnTrack(t), s.shimAddTrackRemoveTrack(t), s.shimGetSendersWithDtmf(t), s.shimGetStats(t), s.shimSenderReceiverGetStats(t), s.fixNegotiationNeeded(t), c.shimRTCIceCandidate(t), c.shimConnectionState(t), c.shimMaxMessageSize(t), c.shimSendThrowTypeError(t), c.removeAllowExtmapMixed(t);
              break;

            case "firefox":
              if (!o || !o.shimPeerConnection || !r.shimFirefox) return l("Firefox shim is not included in this adapter release."), h;
              l("adapter.js shimming firefox."), h.browserShim = o, o.shimGetUserMedia(t), o.shimPeerConnection(t), o.shimOnTrack(t), o.shimRemoveStream(t), o.shimSenderGetStats(t), o.shimReceiverGetStats(t), o.shimRTCDataChannel(t), c.shimRTCIceCandidate(t), c.shimConnectionState(t), c.shimMaxMessageSize(t), c.shimSendThrowTypeError(t);
              break;

            case "edge":
              if (!n || !n.shimPeerConnection || !r.shimEdge) return l("MS edge shim is not included in this adapter release."), h;
              l("adapter.js shimming edge."), h.browserShim = n, n.shimGetUserMedia(t), n.shimGetDisplayMedia(t), n.shimPeerConnection(t), n.shimReplaceTrack(t), c.shimMaxMessageSize(t), c.shimSendThrowTypeError(t);
              break;

            case "safari":
              if (!a || !r.shimSafari) return l("Safari shim is not included in this adapter release."), h;
              l("adapter.js shimming safari."), h.browserShim = a, a.shimRTCIceServerUrls(t), a.shimCreateOfferLegacy(t), a.shimCallbacksAPI(t), a.shimLocalStreamsAPI(t), a.shimRemoteStreamsAPI(t), a.shimTrackEventTransceiver(t), a.shimGetUserMedia(t), c.shimRTCIceCandidate(t), c.shimMaxMessageSize(t), c.shimSendThrowTypeError(t), c.removeAllowExtmapMixed(t);
              break;

            default:
              l("Unsupported browser!");
          }

          return h;
        };
        var i = l(e("./utils")),
            s = l(e("./chrome/chrome_shim")),
            n = l(e("./edge/edge_shim")),
            o = l(e("./firefox/firefox_shim")),
            a = l(e("./safari/safari_shim")),
            c = l(e("./common_shim"));

        function l(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }
      }, {
        "./chrome/chrome_shim": 3,
        "./common_shim": 6,
        "./edge/edge_shim": 7,
        "./firefox/firefox_shim": 11,
        "./safari/safari_shim": 14,
        "./utils": 15
      }],
      3: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        },
            s = e("./getusermedia");
        Object.defineProperty(r, "shimGetUserMedia", {
          enumerable: !0,
          get: function get() {
            return s.shimGetUserMedia;
          }
        });
        var n = e("./getdisplaymedia");
        Object.defineProperty(r, "shimGetDisplayMedia", {
          enumerable: !0,
          get: function get() {
            return n.shimGetDisplayMedia;
          }
        }), r.shimMediaStream = function (e) {
          e.MediaStream = e.MediaStream || e.webkitMediaStream;
        }, r.shimOnTrack = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
              get: function get() {
                return this._ontrack;
              },
              set: function set(e) {
                this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e);
              },
              enumerable: !0,
              configurable: !0
            });
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;

            e.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var r = this;
              return this._ontrackpoly || (this._ontrackpoly = function (t) {
                t.stream.addEventListener("addtrack", function (i) {
                  var s = void 0;
                  s = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function (e) {
                    return e.track && e.track.id === i.track.id;
                  }) : {
                    track: i.track
                  };
                  var n = new Event("track");
                  n.track = i.track, n.receiver = s, n.transceiver = {
                    receiver: s
                  }, n.streams = [t.stream], r.dispatchEvent(n);
                }), t.stream.getTracks().forEach(function (i) {
                  var s = void 0;
                  s = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function (e) {
                    return e.track && e.track.id === i.id;
                  }) : {
                    track: i
                  };
                  var n = new Event("track");
                  n.track = i, n.receiver = s, n.transceiver = {
                    receiver: s
                  }, n.streams = [t.stream], r.dispatchEvent(n);
                });
              }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments);
            };
          } else o.wrapPeerConnectionEvent(e, "track", function (e) {
            return e.transceiver || Object.defineProperty(e, "transceiver", {
              value: {
                receiver: e.receiver
              }
            }), e;
          });
        }, r.shimGetSendersWithDtmf = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
            var t = function t(e, _t) {
              return {
                track: _t,

                get dtmf() {
                  return void 0 === this._dtmf && ("audio" === _t.kind ? this._dtmf = e.createDTMFSender(_t) : this._dtmf = null), this._dtmf;
                },

                _pc: e
              };
            };

            if (!e.RTCPeerConnection.prototype.getSenders) {
              e.RTCPeerConnection.prototype.getSenders = function () {
                return this._senders = this._senders || [], this._senders.slice();
              };

              var r = e.RTCPeerConnection.prototype.addTrack;

              e.RTCPeerConnection.prototype.addTrack = function (e, i) {
                var s = r.apply(this, arguments);
                return s || (s = t(this, e), this._senders.push(s)), s;
              };

              var s = e.RTCPeerConnection.prototype.removeTrack;

              e.RTCPeerConnection.prototype.removeTrack = function (e) {
                s.apply(this, arguments);

                var t = this._senders.indexOf(e);

                -1 !== t && this._senders.splice(t, 1);
              };
            }

            var n = e.RTCPeerConnection.prototype.addStream;

            e.RTCPeerConnection.prototype.addStream = function (e) {
              var r = this;
              this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(function (e) {
                r._senders.push(t(r, e));
              });
            };

            var o = e.RTCPeerConnection.prototype.removeStream;

            e.RTCPeerConnection.prototype.removeStream = function (e) {
              var t = this;
              this._senders = this._senders || [], o.apply(this, [e]), e.getTracks().forEach(function (e) {
                var r = t._senders.find(function (t) {
                  return t.track === e;
                });

                r && t._senders.splice(t._senders.indexOf(r), 1);
              });
            };
          } else if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
            var a = e.RTCPeerConnection.prototype.getSenders;
            e.RTCPeerConnection.prototype.getSenders = function () {
              var e = this,
                  t = a.apply(this, []);
              return t.forEach(function (t) {
                return t._pc = e;
              }), t;
            }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
              get: function get() {
                return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
              }
            });
          }
        }, r.shimGetStats = function (e) {
          if (e.RTCPeerConnection) {
            var t = e.RTCPeerConnection.prototype.getStats;

            e.RTCPeerConnection.prototype.getStats = function (e, r, i) {
              var s = this,
                  n = arguments;
              if (arguments.length > 0 && "function" == typeof e) return t.apply(this, arguments);
              if (0 === t.length && (0 === arguments.length || "function" != typeof arguments[0])) return t.apply(this, []);

              var o = function o(e) {
                var t = {};
                return e.result().forEach(function (e) {
                  var r = {
                    id: e.id,
                    timestamp: e.timestamp,
                    type: {
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate"
                    }[e.type] || e.type
                  };
                  e.names().forEach(function (t) {
                    r[t] = e.stat(t);
                  }), t[r.id] = r;
                }), t;
              },
                  a = function a(e) {
                return new Map(Object.keys(e).map(function (t) {
                  return [t, e[t]];
                }));
              };

              if (arguments.length >= 2) {
                var c = function c(e) {
                  n[1](a(o(e)));
                };

                return t.apply(this, [c, arguments[0]]);
              }

              return new Promise(function (e, r) {
                t.apply(s, [function (t) {
                  e(a(o(t)));
                }, r]);
              }).then(r, i);
            };
          }
        }, r.shimSenderReceiverGetStats = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver) {
            if (!("getStats" in e.RTCRtpSender.prototype)) {
              var t = e.RTCPeerConnection.prototype.getSenders;
              t && (e.RTCPeerConnection.prototype.getSenders = function () {
                var e = this,
                    r = t.apply(this, []);
                return r.forEach(function (t) {
                  return t._pc = e;
                }), r;
              });
              var r = e.RTCPeerConnection.prototype.addTrack;
              r && (e.RTCPeerConnection.prototype.addTrack = function () {
                var e = r.apply(this, arguments);
                return e._pc = this, e;
              }), e.RTCRtpSender.prototype.getStats = function () {
                var e = this;
                return this._pc.getStats().then(function (t) {
                  return o.filterStats(t, e.track, !0);
                });
              };
            }

            if (!("getStats" in e.RTCRtpReceiver.prototype)) {
              var s = e.RTCPeerConnection.prototype.getReceivers;
              s && (e.RTCPeerConnection.prototype.getReceivers = function () {
                var e = this,
                    t = s.apply(this, []);
                return t.forEach(function (t) {
                  return t._pc = e;
                }), t;
              }), o.wrapPeerConnectionEvent(e, "track", function (e) {
                return e.receiver._pc = e.srcElement, e;
              }), e.RTCRtpReceiver.prototype.getStats = function () {
                var e = this;
                return this._pc.getStats().then(function (t) {
                  return o.filterStats(t, e.track, !1);
                });
              };
            }

            if ("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype) {
              var n = e.RTCPeerConnection.prototype.getStats;

              e.RTCPeerConnection.prototype.getStats = function () {
                if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                  var t = arguments[0],
                      r = void 0,
                      i = void 0,
                      s = void 0;
                  return this.getSenders().forEach(function (e) {
                    e.track === t && (r ? s = !0 : r = e);
                  }), this.getReceivers().forEach(function (e) {
                    return e.track === t && (i ? s = !0 : i = e), e.track === t;
                  }), s || r && i ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : r ? r.getStats() : i ? i.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
                }

                return n.apply(this, arguments);
              };
            }
          }
        }, r.shimAddTrackRemoveTrackWithNative = a, r.shimAddTrackRemoveTrack = function (e) {
          if (e.RTCPeerConnection) {
            var t = o.detectBrowser(e);
            if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return a(e);
            var r = e.RTCPeerConnection.prototype.getLocalStreams;

            e.RTCPeerConnection.prototype.getLocalStreams = function () {
              var e = this,
                  t = r.apply(this);
              return this._reverseStreams = this._reverseStreams || {}, t.map(function (t) {
                return e._reverseStreams[t.id];
              });
            };

            var i = e.RTCPeerConnection.prototype.addStream;

            e.RTCPeerConnection.prototype.addStream = function (t) {
              var r = this;

              if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(function (e) {
                if (r.getSenders().find(function (t) {
                  return t.track === e;
                })) throw new DOMException("Track already exists.", "InvalidAccessError");
              }), !this._reverseStreams[t.id]) {
                var s = new e.MediaStream(t.getTracks());
                this._streams[t.id] = s, this._reverseStreams[s.id] = t, t = s;
              }

              i.apply(this, [t]);
            };

            var s = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function (e) {
              this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, s.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id];
            }, e.RTCPeerConnection.prototype.addTrack = function (t, r) {
              var i = this;
              if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              var s = [].slice.call(arguments, 1);
              if (1 !== s.length || !s[0].getTracks().find(function (e) {
                return e === t;
              })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
              var n = this.getSenders().find(function (e) {
                return e.track === t;
              });
              if (n) throw new DOMException("Track already exists.", "InvalidAccessError");
              this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
              var o = this._streams[r.id];
              if (o) o.addTrack(t), Promise.resolve().then(function () {
                i.dispatchEvent(new Event("negotiationneeded"));
              });else {
                var a = new e.MediaStream([t]);
                this._streams[r.id] = a, this._reverseStreams[a.id] = r, this.addStream(a);
              }
              return this.getSenders().find(function (e) {
                return e.track === t;
              });
            }, ["createOffer", "createAnswer"].forEach(function (t) {
              var r = e.RTCPeerConnection.prototype[t];

              e.RTCPeerConnection.prototype[t] = function () {
                var e = this,
                    t = arguments,
                    i = arguments.length && "function" == typeof arguments[0];
                return i ? r.apply(this, [function (r) {
                  var i = l(e, r);
                  t[0].apply(null, [i]);
                }, function (e) {
                  t[1] && t[1].apply(null, e);
                }, arguments[2]]) : r.apply(this, arguments).then(function (t) {
                  return l(e, t);
                });
              };
            });
            var n = e.RTCPeerConnection.prototype.setLocalDescription;

            e.RTCPeerConnection.prototype.setLocalDescription = function () {
              return arguments.length && arguments[0].type ? (arguments[0] = d(this, arguments[0]), n.apply(this, arguments)) : n.apply(this, arguments);
            };

            var c = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
            Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
              get: function get() {
                var e = c.get.apply(this);
                return "" === e.type ? e : l(this, e);
              }
            }), e.RTCPeerConnection.prototype.removeTrack = function (e) {
              var t = this;
              if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
              if (e._pc !== this) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
              this._streams = this._streams || {};
              var r = void 0;
              Object.keys(this._streams).forEach(function (i) {
                t._streams[i].getTracks().find(function (t) {
                  return e.track === t;
                }) && (r = t._streams[i]);
              }), r && (1 === r.getTracks().length ? this.removeStream(this._reverseStreams[r.id]) : r.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")));
            };
          }

          function l(e, t) {
            var r = t.sdp;
            return Object.keys(e._reverseStreams || []).forEach(function (t) {
              var i = e._reverseStreams[t],
                  s = e._streams[i.id];
              r = r.replace(new RegExp(s.id, "g"), i.id);
            }), new RTCSessionDescription({
              type: t.type,
              sdp: r
            });
          }

          function d(e, t) {
            var r = t.sdp;
            return Object.keys(e._reverseStreams || []).forEach(function (t) {
              var i = e._reverseStreams[t],
                  s = e._streams[i.id];
              r = r.replace(new RegExp(i.id, "g"), s.id);
            }), new RTCSessionDescription({
              type: t.type,
              sdp: r
            });
          }
        }, r.shimPeerConnection = function (e) {
          if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection) {
            ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (t) {
              var r = e.RTCPeerConnection.prototype[t];

              e.RTCPeerConnection.prototype[t] = function () {
                return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
              };
            });
            var t = e.RTCPeerConnection.prototype.addIceCandidate;

            e.RTCPeerConnection.prototype.addIceCandidate = function () {
              return arguments[0] ? t.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
            };
          }
        }, r.fixNegotiationNeeded = function (e) {
          o.wrapPeerConnectionEvent(e, "negotiationneeded", function (e) {
            if ("stable" === e.target.signalingState) return e;
          });
        };

        var o = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils.js"));

        function a(e) {
          e.RTCPeerConnection.prototype.getLocalStreams = function () {
            var e = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function (t) {
              return e._shimmedLocalStreams[t][0];
            });
          };

          var t = e.RTCPeerConnection.prototype.addTrack;

          e.RTCPeerConnection.prototype.addTrack = function (e, r) {
            if (!r) return t.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            var i = t.apply(this, arguments);
            return this._shimmedLocalStreams[r.id] ? -1 === this._shimmedLocalStreams[r.id].indexOf(i) && this._shimmedLocalStreams[r.id].push(i) : this._shimmedLocalStreams[r.id] = [r, i], i;
          };

          var r = e.RTCPeerConnection.prototype.addStream;

          e.RTCPeerConnection.prototype.addStream = function (e) {
            var t = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(function (e) {
              if (t.getSenders().find(function (t) {
                return t.track === e;
              })) throw new DOMException("Track already exists.", "InvalidAccessError");
            });
            var i = this.getSenders();
            r.apply(this, arguments);
            var s = this.getSenders().filter(function (e) {
              return -1 === i.indexOf(e);
            });
            this._shimmedLocalStreams[e.id] = [e].concat(s);
          };

          var i = e.RTCPeerConnection.prototype.removeStream;

          e.RTCPeerConnection.prototype.removeStream = function (e) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], i.apply(this, arguments);
          };

          var s = e.RTCPeerConnection.prototype.removeTrack;

          e.RTCPeerConnection.prototype.removeTrack = function (e) {
            var t = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(function (r) {
              var i = t._shimmedLocalStreams[r].indexOf(e);

              -1 !== i && t._shimmedLocalStreams[r].splice(i, 1), 1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r];
            }), s.apply(this, arguments);
          };
        }
      }, {
        "../utils.js": 15,
        "./getdisplaymedia": 4,
        "./getusermedia": 5
      }],
      4: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = function (e, t) {
          e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && ("function" == typeof t ? e.navigator.mediaDevices.getDisplayMedia = function (r) {
            return t(r).then(function (t) {
              var i = r.video && r.video.width,
                  s = r.video && r.video.height,
                  n = r.video && r.video.frameRate;
              return r.video = {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: t,
                  maxFrameRate: n || 3
                }
              }, i && (r.video.mandatory.maxWidth = i), s && (r.video.mandatory.maxHeight = s), e.navigator.mediaDevices.getUserMedia(r);
            });
          } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"));
        };
      }, {}],
      5: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        };

        r.shimGetUserMedia = function (e) {
          var t = e && e.navigator;

          if (t.mediaDevices) {
            var r = s.detectBrowser(e),
                o = function o(e) {
              if ("object" !== (void 0 === e ? "undefined" : i(e)) || e.mandatory || e.optional) return e;
              var t = {};
              return Object.keys(e).forEach(function (r) {
                if ("require" !== r && "advanced" !== r && "mediaSource" !== r) {
                  var s = "object" === i(e[r]) ? e[r] : {
                    ideal: e[r]
                  };
                  void 0 !== s.exact && "number" == typeof s.exact && (s.min = s.max = s.exact);

                  var n = function n(e, t) {
                    return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t;
                  };

                  if (void 0 !== s.ideal) {
                    t.optional = t.optional || [];
                    var o = {};
                    "number" == typeof s.ideal ? (o[n("min", r)] = s.ideal, t.optional.push(o), (o = {})[n("max", r)] = s.ideal, t.optional.push(o)) : (o[n("", r)] = s.ideal, t.optional.push(o));
                  }

                  void 0 !== s.exact && "number" != typeof s.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[n("", r)] = s.exact) : ["min", "max"].forEach(function (e) {
                    void 0 !== s[e] && (t.mandatory = t.mandatory || {}, t.mandatory[n(e, r)] = s[e]);
                  });
                }
              }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t;
            },
                a = function a(e, s) {
              if (r.version >= 61) return s(e);

              if ((e = JSON.parse(JSON.stringify(e))) && "object" === i(e.audio)) {
                var a = function a(e, t, r) {
                  t in e && !(r in e) && (e[r] = e[t], delete e[t]);
                };

                a((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), a(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = o(e.audio);
              }

              if (e && "object" === i(e.video)) {
                var c = e.video.facingMode;
                c = c && ("object" === (void 0 === c ? "undefined" : i(c)) ? c : {
                  ideal: c
                });
                var l = r.version < 66;

                if (c && ("user" === c.exact || "environment" === c.exact || "user" === c.ideal || "environment" === c.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || l)) {
                  delete e.video.facingMode;
                  var d = void 0;
                  if ("environment" === c.exact || "environment" === c.ideal ? d = ["back", "rear"] : "user" !== c.exact && "user" !== c.ideal || (d = ["front"]), d) return t.mediaDevices.enumerateDevices().then(function (t) {
                    var r = (t = t.filter(function (e) {
                      return "videoinput" === e.kind;
                    })).find(function (e) {
                      return d.some(function (t) {
                        return e.label.toLowerCase().includes(t);
                      });
                    });
                    return !r && t.length && d.includes("back") && (r = t[t.length - 1]), r && (e.video.deviceId = c.exact ? {
                      exact: r.deviceId
                    } : {
                      ideal: r.deviceId
                    }), e.video = o(e.video), n("chrome: " + JSON.stringify(e)), s(e);
                  });
                }

                e.video = o(e.video);
              }

              return n("chrome: " + JSON.stringify(e)), s(e);
            },
                c = function c(e) {
              return r.version >= 64 ? e : {
                name: {
                  PermissionDeniedError: "NotAllowedError",
                  PermissionDismissedError: "NotAllowedError",
                  InvalidStateError: "NotAllowedError",
                  DevicesNotFoundError: "NotFoundError",
                  ConstraintNotSatisfiedError: "OverconstrainedError",
                  TrackStartError: "NotReadableError",
                  MediaDeviceFailedDueToShutdown: "NotAllowedError",
                  MediaDeviceKillSwitchOn: "NotAllowedError",
                  TabCaptureError: "AbortError",
                  ScreenCaptureError: "AbortError",
                  DeviceCaptureError: "AbortError"
                }[e.name] || e.name,
                message: e.message,
                constraint: e.constraint || e.constraintName,
                toString: function toString() {
                  return this.name + (this.message && ": ") + this.message;
                }
              };
            };

            if (t.getUserMedia = function (e, r, i) {
              a(e, function (e) {
                t.webkitGetUserMedia(e, r, function (e) {
                  i && i(c(e));
                });
              });
            }.bind(t), t.mediaDevices.getUserMedia) {
              var l = t.mediaDevices.getUserMedia.bind(t.mediaDevices);

              t.mediaDevices.getUserMedia = function (e) {
                return a(e, function (e) {
                  return l(e).then(function (t) {
                    if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function (e) {
                      e.stop();
                    }), new DOMException("", "NotFoundError");
                    return t;
                  }, function (e) {
                    return Promise.reject(c(e));
                  });
                });
              };
            }
          }
        };

        var s = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils.js")),
            n = s.log;
      }, {
        "../utils.js": 15
      }],
      6: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        };
        r.shimRTCIceCandidate = function (e) {
          if (!(!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
            var t = e.RTCIceCandidate;
            e.RTCIceCandidate = function (e) {
              if ("object" === (void 0 === e ? "undefined" : i(e)) && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                var r = new t(e),
                    s = o["default"].parseCandidate(e.candidate),
                    n = Object.assign(r, s);
                return n.toJSON = function () {
                  return {
                    candidate: n.candidate,
                    sdpMid: n.sdpMid,
                    sdpMLineIndex: n.sdpMLineIndex,
                    usernameFragment: n.usernameFragment
                  };
                }, n;
              }

              return new t(e);
            }, e.RTCIceCandidate.prototype = t.prototype, a.wrapPeerConnectionEvent(e, "icecandidate", function (t) {
              return t.candidate && Object.defineProperty(t, "candidate", {
                value: new e.RTCIceCandidate(t.candidate),
                writable: "false"
              }), t;
            });
          }
        }, r.shimMaxMessageSize = function (e) {
          if (!e.RTCSctpTransport && e.RTCPeerConnection) {
            var t = a.detectBrowser(e);
            "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
              get: function get() {
                return void 0 === this._sctp ? null : this._sctp;
              }
            });

            var r = function r(e) {
              if (!e || !e.sdp) return !1;
              var t = o["default"].splitSections(e.sdp);
              return t.shift(), t.some(function (e) {
                var t = o["default"].parseMLine(e);
                return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP");
              });
            },
                i = function i(e) {
              var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
              if (null === t || t.length < 2) return -1;
              var r = parseInt(t[1], 10);
              return r != r ? -1 : r;
            },
                s = function s(e) {
              var r = 65536;
              return "firefox" === t.browser && (r = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637), r;
            },
                n = function n(e, r) {
              var i = 65536;
              "firefox" === t.browser && 57 === t.version && (i = 65535);
              var s = o["default"].matchPrefix(e.sdp, "a=max-message-size:");
              return s.length > 0 ? i = parseInt(s[0].substr(19), 10) : "firefox" === t.browser && -1 !== r && (i = 2147483637), i;
            },
                c = e.RTCPeerConnection.prototype.setRemoteDescription;

            e.RTCPeerConnection.prototype.setRemoteDescription = function () {
              if (this._sctp = null, r(arguments[0])) {
                var e = i(arguments[0]),
                    t = s(e),
                    o = n(arguments[0], e),
                    a = void 0;
                a = 0 === t && 0 === o ? Number.POSITIVE_INFINITY : 0 === t || 0 === o ? Math.max(t, o) : Math.min(t, o);
                var l = {};
                Object.defineProperty(l, "maxMessageSize", {
                  get: function get() {
                    return a;
                  }
                }), this._sctp = l;
              }

              return c.apply(this, arguments);
            };
          }
        }, r.shimSendThrowTypeError = function (e) {
          if (e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype) {
            var t = e.RTCPeerConnection.prototype.createDataChannel;
            e.RTCPeerConnection.prototype.createDataChannel = function () {
              var e = t.apply(this, arguments);
              return r(e, this), e;
            }, a.wrapPeerConnectionEvent(e, "datachannel", function (e) {
              return r(e.channel, e.target), e;
            });
          }

          function r(e, t) {
            var r = e.send;

            e.send = function () {
              var i = arguments[0],
                  s = i.length || i.size || i.byteLength;
              if ("open" === e.readyState && t.sctp && s > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
              return r.apply(e, arguments);
            };
          }
        }, r.shimConnectionState = function (e) {
          if (e.RTCPeerConnection && !("connectionState" in e.RTCPeerConnection.prototype)) {
            var t = e.RTCPeerConnection.prototype;
            Object.defineProperty(t, "connectionState", {
              get: function get() {
                return {
                  completed: "connected",
                  checking: "connecting"
                }[this.iceConnectionState] || this.iceConnectionState;
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t, "onconnectionstatechange", {
              get: function get() {
                return this._onconnectionstatechange || null;
              },
              set: function set(e) {
                this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e);
              },
              enumerable: !0,
              configurable: !0
            }), ["setLocalDescription", "setRemoteDescription"].forEach(function (e) {
              var r = t[e];

              t[e] = function () {
                return this._connectionstatechangepoly || (this._connectionstatechangepoly = function (e) {
                  var t = e.target;

                  if (t._lastConnectionState !== t.connectionState) {
                    t._lastConnectionState = t.connectionState;
                    var r = new Event("connectionstatechange", e);
                    t.dispatchEvent(r);
                  }

                  return e;
                }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), r.apply(this, arguments);
              };
            });
          }
        }, r.removeAllowExtmapMixed = function (e) {
          if (e.RTCPeerConnection) {
            var t = a.detectBrowser(e);

            if (!("chrome" === t.browser && t.version >= 71)) {
              var r = e.RTCPeerConnection.prototype.setRemoteDescription;

              e.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                return e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(function (e) {
                  return "a=extmap-allow-mixed" !== e.trim();
                }).join("\n")), r.apply(this, arguments);
              };
            }
          }
        };

        var s,
            n = e("sdp"),
            o = (s = n) && s.__esModule ? s : {
          "default": s
        },
            a = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("./utils"));
      }, {
        "./utils": 15,
        sdp: 17
      }],
      7: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
        var i = e("./getusermedia");
        Object.defineProperty(r, "shimGetUserMedia", {
          enumerable: !0,
          get: function get() {
            return i.shimGetUserMedia;
          }
        });
        var s = e("./getdisplaymedia");
        Object.defineProperty(r, "shimGetDisplayMedia", {
          enumerable: !0,
          get: function get() {
            return s.shimGetDisplayMedia;
          }
        }), r.shimPeerConnection = function (e) {
          var t = o.detectBrowser(e);

          if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function (e) {
            return e;
          }), e.RTCSessionDescription || (e.RTCSessionDescription = function (e) {
            return e;
          }), t.version < 15025)) {
            var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
            Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
              set: function set(e) {
                r.set.call(this, e);
                var t = new Event("enabled");
                t.enabled = e, this.dispatchEvent(t);
              }
            });
          }

          e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype) && Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
            get: function get() {
              return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf;
            }
          }), e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
          var i = (0, l["default"])(e, t.version);
          e.RTCPeerConnection = function (e) {
            return e && e.iceServers && (e.iceServers = (0, a.filterIceServers)(e.iceServers, t.version), o.log("ICE servers after filtering:", e.iceServers)), new i(e);
          }, e.RTCPeerConnection.prototype = i.prototype;
        }, r.shimReplaceTrack = function (e) {
          e.RTCRtpSender && !("replaceTrack" in e.RTCRtpSender.prototype) && (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
        };

        var n,
            o = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils")),
            a = e("./filtericeservers"),
            c = e("rtcpeerconnection-shim"),
            l = (n = c) && n.__esModule ? n : {
          "default": n
        };
      }, {
        "../utils": 15,
        "./filtericeservers": 8,
        "./getdisplaymedia": 9,
        "./getusermedia": 10,
        "rtcpeerconnection-shim": 16
      }],
      8: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.filterIceServers = function (e, t) {
          var r = !1;
          return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
            if (e && (e.urls || e.url)) {
              var t = e.urls || e.url;
              e.url && !e.urls && i.deprecated("RTCIceServer.url", "RTCIceServer.urls");
              var s = "string" == typeof t;
              return s && (t = [t]), t = t.filter(function (e) {
                if (0 === e.indexOf("stun:")) return !1;
                var t = e.startsWith("turn") && !e.startsWith("turn:[") && e.includes("transport=udp");
                return t && !r ? (r = !0, !0) : t && !r;
              }), delete e.url, e.urls = s ? t[0] : t, !!t.length;
            }
          });
        };

        var i = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils"));
      }, {
        "../utils": 15
      }],
      9: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = function (e) {
          "getDisplayMedia" in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)));
        };
      }, {}],
      10: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetUserMedia = function (e) {
          var t = e && e.navigator,
              r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);

          t.mediaDevices.getUserMedia = function (e) {
            return r(e)["catch"](function (e) {
              return Promise.reject(function (e) {
                return {
                  name: {
                    PermissionDeniedError: "NotAllowedError"
                  }[e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint,
                  toString: function toString() {
                    return this.name;
                  }
                };
              }(e));
            });
          };
        };
      }, {}],
      11: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        },
            s = e("./getusermedia");
        Object.defineProperty(r, "shimGetUserMedia", {
          enumerable: !0,
          get: function get() {
            return s.shimGetUserMedia;
          }
        });
        var n = e("./getdisplaymedia");
        Object.defineProperty(r, "shimGetDisplayMedia", {
          enumerable: !0,
          get: function get() {
            return n.shimGetDisplayMedia;
          }
        }), r.shimOnTrack = function (e) {
          "object" === (void 0 === e ? "undefined" : i(e)) && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get: function get() {
              return {
                receiver: this.receiver
              };
            }
          });
        }, r.shimPeerConnection = function (e) {
          var t = o.detectBrowser(e);

          if ("object" === (void 0 === e ? "undefined" : i(e)) && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
            !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (t) {
              var r = e.RTCPeerConnection.prototype[t];

              e.RTCPeerConnection.prototype[t] = function () {
                return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
              };
            });
            var r = e.RTCPeerConnection.prototype.addIceCandidate;

            e.RTCPeerConnection.prototype.addIceCandidate = function () {
              return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
            };

            var s = {
              inboundrtp: "inbound-rtp",
              outboundrtp: "outbound-rtp",
              candidatepair: "candidate-pair",
              localcandidate: "local-candidate",
              remotecandidate: "remote-candidate"
            },
                n = e.RTCPeerConnection.prototype.getStats;

            e.RTCPeerConnection.prototype.getStats = function (e, r, i) {
              return n.apply(this, [e || null]).then(function (e) {
                if (t.version < 53 && !r) try {
                  e.forEach(function (e) {
                    e.type = s[e.type] || e.type;
                  });
                } catch (t) {
                  if ("TypeError" !== t.name) throw t;
                  e.forEach(function (t, r) {
                    e.set(r, Object.assign({}, t, {
                      type: s[t.type] || t.type
                    }));
                  });
                }
                return e;
              }).then(r, i);
            };
          }
        }, r.shimSenderGetStats = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && (!e.RTCRtpSender || !("getStats" in e.RTCRtpSender.prototype))) {
            var t = e.RTCPeerConnection.prototype.getSenders;
            t && (e.RTCPeerConnection.prototype.getSenders = function () {
              var e = this,
                  r = t.apply(this, []);
              return r.forEach(function (t) {
                return t._pc = e;
              }), r;
            });
            var r = e.RTCPeerConnection.prototype.addTrack;
            r && (e.RTCPeerConnection.prototype.addTrack = function () {
              var e = r.apply(this, arguments);
              return e._pc = this, e;
            }), e.RTCRtpSender.prototype.getStats = function () {
              return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
            };
          }
        }, r.shimReceiverGetStats = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && (!e.RTCRtpSender || !("getStats" in e.RTCRtpReceiver.prototype))) {
            var t = e.RTCPeerConnection.prototype.getReceivers;
            t && (e.RTCPeerConnection.prototype.getReceivers = function () {
              var e = this,
                  r = t.apply(this, []);
              return r.forEach(function (t) {
                return t._pc = e;
              }), r;
            }), o.wrapPeerConnectionEvent(e, "track", function (e) {
              return e.receiver._pc = e.srcElement, e;
            }), e.RTCRtpReceiver.prototype.getStats = function () {
              return this._pc.getStats(this.track);
            };
          }
        }, r.shimRemoveStream = function (e) {
          e.RTCPeerConnection && !("removeStream" in e.RTCPeerConnection.prototype) && (e.RTCPeerConnection.prototype.removeStream = function (e) {
            var t = this;
            o.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function (r) {
              r.track && e.getTracks().includes(r.track) && t.removeTrack(r);
            });
          });
        }, r.shimRTCDataChannel = function (e) {
          e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
        };

        var o = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils"));
      }, {
        "../utils": 15,
        "./getdisplaymedia": 12,
        "./getusermedia": 13
      }],
      12: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.shimGetDisplayMedia = function (e, t) {
          e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function (r) {
            if (!r || !r.video) {
              var i = new DOMException("getDisplayMedia without video constraints is undefined");
              return i.name = "NotFoundError", i.code = 8, Promise.reject(i);
            }

            return !0 === r.video ? r.video = {
              mediaSource: t
            } : r.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(r);
          });
        };
      }, {}],
      13: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        };

        r.shimGetUserMedia = function (e) {
          var t = s.detectBrowser(e),
              r = e && e.navigator,
              n = e && e.MediaStreamTrack;

          if (r.getUserMedia = function (e, t, i) {
            s.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), r.mediaDevices.getUserMedia(e).then(t, i);
          }, !(t.version > 55 && "autoGainControl" in r.mediaDevices.getSupportedConstraints())) {
            var o = function o(e, t, r) {
              t in e && !(r in e) && (e[r] = e[t], delete e[t]);
            },
                a = r.mediaDevices.getUserMedia.bind(r.mediaDevices);

            if (r.mediaDevices.getUserMedia = function (e) {
              return "object" === (void 0 === e ? "undefined" : i(e)) && "object" === i(e.audio) && (e = JSON.parse(JSON.stringify(e)), o(e.audio, "autoGainControl", "mozAutoGainControl"), o(e.audio, "noiseSuppression", "mozNoiseSuppression")), a(e);
            }, n && n.prototype.getSettings) {
              var c = n.prototype.getSettings;

              n.prototype.getSettings = function () {
                var e = c.apply(this, arguments);
                return o(e, "mozAutoGainControl", "autoGainControl"), o(e, "mozNoiseSuppression", "noiseSuppression"), e;
              };
            }

            if (n && n.prototype.applyConstraints) {
              var l = n.prototype.applyConstraints;

              n.prototype.applyConstraints = function (e) {
                return "audio" === this.kind && "object" === (void 0 === e ? "undefined" : i(e)) && (e = JSON.parse(JSON.stringify(e)), o(e, "autoGainControl", "mozAutoGainControl"), o(e, "noiseSuppression", "mozNoiseSuppression")), l.apply(this, [e]);
              };
            }
          }
        };

        var s = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils"));
      }, {
        "../utils": 15
      }],
      14: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        };
        r.shimLocalStreamsAPI = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection) {
            if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function () {
              return this._localStreams || (this._localStreams = []), this._localStreams;
            }), !("addStream" in e.RTCPeerConnection.prototype)) {
              var t = e.RTCPeerConnection.prototype.addTrack;
              e.RTCPeerConnection.prototype.addStream = function (e) {
                var r = this;
                this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getTracks().forEach(function (i) {
                  return t.call(r, i, e);
                });
              }, e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                return r && (this._localStreams ? this._localStreams.includes(r) || this._localStreams.push(r) : this._localStreams = [r]), t.call(this, e, r);
              };
            }

            "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function (e) {
              var t = this;
              this._localStreams || (this._localStreams = []);

              var r = this._localStreams.indexOf(e);

              if (-1 !== r) {
                this._localStreams.splice(r, 1);

                var i = e.getTracks();
                this.getSenders().forEach(function (e) {
                  i.includes(e.track) && t.removeTrack(e);
                });
              }
            });
          }
        }, r.shimRemoteStreamsAPI = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
            return this._remoteStreams ? this._remoteStreams : [];
          }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
            Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
              get: function get() {
                return this._onaddstream;
              },
              set: function set(e) {
                var t = this;
                this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (e) {
                    if (t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e)) {
                      t._remoteStreams.push(e);

                      var r = new Event("addstream");
                      r.stream = e, t.dispatchEvent(r);
                    }
                  });
                });
              }
            });
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;

            e.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var e = this;
              return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function (t) {
                t.streams.forEach(function (t) {
                  if (e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0)) {
                    e._remoteStreams.push(t);

                    var r = new Event("addstream");
                    r.stream = t, e.dispatchEvent(r);
                  }
                });
              }), t.apply(e, arguments);
            };
          }
        }, r.shimCallbacksAPI = function (e) {
          if ("object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection) {
            var t = e.RTCPeerConnection.prototype,
                r = t.createOffer,
                s = t.createAnswer,
                n = t.setLocalDescription,
                o = t.setRemoteDescription,
                a = t.addIceCandidate;
            t.createOffer = function (e, t) {
              var i = arguments.length >= 2 ? arguments[2] : arguments[0],
                  s = r.apply(this, [i]);
              return t ? (s.then(e, t), Promise.resolve()) : s;
            }, t.createAnswer = function (e, t) {
              var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                  i = s.apply(this, [r]);
              return t ? (i.then(e, t), Promise.resolve()) : i;
            };

            var c = function c(e, t, r) {
              var i = n.apply(this, [e]);
              return r ? (i.then(t, r), Promise.resolve()) : i;
            };

            t.setLocalDescription = c, c = function c(e, t, r) {
              var i = o.apply(this, [e]);
              return r ? (i.then(t, r), Promise.resolve()) : i;
            }, t.setRemoteDescription = c, c = function c(e, t, r) {
              var i = a.apply(this, [e]);
              return r ? (i.then(t, r), Promise.resolve()) : i;
            }, t.addIceCandidate = c;
          }
        }, r.shimGetUserMedia = function (e) {
          var t = e && e.navigator;

          if (t.mediaDevices && t.mediaDevices.getUserMedia) {
            var r = t.mediaDevices,
                i = r.getUserMedia.bind(r);

            t.mediaDevices.getUserMedia = function (e) {
              return i(n(e));
            };
          }

          !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function (e, r, i) {
            t.mediaDevices.getUserMedia(e).then(r, i);
          }.bind(t));
        }, r.shimConstraints = n, r.shimRTCIceServerUrls = function (e) {
          var t = e.RTCPeerConnection;
          e.RTCPeerConnection = function (e, r) {
            if (e && e.iceServers) {
              for (var i = [], n = 0; n < e.iceServers.length; n++) {
                var o = e.iceServers[n];
                !o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (s.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, delete o.url, i.push(o)) : i.push(e.iceServers[n]);
              }

              e.iceServers = i;
            }

            return new t(e, r);
          }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
            get: function get() {
              return t.generateCertificate;
            }
          });
        }, r.shimTrackEventTransceiver = function (e) {
          "object" === (void 0 === e ? "undefined" : i(e)) && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get: function get() {
              return {
                receiver: this.receiver
              };
            }
          });
        }, r.shimCreateOfferLegacy = function (e) {
          var t = e.RTCPeerConnection.prototype.createOffer;

          e.RTCPeerConnection.prototype.createOffer = function (e) {
            if (e) {
              void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
              var r = this.getTransceivers().find(function (e) {
                return "audio" === e.receiver.track.kind;
              });
              !1 === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : !0 !== e.offerToReceiveAudio || r || this.addTransceiver("audio"), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
              var i = this.getTransceivers().find(function (e) {
                return "video" === e.receiver.track.kind;
              });
              !1 === e.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection ? i.setDirection("sendonly") : i.direction = "sendonly" : "recvonly" === i.direction && (i.setDirection ? i.setDirection("inactive") : i.direction = "inactive") : !0 !== e.offerToReceiveVideo || i || this.addTransceiver("video");
            }

            return t.apply(this, arguments);
          };
        };

        var s = function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var r in e) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t["default"] = e, t;
        }(e("../utils"));

        function n(e) {
          return e && void 0 !== e.video ? Object.assign({}, e, {
            video: s.compactObject(e.video)
          }) : e;
        }
      }, {
        "../utils": 15
      }],
      15: [function (e, t, r) {
        "use strict";

        Object.defineProperty(r, "__esModule", {
          value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        };
        r.extractVersion = o, r.wrapPeerConnectionEvent = function (e, t, r) {
          if (e.RTCPeerConnection) {
            var i = e.RTCPeerConnection.prototype,
                s = i.addEventListener;

            i.addEventListener = function (e, i) {
              if (e !== t) return s.apply(this, arguments);

              var n = function n(e) {
                var t = r(e);
                t && i(t);
              };

              return this._eventMap = this._eventMap || {}, this._eventMap[i] = n, s.apply(this, [e, n]);
            };

            var n = i.removeEventListener;
            i.removeEventListener = function (e, r) {
              if (e !== t || !this._eventMap || !this._eventMap[r]) return n.apply(this, arguments);
              var i = this._eventMap[r];
              return delete this._eventMap[r], n.apply(this, [e, i]);
            }, Object.defineProperty(i, "on" + t, {
              get: function get() {
                return this["_on" + t];
              },
              set: function set(e) {
                this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e);
              },
              enumerable: !0,
              configurable: !0
            });
          }
        }, r.disableLog = function (e) {
          return "boolean" != typeof e ? new Error("Argument type: " + (void 0 === e ? "undefined" : i(e)) + ". Please use a boolean.") : (s = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled");
        }, r.disableWarnings = function (e) {
          return "boolean" != typeof e ? new Error("Argument type: " + (void 0 === e ? "undefined" : i(e)) + ". Please use a boolean.") : (n = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
        }, r.log = function () {
          if ("object" === ("undefined" == typeof window ? "undefined" : i(window))) {
            if (s) return;
            "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
          }
        }, r.deprecated = function (e, t) {
          n && console.warn(e + " is deprecated, please use " + t + " instead.");
        }, r.detectBrowser = function (e) {
          var t = e.navigator,
              r = {
            browser: null,
            version: null
          };
          if (void 0 === e || !e.navigator) return r.browser = "Not a browser.", r;
          if (t.mozGetUserMedia) r.browser = "firefox", r.version = o(t.userAgent, /Firefox\/(\d+)\./, 1);else if (t.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) r.browser = "chrome", r.version = o(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = "edge", r.version = o(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);else {
            if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser = "Not a supported browser.", r;
            r.browser = "safari", r.version = o(t.userAgent, /AppleWebKit\/(\d+)\./, 1);
          }
          return r;
        }, r.compactObject = function e(t) {
          return "object" !== (void 0 === t ? "undefined" : i(t)) ? t : Object.keys(t).reduce(function (r, s) {
            var n = "object" === i(t[s]),
                o = n ? e(t[s]) : t[s],
                a = n && !Object.keys(o).length;
            return void 0 === o || a ? r : Object.assign(r, function (e, t, r) {
              return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : e[t] = r, e;
            }({}, s, o));
          }, {});
        }, r.walkStats = a, r.filterStats = function (e, t, r) {
          var i = r ? "outbound-rtp" : "inbound-rtp",
              s = new Map();
          if (null === t) return s;
          var n = [];
          return e.forEach(function (e) {
            "track" === e.type && e.trackIdentifier === t.id && n.push(e);
          }), n.forEach(function (t) {
            e.forEach(function (r) {
              r.type === i && r.trackId === t.id && a(e, r, s);
            });
          }), s;
        };
        var s = !0,
            n = !0;

        function o(e, t, r) {
          var i = e.match(t);
          return i && i.length >= r && parseInt(i[r], 10);
        }

        function a(e, t, r) {
          t && !r.has(t.id) && (r.set(t.id, t), Object.keys(t).forEach(function (i) {
            i.endsWith("Id") ? a(e, e.get(t[i]), r) : i.endsWith("Ids") && t[i].forEach(function (t) {
              a(e, e.get(t), r);
            });
          }));
        }
      }, {}],
      16: [function (e, t, r) {
        "use strict";

        var i = e("sdp");

        function s(e, t, r, s, n) {
          var o = i.writeRtpDescription(e.kind, t);

          if (o += i.writeIceParameters(e.iceGatherer.getLocalParameters()), o += i.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : n || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
            var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
            e.rtpSender._initialTrackId = a;
            var c = "msid:" + (s ? s.id : "-") + " " + a + "\r\n";
            o += "a=" + c, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n");
          }

          return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + i.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + i.localCName + "\r\n"), o;
        }

        function n(e, t) {
          var r = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
          },
              i = function i(e, t) {
            e = parseInt(e, 10);

            for (var r = 0; r < t.length; r++) {
              if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r];
            }
          },
              s = function s(e, t, r, _s) {
            var n = i(e.parameters.apt, r),
                o = i(t.parameters.apt, _s);
            return n && o && n.name.toLowerCase() === o.name.toLowerCase();
          };

          return e.codecs.forEach(function (i) {
            for (var n = 0; n < t.codecs.length; n++) {
              var o = t.codecs[n];

              if (i.name.toLowerCase() === o.name.toLowerCase() && i.clockRate === o.clockRate) {
                if ("rtx" === i.name.toLowerCase() && i.parameters && o.parameters.apt && !s(i, o, e.codecs, t.codecs)) continue;
                (o = JSON.parse(JSON.stringify(o))).numChannels = Math.min(i.numChannels, o.numChannels), r.codecs.push(o), o.rtcpFeedback = o.rtcpFeedback.filter(function (e) {
                  for (var t = 0; t < i.rtcpFeedback.length; t++) {
                    if (i.rtcpFeedback[t].type === e.type && i.rtcpFeedback[t].parameter === e.parameter) return !0;
                  }

                  return !1;
                });
                break;
              }
            }
          }), e.headerExtensions.forEach(function (e) {
            for (var i = 0; i < t.headerExtensions.length; i++) {
              var s = t.headerExtensions[i];

              if (e.uri === s.uri) {
                r.headerExtensions.push(s);
                break;
              }
            }
          }), r;
        }

        function o(e, t, r) {
          return -1 !== {
            offer: {
              setLocalDescription: ["stable", "have-local-offer"],
              setRemoteDescription: ["stable", "have-remote-offer"]
            },
            answer: {
              setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
              setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
            }
          }[t][e].indexOf(r);
        }

        function a(e, t) {
          var r = e.getRemoteCandidates().find(function (e) {
            return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type;
          });
          return r || e.addRemoteCandidate(t), !r;
        }

        function c(e, t) {
          var r = new Error(t);
          return r.name = e, r.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: void 0,
            OperationError: void 0
          }[e], r;
        }

        t.exports = function (e, t) {
          function r(t, r) {
            r.addTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
              track: t
            }));
          }

          function l(t, r, i, s) {
            var n = new Event("track");
            n.track = r, n.receiver = i, n.transceiver = {
              receiver: i
            }, n.streams = s, e.setTimeout(function () {
              t._dispatchEvent("track", n);
            });
          }

          var d = function d(r) {
            var s = this,
                n = document.createDocumentFragment();
            if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function (e) {
              s[e] = n[e].bind(n);
            }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", r = JSON.parse(JSON.stringify(r || {})), this.usingBundle = "max-bundle" === r.bundlePolicy, "negotiate" === r.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");

            switch (r.rtcpMuxPolicy || (r.rtcpMuxPolicy = "require"), r.iceTransportPolicy) {
              case "all":
              case "relay":
                break;

              default:
                r.iceTransportPolicy = "all";
            }

            switch (r.bundlePolicy) {
              case "balanced":
              case "max-compat":
              case "max-bundle":
                break;

              default:
                r.bundlePolicy = "balanced";
            }

            if (r.iceServers = function (e, t) {
              var r = !1;
              return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
                if (e && (e.urls || e.url)) {
                  var i = e.urls || e.url;
                  e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                  var s = "string" == typeof i;
                  return s && (i = [i]), i = i.filter(function (e) {
                    return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || r ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (r = !0, !0);
                  }), delete e.url, e.urls = s ? i[0] : i, !!i.length;
                }
              });
            }(r.iceServers || [], t), this._iceGatherers = [], r.iceCandidatePoolSize) for (var o = r.iceCandidatePoolSize; o > 0; o--) {
              this._iceGatherers.push(new e.RTCIceGatherer({
                iceServers: r.iceServers,
                gatherPolicy: r.iceTransportPolicy
              }));
            } else r.iceCandidatePoolSize = 0;
            this._config = r, this.transceivers = [], this._sdpSessionId = i.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1;
          };

          Object.defineProperty(d.prototype, "localDescription", {
            configurable: !0,
            get: function get() {
              return this._localDescription;
            }
          }), Object.defineProperty(d.prototype, "remoteDescription", {
            configurable: !0,
            get: function get() {
              return this._remoteDescription;
            }
          }), d.prototype.onicecandidate = null, d.prototype.onaddstream = null, d.prototype.ontrack = null, d.prototype.onremovestream = null, d.prototype.onsignalingstatechange = null, d.prototype.oniceconnectionstatechange = null, d.prototype.onconnectionstatechange = null, d.prototype.onicegatheringstatechange = null, d.prototype.onnegotiationneeded = null, d.prototype.ondatachannel = null, d.prototype._dispatchEvent = function (e, t) {
            this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t));
          }, d.prototype._emitGatheringStateChange = function () {
            var e = new Event("icegatheringstatechange");

            this._dispatchEvent("icegatheringstatechange", e);
          }, d.prototype.getConfiguration = function () {
            return this._config;
          }, d.prototype.getLocalStreams = function () {
            return this.localStreams;
          }, d.prototype.getRemoteStreams = function () {
            return this.remoteStreams;
          }, d.prototype._createTransceiver = function (e, t) {
            var r = this.transceivers.length > 0,
                i = {
              track: null,
              iceGatherer: null,
              iceTransport: null,
              dtlsTransport: null,
              localCapabilities: null,
              remoteCapabilities: null,
              rtpSender: null,
              rtpReceiver: null,
              kind: e,
              mid: null,
              sendEncodingParameters: null,
              recvEncodingParameters: null,
              stream: null,
              associatedRemoteMediaStreams: [],
              wantReceive: !0
            };
            if (this.usingBundle && r) i.iceTransport = this.transceivers[0].iceTransport, i.dtlsTransport = this.transceivers[0].dtlsTransport;else {
              var s = this._createIceAndDtlsTransports();

              i.iceTransport = s.iceTransport, i.dtlsTransport = s.dtlsTransport;
            }
            return t || this.transceivers.push(i), i;
          }, d.prototype.addTrack = function (t, r) {
            if (this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
            var i;
            if (this.transceivers.find(function (e) {
              return e.track === t;
            })) throw c("InvalidAccessError", "Track already exists.");

            for (var s = 0; s < this.transceivers.length; s++) {
              this.transceivers[s].track || this.transceivers[s].kind !== t.kind || (i = this.transceivers[s]);
            }

            return i || (i = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(r) && this.localStreams.push(r), i.track = t, i.stream = r, i.rtpSender = new e.RTCRtpSender(t, i.dtlsTransport), i.rtpSender;
          }, d.prototype.addStream = function (e) {
            var r = this;
            if (t >= 15025) e.getTracks().forEach(function (t) {
              r.addTrack(t, e);
            });else {
              var i = e.clone();
              e.getTracks().forEach(function (e, t) {
                var r = i.getTracks()[t];
                e.addEventListener("enabled", function (e) {
                  r.enabled = e.enabled;
                });
              }), i.getTracks().forEach(function (e) {
                r.addTrack(e, i);
              });
            }
          }, d.prototype.removeTrack = function (t) {
            if (this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
            if (!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var r = this.transceivers.find(function (e) {
              return e.rtpSender === t;
            });
            if (!r) throw c("InvalidAccessError", "Sender was not created by this connection.");
            var i = r.stream;
            r.rtpSender.stop(), r.rtpSender = null, r.track = null, r.stream = null, -1 === this.transceivers.map(function (e) {
              return e.stream;
            }).indexOf(i) && this.localStreams.indexOf(i) > -1 && this.localStreams.splice(this.localStreams.indexOf(i), 1), this._maybeFireNegotiationNeeded();
          }, d.prototype.removeStream = function (e) {
            var t = this;
            e.getTracks().forEach(function (e) {
              var r = t.getSenders().find(function (t) {
                return t.track === e;
              });
              r && t.removeTrack(r);
            });
          }, d.prototype.getSenders = function () {
            return this.transceivers.filter(function (e) {
              return !!e.rtpSender;
            }).map(function (e) {
              return e.rtpSender;
            });
          }, d.prototype.getReceivers = function () {
            return this.transceivers.filter(function (e) {
              return !!e.rtpReceiver;
            }).map(function (e) {
              return e.rtpReceiver;
            });
          }, d.prototype._createIceGatherer = function (t, r) {
            var i = this;
            if (r && t > 0) return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length) return this._iceGatherers.shift();
            var s = new e.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
            });
            return Object.defineProperty(s, "state", {
              value: "new",
              writable: !0
            }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function (e) {
              var r = !e.candidate || 0 === Object.keys(e.candidate).length;
              s.state = r ? "completed" : "gathering", null !== i.transceivers[t].bufferedCandidateEvents && i.transceivers[t].bufferedCandidateEvents.push(e);
            }, s.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), s;
          }, d.prototype._gather = function (t, r) {
            var s = this,
                n = this.transceivers[r].iceGatherer;

            if (!n.onlocalcandidate) {
              var o = this.transceivers[r].bufferedCandidateEvents;
              this.transceivers[r].bufferedCandidateEvents = null, n.removeEventListener("localcandidate", this.transceivers[r].bufferCandidates), n.onlocalcandidate = function (e) {
                if (!(s.usingBundle && r > 0)) {
                  var o = new Event("icecandidate");
                  o.candidate = {
                    sdpMid: t,
                    sdpMLineIndex: r
                  };
                  var a = e.candidate,
                      c = !a || 0 === Object.keys(a).length;
                  if (c) "new" !== n.state && "gathering" !== n.state || (n.state = "completed");else {
                    "new" === n.state && (n.state = "gathering"), a.component = 1, a.ufrag = n.getLocalParameters().usernameFragment;
                    var l = i.writeCandidate(a);
                    o.candidate = Object.assign(o.candidate, i.parseCandidate(l)), o.candidate.candidate = l, o.candidate.toJSON = function () {
                      return {
                        candidate: o.candidate.candidate,
                        sdpMid: o.candidate.sdpMid,
                        sdpMLineIndex: o.candidate.sdpMLineIndex,
                        usernameFragment: o.candidate.usernameFragment
                      };
                    };
                  }
                  var d = i.getMediaSections(s._localDescription.sdp);
                  d[o.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", s._localDescription.sdp = i.getDescription(s._localDescription.sdp) + d.join("");
                  var h = s.transceivers.every(function (e) {
                    return e.iceGatherer && "completed" === e.iceGatherer.state;
                  });
                  "gathering" !== s.iceGatheringState && (s.iceGatheringState = "gathering", s._emitGatheringStateChange()), c || s._dispatchEvent("icecandidate", o), h && (s._dispatchEvent("icecandidate", new Event("icecandidate")), s.iceGatheringState = "complete", s._emitGatheringStateChange());
                }
              }, e.setTimeout(function () {
                o.forEach(function (e) {
                  n.onlocalcandidate(e);
                });
              }, 0);
            }
          }, d.prototype._createIceAndDtlsTransports = function () {
            var t = this,
                r = new e.RTCIceTransport(null);

            r.onicestatechange = function () {
              t._updateIceConnectionState(), t._updateConnectionState();
            };

            var i = new e.RTCDtlsTransport(r);
            return i.ondtlsstatechange = function () {
              t._updateConnectionState();
            }, i.onerror = function () {
              Object.defineProperty(i, "state", {
                value: "failed",
                writable: !0
              }), t._updateConnectionState();
            }, {
              iceTransport: r,
              dtlsTransport: i
            };
          }, d.prototype._disposeIceAndDtlsTransports = function (e) {
            var t = this.transceivers[e].iceGatherer;
            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
            var r = this.transceivers[e].iceTransport;
            r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
            var i = this.transceivers[e].dtlsTransport;
            i && (delete i.ondtlsstatechange, delete i.onerror, delete this.transceivers[e].dtlsTransport);
          }, d.prototype._transceive = function (e, r, s) {
            var o = n(e.localCapabilities, e.remoteCapabilities);
            r && e.rtpSender && (o.encodings = e.sendEncodingParameters, o.rtcp = {
              cname: i.localCName,
              compound: e.rtcpParameters.compound
            }, e.recvEncodingParameters.length && (o.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(o)), s && e.rtpReceiver && o.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function (e) {
              delete e.rtx;
            }), e.recvEncodingParameters.length ? o.encodings = e.recvEncodingParameters : o.encodings = [{}], o.rtcp = {
              compound: e.rtcpParameters.compound
            }, e.rtcpParameters.cname && (o.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (o.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(o));
          }, d.prototype.setLocalDescription = function (e) {
            var t,
                r,
                s = this;
            if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
            if (!o("setLocalDescription", e.type, s.signalingState) || s._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + s.signalingState));
            if ("offer" === e.type) t = i.splitSections(e.sdp), r = t.shift(), t.forEach(function (e, t) {
              var r = i.parseRtpParameters(e);
              s.transceivers[t].localCapabilities = r;
            }), s.transceivers.forEach(function (e, t) {
              s._gather(e.mid, t);
            });else if ("answer" === e.type) {
              t = i.splitSections(s._remoteDescription.sdp), r = t.shift();
              var a = i.matchPrefix(r, "a=ice-lite").length > 0;
              t.forEach(function (e, t) {
                var o = s.transceivers[t],
                    c = o.iceGatherer,
                    l = o.iceTransport,
                    d = o.dtlsTransport,
                    h = o.localCapabilities,
                    u = o.remoteCapabilities;

                if (!(i.isRejected(e) && 0 === i.matchPrefix(e, "a=bundle-only").length || o.rejected)) {
                  var p = i.getIceParameters(e, r),
                      g = i.getDtlsParameters(e, r);
                  a && (g.role = "server"), s.usingBundle && 0 !== t || (s._gather(o.mid, t), "new" === l.state && l.start(c, p, a ? "controlling" : "controlled"), "new" === d.state && d.start(g));
                  var f = n(h, u);

                  s._transceive(o, f.codecs.length > 0, !1);
                }
              });
            }
            return s._localDescription = {
              type: e.type,
              sdp: e.sdp
            }, "offer" === e.type ? s._updateSignalingState("have-local-offer") : s._updateSignalingState("stable"), Promise.resolve();
          }, d.prototype.setRemoteDescription = function (s) {
            var d = this;
            if (-1 === ["offer", "answer"].indexOf(s.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + s.type + '"'));
            if (!o("setRemoteDescription", s.type, d.signalingState) || d._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + s.type + " in state " + d.signalingState));
            var h = {};
            d.remoteStreams.forEach(function (e) {
              h[e.id] = e;
            });
            var u = [],
                p = i.splitSections(s.sdp),
                g = p.shift(),
                f = i.matchPrefix(g, "a=ice-lite").length > 0,
                m = i.matchPrefix(g, "a=group:BUNDLE ").length > 0;
            d.usingBundle = m;
            var v = i.matchPrefix(g, "a=ice-options:")[0];
            return d.canTrickleIceCandidates = !!v && v.substr(14).split(" ").indexOf("trickle") >= 0, p.forEach(function (o, c) {
              var l = i.splitLines(o),
                  p = i.getKind(o),
                  v = i.isRejected(o) && 0 === i.matchPrefix(o, "a=bundle-only").length,
                  S = l[0].substr(2).split(" ")[2],
                  y = i.getDirection(o, g),
                  b = i.parseMsid(o),
                  C = i.getMid(o) || i.generateIdentifier();
              if (v || "application" === p && ("DTLS/SCTP" === S || "UDP/DTLS/SCTP" === S)) d.transceivers[c] = {
                mid: C,
                kind: p,
                protocol: S,
                rejected: !0
              };else {
                var T, _, E, R, L, M, P, I, k;

                !v && d.transceivers[c] && d.transceivers[c].rejected && (d.transceivers[c] = d._createTransceiver(p, !0));
                var w,
                    U,
                    O = i.parseRtpParameters(o);
                v || (w = i.getIceParameters(o, g), (U = i.getDtlsParameters(o, g)).role = "client"), P = i.parseRtpEncodingParameters(o);
                var D = i.parseRtcpParameters(o),
                    N = i.matchPrefix(o, "a=end-of-candidates", g).length > 0,
                    z = i.matchPrefix(o, "a=candidate:").map(function (e) {
                  return i.parseCandidate(e);
                }).filter(function (e) {
                  return 1 === e.component;
                });
                if (("offer" === s.type || "answer" === s.type) && !v && m && c > 0 && d.transceivers[c] && (d._disposeIceAndDtlsTransports(c), d.transceivers[c].iceGatherer = d.transceivers[0].iceGatherer, d.transceivers[c].iceTransport = d.transceivers[0].iceTransport, d.transceivers[c].dtlsTransport = d.transceivers[0].dtlsTransport, d.transceivers[c].rtpSender && d.transceivers[c].rtpSender.setTransport(d.transceivers[0].dtlsTransport), d.transceivers[c].rtpReceiver && d.transceivers[c].rtpReceiver.setTransport(d.transceivers[0].dtlsTransport)), "offer" !== s.type || v) "answer" !== s.type || v || (_ = (T = d.transceivers[c]).iceGatherer, E = T.iceTransport, R = T.dtlsTransport, L = T.rtpReceiver, M = T.sendEncodingParameters, I = T.localCapabilities, d.transceivers[c].recvEncodingParameters = P, d.transceivers[c].remoteCapabilities = O, d.transceivers[c].rtcpParameters = D, z.length && "new" === E.state && (!f && !N || m && 0 !== c ? z.forEach(function (e) {
                  a(T.iceTransport, e);
                }) : E.setRemoteCandidates(z)), m && 0 !== c || ("new" === E.state && E.start(_, w, "controlling"), "new" === R.state && R.start(U)), !n(T.localCapabilities, T.remoteCapabilities).codecs.filter(function (e) {
                  return "rtx" === e.name.toLowerCase();
                }).length && T.sendEncodingParameters[0].rtx && delete T.sendEncodingParameters[0].rtx, d._transceive(T, "sendrecv" === y || "recvonly" === y, "sendrecv" === y || "sendonly" === y), !L || "sendrecv" !== y && "sendonly" !== y ? delete T.rtpReceiver : (k = L.track, b ? (h[b.stream] || (h[b.stream] = new e.MediaStream()), r(k, h[b.stream]), u.push([k, L, h[b.stream]])) : (h["default"] || (h["default"] = new e.MediaStream()), r(k, h["default"]), u.push([k, L, h["default"]]))));else {
                  (T = d.transceivers[c] || d._createTransceiver(p)).mid = C, T.iceGatherer || (T.iceGatherer = d._createIceGatherer(c, m)), z.length && "new" === T.iceTransport.state && (!N || m && 0 !== c ? z.forEach(function (e) {
                    a(T.iceTransport, e);
                  }) : T.iceTransport.setRemoteCandidates(z)), I = e.RTCRtpReceiver.getCapabilities(p), t < 15019 && (I.codecs = I.codecs.filter(function (e) {
                    return "rtx" !== e.name;
                  })), M = T.sendEncodingParameters || [{
                    ssrc: 1001 * (2 * c + 2)
                  }];
                  var A,
                      x = !1;
                  "sendrecv" === y || "sendonly" === y ? (x = !T.rtpReceiver, L = T.rtpReceiver || new e.RTCRtpReceiver(T.dtlsTransport, p), x && (k = L.track, b && "-" === b.stream || (b ? (h[b.stream] || (h[b.stream] = new e.MediaStream(), Object.defineProperty(h[b.stream], "id", {
                    get: function get() {
                      return b.stream;
                    }
                  })), Object.defineProperty(k, "id", {
                    get: function get() {
                      return b.track;
                    }
                  }), A = h[b.stream]) : (h["default"] || (h["default"] = new e.MediaStream()), A = h["default"])), A && (r(k, A), T.associatedRemoteMediaStreams.push(A)), u.push([k, L, A]))) : T.rtpReceiver && T.rtpReceiver.track && (T.associatedRemoteMediaStreams.forEach(function (t) {
                    var r = t.getTracks().find(function (e) {
                      return e.id === T.rtpReceiver.track.id;
                    });
                    r && function (t, r) {
                      r.removeTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
                        track: t
                      }));
                    }(r, t);
                  }), T.associatedRemoteMediaStreams = []), T.localCapabilities = I, T.remoteCapabilities = O, T.rtpReceiver = L, T.rtcpParameters = D, T.sendEncodingParameters = M, T.recvEncodingParameters = P, d._transceive(d.transceivers[c], !1, x);
                }
              }
            }), void 0 === d._dtlsRole && (d._dtlsRole = "offer" === s.type ? "active" : "passive"), d._remoteDescription = {
              type: s.type,
              sdp: s.sdp
            }, "offer" === s.type ? d._updateSignalingState("have-remote-offer") : d._updateSignalingState("stable"), Object.keys(h).forEach(function (t) {
              var r = h[t];

              if (r.getTracks().length) {
                if (-1 === d.remoteStreams.indexOf(r)) {
                  d.remoteStreams.push(r);
                  var i = new Event("addstream");
                  i.stream = r, e.setTimeout(function () {
                    d._dispatchEvent("addstream", i);
                  });
                }

                u.forEach(function (e) {
                  var t = e[0],
                      i = e[1];
                  r.id === e[2].id && l(d, t, i, [r]);
                });
              }
            }), u.forEach(function (e) {
              e[2] || l(d, e[0], e[1], []);
            }), e.setTimeout(function () {
              d && d.transceivers && d.transceivers.forEach(function (e) {
                e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}));
              });
            }, 4e3), Promise.resolve();
          }, d.prototype.close = function () {
            this.transceivers.forEach(function (e) {
              e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop();
            }), this._isClosed = !0, this._updateSignalingState("closed");
          }, d.prototype._updateSignalingState = function (e) {
            this.signalingState = e;
            var t = new Event("signalingstatechange");

            this._dispatchEvent("signalingstatechange", t);
          }, d.prototype._maybeFireNegotiationNeeded = function () {
            var t = this;
            "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function () {
              if (t.needNegotiation) {
                t.needNegotiation = !1;
                var e = new Event("negotiationneeded");

                t._dispatchEvent("negotiationneeded", e);
              }
            }, 0));
          }, d.prototype._updateIceConnectionState = function () {
            var e,
                t = {
              "new": 0,
              closed: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };

            if (this.transceivers.forEach(function (e) {
              e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
            }), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t["new"] > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
              this.iceConnectionState = e;
              var r = new Event("iceconnectionstatechange");

              this._dispatchEvent("iceconnectionstatechange", r);
            }
          }, d.prototype._updateConnectionState = function () {
            var e,
                t = {
              "new": 0,
              closed: 0,
              connecting: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };

            if (this.transceivers.forEach(function (e) {
              e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
            }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t["new"] > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
              this.connectionState = e;
              var r = new Event("connectionstatechange");

              this._dispatchEvent("connectionstatechange", r);
            }
          }, d.prototype.createOffer = function () {
            var r = this;
            if (r._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
            var n = r.transceivers.filter(function (e) {
              return "audio" === e.kind;
            }).length,
                o = r.transceivers.filter(function (e) {
              return "video" === e.kind;
            }).length,
                a = arguments[0];

            if (a) {
              if (a.mandatory || a.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
              void 0 !== a.offerToReceiveAudio && (n = !0 === a.offerToReceiveAudio ? 1 : !1 === a.offerToReceiveAudio ? 0 : a.offerToReceiveAudio), void 0 !== a.offerToReceiveVideo && (o = !0 === a.offerToReceiveVideo ? 1 : !1 === a.offerToReceiveVideo ? 0 : a.offerToReceiveVideo);
            }

            for (r.transceivers.forEach(function (e) {
              "audio" === e.kind ? --n < 0 && (e.wantReceive = !1) : "video" === e.kind && --o < 0 && (e.wantReceive = !1);
            }); n > 0 || o > 0;) {
              n > 0 && (r._createTransceiver("audio"), n--), o > 0 && (r._createTransceiver("video"), o--);
            }

            var l = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
            r.transceivers.forEach(function (s, n) {
              var o = s.track,
                  a = s.kind,
                  c = s.mid || i.generateIdentifier();
              s.mid = c, s.iceGatherer || (s.iceGatherer = r._createIceGatherer(n, r.usingBundle));
              var l = e.RTCRtpSender.getCapabilities(a);
              t < 15019 && (l.codecs = l.codecs.filter(function (e) {
                return "rtx" !== e.name;
              })), l.codecs.forEach(function (e) {
                "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), s.remoteCapabilities && s.remoteCapabilities.codecs && s.remoteCapabilities.codecs.forEach(function (t) {
                  e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType);
                });
              }), l.headerExtensions.forEach(function (e) {
                (s.remoteCapabilities && s.remoteCapabilities.headerExtensions || []).forEach(function (t) {
                  e.uri === t.uri && (e.id = t.id);
                });
              });
              var d = s.sendEncodingParameters || [{
                ssrc: 1001 * (2 * n + 1)
              }];
              o && t >= 15019 && "video" === a && !d[0].rtx && (d[0].rtx = {
                ssrc: d[0].ssrc + 1
              }), s.wantReceive && (s.rtpReceiver = new e.RTCRtpReceiver(s.dtlsTransport, a)), s.localCapabilities = l, s.sendEncodingParameters = d;
            }), "max-compat" !== r._config.bundlePolicy && (l += "a=group:BUNDLE " + r.transceivers.map(function (e) {
              return e.mid;
            }).join(" ") + "\r\n"), l += "a=ice-options:trickle\r\n", r.transceivers.forEach(function (e, t) {
              l += s(e, e.localCapabilities, "offer", e.stream, r._dtlsRole), l += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === r.iceGatheringState || 0 !== t && r.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function (e) {
                e.component = 1, l += "a=" + i.writeCandidate(e) + "\r\n";
              }), "completed" === e.iceGatherer.state && (l += "a=end-of-candidates\r\n"));
            });
            var d = new e.RTCSessionDescription({
              type: "offer",
              sdp: l
            });
            return Promise.resolve(d);
          }, d.prototype.createAnswer = function () {
            var r = this;
            if (r._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
            if ("have-remote-offer" !== r.signalingState && "have-local-pranswer" !== r.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + r.signalingState));
            var o = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
            r.usingBundle && (o += "a=group:BUNDLE " + r.transceivers.map(function (e) {
              return e.mid;
            }).join(" ") + "\r\n"), o += "a=ice-options:trickle\r\n";
            var a = i.getMediaSections(r._remoteDescription.sdp).length;
            r.transceivers.forEach(function (e, i) {
              if (!(i + 1 > a)) {
                if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? o += "m=application 0 DTLS/SCTP 5000\r\n" : o += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? o += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (o += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (o += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                var c;
                e.stream && ("audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
                  ssrc: e.sendEncodingParameters[0].ssrc + 1
                }));
                var l = n(e.localCapabilities, e.remoteCapabilities);
                !l.codecs.filter(function (e) {
                  return "rtx" === e.name.toLowerCase();
                }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, o += s(e, l, "answer", e.stream, r._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (o += "a=rtcp-rsize\r\n");
              }
            });
            var l = new e.RTCSessionDescription({
              type: "answer",
              sdp: o
            });
            return Promise.resolve(l);
          }, d.prototype.addIceCandidate = function (e) {
            var t,
                r = this;
            return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function (s, n) {
              if (!r._remoteDescription) return n(c("InvalidStateError", "Can not add ICE candidate without a remote description"));

              if (e && "" !== e.candidate) {
                var o = e.sdpMLineIndex;
                if (e.sdpMid) for (var l = 0; l < r.transceivers.length; l++) {
                  if (r.transceivers[l].mid === e.sdpMid) {
                    o = l;
                    break;
                  }
                }
                var d = r.transceivers[o];
                if (!d) return n(c("OperationError", "Can not add ICE candidate"));
                if (d.rejected) return s();
                var h = Object.keys(e.candidate).length > 0 ? i.parseCandidate(e.candidate) : {};
                if ("tcp" === h.protocol && (0 === h.port || 9 === h.port)) return s();
                if (h.component && 1 !== h.component) return s();
                if ((0 === o || o > 0 && d.iceTransport !== r.transceivers[0].iceTransport) && !a(d.iceTransport, h)) return n(c("OperationError", "Can not add ICE candidate"));
                var u = e.candidate.trim();
                0 === u.indexOf("a=") && (u = u.substr(2)), (t = i.getMediaSections(r._remoteDescription.sdp))[o] += "a=" + (h.type ? u : "end-of-candidates") + "\r\n", r._remoteDescription.sdp = i.getDescription(r._remoteDescription.sdp) + t.join("");
              } else for (var p = 0; p < r.transceivers.length && (r.transceivers[p].rejected || (r.transceivers[p].iceTransport.addRemoteCandidate({}), (t = i.getMediaSections(r._remoteDescription.sdp))[p] += "a=end-of-candidates\r\n", r._remoteDescription.sdp = i.getDescription(r._remoteDescription.sdp) + t.join(""), !r.usingBundle)); p++) {
                ;
              }

              s();
            });
          }, d.prototype.getStats = function (t) {
            if (t && t instanceof e.MediaStreamTrack) {
              var r = null;
              if (this.transceivers.forEach(function (e) {
                e.rtpSender && e.rtpSender.track === t ? r = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (r = e.rtpReceiver);
              }), !r) throw c("InvalidAccessError", "Invalid selector.");
              return r.getStats();
            }

            var i = [];
            return this.transceivers.forEach(function (e) {
              ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (t) {
                e[t] && i.push(e[t].getStats());
              });
            }), Promise.all(i).then(function (e) {
              var t = new Map();
              return e.forEach(function (e) {
                e.forEach(function (e) {
                  t.set(e.id, e);
                });
              }), t;
            });
          }, ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function (t) {
            var r = e[t];

            if (r && r.prototype && r.prototype.getStats) {
              var i = r.prototype.getStats;

              r.prototype.getStats = function () {
                return i.apply(this).then(function (e) {
                  var t = new Map();
                  return Object.keys(e).forEach(function (r) {
                    var i;
                    e[r].type = {
                      inboundrtp: "inbound-rtp",
                      outboundrtp: "outbound-rtp",
                      candidatepair: "candidate-pair",
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate"
                    }[(i = e[r]).type] || i.type, t.set(r, e[r]);
                  }), t;
                });
              };
            }
          });
          var h = ["createOffer", "createAnswer"];
          return h.forEach(function (e) {
            var t = d.prototype[e];

            d.prototype[e] = function () {
              var e = arguments;
              return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function (t) {
                "function" == typeof e[0] && e[0].apply(null, [t]);
              }, function (t) {
                "function" == typeof e[1] && e[1].apply(null, [t]);
              }) : t.apply(this, arguments);
            };
          }), (h = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function (e) {
            var t = d.prototype[e];

            d.prototype[e] = function () {
              var e = arguments;
              return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function () {
                "function" == typeof e[1] && e[1].apply(null);
              }, function (t) {
                "function" == typeof e[2] && e[2].apply(null, [t]);
              }) : t.apply(this, arguments);
            };
          }), ["getStats"].forEach(function (e) {
            var t = d.prototype[e];

            d.prototype[e] = function () {
              var e = arguments;
              return "function" == typeof e[1] ? t.apply(this, arguments).then(function () {
                "function" == typeof e[1] && e[1].apply(null);
              }) : t.apply(this, arguments);
            };
          }), d;
        };
      }, {
        sdp: 17
      }],
      17: [function (e, t, r) {
        "use strict";

        var i = {
          generateIdentifier: function generateIdentifier() {
            return Math.random().toString(36).substr(2, 10);
          }
        };
        i.localCName = i.generateIdentifier(), i.splitLines = function (e) {
          return e.trim().split("\n").map(function (e) {
            return e.trim();
          });
        }, i.splitSections = function (e) {
          return e.split("\nm=").map(function (e, t) {
            return (t > 0 ? "m=" + e : e).trim() + "\r\n";
          });
        }, i.getDescription = function (e) {
          var t = i.splitSections(e);
          return t && t[0];
        }, i.getMediaSections = function (e) {
          var t = i.splitSections(e);
          return t.shift(), t;
        }, i.matchPrefix = function (e, t) {
          return i.splitLines(e).filter(function (e) {
            return 0 === e.indexOf(t);
          });
        }, i.parseCandidate = function (e) {
          for (var t, r = {
            foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
            component: parseInt(t[1], 10),
            protocol: t[2].toLowerCase(),
            priority: parseInt(t[3], 10),
            ip: t[4],
            address: t[4],
            port: parseInt(t[5], 10),
            type: t[7]
          }, i = 8; i < t.length; i += 2) {
            switch (t[i]) {
              case "raddr":
                r.relatedAddress = t[i + 1];
                break;

              case "rport":
                r.relatedPort = parseInt(t[i + 1], 10);
                break;

              case "tcptype":
                r.tcpType = t[i + 1];
                break;

              case "ufrag":
                r.ufrag = t[i + 1], r.usernameFragment = t[i + 1];
                break;

              default:
                r[t[i]] = t[i + 1];
            }
          }

          return r;
        }, i.writeCandidate = function (e) {
          var t = [];
          t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port);
          var r = e.type;
          return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ");
        }, i.parseIceOptions = function (e) {
          return e.substr(14).split(" ");
        }, i.parseRtpMap = function (e) {
          var t = e.substr(9).split(" "),
              r = {
            payloadType: parseInt(t.shift(), 10)
          };
          return t = t[0].split("/"), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.channels = 3 === t.length ? parseInt(t[2], 10) : 1, r.numChannels = r.channels, r;
        }, i.writeRtpMap = function (e) {
          var t = e.payloadType;
          void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
          var r = e.channels || e.numChannels || 1;
          return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== r ? "/" + r : "") + "\r\n";
        }, i.parseExtmap = function (e) {
          var t = e.substr(9).split(" ");
          return {
            id: parseInt(t[0], 10),
            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
            uri: t[1]
          };
        }, i.writeExtmap = function (e) {
          return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n";
        }, i.parseFmtp = function (e) {
          for (var t, r = {}, i = e.substr(e.indexOf(" ") + 1).split(";"), s = 0; s < i.length; s++) {
            r[(t = i[s].trim().split("="))[0].trim()] = t[1];
          }

          return r;
        }, i.writeFmtp = function (e) {
          var t = "",
              r = e.payloadType;

          if (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
            var i = [];
            Object.keys(e.parameters).forEach(function (t) {
              e.parameters[t] ? i.push(t + "=" + e.parameters[t]) : i.push(t);
            }), t += "a=fmtp:" + r + " " + i.join(";") + "\r\n";
          }

          return t;
        }, i.parseRtcpFb = function (e) {
          var t = e.substr(e.indexOf(" ") + 1).split(" ");
          return {
            type: t.shift(),
            parameter: t.join(" ")
          };
        }, i.writeRtcpFb = function (e) {
          var t = "",
              r = e.payloadType;
          return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function (e) {
            t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n";
          }), t;
        }, i.parseSsrcMedia = function (e) {
          var t = e.indexOf(" "),
              r = {
            ssrc: parseInt(e.substr(7, t - 7), 10)
          },
              i = e.indexOf(":", t);
          return i > -1 ? (r.attribute = e.substr(t + 1, i - t - 1), r.value = e.substr(i + 1)) : r.attribute = e.substr(t + 1), r;
        }, i.parseSsrcGroup = function (e) {
          var t = e.substr(13).split(" ");
          return {
            semantics: t.shift(),
            ssrcs: t.map(function (e) {
              return parseInt(e, 10);
            })
          };
        }, i.getMid = function (e) {
          var t = i.matchPrefix(e, "a=mid:")[0];
          if (t) return t.substr(6);
        }, i.parseFingerprint = function (e) {
          var t = e.substr(14).split(" ");
          return {
            algorithm: t[0].toLowerCase(),
            value: t[1]
          };
        }, i.getDtlsParameters = function (e, t) {
          return {
            role: "auto",
            fingerprints: i.matchPrefix(e + t, "a=fingerprint:").map(i.parseFingerprint)
          };
        }, i.writeDtlsParameters = function (e, t) {
          var r = "a=setup:" + t + "\r\n";
          return e.fingerprints.forEach(function (e) {
            r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n";
          }), r;
        }, i.getIceParameters = function (e, t) {
          var r = i.splitLines(e);
          return {
            usernameFragment: (r = r.concat(i.splitLines(t))).filter(function (e) {
              return 0 === e.indexOf("a=ice-ufrag:");
            })[0].substr(12),
            password: r.filter(function (e) {
              return 0 === e.indexOf("a=ice-pwd:");
            })[0].substr(10)
          };
        }, i.writeIceParameters = function (e) {
          return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n";
        }, i.parseRtpParameters = function (e) {
          for (var t = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          }, r = i.splitLines(e)[0].split(" "), s = 3; s < r.length; s++) {
            var n = r[s],
                o = i.matchPrefix(e, "a=rtpmap:" + n + " ")[0];

            if (o) {
              var a = i.parseRtpMap(o),
                  c = i.matchPrefix(e, "a=fmtp:" + n + " ");

              switch (a.parameters = c.length ? i.parseFmtp(c[0]) : {}, a.rtcpFeedback = i.matchPrefix(e, "a=rtcp-fb:" + n + " ").map(i.parseRtcpFb), t.codecs.push(a), a.name.toUpperCase()) {
                case "RED":
                case "ULPFEC":
                  t.fecMechanisms.push(a.name.toUpperCase());
              }
            }
          }

          return i.matchPrefix(e, "a=extmap:").forEach(function (e) {
            t.headerExtensions.push(i.parseExtmap(e));
          }), t;
        }, i.writeRtpDescription = function (e, t) {
          var r = "";
          r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(function (e) {
            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType;
          }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function (e) {
            r += i.writeRtpMap(e), r += i.writeFmtp(e), r += i.writeRtcpFb(e);
          });
          var s = 0;
          return t.codecs.forEach(function (e) {
            e.maxptime > s && (s = e.maxptime);
          }), s > 0 && (r += "a=maxptime:" + s + "\r\n"), r += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function (e) {
            r += i.writeExtmap(e);
          }), r;
        }, i.parseRtpEncodingParameters = function (e) {
          var t,
              r = [],
              s = i.parseRtpParameters(e),
              n = -1 !== s.fecMechanisms.indexOf("RED"),
              o = -1 !== s.fecMechanisms.indexOf("ULPFEC"),
              a = i.matchPrefix(e, "a=ssrc:").map(function (e) {
            return i.parseSsrcMedia(e);
          }).filter(function (e) {
            return "cname" === e.attribute;
          }),
              c = a.length > 0 && a[0].ssrc,
              l = i.matchPrefix(e, "a=ssrc-group:FID").map(function (e) {
            return e.substr(17).split(" ").map(function (e) {
              return parseInt(e, 10);
            });
          });
          l.length > 0 && l[0].length > 1 && l[0][0] === c && (t = l[0][1]), s.codecs.forEach(function (e) {
            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
              var i = {
                ssrc: c,
                codecPayloadType: parseInt(e.parameters.apt, 10)
              };
              c && t && (i.rtx = {
                ssrc: t
              }), r.push(i), n && ((i = JSON.parse(JSON.stringify(i))).fec = {
                ssrc: c,
                mechanism: o ? "red+ulpfec" : "red"
              }, r.push(i));
            }
          }), 0 === r.length && c && r.push({
            ssrc: c
          });
          var d = i.matchPrefix(e, "b=");
          return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function (e) {
            e.maxBitrate = d;
          })), r;
        }, i.parseRtcpParameters = function (e) {
          var t = {},
              r = i.matchPrefix(e, "a=ssrc:").map(function (e) {
            return i.parseSsrcMedia(e);
          }).filter(function (e) {
            return "cname" === e.attribute;
          })[0];
          r && (t.cname = r.value, t.ssrc = r.ssrc);
          var s = i.matchPrefix(e, "a=rtcp-rsize");
          t.reducedSize = s.length > 0, t.compound = 0 === s.length;
          var n = i.matchPrefix(e, "a=rtcp-mux");
          return t.mux = n.length > 0, t;
        }, i.parseMsid = function (e) {
          var t,
              r = i.matchPrefix(e, "a=msid:");
          if (1 === r.length) return {
            stream: (t = r[0].substr(7).split(" "))[0],
            track: t[1]
          };
          var s = i.matchPrefix(e, "a=ssrc:").map(function (e) {
            return i.parseSsrcMedia(e);
          }).filter(function (e) {
            return "msid" === e.attribute;
          });
          return s.length > 0 ? {
            stream: (t = s[0].value.split(" "))[0],
            track: t[1]
          } : void 0;
        }, i.generateSessionId = function () {
          return Math.random().toString().substr(2, 21);
        }, i.writeSessionBoilerplate = function (e, t, r) {
          var s = void 0 !== t ? t : 2;
          return "v=0\r\no=" + (r || "thisisadapterortc") + " " + (e || i.generateSessionId()) + " " + s + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
        }, i.writeMediaSection = function (e, t, r, s) {
          var n = i.writeRtpDescription(e.kind, t);

          if (n += i.writeIceParameters(e.iceGatherer.getLocalParameters()), n += i.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), n += "a=mid:" + e.mid + "\r\n", e.direction ? n += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? n += "a=sendrecv\r\n" : e.rtpSender ? n += "a=sendonly\r\n" : e.rtpReceiver ? n += "a=recvonly\r\n" : n += "a=inactive\r\n", e.rtpSender) {
            var o = "msid:" + s.id + " " + e.rtpSender.track.id + "\r\n";
            n += "a=" + o, n += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[0].rtx && (n += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, n += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n");
          }

          return n += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + i.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (n += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + i.localCName + "\r\n"), n;
        }, i.getDirection = function (e, t) {
          for (var r = i.splitLines(e), s = 0; s < r.length; s++) {
            switch (r[s]) {
              case "a=sendrecv":
              case "a=sendonly":
              case "a=recvonly":
              case "a=inactive":
                return r[s].substr(2);
            }
          }

          return t ? i.getDirection(t) : "sendrecv";
        }, i.getKind = function (e) {
          return i.splitLines(e)[0].split(" ")[0].substr(2);
        }, i.isRejected = function (e) {
          return "0" === e.split(" ", 2)[1];
        }, i.parseMLine = function (e) {
          var t = i.splitLines(e)[0].substr(2).split(" ");
          return {
            kind: t[0],
            port: parseInt(t[1], 10),
            protocol: t[2],
            fmt: t.slice(3).join(" ")
          };
        }, i.parseOLine = function (e) {
          var t = i.matchPrefix(e, "o=")[0].substr(2).split(" ");
          return {
            username: t[0],
            sessionId: t[1],
            sessionVersion: parseInt(t[2], 10),
            netType: t[3],
            addressType: t[4],
            address: t[5]
          };
        }, i.isValidSDP = function (e) {
          if ("string" != typeof e || 0 === e.length) return !1;

          for (var t = i.splitLines(e), r = 0; r < t.length; r++) {
            if (t[r].length < 2 || "=" !== t[r].charAt(1)) return !1;
          }

          return !0;
        }, "object" == _typeof(t) && (t.exports = i);
      }, {}]
    }, {}, [1])(1);
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      function e(e) {
        this.delayTime = .1, this.fadeTime = .05, this.startTime = .1, this.previousPitch = -1, this.context = e, this.input = e.createGain(), this.output = e.createGain(), this.mod1 = e.createBufferSource(), this.mod2 = e.createBufferSource(), this.mod3 = e.createBufferSource(), this.mod4 = e.createBufferSource(), this.shiftDownBuffer = this.createDelayTimeBuffer(e, this.startTime, this.fadeTime, !1), this.shiftUpBuffer = this.createDelayTimeBuffer(e, this.startTime, this.fadeTime, !0), this.mod1.buffer = this.shiftDownBuffer, this.mod2.buffer = this.shiftDownBuffer, this.mod3.buffer = this.shiftUpBuffer, this.mod4.buffer = this.shiftUpBuffer, this.mod1.loop = !0, this.mod2.loop = !0, this.mod3.loop = !0, this.mod4.loop = !0, this.mod1Gain = e.createGain(), this.mod2Gain = e.createGain(), this.mod3Gain = e.createGain(), this.mod4Gain = e.createGain(), this.mod3Gain.gain.value = 0, this.mod4Gain.gain.value = 0, this.mod1.connect(this.mod1Gain), this.mod2.connect(this.mod2Gain), this.mod3.connect(this.mod3Gain), this.mod4.connect(this.mod4Gain), this.modGain1 = e.createGain(), this.modGain2 = e.createGain(), this.delay1 = e.createDelay(), this.delay2 = e.createDelay(), this.mod1Gain.connect(this.modGain1), this.mod2Gain.connect(this.modGain2), this.mod3Gain.connect(this.modGain1), this.mod4Gain.connect(this.modGain2), this.modGain1.connect(this.delay1.delayTime), this.modGain2.connect(this.delay2.delayTime), this.fade1 = e.createBufferSource(), this.fade2 = e.createBufferSource(), this.fadeBuffer = this.createFadeBuffer(e, this.startTime, this.fadeTime), this.fade1.buffer = this.fadeBuffer, this.fade2.buffer = this.fadeBuffer, this.fade1.loop = !0, this.fade2.loop = !0, this.mix1 = e.createGain(), this.mix2 = e.createGain(), this.mix1.gain.value = 0, this.mix2.gain.value = 0, this.fade1.connect(this.mix1.gain), this.fade2.connect(this.mix2.gain), this.input.connect(this.delay1), this.input.connect(this.delay2), this.delay1.connect(this.mix1), this.delay2.connect(this.mix2), this.mix1.connect(this.output), this.mix2.connect(this.output);
        var t = e.currentTime + .05,
            r = t + this.startTime - this.fadeTime;
        this.mod1.start(t), this.mod2.start(r), this.mod3.start(t), this.mod4.start(r), this.fade1.start(t), this.fade2.start(r), this.setDelay(this.delayTime);
      }

      return e.prototype.createFadeBuffer = function (e, t, r) {
        for (var i = t * e.sampleRate, s = i + (t - 2 * r) * e.sampleRate, n = e.createBuffer(1, s, e.sampleRate), o = n.getChannelData(0), a = r * e.sampleRate, c = i - a, l = 0; l < i; ++l) {
          o[l] = l < a ? Math.sqrt(l / a) : l >= c ? Math.sqrt(1 - (l - c) / a) : 1;
        }

        for (l = i; l < length; ++l) {
          o[l] = 0;
        }

        return n;
      }, e.prototype.createDelayTimeBuffer = function (e, t, r, i) {
        for (var s = t * e.sampleRate, n = s + (t - 2 * r) * e.sampleRate, o = e.createBuffer(1, n, e.sampleRate), a = o.getChannelData(0), c = 0; c < s; ++c) {
          a[c] = i ? (s - c) / n : c / s;
        }

        for (c = s; c < n; ++c) {
          a[c] = 0;
        }

        return o;
      }, e.prototype.setDelay = function (e) {
        this.modGain1.gain.setTargetAtTime(.5 * e, 0, .01), this.modGain2.gain.setTargetAtTime(.5 * e, 0, .01);
      }, e.prototype.setPitchOffset = function (e) {
        e > 0 ? (this.mod1Gain.gain.value = 0, this.mod2Gain.gain.value = 0, this.mod3Gain.gain.value = 1, this.mod4Gain.gain.value = 1) : (this.mod1Gain.gain.value = 1, this.mod2Gain.gain.value = 1, this.mod3Gain.gain.value = 0, this.mod4Gain.gain.value = 0), this.setDelay(this.delayTime * Math.abs(e)), this.previousPitch = e;
      }, e;
    }();

    t.pitchUtil = i;
  }, function (e, t, r) {
    "use strict";

    var i = this && this.__assign || Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++) {
        for (var s in t = arguments[r]) {
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
      }

      return e;
    };

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var s = r(0),
        n = r(2),
        o = function () {
      function e(e, t) {
        this.sendDataMap = {}, this.sendDataList = new s.LinkedList(), this.sendDataCheckOnceCount = 100, this.signalSeq = 0, this.pushCallback = {}, this.sessionInfos = {}, this.tryHeartbeatCount = 0, this.heartbeatInterval = 1e4, this.sendDataTimeout = 5e3, this.sendDataDropTimeout = 1e4, this.tryConnectCount = 1, this.tryConnectTimer = null, this.tryConnectInterval = 3e3, this.state = s.ENUM_CONNECT_STATE.disconnect, this.tokenType = 0, this.browser = this.getBrowserAndVersion(), this.platform = navigator.platform, this.negoInterval = 25e3, this.negoTryCount = 1, this.negoTryMaxCount = 2, this.logger = e, this.stateCenter = t;
      }

      return e.prototype.getBrowserAndVersion = function () {
        var e,
            t = navigator.userAgent,
            r = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        return /trident/i.test(r[1]) ? {
          name: "IE",
          version: (e = /\brv[ :]+([\d\.]+)/g.exec(t) || [])[1] || ""
        } : "Chrome" === r[1] && null != (e = t.match(/\bOPR|Edge\/([\d\.]+)/)) ? {
          name: "Opera",
          version: e[1]
        } : (r = r[2] ? [r[1], r[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/([\d+\.]+)/i)) && r.splice(1, 1, e[1]), {
          name: r[0],
          version: r[1]
        });
      }, e.prototype.setSessionInfo = function (e, t) {
        this.logger.debug("zs.ssi.0 call"), this.appid = e + "", this.userid = t;
      }, e.prototype.onDisconnect = function (e) {}, e.prototype.onUpdateHeartBeartInterval = function (e) {}, e.prototype.resetConnectTimer = function () {
        this.logger.info("zs.rct.0 call"), clearTimeout(this.tryConnectTimer), this.tryConnectTimer = null, this.tryConnectCount = 0;
      }, e.prototype.bindWebSocketHandle = function () {
        var e = this;
        this.tryHeartbeatCount = 0, this.websocket.onmessage = function (t) {
          var r = JSON.parse(t.data);
          e.logger.info("zs.bsh.0 signmsg= ", r.header.cmd), e.logger.info("zs.bsh.0 signmsg= " + JSON.stringify(r)), r.header.appid == e.appid && r.header.user_id === e.userid ? e.handleServerPush(r) : e.logger.warn("zs.bsh.0 check header failed");
        }, this.websocket.onclose = function (t) {
          e.logger.info("zs.bsh.0 signal close msg = " + JSON.stringify(t.code)), e.state != s.ENUM_CONNECT_STATE.disconnect && (e.resetConnectTimer(), e.startConnectTimer(), e.resetCheckMessage());
        }, this.websocket.onerror = function (t) {
          e.logger.error("zs.bsh.0 msg = " + JSON.stringify(t));
        };
      }, e.prototype.resetCheckMessage = function () {
        this.logger.debug("zs.rcm.0 call");

        for (var e = this.sendDataList.getFirst(); null != e;) {
          this.sendDataList.remove(e), e._data.error && e._data.error(s.SEND_MSG_RESET, e._data.seq), e = this.sendDataList.getFirst();
        }

        this.sendDataMap = {};
      }, e.prototype.handleServerPush = function (e) {
        switch (e.header.cmd) {
          case "LoginRsp":
            this.handleRespondData("LoginReq", e);
            break;

          case "CreateSessionRsp":
            this.handleRespondData("CreateSessionReq", e), 0 === e.body.result && this.addSession(e.header.session_id, e.body.session_token);
            break;

          case "MediaDescRsp":
            this.handleRespondData("MediaDescReq", e);
            break;

          case "CandidateInfoRsp":
            this.handleRespondData("CandidateInfoReq", e);
            break;

          case "CloseSessionRsp":
            this.handleRespondData("CloseSessionReq", e), this.removeSession(e.header.session_id);
            break;

          case "ClientHBRsp":
            this.handleRespondData("ClientHBReq", e);
            break;

          case "MediaDescPush":
          case "CandidateInfoPush":
            this.handlePushData(e);
            break;

          case "CloseSessionPush":
            this.handlePushData(e), this.removeSession(e.header.session_id);
            break;

          case "QualityReportRsp":
            this.handleRespondData("QualityReportReq", e);
            break;

          case "SessionResetPush":
            this.handlePushResetSessionData(e);
            break;

          case "StreamStatusNotifyPush":
          case "PublishEventPush":
          case "PlayEventPush":
            this.handlePushData(e);
        }
      }, e.prototype.disconnectCallback = function () {
        this.connectCallback && (this.connectCallback(-1, this.server, void 0), this.connectCallback = null);
        var e = this.server;
        this.disconnectServer(), this.onDisconnect(e);
      }, e.prototype.updateToken = function () {
        var e = this;
        this.logger.info("zs.ut.0 call");
        var t = {
          token: this.token,
          tokenType: this.tokenType,
          roomid: this.stateCenter.roomid,
          anchorname: this.stateCenter.anchor_info.anchor_id,
          sdkversion: s.PROTO_VERSION,
          osinfo: navigator.appVersion
        };

        if (0 != Object.keys(this.sessionInfos).length) {
          var r = [];

          for (var i in this.sessionInfos) {
            var o = parseInt(i);
            r.push({
              session_id: o,
              session_token: this.sessionInfos[o].token
            });
          }

          t.sessions = r;
        }

        this.sendMessageWithCallback("LoginReq", n.getSeq(), 0, t, function (t, r, i) {
          if (0 == i.result) {
            e.token = i.token, e.tokenType = i.tokenType;
            var s = {
              report: i.report,
              report_interval: i.report_interval_ms
            };
            i.negoInterval && (e.negoInterval = i.negoInterval), i.negoTryCount && (e.negoTryCount = i.negoTryCount), i.negoTryMaxCount && (e.negoTryMaxCount = i.negoTryMaxCount), null != e.connectCallback && (e.connectCallback(0, e.server, s), e.connectCallback = null);
          } else {
            var n = {
              error: i.strError
            };
            null != e.connectCallback && (e.connectCallback(i.result, e.server, n), e.connectCallback = null);
          }
        }, function (t, r) {
          null != e.connectCallback && (e.connectCallback(-1, e.server, void 0), e.connectCallback = null);
        });
      }, e.prototype.sendMessageWithCallback = function (e, t, r, i, n, o) {
        if (this.logger.debug("zs.smwc.0 call " + e), !this.websocket || 1 !== this.websocket.readyState) return this.logger.error("zs.smwc.0 connect not establish"), void (o && o(s.SEND_MSG_TIMEOUT, t));
        var a = {
          header: this.getHeader(e, t, r),
          body: i
        };
        null == n && (n = null), null == o && (o = null);
        var c = {
          seq: t,
          deleted: !1,
          cmd: e,
          time: Date.parse(new Date() + ""),
          success: n,
          error: o
        },
            l = this.sendDataList.push(c);
        this.sendDataMap[c.seq] = l;
        var d = JSON.stringify(a);
        this.websocket.send(d), this.logger.debug("zs.smwc.0 success");
      }, e.prototype.getHeader = function (e, t, r) {
        return this.globalHeader = {
          version: "1.0.1",
          cmd: e,
          appid: this.appid + "",
          seq: t,
          user_id: this.userid,
          session_id: r
        }, this.globalHeader;
      }, e.prototype.connectServer = function (e, t, r) {
        var i = this;
        if (this.token = e, this.server = t, this.state = s.ENUM_CONNECT_STATE.connecting, this.connectCallback = r, this.websocket && 1 === this.websocket.readyState) this.resetConnectTimer(), this.state = s.ENUM_CONNECT_STATE.connected;else {
          this.logger.info("zs.cs.0 need new websocket");

          try {
            this.websocket && (this.logger.warn("zs.cs.0 close error websocket"), this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null), this.websocket = new WebSocket(this.server), this.websocket.onopen = function () {
              i.resetConnectTimer(), i.logger.info("zs.cs.0 websocket open call"), i.bindWebSocketHandle(), i.updateToken(), i.state = s.ENUM_CONNECT_STATE.connected;
            }, this.websocket.onclose = function (e) {
              i.logger.info("zs.cs.0 signal websocket close code " + JSON.stringify(e.code));
            }, this.websocket.onerror = function (e) {
              i.logger.info("zs.cs.0 websocket onerror call  " + JSON.stringify(e));
            };
          } catch (e) {
            this.logger.error("zs.cs.0 websocket error " + e);
          }
        }
        this.tryConnectTimer = setTimeout(function () {
          i.startConnectTimer(r);
        }, this.tryConnectInterval);
      }, e.prototype.startConnectTimer = function (e) {
        if (this.logger.info("zs.sct.0 call"), this.tryConnectCount >= s.MAX_TRY_CONNECT_COUNT) return this.logger.info("zs.sct.0 beyond " + this.server + " max limit"), void this.disconnectCallback();
        this.websocket && 1 === this.websocket.readyState ? this.resetConnectTimer() : (this.tryConnectCount += 1, this.connectServer(this.token, this.server, e));
      }, e.prototype.disconnectServer = function () {
        this.logger.debug("zs.ds.0 call"), this.connectCallback = null, this.resetCheckMessage(), this.resetConnectTimer(), this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null), this.token = "", this.sessionInfos = {}, this.tokenType = 0, this.tryHeartbeatCount = 0, this.tryConnectCount = 0, this.state = s.ENUM_CONNECT_STATE.disconnect;
      }, e.prototype.isServerConnected = function () {
        return !(!this.websocket || 1 !== this.websocket.readyState);
      }, e.prototype.createSession = function (e, t, r, i, n, o, a) {
        void 0 === n && (n = ""), this.logger.debug("zs.cs.1 call: ", i);
        var c = "";
        s.PROTO_VERSION.split(".").forEach(function (e, t) {
          return 1 == e.length && 1 == t ? c += "0" + e : c += e;
        });
        var l = {
          type: t,
          stream_id: i,
          platform: this.platform,
          browser: this.browser.name,
          version: this.browser.version,
          app_id: this.appid,
          negotiate_mode: r,
          strAuthParam: n,
          sdk_version: 1 * c
        };
        this.sendMessageWithCallback("CreateSessionReq", e, 0, l, o, a);
      }, e.prototype.removeSession = function (e) {
        this.logger.info("zs.rs.0 call"), this.sessionInfos[e] && delete this.sessionInfos[e];
      }, e.prototype.sendCloseSession = function (e, t, r, i, s) {
        this.logger.debug("zs.scs.0 call: ", t);
        var n = {
          reason: r
        };
        this.removeSession(t), this.sendMessageWithCallback("CloseSessionReq", e, t, n, i, s);
      }, e.prototype.sendMessage = function (e, t, r, i) {
        if (this.logger.debug("zs.sm.0 call " + e), this.websocket && 1 === this.websocket.readyState) {
          var s = {
            header: this.getHeader(e, t, r),
            body: i
          },
              n = JSON.stringify(s);
          this.websocket.send(n), this.logger.debug("zs.sm.0 success");
        } else this.logger.error("zs.sm.0 connect not establish");
      }, e.prototype.handleRespondData = function (e, t) {
        this.logger.debug("zs.hrd.0 call");
        var r = this.sendDataMap[t.header.seq];

        if (null != r) {
          var i = r._data;
          i.cmd !== e ? this.logger.error("sz.hrd.0 command is not match") : i.success && i.success(t.header.seq, t.header.session_id, t.body), delete this.sendDataMap[t.header.seq], this.sendDataList.remove(r);
        } else {
          if ("CloseSessionRsp" == t.header.cmd) return;
          this.logger.error("zs.hrd.0 cannot find data " + e);
        }
      }, e.prototype.addSession = function (e, t) {
        this.logger.info("zs.as.0 call"), this.sessionInfos[e] = {
          token: t
        };
      }, e.prototype.handlePushData = function (e) {
        this.logger.debug("zs.hpd.0 call " + e.header.cmd + " session " + e.header.session_id);
        var t = this.pushCallback[e.header.cmd + e.header.session_id];
        t ? t.callback && t.callback(e.header.seq, e.header.session_id, e.body) : this.logger.info("zs.hpd.0 no callbackData " + e.header.cmd + " session: " + e.header.session_id);
      }, e.prototype.handlePushResetSessionData = function (e) {
        this.logger.debug("zs.hprsd.0 call ");
        var t = [];
        if (0 == e.body.cResetType) t = Object.keys(this.sessionInfos);else if (1 == e.body.cResetType) for (var r = 0; r < e.body.session_ids.length; r++) {
          t.push(e.body.session_ids[r]);
        }
        if (this.sendResetSessionAck(e.header.seq, 0, 0), 0 != t.length) for (var i = 0; i < t.length; i++) {
          var s = this.pushCallback[e.header.cmd + t[i]];
          null == s ? this.logger.info("zs.hprsd.0 no callbackData " + t[i]) : s.callback && s.callback(e.header.seq, t[i], e.body);
        } else this.logger.info("zs.hprsd.0 no session to callback");
      }, e.prototype.sendMediaDesc = function (e, t, r, i, s, n) {
        this.logger.debug("zs.smd.0 call: ", t);
        var o = {
          type: r,
          sdp: i.sdp
        };
        null != i.width && (o.width = i.width), null != i.height && (o.height = i.height), null != i.frameRate && (o.framerate = i.frameRate), null != i.video_min_kpbs && (o.video_min_kpbs = i.video_min_kpbs), null != i.video_max_kpbs && (o.video_max_kpbs = i.video_max_kpbs), null != i.audio_kpbs && (o.audio_kpbs = i.audio_kpbs), null != i.keyframe_intv && (o.keyframe_intv = i.keyframe_intv), this.sendMessageWithCallback("MediaDescReq", e, t, o, s, n);
      }, e.prototype.sendCandidateInfo = function (e, t, r, i, s) {
        this.logger.debug("zs.sci.0 call: ", t);

        for (var n = [], o = 0; o < r.length; o++) {
          var a = {
            candidate: r[o].candidate,
            sdpMid: r[o].sdpMid,
            sdpMLineIndex: r[o].sdpMLineIndex
          };
          n.push(a);
        }

        var c = {
          infos: n
        };
        this.sendMessageWithCallback("CandidateInfoReq", e, t, c, i, s);
      }, e.prototype.sendMediaDescAck = function (e, t, r) {
        this.logger.debug("zs.smda.0 call: ", t);
        var i = {
          result: r
        };
        this.sendMessage("MediaDescAck", e, t, i);
      }, e.prototype.sendCandidateInfoAck = function (e, t, r) {
        this.logger.debug("zs.scia.0 call: ", t);
        var i = {
          result: r
        };
        this.sendMessage("CandidateInfoAck", e, t, i);
      }, e.prototype.sendCloseSessionAck = function (e, t, r) {
        this.logger.debug("zs.scsa.0 call: ", t);
        var i = {
          result: r
        };
        this.sendMessage("CloseSessionAck", e, t, i);
      }, e.prototype.sendResetSessionAck = function (e, t, r) {
        this.logger.debug("zs.ssra.0 call: ", t);
        var i = {
          result: r
        };
        this.sendMessage("SessionResetAck", e, t, i);
      }, e.prototype.registerPushCallback = function (e, t, r) {
        r && "function" == typeof r && (this.logger.debug("zs.rpc.0 setcallback"), this.pushCallback[e + t] = {
          callback: r
        });
      }, e.prototype.unregisterPushCallback = function (e, t) {
        delete this.pushCallback[e + t];
      }, e.prototype.checkMessageTimeout = function () {
        for (var e = this.sendDataList.getFirst(), t = Date.parse(new Date() + ""), r = 0, i = 0, n = 0; !(null == e || e._data.time + this.sendDataTimeout > t || (delete this.sendDataMap[e._data.seq], this.sendDataList.remove(e), ++i, null == e._data.error || this.sendDataDropTimeout > 0 && e._data.time + this.sendDataDropTimeout < t ? ++n : e._data.error && e._data.error(s.SEND_MSG_TIMEOUT, e._data.seq), ++r >= this.sendDataCheckOnceCount));) {
          e = this.sendDataList.getFirst();
        }

        0 == i && 0 == n || this.logger.debug("zs.cmt.0 call success, state: timeout=", i, " drop=", n);
      }, e.prototype.sendHeartbeat = function () {
        var e = this;

        if (this.logger.debug("zs.shb.0 call tryHeartbeatCount:" + this.tryHeartbeatCount), 0 != Object.keys(this.sessionInfos).length) {
          if (++this.tryHeartbeatCount > s.MAX_TRY_HEARTBEAT_COUNT) return this.logger.error("zs.shb.0 heartbeat try limit"), void this.disconnectCallback();
          var t = [];

          for (var r in this.sessionInfos) {
            t.push(parseInt(r));
          }

          var i = {
            session_ids: t
          };
          this.sendMessageWithCallback("ClientHBReq", n.getSeq(), 0, i, function (t, r, i) {
            e.heartbeatInterval != i.hb_interval && (e.heartbeatInterval = i.hb_interval, e.onUpdateHeartBeartInterval(i.hb_interval)), e.tryHeartbeatCount = 0;
          }, function (e, t) {});
        } else this.logger.info("zs.shb.0 no need to heartbeat");
      }, e.prototype.QualityReport = function (e, t, r, s, n) {
        this.logger.debug("zs.qr.0 call");
        var o = {
          streams: [i({}, r, {
            aid: t
          })]
        };
        this.sendMessageWithCallback("QualityReportReq", e, t, o, s, n);
      }, e.prototype.sendStreamStatus = function (e, t, r, i) {
        this.logger.debug("zs.sss.0 call");
        var s = {
          mic_status: i,
          camera_status: r
        };
        this.logger.info("zs.sss.0 stream status " + JSON.stringify(s)), this.sendMessage("StreamStatusNotify", e, t, s);
      }, e.prototype.sendBroadcasterStatus = function (e, t, r) {
        this.logger.debug("zs.sss.0 call");
        var i = {
          status: r
        };
        this.sendMessage("BroadcasterStatusNotify", e, t, i);
      }, e;
    }();

    t.ZegoSignal = o;
  }, function (e, t, r) {
    "use strict";

    var i = this && this.__assign || Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++) {
        for (var s in t = arguments[r]) {
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
      }

      return e;
    };

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var s = r(0),
        n = r(2),
        o = r(4),
        a = function () {
      function e(e, t, r, i, o) {
        this.state = s.ENUM_PLAY_STATE.stop, this.candidateInfo = [], this.waitICETimer = null, this.waitingICETimeInterval = 5e3, this.waitingOfferTimer = null, this.waitingOfferTimeInterval = 5e3, this.waitingServerTimer = null, this.waitingServerTimerInterval = 3e3, this.qualityTimer = null, this.playQualityList = [], this.maxQualityListCount = 10, this.lastPlayStats = {
          audioPacketsLost: 0,
          videoPacketsLost: 0,
          time: 0,
          audioTime: 0,
          videoTime: 0,
          audioBytesReceived: 0,
          videoBytesReceived: 0,
          framesDecoded: 0,
          framesReceived: 0,
          framesDropped: 0,
          audioBitrate: 0
        }, this.reportSeq = n.getSeq(), this.videoSizeCallback = !1, this.qualityUpload = !1, this.qualityUploadInterval = 3e4, this.qualityUploadLastTime = 0, this.maxRetryCount = 3, this.currentRetryCount = 0, this.retryState = s.ENUM_RETRY_STATE.didNotStart, this.streamGoogInfo = {}, this.closeSessionSignal = !1, this.stateNego = s.ENUM_PLAY_STATE_NEGO.stop, this.negoInterval = 25e3, this.negoTryCount = 1, this.negoTryMaxCount = 2, this.broadcasterStatus = s.ENUM_BROADCASTER_STATUS.stop, this.cameraStatus = null, this.micStatus = null, this.playEvent = !1, this.nextSignalTryCount = 1, this.waittingConnectedTimer = null, this.waittingConnectedInerval = 15e3, this.gotStreamStatus = !1, this.tryingNexitSignal = !1, this.ac = null, this.soundLevel = 0, this.mic = null, this.script = null, this.logger = e, this.signal = t, this.dataReport = r, this.qualityTimeInterval = i, this.streamCenter = o, r.newReport(this.reportSeq);
      }

      return e.prototype.setAudioDestination = function (e) {
        var t = this;
        return this.remoteVideo ? "undefined" !== this.remoteVideo.sinkId ? (this.remoteVideo.setSinkId(e).then(function () {
          t.logger.info("zp.sad.1 success device: " + e);
        })["catch"](function (e) {
          t.logger.info("zp.sad.1 " + e.name);
        }), !0) : (this.logger.error("zp.sad.1 browser does not suppport"), !1) : (this.logger.info("zp.sad.1 no remoteVideo"), !1);
      }, e.prototype.startPlay = function (e, t, r, i) {
        var o = this;
        this.logger.info("zp.sp.1 called ", e), this.playEvent = !1, this.signal && this.signal.negoInterval && (this.negoInterval = this.signal.negoInterval), this.signal && this.signal.negoTryCount && (this.negoTryCount = this.signal.negoTryCount), this.signal && this.signal.negoTryMaxCount && (this.negoTryMaxCount = this.signal.negoTryMaxCount), e ? (this.streamId = e, this.remoteVideo = t, this.audioOutput = r, this.playOption = i || {}, i && i.videoDecodeType && (this.playOption.videoDecodeType = i.videoDecodeType), this.sessionSeq = n.getSeq(), this.dataReport.eventStart(this.reportSeq, "CreateSession"), this.signal.createSession(this.sessionSeq, 1, 0, e, i && i.streamParams, function (e, t, r) {
          o.dataReport.eventEndWithMsg(o.reportSeq, "CreateSession", {
            sessionId: r.session_id
          }), o.logger.info("zp.sp.1 sessionId:" + r.session_id), o.sessionSeq == e ? 0 !== r.result ? (o.logger.error("zp.sp.1 create error"), o.playStateUpdateError(n.playErrorList.CREATE_SESSION_ERROR)) : (o.sessionId = r.session_id, o.onCreatePlaySessionSuccess(r)) : o.logger.error("zp.sp.1 seq is not match.");
        }, function (e, t) {
          o.dataReport.eventEndWithMsg(o.reportSeq, "CreateSession", {
            error: e
          }), o.playStateUpdateError(n.playErrorList.SEND_SESSION_TIMEOUT);
        }), this.state = s.ENUM_PLAY_STATE.waitingSessionRsp, this.logger.debug("zp.sp.1 called success"), this.stateNego = s.ENUM_PLAY_STATE_NEGO.start, this.negoTimer = setTimeout(function () {
          o.stateNego !== s.ENUM_PLAY_STATE_NEGO.iceConnected && o.negoTryCount < o.negoTryMaxCount ? (o.signal.sendCloseSession(n.getSeq(), o.sessionId, 1), o.resetPlay(), o.startPlay(e, t, r, i), ++o.negoTryCount) : o.stateNego !== s.ENUM_PLAY_STATE_NEGO.iceConnected && o.negoTryCount === o.negoTryMaxCount && (o.logger.error("zp.sp.1 waiting timeout"), o.playStateUpdateError(n.playErrorList.SERVER_NEGO_TIMEOUT));
        }, this.negoInterval)) : this.logger.warn("zp.sp.1 streamId is null");
      }, e.prototype.onCreatePlaySessionSuccess = function (e) {
        var t = this;
        this.logger.info("zp.ops.1 success");
        var r = [];
        e.turn_server && r.push(e.turn_server), e.stun_server && r.push(e.stun_server);
        var i = {
          iceTransportPolicy: "relay",
          iceServers: [{
            urls: r,
            username: e.turn_username,
            credential: e.turn_auth_key
          }]
        };
        this.logger.info("zp.ops.1 username: " + e.turn_username), this.logger.info("zp.ops.1 credential: " + e.turn_auth_key), this.peerConnection = new RTCPeerConnection(i), this.peerConnection.onicecandidate = function (e) {
          t.onIceCandidate(e);
        }, this.peerConnection.onsignalingstatechange = function (e) {
          t.onConnectionStateChange(e);
        }, this.peerConnection.oniceconnectionstatechange = function (e) {
          t.onIceConnectionStateChange(e);
        }, this.peerConnection.ontrack = function (e) {
          t.onGotRemoteStream(e.streams[0]);
        }, this.remoteVideo.oncanplay = function () {
          t.logger.debug("zp.ops.1 " + t.remoteVideo.videoWidth + " X " + t.remoteVideo.videoHeight), t.videoSizeCallback || (t.logger.debug("zp.ops.1 onresize callback"), t.onVideoSizeChanged(t.streamId, t.remoteVideo.videoWidth, t.remoteVideo.videoHeight), t.videoSizeCallback = !0);
        };
        var s = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        };
        this.playOption && "audio" === this.playOption.playType && (s.offerToReceiveVideo = 0), this.playOption && "video" === this.playOption.playType && (s.offerToReceiveAudio = 0), this.logger.info("zp.ops.1 createOffer: " + JSON.stringify(s)), this.dataReport.eventStart(this.reportSeq, "CreateOffer"), this.peerConnection.createOffer(s).then(function (e) {
          t.dataReport.eventEnd(t.reportSeq, "CreateOffer"), t.onCreateOfferSuccess(e);
        }, function (e) {
          t.dataReport.eventEndWithMsg(t.reportSeq, "CreateOffer", {
            error: e.toString()
          }), t.logger.error("zp.ops.0 create offer error " + e.toString()), t.playStateUpdateError(n.playErrorList.CREATE_OFFER_ERROR, !0);
        }), this.signal.registerPushCallback("MediaDescPush", this.sessionId, function (e, r, i) {
          t.onRecvMediaDesc(e, r, i);
        }), this.signal.registerPushCallback("CandidateInfoPush", this.sessionId, function (e, r, i) {
          t.onRecvCandidateInfo(e, r, i);
        }), this.signal.registerPushCallback("CloseSessionPush", this.sessionId, function (e, r, i) {
          t.onRecvCloseSession(e, r, i);
        }), this.signal.registerPushCallback("SessionResetPush", this.sessionId, function (e, r, i) {
          t.onRecvResetSession(e, r, i);
        }), this.signal.registerPushCallback("StreamStatusNotifyPush", this.sessionId, function (e, r, i) {
          t.gotStreamStatus = !0, t.streamStatus = i, t.remoteStream && t.onRecvStreamStatus(i);
        }), this.signal.registerPushCallback("PlayEventPush", this.sessionId, function (e, r, i) {
          t.onRecvPlayEvent(e, r, i);
        }), this.logger.debug("zp.ops.1 call success");
      }, e.prototype.onCreateOfferSuccess = function (e) {
        var t = this;
        this.logger.info("zp.oco.1 localSdp1 " + e.sdp.substr(0, e.sdp.length / 2)), this.logger.info("zp.oco.1 localSdp2 " + e.sdp.substr(e.sdp.length / 2)), e.sdp = e.sdp.replace(/sendrecv/g, "recvonly"), this.playOption.videoDecodeType && (e.sdp = o.sdpUtil.getSDPByVideDecodeType(e.sdp, this.playOption.videoDecodeType)), this.dataReport.eventStart(this.reportSeq, "SetLocalDescription"), this.peerConnection.setLocalDescription(e).then(function () {
          t.dataReport.eventEnd(t.reportSeq, "SetLocalDescription"), t.onSetLocalDescriptionSuccess(e);
        }, function (e) {
          t.logger.error("zp.oca.1 set error " + e.toString()), t.dataReport.eventEnd(t.reportSeq, "SetLocalDescription", {
            error: e.toString()
          }), t.playStateUpdateError(n.playErrorList.SET_LOCAL_DESC_ERROR, !0);
        });
      }, e.prototype.onSetLocalDescriptionSuccess = function (e) {
        var t = this;
        this.logger.info("zp.osd.1 success");
        var r = {
          sdp: e.sdp
        };
        this.answerSeq = n.getSeq(), this.dataReport.eventStart(this.reportSeq, "SendMediaDesc"), this.signal.sendMediaDesc(this.answerSeq, this.sessionId, 0, r, function (e, r, i) {
          t.logger.info("zp.osd.1 sendMediaDesc resp"), t.answerSeq == e && t.sessionId == r ? (t.logger.info("zp.osd.1 send success stateNego:waiterAnswer"), t.stateNego = s.ENUM_PLAY_STATE_NEGO.waiterAnswer, t.dataReport.eventEnd(t.reportSeq, "SendMediaDesc"), t.waitingOfferTimer = setTimeout(function () {
            t.state == s.ENUM_PLAY_STATE.waitingOffserRsp && (t.logger.error("zp.osd.1 waiting timeout"), t.playStateUpdateError(n.playErrorList.SERVER_CANDIDATE_TIMEOUT));
          }, t.waitingOfferTimeInterval), t.state = s.ENUM_PLAY_STATE.waitingServerAnswer) : t.logger.error("zp.osd.1 seq or sessionId is not equal " + t.answerSeq + " " + e, 0 + t.sessionId + " " + r);
        }, function (e, r) {
          t.logger.error("zp.osd.1 failed to send " + e), t.dataReport.eventEndWithMsg(t.reportSeq, "SendMediaDesc", {
            error: e
          }), t.playStateUpdateError(n.playErrorList.SEND_MEDIA_DESC_TIMEOUT);
        }), this.state = s.ENUM_PLAY_STATE.waitingOffserRsp;
      }, e.prototype.onRecvMediaDesc = function (e, t, r) {
        var i = this;

        if (this.logger.info("zp.orm.1 received ", r), this.stateNego = s.ENUM_PLAY_STATE_NEGO.waitingCandidate, this.logger.info("zp.orm.1 received stateNego:waitingCandidate"), this.state === s.ENUM_PLAY_STATE.waitingServerAnswer) {
          null != this.waitingOfferTimer && (clearTimeout(this.waitingOfferTimer), this.waitingOfferTimer = null), this.dataReport.addEvent(this.reportSeq, "RecvMediaDesc"), this.signal.sendMediaDescAck(e, this.sessionId, 0);
          var o = {
            type: "answer",
            sdp: r.sdp,
            toJSON: function toJSON() {}
          };
          this.dataReport.eventStart(this.reportSeq, "SetRemoteDescription"), this.logger.info("zp.orm.1 remoteSdp ", o.sdp), this.peerConnection.setRemoteDescription(new RTCSessionDescription(o)).then(function () {
            i.dataReport.eventEnd(i.reportSeq, "SetRemoteDescription"), i.logger.info("zp.orm.1 set success");
          }, function (e) {
            i.logger.error("zp.orm.1 set remote error " + e.toString()), i.dataReport.eventEndWithMsg(i.reportSeq, "SetRemoteDescription", {
              error: e.toString()
            }), i.playStateUpdateError(n.playErrorList.SET_REMOTE_DESC_ERROR);
          }), this.waitICETimer = setTimeout(function () {
            i.state == s.ENUM_PLAY_STATE.waitingServerICE && (i.logger.error("zp.orm.1 waiting server timeout"), i.playStateUpdateError(n.playErrorList.SERVER_CANDIDATE_TIMEOUT));
          }, this.waitingICETimeInterval), this.state = s.ENUM_PLAY_STATE.waitingServerICE, this.logger.debug("zp.orm.1 call success");
        } else this.logger.error("zp.orm.1 current state " + this.state + " not allowed");
      }, e.prototype.onRecvCandidateInfo = function (e, t, r) {
        var i = this;

        if (this.logger.info("zp.orci.1 received "), this.state == s.ENUM_PLAY_STATE.waitingServerICE) {
          null != this.waitICETimer && (clearTimeout(this.waitICETimer), this.waitICETimer = null), this.dataReport.addEvent(this.reportSeq, "RecvIceCandidate"), this.signal.sendCandidateInfoAck(e, this.sessionId, 0), this.sendCandidateInfo(this.candidateInfo), this.candidateInfo = [];

          for (var o = 0; o < r.infos.length; o++) {
            var a = {
              sdpMid: r.infos[o].sdpMid,
              sdpMLineIndex: r.infos[o].sdpMLineIndex,
              candidate: r.infos[o].candidate
            };
            this.logger.debug("zp.orci.1 candidate " + a.candidate), this.peerConnection.addIceCandidate(new RTCIceCandidate(a)).then(function () {
              i.logger.debug("zp.orci.1 add success");
            }, function (e) {
              i.logger.error("zp.orci.1 add error " + e.toString()), i.playStateUpdateError(n.playErrorList.SERVER_CANDIDATE_ERROR);
            });
          }

          this.state = s.ENUM_PLAY_STATE.connecting, this.logger.debug("zp.orci.1 call success");
        } else this.logger.warn("zp.orci.1 current state " + this.state + " not allowed");
      }, e.prototype.onRecvPlayEvent = function (e, t, r) {
        if (this.logger.info("zp.orpe.1 received"), !0 === this.playEvent && 0 == r.event) {
          this.logger.info("zp.orpe.1 retry: " + this.streamId);
          var i = this.streamId,
              s = this.remoteVideo,
              o = this.audioOutput,
              a = this.playOption;
          this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.resetPlay(), this.startPlay(i, s, o, a);
        } else this.playEvent = !0;
      }, e.prototype.onIceCandidate = function (e) {
        if (this.logger.info("zp.oic.1 called"), null != e.candidate) if (this.logger.debug("zp.oic.1 candidate " + e.candidate.candidate), this.state < s.ENUM_PLAY_STATE.connecting || this.state == s.ENUM_PLAY_STATE.stop) this.logger.debug("zp.oic.1 cached"), this.candidateInfo.push({
          candidate: e.candidate.candidate,
          sdpMid: e.candidate.sdpMid,
          sdpMLineIndex: e.candidate.sdpMLineIndex
        });else {
          this.logger.debug("zp.oic.1 send");
          var t = {
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
            sdpMLineIndex: e.candidate.sdpMLineIndex
          };
          this.sendCandidateInfo([t]);
        }
      }, e.prototype.onConnectionStateChange = function (e) {
        this.logger.info("zp.oisc.1 called " + e.target.signalingState);
      }, e.prototype.onIceConnectionStateChange = function (e) {
        var t = this;
        if (this.state != s.ENUM_PLAY_STATE.stop && null != this.peerConnection) if (this.logger.info("zp.oisc.1  stateChanged " + this.peerConnection.iceConnectionState), "connected" === this.peerConnection.iceConnectionState) {
          for (var r in this.dataReport.addEvent(this.reportSeq, "IceConnected"), this.state != s.ENUM_PLAY_STATE.playing && this.onPlayStateUpdate(n.ENUM_PLAY_STATE_UPDATE.start, this.streamId), this.state = s.ENUM_PLAY_STATE.playing, this.tryingNexitSignal = !1, this.retryState != s.ENUM_RETRY_STATE.didNotStart && (this.retryState = s.ENUM_RETRY_STATE.finished, this.currentRetryCount = 0), this.dataReport.eventStart(this.reportSeq, "PlayState"), this.streamCenter.publisherList) {
            if (this.streamCenter.publisherList[r].publisher.state == s.ENUM_PUBLISH_STATE.publishing && this.broadcasterStatus == s.ENUM_BROADCASTER_STATUS.stop) {
              this.signal && this.signal.sendBroadcasterStatus(n.getSeq(), this.sessionId, 1), this.broadcasterStatus = s.ENUM_BROADCASTER_STATUS.start;
              break;
            }
          }

          this.setPlayQualityTimer(), this.stateNego = s.ENUM_PLAY_STATE_NEGO.iceConnected, this.logger.info("zp.oisc.1  stateNego:iceConnected"), this.negoTryCount = 1, this.nextSignalTryCount = 1, this.waittingConnectedTimer && clearTimeout(this.waittingConnectedTimer), this.waittingConnectedTimer = null, this.negoTimer && clearTimeout(this.negoTimer);
        } else "closed" === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, "IceClosed"), this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState)) : "failed" === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, "IceFailed"), this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState)) : "disconnected" === this.peerConnection.iceConnectionState && (this.dataReport.addEvent(this.reportSeq, "IceDisconnected"), this.waittingConnectedTimer = setTimeout(function () {
          !t.tryingNexitSignal && t.tryNextSignal(n.publishErrorList.MEDIA_CONNECTION_DISCONNECTED);
        }, this.waittingConnectedInerval));
      }, e.prototype.checkPlayConnectionFailedState = function (e) {
        var t = null;
        "failed" == e ? t = n.playErrorList.MEDIA_CONNECTION_FAILED : "closed" == e && (t = n.playErrorList.MEDIA_CONNECTION_CLOSED), null != t && (this.state != s.ENUM_PLAY_STATE.playing && this.retryState == s.ENUM_PLAY_STATE.didNotStart ? (this.logger.info("zp.oics.1  state " + this.state + " retryState " + this.retryState + " connectionState " + e), this.playStateUpdateError(t)) : this.shouldRetryPlay() ? (this.onPlayStateUpdate(n.ENUM_PLAY_STATE_UPDATE.retry, this.streamId), this.startRetryPlay()) : this.playStateUpdateError(t));
      }, e.prototype.shouldRetryPlay = function () {
        return this.retryState == s.ENUM_RETRY_STATE.didNotStart && this.state != s.ENUM_PLAY_STATE.playing ? (this.logger.info("zp.srp.1.0 connection didn't success"), !1) : this.retryState == s.ENUM_RETRY_STATE.retrying ? (this.logger.info("zp.srp.0.0 already retrying"), !1) : this.currentRetryCount > this.maxRetryCount ? (this.logger.info("zp.srp.1.0 beyond max"), !1) : (this.logger.debug("zp.srp.1.0 call success"), !0);
      }, e.prototype.startRetryPlay = function () {
        this.logger.debug("zp.srp.0 call");
        var e = this.streamId,
            t = this.remoteVideo,
            r = this.audioOutput;
        this.resetPlay(), this.tryStartPlay(e, t, r);
      }, e.prototype.clearTryPlayTimer = function () {
        null != this.waitingServerTimer && (clearTimeout(this.waitingServerTimer), this.waitingServerTimer = null);
      }, e.prototype.tryStartPlay = function (e, t, r) {
        var i = this;
        if (this.logger.debug("zp.tsp.1 call"), this.clearTryPlayTimer(), this.streamId = e, this.remoteVideo = t, this.audioOutput = r, this.currentRetryCount > this.maxRetryCount) return this.logger.error("zp.tsp.1 beyond max limit"), void this.playStateUpdateError(n.playErrorList.WEBSOCKET_ERROR);
        this.retryState = s.ENUM_RETRY_STATE.retrying, this.currentRetryCount += 1, this.signal.isServerConnected() ? (this.logger.debug("zp.tsp.1 signal connected"), this.startPlay(e, this.remoteVideo, this.audioOputput, this.playOption)) : (this.logger.debug("zp.tsp.1 signal server not connected"), this.waitingServerTimer = setTimeout(function () {
          i.tryStartPlay(e, i.remoteVideo, i.audioOputput);
        }, this.waitingServerTimerInterval));
      }, e.prototype.clearPlayQualityTimer = function () {
        null != this.qualityTimer && (clearInterval(this.qualityTimer), this.qualityTimer = null), this.lastPlayStats = {
          audioPacketsLost: null,
          videoPacketsLost: null,
          time: null,
          audioTime: null,
          videoTime: null,
          audioBytesReceived: null,
          videoBytesReceived: null,
          framesDecoded: null,
          framesDropped: null,
          framesReceived: null,
          audioBitrate: null
        };
      }, e.prototype.resetPlay = function () {
        this.logger.info("zp.rp.1 call"), this.streamId = null, this.state = s.ENUM_PLAY_STATE.stop, this.playEvent = !1, null != this.peerConnection && (this.peerConnection.close(), this.peerConnection = null), null != this.waitingOfferTimer && (clearTimeout(this.waitingOfferTimer), this.waitingOfferTimer = null), null != this.waitICETimer && (clearTimeout(this.waitICETimer), this.waitICETimer = null), null != this.negoTimer && (clearTimeout(this.negoTimer), this.negoTimer = null), null != this.waittingConnectedTimer && (clearTimeout(this.waittingConnectedTimer), this.waittingConnectedTimer = null), this.clearPlayQualityTimer(), this.remoteVideo && (this.remoteVideo.srcObject = null, this.remoteVideo.oncanplay = null, this.remoteVideo = null), this.audioOputput = null, this.signal && (this.signal.unregisterPushCallback("MediaDescPush", this.sessionId), this.signal.unregisterPushCallback("CandidateInfoPush", this.sessionId), this.signal.unregisterPushCallback("CloseSessionPush", this.sessionId)), this.sessionSeq = 0, this.answerSeq = 0, this.videoSizeCallback = !1, this.script && this.script.disconnect(), this.mic && this.mic.disconnect(), this.currentRetryCount = 0, this.retryState = s.ENUM_RETRY_STATE.didNotStart, this.clearTryPlayTimer();
      }, e.prototype.setPlayQualityTimer = function () {
        var e = this;

        if (null == this.qualityTimer) {
          this.logger.debug("zp.spq.1 startTimer"), this.clearPlayQualityTimer();
          var t = !0;
          this.peerConnection.getStats(function () {})["catch"](function (r) {
            e.logger.info("zp.spq.1 " + e.streamId + " getStats callback not support"), t = !1;
          }), this.qualityTimer = setInterval(function () {
            e.peerConnectionGetStats(t);
          }, this.qualityTimeInterval), this.lastPlayStats = {
            audioPacketsLost: 0,
            videoPacketsLost: 0,
            time: 0,
            audioTime: 0,
            videoTime: 0,
            audioBytesReceived: 0,
            videoBytesReceived: 0,
            framesDecoded: 0,
            framesReceived: 0,
            framesDropped: 0,
            audioBitrate: 0
          };
        }
      }, e.prototype.peerConnectionGetStats = function (e) {
        var t = this;
        this.peerConnection && (e && this.peerConnection.getStats(function (e) {
          t.getOldGoogStats(e);
        }, function (e) {
          t.logger.info("zp.spq.1 getOldGoogStats error " + e.toString());
        }), this.peerConnection.getStats(null).then(function (e) {
          t.getPlayStats(e);
        }, function (e) {
          t.logger.info("zp.spq.1 getStats error " + e.toString());
        }));
      }, e.prototype.getOldGoogStats = function (e) {
        var t = this;
        e && e.result().forEach(function (e) {
          var r = ["audioOutputLevel", "googCpuLimitedResolution", "googBandwidthLimitedResolution", "googCodecName", "googActualEncBitrate", "googFrameWidthInput", "googFrameHeightInput", "googFrameRateInput", "codecImplementationName"];
          if ("VideoBwe" === e.type && e.names().includes("googAvailableSendBandwidth") && (t.streamGoogInfo.googAvailableSendBandwidth = e.stat("googAvailableReceiveBandwidth") || ""), "ssrc" === e.type) for (var i = 0; i < r.length; i++) {
            var s = r[i];
            e.names().includes(s) && (t.streamGoogInfo[s] = e.stat(s) || "");
          }
        });
      }, e.prototype.getPlayStats = function (e) {
        var t = this;

        if (null != e) {
          var r = i({
            audioFractionLost: null,
            audioPacketsLost: 0,
            audioPacketsLostRate: 0,
            audioBitrate: 0,
            audioLevel: 0,
            audioSendLevel: 0,
            audioSamplingRate: 0,
            audioCodecType: "opus",
            audioQuality: null,
            videoQuality: null,
            videoPacketsLostRate: 0,
            videoBitrate: 0,
            videoFPS: 0,
            playData: 0,
            nackCount: 0,
            pliCount: 0,
            audioJitter: 0,
            videoFractionLost: null,
            videoFramesDecoded: 0,
            frameHeight: 0,
            frameWidth: 0,
            videoTransferFPS: 0,
            videoFramesDropped: 0,
            totalRoundTripTime: 0,
            currentRoundTripTime: 0,
            muted: !this.remoteVideo || this.remoteVideo.muted,
            paused: !this.remoteVideo || this.remoteVideo.paused,
            volume: this.remoteVideo ? this.remoteVideo.volume : 0,
            audioDeviceLabel: "",
            videoDeviceLbabel: ""
          }, this.streamGoogInfo);

          if (this.remoteVideo) {
            var s = this.remoteVideo.srcObject;
            r.audioDeviceLabel = s.getAudioTracks().length > 0 ? s.getAudioTracks()[0].label : "", r.videoDeviceLbabel = s.getVideoTracks().length > 0 ? s.getVideoTracks()[0].label : "";
          }

          var n = this.lastPlayStats.time,
              o = null;
          e.forEach(function (e) {
            ("inbound-rtp" == e.type || "ssrc" == e.type && null != e.bytesReceived) && ("audio" == e.mediaType || e.id.indexOf("AudioStream") >= 0) ? (0 != n && (r.audioBitrate = 8 * (e.bytesReceived - t.lastPlayStats.audioBytesReceived) / (e.timestamp - n)), r.audioBitrate < 0 && (r.audioBitrate = 0), r.audioJitter = e.jitter, r.audioPacketsLost = e.packetsLost, r.audioFractionLost = e.fractionLost, r.audioPacketsLostRate = (e.packetsLost - t.lastPlayStats.audioPacketsLost) / (e.timestamp - t.lastPlayStats.audioTime), t.lastPlayStats.audioBytesReceived = e.bytesReceived, t.lastPlayStats.audioPacketsLost = e.packetsLost, t.lastPlayStats.audioTime = e.timestamp, t.lastPlayStats.time = e.timestamp, t.lastPlayStats.audioBitrate = r.audioBitrate) : ("inbound-rtp" == e.type || "ssrc" == e.type && null != e.bytesReceived) && ("video" == e.mediaType || e.id.indexOf("VideoStream") >= 0) ? (0 != n && (r.videoBitrate = 8 * (e.bytesReceived - t.lastPlayStats.videoBytesReceived) / (e.timestamp - n), r.videoFPS = 1e3 * (e.framesDecoded - t.lastPlayStats.framesDecoded) / (e.timestamp - n)), r.videoBitrate < 0 && (r.videoBitrate = 0), r.videoFPS < 0 && (r.videoFPS = 0), r.nackCount = e.nackCount, r.pliCount = e.pliCount, r.videoFractionLost = e.fractionLost, r.videoFramesDecoded = e.framesDecoded, r.videoPacketsLostRate = (e.packetsLost - t.lastPlayStats.videoPacketsLost) / (e.timestamp - t.lastPlayStats.videoTime), t.lastPlayStats.videoBytesReceived = e.bytesReceived, t.lastPlayStats.framesDecoded = e.framesDecoded, t.lastPlayStats.videoPacketsLost = e.packetsLost, t.lastPlayStats.videoTime = e.timestamp, t.lastPlayStats.time = e.timestamp) : "track" == e.type && ("video" == e.kind || e.id.indexOf("video") >= 0) || e.frameWidth ? (r.frameHeight = e.frameHeight, r.frameWidth = e.frameWidth, 0 != n && (r.videoTransferFPS = 1e3 * (e.framesReceived - t.lastPlayStats.framesReceived) / (e.timestamp - n), r.videoFramesDropped = e.framesDropped - t.lastPlayStats.framesDropped), r.videoTransferFPS < 0 && (r.videoTransferFPS = 0), r.videoFramesDropped < 0 && (r.videoFramesDropped = 0), t.lastPlayStats.framesReceived = e.framesReceived, t.lastPlayStats.framesDropped = e.framesDropped) : "track" == e.type && ("audio" == e.kind || e.id.indexOf("audio") >= 0) ? (r.audioLevel = e.audioLevel, r.audioSendLevel = e.totalAudioEnergy, r.audioSamplingRate = e.totalSamplesDuration) : "candidate-pair" == e.type && (null != e.totalRoundTripTime && (r.totalRoundTripTime = e.totalRoundTripTime), null != e.currentRoundTripTime && (r.currentRoundTripTime = e.currentRoundTripTime, o = 1e3 * r.currentRoundTripTime));
          }), r.audioQuality = this.getNetQuality(o, r.audioFractionLost), r.videoQuality = this.getNetQuality(o, r.videoFractionLost), this.uploadPlayQuality(r), 0 != n && this.onPlayQualityUpdate(this.streamId, r);
        }
      }, e.prototype.getNetQuality = function (e, t) {
        return e && e < 600 ? t > .4 ? 2 : t > .3 ? 4 : 5 : e < 900 ? t > .4 ? 2 : t > .2 ? 3 : 4 : t > .2 ? 2 : 3;
      }, e.prototype.uploadPlayQuality = function (e) {
        var t = this;

        if (this.qualityUpload) {
          var r = Date.parse(new Date() + "");
          (0 == this.qualityUploadLastTime || r - this.qualityUploadLastTime >= this.qualityUploadInterval) && (e.stream_type = "play", e.stream_id = this.streamId, e.timeStamp = r / 1e3, this.logger.info("zp.upq.1 upload" + JSON.stringify(e)), this.signal.QualityReport(n.getSeq(), this.sessionId, e, function (e, r, i) {
            void 0 !== i.report && (t.qualityUpload = i.report, t.qualityUploadInterval = i.report_interval_ms);
          }, function (e, r) {
            t.logger.info("zp.upq.1 upload failed " + e);
          }), this.qualityUploadLastTime = r);
        }
      }, e.prototype.onRecvResetSession = function (e, t, r) {
        if (this.logger.info("zp.orrs.1 received "), t == this.sessionId) {
          this.dataReport.addEvent(this.reportSeq, "RecvResetSession"), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
          var i = JSON.parse(JSON.stringify(n.playErrorList.SESSION_CLOSED));
          this.negoTimer && clearTimeout(this.negoTimer), !this.tryingNexitSignal && this.tryNextSignal(i);
        } else this.logger.info("zp.orrs.1 cannot find session");
      }, e.prototype.onRecvCloseSession = function (e, t, r) {
        this.logger.info("zp.orcs.1 reason: " + r.reason), this.dataReport.addEvent(this.reportSeq, "RecvCloseSession"), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
        var i = JSON.parse(JSON.stringify(n.playErrorList.SESSION_CLOSED));
        i.msg += r.reason, this.negoTimer && clearTimeout(this.negoTimer);
        var s = 1 * r.reason,
            o = r.err_info && JSON.parse(r.err_info).action ? JSON.parse(r.err_info).action : null;

        if ("number" == typeof s && [24, 26, 28].includes(s) && this.negoTryCount < this.negoTryMaxCount || 5 == o) {
          this.logger.info("zp.orcs.1 retry: " + this.streamId);
          var a = this.streamId,
              c = this.remoteVideo,
              l = this.audioOutput,
              d = this.playOption;
          this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.resetPlay(), this.startPlay(a, c, l, d), ++this.negoTryCount;
        } else [4, 8, 10, 11, 12, 14, 27].includes(s) || 2 == o ? (this.logger.info("zp.orcs.1 try next signal " + this.tryingNexitSignal), !this.tryingNexitSignal && this.tryNextSignal(i)) : this.playStateUpdateError(i, !0);
      }, e.prototype.onRecvStreamStatus = function (e) {
        if (this.logger.debug("zp.orss.0 call"), this.cameraStatus !== e.camera_status && this.onRemoteCameraStatusUpdate(this.streamId, e.camera_status), this.micStatus !== e.mic_status && this.onRemoteMicStatusUpdate(this.streamId, e.mic_status), this.cameraStatus = e.camera_status, this.micStatus = e.mic_status, -1 === ["all", "video", "audio"].indexOf(this.playOption.playType)) {
          var t = this.remoteVideo.srcObject;
          0 !== e.camera_status && t && 0 !== t.getVideoTracks().length && (t.getVideoTracks().forEach(function (e) {
            e.stop(), t.removeTrack(e);
          }), this.remoteVideo.srcObject = t), 0 == e.camera_status && t && 0 == t.getVideoTracks().length && (this.remoteVideo.srcObject = this.remoteStream.clone()), this.logger.debug("zp.orss.0 call success");
        } else this.logger.info("zp.orss.0 has set playType, ignore stream status");
      }, e.prototype.onGotRemoteStream = function (e) {
        this.logger.info("zp.ogrs.0 called " + e), this.remoteVideo ? (this.remoteStream = e, this.remoteVideo.srcObject = e.clone(), this.audioOputput && this.setAudioDestination(this.audioOputput), this.gotStreamStatus && this.onRecvStreamStatus(this.streamStatus), this.streamCenter.soundLevelDelegate && this.startSoundLevel(), this.dataReport.addEvent(this.reportSeq, "GetRemoteStream")) : this.logger.error("zp.ogrs.0 no remoteVideo");
      }, e.prototype.sendCandidateInfo = function (e) {
        var t = this;
        this.logger.info("zp.sci.1 called"), !(e = e.filter(function (e) {
          return !(e.candidate.indexOf("tcp") > 0) && (!!e.candidate || void 0);
        })) || e.length < 1 ? this.logger.info("zp.sci.1 cancelled") : (this.dataReport.eventStart(this.reportSeq, "SendIceCandidate"), this.stateNego !== s.ENUM_PLAY_STATE_NEGO.iceConnected && (this.stateNego = s.ENUM_PLAY_STATE_NEGO.sendCandidate), this.logger.info("zp.sci.1  stateNego:sendCandidate"), this.signal.sendCandidateInfo(n.getSeq(), this.sessionId, e, function (e, r, i) {
          t.logger.debug("zp.sci.1 send success"), t.dataReport.eventEnd(t.reportSeq, "SendIceCandidate");
        }, function (e, r) {
          t.logger.error("zp.sci.1 failed to send: " + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, "SendIceCandidate", {
            error: e
          }), t.playStateUpdateError(n.playErrorList.SEND_CANDIDATE_ERROR);
        }));
      }, e.prototype.shouldSendCloseSession = function (e) {
        return this.state != n.ENUM_PLAY_STATE_UPDATE.stop && this.state != s.ENUM_PLAY_STATE.waitingSessionRsp;
      }, e.prototype.playStateUpdateError = function (e, t) {
        this.logger.info("zp.psue.1 called ", e.code), t || !(this.state === s.ENUM_PLAY_STATE.stop || this.negoTryCount < this.negoTryMaxCount && this.stateNego < s.ENUM_PLAY_STATE_NEGO.iceConnected) ? (0 != this.sessionId && this.shouldSendCloseSession(e) && (this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.closeSessionSignal = !0), this.state = s.ENUM_PLAY_STATE.stop, this.onPlayStateUpdate(n.ENUM_PLAY_STATE_UPDATE.error, this.streamId, e), this.logger.info("zp.psue.1 ended"), this.resetPlay()) : this.logger.info("zp.psue.1 already reset");
      }, e.prototype.onPlayStateUpdate = function (e, t, r) {}, e.prototype.onPlayQualityUpdate = function (e, t) {}, e.prototype.onVideoSizeChanged = function (e, t, r) {}, e.prototype.onRemoteCameraStatusUpdate = function (e, t) {}, e.prototype.onRemoteMicStatusUpdate = function (e, t) {}, e.prototype.stopPlay = function () {
        for (var e in this.logger.info("zp.sp.1.1 called"), this.streamCenter.publisherList) {
          if (this.streamCenter.publisherList[e].publisher.state == s.ENUM_PUBLISH_STATE.publishing && this.broadcasterStatus == s.ENUM_BROADCASTER_STATUS.start) {
            this.signal && this.signal.sendBroadcasterStatus(n.getSeq(), this.sessionId, 0), this.broadcasterStatus = s.ENUM_BROADCASTER_STATUS.stop;
            break;
          }
        }

        this.sessionId && !this.closeSessionSignal && this.signal.sendCloseSession(n.getSeq(), this.sessionId, 0), this.dataReport.eventEndWithMsg(this.reportSeq, "PlayState", {
          state: this.state + ""
        }), this.dataReport.addEvent(this.reportSeq, "StopPlay"), this.dataReport.addMsgExt(this.reportSeq, {
          stream: this.streamId,
          sessionId: this.sessionId
        }), this.dataReport.uploadReport(this.reportSeq, "RTCPlayStream"), this.resetPlay();
      }, e.prototype.onDisconnect = function () {
        this.logger.info("zp.od.1 call"), this.logger.info("zp.od.1 websocket disconnect"), this.dataReport.addEvent(this.reportSeq, "OnDisconnect"), !this.tryingNexitSignal && this.tryNextSignal(n.playErrorList.WEBSOCKET_ERROR);
      }, e.prototype.tryNextSignal = function (e) {
        this.tryingNexitSignal = !0;
        var t = this.streamId,
            r = this.signal.server,
            i = this.streamCenter.playerList[t],
            o = [];
        i && i.serverUrls && (o = i.serverUrls), this.nextSignalTryCount > 3 * o.length ? (this.logger.error("zp.tns.1 try max limit"), this.playStateUpdateError(e, !0)) : (o.forEach(function (e, t) {
          return t <= o.indexOf(r) && o.push(e);
        }), o.splice(0, o.indexOf(r) + 1), this.logger.info("zp.tns.1 try next signal " + t), this.signal && this.signal.state == s.ENUM_CONNECT_STATE.connected && this.signal.sendCloseSession(n.getSeq(), this.sessionId, 1), this.signal && this.signal.removeSession(this.sessionId), this.resetPlay(), this.streamCenter.connectPlayServer(t), this.nextSignalTryCount++);
      }, e.prototype.startSoundLevel = function () {
        var e = this;

        if (this.logger.info("zp.ssl.1 call streamID: " + this.streamId), this.remoteStream && 0 != this.remoteStream.getAudioTracks().length) {
          this.script && this.script.disconnect() && (this.script = null), this.mic && this.mic.disconnect() && (this.mic = null), this.ac && this.ac.close() && (this.ac = null);

          try {
            this.ac = new ("undefined" != typeof webkitAudioContext ? webkitAudioContext : AudioContext)(), this.mic = this.ac.createMediaStreamSource(this.remoteVideo.srcObject), this.script = this.ac.createScriptProcessor(4096, 1, 1), this.mic.connect(this.script), this.script.connect(this.ac.destination), this.script.onaudioprocess = function (t) {
              for (var r = t.inputBuffer.getChannelData(0), i = 0, s = 0; s < r.length; s++) {
                i < r[s] && (i = r[s]);
              }

              e.soundLevel = 100 * i;
            };
          } catch (e) {
            this.logger.error("zp.ssl.1 get sound level failed " + e);
          }
        } else this.logger.info("zp.ssl.1 remote stream no found");
      }, e.prototype.stopSoundLevel = function () {
        this.logger.info("zp.ssl.1.1 call streamID: " + this.streamId), this.script && this.script.disconnect(), this.mic && this.mic.disconnect(), this.ac && this.ac.close(), this.script = null, this.mic = null, this.ac = null;
      }, e;
    }();

    t.ZegoPlayWeb = a;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = function () {
      function e(e, t) {
        this.playerList = {}, this.publisherList = {};
      }

      return e.prototype.setSessionInfo = function (e, t, r, i) {}, e;
    }();

    t.ZegoStreamCenter = i;
  }, function (e, t, r) {
    "use strict";

    var i,
        s = this && this.__extends || (i = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (e[r] = t[r]);
      }
    }, function (e, t) {
      function r() {
        this.constructor = e;
      }

      i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = r(18),
        o = r(0),
        a = r(1),
        c = r(19),
        l = r(20),
        d = r(21),
        h = r(23),
        u = r(24),
        p = r(25),
        g = function (e) {
      function t() {
        return e.call(this) || this;
      }

      return s(t, e), t.prototype.init = function () {
        this.bindSocketHandler(), this.bindStreamHandler(), this.bindHeatBeatHandler(), this.bindRoomHandler(), this.bindMessageHandler(), this.bindLiveHandler(), this.bindStreamCenterHandler();
      }, t.prototype.bindSocketHandler = function () {
        var e = this;
        this.socketCenter = new c.SocketCenter(this.logger, this.stateCenter), this.socketCenter.registerRouter("push_signal", function (t) {
          e.liveHandler.handlePushSignalMsg(t);
        }), this.socketCenter.getSocket = function (t) {
          return e.getSocket(t);
        }, this.socketCenter.handlePushKickout = function (t) {
          e.logger.info("zb.cm.bsh.0  call hpk"), e.roomHandler.setRunState(o.ENUM_RUN_STATE.logout), e.roomHandler.resetRoom(), e.onKickOut({
            code: o.sdkErrorList.KICK_OUT.code,
            msg: o.sdkErrorList.KICK_OUT.msg + t.body.reason
          }), e.logger.debug("zb.cm.bsh.0  call hpk success");
        }, this.socketCenter.handlePushCustomMsg = function (t) {
          e.messageHandler.handlePushCustomMsg(t);
        }, this.socketCenter.handlePushUserStateUpdateMsg = function (t) {
          e.roomHandler.handlePushUserStateUpdateMsg(t);
        }, this.socketCenter.handlePushRoomMsg = function (t) {
          e.onRecvRoomMsg(t.body.chat_data, t.body.server_msg_id, t.body.ret_msg_id);
        }, this.socketCenter.handlePushMergeMsg = function (t) {
          e.messageHandler.handlePushMergeMsg(t);
        }, this.socketCenter.handlePushTransMsg = function (t) {
          e.messageHandler.handlePushTransMsg(t);
        }, this.socketCenter.handleBigImMsgRsp = function (t) {
          e.messageHandler.handleBigImMsgRsp(t);
        };
      }, t.prototype.bindStreamHandler = function () {
        var e = this;
        this.streamHandler = new d.StreamHandler(this.logger, this.stateCenter, this.socketCenter), this.streamHandler.onStreamUpdated = function (t, r) {
          e.onStreamUpdated(t, r);
        }, this.streamHandler.onPublishStateUpdate = function (t, r, i) {
          var s = r;
          s.indexOf("zegotest-") >= 0 && (s = s.replace("zegotest-" + e.stateCenter.appid + "-", "")), e.onPublishStateUpdate(t, s, i);
        }, this.streamHandler.onStreamExtraInfoUpdated = function (t) {
          e.onStreamExtraInfoUpdated(t);
        }, this.streamHandler.setCDNInfo = function (t, r) {
          e.setCDNInfo(t, r);
        };
      }, t.prototype.bindHeatBeatHandler = function () {
        var e = this;
        this.heartBeatHandler = new h.HeartBeatHandler(this.logger, this.stateCenter, this.socketCenter), this.heartBeatHandler.onRecvReliableMessage = function (t, r, i) {
          e.onRecvReliableMessage(t, r, i);
        }, this.heartBeatHandler.handleFetchStreamListRsp = function (t) {
          e.streamHandler.handleFetchStreamListRsp(t);
        }, this.heartBeatHandler.fetchUserList = function () {
          e.roomHandler.fetchUserList();
        }, this.heartBeatHandler.onUpdateOnlineCount = function (t, r) {
          e.onUpdateOnlineCount(t, r);
        }, this.heartBeatHandler.updateStreamInfo = function (t, r, i, s) {
          void 0 === i && (i = ""), e.streamHandler.updateStreamInfo(t, r, i, s);
        }, this.heartBeatHandler.hbLogout = function (t) {
          e.onDisconnect(t);
        };
      }, t.prototype.bindRoomHandler = function () {
        var e = this;
        this.roomHandler = new l.RoomHandler(this.logger, this.stateCenter, this.socketCenter), this.roomHandler.loginSuccessCallBack = function (t, r) {
          var i = r.body.hearbeat_interval < o.MINIUM_HEARTBEAT_INTERVAL ? o.MINIUM_HEARTBEAT_INTERVAL : r.body.hearbeat_interval;
          e.stateCenter.tryHeartbeatCount = 0, e.stateCenter.heartbeatTimer && clearTimeout(e.stateCenter.heartbeatTimer), e.heartBeatHandler.start(i), e.heartBeatHandler.resetCheckMessage(), e.heartBeatHandler.startCheckMessageTimeout(), e.streamCenter.setSessionInfo(e.stateCenter.appid, e.stateCenter.idName, e.stateCenter.token, e.stateCenter.testEnvironment), r.body.anchor_info && e.onGetAnchorInfo(r.body.anchor_info.anchor_id_name, r.body.anchor_info.anchor_nick_name), r.body.online_count && e.onUpdateOnlineCount(e.stateCenter.roomid, r.body.online_count), e.logger.info("zb.cm.brh hls userStateUpdate " + e.stateCenter.userStateUpdate), e.stateCenter.userStateUpdate && (e.logger.info("zb.cm.brh hls fetch all new userlist"), e.roomHandler.fetchUserList()), e.streamHandler.handleStreamStart(t, r);
        }, this.roomHandler.onGetTotalUserList = function (t, r) {
          e.onGetTotalUserList(t, r);
        }, this.roomHandler.resetRoomCallBack = function () {
          e.heartBeatHandler.resetHeartbeat(), e.heartBeatHandler.resetCheckMessage(), e.resetStreamCenter();
        }, this.roomHandler.onUserStateUpdate = function (t, r) {
          e.onUserStateUpdate(t, r);
        }, this.roomHandler.onDisconnect = function (t) {
          e.onDisconnect(t);
        }, this.roomHandler.loginBodyData = function () {
          return e.loginBodyData();
        };
      }, t.prototype.bindMessageHandler = function () {
        var e = this;
        this.messageHandler = new u.MessageHandler(this.logger, this.stateCenter, this.socketCenter), this.messageHandler.onRecvCustomCommand = function (t, r, i) {
          e.onRecvCustomCommand(t, r, i);
        }, this.messageHandler.onRecvBigRoomMessage = function (t, r) {
          e.onRecvBigRoomMessage(t, r);
        }, this.messageHandler.onRecvReliableMessage = function (t, r, i) {
          e.onRecvReliableMessage(t, r, i);
        };
      }, t.prototype.bindLiveHandler = function () {
        var e = this;
        this.liveHandler = new p.LiveHandler(this.logger, this.stateCenter, this.socketCenter), this.liveHandler.onRecvEndJoinLiveCommand = function (t, r, i, s) {
          e.onRecvEndJoinLiveCommand(t, r, i, s);
        }, this.liveHandler.onRecvInviteJoinLiveRequest = function (t, r, i, s) {
          e.onRecvInviteJoinLiveRequest(t, r, i, s);
        }, this.liveHandler.onRecvJoinLiveRequest = function (t, r, i, s) {
          e.onRecvJoinLiveRequest(t, r, i, s);
        };
      }, t.prototype.bindStreamCenterHandler = function () {
        var e = this;
        this.streamCenter.onPlayStateUpdate = function (t, r, i) {
          e.onPlayStateUpdateHandle(t, r, i);
        }, this.streamCenter.onPlayQualityUpdate = function (t, r) {
          var i = t;
          i.indexOf("zegotest-") >= 0 && (i = i.replace("zegotest-" + e.stateCenter.appid + "-", "")), e.onPlayQualityUpdate(i, r);
        }, this.streamCenter.onPublishStateUpdate = function (t, r, i) {
          e.onPublishStateUpdateHandle(t, r, i);
        }, this.streamCenter.onPublishQualityUpdate = function (t, r) {
          e.onPublishQualityUpdate(t, r);
        }, this.streamCenter.onPlayerStreamUrlUpdate = function (t, r, i) {
          e.onStreamUrlUpdate(t, r, i);
        }, this.streamCenter.onVideoSizeChanged = function (t, r, i) {
          e.onVideoSizeChanged(t, r, i);
        }, this.streamCenter.onRemoteCameraStatusUpdate = function (t, r) {
          e.onRemoteCameraStatusUpdate(t, r);
        }, this.streamCenter.onRemoteMicStatusUpdate = function (t, r) {
          e.onRemoteMicStatusUpdate(t, r);
        }, this.streamCenter.onSoundLevelUpdate = function (t) {
          e.onSoundLevelUpdate(t);
        }, this.streamCenter.onDeviceError = function (t) {
          e.onDeviceError(t);
        }, this.streamCenter.OnAudioDeviceStateChanged = function (t) {
          e.OnAudioDeviceStateChanged(t);
        }, this.streamCenter.OnVideoDeviceStateChanged = function (t) {
          e.OnVideoDeviceStateChanged(t);
        };
      }, t.prototype.config = function (e) {
        return this.logger.debug("zb.cm.cf call"), a.ClientUtil.checkConfigParam(e, this.logger) ? (this.stateCenter.appid = e.appid, "string" == typeof e.server ? (this.stateCenter.server = e.server, this.stateCenter.serverBak = e.server) : Array.isArray(e.server) && e.server.length > 0 && (this.stateCenter.server = e.server[0], this.stateCenter.serverBak = e.server[1] || e.server[0]), this.logger.info("zb.cm.cf server " + JSON.stringify(e.server)), this.stateCenter.idName = e.idName, this.stateCenter.nickName = e.nickName, this.logger.setLogLevel(e.logLevel), !1 === e.audienceCreateRoom && (this.stateCenter.roomCreateFlag = 0), e.remoteLogLevel ? this.logger.setRemoteLogLevel(e.remoteLogLevel) : this.logger.setRemoteLogLevel(0), this.logger.setSessionInfo(e.appid, "", "", e.idName, "", o.PROTO_VERSION), e.logUrl && this.logger.openLogServer(e.logUrl), -1 == this.stateCenter.server.indexOf("test2-wsliveroom-api.zego.im") && -1 == this.stateCenter.server.indexOf("wsliveroom-test.zegocloud.com") && -1 == this.stateCenter.server.indexOf("wsliveroom-test.zego.im") || (this.stateCenter.testEnvironment = !0), this.stateCenter.configOK = !0, navigator && navigator.appVersion && this.logger.info("zb.cm.cf " + navigator.appVersion), this.logger.debug("zb.cm.cf call success"), !0) : (this.logger.error("zb.cm.cf param error"), !1);
      }, t.prototype.login = function (e, t, r, i, s) {
        "string" == typeof e ? "string" == typeof r ? 1 === t || 2 === t ? this.roomHandler.login(e, t, r, null, i, s) : this.logger.error("zb.rh.lg role error") : this.logger.error("zb.rh.lg token type error") : this.logger.error("zb.rh.lg roomid  type error");
      }, t.prototype.loginWithAuthor = function (e, t, r, i, s, n) {
        "string" != typeof e || "string" != typeof r || "string" != typeof i || 1 !== t && 2 !== t ? this.logger.error("zb.rh.lg params error") : this.roomHandler.login(e, t, r, i, s, n);
      }, t.prototype.logout = function () {
        return this.roomHandler.logout();
      }, t.prototype.setUserStateUpdate = function (e) {
        "boolean" == typeof e ? this.roomHandler.setUserStateUpdate(e) : console.error("setUserStateUpdate param error");
      }, t.prototype.onUserStateUpdate = function (e, t) {}, t.prototype.onGetTotalUserList = function (e, t) {}, t.prototype.onUpdateOnlineCount = function (e, t) {}, t.prototype.onGetAnchorInfo = function (e, t) {}, t.prototype.release = function () {
        this.logger.debug("zb.cm.rl call"), this.roomHandler.setRunState(o.ENUM_RUN_STATE.logout), this.roomHandler.resetRoom(), this.logger.stopLogServer(), this.logger.debug("zb.cm.rl call success");
      }, t.prototype.sendCustomCommand = function (e, t, r, i) {
        return "string" != typeof t && "object" != _typeof(t) ? (this.logger.error("zb.mh.scc params error"), !1) : this.messageHandler.sendCustomCommand(e, t, r, i);
      }, t.prototype.onRecvCustomCommand = function (e, t, r) {}, t.prototype.sendRoomMsg = function (e, t, r, i, s) {
        this.messageHandler.sendRoomMsg(e, t, r, i, s);
      }, t.prototype.onRecvRoomMsg = function (e, t, r) {}, t.prototype.sendReliableMessage = function (e, t, r, i) {
        this.messageHandler.sendReliableMessage(e, t, r, i);
      }, t.prototype.onRecvReliableMessage = function (e, t, r) {}, t.prototype.sendBigRoomMessage = function (e, t, r, i, s) {
        this.messageHandler.sendBigRoomMessage(e, t, r, i, s);
      }, t.prototype.onRecvBigRoomMessage = function (e, t) {}, t.prototype.sendRelayMessage = function (e, t, r, i) {
        this.messageHandler.sendRelayMessage(e, t, r, i);
      }, t.prototype.requestJoinLive = function (e, t, r, i) {
        return this.liveHandler.requestJoinLive(e, t, r, i);
      }, t.prototype.onRecvJoinLiveRequest = function (e, t, r, i) {}, t.prototype.inviteJoinLive = function (e, t, r, i) {
        return this.liveHandler.inviteJoinLive(e, t, r, i);
      }, t.prototype.onRecvInviteJoinLiveRequest = function (e, t, r, i) {}, t.prototype.endJoinLive = function (e, t, r) {
        return this.liveHandler.endJoinLive(e, t, r);
      }, t.prototype.onRecvEndJoinLiveCommand = function (e, t, r, i) {}, t.prototype.respondJoinLive = function (e, t, r, i) {
        return this.liveHandler.respondJoinLive(e, t, r, i);
      }, t.prototype.updateMixStream = function (e, t, r) {
        return this.streamHandler.updateMixStream(e, t, r);
      }, t.prototype.stopMixStream = function (e, t, r) {
        return this.streamHandler.stopMixStream(e, t, r);
      }, t.prototype.publishTarget = function (e, t, r) {
        return this.streamHandler.publishTarget(e, t, r);
      }, t.prototype.updateStreamExtraInfo = function (e, t) {
        return this.streamHandler.updateStreamExtraInfo(e, t);
      }, t.prototype.onStreamUrlUpdate = function (e, t, r) {}, t.prototype.onStreamUpdated = function (e, t) {}, t.prototype.onStreamExtraInfoUpdated = function (e) {}, t.prototype.onPlayStateUpdate = function (e, t, r) {}, t.prototype.onVideoSizeChanged = function (e, t, r) {}, t.prototype.onRemoteCameraStatusUpdate = function (e, t) {}, t.prototype.onRemoteMicStatusUpdate = function (e, t) {}, t.prototype.onPlayQualityUpdate = function (e, t) {}, t.prototype.onPublishStateUpdate = function (e, t, r) {}, t.prototype.onPublishQualityUpdate = function (e, t) {}, t.prototype.onSoundLevelUpdate = function (e) {}, t.prototype.onDeviceError = function (e) {}, t.prototype.OnAudioDeviceStateChanged = function (e) {}, t.prototype.OnVideoDeviceStateChanged = function (e) {}, t.prototype.onDisconnect = function (e) {}, t.prototype.onKickOut = function (e) {}, t.getCurrentVersion = function () {
        return o.PROTO_VERSION;
      }, t;
    }(n.Common);

    t.BaseCenter = g;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(2),
        n = function () {
      function e() {}

      return e.prototype.onPlayStateUpdateHandle = function (e, t, r) {
        1 == e && this.stopPlayingStream(t), this.onPlayStateUpdate(e, t, r);
      }, e.prototype.onPublishStateUpdateHandle = function (e, t, r) {
        var s = this;
        0 == e ? this.stateCenter.publishStreamList[t] && (this.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.tryPublish ? (this.stateCenter.publishStreamList[t].state = i.ENUM_PUBLISH_STREAM_STATE.update_info, this.streamHandler.updateStreamInfo(t, i.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[t].extra_info, function (e) {
          s.stateCenter.publishStreamList[t] && s.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (s.stateCenter.publishStreamList[t].state = i.ENUM_PUBLISH_STREAM_STATE.stop, s.onPublishStateUpdate(1, t, e), s.streamCenter.stopPlayingStream(t));
        })) : this.WebrtcOnPublishStateUpdateHandle(e, t, r)) : (this.onPublishStateUpdate(e, t, r), 1 == e && this.stopPublishingStream(t));
      }, e.prototype.resetStreamCenter = function () {
        if (this.stateCenter.customUrl && (this.stateCenter.customUrl = null), this.streamCenter.reset(), !this.socketCenter.isDisConnect()) for (var e in this.stateCenter.publishStreamList) {
          this.stateCenter.publishStreamList[e].state == i.ENUM_PUBLISH_STREAM_STATE.publishing && this.streamHandler.updateStreamInfo(e, i.ENUM_STREAM_SUB_CMD.liveEnd, this.stateCenter.publishStreamList[e].extra_info);
        }
      }, e.prototype.handleFetchWebRtcUrlRsp = function (e) {
        var t = e.body.stream_id,
            r = !1;
        if (e.body.urls && Array.isArray(e.body.urls) && e.body.urls.length > 0 ? r = !0 : this.logger.error("cb.cm.hfwur signal url is empty"), "push" === e.body.ptype) !r && this.onPublishStateUpdate(1, t, s.publishErrorList.DISPATCH_ERROR) && this.stopPublishingStream(t), this.stateCenter.publishStreamList[t] ? this.streamCenter.startPublishingStream(t, e.body.urls) : this.logger.error("cb.cm.hfwur no streamid to publish");else if ("pull" == e.body.ptype) {
          !r && this.onPlayStateUpdate(1, t, s.playErrorList.DISPATCH_ERROR) && this.stopPlayingStream(t);

          for (var i = !1, n = 0; n < this.stateCenter.streamList.length; n++) {
            if (this.stateCenter.streamList[n].stream_id === t) {
              i = !0;
              break;
            }
          }

          0 == i && this.logger.warn("cb.cm.hfwur cannot find stream, continue to play"), this.streamCenter.startPlayingStream(t, e.body.urls);
        }
      }, e;
    }();

    t.Common = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(1),
        n = function () {
      function e(e, t) {
        var r = this;
        this.cmdSeq = 0, this.responseRouters = {}, this.logger = e, this.stateCenter = t, this.responseRouters = {
          push_kickout: function push_kickout(e) {
            r.handlePushKickout(e);
          },
          push_custommsg: function push_custommsg(e) {
            r.handlePushCustomMsg(e);
          },
          push_im_chat: function push_im_chat(e) {
            r.handlePushRoomMsg(e);
          },
          push_userlist_update: function push_userlist_update(e) {
            r.handlePushUserStateUpdateMsg(e);
          },
          push_merge_message: function push_merge_message(e) {
            r.handlePushMergeMsg(e);
          },
          trans: function trans(e) {
            r.handleTransRsp(e);
          },
          push_trans: function push_trans(e) {
            r.handlePushTransMsg(e);
          }
        };
      }

      return e.prototype.handlePushKickout = function (e) {}, e.prototype.handlePushCustomMsg = function (e) {}, e.prototype.handlePushRoomMsg = function (e) {}, e.prototype.handlePushUserStateUpdateMsg = function (e) {}, e.prototype.handlePushMergeMsg = function (e) {}, e.prototype.handlePushTransMsg = function (e) {}, e.prototype.handleBigImMsgRsp = function (e) {}, e.prototype.handleTransRsp = function (e) {
        if (this.stateCenter.isLogin()) {
          if (0 == e.body.err_code) {
            var t = e.body.trans_type;
            this.stateCenter.transSeqMap[t] ? (this.stateCenter.transSeqMap[t].seq = e.body.trans_seq, this.logger.debug("zb.sc.htr trans " + t + " seq " + e.body.trans_seq)) : this.logger.error("zb.sc.htr cannot match send info");
          } else this.logger.error("zb.sc.htr trans send error " + e.body.err_code);
        } else this.logger.error("zb.sc.htr not login");
      }, e.prototype.handleBizChannelRspCallback = function (e, t) {
        0 === e.body.err_code ? null != t.success && t.success(e.header.seq, e.body.cmd, e.body.rsp_body) : null != t.error && t.error(e.body.err_code, e.header.seq, e.body.rsp_body);
      }, e.prototype.registerRouter = function (e, t) {
        this.responseRouters[e] = t;
      }, e.prototype.getSocket = function (e) {
        return null;
      }, e.prototype.getHeaderV2 = function (e) {
        return {
          Protocol: "req_v2",
          cmd: e,
          appid: this.stateCenter.appid,
          seq: ++this.cmdSeq,
          user_id: this.stateCenter.userid,
          session_id: this.stateCenter.sessionid || "",
          room_id: this.stateCenter.roomid || ""
        };
      }, e.prototype.getHeader = function (e) {
        return {
          Protocol: "req",
          cmd: e,
          appid: this.stateCenter.appid,
          seq: ++this.cmdSeq,
          user_id: this.stateCenter.userid,
          session_id: this.stateCenter.sessionid || "",
          room_id: this.stateCenter.roomid || ""
        };
      }, e.prototype.sendMessage = function (e, t, r, s) {
        if (this.logger.debug("zb.sc.sm call " + e), this.isDisConnect()) return this.logger.error("zb.sc.sm error  " + e + "websocket is disconnected"), -1;
        var n = "V1" === i.ROOMVERSION ? this.getHeader(e) : this.getHeaderV2(e),
            o = {
          header: n,
          body: t
        };

        if (null == r && (r = null), null == s && (s = null), null != r || null != s) {
          var a = {
            data: o,
            seq: n.seq,
            deleted: !1,
            time: Date.parse(new Date() + ""),
            success: r,
            error: s
          },
              c = this.stateCenter.sendCommandList.push(a);
          this.stateCenter.sendCommandMap[a.seq] = c;
        }

        return this.websocket.send(JSON.stringify(o)), this.logger.debug("zb.sc.sm success"), n.seq;
      }, e.prototype.sendCustomMessage = function (e, t, r, s) {
        if (this.logger.debug("zb.sc.scm call"), this.isDisConnect()) return this.logger.error("zb.sc.scm error"), !1;
        var n = "V1" === i.ROOMVERSION ? this.getHeader(e) : this.getHeaderV2(e),
            o = {
          header: n,
          body: t
        },
            a = JSON.stringify(o);
        null == r && (r = null), null == s && (s = null);
        var c = {
          data: o,
          seq: n.seq,
          deleted: !1,
          time: Date.parse(new Date() + ""),
          success: r,
          error: s
        },
            l = this.stateCenter.sendDataList.push(c);
        return this.stateCenter.sendDataMap[c.seq] = l, this.websocket.send(a), this.logger.debug("zb.sc.scm success seq: ", n.seq), !0;
      }, e.prototype.isDisConnect = function () {
        return !this.websocket || 1 !== this.websocket.readyState;
      }, e.prototype.closeSocket = function () {
        this.websocket && (this.logger.info("zb.sc.cs close websocket"), this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null);
      }, e.prototype.createSocket = function (e) {
        this.websocket = this.getSocket(e);
      }, e.prototype.openHandler = function (e) {
        this.websocket.onopen = e;
      }, e.prototype.closeHandler = function (e) {
        this.websocket.onclose = e;
      }, e.prototype.errorHandler = function () {
        var e = this;

        this.websocket.onerror = function (t) {
          e.logger.error("zb.sc.oe msg=" + JSON.stringify(t));
        };
      }, e.prototype.checkResponse = function (e) {
        return (e.header.appid !== this.stateCenter.appid || e.header.session_id !== this.stateCenter.sessionid || e.header.user_id !== this.stateCenter.userid || e.header.room_id !== this.stateCenter.roomid || this.stateCenter.runState !== i.ENUM_RUN_STATE.login) && (this.logger.error("zb.sc.crp check session fail."), !0);
      }, e.prototype.responseHandler = function () {
        var e = this;

        this.websocket.onmessage = function (t) {
          var r = JSON.parse(t.data);
          e.logger.info("zb.sc.ws.rph jsonmsg= ", r.header.cmd), e.logger.info("zb.sc.ws.rph jsonmsg= ", t.data), 0 !== r.body.err_code && r.body.err_message && e.logger.error("zb.sc.ws.rph cmd=" + r.header.cmd + ", err_code=" + r.body.err_code + ", err_message=" + r.body.err_message + " "), "login" !== r.header.cmd ? "logout" !== r.header.cmd ? e.stateCenter.isLogin() ? e.checkResponse(r) ? e.logger.error("zb.sc.ws.rph check session fail.") : (e.handleSendCommandMsgRsp(r), e.logger.info("zb.sc.ws.rph cmd=" + r.header.cmd + ",function=" + !!e.responseRouters[r.header.cmd]), e.responseRouters[r.header.cmd] && e.responseRouters[r.header.cmd](r)) : e.logger.warn("zb.sc.ws.rph  already logout") : e.responseRouters.logout(r, e.cmdSeq) : e.responseRouters.login(r, e.cmdSeq);
        };
      }, e.prototype.handleSendCommandMsgRsp = function (e) {
        this.logger.debug("zb.sc.hscmr call");
        var t,
            r = this.stateCenter.sendCommandMap[e.header.seq];
        null != r && ("login" == (t = r._data).data.header.cmd ? this.logger.debug("zb.sc.hscmr don't check " + t.data.header.cmd) : "relay" == t.data.header.cmd ? this.handleRelayRspCallback(e, t) : "bigim_chat" == t.data.header.cmd ? this.handleBigImRspCallback(e, t) : "biz_channel" == t.data.header.cmd ? this.handleBizChannelRspCallback(e, t) : 0 === e.body.err_code ? null != t.success && t.success(e.header.seq) : null != t.error && t.error(s.ClientUtil.getServerError(e.body.err_code), e.header.seq), delete this.stateCenter.sendCommandMap[e.header.seq], this.stateCenter.sendCommandList.remove(r)), this.logger.debug("zb.sc.hscmr call success");
      }, e.prototype.handleRelayRspCallback = function (e, t) {
        0 === e.body.err_code ? null != t.success && t.success(e.header.seq, e.body.relay_result) : null != t.error && t.error(s.ClientUtil.getServerError(e.body.err_code), e.header.seq);
      }, e.prototype.handleBigImRspCallback = function (e, t) {
        0 === e.body.err_code ? null != t.success && this.handleBigImMsgRsp(e) : null != t.error && t.error(s.ClientUtil.getServerError(e.body.err_code), e.header.seq);
      }, e;
    }();

    t.SocketCenter = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(1),
        n = function () {
      function e(e, t, r) {
        this.logger = e, this.socketCenter = r, this.stateCenter = t;
      }

      return e.prototype.setRunState = function (e) {
        this.logger.debug("zb.rh.srs old=" + this.stateCenter.runState + ", new=" + e), this.stateCenter.lastRunState = this.stateCenter.runState, this.stateCenter.runState = e;
      }, e.prototype.resetTryLogin = function () {
        this.logger.debug("zb.rh.rtl call"), clearTimeout(this.stateCenter.tryLoginTimer), this.stateCenter.tryLoginTimer = null, this.stateCenter.tryLoginCount = 0, this.logger.debug("zb.rh.rtl call success");
      }, e.prototype.resetBigRoomInfo = function () {
        this.stateCenter.transSeqMap = {}, this.stateCenter.realyMessageList = [], this.stateCenter.relayTimer && (clearTimeout(this.stateCenter.relayTimer), this.stateCenter.relayTimer = null), this.stateCenter.bigImLastTimeIndex = 0, this.stateCenter.bigIMmessageList = [], this.stateCenter.bigImCallbackMap = {}, this.stateCenter.bigImTimer && (clearTimeout(this.stateCenter.bigImTimer), this.stateCenter.bigImTimer = null), this.stateCenter.serverTimeOffset = 0, this.stateCenter.datiTimeWindow = 0, this.stateCenter.bigimTimeWindow = 0;
      }, e.prototype.resetRoom = function () {
        var e = this;

        if (this.logger.debug("zb.rh.rr call"), this.resetTryLogin(), this.resetRoomCallBack(), this.stateCenter.streamList = [], this.stateCenter.streamQuerying = !1, this.stateCenter.publishStreamList = {}, this.stateCenter.joinLiveCallbackMap = {}, this.stateCenter.joinLiveRequestMap = {}, this.stateCenter.streamUrlMap = {}, this.resetBigRoomInfo(), this.stateCenter.cmdCallback = {}, this.logger.debug("zb.rh.rr call send logout=", this.stateCenter.sessionid), "0" !== this.stateCenter.sessionid && this.stateCenter.runState !== i.ENUM_RUN_STATE.logout) {
          this.socketCenter.registerRouter("logout", function (t) {
            e.handleLogoutRsp(t);
          }), this.socketCenter.sendMessage("logout", {
            reserve: 0
          });
        }

        this.socketCenter.closeSocket(), this.setRunState(i.ENUM_RUN_STATE.logout), this.stateCenter.userid = "", this.stateCenter.sessionid = "", this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.sessionid, this.stateCenter.idName, this.stateCenter.nickName, i.PROTO_VERSION), this.logger.debug("zb.rh.rr call success");
      }, e.prototype.resetRoomCallBack = function () {}, e.prototype.onDisconnect = function (e) {}, e.prototype.loginSuccessCallBack = function (e, t) {}, e.prototype.onGetTotalUserList = function (e, t) {}, e.prototype.login = function (e, t, r, n, o, a) {
        if (this.logger.setSessionInfo(this.stateCenter.appid, e, "", "", this.stateCenter.nickName, i.PROTO_VERSION), this.logger.info("zb.rh.lg call:", e, r), n && (this.stateCenter.third_token = n), !this.stateCenter.configOK || !s.ClientUtil.checkLoginParam(e, r)) return this.logger.error("zb.rh.lg param error"), void a({
          code: "",
          msg: "param error"
        });
        this.stateCenter.runState !== i.ENUM_RUN_STATE.logout && (this.logger.debug("zb.rh.lg reset"), this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom()), this.logger.debug("zb.rh.lg begin"), this.setRunState(i.ENUM_RUN_STATE.trylogin), this.stateCenter.roomid = e, this.stateCenter.token = r, this.stateCenter.role = t, s.ClientUtil.registerCallback("login", {
          success: o,
          error: a
        }, this.stateCenter.callbackList), this.resetTryLogin(), this.tryLogin(), this.logger.info("zb.rh.lg call success");
      }, e.prototype.loginBodyData = function () {
        return null;
      }, e.prototype.tryLogin = function () {
        var e = this;

        if (this.logger.debug("zb.rh.tl call"), this.stateCenter.runState === i.ENUM_RUN_STATE.trylogin) {
          if (++this.stateCenter.tryLoginCount > i.MAX_TRY_LOGIN_COUNT) {
            this.logger.error("zb.rh.tl fail times limit");
            var t = this.stateCenter.lastRunState;
            return this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom(), void (t == i.ENUM_RUN_STATE.login ? (this.logger.error("zb.rh.tl fail and disconnect"), this.onDisconnect(i.sdkErrorList.LOGIN_DISCONNECT)) : (this.logger.info("zb.rh.tl fail and callback user"), s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(i.sdkErrorList.LOGIN_TIMEOUT)));
          }

          if (this.stateCenter.startConnceTime = new Date().getTime(), console.warn("start connect", this.stateCenter.startConnceTime), this.socketCenter.isDisConnect()) {
            this.logger.debug("zb.rh.tl need new websocket");

            try {
              this.socketCenter.closeSocket(), this.logger.debug("zb.rh.tl new websocket"), this.socketCenter.createSocket(this.stateCenter.tryLoginCount % 2 == 1 ? this.stateCenter.server : this.stateCenter.serverBak), this.socketCenter.registerRouter("login", function (t, r) {
                e.handleLoginRsp(t, r);
              }), this.socketCenter.closeHandler(function (t) {
                e.socketCenter.closeSocket(), e.closeHandler(t);
              }), this.socketCenter.openHandler(function () {
                e.openHandler();
              });
            } catch (e) {
              this.logger.error("zb.rh.tl websocket err:" + e);
            }
          } else {
            var r = this.loginBodyData();
            this.logger.info("zb.rh.tl use current websocket and sent login"), this.socketCenter.sendMessage("login", r);
          }

          this.stateCenter.tryLoginTimer = setTimeout(function () {
            e.tryLogin();
          }, i.TRY_LOGIN_INTERVAL[this.stateCenter.tryLoginCount % i.MAX_TRY_LOGIN_COUNT]), this.logger.info("zb.rh.tl call success");
        } else this.logger.error("zb.rh.tl state error");
      }, e.prototype.handleLoginRsp = function (e, t) {
        if (this.logger.debug("zb.rh.hlr call"), this.stateCenter.runState === i.ENUM_RUN_STATE.trylogin) {
          if (e.header.seq === t) return 0 !== e.body.err_code ? (this.handleLoginFail(e), void this.logger.error("zb.rh.hlr server error=", e.body.err_code)) : (this.handleLoginSuccess(e), void this.logger.info("zb.rh.hlr call success."));
          this.logger.error("zb.rh.hlr in wrong seq, local=", t, ",recv=", e.header.seq);
        } else this.logger.error("zb.rh.hlr state error");
      }, e.prototype.handleLoginFail = function (e) {
        if (this.logger.debug("zb.rh.hlf call"), s.ClientUtil.isKeepTryLogin(e.body.err_code)) this.logger.warn("zb.rh.hlf KeepTry true");else {
          var t = this.stateCenter.lastRunState;
          this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom();
          var r = s.ClientUtil.getServerError(e.body.err_code);
          t === i.ENUM_RUN_STATE.login ? (this.logger.info("zb.rh.hlf callback disconnect"), this.onDisconnect(r)) : (this.logger.info("zb.rh.hlf callback error"), s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(r)), this.logger.debug("zb.rh.hlf call success");
        }
      }, e.prototype.handleLoginSuccess = function (e) {
        this.stateCenter.startloginSucTime = new Date().getTime(), console.warn("login suc", this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime), this.logger.info("zb.rh.hls call");
        var t = this.stateCenter.lastRunState;

        if (this.setRunState(i.ENUM_RUN_STATE.login), this.stateCenter.userid = e.body.user_id, this.stateCenter.sessionid = e.body.session_id, this.stateCenter.anchor_info = e.body.anchor_info || this.stateCenter.anchor_info, this.stateCenter.userListInterval = e.body.userlist_interval || this.stateCenter.userListInterval, this.stateCenter.userListMergeInterval = e.body.userlist_merge_timeout || this.stateCenter.userListMergeInterval, this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.sessionid, this.stateCenter.idName, this.stateCenter.nickName, i.PROTO_VERSION), e.body.config_info && (this.logger.setRemoteLogLevel(e.body.config_info.log_level), "" != e.body.config_info.log_url && this.logger.openLogServer(e.body.config_info.log_url)), null != e.body.ret_timestamp && "string" == typeof e.body.ret_timestamp) {
          var r = parseFloat(e.body.ret_timestamp);
          this.stateCenter.serverTimeOffset = 0 == r ? 0 : e.body.ret_timestamp - new Date().getTime();
        }

        e.body.bigim_time_window && "number" == typeof e.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = e.body.bigim_time_window), e.body.dati_time_window && "number" == typeof e.body.dati_time_window && (this.stateCenter.datiTimeWindow = e.body.dati_time_window), e.body.cluster_env && 1 === e.body.cluster_env && (this.stateCenter.testEnvironment = !0), this.resetTryLogin(), this.loginSuccessCallBack(t, e);
      }, e.prototype.openHandler = function () {
        this.logger.info("zb.rh.oh websocket.onpen call"), this.socketCenter.responseHandler();
        var e = this.loginBodyData();
        this.logger.info("zb.rh.oh websocket.onpen send login"), this.stateCenter.startloginTime = new Date().getTime(), console.warn("start login", this.stateCenter.startloginTime, this.stateCenter.startloginTime - this.stateCenter.startConnceTime), this.socketCenter.sendMessage("login", e), this.logger.debug("zb.rh.oh websocket.onpen call success");
      }, e.prototype.closeHandler = function (e) {
        this.logger.info("zb.rh.ws.oc room websocket close " + JSON.stringify(e.code)), this.stateCenter.runState !== i.ENUM_RUN_STATE.logout ? this.stateCenter.runState === i.ENUM_RUN_STATE.trylogin && this.stateCenter.tryLoginCount <= i.MAX_TRY_LOGIN_COUNT ? this.logger.info("zb.rh.ws.oc is called because of try login") : this.stateCenter.runState === i.ENUM_RUN_STATE.login ? (this.logger.info("zb.rh.ws.oc is called because of network broken, try again"), this.setRunState(i.ENUM_RUN_STATE.trylogin), this.resetTryLogin(), this.tryLogin()) : (this.logger.error("zb.rh.ws.oc out of think!!!"), this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom(), this.onDisconnect(i.sdkErrorList.UNKNOWN)) : this.logger.info("zb.rh.ws.oc onclose logout flow call websocket.close");
      }, e.prototype.logout = function () {
        return this.logger.debug("zb.rh.lo call"), this.stateCenter.runState === i.ENUM_RUN_STATE.logout ? (this.logger.warn("zb.rh.lo at logout"), !1) : (this.resetRoom(), this.logger.info("zb.rh.lo call success"), !0);
      }, e.prototype.setUserStateUpdate = function (e) {
        return this.logger.debug("zb.rh.su call"), "boolean" != typeof e ? (this.logger.info("zb.rh.su param error"), !1) : (this.stateCenter.userStateUpdate = e, this.logger.info("zb.rh.su call success " + e), !0);
      }, e.prototype.fetchUserList = function () {
        this.logger.debug("zb.rh.ful call"), this.stateCenter.userQuerying ? this.logger.warn("zb.rh.ful is already querying") : (this.stateCenter.userQuerying = !0, this.stateCenter.userTempList = [], "V1" === i.ROOMVERSION ? this.fetchUserListWithPage(0) : this.fetchUserListWithPageV2(0), this.logger.info("zb.rh.ful the first time call"));
      }, e.prototype.fetchUserListWithPageV2 = function (e) {
        var t = this;
        this.logger.debug("zb.rh.fulwp call"), this.socketCenter.registerRouter("user_list_v2", function (r) {
          t.handleFetchUserListRspV2(e, r);
        }), this.socketCenter.sendMessage("user_list_v2", {
          marker: 0 === e ? "" : e + "",
          mode: 0,
          limit: 100
        }), this.logger.info("zb.rh.fulwp call success");
      }, e.prototype.fetchUserListWithPage = function (e) {
        var t = this;
        this.logger.debug("zb.rh.fulwp call"), this.socketCenter.registerRouter("user_list", function (e) {
          t.handleFetchUserListRsp(e);
        }), this.socketCenter.sendMessage("user_list", {
          user_index: e,
          sort_type: 0
        }), this.logger.info("zb.rh.fulwp call success");
      }, e.prototype.handleFetchUserListRspV2 = function (e, t) {
        if (this.logger.debug("zb.rh.hfulr call"), 0 != t.body.err_code) return this.stateCenter.userQuerying = !1, this.stateCenter.lastUserQueryTime = Date.now() + this.stateCenter.userListInterval, void this.logger.info("zb.rh.hfulr fetch error " + t.body.err_code);

        if (this.stateCenter.userStateUpdate) {
          if (this.stateCenter.userTempList = this.stateCenter.userTempList.concat(t.body.user_baseinfos), e != t.body.marker) return this.logger.warn("zb.rh.hfulr fetch another page"), void this.fetchUserListWithPageV2(e + 1);
          this.stateCenter.userSeq = t.body.server_user_seq, this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);

          for (var r = [], i = 0; i < this.stateCenter.userTempList.length; i++) {
            var s = {
              idName: this.stateCenter.userTempList[i].id_name,
              nickName: this.stateCenter.userTempList[i].nick_name,
              role: this.stateCenter.userTempList[i].role
            };
            r.push(s);
          }

          this.stateCenter.userQuerying = !1, this.stateCenter.lastUserQueryTime = Date.now() + this.stateCenter.userListInterval, this.onGetTotalUserList(this.stateCenter.roomid, r), this.stateCenter.userTempList = [], this.logger.info("zb.rh.hfulr call success user_list " + r + " count " + r.length);
        }
      }, e.prototype.handleFetchUserListRsp = function (e) {
        if (this.logger.debug("zb.rh.hfulr call"), 0 != e.body.err_code) return this.stateCenter.userQuerying = !1, this.stateCenter.lastUserQueryTime = Date.now() + this.stateCenter.userListInterval, void this.logger.info("zb.rh.hfulr fetch error " + e.body.err_code);

        if (this.stateCenter.userStateUpdate) {
          this.stateCenter.userTempList = this.stateCenter.userTempList.concat(e.body.user_baseinfos);
          var t = e.body.ret_user_index;
          if (t != e.body.server_user_index) return this.logger.warn("zb.rh.hfulr fetch another page"), void this.fetchUserListWithPage(t + 1);
          this.stateCenter.userSeq = e.body.server_user_seq, this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);

          for (var r = [], i = 0; i < this.stateCenter.userTempList.length; i++) {
            var s = {
              idName: this.stateCenter.userTempList[i].id_name,
              nickName: this.stateCenter.userTempList[i].nick_name,
              role: this.stateCenter.userTempList[i].role
            };
            r.push(s);
          }

          this.stateCenter.userQuerying = !1, this.stateCenter.lastUserQueryTime = Date.now() + this.stateCenter.userListInterval, this.onGetTotalUserList(this.stateCenter.roomid, r), this.stateCenter.userTempList = [], this.logger.info("zb.rh.hfulr call success user_list " + r + " count " + r.length);
        }
      }, e.prototype.handleLogoutRsp = function (e) {
        this.logger.debug("zb.rh.hlor result=", e.body.err_code);
      }, e.prototype.handlePushUserStateUpdateMsg = function (e) {
        if (this.logger.info("zb.rh.hpus call"), this.stateCenter.isLogin()) {
          if (this.stateCenter.userStateUpdate) {
            if (this.stateCenter.userSeq + e.body.user_actions.length === e.body.user_list_seq) {
              this.stateCenter.userSeq = e.body.user_list_seq, this.logger.debug("zb.rh.hpus push userSeq " + this.stateCenter.userSeq);

              for (var t = [], r = 0; r < e.body.user_actions.length; r++) {
                var i = {
                  action: e.body.user_actions[r].Action,
                  idName: e.body.user_actions[r].IdName,
                  nickName: e.body.user_actions[r].NickName,
                  role: e.body.user_actions[r].Role,
                  loginTime: e.body.user_actions[r].LoginTime
                };
                t.push(i);
              }

              this.onUserStateUpdate(e.body.room_id, t), this.logger.info("zb.rh.hpus call success");
            } else this.mergeUserByUserSeq(e.body.user_list_seq, e.body.user_actions);
          } else this.logger.info("zb.rh.hpus no userStateUpdate flag");
        } else this.logger.error("zb.rh.hpus not login");
      }, e.prototype.onUserStateUpdate = function (e, t) {}, e.prototype.mergeUserByUserSeq = function (e, t) {
        var r = this;
        this.stateCenter.userSeqMergeMap || (this.logger.warn("zb.rh.hpus new merge userlist " + this.stateCenter.userSeq + " server " + e), this.stateCenter.userSeqMergeMap = {}, this.stateCenter.userSeqMergeTimer && clearTimeout(this.stateCenter.userSeqMergeTimer), this.stateCenter.userSeqMergeTimer = setTimeout(function () {
          var e = Object.keys(r.stateCenter.userSeqMergeMap).map(function (e) {
            return +e;
          }).sort(function (e, t) {
            return e - t;
          });
          if (e[e.length - 1] - e[0] + 1 === e.length) r.mergeUser(e);else {
            r.stateCenter.userSeqMergeMap = null;
            var t = r.stateCenter.lastUserQueryTime - Date.now();
            r.logger.info("zb.rh.hpus fetch merge userlist " + r.stateCenter.userSeq + " userSeqList " + e.join(",") + " wait " + t), t > 0 ? (r.stateCenter.userQueryTimer && clearTimeout(r.stateCenter.userQueryTimer), r.stateCenter.userQueryTimer = setTimeout(function () {
              r.fetchUserList();
            }, t)) : r.fetchUserList();
          }
        }, this.stateCenter.userListMergeInterval)), this.logger.warn("zb.rh.hpus merge userlist " + this.stateCenter.userSeq + " server " + e + " userlist " + t.length), this.stateCenter.userSeqMergeMap[e] = t;
      }, e.prototype.mergeUser = function (e) {
        var t = this;
        this.logger.info("zb.rh.hpus merge userlist " + this.stateCenter.userSeq + " userSeqList " + e.join(",")), this.stateCenter.userSeq = e[e.length - 1];
        var r = {};
        e.forEach(function (e) {
          t.stateCenter.userSeqMergeMap[e].forEach(function (e) {
            r[e.IdName] = e;
          });
        }), this.stateCenter.userSeqMergeMap = null;
        var i = Object.values(r).map(function (e) {
          return {
            action: e.Action,
            idName: e.IdName,
            nickName: e.NickName,
            role: e.Role,
            loginTime: e.LoginTime ? String(e.LoginTime) : ""
          };
        });
        i.sort(function (e, t) {
          return e.loginTime.localeCompare(t.loginTime);
        }), this.onUserStateUpdate(this.stateCenter.roomid, i);
      }, e;
    }();

    t.RoomHandler = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(1),
        n = r(22),
        o = function () {
      function e(e, t, r) {
        this.logger = e, this.socketCenter = r, this.stateCenter = t;
      }

      return e.prototype.setCDNInfo = function (e, t) {}, e.prototype.onStreamUpdated = function (e, t) {}, e.prototype.onStreamExtraInfoUpdated = function (e) {}, e.prototype.handleStreamStart = function (e, t) {
        var r = this;
        if (this.stateCenter.streamQuerying = !1, this.socketCenter.registerRouter("stream", function (e) {
          r.handleStreamUpdateRsp(e);
        }), this.socketCenter.registerRouter("push_stream_update", function (e) {
          r.handlePushStreamUpdateMsg(e);
        }), e == i.ENUM_RUN_STATE.login) this.logger.info("zb.sh.hss recover from disconnect so call streamupdate"), this.handleFullUpdateStream(t.body.stream_seq, t.body.stream_info || []);else {
          this.logger.info("zb.sh.hss success callback user"), this.stateCenter.streamList = t.body.stream_info || [], this.stateCenter.streamSeq = t.body.stream_seq;

          for (var n = 0; n < this.stateCenter.streamList.length; n++) {
            this.stateCenter.streamList[n].anchor_id_name == this.stateCenter.idName && (this.updateStreamInfo(this.stateCenter.streamList[n].stream_id, i.ENUM_STREAM_SUB_CMD.liveEnd), this.stateCenter.streamList.splice(n--, 1));
          }

          var o = this.makeCallbackStreamList(this.stateCenter.streamList);
          s.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList)(o);
        }
      }, e.prototype.onPublishStateUpdate = function (e, t, r) {}, e.prototype.updateStreamInfo = function (e, t, r, i) {
        var s = this;
        void 0 === r && (r = ""), this.logger.debug("zb.sh.usi call");
        var n = {
          stream_id: e,
          extra_info: r
        },
            o = {
          sub_cmd: t,
          stream_msg: JSON.stringify(n)
        };
        this.socketCenter.registerRouter("stream", function (e) {
          s.handleStreamUpdateRsp(e);
        }), this.socketCenter.sendMessage("stream", o, void 0, i), this.logger.info("zb.sh.usi call success cmd " + t);
      }, e.prototype.handleStreamUpdateRsp = function (e) {
        if (this.stateCenter.isLogin()) {
          if (0 == e.body.err_code) {
            this.logger.info("zb.sh.hsur stream seq " + this.stateCenter.streamSeq + " server seq " + e.body.stream_seq), this.stateCenter.streamSeq = e.body.stream_seq;

            for (var t = 0; t < e.body.stream_info.length; t++) {
              var r = e.body.stream_info[t].stream_id;
              if (!this.stateCenter.publishStreamList[r]) return void this.logger.info("hsur.0 stream is not exist");
              this.stateCenter.publishStreamList[r].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[r].state = i.ENUM_PUBLISH_STREAM_STATE.publishing, this.onPublishStateUpdate(0, r, 0));
            }
          } else this.logger.error("zb.sh.hsur stream update error " + e.body.err_code);
        } else this.logger.error("zb.sh.hsur not login");
      }, e.prototype.handleFetchStreamListRsp = function (e) {
        this.logger.info("zb.sh.hfslr call"), this.stateCenter.streamQuerying = !1, 0 === e.body.err_code ? this.stateCenter.streamSeq !== e.body.stream_seq ? (this.handleFullUpdateStream(e.body.stream_seq, e.body.stream_info), this.logger.debug("zb.sh.hfslr call success")) : this.logger.info("zb.sh.hfslr same seq") : this.logger.info("zb.sh.hfslr server error=", e.body.err_code);
      }, e.prototype.handleFullUpdateStream = function (e, t) {
        var r = this;
        this.logger.debug("zb.sh.hfus call"), this.stateCenter.streamSeq = e, this.logger.debug("zb.sh.hfus server seq " + this.stateCenter.streamSeq), s.ClientUtil.mergeStreamList(this.logger, this.stateCenter.idName, this.stateCenter.streamList, t, function (e, t, s) {
          0 !== e.length && (r.logger.debug("zb.sh.hfus callback addstream"), r.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.added, r.makeCallbackStreamList(e))), 0 !== t.length && (r.logger.debug("zb.sh.hfus callback delstream"), r.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.deleted, r.makeCallbackStreamList(t))), 0 !== s.length && (r.logger.debug("zb.sh.hfus callback updatestream"), r.onStreamExtraInfoUpdated(r.makeCallbackStreamList(s)));
        }), this.logger.info("zb.sh.hfus call success");
      }, e.prototype.handlePushStreamUpdateMsg = function (e) {
        if (this.logger.info("zb.sh.hpsum call"), e.body.stream_info && 0 !== e.body.stream_info.length) {
          if (e.body.stream_info.length + this.stateCenter.streamSeq !== e.body.stream_seq) return this.logger.info("zb.sh.hpsum call updatestream"), void this.fetchStreamList();

          switch (this.stateCenter.streamSeq = e.body.stream_seq, e.body.stream_cmd) {
            case i.ENUM_STREAM_UPDATE_CMD.added:
              this.handleAddedStreamList(e.body.stream_info);
              break;

            case i.ENUM_STREAM_UPDATE_CMD.deleted:
              this.handleDeletedStreamList(e.body.stream_info);
              break;

            case i.ENUM_STREAM_UPDATE_CMD.updated:
              this.handleUpdatedStreamList(e.body.stream_info);
          }

          this.logger.info("zb.sh.hpsum call success");
        } else this.logger.info("zb.sh.hpsum, emtpy list");
      }, e.prototype.handleAddedStreamList = function (e) {
        this.logger.debug("zb.sh.hasl call");

        for (var t, r = [], s = 0; s < e.length; s++) {
          if (e[s].anchor_id_name != this.stateCenter.idName) {
            t = !1;

            for (var n = 0; n < this.stateCenter.streamList.length; n++) {
              if (e[s].stream_id === this.stateCenter.streamList[n].stream_id) {
                t = !0;
                break;
              }
            }

            t || r.push(e[s]);
          } else this.logger.debug("hdsl.0 have self stream added");
        }

        if (0 !== r.length) {
          this.logger.debug("zb.sh.hasl callback addstream");

          for (var o = 0; o < r.length; o++) {
            this.stateCenter.streamList.push(r[o]);
          }

          this.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(r));
        }

        this.logger.info("zb.sh.hasl call success");
      }, e.prototype.handleDeletedStreamList = function (e) {
        this.logger.debug("zb.sh.hdsl call");

        for (var t = [], r = 0; r < e.length; r++) {
          if (e[r].anchor_id_name != this.stateCenter.idName) {
            for (var s = this.stateCenter.streamList.length - 1; s >= 0; s--) {
              if (e[r].stream_id === this.stateCenter.streamList[s].stream_id) {
                this.stateCenter.streamList.splice(s, 1), t.push(e[r]);
                break;
              }
            }
          } else this.logger.debug("zb.sh.hdsl have self stream deleted");
        }

        0 !== t.length && (this.logger.debug("zb.sh.hdsl callback delstream"), this.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(t))), this.logger.info("zb.sh.hdsl call");
      }, e.prototype.handleUpdatedStreamList = function (e) {
        this.logger.debug("zb.sh.husl call");

        for (var t = [], r = 0; r < e.length; r++) {
          if (e[r].anchor_id_name != this.stateCenter.idName) {
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
              if (e[r].stream_id === this.stateCenter.streamList[i].stream_id) {
                e[r].extra_info !== this.stateCenter.streamList[i].extra_info && (this.stateCenter.streamList[i] = e[r], t.push(e[r]));
                break;
              }
            }
          } else this.logger.debug("hsul.0 have self stream updated");
        }

        0 !== t.length && (this.logger.debug("zb.sh.husl callback updatestream"), this.onStreamExtraInfoUpdated(this.makeCallbackStreamList(t))), this.logger.info("zb.sh.husl call success");
      }, e.prototype.fetchStreamList = function () {
        if (this.logger.info("zb.sh.fsl call"), this.stateCenter.isLogin()) {
          if (this.stateCenter.streamQuerying) this.logger.info("zb.sh.fsl already doing");else {
            this.stateCenter.streamQuerying = !0, this.logger.debug("zb.sh.fsl send fetch request");
            this.socketCenter.registerRouter("stream_info", this.handleFetchStreamListRsp.bind(this)), this.socketCenter.sendMessage("stream_info", {
              reserve: 0
            }), this.logger.debug("zb.sh.fsl call success");
          }
        } else this.logger.info("zb.sh.fsl state error");
      }, e.prototype.makeCallbackStreamList = function (e) {
        var t = [];
        if (e && e.length > 0) for (var r = 0; r < e.length; r++) {
          var i = {
            anchor_id_name: e[r].anchor_id_name,
            stream_gid: e[r].stream_gid,
            anchor_nick_name: e[r].anchor_nick_name,
            extra_info: e[r].extra_info,
            stream_id: e[r].stream_id,
            urls_flv: "",
            urls_rtmp: "",
            urls_hls: "",
            urls_https_flv: "",
            urls_https_hls: ""
          };
          this.setCDNInfo(i, e[r]), t.push(i);
        }
        return t;
      }, e.prototype.updateMixStream = function (e, t, r) {
        var n = this;
        if (this.logger.info("zb.sh.ums call"), null == e.outputStreamId && null == e.outputUrl) return this.logger.error("zb.sh.ums no mix stream info"), !1;
        if (0 == e.streamList.length) return this.logger.error("zb.sh.ums no input stream"), !1;
        var o = {
          id_name: this.stateCenter.idName,
          live_channel: this.stateCenter.roomid,
          appid: this.stateCenter.appid,
          version: i.PROTO_VERSION
        };
        "string" == typeof e.userData && e.userData.length <= 1e4 && (o.UserData = e.userData);

        for (var a = [], c = 0; c < e.streamList.length; c++) {
          var l = e.streamList[c],
              d = l.streamId;
          this.stateCenter.testEnvironment && (d = "zegotest-" + this.stateCenter.appid + "-" + l.streamId), a.push({
            stream_id: d,
            rect: {
              layer: c,
              top: l.top,
              left: l.left,
              bottom: l.bottom,
              right: l.right
            }
          });
        }

        o.MixInput = a;
        var h = {};
        if (null != e.outputStreamId ? this.stateCenter.testEnvironment ? h.stream_id = "zegotest-" + this.stateCenter.appid + "-" + e.outputStreamId : h.stream_id = e.outputStreamId : null != e.outputUrl && (h.mixurl = e.outputUrl), !e.outputBitrate) return this.logger.error("zb.sh.ums no bitrate param"), !1;
        if (h.bitrate = e.outputBitrate, !e.outputFps) return this.logger.error("zb.sh.ums no fps param"), !1;
        if (h.fps = e.outputFps, !e.outputWidth) return this.logger.error("zb.sh.ums no width param"), !1;
        if (h.width = e.outputWidth, !e.outputHeight) return this.logger.error("zb.sh.ums no height param"), !1;

        if (h.height = e.outputHeight, e.outputAudioConfig && (h.audio_enc_id = e.outputAudioConfig), e.outputAudioBitrate && (h.audio_bitrate = e.outputAudioBitrate), e.outputAudioChannels && (h.audio_channel_cnt = e.outputAudioChannels), e.outputBgColor) {
          if ("number" != typeof e.outputBgColor) return this.logger.error("zb.sh.ums param outputBgColor error"), !1;
          o.output_bg_color = e.outputBgColor;
        }

        if (e.outputBgImage) {
          if ("string" != typeof e.outputBgImage || !e.outputBgImage.startsWith("preset-id://")) return this.logger.error("zb.sh.ums param outputBgImage error"), !1;
          o.output_bg_image = e.outputBgImage;
        }

        this.stateCenter.testEnvironment ? h.testenv = 1 : h.testenv = 0, o.MixOutput = [h], e.extraParams && (o.extra_params = e.extraParams);
        var u = {
          channel: "zeus",
          cmd: "start_mix",
          req_body: JSON.stringify(o)
        };
        return this.logger.debug("zb.sh.ums send command"), this.socketCenter.sendMessage("biz_channel", u, function (o, a, c) {
          n.logger.debug("zb.sh.ums receive message");
          var l = "zegotest-" + n.stateCenter.appid + "-";

          if (0 != c.length) {
            for (var d = JSON.parse(c), h = [], u = e.outputStreamId, p = 0; p < d.play.length; p++) {
              var g = {
                rtmpUrls: null,
                hlsUrls: null,
                flvUrls: null
              };
              n.stateCenter.testEnvironment && u && u.startsWith(l) && (u = u.slice(l.length)), d.play[p].rtmp_url && d.play[p].rtmp_url.length > 0 && (g.rtmpUrls = [d.play[p].rtmp_url]), d.play[p].hls_url && d.play[p].hls_url.length > 0 && (g.hlsUrls = [d.play[p].hls_url]), d.play[p].hdl_url && d.play[p].hdl_url.length > 0 && (g.flvUrls = [d.play[p].hdl_url]), h.push(g);
            }

            t && t(u, h);
          } else r && r(s.ClientUtil.getServerError(i.MIXSTREAM_ERROR_CODE + 1));
        }, function (e, t, o) {
          if ("number" == typeof e) {
            n.logger.debug("zb.sh.ums error: " + e);
            var a = [];
            if (1000000150 == e && 0 != o.length) for (var c = JSON.parse(o), l = "zegotest-" + n.stateCenter.appid + "-", d = 0; d < c.non_exist_streams.length; d++) {
              var h = c.non_exist_streams[d];
              n.stateCenter.testEnvironment && h.startsWith(l) ? a.push(h.slice(l.length)) : a.push(h);
            }
            r && r(s.ClientUtil.getServerError(i.MIXSTREAM_ERROR_CODE + e), a);
          } else n.logger.debug("zb.sh.ums error code " + e.code), r && r(e);
        }), !0;
      }, e.prototype.publishTarget = function (e, t, r) {
        var o = this;
        if (e.type && -1 != ["addpush", "delpush", "clearpush"].indexOf(e.type)) {
          if (this.logger.info("zb.sh.ptcall"), e.streamId && "string" == typeof e.streamId) {
            if (e.pushUrl && "string" == typeof e.pushUrl) {
              if (e.appSecret && "string" == typeof e.appSecret) {
                if (this.stateCenter.publishStreamList[e.streamId]) {
                  var a = Math.ceil(new Date().getTime() / 1e3),
                      c = e.streamId;
                  this.stateCenter.testEnvironment && (c = "zegotest-" + this.stateCenter.appid + "-" + e.streamId);
                  var l = {
                    appid: this.stateCenter.appid,
                    biz_type: 0,
                    timestamp: a,
                    signature: n(this.stateCenter.appid.toString() + a.toString() + e.appSecret),
                    seq: this.stateCenter.cdnSeq++,
                    version: 1 * i.PROTO_VERSION,
                    stream_id: c,
                    pushurl: e.pushUrl
                  },
                      d = {
                    channel: "media",
                    cmd: e.type,
                    req_body: JSON.stringify(l)
                  };
                  this.logger.debug("zb.sh.pt send command"), this.socketCenter.sendMessage("biz_channel", d, function (n, a, c) {
                    if (o.logger.debug("zb.sh.pt receive message"), 0 != c.length) {
                      var l = JSON.parse(c),
                          d = l.code,
                          h = l.message;
                      if (d && 0 != d) return o.logger.error("zb.sh.pt " + e.type + " error code: " + d + " " + h), void (r && r({
                        code: d,
                        message: h
                      }));
                      o.logger.info("zb.sh.pt " + e.type + " success"), t && t();
                    } else r && r(s.ClientUtil.getServerError(i.MIXSTREAM_ERROR_CODE + 1));
                  }, function (e, t, i) {
                    o.logger.debug("zb.sh.pt error: " + r);
                    var s = "";
                    2001 == e ? s = "invalid channel" : 2002 == e && (s = "bizchannel error"), r && r({
                      code: e,
                      message: s
                    });
                  });
                } else this.logger.error("zb.sh.pt publish stream no found");
              } else this.logger.error("zb.sh.pt appSecret error");
            } else this.logger.error("zb.sh.pt pushurl error");
          } else this.logger.error("zb.sh.pt streamid error");
        } else this.logger.error("zb.sh.pt cdn push type error");
      }, e.prototype.stopMixStream = function (e, t, r) {
        if (this.logger.info("zb.sh.sms call"), null == e.outputStreamId && null == e.outputUrl) return this.logger.error("zb.sh.sms outputStreamId and outputUrl at least one "), !1;
        var n = {
          id_name: this.stateCenter.idName,
          live_channel: this.stateCenter.roomid,
          appid: this.stateCenter.appid,
          version: i.PROTO_VERSION
        };
        null != e.outputStreamId ? this.stateCenter.testEnvironment ? n.stream_id = "zegotest-" + this.stateCenter.appid + "-" + e.outputStreamId : n.stream_id = e.outputStreamId : null != e.outputUrl && (n.mixurl = e.outputUrl);
        var o = {
          channel: "zeus",
          cmd: "stop_mix",
          req_body: JSON.stringify(n)
        };
        return this.socketCenter.sendMessage("biz_channel", o, function (e, r) {
          t && t();
        }, function (e, t) {
          "number" == typeof e ? r && r(s.ClientUtil.getServerError(i.MIXSTREAM_ERROR_CODE + e)) : r && r(e);
        }), !0;
      }, e.prototype.updateStreamExtraInfo = function (e, t) {
        return this.logger.info("zb.sh.usei call"), e ? "string" == typeof t && (this.stateCenter.publishStreamList[e] && (this.stateCenter.publishStreamList[e].extra_info = t, this.stateCenter.publishStreamList[e].state >= i.ENUM_PUBLISH_STREAM_STATE.update_info && this.updateStreamInfo(e, i.ENUM_STREAM_SUB_CMD.liveUpdate, t)), !0) : (this.logger.error("zb.sh.usei param error"), !1);
      }, e;
    }();

    t.StreamHandler = o;
  }, function (e, t, r) {
    var i;
    !function (s) {
      "use strict";

      function n(e, t) {
        var r = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r;
      }

      function o(e, t, r, i, s, o) {
        return n(function (e, t) {
          return e << t | e >>> 32 - t;
        }(n(n(t, e), n(i, o)), s), r);
      }

      function a(e, t, r, i, s, n, a) {
        return o(t & r | ~t & i, e, t, s, n, a);
      }

      function c(e, t, r, i, s, n, a) {
        return o(t & i | r & ~i, e, t, s, n, a);
      }

      function l(e, t, r, i, s, n, a) {
        return o(t ^ r ^ i, e, t, s, n, a);
      }

      function d(e, t, r, i, s, n, a) {
        return o(r ^ (t | ~i), e, t, s, n, a);
      }

      function h(e, t) {
        var r, i, s, o, h;
        e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
        var u = 1732584193,
            p = -271733879,
            g = -1732584194,
            f = 271733878;

        for (r = 0; r < e.length; r += 16) {
          p = d(p = d(p = d(p = d(p = l(p = l(p = l(p = l(p = c(p = c(p = c(p = c(p = a(p = a(p = a(p = a(s = p, g = a(o = g, f = a(h = f, u = a(i = u, p, g, f, e[r], 7, -680876936), p, g, e[r + 1], 12, -389564586), u, p, e[r + 2], 17, 606105819), f, u, e[r + 3], 22, -1044525330), g = a(g, f = a(f, u = a(u, p, g, f, e[r + 4], 7, -176418897), p, g, e[r + 5], 12, 1200080426), u, p, e[r + 6], 17, -1473231341), f, u, e[r + 7], 22, -45705983), g = a(g, f = a(f, u = a(u, p, g, f, e[r + 8], 7, 1770035416), p, g, e[r + 9], 12, -1958414417), u, p, e[r + 10], 17, -42063), f, u, e[r + 11], 22, -1990404162), g = a(g, f = a(f, u = a(u, p, g, f, e[r + 12], 7, 1804603682), p, g, e[r + 13], 12, -40341101), u, p, e[r + 14], 17, -1502002290), f, u, e[r + 15], 22, 1236535329), g = c(g, f = c(f, u = c(u, p, g, f, e[r + 1], 5, -165796510), p, g, e[r + 6], 9, -1069501632), u, p, e[r + 11], 14, 643717713), f, u, e[r], 20, -373897302), g = c(g, f = c(f, u = c(u, p, g, f, e[r + 5], 5, -701558691), p, g, e[r + 10], 9, 38016083), u, p, e[r + 15], 14, -660478335), f, u, e[r + 4], 20, -405537848), g = c(g, f = c(f, u = c(u, p, g, f, e[r + 9], 5, 568446438), p, g, e[r + 14], 9, -1019803690), u, p, e[r + 3], 14, -187363961), f, u, e[r + 8], 20, 1163531501), g = c(g, f = c(f, u = c(u, p, g, f, e[r + 13], 5, -1444681467), p, g, e[r + 2], 9, -51403784), u, p, e[r + 7], 14, 1735328473), f, u, e[r + 12], 20, -1926607734), g = l(g, f = l(f, u = l(u, p, g, f, e[r + 5], 4, -378558), p, g, e[r + 8], 11, -2022574463), u, p, e[r + 11], 16, 1839030562), f, u, e[r + 14], 23, -35309556), g = l(g, f = l(f, u = l(u, p, g, f, e[r + 1], 4, -1530992060), p, g, e[r + 4], 11, 1272893353), u, p, e[r + 7], 16, -155497632), f, u, e[r + 10], 23, -1094730640), g = l(g, f = l(f, u = l(u, p, g, f, e[r + 13], 4, 681279174), p, g, e[r], 11, -358537222), u, p, e[r + 3], 16, -722521979), f, u, e[r + 6], 23, 76029189), g = l(g, f = l(f, u = l(u, p, g, f, e[r + 9], 4, -640364487), p, g, e[r + 12], 11, -421815835), u, p, e[r + 15], 16, 530742520), f, u, e[r + 2], 23, -995338651), g = d(g, f = d(f, u = d(u, p, g, f, e[r], 6, -198630844), p, g, e[r + 7], 10, 1126891415), u, p, e[r + 14], 15, -1416354905), f, u, e[r + 5], 21, -57434055), g = d(g, f = d(f, u = d(u, p, g, f, e[r + 12], 6, 1700485571), p, g, e[r + 3], 10, -1894986606), u, p, e[r + 10], 15, -1051523), f, u, e[r + 1], 21, -2054922799), g = d(g, f = d(f, u = d(u, p, g, f, e[r + 8], 6, 1873313359), p, g, e[r + 15], 10, -30611744), u, p, e[r + 6], 15, -1560198380), f, u, e[r + 13], 21, 1309151649), g = d(g, f = d(f, u = d(u, p, g, f, e[r + 4], 6, -145523070), p, g, e[r + 11], 10, -1120210379), u, p, e[r + 2], 15, 718787259), f, u, e[r + 9], 21, -343485551), u = n(u, i), p = n(p, s), g = n(g, o), f = n(f, h);
        }

        return [u, p, g, f];
      }

      function u(e) {
        var t,
            r = "",
            i = 32 * e.length;

        for (t = 0; t < i; t += 8) {
          r += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        }

        return r;
      }

      function p(e) {
        var t,
            r = [];

        for (r[(e.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) {
          r[t] = 0;
        }

        var i = 8 * e.length;

        for (t = 0; t < i; t += 8) {
          r[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        }

        return r;
      }

      function g(e) {
        var t,
            r,
            i = "0123456789abcdef",
            s = "";

        for (r = 0; r < e.length; r += 1) {
          t = e.charCodeAt(r), s += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
        }

        return s;
      }

      function f(e) {
        return unescape(encodeURIComponent(e));
      }

      function m(e) {
        return function (e) {
          return u(h(p(e), 8 * e.length));
        }(f(e));
      }

      function v(e, t) {
        return function (e, t) {
          var r,
              i,
              s = p(e),
              n = [],
              o = [];

          for (n[15] = o[15] = void 0, 16 < s.length && (s = h(s, 8 * e.length)), r = 0; r < 16; r += 1) {
            n[r] = 909522486 ^ s[r], o[r] = 1549556828 ^ s[r];
          }

          return i = h(n.concat(p(t)), 512 + 8 * t.length), u(h(o.concat(i), 640));
        }(f(e), f(t));
      }

      function S(e, t, r) {
        return t ? r ? v(t, e) : function (e, t) {
          return g(v(e, t));
        }(t, e) : r ? m(e) : function (e) {
          return g(m(e));
        }(e);
      }

      void 0 === (i = function () {
        return S;
      }.call(t, r, t, e)) || (e.exports = i);
    }();
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(1),
        n = function () {
      function e(e, t, r) {
        this.logger = e, this.socketCenter = r, this.stateCenter = t;
      }

      return e.prototype.resetHeartbeat = function () {
        this.logger.debug("zb.hb.rht call"), this.stateCenter.heartbeatTimer && clearTimeout(this.stateCenter.heartbeatTimer), this.stateCenter.heartbeatTimer = null, this.stateCenter.tryHeartbeatCount = 0, this.logger.debug("zb.hb.rht call success");
      }, e.prototype.hbLogout = function (e) {}, e.prototype.start = function (e) {
        var t = this;

        if (this.logger.debug("zb.hb.sht call"), this.stateCenter.isLogin()) {
          if (++this.stateCenter.tryHeartbeatCount > 3) return this.logger.error("zb.hb.sht come to try limit"), void this.hbLogout(i.sdkErrorList.HEARTBEAT_TIMEOUT);
          this.logger.debug("zb.hb.sht send packet");
          this.socketCenter.registerRouter("hb", function (e) {
            t.handleHeartbeatRsp(e);
          }), this.socketCenter.sendMessage("hb", {
            reserve: 0
          }), this.logger.debug("zb.hb.sht call success"), this.stateCenter.heartbeatInterval = e, this.stateCenter.heartbeatTimer = setTimeout(function () {
            t.start(t.stateCenter.heartbeatInterval);
          }, this.stateCenter.heartbeatInterval);
        } else this.logger.error("zb.hb.sht state error");
      }, e.prototype.handleHeartbeatRsp = function (e) {
        if (this.logger.debug("zb.hb.hhbr call"), 0 !== e.body.err_code) return this.logger.error("zb.hb.hhbr call disconnect, server error=", e.body.err_code), void this.hbLogout(s.ClientUtil.getServerError(e.body.err_code));

        for (var t in this.stateCenter.tryHeartbeatCount = 0, this.stateCenter.heartbeatInterval = e.body.hearbeat_interval, this.stateCenter.heartbeatInterval < i.MINIUM_HEARTBEAT_INTERVAL && (this.stateCenter.heartbeatInterval = i.MINIUM_HEARTBEAT_INTERVAL), e.body.bigim_time_window && "number" == typeof e.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = e.body.bigim_time_window), e.body.dati_time_window && "number" == typeof e.body.dati_time_window && (this.stateCenter.datiTimeWindow = e.body.dati_time_window), this.ReliableMessageHandler(e), this.fetchStreamList(e), this.patchUserList(e), this.stateCenter.publishStreamList) {
          this.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (this.logger.info("zb.hb.hhbr try to update stream info"), this.updateStreamInfo(t, i.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[t].extra_info));
        }

        null != e.body.online_count && 0 != e.body.online_count && this.onUpdateOnlineCount(this.stateCenter.roomid, e.body.online_count), this.logger.debug("zb.hb.hhbr call success");
      }, e.prototype.ReliableMessageHandler = function (e) {
        var t = this;
        if (e.body.trans_seqs) for (var r = 0; r < e.body.trans_seqs.length; r++) {
          var i = e.body.trans_seqs[r].trans_channel,
              s = e.body.trans_seqs[r].trans_seq_array;
          (s = s.filter(function (e) {
            var r = e.trans_type,
                i = e.trans_seq;
            return !t.stateCenter.transSeqMap[r] || t.stateCenter.transSeqMap[r].seq !== i;
          })).length > 0 && this.fetchReliableMessage(i, s);
        }
      }, e.prototype.fetchReliableMessage = function (e, t) {
        var r = this;
        this.logger.debug("zb.hb.frm call");
        var i = {
          trans_channel: e,
          fetch_array: t
        };
        this.socketCenter.registerRouter("trans_fetch", function (e) {
          r.handleFetchTransRsp(e);
        }), this.socketCenter.sendMessage("trans_fetch", i), this.logger.debug("zb.hb.frm call success");
      }, e.prototype.handleFetchTransRsp = function (e) {
        var t = this;
        this.stateCenter.isLogin() ? 0 == e.body.err_code ? e.body.trans_fetch_results.forEach(function (e) {
          var r = e.trans_type,
              i = e.trans_seq;
          t.stateCenter.transSeqMap[r] = {
            seq: i
          }, e.trans_user_idname != t.stateCenter.idName && e.trans_idname != t.stateCenter.idName && t.onRecvReliableMessage(r, i, e.trans_data), t.logger.debug("zb.hb.hftr trans " + r + " seq " + i);
        }) : this.logger.error("zb.hb.hftr trans send error " + e.body.err_code) : this.logger.error("zb.hb.hftr not login");
      }, e.prototype.fetchStreamList = function (e) {
        var t = this;
        e.body.stream_seq !== this.stateCenter.streamSeq && (this.logger.debug("zb.hb.fsl current seq " + this.stateCenter.streamSeq + " server Seq " + e.body.stream_seq), this.logger.debug("zb.hb.fsl call"), this.stateCenter.isLogin() ? this.stateCenter.streamQuerying ? this.logger.warn("zb.hb.fsl already doing") : (this.stateCenter.streamQuerying = !0, this.logger.debug("zb.hb.fsl send fetch request"), this.socketCenter.registerRouter("stream_info", function (e) {
          t.handleFetchStreamListRsp(e);
        }), this.socketCenter.sendMessage("stream_info", {
          reserve: 0
        }), this.logger.debug("zb.hb.fsl call success")) : this.logger.error("zb.hb.fsl state error"));
      }, e.prototype.patchUserList = function (e) {
        var t = this;

        if (e.body.server_user_seq !== this.stateCenter.userSeq && this.stateCenter.userStateUpdate && !this.stateCenter.userSeqMergeMap) {
          var r = this.stateCenter.lastUserQueryTime - Date.now();
          this.logger.info("zb.hb.hhbr call update user " + this.stateCenter.userSeq + " server " + e.body.server_user_seq + " wait " + r), r > 0 ? (this.stateCenter.userQueryTimer && clearTimeout(this.stateCenter.userQueryTimer), this.stateCenter.userQueryTimer = setTimeout(function () {
            t.fetchUserList();
          }, r)) : this.fetchUserList();
        }
      }, e.prototype.handleFetchStreamListRsp = function (e) {}, e.prototype.fetchUserList = function () {}, e.prototype.updateStreamInfo = function (e, t, r, i) {
        void 0 === r && (r = "");
      }, e.prototype.onUpdateOnlineCount = function (e, t) {}, e.prototype.onRecvReliableMessage = function (e, t, r) {}, e.prototype.resetCheckMessage = function () {
        this.logger.debug("zb.hb.rcm call"), clearTimeout(this.stateCenter.sendDataCheckTimer), this.stateCenter.sendDataCheckTimer = null, this.checkSendMessageList(this.stateCenter.sendDataList), this.checkSendMessageList(this.stateCenter.sendCommandList), this.stateCenter.sendDataMap = {}, this.stateCenter.sendCommandMap = {}, this.logger.debug("zb.hb.rcm call success");
      }, e.prototype.checkSendMessageList = function (e) {
        for (var t = e.getFirst(); null != t;) {
          e.remove(t), t._data.error && (t._data.data.body.custom_msg ? t._data.error(i.sdkErrorList.SEND_MSG_TIMEOUT, t._data.data.header.seq, t._data.data.body.custom_msg) : t._data.error(i.sdkErrorList.SEND_MSG_TIMEOUT, t._data.data.header.seq)), t = e.getFirst();
        }
      }, e.prototype.checkMessageListTimeout = function (e, t) {
        for (var r = e.getFirst(), s = Date.parse(new Date() + ""), n = 0, o = 0, a = 0; !(null == r || r._data.time + this.stateCenter.sendDataTimeout > s || (delete t[r._data.data.header.seq], e.remove(r), ++o, null == r._data.error || this.stateCenter.sendDataDropTimeout > 0 && r._data.time + this.stateCenter.sendDataDropTimeout < s ? ++a : r._data.data.body.custom_msg ? r._data.error(i.sdkErrorList.SEND_MSG_TIMEOUT, r._data.data.header.seq, r._data.data.body.custom_msg) : r._data.error(i.sdkErrorList.SEND_MSG_TIMEOUT, r._data.data.header.seq), ++n >= this.stateCenter.sendDataCheckOnceCount));) {
          r = e.getFirst();
        }

        0 == o && 0 == a || this.logger.debug("zb.hb.cmt call success, stat: timeout=", o, "drop=", a);
      }, e.prototype.startCheckMessageTimeout = function () {
        var e = this;
        this.stateCenter.isLogin() ? (this.checkMessageListTimeout(this.stateCenter.sendDataList, this.stateCenter.sendDataMap), this.checkMessageListTimeout(this.stateCenter.sendCommandList, this.stateCenter.sendCommandMap), this.stateCenter.sendDataCheckTimer = setTimeout(function () {
          e.startCheckMessageTimeout();
        }, this.stateCenter.sendDataCheckInterval)) : this.logger.error("zb.hb.scmt state error");
      }, e;
    }();

    t.HeartBeatHandler = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(1),
        n = function () {
      function e(e, t, r) {
        this.logger = e, this.socketCenter = r, this.stateCenter = t;
      }

      return e.prototype.sendCustomCommand = function (e, t, r, i) {
        var n = this;
        if (this.logger.debug("zb.mh.scc call"), !this.stateCenter.isLogin()) return this.logger.error("zb.mh.scc state error"), !1;
        if (!e) return this.logger.error("zb.mh.scc dstMembers error"), !1;
        var o = {
          from_userid: this.stateCenter.idName,
          from_username: this.stateCenter.nickName,
          request_id: this.stateCenter.getRequestId(),
          custom_content: t || "",
          room_id: this.stateCenter.roomid
        },
            a = {
          dest_id_name: e,
          custom_msg: JSON.stringify(o)
        };
        return s.ClientUtil.checkCustomCommandParam(a) ? (this.socketCenter.registerRouter("custommsg", function (e) {
          n.handleSendCustomMsgRsp(e);
        }), this.socketCenter.sendCustomMessage("custommsg", a, r, i), this.logger.info("zb.mh.scc call success"), !0) : (this.logger.info("zb.mh.scc param error"), !1);
      }, e.prototype.handleSendCustomMsgRsp = function (e) {
        this.logger.debug("zb.mh.hscmrcall");
        var t,
            r = this.stateCenter.sendDataMap[e.header.seq];
        null != r ? ("custommsg" != (t = r._data).data.header.cmd ? this.logger.error("zb.mh.hscmrcmd wrong" + t.data.header.cmd) : 0 === e.body.err_code ? null != t.success && t.success(e.header.seq, t.data.body.custom_msg) : null != t.error && t.error(s.ClientUtil.getServerError(e.body.err_code), e.header.seq, t.data.body.custom_msg), delete this.stateCenter.sendDataMap[e.header.seq], this.stateCenter.sendDataList.remove(r)) : this.logger.error("zb.mh.hscmrno found seq=" + e.header.seq), this.logger.debug("zb.mh.hscmr  call success");
      }, e.prototype.handlePushCustomMsg = function (e) {
        var t = JSON.parse(e.body.custommsg);
        this.logger.debug("zb.mh.hpcm submsg=", t), this.onRecvCustomCommand(t.from_userid, t.from_username, t.custom_content);
      }, e.prototype.onRecvCustomCommand = function (e, t, r) {}, e.prototype.sendRoomMsg = function (e, t, r, s, n) {
        var o = this;

        if (this.logger.debug("zb.mh.srm call"), this.stateCenter.isLogin()) {
          var a = Date.parse(new Date() + "");
          if (this.stateCenter.sendRoomMsgTime > 0 && this.stateCenter.sendRoomMsgTime + this.stateCenter.SendRoomMsgInterval > a) return this.logger.info("zb.mh.srm freq error"), void (n && n(i.sdkErrorList.FREQ_LIMITED, 0, e, t, r));
          this.stateCenter.sendRoomMsgTime = a, this.logger.debug("zb.mh.srm send fetch request");
          var c = {
            msg_category: e,
            msg_type: t,
            msg_content: r
          };
          this.socketCenter.registerRouter("im_chat", function (e) {
            o.handleSendRoomMsgRsp(e);
          }), this.socketCenter.sendCustomMessage("im_chat", c, s, n), this.logger.info("zb.mh.srm call success");
        } else this.logger.error("zb.mh.srm state error");
      }, e.prototype.handleSendRoomMsgRsp = function (e) {
        this.logger.debug("zb.mh.hsrmr call");
        var t,
            r = this.stateCenter.sendDataMap[e.header.seq];
        null != r ? ("im_chat" != (t = r._data).data.header.cmd ? this.logger.error("zb.mh.hsrmr cmd wrong" + t.data.header.cmd) : 0 === e.body.err_code ? t.success && t.success(e.header.seq, e.body.msg_id, t.data.body.msg_category, t.data.body.msg_type, t.data.body.msg_content) : t.error && t.error(s.ClientUtil.getServerError(e.body.err_code), e.header.seq, t.data.body.msg_category, t.data.body.msg_type, t.data.body.msg_content), delete this.stateCenter.sendDataMap[e.header.seq], this.stateCenter.sendDataList.remove(r)) : this.logger.error("hzb.mh.hsrmr no found seq=" + e.header.seq), this.logger.info("zb.mh.hsrmr call success");
      }, e.prototype.onRecvRoomMsg = function (e, t, r) {}, e.prototype.sendReliableMessage = function (e, t, r, i) {
        this.logger.debug("zb.mh.srirm call"), this.stateCenter.transSeqMap[e] || (this.stateCenter.transSeqMap[e] = {
          seq: 0
        });
        var s = {
          trans_type: e,
          trans_data: t,
          trans_local_seq: this.stateCenter.transSeqMap[e].seq,
          trans_channel: "clt"
        };
        this.socketCenter.sendMessage("trans", s, r, i);
      }, e.prototype.sendBigRoomMessage = function (e, t, r, i, s) {
        var n = this;
        this.logger.debug("zb.mh.sbim call");
        var o = this.stateCenter.bigimTimeWindow,
            a = this.stateCenter.serverTimeOffset,
            c = new Date().getTime() + a,
            l = (++this.stateCenter.cmdSeq).toString();

        if (null == i && (i = null), null == s && (s = null), this.stateCenter.bigImCallbackMap[l] = {
          success: i,
          error: s
        }, 0 == o) {
          var d = {
            msg_category: e,
            msg_type: t,
            msg_content: r,
            bigmsg_client_id: l
          };
          this.logger.debug("zb.mh.sbim no time window"), this.sendBigRoomMessageInternal([d], function (e) {
            n.handleBigImMsgRsp(e);
          }, s);
        } else {
          var h = Math.floor(c / o);

          if (this.logger.debug("currentIndex " + h + " lastTimeIndex " + this.stateCenter.bigImLastTimeIndex), this.stateCenter.bigImLastTimeIndex < h && 0 == this.stateCenter.bigImMessageList.length) {
            this.stateCenter.bigImLastTimeIndex = h;
            var u = {
              msg_category: e,
              msg_type: t,
              msg_content: r,
              bigmsg_client_id: l
            };
            this.sendBigRoomMessageInternal([u], function (e) {
              n.handleBigImMsgRsp(e);
            }, s);
          } else this.stateCenter.bigImMessageList.push({
            msg_category: e,
            msg_type: t,
            msg_content: r,
            bigmsg_client_id: l
          }), 1 == this.stateCenter.bigImMessageList.length && this.setBigImTimer(a, o);
        }
      }, e.prototype.handlePushMergeMsg = function (e) {
        if (this.stateCenter.isLogin()) {
          for (var t = 0; t < e.body.messages.length; t++) {
            14001 === e.body.messages[t].sub_cmd && this.handlePushBigRooMsg(e.body.messages[t].msg_body);
          }

          this.logger.debug("zb.mh.hpmm call success");
        } else this.logger.error("zb.mh.hpmmnot login");
      }, e.prototype.handlePushBigRooMsg = function (e) {
        var t;

        try {
          t = JSON.parse(e);
        } catch (e) {
          return void this.logger.warn("zb.mh.hpbrm parse json error");
        }

        if (t) {
          for (var r = t.room_id, i = [], s = 0; s < t.msg_data.length; s++) {
            var n = t.msg_data[s];
            n.id_name != this.stateCenter.idName ? i.push({
              idName: n.id_name,
              nickName: n.nick_name,
              messageId: n.bigmsg_id,
              category: n.msg_category,
              type: n.msg_type,
              content: n.msg_content,
              time: n.send_time
            }) : this.logger.debug("zb.mh.hpbrm self message");
          }

          0 == i.length ? this.logger.debug("zb.mh.hpbrm no other pushData except self") : this.onRecvBigRoomMessage(i, r), this.logger.debug("zb.mh.hpbrm call success");
        } else this.logger.warn("zb.mh.hpbrm cann't find message body");
      }, e.prototype.onRecvBigRoomMessage = function (e, t) {}, e.prototype.sendBigRoomMessageInternal = function (e, t, r) {
        this.logger.debug("zb.mh.sbim call");
        var i = {
          msgs: e
        };
        this.socketCenter.sendMessage("bigim_chat", i, t, r);
      }, e.prototype.handleBigImMsgRsp = function (e) {
        if (this.stateCenter.isLogin()) {
          this.stateCenter.bigimTimeWindow != e.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = e.body.bigim_time_window);

          for (var t = 0; t < e.body.msgs.length; t++) {
            var r = e.body.msgs[t].bigmsg_client_id,
                i = e.body.msgs[t].bigmsg_id;

            if (this.stateCenter.bigImCallbackMap[r]) {
              var s = this.stateCenter.bigImCallbackMap[r].success;
              null != s && s(e.header.seq, i), delete this.stateCenter.bigImCallbackMap[r];
            }
          }
        } else this.logger.info("zb.mh.hbmr not login");
      }, e.prototype.setBigImTimer = function (e, t) {
        var r = this,
            i = t - (new Date().getTime() + e) % t,
            n = s.ClientUtil.generateRandumNumber(t) + i;
        this.logger.info("zb.mh.sbt setTimer " + n), this.stateCenter.bigImTimer = setTimeout(function () {
          r.onBigImTimer();
        }, n);
      }, e.prototype.onBigImTimer = function () {
        var e = this,
            t = new Date().getTime() + this.stateCenter.serverTimeOffset;
        this.stateCenter.bigImLastTimeIndex = Math.floor(t / this.stateCenter.bigimTimeWindow);

        for (var r = [], i = [], s = 0; s < this.stateCenter.bigImMessageList.length && !(s >= 20); s++) {
          var n = this.stateCenter.bigImMessageList[s];
          r.push({
            msg_category: n.msg_category,
            msg_type: n.msg_type,
            msg_content: n.msg_content,
            bigmsg_client_id: n.bigmsg_client_id
          }), i.push(n.bigmsg_client_id);
        }

        this.stateCenter.bigImMessageList.length > 20 ? this.stateCenter.bigImMessageList.splice(0, 20) : this.stateCenter.bigImMessageList = [], this.sendBigRoomMessageInternal(r, function (t) {
          e.handleBigImMsgRsp(t);
        }, function (t, r) {
          for (var s = 0; s < i.length; s++) {
            var n = i[s],
                o = e.stateCenter.bigImCallbackMap[n];
            o && (null != o.error && o.error(t, r), delete e.stateCenter.bigImCallbackMap[n]);
          }
        }), clearTimeout(this.stateCenter.bigImTimer), this.stateCenter.bigImTimer = null, this.stateCenter.bigImMessageList.length > 0 && this.setBigImTimer(this.stateCenter.serverTimeOffset, this.stateCenter.bigimTimeWindow);
      }, e.prototype.sendRelayMessage = function (e, t, r, i) {
        this.logger.debug("zb.mh.srm call");
        var s = this.stateCenter.datiTimeWindow,
            n = this.stateCenter.serverTimeOffset;
        s > 0 ? (this.stateCenter.realyMessageList.push({
          type: e,
          data: t,
          success: r,
          error: i
        }), 1 == this.stateCenter.realyMessageList.length && this.setRelayTimer(n, s)) : this.sendRelayMessageInternal(e, t, r, i);
      }, e.prototype.sendRelayMessageInternal = function (e, t, r, i) {
        this.logger.debug("zb.mh.srmi call");
        var s = {
          relay_type: e,
          relay_data: t
        };
        this.socketCenter.sendMessage("relay", s, r, i);
      }, e.prototype.setRelayTimer = function (e, t) {
        var r = this,
            i = 2 * t - (new Date().getTime() + e) % t,
            n = s.ClientUtil.generateRandumNumber(i);
        this.logger.info("zb.mh.srt setTimer " + n), this.stateCenter.relayTimer = setTimeout(function () {
          r.onRelayTimer();
        }, n);
      }, e.prototype.onRelayTimer = function () {
        if (0 != this.stateCenter.realyMessageList.length) {
          var e = this.stateCenter.realyMessageList[0];
          this.sendRelayMessageInternal(e.type, e.data, e.success, e.error), clearTimeout(this.stateCenter.relayTimer), this.stateCenter.relayTimer = null, this.stateCenter.realyMessageList.splice(0, 1), this.stateCenter.realyMessageList.length > 0 && this.setRelayTimer(this.stateCenter.serverTimeOffset, this.stateCenter.datiTimeWindow);
        } else this.logger.info("zb.mh.ort no relay data");
      }, e.prototype.handlePushTransMsg = function (e) {
        if (this.stateCenter.isLogin()) {
          var t = e.body.trans_type,
              r = e.body.trans_seq;
          this.stateCenter.transSeqMap[t] ? this.stateCenter.transSeqMap[t].seq = r : this.stateCenter.transSeqMap[t] = {
            seq: r
          }, e.body.trans_user_idname != this.stateCenter.idName && e.body.trans_idname != this.stateCenter.idName ? this.onRecvReliableMessage(t, r, e.body.trans_data) : this.logger.debug("zb.mh.hptr receive self trans message"), this.logger.info("zb.mh.hptr trans " + t + " seq " + r);
        } else this.logger.error("zb.mh.hptr not login");
      }, e.prototype.onRecvReliableMessage = function (e, t, r) {}, e;
    }();

    t.MessageHandler = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = function () {
      function e(e, t, r) {
        this.logger = e, this.socketCenter = r, this.stateCenter = t;
      }

      return e.prototype.requestJoinLive = function (e, t, r, s) {
        this.logger.debug("zb.lh.rjl call");
        var n = this.stateCenter.getRequestId(),
            o = this.stateCenter.getSignalCmdContent(n, e);
        return null != s && (this.stateCenter.joinLiveCallbackMap[n] = s, this.sendSignalCmd(i.ENUM_SIGNAL_SUB_CMD.joinLiveRequest, o, e, t, r), !0);
      }, e.prototype.inviteJoinLive = function (e, t, r, s) {
        this.logger.debug("zb.lh.ijl call");
        var n = this.stateCenter.getRequestId(),
            o = this.stateCenter.getSignalCmdContent(n, e);
        return null != s && (this.stateCenter.joinLiveCallbackMap[n] = s, this.sendSignalCmd(i.ENUM_SIGNAL_SUB_CMD.joinLiveInvite, o, e, t, r), !0);
      }, e.prototype.endJoinLive = function (e, t, r) {
        this.logger.debug("zb.lh.ejl call");
        var s = this.stateCenter.getRequestId(),
            n = this.stateCenter.getSignalCmdContent(s, e);
        return this.sendSignalCmd(i.ENUM_SIGNAL_SUB_CMD.joinLiveStop, n, e, t, r), !0;
      }, e.prototype.respondJoinLive = function (e, t, r, s) {
        this.logger.debug("zb.lh.rpjl call");
        var n = this.stateCenter.joinLiveRequestMap[e];
        if (!n) return this.logger.info("zb.lh.rpjl no dest id name"), !1;
        var o = 0;
        !0 === t && (o = 1);
        var a = this.stateCenter.getSignalCmdContent(e, n, o);
        return this.sendSignalCmd(i.ENUM_SIGNAL_SUB_CMD.joinLiveResult, a, n, r, s), delete this.stateCenter.joinLiveRequestMap[e], !0;
      }, e.prototype.sendSignalCmd = function (e, t, r, i, s) {
        if (this.logger.debug("zb.lh.ssc call"), this.stateCenter.isLogin()) {
          this.logger.debug("zb.lh.ssc send signal cmd " + e);
          var n = {
            sub_cmd: e,
            signal_msg: t,
            dest_id_name: [r]
          };
          this.socketCenter.sendMessage("signal", n, i, s), this.logger.info("zb.lh.ssc call success");
        } else this.logger.error("zb.lh.ssc state error");
      }, e.prototype.handlePushSignalMsg = function (e) {
        if (this.stateCenter.isLogin()) {
          var t = JSON.parse(e.body.signal_msg);

          switch (this.logger.debug("zb.lh.hpcm hpsm= ", t), e.body.sub_cmd) {
            case i.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:
              this.handlePushJoinLiveRequestMsg(t);
              break;

            case i.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:
              this.handlePushJoinLiveResultMsg(t);
              break;

            case i.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:
              this.handlePushJoinLiveInviteMsg(t);
              break;

            case i.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:
              this.handlePushJoinLiveStopMsg(t);
          }

          this.logger.debug("zb.lh.hpsm call end");
        } else this.logger.warn("zb.lh.hpsm not login");
      }, e.prototype.handlePushJoinLiveRequestMsg = function (e) {
        var t = e.request_id;

        if ("string" == typeof t) {
          var r = e.from_userid;
          "string" == typeof r ? (this.stateCenter.joinLiveRequestMap[t] = r, this.logger.info("zb.lh.hpjlrm onRecvJoinLiveRequest " + r), this.onRecvJoinLiveRequest(t, e.from_userid, e.from_username, e.room_id)) : this.logger.error("zb.lh.hpjlrm no from user");
        } else this.logger.error("zb.lh.hpjlrm no requestId");
      }, e.prototype.onRecvJoinLiveRequest = function (e, t, r, i) {}, e.prototype.handlePushJoinLiveInviteMsg = function (e) {
        var t = e.request_id;

        if ("string" == typeof t) {
          var r = e.from_userid;
          "string" == typeof r ? (this.stateCenter.joinLiveRequestMap[t] = r, this.logger.info("zb.lh.hpjlim onRecvInviteJoinLiveRequest " + r), this.onRecvInviteJoinLiveRequest(t, e.from_userid, e.from_username, e.room_id)) : this.logger.error("zb.lh.hpjlim no from user");
        } else this.logger.error("zb.lh.hpjlim no requestId");
      }, e.prototype.onRecvInviteJoinLiveRequest = function (e, t, r, i) {}, e.prototype.handlePushJoinLiveResultMsg = function (e) {
        var t = e.request_id;

        if ("string" == typeof t) {
          var r = e.result;

          if (null != r) {
            var i = 1 == r;

            if (this.stateCenter.joinLiveCallbackMap[t]) {
              var s = this.stateCenter.joinLiveCallbackMap[t];
              if (!s) return void this.logger.info("hpjlrm.o no callback");
              this.logger.info("zb.lh.hpjlrm joinLiveRequest/invite result " + i), delete this.stateCenter.joinLiveCallbackMap[t], s(i, e.from_userid, e.from_username);
            }
          } else this.logger.info("zb.lh.hpjlrm no result");
        } else this.logger.error("zb.lh.hpjlrm no requestId");
      }, e.prototype.handlePushJoinLiveStopMsg = function (e) {
        var t = e.request_id;
        "string" == typeof t ? (this.logger.info("zb.lh.hpjlsm onRecvEndJoinLiveCommand " + e.from_userid), this.onRecvEndJoinLiveCommand(t, e.from_userid, e.from_username, e.room_id)) : this.logger.error("zb.lh.hpjlsm no requestId");
      }, e.prototype.onRecvEndJoinLiveCommand = function (e, t, r, i) {}, e;
    }();

    t.LiveHandler = s;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(0),
        s = r(2),
        n = function () {
      function e() {
        this.testEnvironment = !1, this.third_token = "", this.pullLimited = !0, this.configOK = !1, this.roomCreateFlag = 1, this.runState = i.ENUM_RUN_STATE.logout, this.lastRunState = i.ENUM_RUN_STATE.logout, this.callbackList = {}, this.streamList = [], this.publishStreamList = {}, this.userQuerying = !1, this.userTempList = [], this.userSeq = 0, this.userSeqMergeMap = null, this.userSeqMergeTimer = null, this.userQueryTimer = null, this.lastUserQueryTime = 0, this.userListInterval = 3e4, this.userListMergeInterval = 5e3, this.anchor_info = {
          anchor_id: "",
          anchor_id_name: "",
          anchor_nick_name: ""
        }, this.deviceInfos = null, this.deviceChangeTimer = null, this.deviceStateOut = !1, this.sendCommandMap = {}, this.sendCommandList = new i.LinkedList(), this.sendDataMap = {}, this.sendDataList = new i.LinkedList(), this.joinLiveCallbackMap = {}, this.joinLiveRequestMap = {}, this.streamUrlMap = {}, this.cmdCallback = {}, this.transSeqMap = {}, this.realyMessageList = [], this.relayTimer = null, this.bigImLastTimeIndex = 0, this.bigIMmessageList = [], this.bigImCallbackMap = {}, this.bigImTimer = null, this.serverTimeOffset = 0, this.datiTimeWindow = 0, this.bigimTimeWindow = 0, this.bigImMessageList = [], this.screenShotStreamList = [], this.tryLoginCount = 0, this.tryLoginTimer = null, this.heartbeatTimer = null, this.sendDataCheckTimer = null, this.sendDataCheckInterval = 2e3, this.sendDataTimeout = 5e3, this.sendDataDropTimeout = 1e4, this.sendDataCheckOnceCount = 100, this.sendRoomMsgTime = 0, this.SendRoomMsgInterval = 500, this.cmdSeq = 0, this.audioEffectBuffer = {}, this.audioBitRate = 48e3, this.cdnSeq = 0;
      }

      return e.prototype.isLogin = function () {
        return this.runState === i.ENUM_RUN_STATE.login;
      }, e.prototype.getRequestId = function () {
        return this.idName + "-" + s.getSeq();
      }, e.prototype.getSignalCmdContent = function (e, t, r) {
        var i = {
          request_id: e,
          room_id: this.roomid,
          from_userid: this.idName,
          from_username: this.nickName,
          to_userid: t
        };
        return null != r && (i.result = r), JSON.stringify(i);
      }, e;
    }();

    t.StateCenter = n;
  }, function (e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = r(1),
        s = function () {
      function e(e) {
        var t = e.type,
            r = e.channels,
            i = void 0 === r ? 1 : r,
            s = e.bufferSize,
            n = void 0 === s ? 0 : s,
            o = e.sampleBit,
            a = void 0 === o ? 16 : o,
            c = e.sampleRate,
            l = void 0 === c ? 44100 : c,
            d = this;
        this.instant = 0, this.slow = 0, this.clip = 0;
        var h = new ("undefined" != typeof webkitAudioContext ? webkitAudioContext : AudioContext)();
        this.context = h, this.type = t, this.channels = i, this.bufferSize = n, this.sampleBit = a, this.sampleRate = l, this.script = h.createScriptProcessor(n, i, i);
        new Date().getTime();
        this.script.addEventListener("audioprocess", function (e) {
          var r,
              i = e.inputBuffer.getChannelData(0),
              s = 0,
              n = 0;

          for (r = 0; r < i.length; ++r) {
            s += i[r] * i[r], Math.abs(i[r]) > .99 && (n += 1);
          }

          if (d.instant = Math.sqrt(s / i.length), d.slow = .95 * d.slow + .05 * d.instant, d.clip = n / i.length, "pcm" === t || "wav" === t) {
            for (var o = [], a = 0; a < d.channels; a++) {
              o.push(e.inputBuffer.getChannelData(a));
            }

            d.recorderBuffer(o);
          }
        }), "pcm" !== t && "wav" !== t || this.initRecorderBuffer(t);
      }

      return e.prototype.connectToSource = function (e, t) {
        console.log("SoundMeter connecting");

        try {
          this.mic = this.context.createMediaStreamSource(e), this.mic.connect(this.script), this.script.connect(this.context.destination), void 0 !== t && t(null);
        } catch (e) {
          console.error(e), void 0 !== t && t(e);
        }

        return this;
      }, e.prototype.recorderBuffer = function (e) {
        this.worker.postMessage({
          command: "record",
          val: e
        });
      }, e.prototype.initRecorderBuffer = function (e) {
        var t = this;
        this.worker = i.ClientUtil.inlineWorker(function () {
          var e,
              t,
              r,
              i,
              s,
              n,
              o = [],
              a = this;

          function c(t) {
            var r, i;
            if (1 == e) r = d(o[0], s, o), 1 != t && (i = l(t, r));else if (2 == e) {
              var n = d(o[0], s, o),
                  a = d(o[1], s, o);
              1 != t ? i = h(l(t, n), l(t, a)) : r = h(n, a);
            }
            return 1 != t ? i : r;
          }

          function l(e, t) {
            for (var r = new Float32Array(t.length / e), i = 0, s = 0; i < r.length;) {
              r[i] = t[s], s += e, i++;
            }

            return r;
          }

          function d(e, t, r) {
            for (var i = new Float32Array(t * e.length), s = 0, n = 0; n < r[0].length; n++) {
              i.set(r[0][n], s), s += r[0][n].length;
            }

            return i;
          }

          function h(e, t) {
            for (var r = new Float32Array(e.length + t.length), i = 0; i < e.length + t.length; i += 2) {
              r[i] = e[i / 2 >> 0], r[i + 1] = t[i / 2 >> 0];
            }

            return r;
          }

          function u(e, t, r) {
            for (var i = 0; i < r.length; i++) {
              e.setUint8(t + i, r.charCodeAt(i));
            }
          }

          function p(e, t, r) {
            for (var i = 0; i < r.length; i++, t += 2) {
              var s = Math.max(-1, Math.min(1, r[i]));
              e.setInt16(t, s < 0 ? 32768 * s : 32767 * s, !0);
            }
          }

          function g(e, t, r) {
            for (var i = 0; i < r.length; i++, t++) {
              var s = Math.max(-1, Math.min(1, r[i])),
                  n = s < 0 ? 128 * s : 127 * s;
              n += 128, e.setInt8(t, n);
            }
          }

          this.onmessage = function (l) {
            switch (l.data.command) {
              case "init":
                d = l.data.val, e = d.sampleChannel, t = d.sampleBit, r = d.sampleRate, i = d.oldSampleRate, s = d.bufferSize, n = d.type;
                break;

              case "record":
                !function (s) {
                  for (var l = 0; l < e; l++) {
                    o[l] || (o[l] = []), o[l].push(s[l]);
                  }

                  var d = Math.round(i / r);
                  "pcm" === n ? function (e) {
                    var r = function (e, r) {
                      var i;
                      8 == r ? i = e.length : 16 == r && (i = e.length, i *= 2);
                      var s = new ArrayBuffer(i),
                          n = new DataView(s);
                      8 == r ? g(n, 0, e) : 16 == t && p(n, 0, e);
                      return n;
                    }(c(e), t);

                    a.postMessage({
                      command: "exportPcmLive",
                      val: r
                    });
                  }(d) : "wav" === n && function (i) {
                    var s = function (i, s) {
                      var n;
                      8 == s ? n = i.length : 16 == t && (n = i.length, n *= 2);
                      var o = new ArrayBuffer(n + 44),
                          a = new DataView(o),
                          c = r,
                          l = t,
                          d = e;
                      u(a, 0, "RIFF"), a.setUint32(4, 36 + n, !0), u(a, 8, "WAVE"), u(a, 12, "fmt "), a.setUint32(16, 16, !0), a.setUint16(20, 1, !0), a.setUint16(22, d, !0), a.setUint32(24, c, !0), a.setUint32(28, c * d * (l / 8), !0), a.setUint16(32, d * (l / 8), !0), a.setUint16(34, l, !0), u(a, 36, "data"), a.setUint32(40, n, !0), 8 == t ? g(a, 44, i) : 16 == t && p(a, 44, i);
                      return a;
                    }(c(i), t);

                    a.postMessage({
                      command: "exportWav",
                      val: s
                    });
                  }(d);
                  o = [];
                }(l.data.val);
            }

            var d;
          };
        }), this.worker.postMessage({
          command: "init",
          val: {
            sampleChannel: this.channels,
            sampleBit: this.sampleBit,
            sampleRate: this.sampleRate,
            oldSampleRate: this.context.sampleRate,
            bufferSize: this.bufferSize,
            type: e
          }
        }), this.worker.onmessage = function (e) {
          switch (e.data.command) {
            case "exportPcmLive":
              t.onReceiveBuffer(e.data.val);
              break;

            case "exportWav":
              t.onReceiveWav(e.data.val);
          }
        };
      }, e.prototype.onReceiveBuffer = function (e) {}, e.prototype.onReceiveWav = function (e) {}, e.prototype.writeString = function (e, t, r) {
        for (var i = 0; i < r.length; i++) {
          e.setUint8(t + i, r.charCodeAt(i));
        }
      }, e.prototype.writeBuffer = function (e, t, r) {
        for (var i = 0; i < r.byteLength; i++) {
          e.setUint8(t + i, r[i]);
        }
      }, e.prototype.concatenation = function (e) {
        for (var t = 0, r = 0; r < e.length; ++r) {
          t += e[r].buffer.byteLength;
        }

        var i = new Uint8Array(t),
            s = 0;

        for (r = 0; r < e.length; ++r) {
          i.set(new Uint8Array(e[r].buffer), s), s += e[r].buffer.byteLength;
        }

        return i;
      }, e.prototype.encodeWave = function (e) {
        var t = this.concatenation(e),
            r = t.byteLength,
            i = new ArrayBuffer(r + 44),
            s = new DataView(i),
            n = this.sampleRate,
            o = this.sampleBit,
            a = this.channels;
        return this.writeString(s, 0, "RIFF"), s.setUint32(4, 36 + r, !0), this.writeString(s, 8, "WAVE"), this.writeString(s, 12, "fmt "), s.setUint32(16, 16, !0), s.setUint16(20, 1, !0), s.setUint16(22, a, !0), s.setUint32(24, n, !0), s.setUint32(28, n * a * (o / 8), !0), s.setUint16(32, a * (o / 8), !0), s.setUint16(34, o, !0), this.writeString(s, 36, "data"), s.setUint32(40, r, !0), this.writeBuffer(s, 44, t), s;
      }, e.prototype.stop = function () {
        this.mic.disconnect(), this.script.disconnect();
      }, e;
    }();

    t.MediaUtil = s;
  }]);
});