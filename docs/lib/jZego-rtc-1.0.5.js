(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ZegoClient = factory());
}(this, (function () { 'use strict';

    var playErrorList = {
        DISPATCH_ERROR: {
            code: "ZegoPlay.Error.Dispatch",
            msg: "dispatch request error"
        },
        DISPATCH_TIMEOUT: {
            code: "ZegoPlay.Timeout.Dispatch",
            msg: "dispatch request timeout"
        },
        TOKEN_ERROR: {
            code: "ZegoPlay.Error.Token",
            msg: "login token error"
        },
        SEND_SESSION_TIMEOUT: {
            code: "ZegoPlay.Timeout.Session",
            msg: "send session request timeout"
        },
        CREATE_SESSION_ERROR: {
            code: "ZegoPlay.Error.Session",
            msg: "create session error"
        },
        SERVER_MEDIA_DESC_TIMEOUT: {
            code: "ZegoPlay.Timeout.RemoteOffer",
            msg: "wating server mediaDesc timeout"
        },
        SET_REMOTE_DESC_ERROR: {
            code: "ZegoPlay.Error.RemoteOffer",
            msg: "other side offer error"
        },
        CREATE_ANSWER_ERROR: {
            code: "ZegoPlay.Error.CreateAnswer",
            msg: "create offer error"
        },
        SET_LOCAL_DESC_ERROR: {
            code: "ZegoPlay.Error.LocalDesc",
            msg: "setLocalDescription error"
        },
        SEND_MEDIA_DESC_TIMEOUT: {
            code: "ZegoPlay.Timeout.Desc",
            msg: "send mediaDesc timeout"
        },
        SEND_CANDIDATE_TIMEOUT: {
            code: "ZegoPlay.Timeout.Candidate",
            msg: "send candidate timeout"
        },
        SERVER_CANDIDATE_TIMEOUT: {
            code: "ZegoPlay.Timeout.ServerCandidate",
            msg: "waiting candidate timeout"
        },
        SERVER_CANDIDATE_ERROR: {
            code: "ZegoPlay.Error.ServerCandidate",
            msg: "recv candidate error"
        },
        MEDIA_CONNECTION_FAILED: {
            code: "ZegoPlay.Error.ConnectionFailed",
            msg: "ice Connection state failed"
        },
        MEDIA_CONNECTION_CLOSED: {
            code: "ZegoPlay.Error.ConnectionClosed",
            msg: "ice connection state closed"
        },
        SESSION_CLOSED: {
            code: "ZegoPlay.Error.SessionClosed",
            msg: "server session closed, reason: "
        },
        WEBSOCKET_ERROR: {
            code: "ZegoPlay.Error.SocketError",
            msg: "network error"
        }
    };

    var publishErrorList = {
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
            msg: "server session closed, reason: "
        },
        MEDIA_CONNECTION_FAILED: {
            code: "ZegoPublish.Error.IConnectionFailed",
            msg: "Ice Connection state failed"
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

    var ENUM_PUBLISH_STATE_UPDATE = {
        start: 0,
        error: 1,
        retry: 2
    };

    var ENUM_PLAY_STATE_UPDATE = {
        start: 0,
        error: 1,
        retry: 2
    };

    var ENUM_RETRY_STATE = {
        didNotStart: 0,
        retrying: 1,
        finished: 2
    };

    var getSeq = (function() {
        var seq = 1;

        return function() { return seq++; };
    })();

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var adapter = createCommonjsModule(function (module, exports) {
    (function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

        this.localDescription = null;
        this.remoteDescription = null;

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
          var sections = SDPUtils.getMediaSections(pc.localDescription.sdp);
          if (!end) {
            sections[event.candidate.sdpMLineIndex] +=
                'a=' + event.candidate.candidate + '\r\n';
          } else {
            sections[event.candidate.sdpMLineIndex] +=
                'a=end-of-candidates\r\n';
          }
          pc.localDescription.sdp =
              SDPUtils.getDescription(pc.localDescription.sdp) +
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
          sections = SDPUtils.splitSections(pc.remoteDescription.sdp);
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

        pc.localDescription = {
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
          if ((kind === 'application' && protocol === 'DTLS/SCTP') || rejected) {
            // TODO: this is dangerous in the case where a non-rejected m-line
            //     becomes rejected.
            pc.transceivers[sdpMLineIndex] = {
              mid: mid,
              kind: kind,
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
                if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
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

        pc.remoteDescription = {
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
          states[transceiver.iceTransport.state]++;
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
          states[transceiver.iceTransport.state]++;
          states[transceiver.dtlsTransport.state]++;
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
        var mediaSectionsInOffer = SDPUtils.getMediaSections(
            pc.remoteDescription.sdp).length;
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
            return;
          }
          if (transceiver.rejected) {
            if (transceiver.kind === 'application') {
              sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
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
          if (!pc.remoteDescription) {
            return reject(makeError('InvalidStateError',
                'Can not add ICE candidate without a remote description'));
          } else if (!candidate || candidate.candidate === '') {
            for (var j = 0; j < pc.transceivers.length; j++) {
              if (pc.transceivers[j].rejected) {
                continue;
              }
              pc.transceivers[j].iceTransport.addRemoteCandidate({});
              sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
              sections[j] += 'a=end-of-candidates\r\n';
              pc.remoteDescription.sdp =
                  SDPUtils.getDescription(pc.remoteDescription.sdp) +
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
              sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
              sections[sdpMLineIndex] += 'a=' +
                  (cand.type ? candidateString : 'end-of-candidates')
                  + '\r\n';
              pc.remoteDescription.sdp =
                  SDPUtils.getDescription(pc.remoteDescription.sdp) +
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

    },{"sdp":2}],2:[function(require,module,exports){

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
      sdp.push(candidate.ip);
      sdp.push(candidate.port);

      var type = candidate.type;
      sdp.push('typ');
      sdp.push(type);
      if (type !== 'host' && candidate.relatedAddress &&
          candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress); // was: relAddr
        sdp.push('rport');
        sdp.push(candidate.relatedPort); // was: relPort
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
      // was: channels
      parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
      return parsed;
    };

    // Generate an a=rtpmap line from RTCRtpCodecCapability or
    // RTCRtpCodecParameters.
    SDPUtils.writeRtpMap = function(codec) {
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
          (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
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
          params.push(param + '=' + codec.parameters[param]);
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

      caps.headerExtensions.forEach(function(extension) {
        sdp += SDPUtils.writeExtmap(extension);
      });
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
        var parts = line.split(' ');
        parts.shift();
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
            codecPayloadType: parseInt(codec.parameters.apt, 10),
            rtx: {
              ssrc: secondarySsrc
            }
          };
          encodingParameters.push(encParam);
          if (hasRed) {
            encParam = JSON.parse(JSON.stringify(encParam));
            encParam.fec = {
              ssrc: secondarySsrc,
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
      // Gets the first SSRC. Note that with RTX there might be multiple
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
      .filter(function(parts) {
        return parts.attribute === 'msid';
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
    SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
      var sessionId;
      var version = sessVer !== undefined ? sessVer : 2;
      if (sessId) {
        sessionId = sessId;
      } else {
        sessionId = SDPUtils.generateSessionId();
      }
      // FIXME: sess-id should be an NTP timestamp.
      return 'v=0\r\n' +
          'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' +
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
        address: parts[5],
      };
    };

    // Expose public methods.
    if (typeof module === 'object') {
      module.exports = SDPUtils;
    }

    },{}],3:[function(require,module,exports){
    (function (global){

    var adapterFactory = require('./adapter_factory.js');
    module.exports = adapterFactory({window: global.window});

    }).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    },{"./adapter_factory.js":4}],4:[function(require,module,exports){

    var utils = require('./utils');
    // Shimming starts here.
    module.exports = function(dependencies, opts) {
      var window = dependencies && dependencies.window;

      var options = {
        shimChrome: true,
        shimFirefox: true,
        shimEdge: true,
        shimSafari: true,
      };

      for (var key in opts) {
        if (hasOwnProperty.call(opts, key)) {
          options[key] = opts[key];
        }
      }

      // Utils.
      var logging = utils.log;
      var browserDetails = utils.detectBrowser(window);

      // Uncomment the line below if you want logging to occur, including logging
      // for the switch statement below. Can also be turned on in the browser via
      // adapter.disableLog(false), but then logging from the switch statement below
      // will not appear.
      // require('./utils').disableLog(false);

      // Browser shims.
      var chromeShim = require('./chrome/chrome_shim') || null;
      var edgeShim = require('./edge/edge_shim') || null;
      var firefoxShim = require('./firefox/firefox_shim') || null;
      var safariShim = require('./safari/safari_shim') || null;
      var commonShim = require('./common_shim') || null;

      // Export to the adapter global object visible in the browser.
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
          if (!chromeShim || !chromeShim.shimPeerConnection ||
              !options.shimChrome) {
            logging('Chrome shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming chrome.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = chromeShim;
          commonShim.shimCreateObjectURL(window);

          chromeShim.shimGetUserMedia(window);
          chromeShim.shimMediaStream(window);
          chromeShim.shimSourceObject(window);
          chromeShim.shimPeerConnection(window);
          chromeShim.shimOnTrack(window);
          chromeShim.shimAddTrackRemoveTrack(window);
          chromeShim.shimGetSendersWithDtmf(window);

          commonShim.shimRTCIceCandidate(window);
          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          break;
        case 'firefox':
          if (!firefoxShim || !firefoxShim.shimPeerConnection ||
              !options.shimFirefox) {
            logging('Firefox shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming firefox.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = firefoxShim;
          commonShim.shimCreateObjectURL(window);

          firefoxShim.shimGetUserMedia(window);
          firefoxShim.shimSourceObject(window);
          firefoxShim.shimPeerConnection(window);
          firefoxShim.shimOnTrack(window);
          firefoxShim.shimRemoveStream(window);

          commonShim.shimRTCIceCandidate(window);
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
          commonShim.shimCreateObjectURL(window);

          edgeShim.shimGetUserMedia(window);
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
          commonShim.shimCreateObjectURL(window);

          safariShim.shimRTCIceServerUrls(window);
          safariShim.shimCallbacksAPI(window);
          safariShim.shimLocalStreamsAPI(window);
          safariShim.shimRemoteStreamsAPI(window);
          safariShim.shimTrackEventTransceiver(window);
          safariShim.shimGetUserMedia(window);
          safariShim.shimCreateOfferLegacy(window);

          commonShim.shimRTCIceCandidate(window);
          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          break;
        default:
          logging('Unsupported browser!');
          break;
      }

      return adapter;
    };

    },{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":10,"./safari/safari_shim":12,"./utils":13}],5:[function(require,module,exports){
    var utils = require('../utils.js');
    var logging = utils.log;

    module.exports = {
      shimGetUserMedia: require('./getusermedia'),
      shimMediaStream: function(window) {
        window.MediaStream = window.MediaStream || window.webkitMediaStream;
      },

      shimOnTrack: function(window) {
        if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
            window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
            get: function() {
              return this._ontrack;
            },
            set: function(f) {
              if (this._ontrack) {
                this.removeEventListener('track', this._ontrack);
              }
              this.addEventListener('track', this._ontrack = f);
            }
          });
          var origSetRemoteDescription =
              window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function() {
            var pc = this;
            if (!pc._ontrackpoly) {
              pc._ontrackpoly = function(e) {
                // onaddstream does not fire when a track is added to an existing
                // stream. But stream.onaddtrack is implemented so we use that.
                e.stream.addEventListener('addtrack', function(te) {
                  var receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = pc.getReceivers().find(function(r) {
                      return r.track && r.track.id === te.track.id;
                    });
                  } else {
                    receiver = {track: te.track};
                  }

                  var event = new Event('track');
                  event.track = te.track;
                  event.receiver = receiver;
                  event.transceiver = {receiver: receiver};
                  event.streams = [e.stream];
                  pc.dispatchEvent(event);
                });
                e.stream.getTracks().forEach(function(track) {
                  var receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = pc.getReceivers().find(function(r) {
                      return r.track && r.track.id === track.id;
                    });
                  } else {
                    receiver = {track: track};
                  }
                  var event = new Event('track');
                  event.track = track;
                  event.receiver = receiver;
                  event.transceiver = {receiver: receiver};
                  event.streams = [e.stream];
                  pc.dispatchEvent(event);
                });
              };
              pc.addEventListener('addstream', pc._ontrackpoly);
            }
            return origSetRemoteDescription.apply(pc, arguments);
          };
        } else if (!('RTCRtpTransceiver' in window)) {
          utils.wrapPeerConnectionEvent(window, 'track', function(e) {
            if (!e.transceiver) {
              e.transceiver = {receiver: e.receiver};
            }
            return e;
          });
        }
      },

      shimGetSendersWithDtmf: function(window) {
        // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
        if (typeof window === 'object' && window.RTCPeerConnection &&
            !('getSenders' in window.RTCPeerConnection.prototype) &&
            'createDTMFSender' in window.RTCPeerConnection.prototype) {
          var shimSenderWithDtmf = function(pc, track) {
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
            window.RTCPeerConnection.prototype.getSenders = function() {
              this._senders = this._senders || [];
              return this._senders.slice(); // return a copy of the internal state.
            };
            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
              var pc = this;
              var sender = origAddTrack.apply(pc, arguments);
              if (!sender) {
                sender = shimSenderWithDtmf(pc, track);
                pc._senders.push(sender);
              }
              return sender;
            };

            var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function(sender) {
              var pc = this;
              origRemoveTrack.apply(pc, arguments);
              var idx = pc._senders.indexOf(sender);
              if (idx !== -1) {
                pc._senders.splice(idx, 1);
              }
            };
          }
          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function(stream) {
            var pc = this;
            pc._senders = pc._senders || [];
            origAddStream.apply(pc, [stream]);
            stream.getTracks().forEach(function(track) {
              pc._senders.push(shimSenderWithDtmf(pc, track));
            });
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function(stream) {
            var pc = this;
            pc._senders = pc._senders || [];
            origRemoveStream.apply(pc, [stream]);

            stream.getTracks().forEach(function(track) {
              var sender = pc._senders.find(function(s) {
                return s.track === track;
              });
              if (sender) {
                pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
              }
            });
          };
        } else if (typeof window === 'object' && window.RTCPeerConnection &&
                   'getSenders' in window.RTCPeerConnection.prototype &&
                   'createDTMFSender' in window.RTCPeerConnection.prototype &&
                   window.RTCRtpSender &&
                   !('dtmf' in window.RTCRtpSender.prototype)) {
          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
          window.RTCPeerConnection.prototype.getSenders = function() {
            var pc = this;
            var senders = origGetSenders.apply(pc, []);
            senders.forEach(function(sender) {
              sender._pc = pc;
            });
            return senders;
          };

          Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
            get: function() {
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
      },

      shimSourceObject: function(window) {
        var URL = window && window.URL;

        if (typeof window === 'object') {
          if (window.HTMLMediaElement &&
            !('srcObject' in window.HTMLMediaElement.prototype)) {
            // Shim the srcObject property, once, when HTMLMediaElement is found.
            Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
              get: function() {
                return this._srcObject;
              },
              set: function(stream) {
                var self = this;
                // Use _srcObject as a private property for this shim
                this._srcObject = stream;
                if (this.src) {
                  URL.revokeObjectURL(this.src);
                }

                if (!stream) {
                  this.src = '';
                  return undefined;
                }
                this.src = URL.createObjectURL(stream);
                // We need to recreate the blob url when a track is added or
                // removed. Doing it manually since we want to avoid a recursion.
                stream.addEventListener('addtrack', function() {
                  if (self.src) {
                    URL.revokeObjectURL(self.src);
                  }
                  self.src = URL.createObjectURL(stream);
                });
                stream.addEventListener('removetrack', function() {
                  if (self.src) {
                    URL.revokeObjectURL(self.src);
                  }
                  self.src = URL.createObjectURL(stream);
                });
              }
            });
          }
        }
      },

      shimAddTrackRemoveTrackWithNative: function(window) {
        // shim addTrack/removeTrack with native variants in order to make
        // the interactions with legacy getLocalStreams behave as in other browsers.
        // Keeps a mapping stream.id => [stream, rtpsenders...]
        window.RTCPeerConnection.prototype.getLocalStreams = function() {
          var pc = this;
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
            return pc._shimmedLocalStreams[streamId][0];
          });
        };

        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
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
        window.RTCPeerConnection.prototype.addStream = function(stream) {
          var pc = this;
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};

          stream.getTracks().forEach(function(track) {
            var alreadyExists = pc.getSenders().find(function(s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.',
                  'InvalidAccessError');
            }
          });
          var existingSenders = pc.getSenders();
          origAddStream.apply(this, arguments);
          var newSenders = pc.getSenders().filter(function(newSender) {
            return existingSenders.indexOf(newSender) === -1;
          });
          this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
        };

        var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function(stream) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          delete this._shimmedLocalStreams[stream.id];
          return origRemoveStream.apply(this, arguments);
        };

        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function(sender) {
          var pc = this;
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          if (sender) {
            Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
              var idx = pc._shimmedLocalStreams[streamId].indexOf(sender);
              if (idx !== -1) {
                pc._shimmedLocalStreams[streamId].splice(idx, 1);
              }
              if (pc._shimmedLocalStreams[streamId].length === 1) {
                delete pc._shimmedLocalStreams[streamId];
              }
            });
          }
          return origRemoveTrack.apply(this, arguments);
        };
      },

      shimAddTrackRemoveTrack: function(window) {
        var browserDetails = utils.detectBrowser(window);
        // shim addTrack and removeTrack.
        if (window.RTCPeerConnection.prototype.addTrack &&
            browserDetails.version >= 65) {
          return this.shimAddTrackRemoveTrackWithNative(window);
        }

        // also shim pc.getLocalStreams when addTrack is shimmed
        // to return the original streams.
        var origGetLocalStreams = window.RTCPeerConnection.prototype
            .getLocalStreams;
        window.RTCPeerConnection.prototype.getLocalStreams = function() {
          var pc = this;
          var nativeStreams = origGetLocalStreams.apply(this);
          pc._reverseStreams = pc._reverseStreams || {};
          return nativeStreams.map(function(stream) {
            return pc._reverseStreams[stream.id];
          });
        };

        var origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function(stream) {
          var pc = this;
          pc._streams = pc._streams || {};
          pc._reverseStreams = pc._reverseStreams || {};

          stream.getTracks().forEach(function(track) {
            var alreadyExists = pc.getSenders().find(function(s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.',
                  'InvalidAccessError');
            }
          });
          // Add identity mapping for consistency with addTrack.
          // Unless this is being used with a stream from addTrack.
          if (!pc._reverseStreams[stream.id]) {
            var newStream = new window.MediaStream(stream.getTracks());
            pc._streams[stream.id] = newStream;
            pc._reverseStreams[newStream.id] = stream;
            stream = newStream;
          }
          origAddStream.apply(pc, [stream]);
        };

        var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function(stream) {
          var pc = this;
          pc._streams = pc._streams || {};
          pc._reverseStreams = pc._reverseStreams || {};

          origRemoveStream.apply(pc, [(pc._streams[stream.id] || stream)]);
          delete pc._reverseStreams[(pc._streams[stream.id] ?
              pc._streams[stream.id].id : stream.id)];
          delete pc._streams[stream.id];
        };

        window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
          var pc = this;
          if (pc.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          var streams = [].slice.call(arguments, 1);
          if (streams.length !== 1 ||
              !streams[0].getTracks().find(function(t) {
                return t === track;
              })) {
            // this is not fully correct but all we can manage without
            // [[associated MediaStreams]] internal slot.
            throw new DOMException(
              'The adapter.js addTrack polyfill only supports a single ' +
              ' stream which is associated with the specified track.',
              'NotSupportedError');
          }

          var alreadyExists = pc.getSenders().find(function(s) {
            return s.track === track;
          });
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }

          pc._streams = pc._streams || {};
          pc._reverseStreams = pc._reverseStreams || {};
          var oldStream = pc._streams[stream.id];
          if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);

            // Trigger ONN async.
            Promise.resolve().then(function() {
              pc.dispatchEvent(new Event('negotiationneeded'));
            });
          } else {
            var newStream = new window.MediaStream([track]);
            pc._streams[stream.id] = newStream;
            pc._reverseStreams[newStream.id] = stream;
            pc.addStream(newStream);
          }
          return pc.getSenders().find(function(s) {
            return s.track === track;
          });
        };

        // replace the internal stream id with the external one and
        // vice versa.
        function replaceInternalStreamId(pc, description) {
          var sdp = description.sdp;
          Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
                externalStream.id);
          });
          return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
          });
        }
        function replaceExternalStreamId(pc, description) {
          var sdp = description.sdp;
          Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
                internalStream.id);
          });
          return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
          });
        }
        ['createOffer', 'createAnswer'].forEach(function(method) {
          var nativeMethod = window.RTCPeerConnection.prototype[method];
          window.RTCPeerConnection.prototype[method] = function() {
            var pc = this;
            var args = arguments;
            var isLegacyCall = arguments.length &&
                typeof arguments[0] === 'function';
            if (isLegacyCall) {
              return nativeMethod.apply(pc, [
                function(description) {
                  var desc = replaceInternalStreamId(pc, description);
                  args[0].apply(null, [desc]);
                },
                function(err) {
                  if (args[1]) {
                    args[1].apply(null, err);
                  }
                }, arguments[2]
              ]);
            }
            return nativeMethod.apply(pc, arguments)
            .then(function(description) {
              return replaceInternalStreamId(pc, description);
            });
          };
        });

        var origSetLocalDescription =
            window.RTCPeerConnection.prototype.setLocalDescription;
        window.RTCPeerConnection.prototype.setLocalDescription = function() {
          var pc = this;
          if (!arguments.length || !arguments[0].type) {
            return origSetLocalDescription.apply(pc, arguments);
          }
          arguments[0] = replaceExternalStreamId(pc, arguments[0]);
          return origSetLocalDescription.apply(pc, arguments);
        };

        // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

        var origLocalDescription = Object.getOwnPropertyDescriptor(
            window.RTCPeerConnection.prototype, 'localDescription');
        Object.defineProperty(window.RTCPeerConnection.prototype,
            'localDescription', {
              get: function() {
                var pc = this;
                var description = origLocalDescription.get.apply(this);
                if (description.type === '') {
                  return description;
                }
                return replaceInternalStreamId(pc, description);
              }
            });

        window.RTCPeerConnection.prototype.removeTrack = function(sender) {
          var pc = this;
          if (pc.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          // We can not yet check for sender instanceof RTCRtpSender
          // since we shim RTPSender. So we check if sender._pc is set.
          if (!sender._pc) {
            throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
                'does not implement interface RTCRtpSender.', 'TypeError');
          }
          var isLocal = sender._pc === pc;
          if (!isLocal) {
            throw new DOMException('Sender was not created by this connection.',
                'InvalidAccessError');
          }

          // Search for the native stream the senders track belongs to.
          pc._streams = pc._streams || {};
          var stream;
          Object.keys(pc._streams).forEach(function(streamid) {
            var hasTrack = pc._streams[streamid].getTracks().find(function(track) {
              return sender.track === track;
            });
            if (hasTrack) {
              stream = pc._streams[streamid];
            }
          });

          if (stream) {
            if (stream.getTracks().length === 1) {
              // if this is the last track of the stream, remove the stream. This
              // takes care of any shimmed _senders.
              pc.removeStream(pc._reverseStreams[stream.id]);
            } else {
              // relying on the same odd chrome behaviour as above.
              stream.removeTrack(sender.track);
            }
            pc.dispatchEvent(new Event('negotiationneeded'));
          }
        };
      },

      shimPeerConnection: function(window) {
        var browserDetails = utils.detectBrowser(window);

        // The RTCPeerConnection object.
        if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
          window.RTCPeerConnection = function(pcConfig, pcConstraints) {
            // Translate iceTransportPolicy to iceTransports,
            // see https://code.google.com/p/webrtc/issues/detail?id=4869
            // this was fixed in M56 along with unprefixing RTCPeerConnection.
            logging('PeerConnection');
            if (pcConfig && pcConfig.iceTransportPolicy) {
              pcConfig.iceTransports = pcConfig.iceTransportPolicy;
            }

            return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
          };
          window.RTCPeerConnection.prototype =
              window.webkitRTCPeerConnection.prototype;
          // wrap static methods. Currently just generateCertificate.
          if (window.webkitRTCPeerConnection.generateCertificate) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function() {
                return window.webkitRTCPeerConnection.generateCertificate;
              }
            });
          }
        } else {
          // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
          var OrigPeerConnection = window.RTCPeerConnection;
          window.RTCPeerConnection = function(pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              var newIceServers = [];
              for (var i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty('urls') &&
                    server.hasOwnProperty('url')) {
                  utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                  server = JSON.parse(JSON.stringify(server));
                  server.urls = server.url;
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
          Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
            get: function() {
              return OrigPeerConnection.generateCertificate;
            }
          });
        }

        var origGetStats = window.RTCPeerConnection.prototype.getStats;
        window.RTCPeerConnection.prototype.getStats = function(selector,
            successCallback, errorCallback) {
          var pc = this;
          var args = arguments;

          // If selector is a function then we are in the old style stats so just
          // pass back the original getStats format to avoid breaking old users.
          if (arguments.length > 0 && typeof selector === 'function') {
            return origGetStats.apply(this, arguments);
          }

          // When spec-style getStats is supported, return those when called with
          // either no arguments or the selector argument is null.
          if (origGetStats.length === 0 && (arguments.length === 0 ||
              typeof arguments[0] !== 'function')) {
            return origGetStats.apply(this, []);
          }

          var fixChromeStats_ = function(response) {
            var standardReport = {};
            var reports = response.result();
            reports.forEach(function(report) {
              var standardStats = {
                id: report.id,
                timestamp: report.timestamp,
                type: {
                  localcandidate: 'local-candidate',
                  remotecandidate: 'remote-candidate'
                }[report.type] || report.type
              };
              report.names().forEach(function(name) {
                standardStats[name] = report.stat(name);
              });
              standardReport[standardStats.id] = standardStats;
            });

            return standardReport;
          };

          // shim getStats with maplike support
          var makeMapStats = function(stats) {
            return new Map(Object.keys(stats).map(function(key) {
              return [key, stats[key]];
            }));
          };

          if (arguments.length >= 2) {
            var successCallbackWrapper_ = function(response) {
              args[1](makeMapStats(fixChromeStats_(response)));
            };

            return origGetStats.apply(this, [successCallbackWrapper_,
              arguments[0]]);
          }

          // promise-support
          return new Promise(function(resolve, reject) {
            origGetStats.apply(pc, [
              function(response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
          }).then(successCallback, errorCallback);
        };

        // add promise support -- natively available in Chrome 51
        if (browserDetails.version < 51) {
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
              .forEach(function(method) {
                var nativeMethod = window.RTCPeerConnection.prototype[method];
                window.RTCPeerConnection.prototype[method] = function() {
                  var args = arguments;
                  var pc = this;
                  var promise = new Promise(function(resolve, reject) {
                    nativeMethod.apply(pc, [args[0], resolve, reject]);
                  });
                  if (args.length < 2) {
                    return promise;
                  }
                  return promise.then(function() {
                    args[1].apply(null, []);
                  },
                  function(err) {
                    if (args.length >= 3) {
                      args[2].apply(null, [err]);
                    }
                  });
                };
              });
        }

        // promise support for createOffer and createAnswer. Available (without
        // bugs) since M52: crbug/619289
        if (browserDetails.version < 52) {
          ['createOffer', 'createAnswer'].forEach(function(method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function() {
              var pc = this;
              if (arguments.length < 1 || (arguments.length === 1 &&
                  typeof arguments[0] === 'object')) {
                var opts = arguments.length === 1 ? arguments[0] : undefined;
                return new Promise(function(resolve, reject) {
                  nativeMethod.apply(pc, [resolve, reject, opts]);
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });
        }

        // shim implicit creation of RTCSessionDescription/RTCIceCandidate
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              var nativeMethod = window.RTCPeerConnection.prototype[method];
              window.RTCPeerConnection.prototype[method] = function() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              };
            });

        // support for addIceCandidate(null or undefined)
        var nativeAddIceCandidate =
            window.RTCPeerConnection.prototype.addIceCandidate;
        window.RTCPeerConnection.prototype.addIceCandidate = function() {
          if (!arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }
            return Promise.resolve();
          }
          return nativeAddIceCandidate.apply(this, arguments);
        };
      }
    };

    },{"../utils.js":13,"./getusermedia":6}],6:[function(require,module,exports){
    var utils = require('../utils.js');
    var logging = utils.log;

    // Expose public methods.
    module.exports = function(window) {
      var browserDetails = utils.detectBrowser(window);
      var navigator = window && window.navigator;

      var constraintsToChrome_ = function(c) {
        if (typeof c !== 'object' || c.mandatory || c.optional) {
          return c;
        }
        var cc = {};
        Object.keys(c).forEach(function(key) {
          if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
            return;
          }
          var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
          if (r.exact !== undefined && typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          }
          var oldname_ = function(prefix, name) {
            if (prefix) {
              return prefix + name.charAt(0).toUpperCase() + name.slice(1);
            }
            return (name === 'deviceId') ? 'sourceId' : name;
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
            ['min', 'max'].forEach(function(mix) {
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

      var shimConstraints_ = function(constraints, func) {
        if (browserDetails.version >= 61) {
          return func(constraints);
        }
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === 'object') {
          var remap = function(obj, a, b) {
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
        if (constraints && typeof constraints.video === 'object') {
          // Shim facingMode for mobile & surface pro.
          var face = constraints.video.facingMode;
          face = face && ((typeof face === 'object') ? face : {ideal: face});
          var getSupportedFacingModeLies = browserDetails.version < 66;

          if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                        face.ideal === 'user' || face.ideal === 'environment')) &&
              !(navigator.mediaDevices.getSupportedConstraints &&
                navigator.mediaDevices.getSupportedConstraints().facingMode &&
                !getSupportedFacingModeLies)) {
            delete constraints.video.facingMode;
            var matches;
            if (face.exact === 'environment' || face.ideal === 'environment') {
              matches = ['back', 'rear'];
            } else if (face.exact === 'user' || face.ideal === 'user') {
              matches = ['front'];
            }
            if (matches) {
              // Look for matches in label, or use last cam for back (typical).
              return navigator.mediaDevices.enumerateDevices()
              .then(function(devices) {
                devices = devices.filter(function(d) {
                  return d.kind === 'videoinput';
                });
                var dev = devices.find(function(d) {
                  return matches.some(function(match) {
                    return d.label.toLowerCase().indexOf(match) !== -1;
                  });
                });
                if (!dev && devices.length && matches.indexOf('back') !== -1) {
                  dev = devices[devices.length - 1]; // more likely the back cam
                }
                if (dev) {
                  constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
                                                            {ideal: dev.deviceId};
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

      var shimError_ = function(e) {
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
          constraint: e.constraintName,
          toString: function() {
            return this.name + (this.message && ': ') + this.message;
          }
        };
      };

      var getUserMedia_ = function(constraints, onSuccess, onError) {
        shimConstraints_(constraints, function(c) {
          navigator.webkitGetUserMedia(c, onSuccess, function(e) {
            if (onError) {
              onError(shimError_(e));
            }
          });
        });
      };

      navigator.getUserMedia = getUserMedia_;

      // Returns the result of getUserMedia as a Promise.
      var getUserMediaPromise_ = function(constraints) {
        return new Promise(function(resolve, reject) {
          navigator.getUserMedia(constraints, resolve, reject);
        });
      };

      if (!navigator.mediaDevices) {
        navigator.mediaDevices = {
          getUserMedia: getUserMediaPromise_,
          enumerateDevices: function() {
            return new Promise(function(resolve) {
              var kinds = {audio: 'audioinput', video: 'videoinput'};
              return window.MediaStreamTrack.getSources(function(devices) {
                resolve(devices.map(function(device) {
                  return {label: device.label,
                    kind: kinds[device.kind],
                    deviceId: device.id,
                    groupId: ''};
                }));
              });
            });
          },
          getSupportedConstraints: function() {
            return {
              deviceId: true, echoCancellation: true, facingMode: true,
              frameRate: true, height: true, width: true
            };
          }
        };
      }

      // A shim for getUserMedia method on the mediaDevices object.
      // TODO(KaptenJansson) remove once implemented in Chrome stable.
      if (!navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          return getUserMediaPromise_(constraints);
        };
      } else {
        // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
        // function which returns a Promise, it does not accept spec-style
        // constraints.
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
          return shimConstraints_(cs, function(c) {
            return origGetUserMedia(c).then(function(stream) {
              if (c.audio && !stream.getAudioTracks().length ||
                  c.video && !stream.getVideoTracks().length) {
                stream.getTracks().forEach(function(track) {
                  track.stop();
                });
                throw new DOMException('', 'NotFoundError');
              }
              return stream;
            }, function(e) {
              return Promise.reject(shimError_(e));
            });
          });
        };
      }

      // Dummy devicechange event methods.
      // TODO(KaptenJansson) remove once implemented in Chrome stable.
      if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
        navigator.mediaDevices.addEventListener = function() {
          logging('Dummy mediaDevices.addEventListener called.');
        };
      }
      if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
        navigator.mediaDevices.removeEventListener = function() {
          logging('Dummy mediaDevices.removeEventListener called.');
        };
      }
    };

    },{"../utils.js":13}],7:[function(require,module,exports){

    var SDPUtils = require('sdp');
    var utils = require('./utils');

    module.exports = {
      shimRTCIceCandidate: function(window) {
        // foundation is arbitrarily chosen as an indicator for full support for
        // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
        if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
            window.RTCIceCandidate.prototype)) {
          return;
        }

        var NativeRTCIceCandidate = window.RTCIceCandidate;
        window.RTCIceCandidate = function(args) {
          // Remove the a= which shouldn't be part of the candidate string.
          if (typeof args === 'object' && args.candidate &&
              args.candidate.indexOf('a=') === 0) {
            args = JSON.parse(JSON.stringify(args));
            args.candidate = args.candidate.substr(2);
          }

          if (args.candidate && args.candidate.length) {
            // Augment the native candidate with the parsed fields.
            var nativeCandidate = new NativeRTCIceCandidate(args);
            var parsedCandidate = SDPUtils.parseCandidate(args.candidate);
            var augmentedCandidate = Object.assign(nativeCandidate,
                parsedCandidate);

            // Add a serializer that does not serialize the extra attributes.
            augmentedCandidate.toJSON = function() {
              return {
                candidate: augmentedCandidate.candidate,
                sdpMid: augmentedCandidate.sdpMid,
                sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                usernameFragment: augmentedCandidate.usernameFragment,
              };
            };
            return augmentedCandidate;
          }
          return new NativeRTCIceCandidate(args);
        };
        window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

        // Hook up the augmented candidate in onicecandidate and
        // addEventListener('icecandidate', ...)
        utils.wrapPeerConnectionEvent(window, 'icecandidate', function(e) {
          if (e.candidate) {
            Object.defineProperty(e, 'candidate', {
              value: new window.RTCIceCandidate(e.candidate),
              writable: 'false'
            });
          }
          return e;
        });
      },

      // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

      shimCreateObjectURL: function(window) {
        var URL = window && window.URL;

        if (!(typeof window === 'object' && window.HTMLMediaElement &&
              'srcObject' in window.HTMLMediaElement.prototype &&
            URL.createObjectURL && URL.revokeObjectURL)) {
          // Only shim CreateObjectURL using srcObject if srcObject exists.
          return undefined;
        }

        var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
        var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
        var streams = new Map(), newId = 0;

        URL.createObjectURL = function(stream) {
          if ('getTracks' in stream) {
            var url = 'polyblob:' + (++newId);
            streams.set(url, stream);
            utils.deprecated('URL.createObjectURL(stream)',
                'elem.srcObject = stream');
            return url;
          }
          return nativeCreateObjectURL(stream);
        };
        URL.revokeObjectURL = function(url) {
          nativeRevokeObjectURL(url);
          streams.delete(url);
        };

        var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,
                                                  'src');
        Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
          get: function() {
            return dsc.get.apply(this);
          },
          set: function(url) {
            this.srcObject = streams.get(url) || null;
            return dsc.set.apply(this, [url]);
          }
        });

        var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
        window.HTMLMediaElement.prototype.setAttribute = function() {
          if (arguments.length === 2 &&
              ('' + arguments[0]).toLowerCase() === 'src') {
            this.srcObject = streams.get(arguments[1]) || null;
          }
          return nativeSetAttribute.apply(this, arguments);
        };
      },

      shimMaxMessageSize: function(window) {
        if (window.RTCSctpTransport || !window.RTCPeerConnection) {
          return;
        }
        var browserDetails = utils.detectBrowser(window);

        if (!('sctp' in window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
            get: function() {
              return typeof this._sctp === 'undefined' ? null : this._sctp;
            }
          });
        }

        var sctpInDescription = function(description) {
          var sections = SDPUtils.splitSections(description.sdp);
          sections.shift();
          return sections.some(function(mediaSection) {
            var mLine = SDPUtils.parseMLine(mediaSection);
            return mLine && mLine.kind === 'application'
                && mLine.protocol.indexOf('SCTP') !== -1;
          });
        };

        var getRemoteFirefoxVersion = function(description) {
          // TODO: Is there a better solution for detecting Firefox?
          var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
          if (match === null || match.length < 2) {
            return -1;
          }
          var version = parseInt(match[1], 10);
          // Test for NaN (yes, this is ugly)
          return version !== version ? -1 : version;
        };

        var getCanSendMaxMessageSize = function(remoteIsFirefox) {
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
            } else {
              // Currently, all FF >= 57 will reset the remote maximum message size
              // to the default value when a data channel is created at a later
              // stage. :(
              // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
              canSendMaxMessageSize =
                browserDetails.version === 57 ? 65535 : 65536;
            }
          }
          return canSendMaxMessageSize;
        };

        var getMaxMessageSize = function(description, remoteIsFirefox) {
          // Note: 65536 bytes is the default value from the SDP spec. Also,
          //       every implementation we know supports receiving 65536 bytes.
          var maxMessageSize = 65536;

          // FF 57 has a slightly incorrect default remote max message size, so
          // we need to adjust it here to avoid a failure when sending.
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
          if (browserDetails.browser === 'firefox'
               && browserDetails.version === 57) {
            maxMessageSize = 65535;
          }

          var match = SDPUtils.matchPrefix(description.sdp, 'a=max-message-size:');
          if (match.length > 0) {
            maxMessageSize = parseInt(match[0].substr(19), 10);
          } else if (browserDetails.browser === 'firefox' &&
                      remoteIsFirefox !== -1) {
            // If the maximum message size is not present in the remote SDP and
            // both local and remote are Firefox, the remote peer can receive
            // ~2 GiB.
            maxMessageSize = 2147483637;
          }
          return maxMessageSize;
        };

        var origSetRemoteDescription =
            window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function() {
          var pc = this;
          pc._sctp = null;

          if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            var isFirefox = getRemoteFirefoxVersion(arguments[0]);

            // Get the maximum message size the local peer is capable of sending
            var canSendMMS = getCanSendMaxMessageSize(isFirefox);

            // Get the maximum message size of the remote peer.
            var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

            // Determine final maximum message size
            var maxMessageSize;
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
              get: function() {
                return maxMessageSize;
              }
            });
            pc._sctp = sctp;
          }

          return origSetRemoteDescription.apply(pc, arguments);
        };
      },

      shimSendThrowTypeError: function(window) {
        if (!(window.RTCPeerConnection &&
            'createDataChannel' in window.RTCPeerConnection.prototype)) {
          return;
        }

        // Note: Although Firefox >= 57 has a native implementation, the maximum
        //       message size can be reset for all data channels at a later stage.
        //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

        var origCreateDataChannel =
          window.RTCPeerConnection.prototype.createDataChannel;
        window.RTCPeerConnection.prototype.createDataChannel = function() {
          var pc = this;
          var dataChannel = origCreateDataChannel.apply(pc, arguments);
          var origDataChannelSend = dataChannel.send;

          // Patch 'send' method
          dataChannel.send = function() {
            var dc = this;
            var data = arguments[0];
            var length = data.length || data.size || data.byteLength;
            if (length > pc.sctp.maxMessageSize) {
              throw new DOMException('Message too large (can send a maximum of ' +
                pc.sctp.maxMessageSize + ' bytes)', 'TypeError');
            }
            return origDataChannelSend.apply(dc, arguments);
          };

          return dataChannel;
        };
      }
    };

    },{"./utils":13,"sdp":2}],8:[function(require,module,exports){

    var utils = require('../utils');
    var shimRTCPeerConnection = require('rtcpeerconnection-shim');

    module.exports = {
      shimGetUserMedia: require('./getusermedia'),
      shimPeerConnection: function(window) {
        var browserDetails = utils.detectBrowser(window);

        if (window.RTCIceGatherer) {
          if (!window.RTCIceCandidate) {
            window.RTCIceCandidate = function(args) {
              return args;
            };
          }
          if (!window.RTCSessionDescription) {
            window.RTCSessionDescription = function(args) {
              return args;
            };
          }
          // this adds an additional event listener to MediaStrackTrack that signals
          // when a tracks enabled property was changed. Workaround for a bug in
          // addStream, see below. No longer required in 15025+
          if (browserDetails.version < 15025) {
            var origMSTEnabled = Object.getOwnPropertyDescriptor(
                window.MediaStreamTrack.prototype, 'enabled');
            Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
              set: function(value) {
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
            get: function() {
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

        window.RTCPeerConnection =
            shimRTCPeerConnection(window, browserDetails.version);
      },
      shimReplaceTrack: function(window) {
        // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
        if (window.RTCRtpSender &&
            !('replaceTrack' in window.RTCRtpSender.prototype)) {
          window.RTCRtpSender.prototype.replaceTrack =
              window.RTCRtpSender.prototype.setTrack;
        }
      }
    };

    },{"../utils":13,"./getusermedia":9,"rtcpeerconnection-shim":1}],9:[function(require,module,exports){

    // Expose public methods.
    module.exports = function(window) {
      var navigator = window && window.navigator;

      var shimError_ = function(e) {
        return {
          name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
          message: e.message,
          constraint: e.constraint,
          toString: function() {
            return this.name;
          }
        };
      };

      // getUserMedia error shim.
      var origGetUserMedia = navigator.mediaDevices.getUserMedia.
          bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function(c) {
        return origGetUserMedia(c).catch(function(e) {
          return Promise.reject(shimError_(e));
        });
      };
    };

    },{}],10:[function(require,module,exports){

    var utils = require('../utils');

    module.exports = {
      shimGetUserMedia: require('./getusermedia'),
      shimOnTrack: function(window) {
        if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
            window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
            get: function() {
              return this._ontrack;
            },
            set: function(f) {
              if (this._ontrack) {
                this.removeEventListener('track', this._ontrack);
                this.removeEventListener('addstream', this._ontrackpoly);
              }
              this.addEventListener('track', this._ontrack = f);
              this.addEventListener('addstream', this._ontrackpoly = function(e) {
                e.stream.getTracks().forEach(function(track) {
                  var event = new Event('track');
                  event.track = track;
                  event.receiver = {track: track};
                  event.transceiver = {receiver: event.receiver};
                  event.streams = [e.stream];
                  this.dispatchEvent(event);
                }.bind(this));
              }.bind(this));
            }
          });
        }
        if (typeof window === 'object' && window.RTCTrackEvent &&
            ('receiver' in window.RTCTrackEvent.prototype) &&
            !('transceiver' in window.RTCTrackEvent.prototype)) {
          Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
            get: function() {
              return {receiver: this.receiver};
            }
          });
        }
      },

      shimSourceObject: function(window) {
        // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
        if (typeof window === 'object') {
          if (window.HTMLMediaElement &&
            !('srcObject' in window.HTMLMediaElement.prototype)) {
            // Shim the srcObject property, once, when HTMLMediaElement is found.
            Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
              get: function() {
                return this.mozSrcObject;
              },
              set: function(stream) {
                this.mozSrcObject = stream;
              }
            });
          }
        }
      },

      shimPeerConnection: function(window) {
        var browserDetails = utils.detectBrowser(window);

        if (typeof window !== 'object' || !(window.RTCPeerConnection ||
            window.mozRTCPeerConnection)) {
          return; // probably media.peerconnection.enabled=false in about:config
        }
        // The RTCPeerConnection object.
        if (!window.RTCPeerConnection) {
          window.RTCPeerConnection = function(pcConfig, pcConstraints) {
            if (browserDetails.version < 38) {
              // .urls is not supported in FF < 38.
              // create RTCIceServers with a single url.
              if (pcConfig && pcConfig.iceServers) {
                var newIceServers = [];
                for (var i = 0; i < pcConfig.iceServers.length; i++) {
                  var server = pcConfig.iceServers[i];
                  if (server.hasOwnProperty('urls')) {
                    for (var j = 0; j < server.urls.length; j++) {
                      var newServer = {
                        url: server.urls[j]
                      };
                      if (server.urls[j].indexOf('turn') === 0) {
                        newServer.username = server.username;
                        newServer.credential = server.credential;
                      }
                      newIceServers.push(newServer);
                    }
                  } else {
                    newIceServers.push(pcConfig.iceServers[i]);
                  }
                }
                pcConfig.iceServers = newIceServers;
              }
            }
            return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
          };
          window.RTCPeerConnection.prototype =
              window.mozRTCPeerConnection.prototype;

          // wrap static methods. Currently just generateCertificate.
          if (window.mozRTCPeerConnection.generateCertificate) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function() {
                return window.mozRTCPeerConnection.generateCertificate;
              }
            });
          }

          window.RTCSessionDescription = window.mozRTCSessionDescription;
          window.RTCIceCandidate = window.mozRTCIceCandidate;
        }

        // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              var nativeMethod = window.RTCPeerConnection.prototype[method];
              window.RTCPeerConnection.prototype[method] = function() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              };
            });

        // support for addIceCandidate(null or undefined)
        var nativeAddIceCandidate =
            window.RTCPeerConnection.prototype.addIceCandidate;
        window.RTCPeerConnection.prototype.addIceCandidate = function() {
          if (!arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }
            return Promise.resolve();
          }
          return nativeAddIceCandidate.apply(this, arguments);
        };

        // shim getStats with maplike support
        var makeMapStats = function(stats) {
          var map = new Map();
          Object.keys(stats).forEach(function(key) {
            map.set(key, stats[key]);
            map[key] = stats[key];
          });
          return map;
        };

        var modernStatsTypes = {
          inboundrtp: 'inbound-rtp',
          outboundrtp: 'outbound-rtp',
          candidatepair: 'candidate-pair',
          localcandidate: 'local-candidate',
          remotecandidate: 'remote-candidate'
        };

        var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
        window.RTCPeerConnection.prototype.getStats = function(
          selector,
          onSucc,
          onErr
        ) {
          return nativeGetStats.apply(this, [selector || null])
            .then(function(stats) {
              if (browserDetails.version < 48) {
                stats = makeMapStats(stats);
              }
              if (browserDetails.version < 53 && !onSucc) {
                // Shim only promise getStats with spec-hyphens in type names
                // Leave callback version alone; misc old uses of forEach before Map
                try {
                  stats.forEach(function(stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                  });
                } catch (e) {
                  if (e.name !== 'TypeError') {
                    throw e;
                  }
                  // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                  stats.forEach(function(stat, i) {
                    stats.set(i, Object.assign({}, stat, {
                      type: modernStatsTypes[stat.type] || stat.type
                    }));
                  });
                }
              }
              return stats;
            })
            .then(onSucc, onErr);
        };
      },

      shimRemoveStream: function(window) {
        if (!window.RTCPeerConnection ||
            'removeStream' in window.RTCPeerConnection.prototype) {
          return;
        }
        window.RTCPeerConnection.prototype.removeStream = function(stream) {
          var pc = this;
          utils.deprecated('removeStream', 'removeTrack');
          this.getSenders().forEach(function(sender) {
            if (sender.track && stream.getTracks().indexOf(sender.track) !== -1) {
              pc.removeTrack(sender);
            }
          });
        };
      }
    };

    },{"../utils":13,"./getusermedia":11}],11:[function(require,module,exports){

    var utils = require('../utils');
    var logging = utils.log;

    // Expose public methods.
    module.exports = function(window) {
      var browserDetails = utils.detectBrowser(window);
      var navigator = window && window.navigator;
      var MediaStreamTrack = window && window.MediaStreamTrack;

      var shimError_ = function(e) {
        return {
          name: {
            InternalError: 'NotReadableError',
            NotSupportedError: 'TypeError',
            PermissionDeniedError: 'NotAllowedError',
            SecurityError: 'NotAllowedError'
          }[e.name] || e.name,
          message: {
            'The operation is insecure.': 'The request is not allowed by the ' +
            'user agent or the platform in the current context.'
          }[e.message] || e.message,
          constraint: e.constraint,
          toString: function() {
            return this.name + (this.message && ': ') + this.message;
          }
        };
      };

      // getUserMedia constraints shim.
      var getUserMedia_ = function(constraints, onSuccess, onError) {
        var constraintsToFF37_ = function(c) {
          if (typeof c !== 'object' || c.require) {
            return c;
          }
          var require = [];
          Object.keys(c).forEach(function(key) {
            if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
              return;
            }
            var r = c[key] = (typeof c[key] === 'object') ?
                c[key] : {ideal: c[key]};
            if (r.min !== undefined ||
                r.max !== undefined || r.exact !== undefined) {
              require.push(key);
            }
            if (r.exact !== undefined) {
              if (typeof r.exact === 'number') {
                r. min = r.max = r.exact;
              } else {
                c[key] = r.exact;
              }
              delete r.exact;
            }
            if (r.ideal !== undefined) {
              c.advanced = c.advanced || [];
              var oc = {};
              if (typeof r.ideal === 'number') {
                oc[key] = {min: r.ideal, max: r.ideal};
              } else {
                oc[key] = r.ideal;
              }
              c.advanced.push(oc);
              delete r.ideal;
              if (!Object.keys(r).length) {
                delete c[key];
              }
            }
          });
          if (require.length) {
            c.require = require;
          }
          return c;
        };
        constraints = JSON.parse(JSON.stringify(constraints));
        if (browserDetails.version < 38) {
          logging('spec: ' + JSON.stringify(constraints));
          if (constraints.audio) {
            constraints.audio = constraintsToFF37_(constraints.audio);
          }
          if (constraints.video) {
            constraints.video = constraintsToFF37_(constraints.video);
          }
          logging('ff37: ' + JSON.stringify(constraints));
        }
        return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
          onError(shimError_(e));
        });
      };

      // Returns the result of getUserMedia as a Promise.
      var getUserMediaPromise_ = function(constraints) {
        return new Promise(function(resolve, reject) {
          getUserMedia_(constraints, resolve, reject);
        });
      };

      // Shim for mediaDevices on older versions.
      if (!navigator.mediaDevices) {
        navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
          addEventListener: function() { },
          removeEventListener: function() { }
        };
      }
      navigator.mediaDevices.enumerateDevices =
          navigator.mediaDevices.enumerateDevices || function() {
            return new Promise(function(resolve) {
              var infos = [
                {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
                {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
              ];
              resolve(infos);
            });
          };

      if (browserDetails.version < 41) {
        // Work around http://bugzil.la/1169665
        var orgEnumerateDevices =
            navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
        navigator.mediaDevices.enumerateDevices = function() {
          return orgEnumerateDevices().then(undefined, function(e) {
            if (e.name === 'NotFoundError') {
              return [];
            }
            throw e;
          });
        };
      }
      if (browserDetails.version < 49) {
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
          return origGetUserMedia(c).then(function(stream) {
            // Work around https://bugzil.la/802326
            if (c.audio && !stream.getAudioTracks().length ||
                c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(function(track) {
                track.stop();
              });
              throw new DOMException('The object can not be found here.',
                                     'NotFoundError');
            }
            return stream;
          }, function(e) {
            return Promise.reject(shimError_(e));
          });
        };
      }
      if (!(browserDetails.version > 55 &&
          'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
        var remap = function(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };

        var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
          if (typeof c === 'object' && typeof c.audio === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeGetUserMedia(c);
        };

        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
          var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
          MediaStreamTrack.prototype.getSettings = function() {
            var obj = nativeGetSettings.apply(this, arguments);
            remap(obj, 'mozAutoGainControl', 'autoGainControl');
            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
            return obj;
          };
        }

        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
          var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
          MediaStreamTrack.prototype.applyConstraints = function(c) {
            if (this.kind === 'audio' && typeof c === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c, 'autoGainControl', 'mozAutoGainControl');
              remap(c, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeApplyConstraints.apply(this, [c]);
          };
        }
      }
      navigator.getUserMedia = function(constraints, onSuccess, onError) {
        if (browserDetails.version < 44) {
          return getUserMedia_(constraints, onSuccess, onError);
        }
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        utils.deprecated('navigator.getUserMedia',
            'navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      };
    };

    },{"../utils":13}],12:[function(require,module,exports){
    var utils = require('../utils');

    module.exports = {
      shimLocalStreamsAPI: function(window) {
        if (typeof window !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.getLocalStreams = function() {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            return this._localStreams;
          };
        }
        if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.getStreamById = function(id) {
            var result = null;
            if (this._localStreams) {
              this._localStreams.forEach(function(stream) {
                if (stream.id === id) {
                  result = stream;
                }
              });
            }
            if (this._remoteStreams) {
              this._remoteStreams.forEach(function(stream) {
                if (stream.id === id) {
                  result = stream;
                }
              });
            }
            return result;
          };
        }
        if (!('addStream' in window.RTCPeerConnection.prototype)) {
          var _addTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addStream = function(stream) {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            if (this._localStreams.indexOf(stream) === -1) {
              this._localStreams.push(stream);
            }
            var pc = this;
            stream.getTracks().forEach(function(track) {
              _addTrack.call(pc, track, stream);
            });
          };

          window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
            if (stream) {
              if (!this._localStreams) {
                this._localStreams = [stream];
              } else if (this._localStreams.indexOf(stream) === -1) {
                this._localStreams.push(stream);
              }
            }
            return _addTrack.call(this, track, stream);
          };
        }
        if (!('removeStream' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.removeStream = function(stream) {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            var index = this._localStreams.indexOf(stream);
            if (index === -1) {
              return;
            }
            this._localStreams.splice(index, 1);
            var pc = this;
            var tracks = stream.getTracks();
            this.getSenders().forEach(function(sender) {
              if (tracks.indexOf(sender.track) !== -1) {
                pc.removeTrack(sender);
              }
            });
          };
        }
      },
      shimRemoteStreamsAPI: function(window) {
        if (typeof window !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.getRemoteStreams = function() {
            return this._remoteStreams ? this._remoteStreams : [];
          };
        }
        if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
            get: function() {
              return this._onaddstream;
            },
            set: function(f) {
              var pc = this;
              if (this._onaddstream) {
                this.removeEventListener('addstream', this._onaddstream);
                this.removeEventListener('track', this._onaddstreampoly);
              }
              this.addEventListener('addstream', this._onaddstream = f);
              this.addEventListener('track', this._onaddstreampoly = function(e) {
                e.streams.forEach(function(stream) {
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
          });
        }
      },
      shimCallbacksAPI: function(window) {
        if (typeof window !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        var prototype = window.RTCPeerConnection.prototype;
        var createOffer = prototype.createOffer;
        var createAnswer = prototype.createAnswer;
        var setLocalDescription = prototype.setLocalDescription;
        var setRemoteDescription = prototype.setRemoteDescription;
        var addIceCandidate = prototype.addIceCandidate;

        prototype.createOffer = function(successCallback, failureCallback) {
          var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          var promise = createOffer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

        prototype.createAnswer = function(successCallback, failureCallback) {
          var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          var promise = createAnswer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

        var withCallback = function(description, successCallback, failureCallback) {
          var promise = setLocalDescription.apply(this, [description]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.setLocalDescription = withCallback;

        withCallback = function(description, successCallback, failureCallback) {
          var promise = setRemoteDescription.apply(this, [description]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.setRemoteDescription = withCallback;

        withCallback = function(candidate, successCallback, failureCallback) {
          var promise = addIceCandidate.apply(this, [candidate]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.addIceCandidate = withCallback;
      },
      shimGetUserMedia: function(window) {
        var navigator = window && window.navigator;

        if (!navigator.getUserMedia) {
          if (navigator.webkitGetUserMedia) {
            navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
          } else if (navigator.mediaDevices &&
              navigator.mediaDevices.getUserMedia) {
            navigator.getUserMedia = function(constraints, cb, errcb) {
              navigator.mediaDevices.getUserMedia(constraints)
              .then(cb, errcb);
            }.bind(navigator);
          }
        }
      },
      shimRTCIceServerUrls: function(window) {
        // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
        var OrigPeerConnection = window.RTCPeerConnection;
        window.RTCPeerConnection = function(pcConfig, pcConstraints) {
          if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for (var i = 0; i < pcConfig.iceServers.length; i++) {
              var server = pcConfig.iceServers[i];
              if (!server.hasOwnProperty('urls') &&
                  server.hasOwnProperty('url')) {
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
            get: function() {
              return OrigPeerConnection.generateCertificate;
            }
          });
        }
      },
      shimTrackEventTransceiver: function(window) {
        // Add event.transceiver member over deprecated event.receiver
        if (typeof window === 'object' && window.RTCPeerConnection &&
            ('receiver' in window.RTCTrackEvent.prototype) &&
            // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
            // defined for some reason even when window.RTCTransceiver is not.
            !window.RTCTransceiver) {
          Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
            get: function() {
              return {receiver: this.receiver};
            }
          });
        }
      },

      shimCreateOfferLegacy: function(window) {
        var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
        window.RTCPeerConnection.prototype.createOffer = function(offerOptions) {
          var pc = this;
          if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
            }
            var audioTransceiver = pc.getTransceivers().find(function(transceiver) {
              return transceiver.sender.track &&
                  transceiver.sender.track.kind === 'audio';
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
            } else if (offerOptions.offerToReceiveAudio === true &&
                !audioTransceiver) {
              pc.addTransceiver('audio');
            }


            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
            }
            var videoTransceiver = pc.getTransceivers().find(function(transceiver) {
              return transceiver.sender.track &&
                  transceiver.sender.track.kind === 'video';
            });
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
              if (videoTransceiver.direction === 'sendrecv') {
                videoTransceiver.setDirection('sendonly');
              } else if (videoTransceiver.direction === 'recvonly') {
                videoTransceiver.setDirection('inactive');
              }
            } else if (offerOptions.offerToReceiveVideo === true &&
                !videoTransceiver) {
              pc.addTransceiver('video');
            }
          }
          return origCreateOffer.apply(pc, arguments);
        };
      }
    };

    },{"../utils":13}],13:[function(require,module,exports){

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
    // which returns the modified event object.
    function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
      if (!window.RTCPeerConnection) {
        return;
      }
      var proto = window.RTCPeerConnection.prototype;
      var nativeAddEventListener = proto.addEventListener;
      proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) {
          return nativeAddEventListener.apply(this, arguments);
        }
        var wrappedCallback = function(e) {
          cb(wrapper(e));
        };
        this._eventMap = this._eventMap || {};
        this._eventMap[cb] = wrappedCallback;
        return nativeAddEventListener.apply(this, [nativeEventName,
          wrappedCallback]);
      };

      var nativeRemoveEventListener = proto.removeEventListener;
      proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap
            || !this._eventMap[cb]) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        var unwrappedCb = this._eventMap[cb];
        delete this._eventMap[cb];
        return nativeRemoveEventListener.apply(this, [nativeEventName,
          unwrappedCb]);
      };

      Object.defineProperty(proto, 'on' + eventNameToWrap, {
        get: function() {
          return this['_on' + eventNameToWrap];
        },
        set: function(cb) {
          if (this['_on' + eventNameToWrap]) {
            this.removeEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap]);
            delete this['_on' + eventNameToWrap];
          }
          if (cb) {
            this.addEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap] = cb);
          }
        }
      });
    }

    // Utility methods.
    module.exports = {
      extractVersion: extractVersion,
      wrapPeerConnectionEvent: wrapPeerConnectionEvent,
      disableLog: function(bool) {
        if (typeof bool !== 'boolean') {
          return new Error('Argument type: ' + typeof bool +
              '. Please use a boolean.');
        }
        logDisabled_ = bool;
        return (bool) ? 'adapter.js logging disabled' :
            'adapter.js logging enabled';
      },

      /**
       * Disable or enable deprecation warnings
       * @param {!boolean} bool set to true to disable warnings.
       */
      disableWarnings: function(bool) {
        if (typeof bool !== 'boolean') {
          return new Error('Argument type: ' + typeof bool +
              '. Please use a boolean.');
        }
        deprecationWarnings_ = !bool;
        return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
      },

      log: function() {
        if (typeof window === 'object') {
          if (logDisabled_) {
            return;
          }
          if (typeof console !== 'undefined' && typeof console.log === 'function') {
            console.log.apply(console, arguments);
          }
        }
      },

      /**
       * Shows a deprecation warning suggesting the modern and spec-compatible API.
       */
      deprecated: function(oldMethod, newMethod) {
        if (!deprecationWarnings_) {
          return;
        }
        console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
            ' instead.');
      },

      /**
       * Browser detector.
       *
       * @return {object} result containing browser and version
       *     properties.
       */
      detectBrowser: function(window) {
        var navigator = window && window.navigator;

        // Returned result object.
        var result = {};
        result.browser = null;
        result.version = null;

        // Fail early if it's not a browser
        if (typeof window === 'undefined' || !window.navigator) {
          result.browser = 'Not a browser.';
          return result;
        }

        if (navigator.mozGetUserMedia) { // Firefox.
          result.browser = 'firefox';
          result.version = extractVersion(navigator.userAgent,
              /Firefox\/(\d+)\./, 1);
        } else if (navigator.webkitGetUserMedia) {
          // Chrome, Chromium, Webview, Opera.
          // Version matches Chrome/WebRTC version.
          result.browser = 'chrome';
          result.version = extractVersion(navigator.userAgent,
              /Chrom(e|ium)\/(\d+)\./, 2);
        } else if (navigator.mediaDevices &&
            navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
          result.browser = 'edge';
          result.version = extractVersion(navigator.userAgent,
              /Edge\/(\d+).(\d+)$/, 2);
        } else if (window.RTCPeerConnection &&
            navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
          result.browser = 'safari';
          result.version = extractVersion(navigator.userAgent,
              /AppleWebKit\/(\d+)\./, 1);
        } else { // Default fallthrough: not supported.
          result.browser = 'Not a supported browser.';
          return result;
        }

        return result;
      }
    };

    },{}]},{},[3])(3)
    });
    });

    /**
     *  ZegoPlay
     */

    var ENUM_PLAY_STATE = {
        start: 0,
        waitingSessionRsp: 1,
        waitingServerOffer: 2,
        waitingAnswerRsp: 3,
        waitingServerICE: 4,
        connecting: 5,
        playing: 6,
        stop: 7
    };

    function ZegoPlay(logger, signal, dataReport, qualityTimeInterval) {
        this.logger = logger;
        this.signal = signal;
        this.state = ENUM_PLAY_STATE.stop;

        this.waitingICETimeInterval = 5000;
        this.waitingOfferTimeInterval = 5000;
        this.candidateInfo = [];
        
        this.waitICETimer = null;
        this.waitingOfferTimer = null;

        this.qualityTimer = null;
        this.qualityTimeInterval = qualityTimeInterval;
        this.playQualityList = [];
        this.maxQualityListCount = 10;
        this.lastPlayStats = {};

        this.dataReport = dataReport;
        this.reportSeq = getSeq();
        this.dataReport.newReport(this.reportSeq);

        this.videoSizeCallback = false;

        this.qualityUpload = false;
        this.qualityUploadInterval = 30 * 1000;
        this.qualityUploadLastTime = 0;

        //retry
        this.maxRetryCount = 3;
        this.currentRetryCount = 0;
        this.retryState = ENUM_RETRY_STATE.didNotStart;
        this.waitingServerTimerInterval = 3 * 1000;
        this.waitingServerTimer = null;

        //close session
        this.closeSessionSignal = false;
    }

    /*
     *    "zp.sad.1": "ZegoPlay.setAudioDestination"
     */
    ZegoPlay.prototype.setAudioDestination = function (audioOutput) {
        if (!this.remoteVideo) {
            this.logger.info("zp.sad.1 no remoteVideo");
            return false;
        }

        if (this.remoteVideo.sinkId !== 'undefined') {
            var _this = this;
            this.remoteVideo.setSinkId(audioOutput).then(function() {
                _this.logger.info("zp.sad.1 success device: " + audioOutput);
                // _this.audioOutput = audioOutput;
            }).catch(function(error) {
                _this.logger.info("zp.sad.1 " + error.name);
            });
            return true;
        }
        else {
            this.logger.error("zp.sad.1 browser does not suppport");
            return false;
        }
    };

    /*
     *    "zp.sp.1": "ZegoPlay.startPlay"
     */
    ZegoPlay.prototype.startPlay = function (streamId, remoteVideo, audioOutput) {
        this.logger.debug("zp.sp.1 called " + streamId);

        if (!streamId) {
            this.logger.debug("zp.sp.1 streamId is null");
            return;
        }

        this.streamId = streamId;
        this.remoteVideo = remoteVideo;
        this.audioOutput = audioOutput;

        //create session
        this.sessionSeq = getSeq();
        var _this = this;
        this.dataReport.eventStart(this.reportSeq, "CreateSession");
        this.signal.createSession(this.sessionSeq, 1, streamId, function (seq, sessionId, data) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                sessionId: data.session_id
            });

            if (_this.sessionSeq != seq) {
                _this.logger.error("zp.sp.1 seq is not match.");
                return;
            }

            if (data.result !== 0) {
                _this.logger.error("zp.sp.1 create error");
                playStateUpdateError(_this, playErrorList.CREATE_SESSION_ERROR);
            }
            else {
                _this.sessionId = data.session_id;
                _this.logger.debug("zp.sp.1 create session success " + _this.sessionId);
                
                onCreatePlaySessionSuccess(_this, data);
            }
            
        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                error: err
            });
            
            playStateUpdateError(_this, playErrorList.SEND_SESSION_TIMEOUT);
        });

        this.state = ENUM_PLAY_STATE.waitingSessionRsp;
        this.logger.debug("zp.sp.1 called success");
    };

    ZegoPlay.prototype.onPlayStateUpdate = function (type, streamId, error) {};

    ZegoPlay.prototype.onPlayQualityUpdate = function (streamId, quality) {};

    ZegoPlay.prototype.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {};

    /*
     *    "zp.sp.1.1": "ZegoPlay.stopPlay"
     */
    ZegoPlay.prototype.stopPlay = function () {
        this.logger.debug("zp.sp.1.1 called " + this.streamId);

        //send to server
        if (this.sessionId && !this.closeSessionSignal) {
            this.signal.sendCloseSession(getSeq(), this.sessionId, 0);
        }
        
        this.dataReport.eventEndWithMsg(this.reportSeq, "PlayState", {
            "state": this.state
        });

        this.dataReport.addEvent(this.reportSeq, "StopPlay");

        this.dataReport.addMsgExt(this.reportSeq, {
            "stream": this.streamId,
            "sessionId": this.sessionId
        });
        
        this.dataReport.uploadReport(this.reportSeq, "RTCPlayStream");

        resetPlay(this);
    };

    /*
     *    "zp.od.1": "ZegoPlay.onDisconnect"
     */
    ZegoPlay.prototype.onDisconnect = function() {
        this.logger.info("zp.od.1 call");

        // if (this.sessionId !== sessionId) {
        //     this.logger.info("zp.od.1 session is not same");
        //     return;
        // }

        this.logger.info("zp.od.1 websocket disconnect");
        this.dataReport.addEvent(this.reportSeq, "OnDisconnect");
        
        playStateUpdateError(this, playErrorList.WEBSOCKET_ERROR);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // create session result
    /*
     *    "zp.ops.1": "ZegoPlay.onCreatePlaySessionSuccess"
     */
    function onCreatePlaySessionSuccess(_this, data) {
        _this.logger.debug("zp.ops.1 success");

        var urls = [];
        if (data.turn_server != undefined && data.turn_server.length != 0) {
            urls.push(data.turn_server);
        }
        if (data.stun_server != undefined && data.stun_server.length != 0) {
            urls.push(data.stun_server);
        }

        var configuration = {
            iceServers: [{
                urls: urls,
                username: data.turn_username,
                credential: data.turn_auth_key
            }]
        };

        _this.logger.info("zp.ops.1 username: " + data.turn_username);
        _this.logger.info("zp.ops.1 credential: " + data.turn_auth_key);

        _this.peerConnection = new RTCPeerConnection(configuration);
        _this.peerConnection.onicecandidate = function (e) {
            onIceCandidate(_this, e);
        };

        _this.peerConnection.onconnectionstatechange = function (e) {
            onConnectionStateChange(_this, e);
        };

        _this.peerConnection.oniceconnectionstatechange = function (e) {
            onIceConnectionStateChange(_this, e);
        };

        _this.peerConnection.onaddstream = function (e) {
            onGotRemoteStream(_this, e);
        };

        // _this.peerConnection.ontrack = function(e) {
        //     onGotRemoteStream(_this, e);
        // };

        _this.remoteVideo.oncanplay = function() {
            _this.logger.debug("zp.ops.1 " + _this.remoteVideo.videoWidth + " X " + _this.remoteVideo.videoHeight);
            if (!_this.videoSizeCallback) {
                _this.logger.debug("zp.ops.1 onresize callback");
                
                _this.onVideoSizeChanged(_this.streamId, _this.remoteVideo.videoWidth, _this.remoteVideo.videoHeight);
                _this.videoSizeCallback = true;
            }
        };

        //register callback
        _this.signal.registerPushCallback("MediaDescPush", _this.sessionId, onRecvMediaDesc, _this);
        _this.signal.registerPushCallback("CandidateInfoPush", _this.sessionId, onRecvCandidateInfo, _this);
        _this.signal.registerPushCallback("CloseSessionPush", _this.sessionId, onRecvCloseSession, _this);
        // _this.signal.registerPushCallback("WebSocketDisconnect", _this.sessionId, onDisconnect, _this);
        _this.signal.registerPushCallback("SessionResetPush", _this.sessionId, onRecvResetSession, _this);

        _this.state = ENUM_PLAY_STATE.waitingServerOffer;

        //setTimer
        _this.waitingOfferTimer = setTimeout(function() {
            if (_this.state == ENUM_PLAY_STATE.waitingServerOffer) {
                _this.logger.error("zp.ops.1 waiting server timeout");
                playStateUpdateError(_this, playErrorList.SERVER_MEDIA_DESC_TIMEOUT);
            }
        }, _this.waitingOfferTimeInterval);

        _this.logger.debug("zp.ops.1 call success");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push offer (setRemoteDescription)
    /*
     *    "zp.orm.1": "ZegoPlay.onRecvMediaDesc"
     */
    function onRecvMediaDesc(_this, seq, sessionId, data) {
        _this.logger.debug("zp.orm.1 received " + data + "sessionId: " + sessionId);

        if (_this.state != ENUM_PLAY_STATE.waitingServerOffer) {
            _this.logger.info("zp.orm.1 current state " + _this.state + " not allowed");
            return;
        }

        if (_this.waitingOfferTimer != null) {
            clearTimeout(_this.waitingOfferTimer);
            _this.waitingOfferTimer = null;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvMediaDesc");
        
        _this.signal.sendMediaDescAck(seq, _this.sessionId, 0);

        var offerDescription = {
            type: "offer",
            sdp: data.sdp
        };

        //setRemoteDescritpion
        _this.dataReport.eventStart(_this.reportSeq, "SetRemoteDescription");
        console.log('offerDescription',offerDescription);

        _this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription)).then(function() {
            _this.dataReport.eventEnd(_this.reportSeq, "SetRemoteDescription");
            
            onSetRemoteDescriptionSuccess(_this);
        }, function(error) {
            _this.logger.error("zp.orm.1 set remote error " + error.toString());

            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SetRemoteDescription", {
                error: error.toString()
            });

            playStateUpdateError(_this, playErrorList.SET_REMOTE_DESC_ERROR);
        });

        _this.logger.debug("zp.orm.1 call success");
    }

    /*
     *    "zp.ord.1": "ZegoPlay.onSetRemoteDescriptionSuccess"
     */
    function onSetRemoteDescriptionSuccess(_this) {
        _this.logger.debug("zp.ord.1 called");

        //create answer
        _this.dataReport.eventStart(_this.reportSeq, "CreateAnswer");
        _this.peerConnection.createAnswer().then(function(desc) {
            _this.dataReport.eventEnd(_this.reportSeq, "CreateAnswer");
            
            onCreateAnswerSuccess(_this, desc);
        }, function(error) {
            _this.logger.error("zp.ord.1 failed: " + error.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateAnswer", {
                error: error.toString()
            });
            
            playStateUpdateError(_this, playErrorList.CREATE_ANSWER_ERROR);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // create answer result
    /*
     *    "zp.oca.1": "ZegoPlay.onCreateAnswerSuccess"
     */
    function onCreateAnswerSuccess(_this, desc) {
        _this.logger.debug("zp.oca.1 desc: ", desc.sdp);

        _this.dataReport.eventStart(_this.reportSeq, "SetLocalDescription");
        _this.peerConnection.setLocalDescription(desc).then(
            function () {
                _this.dataReport.eventEnd(_this.reportSeq, "SetLocalDescription");
                
                onSetLocalDescriptionSuccess(_this, desc);
            },
            function (error) {
                _this.logger.error("zp.oca.1 set error " + error.toString());
                _this.dataReport.eventEnd(_this.reportSeq, "SetLocalDescription", {
                    error: error.toString()
                });
                
                playStateUpdateError(_this, playErrorList.SET_LOCAL_DESC_ERROR);
            }
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // setLocalDescription result
    /*
     *    "zp.osd.1": "ZegoPlay.onSetLocalDescriptionSuccess"
     */
    function onSetLocalDescriptionSuccess(_this, desc) {
        _this.logger.debug("zp.osd.1 success");

        var mediaDescription = {
            sdp: desc.sdp
        };

        _this.answerSeq = getSeq();
        _this.dataReport.eventStart(_this.reportSeq, "SendMediaDesc");
        _this.signal.sendMediaDesc(_this.answerSeq, _this.sessionId, 1, mediaDescription, function (seq, sessionId, data) {
            if (_this.answerSeq != seq || _this.sessionId != sessionId) {
                _this.logger.error("zp.osd.1 seq or sessionId is not equal " + _this.answerSeq + " " + seq, + " " + _this.sessionId + " " + sessionId);
                return;
            }

            _this.logger.debug("zp.osd.1 send success");

            _this.dataReport.eventEnd(_this.reportSeq, "SendMediaDesc");
            
            _this.state = ENUM_PLAY_STATE.waitingServerICE;

            //send candidate
            sendCandidateInfo(_this, _this.candidateInfo);
            _this.candidateInfo = [];

            //setTimer
            _this.waitICETimer = setTimeout(function() {
                if (_this.state == ENUM_PLAY_STATE.waitingServerICE) {
                    _this.logger.error("zp.osd.1 waiting timeout");
                    playStateUpdateError(_this, playErrorList.SERVER_CANDIDATE_TIMEOUT);
                }
            }, _this.waitingICETimeInterval);
            
        }, function (err, seq) {
            _this.logger.error("zp.osd.1 failed to send " + err);
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendMediaDesc", {
                error: err
            });
            
            playStateUpdateError(_this, playErrorList.SEND_MEDIA_DESC_TIMEOUT);
        });

        _this.state = ENUM_PLAY_STATE.waitingAnswerRsp;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // send candidate Info
    /*
     *    "zp.sci.1": "ZegoPlay.sendCandidateInfo"
     */
    function sendCandidateInfo(_this, candidateInfo) {
        _this.logger.debug("zp.sci.1 called");

        candidateInfo = candidateInfo.filter(function (item) {
            if(item.candidate.indexOf('tcp')>0){
                return false;
            }
            return true;
        });

        if(!candidateInfo||candidateInfo.length<1){
            _this.logger.info("zp.sci.1 cancelled");
            return;
        }
        
        _this.dataReport.eventStart(_this.reportSeq, "SendIceCandidate");
        _this.signal.sendCandidateInfo(getSeq(), _this.sessionId, candidateInfo, function(seq, sessionId, data) {
            _this.logger.debug("zp.sci.1 send success");
            _this.dataReport.eventEnd(_this.reportSeq, "SendIceCandidate");
        }, function(err, seq) {
            _this.logger.error("zp.sci.1 failed to send: " + err.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendIceCandidate", {
                error: err
            });
            
            playStateUpdateError(_this, playErrorList.SEND_CANDIDATE_ERROR);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceCandidate callback
    /*
     *    "zp.oic.1": "ZegoPlay.onIceCandidate"
     */
    function onIceCandidate(_this, event) {
        _this.logger.info("zp.oic.1 called");

        //send candidate to other peer
        if (event.candidate == undefined) {
            return;
        }

        _this.logger.debug("zp.oic.1 event: " + event.candidate.candidate);

        if (_this.state < ENUM_PLAY_STATE.waitingServerICE || _this.state == ENUM_PLAY_STATE.stop) {
            //save candidate Info
            _this.logger.debug("zp.oic.1 cached");

            _this.candidateInfo.push({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            });
        }
        else {
            _this.logger.debug("zp.oic.1 send");
            
            var candidate = {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            };

            sendCandidateInfo(_this, [candidate]);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push ICE (addIceCandidate)
    /*
     *    "zp.orci.1": "ZegoPlay.onRecvCandidateInfo"
     */
    function onRecvCandidateInfo(_this, seq, sessionId, data) {
        _this.logger.debug("zp.orci.1 received ");
        if (_this.state != ENUM_PLAY_STATE.waitingServerICE) {
            _this.logger.info("zp.orci.1 current state " + _this.state + " not allowed");
            return;
        }

        if (_this.waitICETimer != null) {
            clearTimeout(_this.waitICETimer);
            _this.waitICETimer = null;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvIceCandidate");
        
        _this.signal.sendCandidateInfoAck(seq, _this.sessionId, 0);

        for (var i = 0; i < data.infos.length; i ++) {
            var ice = {
                sdpMid: data.infos[i].sdpMid,
                sdpMLineIndex: data.infos[i].sdpMLineIndex,
                candidate: data.infos[i].candidate
            };

            _this.logger.debug("zp.orci.1 candidate " + ice.candidate);

            _this.peerConnection.addIceCandidate(new RTCIceCandidate(ice)).then(function() {
                _this.logger.debug("zp.orci.1 add success");
            }, function(error) {
                _this.logger.error("zp.orci.1 add error " + error.toString());
                playStateUpdateError(_this, playErrorList.SERVER_CANDIDATE_ERROR);
            });
        }

        _this.state = ENUM_PLAY_STATE.connecting;

        _this.logger.debug("zp.orci.1 call success");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push closeSession
    /*
     *    "zp.orcs.1": "ZegoPlay.onRecvCloseSession"
     */
    function onRecvCloseSession(_this, seq, sessionId, data) {
        _this.logger.info("zp.orcs.1 streamid: " + _this.streamId + " sessionId: " + sessionId + " reason: " + data.reason);

        _this.dataReport.addEvent(_this.reportSeq, "RecvCloseSession");
        
        _this.signal.sendCloseSessionAck(seq, _this.sessionId, 0);

        var error =  JSON.parse(JSON.stringify(playErrorList.SESSION_CLOSED));
        error.msg += data.reason;
        playStateUpdateError(_this, error);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push resetSession
    /*
     *    "zp.orrs.1": "ZegoPlay.onRecvResetSession"
     */
    function onRecvResetSession(_this, seq, sessionId, data) {
        _this.logger.info("zp.orrs.1 received sessionId " + sessionId);

        if (sessionId != _this.sessionId) {
            _this.logger.info("zp.orrs.1 cannot find session");
            return;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvResetSession");

        //check should retry
        if (shouldRetryPlay(_this)) {
            startRetryPlay(_this);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // retry play
    /*
     *    "zp.srp.1.0": "ZegoPlay.shouldRetryPlay"
     */
    function shouldRetryPlay(_this) {
        if (_this.retryState == ENUM_RETRY_STATE.didNotStart && _this.state != ENUM_PLAY_STATE.playing) {
            _this.logger.info("zp.srp.1.0 connection didn't success");
            return false;
        }
        
        if (_this.retryState == ENUM_RETRY_STATE.retrying) {
            _this.logger.info("zp.srp.0.0 already retrying");
            return false;
        }

        if (_this.currentRetryCount > _this.maxRetryCount) {
            _this.logger.info("zp.srp.1.0 beyond max");
            return false;
        }

        _this.logger.debug("zp.srp.1.0 call success");
        return true;
    }

    /*
     *    "zp.srp.1": "ZegoPlay.startRetryPlay"
     */
    function startRetryPlay(_this) {
        _this.logger.debug("zp.srp.0 call");

        var streamId = _this.streamId;
        var remoteVideo = _this.remoteVideo;
        var audioOutput = _this.audioOutput;

        resetPlay(_this);

        tryStartPlay(_this, streamId, remoteVideo, audioOutput);
    }

    /*
     *    "zp.tsp.1": "ZegoPublish.tryStartPlay"
     */
    function tryStartPlay(_this, streamId, remoteVideo, audioOputput) {

        _this.logger.debug("zp.tsp.1 call");
        
        clearTryPlayTimer(_this);

        _this.streamId = streamId;
        _this.remoteVideo = remoteVideo;
        _this.audioOutput = audioOputput;
        
        if (_this.currentRetryCount > _this.maxRetryCount) {
            _this.logger.info("zp.tsp.1 beyond max limit");
            //callback error
            playStateUpdateError(_this, playErrorList.WEBSOCKET_ERROR);
            return;
        }

        _this.retryState = ENUM_RETRY_STATE.retrying;
        _this.currentRetryCount += 1;

        if (_this.signal.isServerConnected()) {
            _this.logger.debug("zp.tsp.1 signal connected");

            _this.startPlay(streamId, _this.remoteVideo, _this.audioOputput);
        }
        else {
            //setTimer
            _this.logger.debug("zp.tsp.1 signal server not connected");
            
            _this.waitingAnswerTimer = setTimeout(function() {
                tryStartPlay(_this, streamId, _this.remoteVideo, _this.audioOputput);
            }, _this.waitingAnswerTimeInterval);
        }
    }

    function clearTryPlayTimer(_this) {
        if (_this.waitingServerTimer != null) {
            clearTimeout(_this.waitingServerTimer);
            _this.waitingServerTimer = null;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceStateChange callback
    /*
     *    "zp.ocs.1": "ZegoPlay.onConnectionStateChange"
     */
    function onConnectionStateChange(_this, event) {
        _this.logger.info("zp.oisc.1 called");
    }

    /*
     *    "zp.oics.1": "ZegoPlay.onIceConnectionStateChange"
     */
    function onIceConnectionStateChange(_this, event) {

        if (_this.state == ENUM_PLAY_STATE.stop || _this.peerConnection == null) {
            return;
        }
        
        _this.logger.info("zp.oisc.1  stateChanged " + _this.peerConnection.iceConnectionState);

        if (_this.peerConnection.iceConnectionState === "connected") {
            _this.dataReport.addEvent(_this.reportSeq, "IceConnected");

            if (_this.state != ENUM_PLAY_STATE.playing) {
                _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.start, _this.streamId);
            }

            _this.state = ENUM_PLAY_STATE.playing;
            if (_this.retryState != ENUM_RETRY_STATE.didNotStart) {
                _this.retryState = ENUM_RETRY_STATE.finished;
                _this.currentRetryCount = 0;
            }

            //play started
            _this.dataReport.eventStart(_this.reportSeq, "PlayState");

            //start quality timeInterval
            setPlayQualityTimer(_this);
        }
        else if (_this.peerConnection.iceConnectionState === "closed") {
            _this.dataReport.addEvent(_this.reportSeq, "IceClosed");

            checkPlayConnectionFailedState(_this, _this.peerConnection.iceConnectionState);
        }
        else if (_this.peerConnection.iceConnectionState === "failed") {
            _this.dataReport.addEvent(_this.reportSeq, "IceFailed");

            checkPlayConnectionFailedState(_this, _this.peerConnection.iceConnectionState);
        }
    }

    function checkPlayConnectionFailedState(_this, connectionState) {
        var state = null;
        if (connectionState == "failed") {
            state = playErrorList.MEDIA_CONNECTION_FAILED;
        }
        else if (connectionState == "closed") {
            state = playErrorList.MEDIA_CONNECTION_CLOSED;
        }

        if (state == null) {
            return;
        }

        if (_this.state != ENUM_PLAY_STATE.playing && _this.retryState == ENUM_RETRY_STATE.didNotStart) {
            _this.logger.info("zp.oics.1  state " + _this.state + " retryState "+ _this.retryState + " connectionState " + connectionState);

            playStateUpdateError(_this, state);
        }
        else {
            if (shouldRetryPlay(_this)) {
                _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.retry, _this.streamId);
        
                startRetryPlay(_this);
            }
            else {
                playStateUpdateError(_this, state);
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // onGotRemoteStream callback
    /*
     *    "zp.ogrs.1": "ZegoPlay.onGotRemoteStream"
     */
    function onGotRemoteStream(_this, event) {
        _this.logger.info("zp.ogrs.0 called " + event.stream.id+'----'+_this.remoteVideo.id+'---'+_this.streamId);

        if (!_this.remoteVideo) {
            _this.logger.info("zp.ogrs.0 no remoteVideo");
            return;
        }

        _this.remoteVideo.srcObject = event.stream;

        if (_this.audioOputput) {
            _this.setAudioDestination(_this.audioOputput);
        }

        _this.dataReport.addEvent(_this.reportSeq, "GetRemoteStream");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // quality timer
    /*
     *    "zp.spq.1": "ZegoPlay.setPlayQualityTimer"
     */
    function setPlayQualityTimer(_this) {
        if (_this.qualityTimer != null) {
            return;
        }

        _this.logger.debug("zp.spq.1 startTimer");
        
        clearPlayQualityTimer(_this);
        
        _this.qualityTimer = setInterval(function() {

            if (_this.peerConnection) {
                _this.peerConnection.getStats(null).then(function(results) {
                    getPlayStats(_this, results);
                }, function(error) {
                    _this.logger.info("zp.spq.1 getStats error " + error.toString());
                });
            }

        }, _this.qualityTimeInterval);

        _this.lastPlayStats = {
            time: 0,
            audioBytesReceived: 0,
            videoBytesReceived: 0,
            framesDecoded: 0,
            framesReceived: 0,
            framesDropped: 0
        };
    }

    /*
     *    "zp.gps.1": "ZegoPlay.getPlayStats"
     */
    function getPlayStats(_this, results) {
        if (results == undefined) {
            return;
        }

        var playData = {};
        var time = _this.lastPlayStats.time;
        results.forEach(function(result) {
            if ((result.type == "inbound-rtp" || (result.type == "ssrc" && result.bytesReceived != undefined)) && (result.mediaType == "audio" || result.id.indexOf("AudioStream") >= 0)) {
                //audio
                if (time != 0) {
                    playData.audioBitrate = 8 * (result.bytesReceived - _this.lastPlayStats.audioBytesReceived) / (result.timestamp - time);
                }

                if (playData.audioBitrate < 0) {
                    playData.audioBitrate = 0;
                }
            
                playData.audioFractionLost = result.fractionLost;

                _this.lastPlayStats.audioBytesReceived = result.bytesReceived;
                _this.lastPlayStats.time = result.timestamp;
            }
            else if ((result.type == "inbound-rtp" || (result.type == "ssrc" && result.bytesReceived != undefined)) && (result.mediaType == "video" || result.id.indexOf("VideoStream") >= 0)) {
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

                playData.jitter = result.jitter;
                playData.nackCount = result.nackCount;
                playData.pliCount = result.pliCount;
                playData.sliCount = result.sliCount;
                playData.videoFractionLost = result.fractionLost;
                
                _this.lastPlayStats.videoBytesReceived = result.bytesReceived;
                _this.lastPlayStats.framesDecoded = result.framesDecoded;
                _this.lastPlayStats.time = result.timestamp;
            }
            else if (result.type == "track" && (result.kind == "video" || result.id.indexOf("video") >= 0)) {
                playData.frameHeight = result.frameHeight;
                playData.frameWidth = result.frameWidth;

                if (time != 0) {
                    playData.videoTransferFPS = 1000 * (result.framesReceived - _this.lastPlayStats.framesReceived) / (result.timestamp - time);
                    playData.framesDropped = result.framesDropped - _this.lastPlayStats.framesDropped;
                }
                
                if (playData.videoTransferFPS < 0) {
                    playData.videoTransferFPS = 0;
                }

                if (playData.framesDropped < 0) {
                    playData.framesDropped = 0;
                }
                
                _this.lastPlayStats.framesReceived = result.framesReceived;
                _this.lastPlayStats.framesDropped = result.framesDropped;
            }
            else if (result.type == "candidate-pair") {
                if (result.totalRoundTripTime != undefined) {
                    playData.totalRoundTripTime = result.totalRoundTripTime;
                }
                
                if (result.currentRoundTripTime != undefined) {
                    playData.currentRoundTripTime = result.currentRoundTripTime;
                }
            }
        });

        // _this.logger.debug("zp.gps.1 audio: " + playData.audioBitrate + " video: " + playData.videoBitrate + 
        // " FPS: " + playData.videoFPS + " transfer: " + playData.videoTransferFPS);

        uploadPlayQuality(_this, playData);
        
        if (time != 0) {
            _this.onPlayQualityUpdate(_this.streamId, playData);
        }
    }

    function clearPlayQualityTimer(_this) {
        if (_this.qualityTimer != null) {
            clearInterval(_this.qualityTimer);
            _this.qualityTimer = null;
        }

        _this.lastPlayStats = {};
    }

    /*
     *    "zp.upq.1": "ZegoPlay.uploadPlayQuality"
     */
    function uploadPlayQuality(_this, playData) {
        if (!_this.qualityUpload) {
            return;
        }

        var timeStamp = Date.parse(new Date());
        if (_this.qualityUploadLastTime == 0 || timeStamp - _this.qualityUploadLastTime >= _this.qualityUploadInterval) {
            _this.logger.debug("zp.upq.1 upload");

            playData["stream_type"] = "play";
            playData["stream_id"] = _this.streamId;
            playData["timeStamp"] = timeStamp / 1000;

            _this.signal.QualityReport(getSeq(), _this.sessionId, playData, function(seq, sessionId, data) {
                if (data.report !== undefined) {
                    _this.qualityUpload = data.report;
                    _this.qualityUploadInterval = data.report_interval_ms;
                }
            }, function(err, seq) {
                _this.logger.info("zp.upq.1 upload failed " + err);
            });

            _this.qualityUploadLastTime = timeStamp;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // error function
    function shouldSendCloseSession(_this, errorCode) {
        if (_this.state != ENUM_PLAY_STATE.stop && _this.state != ENUM_PLAY_STATE.waitingSessionRsp) {
            return true;
        }

        return false;
    }

    /*
     *    "zp.psue.1": "ZegoPlay.playStateUpdateError"
     */
    function playStateUpdateError(_this, errorCode) {
        _this.logger.debug("zp.psue.1 called " + errorCode.code);

        if (_this.sessionId != 0 && shouldSendCloseSession(_this, errorCode)) {
            _this.signal.sendCloseSession(getSeq(), _this.sessionId, 1);
            _this.closeSessionSignal = true;
        }

        _this.state = ENUM_PLAY_STATE.stop;
        _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.error, _this.streamId, errorCode);
        
        resetPlay(_this);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // reset function
    /*
     *    "zp.rp.1": "ZegoPlay.resetPlay"
     */
    function resetPlay(_this) {
        _this.logger.info("zp.rp.1 call");

        _this.streamId = null;
        _this.state = ENUM_PLAY_STATE.stop;

        if (_this.peerConnection != undefined) {
            _this.peerConnection.close();
            _this.peerConnection = null;
        }

        if (_this.waitingOfferTimer != null) {
            clearTimeout(_this.waitingOfferTimer);
            _this.waitingOfferTimer = null;
        }

        if (_this.waitICETimer != null) {
            clearTimeout(_this.waitICETimer);
            _this.waitICETimer = null;
        }

        clearPlayQualityTimer(_this);

        if (_this.remoteVideo) {
            _this.remoteVideo.srcObject = null;
            _this.remoteVideo.oncanplay = null;
            _this.remoteVideo = null;
        }

        _this.audioOputput = null;
        
        if (_this.signal) {
            _this.signal.unregisterPushCallback("MediaDescPush", _this.sessionId);
            _this.signal.unregisterPushCallback("CandidateInfoPush", _this.sessionId);
            _this.signal.unregisterPushCallback("CloseSessionPush", _this.sessionId);
            // _this.signal.unregisterPushCallback('WebSocketDisconnect', _this.sessionId);
        }
        
        // _this.sessionId = 0;
        _this.sessionSeq = 0;
        _this.answerSeq = 0;
        

        _this.videoSizeCallback = false;

        _this.currentRetryCount = 0;
        _this.retryState = ENUM_RETRY_STATE.didNotStart;
        clearTryPlayTimer(_this);
    }

    /**
     * ZegoPublish
     */

    var ENUM_PUBLISH_STATE = {
        start: 0,
        waitingSessionRsp: 1, //等待Session回包
        waitingOffserRsp: 2, //等待offser回包
        waitingServerAnswer: 3, //等待server answer
        waitingServerICE: 4, //等待candidate
        connecting: 5, //等待candidate连接
        publishing: 6, //开始推流
        stop: 7
    };


    function ZegoPublish(logger, signal, dataReport, qualityTimeInterval) {
        this.logger = logger;
        this.signal = signal;
        this.state = ENUM_PUBLISH_STATE.stop;

        this.sessionId = 0;

        // this.localVideo = null;
        // this.localStream = null;
        
        this.waitingICETimeInterval = 5000;
        this.waitingAnswerTimeInterval = 5000;
        this.candidateInfo = [];

        this.waitingICETimer = null;
        this.waitingAnswerTimer = null;

        this.qualityTimer = null;
        this.qualityTimeInterval = qualityTimeInterval;
        this.publishQualityList = [];
        this.maxQualityListCount = 10;
        this.lastPublishStats = {};
        
        this.reportSeq = getSeq();
        this.dataReport = dataReport;
        this.dataReport.newReport(this.reportSeq);

        //quality signal
        this.qualityUpload = false;
        this.qualityUploadInterval = 30 * 1000;
        this.qualityUploadLastTime = 0;

        //retry
        this.maxRetryCount = 3;
        this.currentRetryCount = 0;
        this.retryState = ENUM_RETRY_STATE.didNotStart;
        this.waitingServerTimerInterval = 3 * 1000;
        this.waitingServerTimer = null;

        this.videoInfo = {
            width: 0,
            height: 0,
            frameRate: 0,
            bitRate: 0
        };

        //close session
        this.closeSessionSignal = false;
    }

    /*
     *    "zp.sp.0": "ZegoPublish.startPublish"
     */
    ZegoPublish.prototype.startPublish = function (streamId, localStream, videoInfo) {
        this.logger.debug("zp.sp.0 called " + streamId);

        if (!streamId) {
            this.logger.debug("zp.sp.0 streamId is null");
            return;
        }
        
        this.streamId = streamId;
        this.localStream = localStream;
        if (videoInfo) {
            this.videoInfo = videoInfo;
        }

        //send to server
        this.sessionSeq = getSeq();
        var _this = this;
        this.dataReport.eventStart(this.reportSeq, "CreateSession");
        this.signal.createSession(this.sessionSeq, 0, streamId, function (seq, sessionId, data) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                sessionId: data.session_id
            });
            
            if (_this.sessionSeq != seq) {
                _this.logger.error("zp.sp.0 seq is not match.");
                return;
            }

            if (data.result !== 0) {
                _this.logger.info("zp.sp.0 create session failed " + data.result);

                publishStateUpdateError(_this, publishErrorList.CREATE_SESSION_ERROR);
            } else {
                _this.sessionId = data.session_id;
                _this.logger.debug("zp.sp.0 create session success " + _this.sessionId);
                
                onCreatePublishSessionSuccess(_this, data);
            }
        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateSession", {
                error: err
            });
            
            publishStateUpdateError(_this, publishErrorList.SEND_SESSION_TIMEOUT);
        });

        this.state = ENUM_PUBLISH_STATE.waitingSessionRsp;
        this.logger.debug("zp.sp.0 called success");
    };

    /*
     *    "zp.sp.0.1": "ZegoPublish.stopPublish"
     */
    ZegoPublish.prototype.stopPublish = function () {
        this.logger.debug("zp.sp.0.1 called " + this.streamId);
        
        //close session
        if (this.sessionId && !this.closeSessionSignal) {
            this.signal.sendCloseSession(getSeq(), this.sessionId, 0);
        }

        this.dataReport.eventEndWithMsg(this.reportSeq, "PublishState", {
            "state": this.state
        });

        this.dataReport.addEvent(this.reportSeq, "StopPublish");

        this.dataReport.addMsgExt(this.reportSeq, {
            "stream": this.streamId,
            "sessionId": this.sessionId
        });

        this.dataReport.uploadReport(this.reportSeq, "RTCPublishStream");
            
        resetPublish(this);
    };


    ZegoPublish.prototype.onPublishStateUpdate = function (type, streamId, error) {};

    ZegoPublish.prototype.onPublishQualityUpdate = function (streamId, quality) {};

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

        publishStateUpdateError(this, publishErrorList.WEBSOCKET_ERROR);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // create session result
    /*
     *    "zp.ops.0": "ZegoPublish.onCreatePublishSessionSuccess"
     */
    function onCreatePublishSessionSuccess(_this, data) {
        //create offer
        _this.logger.debug("zp.ops.0 called");
        // _this.state = ENUM_PUBLISH_STATE.Start;

        var urls = [];
        if (data.turn_server != undefined && data.turn_server.length != 0) {
            urls.push(data.turn_server);
        }
        if (data.stun_server != undefined && data.stun_server.length != 0) {
            urls.push(data.stun_server);
        }

        var configuration = {
            iceServers: [{
                urls: urls,
                username: data.turn_username,
                credential: data.turn_auth_key
            }]
        };

        _this.logger.info("zp.ops.0 username: " + data.turn_username);
        _this.logger.info("zp.ops.0 credential: " + data.turn_auth_key);

        _this.peerConnection = new RTCPeerConnection(configuration);
        _this.peerConnection.onicecandidate = function (e) {
            onIceCandidate$1(_this, e);
        };

        _this.peerConnection.onconnectionstatechange = function (e) {
            onConnectionStateChange$1(_this, e);
        };

        _this.peerConnection.oniceconnectionstatechange = function (e) {
            onIceConnectionStateChange$1(_this, e);
        };

        if (_this.localStream) {
            _this.localStream.getTracks().forEach(
                function (track) {
                    _this.peerConnection.addTrack(track, _this.localStream);
                }
            );

            var videoTracks = _this.localStream.getVideoTracks();
            var audioTracks = _this.localStream.getAudioTracks();
            if (videoTracks.length > 0)
                _this.logger.info("zp.ops.0 video device: " + videoTracks[0].lable);
            if (audioTracks.length > 0)
                _this.logger.info("zp.ops.0 audio device: " + audioTracks[0].lable);

        }

        var offerOptions = {
            offerToReceiveAudio: audioTracks.length > 0 ? 1 : 0,
            offerToReceiveVideo: videoTracks.length > 0 ? 1 : 0,
        };

        //create offer
        _this.dataReport.eventStart(_this.reportSeq, "CreateOffer");
        _this.peerConnection.createOffer(offerOptions).then(
            function (desc) {
                _this.dataReport.eventEnd(_this.reportSeq, "CreateOffer");
                
                onCreateOfferSuccess(_this, desc);
            },
            function (error) {
                _this.dataReport.eventEndWithMsg(_this.reportSeq, "CreateOffer", {
                    error: error.toString()
                });
                
                _this.logger.error("zp.ops.0 create offer error " + error.toString());
                publishStateUpdateError(_this, publishErrorList.CREATE_OFFER_ERROR);
            }
        );

        //register callback
        _this.signal.registerPushCallback("CandidateInfoPush", _this.sessionId, onRecvCandidateInfo$1, _this);
        _this.signal.registerPushCallback("CloseSessionPush", _this.sessionId, onRecvCloseSession$1, _this);
        _this.signal.registerPushCallback("MediaDescPush", _this.sessionId, onRecvMediaDescription, _this);
        // _this.signal.registerPushCallback("WebSocketDisconnect", _this.sessionId, onDisconnect, _this);
        _this.signal.registerPushCallback("SessionResetPush", _this.sessionId, onRecvResetSession$1, _this);
        
        _this.logger.debug("zp.ops.0 call success");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // create offer result
    /*
     *    "zp.oco.0": "ZegoPublish.onCreateOfferSuccess"
     */
    function onCreateOfferSuccess(_this, desc) {
        //_this.logger.debug("zp.oco.0 success. before desc: " + desc.sdp);
        
        //change bandwidth
        if (_this.videoInfo.bitRate != 0)
            desc.sdp = updateBandwidthRestriction(desc.sdp, _this.videoInfo.bitRate);

        _this.logger.debug("zp.oco.0 success. desc: " + desc.sdp);

        _this.dataReport.eventStart(_this.reportSeq, "SetLocalDescription");
        _this.peerConnection.setLocalDescription(desc).then(
            function () {
                _this.dataReport.eventEnd(_this.reportSeq, "SetLocalDescription");
                
                onSetLocalDescriptionSuccess$1(_this, desc);
            },
            function (error) {
                _this.dataReport.eventEndWithMsg(_this.reportSeq, "SetLocalDescription", {
                    error: error.toString()
                });

                _this.logger.error("zp.oco.0 error " + error.toString());
                publishStateUpdateError(_this, publishErrorList.SET_LOCAL_DESC_ERROR);
            }
        );
    }

    function updateBandwidthRestriction(sdp, bandwidth) {
        var modifier = 'AS';
        if (adapter.browserDetails.browser === 'firefox') {
            bandwidth = (bandwidth >>> 0) * 1000;
            modifier = 'TIAS';
        }
        if (sdp.indexOf('b=' + modifier + ':') === -1) {
            // insert b= after c= line.
            sdp = sdp.replace(/c=IN (.*)\r\n/,
                'c=IN $1\r\nb=' + modifier + ':' + bandwidth + '\r\n');
        } 
        else {
            sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n'),
                'b=' + modifier + ':' + bandwidth + '\r\n');
        }

        return sdp;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // setLocalDescription result
    /*
     *    "zp.osd.0": "ZegoPublish.onSetLocalDescriptionSuccess"
     */
    function onSetLocalDescriptionSuccess$1(_this, desc) {
        _this.logger.debug("zp.osd.0 success");

        //send offer to other peer
        var mediaDescription = {
            sdp: desc.sdp,
            width: _this.videoInfo.width,
            height: _this.videoInfo.height,
            frameRate: _this.videoInfo.frameRate,
            video_min_kpbs: _this.videoInfo.bitRate,
            video_max_kpbs: _this.videoInfo.bitRate,
            audio_kpbs: 48
        };

        _this.offerSeq = getSeq();
        _this.dataReport.eventStart(_this.reportSeq, "SendMediaDesc");
        _this.signal.sendMediaDesc(_this.offerSeq, _this.sessionId, 0, mediaDescription, function (seq, sessionId, data) {
            if (_this.offerSeq != seq || _this.sessionId != sessionId) {
                _this.logger.error("zp.osd.0 seq or sessionId is not equal");
                return;
            }

            _this.logger.debug("zp.osd.0 send success");
            _this.dataReport.eventEnd(_this.reportSeq, "SendMediaDesc");
            
            //set timer for waiting
            _this.waitingAnswerTimer = setTimeout(function () {
                if (_this.state == ENUM_PUBLISH_STATE.waitingServerAnswer) {
                    _this.logger.error("zp.osd.0 waiting timeout");
                    publishStateUpdateError(_this, publishErrorList.SERVER_MEDIA_DESC_TIMEOUT);
                }
            }, _this.waitingAnswerTimeInterval);

            _this.state = ENUM_PUBLISH_STATE.waitingServerAnswer;

        }, function (err, seq) {
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendMediaDesc", {
                error: err
            });
            
            _this.logger.debug("zp.osd.0 send failed" + err);
            publishStateUpdateError(_this, publishErrorList.SEND_MEDIA_DESC_TIMEOUT);
        });

        _this.state = ENUM_PUBLISH_STATE.waitingOffserRsp;
        _this.logger.debug("zp.osd.0 call success");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push SDP (setRemoteDesription)
    /*
     *    "zp.ormd.0": "ZegoPublish.onRecvMediaDescription"
     */
    function onRecvMediaDescription(_this, seq, sessionId, data) {
        _this.logger.debug("zp.ormd.0 received " + sessionId);
        if (_this.state != ENUM_PUBLISH_STATE.waitingServerAnswer) {
            _this.logger.info("zp.ormd.0 current state " + _this.state + " not allowed");
            return;
        }

        //clear timer
        if (_this.waitingAnswerTimer != null) {
            clearTimeout(_this.waitingAnswerTimer);
            _this.waitingAnswerTimer = null;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvMediaDesc");
        
        _this.signal.sendMediaDescAck(seq, _this.sessionId, 0);

        //not answer
        if (data.type == 1) {
            onGetRemoteOfferSucceses(_this, data.sdp);
        } else {
            //server send error
            publishStateUpdateError(_this, publishErrorList.SERVER_MEDIA_DESC_ERROR);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push offer (setRemoteDescription)
    /*
     *    "zp.oro.0": "ZegoPublish.onGetRemoteOfferSucceses"
     */
    function onGetRemoteOfferSucceses(_this, desc) {
        _this.logger.debug("zp.oro.0 received");

        var answerDescription = {
            type: "answer",
            sdp: desc
        };

        _this.dataReport.eventStart(_this.reportSeq, "SetRemoteDescription");
        
        _this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerDescription)).then(function () {
            _this.logger.debug("zp.oro.0 set success");
            _this.dataReport.eventEnd(_this.reportSeq, "SetRemoteDescription");
        }, function (error) {
            _this.logger.error("zp.oro.0 failed: " + error.toString());
            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SetRemoteDescription", {
                error: error.toString()
            });
            
            publishStateUpdateError(_this, publishErrorList.SET_REMOTE_DESC_ERROR);
        });

        sendCandidateInfo$1(_this, _this.candidateInfo);
        _this.candidateInfo = [];

        _this.state = ENUM_PUBLISH_STATE.waitingServerICE;

        //setTimer
        _this.waitingICETimer = setTimeout(function () {
            if (_this.state == ENUM_PUBLISH_STATE.waitingServerICE) {
                _this.logger.error("zp.orod.0 waiting server timeout");
                publishStateUpdateError(_this, publishErrorList.SERVER_CANDIDATE_TIMEOUT);
            }
        }, _this.waitingICETimeInterval);

        _this.logger.debug("zp.oro.0 call success");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // send candidate Info
    /*
     *    "zp.sci.0": "ZegoPublish.sendCandidateInfo"
     */
    function sendCandidateInfo$1(_this, candidateInfo) {
        _this.logger.debug("zp.sci.0 called");

        candidateInfo = candidateInfo.filter(function (item) {
            if(item.candidate.indexOf('relay')>0){
                return true;
            }
            return false;
        });

        if(!candidateInfo||candidateInfo.length<1){
            _this.logger.info("zp.sci.0 cancelled");
            return;
        }

        _this.dataReport.eventStart(_this.reportSeq, "SendIceCandidate");
        _this.signal.sendCandidateInfo(getSeq(), _this.sessionId, candidateInfo, function (seq, sessionId, data) {
            _this.logger.debug("zp.sci.0 send success");
            _this.dataReport.eventEnd(_this.reportSeq, "SendIceCandidate");
        }, function (err, seq) {
            _this.logger.error("zp.sci.0 failed to send: " + err.toString());

            _this.dataReport.eventEndWithMsg(_this.reportSeq, "SendIceCandidate", {
                error: err
            });

            publishStateUpdateError(_this, publishErrorList.SEND_CANDIDATE_TIMEOUT);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push ICE (addICECandidate)
    /*
     *    "zp.oci.0": "ZegoPublish.onRecvCandidateInfo"
     */
    function onRecvCandidateInfo$1(_this, seq, sessionId, data) {
        _this.logger.debug("zp.oci.0 received " + data.infos.length);
        if (_this.state != ENUM_PUBLISH_STATE.waitingServerICE) {
            _this.logger.info("zp.oci.0 current state " + _this.state + " not allowed");
            return;
        }

        if (_this.waitingICETimer != null) {
            clearTimeout(_this.waitingICETimer);
            _this.waitingICETimer = null;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvIceCandidate");

        _this.signal.sendCandidateInfoAck(seq, _this.sessionId, 0);

        for (var i = 0; i < data.infos.length; i++) {
            var ice = {
                sdpMid: data.infos[i].sdpMid,
                sdpMLineIndex: data.infos[i].sdpMLineIndex,
                candidate: data.infos[i].candidate
            };

            _this.logger.debug("zp.orci.0 candidate " + ice.candidate);

            _this.peerConnection.addIceCandidate(new RTCIceCandidate(ice)).then(function () {
                _this.logger.debug("zp.oci.0 add success");
            }, function (error) {
                _this.logger.error("zp.oci.0 add error " + error.toString());
                publishStateUpdateError(_this, publishErrorList.SERVER_CANDIDATE_ERROR);
            });
        }

        _this.state = ENUM_PUBLISH_STATE.connecting;

        _this.dataReport.eventStart(_this.reportSeq, "IceConnected");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceCandidate callback
    /*
     *    "zp.oic.0": "ZegoPublish.onIceCandidate"
     */
    function onIceCandidate$1(_this, event) {

        if (event.candidate == undefined) {
            return;
        }

        _this.logger.info("zp.oic.0 " + event.candidate.candidate);

        if (_this.state < ENUM_PUBLISH_STATE.waitingServerICE || _this.state == ENUM_PUBLISH_STATE.stop) {
            //save candidate Info

            _this.candidateInfo.push({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            });
        } else {
            var candidate = {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            };

            sendCandidateInfo$1(_this, [candidate]);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push closeSession
    /*
     *    "zp.orcs.0": "ZegoPublish.onRecvCloseSession"
     */
    function onRecvCloseSession$1(_this, seq, sessionId, data) {
        _this.logger.info("zp.orcs.0 streamid: " + _this.streamId + " sessionId: " + sessionId + " reason: " + data.reason);


        _this.dataReport.addEvent(_this.reportSeq, "RecvCloseSession");
        
        _this.signal.sendCloseSessionAck(seq, _this.sessionId, 0);

        var error = JSON.parse(JSON.stringify(publishErrorList.SESSION_CLOSED));
        error.msg += data.reason;
        publishStateUpdateError(_this, error);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // server push resetSession
    /*
     *    "zp.orrs.0": "ZegoPublish.onRecvResetSession"
     */
    function onRecvResetSession$1(_this, seq, sessionId, data) {
        _this.logger.info("zp.orrs.0 received sessionId " + sessionId);

        if (sessionId != _this.sessionId) {
            _this.logger.info("zp.orrs.0 cannot find session");
            return;
        }

        _this.dataReport.addEvent(_this.reportSeq, "RecvResetSession");

        //check should retry
        if (shouldRetryPublish(_this)) {        
            startRetryPublish(_this);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // retry publish
    /*
     *    "zp.srp.0.0": "ZegoPublish.shouldRetryPublish"
     */
    function shouldRetryPublish(_this) {
        if (_this.retryState == ENUM_RETRY_STATE.didNotStart && _this.state != ENUM_PUBLISH_STATE.publishing) {
            _this.logger.info("zp.srp.0.0 connection didn't success");
            return false;
        }
        
        if (_this.retryState == ENUM_RETRY_STATE.retrying) {
            _this.logger.info("zp.srp.0.0 already retrying");
            return false;
        }
        
        if (_this.currentRetryCount > _this.maxRetryCount) {
            _this.logger.info("zp.srp.0.0 beyond max");
            return false;
        }

        _this.logger.debug("zp.srp.1.0 call success");
        return true;
    }

    /*
     *    "zp.srp.0": "ZegoPublish.startRetryPublish"
     */
    function startRetryPublish(_this) {
        _this.logger.debug("zp.srp.0 call");

        var streamId = _this.streamId;
        if (!streamId) {
            _this.logger.info("zp.srp.0 no streamid");
            return;
        }

        resetPublish(_this);

        tryStartPublish(_this, streamId);
    }

    /*
     *    "zp.tsp.0": "ZegoPublish.tryStartPublish"
     */
    function tryStartPublish(_this, streamId) {

        _this.logger.debug("zp.tsp.0 call");
        
        clearTryPublishTimer(_this);

        _this.streamId = streamId;
        if (_this.currentRetryCount > _this.maxRetryCount) {
            _this.logger.info("zp.tsp.0 beyond max limit");
            //callback error
            publishStateUpdateError(_this, publishErrorList.WEBSOCKET_ERROR);
            return;
        }

        _this.retryState = ENUM_RETRY_STATE.retrying;
        _this.currentRetryCount += 1;

        if (_this.signal.isServerConnected()) {
            _this.logger.debug("zp.tsp.0 signal connected");

            _this.startPublish(streamId);
        }
        else {
            //setTimer
            _this.logger.debug("zp.tsp.0 signal server not connected");
            
            _this.waitingAnswerTimer = setTimeout(function() {
                tryStartPublish(_this, streamId);
            }, _this.waitingAnswerTimeInterval);
        }
    }

    function clearTryPublishTimer(_this) {
        if (_this.waitingServerTimer != null) {
            clearTimeout(_this.waitingServerTimer);
            _this.waitingServerTimer = null;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // onIceStateChange callback
    /*
     *    "zp.ocs.0": "ZegoPublish.onConnectionStateChange"
     */
    function onConnectionStateChange$1(_this, event) {
        _this.logger.info("zp.ocs.0 called");
    }

    /*
     *    "zp.oics.0": "ZegoPublish.onIceConnectionStateChange"
     */
    function onIceConnectionStateChange$1(_this, event) {

        if (_this.state == ENUM_PUBLISH_STATE.stop || _this.peerConnection == null) {
            return;
        }

        _this.logger.info("zp.oics.0 stateChanged " + _this.peerConnection.iceConnectionState);

        if (_this.peerConnection.iceConnectionState === "connected") {

            _this.logger.info("zp.oics.0 connected state " + _this.state);

            _this.dataReport.eventEnd(_this.reportSeq, "IceConnected");
            
            if (_this.state != ENUM_PUBLISH_STATE.publishing) {
                _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.start, _this.streamId);
            }

            _this.state = ENUM_PUBLISH_STATE.publishing;
            if (_this.retryState != ENUM_RETRY_STATE.didNotStart) {
                _this.retryState = ENUM_RETRY_STATE.finished;
                _this.currentRetryCount = 0;
            }
            
            //publish started
            _this.dataReport.eventStart(_this.reportSeq, "PublishState");
            
            //start quality timeInterval
            setPublishQualityTimer(_this);
        }
        else if (_this.peerConnection.iceConnectionState === "closed") {

            _this.dataReport.addEvent(_this.reportSeq, "IceClosed");
            
            checkPublishConnectionFailedState(_this, _this.peerConnection.iceConnectionState);
            
        }
        else if (_this.peerConnection.iceConnectionState === "failed") {
            _this.dataReport.addEvent(_this.reportSeq, "IceFailed");
            
            checkPublishConnectionFailedState(_this, _this.peerConnection.iceConnectionState);
        }
    }

    function checkPublishConnectionFailedState(_this, connectionState) {
        var state = null;
        if (connectionState == "failed") {
            state = publishErrorList.MEDIA_CONNECTION_FAILED;
        }
        else if (connectionState == "closed") {
            state = publishErrorList.MEDIA_CONNECTION_CLOSED;
        }

        if (state == null) {
            return;
        }

        if (_this.state != ENUM_PUBLISH_STATE.publishing && _this.retryState == ENUM_RETRY_STATE.didNotStart) {
            _this.logger.info("zp.oics.0  state " + _this.state + " retryState "+ _this.retryState + " connectionState " + connectionState);

            publishStateUpdateError(_this, state);
        }
        else {
            if (shouldRetryPublish(_this)) {
                _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.retry, _this.streamId);
        
                startRetryPublish(_this);
            }
            else {
                publishStateUpdateError(_this, state);
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // quality timer
    /*
     *    "zp.spq.0": "ZegoPublish.setPublishQualityTimer"
     */
    function setPublishQualityTimer(_this) {
        if (_this.qualityTimer != null) {
            return;
        }

        _this.logger.debug("zp.spq.0 called");
        
        clearPublishQualityTimer(_this);
        
        _this.qualityTimer = setInterval(function() {

            if (_this.peerConnection) {
                _this.peerConnection.getStats(null).then(function(results) {
                    getPublishStats(_this, results);
                }, function(error) {
                    _this.logger.info("zp.spq.0 getStats error " + error.toString());
                });
            }
            
        }, _this.qualityTimeInterval);

        _this.lastPublishStats = {
            time: 0,
            audioBytesSent: 0,
            videoBytesSent: 0,
            framesEncoded: 0,
            framesSent: 0
        };

        _this.qualitySeq = getSeq();
        _this.qualityCount = 0;
        _this.dataReport.newReport(_this.qualitySeq);
    }

    /*
     *    "zp.gps.0": "ZegoPublish.getPublishStats"
     */
    function getPublishStats(_this, results) {
        if (results == undefined) {
            return;
        }

        var publishData = {};
        var time = _this.lastPublishStats.time;
        results.forEach(function(result) {
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
                publishData.sliCount = result.sliCount;

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

        // _this.logger.debug("zp.gps.0 audio: " + publishData.audioBitrate + " video: " + publishData.videoBitrate +
        //  " FPS: " + publishData.videoFPS + " transfer: " + publishData.videoTransferFPS);

        // _this.dataReport.addEvent(_this.qualitySeq, "PublishQuality", publishData);
        // _this.qualityCount += 1;
        // if (_this.qualityCount > _this.maxQualityListCount) {
        //     _this.dataReport.uploadReport(_this.qualitySeq, "RTCPublishQuality");
        //     _this.qualityCount = 0;
        //     _this.qualitySeq = getSeq();
        //     _this.dataReport.newReport(_this.qualitySeq);
        // }

        //upload quality
        uploadPublishQuality(_this, publishData);
        
        if (time != 0) {
            _this.onPublishQualityUpdate(_this.streamId, publishData);
        }
    }

    function clearPublishQualityTimer(_this) {
        if (_this.qualityTimer != null) {
            clearInterval(_this.qualityTimer);
            _this.qualityTimer = null;
        }

        _this.lastPublishStats = {};
        _this.qualityCount = 0;
        
        //_this.dataReport.uploadReport(_this.qualitySeq, "RTCPublishQuality");
    }

    /*
     *    "zp.upq.0": "ZegoPublish.uploadPublishQuality"
     */
    function uploadPublishQuality(_this, publishData) {
        if (!_this.qualityUpload) {
            return;
        }

        var timeStamp = Date.parse(new Date());
        if (_this.qualityUploadLastTime == 0 || timeStamp - _this.qualityUploadLastTime >= _this.qualityUploadInterval) {
            _this.logger.debug("zp.upq.0 upload");

            publishData["stream_type"] = "publish";
            publishData["stream_id"] = _this.streamId;
            publishData["timeStamp"] = timeStamp / 1000;

            _this.signal.QualityReport(getSeq(), _this.sessionId, publishData, function(seq, sessionId, data) {
                if (data.report !== undefined) {
                    _this.qualityUpload = data.report;
                    _this.qualityUploadInterval = data.report_interval_ms;
                }
            }, function(err, seq) {
                _this.logger.info("zp.upq.0 upload failed " + err);
            });

            _this.qualityUploadLastTime = timeStamp;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // error function
    function shouldSendCloseSession$1(_this, errorCode) {
        if (_this.state != ENUM_PUBLISH_STATE.stop && _this.state != ENUM_PUBLISH_STATE.waitingSessionRsp) {
            return true;
        }

        return false;
    }

    /*
     *    "zp.psue.0": "ZegoPublish.publishStateUpdateError"
     */
    function publishStateUpdateError(_this, errorCode) {
        _this.logger.debug("zp.psue.0 called " + errorCode.code);

        if (_this.sessionId != 0 && shouldSendCloseSession$1(_this, errorCode)) {
            //send close session request
            _this.signal.sendCloseSession(getSeq(), _this.sessionId, 1);
            _this.closeSessionSignal = true;
        }

        _this.state = ENUM_PUBLISH_STATE.stop;
        _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.error, _this.streamId, errorCode);

        resetPublish(_this);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // reset function
    /*
     *    "zp.rp.0": "ZegoPublish.resetPublish"
     */
    function resetPublish(_this) {
        _this.logger.info("zp.rp.0 call");

        _this.streamId = null;
        _this.state = ENUM_PUBLISH_STATE.stop;

        if (_this.peerConnection != undefined || _this.peerConnection != null) {
            _this.peerConnection.close();
            _this.peerConnection = null;
        }

        if (_this.waitingAnswerTimer != null) {
            clearTimeout(_this.waitingAnswerTimer);
            _this.waitingAnswerTimer = null;
        }

        if (_this.waitingICETimer != null) {
            clearTimeout(_this.waitingICETimer);
            _this.waitingICETimer = null;
        }

        clearPublishQualityTimer(_this);
        
        if (_this.signal) {
            _this.signal.unregisterPushCallback("CandidateInfoPush", _this.sessionId);
            _this.signal.unregisterPushCallback("MediaDescPush", _this.sessionId);
            _this.signal.unregisterPushCallback("CloseSessionPush", _this.sessionId);
            // _this.signal.unregisterPushCallback('WebSocketDisconnect', _this.sessionId);
        }

        // _this.sessionId = 0;
        _this.sessionSeq = 0;
        _this.offerSeq = 0;
        _this.candidateInfo = [];

        _this.publishQualityList = [];

        _this.qualityUploadLastTime =  0;

        _this.currentRetryCount = 0;
        _this.retryState = ENUM_RETRY_STATE.didNotStart;

        clearTryPublishTimer(_this);
    }

    function ListNode(id, data) {
        this._id = (typeof id === 'number') ? id : null;
        this._data = data || null;
        this.next = null;
        this.prev = null;
    }

    ListNode.prototype = {

        id: function(id) {
            if (id !== null && id !== undefined) {
                if (typeof id === 'number') {
                    this._id = id;
                } else {
                    throw new Error('Id must be an integer.');
                }
            } else {
                return this._id;
            }
        },

        data: function(data) {
            if (data !== null && data !== undefined) {
                this._data = data;
            } else {
                return this._data;
            }
        },

        hasNext: function() {
            if (this.next !== null) {
                return this.next.id() !== null;
            }

            return false;
        },

        hasPrev: function() {
            if (this.prev !== null) {
                return this.prev.id() !== null;
            }

            return false;
        }
    };

    function LinkedList() {
        //initialize end buffer nodes
        this.start = new ListNode();
        this.end = new ListNode();

        //initialize node pointers
        this.start.next = this.end;
        this.start.prev = null;

        this.end.prev = this.start;
        this.end.next = null;

        //initialize counters
        this._idCounter = 0;
        this._numNodes = 0;
    }

    LinkedList.prototype = {

        /**
         *   Inserts a node before another node in the linked list
         *   @param {Node} toInsertBefore
         *   @param {Node} node
         */
        insertBefore: function(toInsertBefore, data) {
            var newNode = new ListNode(this._idCounter, data);

            newNode.next = toInsertBefore;
            newNode.prev = toInsertBefore.prev;

            toInsertBefore.prev.next = newNode;
            toInsertBefore.prev = newNode;

            ++this._idCounter;
            ++this._numNodes;
            return newNode;
        },

        /**
         *   Adds data wrapped in a Node object to the end of the linked list
         *   @param {object} data
         */
        addLast: function(data) {
            return this.insertBefore(this.end, data);
        },

        /**
         *   Alias for addLast
         *   @param {object} data
         */
        add: function(data) {
            return this.addLast(data);
        },

        /**
         *   Gets and returns the first node in the linked list or null
         *   @return {Node/null}
         */
        getFirst: function() {
            if (this._numNodes === 0) {
                return null;
            } else {
                return this.start.next;
            }
        },

        /**
         *   Gets and returns the last node in the linked list or null
         *   @return {Node/null}
         */
        getLast: function() {
            if (this._numNodes === 0) {
                return null;
            } else {
                return this.end.prev;
            }
        },

        /**
         *   Gets and returns the size of the linked list
         *   @return {number}
         */
        size: function() {
            return this._numNodes;
        },

        /**
         *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
         *   Use getAt instead of this function
         *   @param {number} index
         */
        getFromFirst: function(index) {
            var count = 0,
                temp = this.start.next;

            if (index >= 0) {
                while (count < index && temp !== null) {
                    temp = temp.next;
                    ++count;
                }
            } else {
                temp = null;
            }

            if (temp === null) {
                throw 'Index out of bounds.';
            }

            return temp;
        },

        /**
         *   Gets and returns the Node at the specified index in the linked list
         *   @param {number} index
         */
        get: function(index) {
            var temp = null;

            if (index === 0) {
                temp = this.getFirst();
            } else if (index === this._numNodes - 1) {
                temp = this.getLast();
            } else {
                temp = this.getFromFirst(index);
            }

            return temp;
        },

        /**
         *   Removes and returns node from the linked list by rearranging pointers
         *   @param {Node} node
         *   @return {Node}
         */
        remove: function(node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;

            --this._numNodes;

            return node;
        },

        /**
         *   Removes and returns the first node in the linked list if it exists, otherwise returns null
         *   @return {Node/null}
         */
        removeFirst: function() {
            var temp = null;

            if (this._numNodes > 0) {
                temp = this.remove(this.start.next);
            }

            return temp;
        },

        /**
         *   Removes and returns the last node in the linked list if it exists, otherwise returns null
         *   @return {Node/null}
         */
        removeLast: function() {
            var temp = null;

            if (this._numNodes > 0) {
                temp = this.remove(this.end.prev);
            }

            return temp;
        },

        /**
         *   Removes all nodes from the list
         */
        removeAll: function() {
            this.start.next = this.end;
            this.end.prev = this.start;
            this._numNodes = 0;
            this._idCounter = 0;
        },

        /**
         *    Iterates the list calling the given fn for each node
         *    @param {function} fn
         */
        each: function(iterator) {
            var temp = this.start;

            while (temp.hasNext()) {
                temp = temp.next;
                iterator(temp);
            }
        },

        find: function(iterator) {
            var temp = this.start,
                found = false,
                result = null;

            while (temp.hasNext() && !found) {
                temp = temp.next;
                if (iterator(temp)) {
                    result = temp;
                    found = true;
                }
            }

            return result;
        },

        map: function(iterator) {
            var temp = this.start,
                results = [];

            while (temp.hasNext()) {
                temp = temp.next;
                if (iterator(temp)) {
                    results.push(temp);
                }
            }

            return results;
        },

        /**
         *    Alias for addLast
         *    @param {object} data
         */
        push: function(data) {
            return this.addLast(data);
        },

        /**
         *    Performs insertBefore on the first node
         *    @param {object} data
         */
        unshift: function(data) {
            if (this._numNodes > 0) {
                this.insertBefore(this.start.next, data);
            } else {
                this.insertBefore(this.end, data);
            }
        },

        /**
         *    Alias for removeLast
         */
        pop: function() {
            return this.removeLast();
        },

        /**
         *    Alias for removeFirst()
         */
        shift: function() {
            return this.removeFirst();
        }
    };

    /**
     *  ZegoSignal
     */

    var WEBRTC_PROTO_VERSION = "1.0.1"; //协议版本号

    var SEND_MSG_TIMEOUT = 1;
    var SEND_MSG_RESET = 2;

    var MAX_TRY_HEARTBEAT_COUNT = 5;
    var MAX_TRY_CONNECT_COUNT = 3;

    var ENUM_CONNECT_STATE = {disconnect: 0, connecting: 1, connected: 2};

    function ZegoSignal(logger) {
        this.logger = logger;
        
        this.sendDataMap = {};
        this.sendDataList = new LinkedList();
        this.sendDataCheckOnceCount = 100;

        this.signalSeq = 0;

        this.pushCallback = {};

        this.sessionInfos = {};

        //tryheartbeat
        this.tryHeartbeatCount = 0;
        // this.heartbeatTimer = null;
        this.heartbeatInterval = 10 * 1000;
        
        this.sendDataTimeout = 5 * 1000; //发送消息超时
        this.sendDataDropTimeout = 10 * 1000; //丢弃过期消息的超时时间

        this.tryConnectCount = 0;
        this.tryConnectTimer = null;
        this.tryConnectInterval = 3000;

        this.state = ENUM_CONNECT_STATE.disconnect;

        //token
        this.tokenType = 0;

        this.browser = getBrowserAndVersion();
        this.platform = navigator.platform;
    }

    /*
     *    "zs.ssi.0": "ZegoSignal.setSessionInfo"
     */
    ZegoSignal.prototype.setSessionInfo = function(appid, userid) {
        this.logger.debug("zs.ssi.0 call");
        
        this.appid = appid.toString();
        this.userid = userid;
        // this.server = serverUrl;
    };

    ZegoSignal.prototype.onDisconnect = function(server) {};
    ZegoSignal.prototype.onUpdateHeartBeartInterval = function(interval) {};

    /*
     *    "zs.cs.0": "ZegoSignal.connectServer"
     */
    //rtc信令连接
    ZegoSignal.prototype.connectServer = function(token, serverUrl, result) {
        this.token = token;
        this.state = ENUM_CONNECT_STATE.connecting;
        this.connectCallback = result;
        this.server = serverUrl;

        if (!this.websocket || this.websocket.readyState !== 1) {
            this.logger.debug("zs.cs.0 need new websocket");

            try {
                if (this.websocket) {
                    this.logger.info("zs.cs.0 close error websocket");
                    this.websocket.onclose = null;
                    this.websocket.onerror = null;
                    this.websocket.close();
                    this.websocket = null;
                }

                //connect websocket
                this.websocket = new WebSocket(this.server);
                var _this = this;
                this.websocket.onopen = function() {
                    _this.tryConnectCount = 0;

                    //reset connect timer
                    resetConnectTimer(_this);

                    //register onMessage
                    _this.logger.info("zs.cs.0 websocket open call");
                    bindWebSocketHandle(_this);

                    //update token
                    updateToken(_this);

                    _this.state = ENUM_CONNECT_STATE.connected;
                };
            }
            catch (e) {
                this.logger.error("zs.cs.0 websocket error " + e);
            }
        }
        else {
            //websocket is already connect
            resetConnectTimer(_this);
            this.state = ENUM_CONNECT_STATE.connected;
        }

        resetConnectTimer(_this);
        _this.tryConnectTimer = setTimeout(function() {
            startConnectTimer(_this, result);
        }, _this.tryConnectInterval);
    };

    /*
     *    "zs.ds.0": "ZegoSignal.disconnectServer"
     */
    //rtc信令断开连接
    ZegoSignal.prototype.disconnectServer = function() {
        this.logger.debug('zs.ds.0 call');
        this.server = null;
        this.connectCallback = null;

        resetCheckMessage(this);
        resetConnectTimer(this);

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
        
        this.state = ENUM_CONNECT_STATE.disconnect;
    };

    ZegoSignal.prototype.isServerConnected = function() {
        if (this.websocket && this.websocket.readyState === 1) {
            return true;
        }

        return false;
    };

    /*
     *    "zs.cs.1": "ZegoSignal.createSession"
     */
    ZegoSignal.prototype.createSession = function(seq, type, streamId, success, error) {
        this.logger.debug("zs.cs.1 call: ", streamId);

        var cmd = "CreateSessionReq";
        var body = {
            'type': type,
            'stream_id': streamId,
            'platform': this.platform,
            'browser': this.browser.name,
            'version': this.browser.version,
            'app_id': this.appid,
        };

        //publish
        if (type == 0) {
            body['negotiate_mode'] = 0;
        }
        else {
            body['negotiate_mode'] = 1;
        }
        
        sendMessageWithCallback(this, cmd, seq, 0, body, success, error);
    };

    /*
     *    "zs.smd.0": "ZegoSignal.sendMediaDesc"
     */
    //type 0: offer  1: answer
    ZegoSignal.prototype.sendMediaDesc = function(seq, sessionId, type, desc, success, error) {
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

        sendMessageWithCallback(this, cmd, seq, sessionId, body, success, error);
    };

    /*
     *    "zs.sci.0": "ZegoSignal.sendCandidateInfo"
     */
    ZegoSignal.prototype.sendCandidateInfo = function(seq, sessionId, candidateList, success, error) {
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

        sendMessageWithCallback(this, cmd, seq, sessionId, body, success, error);
    };

    /*
     *    "zs.scs.0": "ZegoSignal.sendCloseSession"
     */
    ZegoSignal.prototype.sendCloseSession = function(seq, sessionId, reason, success, error) {
        this.logger.debug("zs.scs.0 call: ", sessionId);

        var cmd = "CloseSessionReq";
        var body = {
            'reason': reason
        };

        removeSession(this, sessionId);

        sendMessageWithCallback(this, cmd, seq, sessionId, body, success, error);
    };

    /*
     *    "zs.smda.0": "ZegoSignal.sendMediaDescAck"
     */
    ZegoSignal.prototype.sendMediaDescAck = function(seq, sessionId, result) {
        this.logger.debug("zs.smda.0 call: ", sessionId);

        var cmd = "MediaDescAck";
        var body = {
            'result': result
        };

        sendMessage(this, cmd, seq, sessionId, body);
    };

    /*
     *    "zs.scia.0": "ZegoSignal.sendCandidateInfoAck"
     */
    ZegoSignal.prototype.sendCandidateInfoAck = function(seq, sessionId, result) {
        this.logger.debug("zs.scia.0 call: ", sessionId);

        var cmd = "CandidateInfoAck";
        var body = {
            'result': result
        };

        sendMessage(this, cmd, seq, sessionId, body);
    };

    /*
     *    "zs.scsa.0": "ZegoSignal.sendCloseSessionAck"
     */
    ZegoSignal.prototype.sendCloseSessionAck = function(seq, sessionId, result) {
        this.logger.debug("zs.scsa.0 call: ", sessionId);

        var cmd = "CloseSessionAck";
        var body = {
            'result': result
        };

        sendMessage(this, cmd, seq, sessionId, body);
    };

    /*
     *    "zs.ssra.0": "ZegoSignal.sendResetSessionAck"
     */
    ZegoSignal.prototype.sendResetSessionAck = function(seq, sessionId, result) {
        this.logger.debug("zs.ssra.0 call: ", sessionId);

        var cmd = "SessionResetAck";
        var body = {
            'result': result
        };

        sendMessage(this, cmd, seq, sessionId, body);
    };

    /*
     *    "zs.rpc.0": "ZegoSignal.registerPushCallback"
     */
    ZegoSignal.prototype.registerPushCallback = function(cmd, sessionId, callback, object) {
        //this.logger.debug("zs.rpc.0 call: ", cmd);

        if (callback && (typeof callback === 'function'))
        {
            this.logger.debug("zs.rpc.0 setcallback");
            this.pushCallback[cmd + sessionId] = {callback: callback, object: object};
        }
    };

    /*
     *    "zs.upc.0": "ZegoSignal.unregisterPushCallback"
     */
    ZegoSignal.prototype.unregisterPushCallback = function(cmd, sessionId) {
        //this.logger.info("zs.urpc.0 call: ", cmd);

        delete this.pushCallback[cmd + sessionId];
    };

    /*
     *    "zs.cmt.0": "ZegoSignal.checkMessageTimeout"
     */
    ZegoSignal.prototype.checkMessageTimeout = function() {
        
        var head = this.sendDataList.getFirst();
        var timestamp = Date.parse(new Date());
        var checkCount = 0;
        var timeoutMsgCount = 0;
        var dropMsgCount = 0;

        //_this.logger.debug('zs.cmt.0 call ' + timestamp);

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
                    head._data.error(SEND_MSG_TIMEOUT, head._data.seq);
            }

            ++checkCount;
            if (checkCount >= this.sendDataCheckOnceCount) {
                break;
            }

            head = this.sendDataList.getFirst();
        }

        // _this.sendDataCheckTimer = setTimeout(function() {
        //     checkMessageTimeout(_this);
        // }, _this.sendDataCheckInterval);

        if (timeoutMsgCount != 0 || dropMsgCount != 0) {
            this.logger.debug("zs.cmt.0 call success, state: timeout=", timeoutMsgCount, " drop=", dropMsgCount);
        }
    };

    /*
     *    "zs.shb.0": "ZegoSignal.signalHeartbeat"
     */
    ZegoSignal.prototype.sendHeartbeat = function() {
        this.logger.debug("zs.shb.0 call");

        if (Object.keys(this.sessionInfos).length == 0) {
            this.logger.info("zs.shb.0 no need to heartbeat");
            return;
        }

        if (++this.tryHeartbeatCont > MAX_TRY_HEARTBEAT_COUNT) {
            this.logger.error("zs.shb.0 heartbeat try limit");

            disconnectCallback(this);
            return;
        }

        var sessionIdList = [];
        for (var sessionId in this.sessionInfos) {
            sessionIdList.push(parseInt(sessionId));
        }

        var body = {
            'session_ids': sessionIdList
        };

        var _this = this;
        sendMessageWithCallback(this, "ClientHBReq", getSeq(), 0, body, function(seq, sessionId, data) {
            if (_this.heartbeatInterval != data.hb_interval) {
                _this.heartbeatInterval = data.hb_interval;

                _this.onUpdateHeartBeartInterval(data.hb_interval);
            }

            _this.tryHeartbeatCount = 0;
        }, function(err, seq) {
            _this.tryHeartbeatCount += 1;
        });
    };

    /*
     *    "zs.qr.0": "ZegoSignal.QualityReport"
     */
    ZegoSignal.prototype.QualityReport = function(seq, sessionId, qualityStat, success, error) {
        this.logger.debug("zs.qr.0 call");

        var cmd = "QualityReportReq";
        var body = {
            streams: [qualityStat]
        };

        sendMessageWithCallback(this, cmd, seq, sessionId, body, success, error);
    };

    /*
     *    "zs.bsh.0": "ZegoSignal.bindWebSocketHandle"
     */
    function bindWebSocketHandle(_this) {
        _this.websocket.onmessage = function(e) {
            var msg = JSON.parse(e.data);
            _this.logger.debug("zs.bsh.0 signmsg= ", msg.header.cmd);

            if (msg.header.appid !== _this.appid || msg.header.user_id !== _this.userid) {
                _this.logger.info("zs.bsh.0 check header failed");
                return;
            }

            handleServerPush(_this, msg);
        };

        _this.websocket.onclose = function(e) {
            _this.logger.info("zs.bsh.0 close msg = " + JSON.stringify(e));

            if (_this.state != ENUM_CONNECT_STATE.disconnect) {
                //try connect
                resetConnectTimer(_this);
                startConnectTimer(_this, null);

                //all request timeout
                resetCheckMessage(_this);
            }
        };

        _this.websocket.onerror = function(e) {
            _this.logger.info("zs.bsh.0 msg = " + JSON.stringify(e));
        };
    }

    function handleServerPush(_this, msg) {
        switch (msg.header.cmd) {
        case 'LoginRsp':
            handleRespondData(_this, "LoginReq", msg);
            break;
        case 'CreateSessionRsp':
            handleRespondData(_this, "CreateSessionReq", msg);
            if (msg.body.result === 0)
                addSession(_this, msg.header.session_id, msg.body.session_token);
            break;
        case 'MediaDescRsp':
            handleRespondData(_this, "MediaDescReq", msg);
            break;
        case 'CandidateInfoRsp':
            handleRespondData(_this, "CandidateInfoReq", msg);
            break;
        case 'CloseSessionRsp':
            handleRespondData(_this, "CloseSessionReq", msg);
            removeSession(_this, msg.header.session_id);
            break;
        case 'ClientHBRsp':
            handleRespondData(_this, "ClientHBReq", msg);
            break;
        case 'MediaDescPush':
            handlePushData(_this, msg);
            break;
        case 'CandidateInfoPush':
            handlePushData(_this, msg);
            break;
        case 'CloseSessionPush':
            handlePushData(_this, msg);
            removeSession(_this, msg.header.session_id);
            break;
        case 'QualityReportRsp':
            handleRespondData(_this, "QualityReportReq", msg);
            break;
        case 'SessionResetPush':
            handlePushResetSessionData(_this, msg);
            break;
        }
    }

    /*
     *    "zs.hrd.0": "ZegoSignal.handleRespondData"
     */
    function handleRespondData(_this, cmd, msg) {
        _this.logger.debug("zs.hrd.0 call");

        //callback
        var sendDataNode = _this.sendDataMap[msg.header.seq];
        if (sendDataNode == null) {
            _this.logger.debug("zs.hrd.0 cannot find data");
            return;
        }

        var sendData = sendDataNode._data;
        if (sendData.cmd !== cmd) {
            _this.logger.error("sz.hrd.0 command is not match");
        }
        else {
            if (sendData.success) {
                sendData.success(msg.header.seq, msg.header.session_id, msg.body);
            }
        }
        
        delete _this.sendDataMap[msg.header.seq];
        _this.sendDataList.remove(sendDataNode);
    }

    /*
     *    "zs.hpd.0": "ZegoSignal.handlePushData"
     */
    function handlePushData(_this, msg) {
        _this.logger.debug("zs.hpd.0 call " + msg.header.cmd + " session " + msg.header.session_id);

        var callbackData = _this.pushCallback[msg.header.cmd + msg.header.session_id];
        if (callbackData == null) {
            _this.logger.info("zs.hpd.0 no callbackData " + msg.header.cmd + " session: " + msg.header.session_id);
            return;
        }

        if (callbackData.callback) {
            callbackData.callback(callbackData.object, msg.header.seq, msg.header.session_id, msg.body);
        }
    }

    /*
     *    "zs.hprsd.0": "ZegoSignal.handlePushResetSessionData"
     */
    function handlePushResetSessionData(_this, msg) {
        _this.logger.debug("zs.hprsd.0 call ");

        var sessionList = [];
        if (msg.body.cResetType == 0) {
            sessionList = Object.keys(_this.sessionInfos);
        }
        else if (msg.body.cResetType == 1) {
            for (var i = 0; i < msg.body.session_ids.length; i++) {
                sessionList.push(msg.body.session_ids[i]);
            }
        }

        //send ack
        _this.sendResetSessionAck(msg.header.seq, 0, 0);

        if (sessionList.length == 0) {
            _this.logger.info("zs.hprsd.0 no session to callback");
            return;
        }

        for (var j = 0; j < sessionList.length; j++) {
            var callbackData = _this.pushCallback[msg.header.cmd + sessionList[j]];
            if (callbackData == null) {
                _this.logger.info("zs.hprsd.0 no callbackData " + sessionList[j]);
            }
            else {
                if (callbackData.callback) {
                    callbackData.callback(callbackData.object, msg.header.seq, sessionList[j], msg.body);
                }
            }
        }
    }
    /*
     *    "zs.sm.0": "ZegoSignal.sendMessage"
     */
    function sendMessage(_this, cmd, seq, sessionId, body) {
        _this.logger.debug("zs.sm.0 call " + cmd);

        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.logger.error("zs.sm.0 connect not establish");
            return;
        }

        var header = getHeader(_this, cmd, seq, sessionId);
        var data = {
            'header': header,
            'body': body
        };

        var dataBuffer = JSON.stringify(data);
        _this.websocket.send(dataBuffer);

        _this.logger.debug('zs.sm.0 success');
    }

    /*
     *    "zs.smwc.0": "ZegoSignal.sendMessageWithCallback"
     */
    function sendMessageWithCallback(_this, cmd, seq, sessionId, body, success, error) {
        _this.logger.debug("zs.smwc.0 call " + cmd);

        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.logger.error("zs.smwc.0 connect not establish");
            if (error) {
                error(SEND_MSG_TIMEOUT, seq);
            }

            return;
        }

        var header = getHeader(_this, cmd, seq, sessionId);
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
            time: Date.parse(new Date()),
            success: success,
            error: error,
        };

        var cmdDataNode = _this.sendDataList.push(cmdData);
        _this.sendDataMap[cmdData.seq] = cmdDataNode;

        var dataBuffer = JSON.stringify(data);
        _this.websocket.send(dataBuffer);

        _this.logger.debug('zs.smwc.0 success');
    }

    function getHeader(_this, cmd, seq, sessionId) {
        _this.globalHeader = {
            'version': WEBRTC_PROTO_VERSION,
            'cmd': cmd,
            'appid': _this.appid,
            'seq': seq,
            'user_id': _this.userid,
            'session_id': sessionId
        };

        return _this.globalHeader;
    }



    /*
     *    "zs.rcm.0": "ZegoSignal.resetCheckMessage"
     */
    function resetCheckMessage(_this) {
        _this.logger.debug("zs.rcm.0 call");

        // clearTimeout(_this.sendDataCheckTimer);
        // _this.sendDataCheckTimer = null;

        var head = _this.sendDataList.getFirst();
        while (head != null) {
            _this.sendDataList.remove(head);

            if (head._data.error)
                head._data.error(SEND_MSG_RESET, head._data.seq);

            head = _this.sendDataList.getFirst();
        }

        _this.sendDataMap = {};
    }

    /*
     *    "zs.as.0": "ZegoSignal.addSession"
     */
    function addSession(_this, sessionId, token) {
        _this.logger.info("zs.as.0 call");

        for (var _sessionId in _this.sessionInfos) {
            if (_sessionId === sessionId) {
                _this.sessionInfos[sessionId].token = token;
                return;
            }
        }

        _this.sessionInfos[sessionId] = {
            token: token
        };
    }

    /*
     *    "zs.rs.0": "ZegoSignal.removeSession"
     */
    function removeSession(_this, sessionId){
        _this.logger.info("zs.rs.0 call");

        if (_this.sessionInfos[sessionId]) {
            delete _this.sessionInfos[sessionId];
        }
    }

    /*
     *    "zs.ut.0": "ZegoSignal.updateToken"
     */
    function updateToken(_this) {
        _this.logger.info("zs.ut.0 call");

        var cmd = "LoginReq";
        var body = {
            'token': _this.token,
            'tokenType': _this.tokenType
        };

        if (Object.keys(_this.sessionInfos).length != 0) {
            var sessions = [];
            for (var sessionId in _this.sessionInfos) {
                var session_id = parseInt(sessionId);
                sessions.push({
                    session_id: session_id,
                    session_token: _this.sessionInfos[session_id].token
                });
            }

            body["sessions"] = sessions;
        }

        sendMessageWithCallback(_this, cmd, getSeq(), 0, body, function(seq, session_id, data) {
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
        }, function(err, seq) {
            if (_this.connectCallback != null) {
                _this.connectCallback(-1, _this.server, undefined);
                _this.connectCallback = null;
            }
        });
    }

    /*
     *    "zs.rct.0": "ZegoSignal.resetConnectTimer"
     */
    function resetConnectTimer(_this) {
        _this.logger.info("zs.rct.0 call");
        clearTimeout(_this.tryConnectTimer);
        _this.tryConnectTimer = null;
        // _this.tryConnectCount = 0;
    }

    /*
     *    "zs.sct.0": "ZegoSignal.startConnectTimer"
     */
    function startConnectTimer(_this, callback) {
        _this.logger.info("zs.sct.0 call");

        if (_this.tryConnectCount > MAX_TRY_CONNECT_COUNT) {
            _this.logger.error("zs.sct.0 beyond max limit");
            
            disconnectCallback(_this);
            return;
        }

        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.tryConnectCount += 1;
            _this.connectServer(_this.token, _this.server, callback);
        }
        else {
            //already connect
            resetConnectTimer(_this);
        }
    }

    /*
     *    "zs.dc.0": "ZegoSignal.disconnectCallback"
     */
    function disconnectCallback(_this) {
        // for (var sessionId in _this.sessionInfos) {
        //     var callbackData = _this.pushCallback["WebSocketDisconnect"+ sessionId];
        //     if (callbackData == null) {
        //         _this.logger.error("zs.dc.0 no callbackData");
        //         return;
        //     }
            
        //     if (callbackData.callback) {
        //         callbackData.callback(callbackData.object, parseInt(sessionId));
        //     }
        // }   

        if (_this.connectCallback) {
            _this.connectCallback(-1, _this.server, undefined);
            _this.connectCallback = null;
        }

        var server = _this.server;
        _this.disconnectServer();
        _this.onDisconnect(server);
    }

    ///////////////////////////////////////////
    function getBrowserAndVersion() {
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || []; 
        if(/trident/i.test(M[1])) {
            tem=/\brv[ :]+([\d\.]+)/g.exec(ua) || []; 
            return {name:'IE',version:(tem[1]||'')};
        }   
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR|Edge\/([\d\.]+)/);
            if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/([\d+\.]+)/i))!=null) {M.splice(1,1,tem[1]);}
        
        return {
            name: M[0],
            version: M[1]
        };
    }

    /**
       ZegoDataReport
    */

    function ZegoDataReport(logger) {
        this.logger = logger;

        this.dataStatistics = {};
    }

    ZegoDataReport.prototype.newReport = function(seq) {
        this.dataStatistics[seq] = {
            abs_time: Date.now(),
            time_consumed: 0,
            error: 0,
            events: [],
        };
    };

    ZegoDataReport.prototype.addMsgExt = function(seq, msg_ext) {
        if (!this.dataStatistics[seq]) {
            return;
        }

        this.dataStatistics[seq].msg_ext = msg_ext;
    };

    /*
     *    "zd.es.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventStart = function (seq, event_name) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.es.0 no seq match");
            return;
        }

        if (this.dataStatistics[seq].events == undefined) {
            this.logger.info("zd.es.0 no events");
            return;
        }

        this.dataStatistics[seq].events.push({
            event: event_name,
            abs_time: Date.now(),
            time_consumed: 0
        });
    };

    /*
     *    "zd.ee.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventEnd = function (seq, event_name) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.ee.0 no seq match");
            return;
        }

        var events = this.dataStatistics[seq].events;
        if (events == undefined) {
            this.logger.info("zd.ee.0 no events");
            return;
        }

        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed != undefined) {
                events[i].time_consumed = Date.now() - events[i].abs_time;
                break;
            }
        }
    };

    ZegoDataReport.prototype.eventEndWithMsg = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.ee.0 no seq match");
            return;
        }

        var events = this.dataStatistics[seq].events;
        if (events == undefined) {
            this.logger.info("zd.ee.0 no events");
            return;
        }

        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed != undefined) {
                events[i].time_consumed = Date.now() - events[i].abs_time;

                if (events[i].msg_ext == undefined) {
                    events[i].msg_ext = {};
                }

                for (var item in msg_ext) {
                    events[i].msg_ext[item] = msg_ext[item];
                }
                break;
            }
        }
    };

    /*
     *    "zd.aei.0": "ZegoDataReport.addEventInfo"
     */
    ZegoDataReport.prototype.addEventInfo = function (seq, event_name, key, value){
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.aei.0 no seq match");
            return;
        }

        var events = this.dataStatistics[seq].events;
        if (events == undefined) {
            this.logger.info("zd.aei.0 no events");
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

    /*
     *    "zd.ae.0": "ZegoDataReport.addEvent"
     */
    ZegoDataReport.prototype.addEvent = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.ae.0 no seq match");
            return;
        }

        if (this.dataStatistics[seq].events == undefined) {
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

    ZegoDataReport.prototype.uploadReport = function(seq, itemType) {
        var reportInfo = this.dataStatistics[seq];
        if (reportInfo == undefined) {
            return;
        }

        reportInfo.itemtype = itemType;
        reportInfo.time_consumed = Date.now() - reportInfo.abs_time;

        this.logger.report(reportInfo);

        delete this.dataStatistics[seq];
    };

    /**
     * ZegoPreview
     */

    var ENUM_RESOLUTION_TYPE = {
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

    function ZegoPreview(logger) {
        this.logger = logger;

        this.localVideo = null;
        this.localStream = null;
        this.videoInfo = {};
    }

    ZegoPreview.enumDevices = function (devicesList, error) {
        if (navigator.mediaDevices === undefined || 
            navigator.mediaDevices.enumerateDevices === undefined) {
            if (error) {
                error("browser don't support enumerate devices");
            }
            return;
        }
        
        navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
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

            if (devicesList) {
                devicesList({
                    microphones: microphone,
                    speakers: speaker,
                    cameras: camera
                });
            }
            
        }).catch(function(err) {
            if (error) {
                error(err);
            }
        });
    };

    /*
     *    "zp.gmsc.2": "ZegoPreview.getMediaStreamConstraints"
     */
    function getMediaStreamConstraints(_this, mediaStreamConfig) {
        var mediaStreamConstraints = {
            video:false,
            video:false
        };

        //audio
        if (mediaStreamConfig.audio === true) {
            if (mediaStreamConfig.audioInput != undefined) {
                mediaStreamConstraints.audio = {
                    deviceId: {
                        exact: mediaStreamConfig.audioInput
                    }
                };
            }
            else {
                mediaStreamConstraints.audio = true;
            }
        }

        //video
        if (mediaStreamConfig.video === true) {        
            var width = 640;
            var height = 480;
            var frameRate = 15;
            var bitRate = 800;

            //videoQuality
            //1 QVGA
            if (mediaStreamConfig.videoQuality === 1) {
                width = ENUM_RESOLUTION_TYPE.LOW.width;
                height = ENUM_RESOLUTION_TYPE.LOW.height;
                frameRate = ENUM_RESOLUTION_TYPE.LOW.frameRate;
                bitRate = ENUM_RESOLUTION_TYPE.LOW.bitRate;
            }
            //2 VGA
            else if (mediaStreamConfig.videoQuality === 2) {
                width = ENUM_RESOLUTION_TYPE.MEDIUM.width;
                height = ENUM_RESOLUTION_TYPE.MEDIUM.height;
                frameRate = ENUM_RESOLUTION_TYPE.MEDIUM.frameRate;
                bitRate = ENUM_RESOLUTION_TYPE.MEDIUM.bitRate;
            }
            //3 HD
            else if (mediaStreamConfig.videoQuality === 3) {
                width = ENUM_RESOLUTION_TYPE.HIGH.width;
                height = ENUM_RESOLUTION_TYPE.HIGH.height;
                frameRate = ENUM_RESOLUTION_TYPE.HIGH.frameRate;
                bitRate = ENUM_RESOLUTION_TYPE.HIGH.bitRate;
            }
            //custom
            else if (mediaStreamConfig.videoQuality === 4){
                width = mediaStreamConfig.width;
                height = mediaStreamConfig.height;
                frameRate = mediaStreamConfig.frameRate;
                bitRate = mediaStreamConfig.bitRate;
            }
            else {
                _this.logger.info("zp.gmsc.2 user default");
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
            else if (mediaStreamConfig.videoInput != undefined) {
                mediaStreamConstraints.video.deviceId = {
                    exact: mediaStreamConfig.videoInput
                };
            }

            _this.logger.info("zp.gmsc.2 width: " + width + " height: " + height + " rate: " + frameRate);
        }

        return mediaStreamConstraints;
    }

    /*
     *    "zp.sv.2": "ZegoPreview.startPreview"
     */
    ZegoPreview.prototype.startPreview = function (localVideo, mediaStreamConfig, successCallback, errorCallback) {
        this.logger.debug("zp.sv.2 called");

        this.localVideo = localVideo;
        
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia == undefined) {
            if (errorCallback) {
                errorCallback("browser don't support");
            }
            return;
        }

        //external media stream
        if (mediaStreamConfig.externalMediaStream instanceof MediaStream)
        {
            this.logger.debug("zp.sv.2 use external media stream");

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

        if (mediaStreamConfig.externalCapture) {
            var result = captureStream(this, localVideo);
            if (result) {
                if (successCallback) {
                    successCallback();
                }
            }
            else {
                if (errorCallback) {
                    errorCallback("browser don't support");
                }
            }

            return;
        }
        
        

        var mediaStreamConstraints = getMediaStreamConstraints(this, mediaStreamConfig);
        this.videoInfo = mediaStreamConstraints.video;

        var _this = this;
        _this.logger.info("zp.sv.2 mediaStreamConstraints"+JSON.stringify(mediaStreamConstraints));
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(function (stream) {
            _this.logger.info("zp.sv.2 success");

            if (!_this.localVideo) {
                _this.logger.info("zp.sv.2 no localVideo");
                if (errorCallback) {
                    errorCallback("no localVideo");
                }
                return;
            }
            
            _this.localVideo.srcObject = stream;
            _this.localStream = stream;
                   
            if (successCallback) {
                successCallback();
            }
        }).catch(function(error) {
            _this.logger.info("zp.sv.2 failed");
            if (errorCallback) {
                errorCallback(error.name);
            }
        });
    };

    /*
     *    "zp.cs.2": "ZegoPreview.captureStream"
     */
    function captureStream(_this, localVideo) {
        if (!localVideo) {
            _this.logger.info("zp.cs.2 no local video");
            return false;
        }

        if (localVideo.captureStream) {
            _this.localStream = localVideo.captureStream();
            _this.logger.debug("zp.cs.2 captureStream");
        }
        else if (localVideo.mozCaptureStream) {
            _this.localStream = localVideo.mozCaptureStream();
            _this.logger.debug("zp.cs.2 mozCaptureStream");
        }
        else {
            _this.logger.info("zp.cs.2 don't support");
            return false;
        }

        _this.videoInfo = {
            width: localVideo.videoWidth,
            height: localVideo.videoHeight,
            frameRate: 0,
            bitRate: 0
        };
        
        _this.logger.debug("zp.cs.2 called success");

        return true;
    }

    /*
     *    "zp.sv.2.1": "ZegoPreview.stopPreview"
     */
    ZegoPreview.prototype.stopPreview = function () {
        this.logger.info("zp.sv.2.1 called");

        if (!this.localStream) {
            return;
        }
        
        this.localStream.getTracks().forEach(function(track) {
            track.stop();
        });
        
        this.localStream = null;

        this.localVideo.srcObject = null;
        this.localVideo = null;

        this.videoInfo = {};
    };

    /*
     *    "zp.em.2": "ZegoPreview.enableMicrophone"
     */
    ZegoPreview.prototype.enableMicrophone = function (enable) {
        if (!this.localStream) {
            this.logger.info("zp.em.2 no localStream");
            return false;
        }

        this.localStream.getAudioTracks().forEach(
            function(track) {
                track.enabled = enable;
            }
        );

        this.logger.debug("zp.em.2 call success");
        return true;
    };

    /*
     *    "zp.ec.2": "ZegoPreview.enableCamera"
     */
    ZegoPreview.prototype.enableCamera = function (enable) {
        if (!this.localStream) {
            this.logger.info("zp.ec.2 no localStream");
            return false;
        }

        this.localStream.getVideoTracks().forEach(
            function(track) {
                track.enabled = enable;
            }
        );

        this.logger.debug("zp.ec.2 call success");
        return true;
    };

    /*
     *    "zp.sad.2": "ZegoPreview.setAudioDestination"
     */
    ZegoPreview.prototype.setAudioDestination = function (audioOutput) {
        if (!this.localVideo) {
            this.logger.info("zp.sad.2 no localVideo");
            return false;
        }

        if (this.localVideo.sinkId !== 'undefined') {
            var _this = this;
            this.localVideo.setSinkId(audioOutput).then(function() {
                _this.logger.info("zp.sad.2 success device: " + audioOutput);
                // _this.audioOutput = audioOutput;
            }).catch(function(error) {
                _this.logger.info("zp.sad.2 " + error.name);
            });
            return true;
        }
        else {
            this.logger.error("zp.sad.2 browser does not suppport");
            return false;
        }
    };

    /**
     * ZegoStreamCenter
     */

    function ZegoStreamCenter(logger) {
        this.playerList = {};
        this.publisherList = {};
            
        this.logger = logger;
        this.dataReport = new ZegoDataReport(this.logger);

        //由streamcenter统一管理每个signal的心跳逻辑
        this.heartbeatTimer = null;
        this.heartbeatInterval = 10 * 1000;

        //质量回调时间间隔,默认3s
        this.qualityTimerInterval = 3 * 1000;

        this.maxRetryCount = 5;

        this.previewVideoList = [];

        this.signalList = {};

        this.testEnvironment = false;
    }

    var ENUM_SIGNAL_STATE = {disconnected: 0, connecting: 1, connected: 2};

    ZegoStreamCenter.prototype.onSignalDisconnected = function (server) {};

    /*
     *    "zsc.qmc.0": "ZegoStreamCenter.setQualityMonitorCycle"
     */
    ZegoStreamCenter.prototype.setQualityMonitorCycle = function (timeInMs) {
        this.logger.debug("zsc.qmc.0 timeInterval " + timeInMs);

        this.qualityTimerInterval = timeInMs;
    };

    /*
     *    "zsc.ssi.0": "ZegoStreamCenter.setSessionInfo"
     */
    ZegoStreamCenter.prototype.setSessionInfo = function (appid, userid, token, testEnvironment) {
        this.logger.debug("zsc.ssi.0 called");
        
        // this.signal.setSessionInfo(appid, userid, serverUrl);
        this.appid = appid;
        this.userid = userid;
        this.token = token;
        this.testEnvironment = testEnvironment;
    };

    ZegoStreamCenter.prototype.onPlayStateUpdate = function (type, streamid, error) {};
    ZegoStreamCenter.prototype.onPlayQualityUpdate = function (streamid, streamQuality) {};

    ZegoStreamCenter.prototype.onPublishStateUpdate = function (type, streamid, error) {};
    ZegoStreamCenter.prototype.onPublishQualityUpdate = function (streamid, streamQuality) {};

    ZegoStreamCenter.prototype.onVideoSizeChanged = function (streamid, videoWidth, videoHeight) {};

    /*
     *    "zsc.psuh.1": "ZegoStreamCenter.onPlayStateUpdateHandle"
     */
    ZegoStreamCenter.prototype.onPlayStateUpdateHandle = function (type, streamid, error) {
        var play = this.playerList[streamid];
        if (play) {
            this.onPlayStateUpdate(type, play.streamId, error);
        }
        else {
            this.logger.info("zsc.psuh.1 cannot find play " + streamid);
        }
    };

    /*
     *    "zsc.pquh.1": "ZegoStreamCenter.onPlayQualityUpdateHandle"
     */
    ZegoStreamCenter.prototype.onPlayQualityUpdateHandle = function (streamid, streamQuality) {
        var play = this.playerList[streamid];
        if (play) {
            this.onPlayQualityUpdate(play.streamId, streamQuality);
        }
        else {
            this.logger.info("zsc.psuh.1 cannot find play" + streamid);
        }
    };

    /*
     *    "zsc.psuh.0": "ZegoStreamCenter.onPublishStateUpdateHandle"
     */
    ZegoStreamCenter.prototype.onPublishStateUpdateHandle = function (type, streamid, error) {
        var publish = this.publisherList[streamid];
        if (publish) {
            this.onPublishStateUpdate(type, publish.streamId, error);
        }
        else {
            this.logger.info("zsc.psuh.0 cannot find publish " + streamid);
        }
    };

    /*
     *    "zsc.pquh.0": "ZegoStreamCenter.onPublishQualityUpdateHandle"
     */
    ZegoStreamCenter.prototype.onPublishQualityUpdateHandle = function (streamid, streamQuality) {
        var publish = this.publisherList[streamid];
        if (publish) {
            this.onPublishQualityUpdate(publish.streamId, streamQuality);
        }
        else {
            this.logger.info("zsc.pquh.0 cannot find publish " + streamid);
        }
    };

    /*
     *    "zsc.vsch.1": "ZegoStreamCenter.onVideoSizeChangedHandle"
     */
    ZegoStreamCenter.prototype.onVideoSizeChangedHandle = function (streamid, videoWidth, videoHeight) {
        var play = this.playerList[streamid];
        if (play) {
            this.onVideoSizeChanged(play.streamId, videoWidth, videoHeight);
        }
        else {
            this.logger.info("zsc.vsch.1 cannot find play" + streamid);
        }
    };

    /*
     *    "zsc.uhb.0": "ZegoStreamCenter.onUpdateHeartBeartIntervalHandle"
     */
    ZegoStreamCenter.prototype.onUpdateHeartBeartIntervalHandle = function(interval) {
        if (interval != this.heartbeatInterval) {
            this.logger.debug("zsc.uhb.0 update " + interval);
            
            if (this.heartbeatTimer) {
                clearTimeout(this.heartbeatTimer);
                this.heartbeatTimer = null;
            }

            this.heartbeatInterval = interval;

            startSignalHeartbeat(this);
        }
    };

    ZegoStreamCenter.prototype.enumDevices = function (devicesList, error) {
        return ZegoPreview.enumDevices(devicesList, error);
    };

    /*
     *    "zsc.em.0": "ZegoStreamCenter.enableMicrophone"
     */
    ZegoStreamCenter.prototype.enableMicrophone = function (localVideo, enable) {
        var preview = checkPreivew(this, localVideo);
        if (!preview) {
            this.logger.info("zsc.em.0 no preview");
            return false;
        }

        return preview.enableMicrophone(enable);
    };

    /*
     *    "zsc.ec.0": "ZegoStreamCenter.enableCamera"
     */
    ZegoStreamCenter.prototype.enableCamera = function (localVideo, enable) {
        var preview = checkPreivew(this, localVideo);
        if (!preview) {
            this.logger.info("zsc.ec.0 no preview");
            return false;
        }

        return preview.enableCamera(enable);
    };

    /*
     *    "zsc.sp.0": "ZegoStreamCenter.startPreview"
     */
    ZegoStreamCenter.prototype.startPreview = function (localVideo, mediaStreamConstraints, success, error) {
        if (!localVideo) {
            this.logger.info("zsc.sp.0 localVideo null");
            return false;
        }

        var preview = checkPreivew(this, localVideo);
        if (preview) {
            this.logger.info("zsc.sp.0 localvideo alredy exist");
            return true;
        }

        preview = new ZegoPreview(this.logger);
        this.previewVideoList.push(preview);
        preview.startPreview(localVideo, mediaStreamConstraints, success, error);

        this.logger.debug("zsc.sp.0 call success");
        return true;
    };

    /*
     *    "zsc.sp.1": "ZegoStreamCenter.stopPreview"
     */
    ZegoStreamCenter.prototype.stopPreview = function (localVideo) {
        if (!localVideo) {
            this.logger.info("zsc.sp.0 localVideo null");
            return false;
        }

        for (var streamid in this.publisherList) {
            if (this.publisherList[streamid].localVideo === localVideo) {
                this.publisherList[streamid].localVideo = null;
            }
        }

        var preview = checkPreivew(this, localVideo);
        if (!preview) {
            this.logger.info("zsc.sp.0 no preview");
            return false;
        }

        preview.stopPreview();
        removePreview(this, preview);

        return true;
    };

    /*
     *    "zsc.pss.0": "ZegoStreamCenter.setPublishStateStart"
     */
    ZegoStreamCenter.prototype.setPublishStateStart = function (streamid, localVideo) {

        var totalStreamid = getTotalStreamId(this, streamid);
        var publish = this.publisherList[totalStreamid];
        if (publish) {
            this.logger.error("zsc.pss.0 publisher already exist");
            return false;
        }

        var publisher = new ZegoPublish(this.logger, null, this.dataReport, this.qualityTimerInterval);
        publisher.onPublishStateUpdate = this.onPublishStateUpdateHandle.bind(this);
        publisher.onPublishQualityUpdate = this.onPublishQualityUpdateHandle.bind(this);

        this.publisherList[totalStreamid] = {
            localVideo: localVideo,
            publisher: publisher,
            serverUrls: [],
            streamId: streamid,
            retryCount: 0
        };

        this.dataReport.eventStart(publisher.reportSeq, "GetSignalUrl");

        return true;
    };

    /*
     *    "zsc.sps.0": "ZegoStreamCenter.startPublishingStream"
     */
    ZegoStreamCenter.prototype.startPublishingStream = function (streamid, serverUrls) {
        this.logger.debug("zsc.sps.0 call");

        var totalStreamid = getTotalStreamId(this, streamid);
        var publish = this.publisherList[totalStreamid];
        if (!publish) {
            this.logger.info("zsc.sps.0 publisher don't exist");
            return false;
        }

        var publisher = publish.publisher;
        this.dataReport.eventEndWithMsg(publisher.reportSeq, "GetSignalUrl", {
            urls: serverUrls
        });
        
        if (serverUrls.length == 0) {
            this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.error, streamid, publishErrorList.DISPATCH_ERROR);

            this.logger.info("zsc.sps.0 server don't have signal url");
            return false;
        }
        
        var serverUrl = serverUrls[0];
        for (var i = 1; i < serverUrls.length; i ++) {
            publish.serverUrls.push(serverUrls[i]);
        }

        return connectPublishServer(this, totalStreamid, serverUrl);
    };

    /*
     *    "zsc.sps.0.1": "ZegoStreamCenter.stopPublishingStream"
     */
    ZegoStreamCenter.prototype.stopPublishingStream = function(streamid) {

        var totalStreamId = getTotalStreamId(this, streamid);
        var publish = this.publisherList[totalStreamId];
        if (!publish) {
            this.logger.info("zsc.sps.0.1 publisher don't exist");
            return;
        }

        if (publish.publisher) {
            publish.publisher.stopPublish();
            delete publish.publisher;
        }
            
        //update signal
        removeStreamFromSignal(this, true, totalStreamId);
        stopSignalHeartbeat(this);
        
        delete this.publisherList[totalStreamId];
        
        this.logger.debug("zsc.sps.0.1 call success");
    };

    /*
     *    "zsc.pss.1": "ZegoStreamCenter.setPlayStateStart"
     */
    ZegoStreamCenter.prototype.setPlayStateStart = function (streamid, remoteVideo, audioOutput) {
        var totalStreamId = getTotalStreamId(this, streamid);
        var play = this.playerList[totalStreamId];
        if (play) {
            this.logger.info("zsc.pss.1 player already exist");
            return false;
        }

        var player = new ZegoPlay(this.logger, null, this.dataReport, this.qualityTimerInterval);
        player.onPlayStateUpdate = this.onPlayStateUpdateHandle.bind(this);
        player.onPlayQualityUpdate = this.onPlayQualityUpdateHandle.bind(this);
        player.onVideoSizeChanged = this.onVideoSizeChangedHandle.bind(this);
        
        this.playerList[totalStreamId] = {
            player: player,
            remoteVideo: remoteVideo,
            audioOutput: audioOutput,
            streamId: streamid,
            // signal: signal,
            serverUrls: [],
            retryCount: 0
        };

        this.dataReport.eventStart(player.reportSeq, "GetSignalUrl");

        return true;
    };

    /*
     *    "zsc.psao.1": "ZegoStreamCenter.setPlayStreamAudioOutput"
     */
    ZegoStreamCenter.prototype.setPlayStreamAudioOutput = function (streamid, audioOutput) {
        var totalStreamId = getTotalStreamId(this, streamid);
        if (audioOutput != undefined && audioOutput.length != 0) {
            this.logger.debug("zsc.psao.1 device " + audioOutput);
            var play = this.playerList[totalStreamId];
            if (!play) {
                this.logger.info("zsc.psao.1 play don't exist");
                return false;
            }

            if (!play.player) {
                this.logger.info("zsc.psao.1 player don't exist");
                return false;
            }

            return play.player.setAudioDestination(audioOutput);
        }

        return false;
    };

    /*
     *    "zsc.psao.0": "ZegoStreamCenter.setPublishStreamAudioOutput"
     */
    ZegoStreamCenter.prototype.setPublishStreamAudioOutput = function (localVideo, audioOutput) {
        if (audioOutput != undefined && audioOutput.length != 0 && localVideo) {
            this.logger.debug("zsc.psao.0 device " + audioOutput);

            var preview = checkPreivew(this, localVideo);
            if (preview) {
                preview.setAudioDestination(audioOutput);
            }
            else {
                this.logger.info("zsc.psao.0 no preview");
            }
        }

        return false;
    };

    /*
     *    "zsc.sps.1": "ZegoStreamCenter.startPlayingStream"
     */
    ZegoStreamCenter.prototype.startPlayingStream = function (streamid, serverUrls) {
        var totalStreamId = getTotalStreamId(this, streamid);
        this.logger.debug("zsc.sps.1 start play called");
        var play = this.playerList[totalStreamId];
        if (!play) {
            this.logger.info("zsc.sps.1 player don't exist");
            return false;
        }

        var player = play.player;
        this.dataReport.eventEndWithMsg(player.reportSeq, "GetSignalUrl", {
            urls: serverUrls
        });

        if (serverUrls.length == 0) {
            this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.error, streamid, playErrorList.DISPATCH_ERROR);

            this.logger.info("zsc.sps.1 server don't have signal url");
            return false;
        }
        
        var serverUrl = serverUrls[0];
        for (var i = 1; i < serverUrls.length; i ++) {
            play.serverUrls.push(serverUrls[i]);
        }

        return connectPlayServer(this, totalStreamId, serverUrl);
    };

    /*
     *    "zsc.sps.1.1": "ZegoStreamCenter.stopPlayingStream"
     */
    ZegoStreamCenter.prototype.stopPlayingStream = function (streamid) {
        var totalStreamId = getTotalStreamId(this, streamid);
        var player = this.playerList[totalStreamId];
        if (!player) {
            this.logger.info("zsc.sps.1.1 player don't exist");
            return;
        }

        if (player.player) {
            player.player.stopPlay();
            delete player.player;
        }
        
        //update signal
        removeStreamFromSignal(this, false, totalStreamId);
        stopSignalHeartbeat(this);
        
        delete this.playerList[totalStreamId];

        this.logger.debug("zsc.sps.1.1 call success");
    };

    ZegoStreamCenter.prototype.reset = function() {

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

    ZegoStreamCenter.prototype.checkMessageTimeout = function() {
        for (var serverUrl in this.signalList) {
            if (this.signalList[serverUrl].signal) {
                this.signalList[serverUrl].signal.checkMessageTimeout();
            }
        }
    };

    ZegoStreamCenter.prototype.getAllInUseUrl = function() {
        var serverUrls = [];

        for (var serverUrl in this.signalList) {
            serverUrls.push(serverUrl);
        }

        return serverUrls;
    };

    /*
     *    "zsc.od.0": "ZegoStreamCenter.onDisconnectHandle"
     */
    ZegoStreamCenter.prototype.onDisconnectHandle = function(server) {
        this.logger.info("zsc.od.0 call");

        if (this.signalList[server]) {
            var signalInfo = this.signalList[server];

            for (var i = 0; i < signalInfo.publishConnectedList.length; i++) {
                var publish = this.publisherList[signalInfo.publishConnectedList[i]];
                if (publish && publish.publisher) {
                    publish.publisher.onDisconnect();
                }
            }

            for (i = 0; i < signalInfo.playConnectedList.length; i++) {
                var play = this.playerList[signalInfo.playConnectedList[i]];
                if (play && play.player) {
                    play.player.onDisconnect();
                }
            }

            delete this.signalList[server];

            stopSignalHeartbeat();
        }
    };

    /*
     *    "zsc.crss.0": "ZegoStreamCenter.connetWithReuseSignalServer"
     */
    function connetWithReuseSignalServer(_this, streamId, isPublish, serverUrl, success, error) {
        _this.logger.debug("zsc.crss.0 begin " + serverUrl);
        
        var signalInfo = null;
        if (_this.signalList[serverUrl]) {
            signalInfo = _this.signalList[serverUrl];
            //already connected
            if (signalInfo.state == ENUM_SIGNAL_STATE.connected) {
                _this.logger.debug("zsc.crss.0 already connected " + serverUrl + " streamId: " + streamId);
                if (isPublish) {
                    signalInfo.publishConnectedList.push(streamId);
                }
                else {
                    signalInfo.playConnectedList.push(streamId);
                }
                
                success(streamId, signalInfo);
            }
            //isConnecting
            else if (signalInfo.state == ENUM_SIGNAL_STATE.connecting) {
                _this.logger.debug("zsc.crss.0 signal is connecting " + serverUrl + " streamId: " + streamId);
                updateWaitingList(_this, signalInfo, isPublish, streamId, success, error);
            }
        }
        else {
            //no connect
            _this.logger.debug("zsc.crss.0 new signal " + serverUrl + " streamId: " + streamId);
            
            var signal = new ZegoSignal(_this.logger);
            signal.setSessionInfo(_this.appid, _this.userid);
            signal.onUpdateHeartBeartInterval = _this.onUpdateHeartBeartIntervalHandle.bind(_this);
            signal.onDisconnect = _this.onDisconnectHandle.bind(_this);

            _this.signalList[serverUrl] = {
                signal: signal,
                state: ENUM_SIGNAL_STATE.connecting,
                publishWaitingList: [],
                playWaitingList: [],
                publishConnectedList: [],
                playConnectedList: [],
                tokenInfo: null
            };

            updateWaitingList(_this, _this.signalList[serverUrl], isPublish, streamId, success, error);

            signal.connectServer(_this.token, serverUrl, function(result, server, tokenInfo) {
                signalInfo = _this.signalList[serverUrl];

                var i = 0;
                var publishCallback;
                var playCallback;
                if (result != 0) {
                    //connected failed, notify and delete
                    _this.logger.debug("zsc.crss.0 connect failed " + server);

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
                    _this.logger.debug("zsc.crss.0 connected success " + server);
                    
                    signalInfo.state = ENUM_SIGNAL_STATE.connected;
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
                        startSignalHeartbeat(_this);
                }
            });
        }
    }

    function updateWaitingList(_this, signalInfo, isPublish, streamId, success, error) {
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
    }

    /*
     *    "zsc.rsfs.0": "ZegoStreamCenter.removeStreamFromSignal"
     */
    function removeStreamFromSignal(_this, isPublish, streamId) {

        var deleteSignal = [];
        for (var serverUrl in _this.signalList) {
            var signalInfo = _this.signalList[serverUrl];
            if (isPublish) {
                for (var i = 0; i < signalInfo.publishConnectedList.length; i++) {
                    if (signalInfo.publishConnectedList[i] === streamId) {
                        _this.logger.debug("zsc.rsfs.0 found from publish");
                        signalInfo.publishConnectedList.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var j = 0; j < signalInfo.playConnectedList.length; j++) {
                    if (signalInfo.playConnectedList[j] === streamId) {
                        _this.logger.debug("zsc.rsfs.0 found from play");
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
            delete _this.signalList[deleteSignal[k]];
        }
    }
    /*
     *    "zsc.cps.0": "ZegoStreamCenter.connectPublishServer"
     */
    function connectPublishServer(_this, streamId, serverUrl) {
        var publish = _this.publisherList[streamId];
        if (!publish) {
            _this.logger.info("zsc.cps.0 publisher don't exist");
            return false;
        }

        _this.dataReport.eventStart(publish.publisher.reportSeq, "ConnectServer");
        connetWithReuseSignalServer(_this, streamId, true, serverUrl, function(streamid, signalInfo) {
            //check streamid exist
            var checkPublish = _this.publisherList[streamid];
            if (!checkPublish) {
                _this.logger.info("zsc.cps.0 after connect publisher don't exist");
                return;
            }

            var checkPublisher = checkPublish.publisher;
            if (!checkPublisher) {
                _this.logger.info("zsc.cps.1 check publisher don't exist");
                return;
            }

            _this.dataReport.eventEndWithMsg(checkPublisher.reportSeq, "ConnectServer", {
                result: 0,
                server: serverUrl
            });

            var tokenInfo = signalInfo.tokenInfo;
            _this.logger.info("zsc.cps.0 update token success");

            if (tokenInfo && tokenInfo.report) {
                checkPublisher.qualityUpload = tokenInfo.report;
                checkPublisher.qualityUploadInterval = tokenInfo.report_interval;
            }

            checkPublisher.signal = signalInfo.signal;
            
            checkPublish.retryCount = 0;
            publishStream(_this, streamid);

            getTokenSuccess(_this);

        }, function(streamid, result) {
            _this.logger.error("zsc.cps.0 update token failed " + result);

            //check streamid exist
            var checkPublish = _this.publisherList[streamid];
            if (!checkPublish) {
                _this.logger.info("zsc.cps.0 after connect publisher don't exist");
                return;
            }

            if (shouldRetry(_this, checkPublish, result)) {
                _this.logger.info("zsc.cps.1 retry connect");

                var retryServerUrl = checkPublish.serverUrls[0];
                checkPublish.serverUrls.splice(0, 1);

                checkPublish.retryCount += 1;
                connectPublishServer(_this, streamid, retryServerUrl);
            }
            else {
                _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.error, checkPublish.streamId, publishErrorList.TOKEN_ERROR);
            }
        });
        
        return true;
    }

    /*
     *    "zsc.cps.1": "ZegoStreamCenter.connectPlayServer"
     */
    function connectPlayServer(_this, streamId, serverUrl) {
        var play = _this.playerList[streamId];
        if (!play) {
            _this.logger.info("zsc.cps.1 player don't exist");
            return false;
        }

        _this.dataReport.eventStart(play.player.reportSeq, "ConnectServer");
        connetWithReuseSignalServer(_this, streamId, false, serverUrl, function(streamid, signalInfo) {
            //check streamid exist
            var checkPlay = _this.playerList[streamid];
            if (!checkPlay) {
                _this.logger.info("zsc.cps.1 after connect player don't exist");
                return;
            }

            var checkPlayer = checkPlay.player;
            if (!checkPlayer) {
                _this.logger.info("zsc.cps.1 checkplayer don't exist");
                return;
            }

            _this.dataReport.eventEndWithMsg(checkPlayer.reportSeq, "ConnectServer", {
                result: 0,
                server: serverUrl
            });

            var tokenInfo = signalInfo.tokenInfo;
            _this.logger.info("zsc.cps.1 update token success");

            if (tokenInfo && tokenInfo.report) {
                checkPlayer.qualityUpload = tokenInfo.report;
                checkPlayer.qualityUploadInterval = tokenInfo.report_interval;
            }
                
            checkPlayer.signal = signalInfo.signal;
            
            checkPlay.retryCount = 0;
            playStream(_this, streamid);

            getTokenSuccess(_this);
        }, function(streamid, result) {
            var checkPlay = _this.playerList[streamid];
            if (!checkPlay) {
                _this.logger.info("zsc.cps.1 after connect player don't exist");
                return;
            }

            if (shouldRetry(_this, checkPlay, result)) {
                _this.logger.info("zsc.cps.1 retry connect");

                var retryServerUrl = checkPlay.serverUrls[0];
                checkPlay.serverUrls.splice(0, 1);

                checkPlay.retryCount += 1;
                connectPlayServer(_this, streamid, retryServerUrl);
            }
            else {
                _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.error, checkPlay.streamId, playErrorList.TOKEN_ERROR);
            }

        });

        return true;
    }

    /*
     *    "zsc.ps.0": "ZegoStreamCenter.publishStream"
     */
    function publishStream(_this, streamid) {
        var publisher = _this.publisherList[streamid].publisher;
        if (!publisher) {
            _this.logger.info("zsc.ps.0 publisher don't exist");
            return;
        }

        var localStream = null;
        var videoInfo = null;
        var preview = checkPreivew(_this, _this.publisherList[streamid].localVideo);
        if (preview) {
            localStream = preview.localStream;
            videoInfo = preview.videoInfo;
        }

        if (!localStream) {
            _this.logger.info("zsc.ps.0 no localStream");
        }

        _this.logger.debug("zsc.ps.0 call success");
        publisher.startPublish(streamid, localStream, videoInfo);
    }

    /*
     *    "zsc.ps.1": "ZegoStreamCenter.playStream"
     */
    function playStream(_this, streamid) {
        var player = _this.playerList[streamid].player;
        if (!player) {
            _this.logger.info("zsc.ps.1 player don't exist");
            return;
        }

        _this.logger.debug("zsc.ps.1 call success");
        player.startPlay(streamid, _this.playerList[streamid].remoteVideo, _this.playerList[streamid].audioOutput);
    }

    function checkPreivew(_this, localVideo) {
        for (var i = 0; i < _this.previewVideoList.length; i++) {
            if (_this.previewVideoList[i].localVideo === localVideo) {
                return _this.previewVideoList[i];
            }
        }

        return null;
    }

    function removePreview(_this, preview) {
        for (var i = 0; i < _this.previewVideoList.length; i++) {
            if (_this.previewVideoList[i] === preview) {
                _this.previewVideoList.splice(i, 1);
                break;
            }
        }
    }

    /*
     *    "zsc.gts.0": "ZegoStreamCenter.getTokenSuccess"
     */
    function getTokenSuccess(_this) {
        _this.logger.debug("zsc.gts.0 call");
    }

    function shouldRetry(_this, stream, errorCode) {
        if (stream.serverUrls.length == 0) {
            return false;
        }

        if (stream.retryCount >= _this.maxRetryCount) {
            return false;
        }

        if (errorCode != 3) {
            return false;
        }
        
        return true;
    }

    /*
     *    "zsc.ssh.0": "ZegoStreamCenter.startSignalHeartbeat"
     */
    function startSignalHeartbeat(_this) {

        _this.logger.debug("zsc.ssh.0 call");
        
        if (_this.heartbeatTimer) {
            clearTimeout(_this.heartbeatTimer);
            _this.heartbeatTimer = null;
        }

        _this.heartbeatTimer = setTimeout(function() {
            checkSignalHeartbeat(_this);
        }, _this.heartbeatInterval);

    }

    /*
     *    "zsc.ssh.1": "ZegoStreamCenter.stopSignalHeartbeat"
     */
    function stopSignalHeartbeat(_this) {
        _this.logger.debug("zsc.ssh.1 call");

        var count = 0;
        for (var url in _this.signalList) {
            count += 1;
        }

        if (_this.heartbeatTimer && count == 0) {

            _this.logger.info("zsc.ssh.1 stop");

            clearTimeout(_this.heartbeatTimer);

            _this.heartbeatTimer = null;
        }
    }

    /*
     *    "zsc.csh.0": "ZegoStreamCenter.checkSignalHeartbeat"
     */
    function checkSignalHeartbeat(_this) {

        _this.logger.debug("zsc.csh.0 call");

        for (var streamUrl in _this.signalList) {
            if (_this.signalList[streamUrl].signal) {
                _this.signalList[streamUrl].signal.sendHeartbeat();
            }
        }

        if (_this.heartbeatTimer)
            startSignalHeartbeat(_this);
    }

    /*
     *    "zsc.gts.0": "ZegoStreamCenter.getTotalStreamId"
     */
    function getTotalStreamId(_this, streamid) {
        if (_this.testEnvironment) {
            var testStreamId = "zegotest-" + _this.appid + "-" + streamid;
            _this.logger.info("zsc.gts.0 test streamid " + testStreamId);
            return testStreamId;
        }

        return streamid;
    }

    /**
       ZegoLogger
    */

    // import ZegoWebSocket from './jZego-WebSocket-wx.js';

    var ENUM_LOG_LEVEL = { debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100 };
    var ENUM_REMOTE_TYPE = {disable:0, websocket: 1, https: 2};

    function ZegoLogger() {
        this.logSeq = 0;
        this.logLevel = ENUM_LOG_LEVEL.disable;
        this.logRemoteLevel = ENUM_LOG_LEVEL.disable;
        this.websocket = null;
        this.url = "";
        this.appid = 0;
        this.sessionid = "0";
        this.roomid = "";
        this.userid = "";
        this.userName = "";
        this.logCache = [];
        this.logCacheSend = [];
        this.logCacheMax = 100;
        this.logType = ENUM_REMOTE_TYPE.disable;
        this.logUploadTimer = null;
        this.logUploadInterval = 1000 * 10;
        this.version = "";
    }

    ZegoLogger.prototype.setLogLevel = function(logLevel) {
        this.logLevel = logLevel;
        if (this.logLevel < ENUM_LOG_LEVEL.debug ||
            this.logLevel > ENUM_LOG_LEVEL.report) {
            this.logLevel = ENUM_LOG_LEVEL.disable;
        }
    };

    ZegoLogger.prototype.setRemoteLogLevel = function(logLevel) {
        this.logRemoteLevel = logLevel;
        if (this.logRemoteLevel < ENUM_LOG_LEVEL.debug ||
            this.logRemoteLevel > ENUM_LOG_LEVEL.report) {
            this.logRemoteLevel = ENUM_LOG_LEVEL.disable;
        }
    };

    ZegoLogger.prototype.setSessionInfo = function(appid, roomid, sessionid, userid, userName, version) {
        this.appid = appid;
        this.roomid = roomid;
        this.sessionid = sessionid;
        this.userid = userid;
        this.userName = userName;
        this.version = version;
    };


    ZegoLogger.prototype.openLogServer = function(url) {
        if (url.indexOf("wss:") == 0) {
            this.logType = ENUM_REMOTE_TYPE.websocket;
            openWebSocketLogServer(this, url);
        }
        else if (url.indexOf("https:") == 0) {
            this.logType = ENUM_REMOTE_TYPE.https;
            openHttpsLogServer(this, url);
        }
        else {
            this.logType = ENUM_REMOTE_TYPE.disable;
        }
    };


    ZegoLogger.prototype.stopLogServer = function() {
        if (this.logType == ENUM_REMOTE_TYPE.websocket) {
            stopWebSocketServer(this);
        }
        else if (this.logType == ENUM_LOG_LEVEL.https) {
            //send last data
            SendHttpsLog(this);
            stopHttpsServer(this);
        }

        this.logType = ENUM_REMOTE_TYPE.disable;
    };


    ZegoLogger.prototype.RemoteLog = function(level, log, force) {

        if (this.url == "") {
            return;
        }

        if (this.logType == ENUM_REMOTE_TYPE.websocket) {
            RemoteWebSocketLog(this, level, log);
        }
        else if (this.logType == ENUM_REMOTE_TYPE.https) {
            RemoteHttpsLog(this, level, log, force);
        }
    };

    ZegoLogger.prototype.log = function(level, log) {

        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= level) {
            this.logCache.push(log);
            while (this.logCache.length > this.logCacheMax) {
                this.logCache.shift();
            }
        }

        if (this.logRemoteLevel !== ENUM_LOG_LEVEL.disable &&
            this.logRemoteLevel <= level) {
            this.RemoteLog(level, log);
        }
    };

    ZegoLogger.prototype.debug = function() {
        // var log = logParamList(this, "debug").concat([].slice.call(arguments)).concat(logParamListEnd(this));
        var log = logParamList(this, "debug", ''.concat([].slice.call(arguments)));
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.debug) {
            console.debug.apply(console, log);
        }

        this.log(ENUM_LOG_LEVEL.debug, log);
    };

    ZegoLogger.prototype.info = function() {
        // var log = logParamList(this, "info").concat([].slice.call(arguments)).concat(logParamListEnd(this));
        var log = logParamList(this, "info", ''.concat([].slice.call(arguments)));
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.info) {
            console.info.apply(console, log);
        }

        this.log(ENUM_LOG_LEVEL.info, log);
    };

    ZegoLogger.prototype.warn = function() {
        // var log = logParamList(this, "warn").concat([].slice.call(arguments)).concat(logParamListEnd(this));
        var log = logParamList(this, "warn", ''.concat([].slice.call(arguments)));
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.warn) {
            console.warn.apply(console, log);
        }

        this.log(ENUM_LOG_LEVEL.warn, log);
    };

    ZegoLogger.prototype.error = function() {
        // var log = logParamList(this, "error").concat([].slice.call(arguments)).concat(logParamListEnd(this));
        var log = logParamList(this, "error", ''.concat([].slice.call(arguments)));
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.error) {
            console.error.apply(console, log);
        }

        this.log(ENUM_LOG_LEVEL.error, log);
    };

    ZegoLogger.prototype.report = function(reportInfo) {
        // var log = logParamList(this, "report").concat([].slice.call(arguments)).concat(logParamListEnd(this));
        /*
        var log = logParamList(this, "report", ''.concat([].slice.call(arguments)));
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.report) {
            console.info.apply(console, log);
        }

        this.log(ENUM_LOG_LEVEL.report, log);
        */

        var log = logReportParamList(this, "report", reportInfo);
        if (this.logLevel !== ENUM_LOG_LEVEL.disable &&
            this.logLevel <= ENUM_LOG_LEVEL.report) {
            console.debug.apply(console, log);
        }

        // this.log(ENUM_LOG_LEVEL.report, log);
        
        //report 立即上报
        this.RemoteLog(ENUM_LOG_LEVEL.report, log, true);
    };

    var D = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];

    function logReportParamList(_this, level, logInfo) {
        
        var t = new Date();
        var stringTime = (1900 + t.getYear()) + "/";
        stringTime += (D[t.getMonth()+1] || t.getMonth()+1) + "/";
        stringTime += (D[t.getDate()] || t.getDate()) + " ";
        stringTime += (D[t.getHours()] || t.getHours()) + ":";
        stringTime += (D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;

        logInfo["time"] = stringTime;
        logInfo["level"] = level;
        
        {
            logInfo["console"] = "rtc";
        }
        
        logInfo["appid"] = _this.appid;
        logInfo["roomid"] = _this.roomid;
        logInfo["userid"] = _this.userid;
        logInfo["id_name"] = _this.userid;
        logInfo["userName"] = _this.userName;
        logInfo["sessionid"] = _this.sessionid;
        logInfo["version"] = _this.version;
        
        return [JSON.stringify(logInfo)];
    }

    function logParamList(_this, level, logInfo) {

        var t = new Date();
        var stringTime = (1900 + t.getYear()) + "/";
        stringTime += (D[t.getMonth()+1] || t.getMonth()+1) + "/";
        stringTime += (D[t.getDate()] || t.getDate()) + " ";
        stringTime += (D[t.getHours()] || t.getHours()) + ":";
        stringTime += (D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;

        //get first space from logInfo
        var action = logInfo.substr(0, logInfo.indexOf(' '));
        if (action.length == 0) {
            action = logInfo;
        }

        var content = logInfo.substr(logInfo.indexOf(' ') + 1);
        if (content.length == 0) {
            content = "";
        }

        var s = {
            "time": stringTime,
            "level": level,
            "action": action,
            "content": content, 
            "appid": _this.appid,
            "roomid": _this.roomid,
            "userid": _this.userid,
            "userName": _this.userName,
            "sessionid": _this.sessionid
        };

        return [JSON.stringify(s)];
    }

    //helper function
    function openWebSocketLogServer(_this, url) {
        if (_this.url != url) {
            _this.url = url;
            stopWebSocketServer(_this);
            if (!url) return;
            {
                _this.websocket = new WebSocket(url);
            }
            
            _this.websocket.onopen = function(evt) {

            };
            _this.websocket.onclose = function(evt) {

            };
            _this.websocket.onmessage = function(evt) {

            };
            _this.websocket.onerror = function(evt) {
                console.log('ws发生错误！');
            };
        }
    }

    function openHttpsLogServer(_this, url) {
        _this.url = url;
        if (!url) {
            return;
        }

        stopHttpsServer(_this);

        //start timer
        if (!_this.logUploadTimer) {
            _this.logUploadTimer = setInterval(function() {
                SendHttpsLog(_this);
            }, _this.logUploadInterval);
        }
    }

    function stopWebSocketServer(_this) {
        if (_this.websocket) {
            _this.websocket.onclose = null;
            _this.websocket.onerror = null;
            _this.websocket.close();
            _this.websocket = null;
        }
    }

    function stopHttpsServer(_this) {
        //stop timer
        if (_this.logUploadTimer) {
            clearInterval(_this.logUploadTimer);
            _this.logUploadTimer = null;
        }
    }


    function RemoteWebSocketLog(_this, level, log) {
        if (_this.websocket == null || _this.websocket.readyState == 2 || _this.websocket.readyState == 3) {
            var url = _this.url;
            _this.url = "";
            _this.openLogServer(url);
            if (_this.logCacheSend.length < _this.logCacheMax) {
                _this.logCacheSend.push(log);
            }
        }
        else if (_this.websocket.readyState == 0) {
            if (_this.logCacheSend.length < _this.logCacheMax) {
                _this.logCacheSend.push(log);
            }
        }
        else if (_this.websocket.readyState == 1) {
            if (_this.logCacheSend > 0) {
                var logBefore = "";
                for (var i = 0; i < _this.logCacheSend.length; i++) {
                    logBefore = logBefore + _this.logCacheSend[i] + "\n";
                }
                log = logBefore + log;
                _this.logCacheSend = [];
            }
            _this.websocket.send(log);
        }
        else {
            //console.log("wrong socket state:"+this.websocket.ready_state)
            if (_this.logCacheSend.length < _this.logCacheMax) {
                _this.logCacheSend.push(log);
            }
        }
    }

    function RemoteHttpsLog(_this, level, log, force) {
        _this.logCacheSend.push(log);
        if (_this.logCacheSend.length >= _this.logCacheMax || force === true) {
            SendHttpsLog(_this);
        }
    }

    function SendHttpsLog(_this) {
        if (_this.logCacheSend.length == 0) {
            return;
        }

        var uploadData = "";
        for (var i = 0; i < _this.logCacheSend.length; i++) {
            uploadData = uploadData + _this.logCacheSend[i] + "\n";
        }
        
        {
            
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
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
                                openHttpsLogServer(_this, _this.url);
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

            xmlhttp.open("POST", _this.url, true);
            xmlhttp.send(uploadData);
        }

        _this.logCacheSend = [];
    }

    //拉流选择
    var ENUM_PLAY_SOURCE_TYPE = {
        auto: 0,
        ultra: 1
    };

    //推流选择
    var ENUM_DISPATCH_TYPE = {
        cdn: 0,
        ultra: 1
    };

    //运行状态
    var ENUM_RUN_STATE = {
        logout: 0,
        trylogin: 1,
        login: 2
    };

    var ENUM_PUBLISH_STREAM_STATE = {
        waiting_url: 1,
        tryPublish: 2,
        update_info: 3,
        publishing: 4,
        stop: 5
    };

    var ENUM_STREAM_SUB_CMD = {
        liveNone: 0,
        liveBegin: 2001,
        liveEnd: 2002,
        liveUpdate: 2003
    };

    // var ENUM_ROLE_TYPE = {none:0, anchor:1, Audience:2 };                            //用户角色，1主播，2观众
    var ENUM_STREAM_UPDATE_TYPE = {
        added: 0,
        deleted: 1
    };

    var ENUM_STREAM_UPDATE_CMD = {
        added: 12001,
        deleted: 12002,
        updated: 12003
    };

    var MAX_TRY_LOGIN_COUNT = 5; //最大重试登录次数
    var TRY_LOGIN_INTERVAL = [2000, 2000, 3000, 3000, 4000]; //重试登录的频率
    var MAX_TRY_HEARTBEAT_COUNT$1 = 3; //最大心跳尝试次数
    var MINIUM_HEARTBEAT_INTERVAL = 3000; //最小心跳尝试间隔
    var PROTO_VERSION = "1.0.4"; //协议版本号
    var MIXSTREAM_ERROR_CODE = 10000;

    var ENUM_SIGNAL_SUB_CMD = {
        none: 0,
        joinLiveRequest: 1001,
        joinLiveResult: 1002,
        joinLiveInvite: 1003,
        joinLiveStop: 1004
    };

    var ENUM_PUSH_SIGNAL_SUB_CMD = {
        none: 0,
        pushJoinLiveRequest: 11001,
        pushJoinLiveResult: 11002,
        pushJoinLiveInvite: 11003,
        pushJoinLiveStop: 11004
    };

    var SCREENSHOTREADY = false;


    /**
     sdk接口
     */
    function ZegoClient() {
        //init once
        this.appid = 0;
        this.server = '';
        this.idName = '';
        this.nickName = '';
        this.configOK = false;
        this.logger = new ZegoLogger();

        //room config, can change anytime
        this.userStateUpdate = false;
        this.userSeq = 0;
        this.userQuerying = false;
        this.userTempList = [];

        this.roomCreateFlag = 1;

        //user call init
        this.roomid = '';
        this.token = '';
        this.role = 0;
        this.callbackList = {};

        //state 
        this.runState = ENUM_RUN_STATE.logout;
        this.lastRunState = ENUM_RUN_STATE.logout;

        //change when running
        this.userid = '';
        this.sessionid = '';
        this.cmdSeq = 0;
        this.websocket = null;
        this.globalHeader = null;

        //trylogin
        this.tryLoginCount = 0;
        this.tryLoginTimer = null;

        //tryheartbeat
        this.tryHeartbeatCount = 0;
        this.tryHeartbeatTimer = null;
        this.heartbeatInterval = 30000;

        //stream
        this.ultraPlaySourceType = "rtmp_v2";
        this.streamList = [];
        this.streamQuerying = false;

        // sourceType
        this.preferPlaySourceType = ENUM_PLAY_SOURCE_TYPE.auto;
        this.preferPublishSourceType = ENUM_DISPATCH_TYPE.ultra;
        this.currentPlaySourceType = ENUM_DISPATCH_TYPE.cdn;

        //playerCenter
        {
            this.streamCenter = new ZegoStreamCenter(this.logger);
            this.streamCenter.onPlayStateUpdate = this.onPlayStateUpdateHandle.bind(this);
            this.streamCenter.onPlayQualityUpdate = this.onPlayQualityUpdateHandle.bind(this);

            this.streamCenter.onPublishStateUpdate = this.onPublishStateUpdateHandle.bind(this);
            this.streamCenter.onPublishQualityUpdate = this.onPublishQualityUpdateHandle.bind(this);

            if (this.streamCenter.onPlayerStreamUrlUpdate) {
                this.streamCenter.onPlayerStreamUrlUpdate = this.onStreamUrlUpdateHandle.bind(this);
            }

            if (this.streamCenter.onVideoSizeChanged) {
                this.streamCenter.onVideoSizeChanged = this.onVideoSizeChangedHandle.bind(this);
            }
        }

        //custommsg check timeout
        this.sendDataMap = {}; //custom消息发送map
        this.sendDataList = new LinkedList(); //custom消息发送数组，方便顺序遍历
        this.sendDataCheckTimer = null; //custom超时检查timer
        this.sendDataCheckInterval = 2000; //检查发送消息间隔
        this.sendDataTimeout = 5 * 1000; //发送消息超时
        this.sendDataDropTimeout = 10 * 1000; //丢弃过期消息的超时时间
        this.sendDataCheckOnceCount = 100; //每次处理最大的超时包

        this.sendRoomMsgTime = 0; //上一次发送房间消息时间
        this.SendRoomMsgInterval = 500; //发送房间消息最多500毫秒发送一次

        //joinLiveCallbackMap
        this.joinLiveCallbackMap = {}; //requestId : callback
        //joinLiveRequestMap
        this.joinLiveRequestMap = {}; //requestId : user_id

        //publish
        this.publishStreamList = {};

        //command check timout
        this.sendCommandMap = {};
        this.sendCommandList = new LinkedList();

        //streamurl result check
        this.streamUrlMap = {};

        //小程序答题
        this.serverTimeOffset = 0;
        this.bigimTimeWindow = 0;
        this.datiTimeWindow = 0;

        //trans
        this.transSeqMap = {}; //type: seq
        //bigim
        this.bigImLastTimeIndex = 0;
        this.bigImMessageList = [];
        this.bigImTimer = null;
        this.bigImCallbackMap = {};

        //relay
        this.realyMessageList = [];
        this.relayTimer = null;

        //command callback
        this.cmdCallback = {};

        //测试环境
        this.testEnvironment = false;

        //mixStream
        this.mixStreamList = {};

        this.screenShotStream = null;

        var _this = this;

        {
            // listen for messages from the content-script
            window.addEventListener('message', function (event) {
                var type = event.data.type, streamId = event.data.streamId,
                    canRequestAudioTrack = event.data.canRequestAudioTrack;
                if (type === 'SS_DIALOG_SUCCESS') { //user chose a stream
                    _this.screenStreamFrom(streamId, canRequestAudioTrack, actionSuccessCallback(_this, 'screenShare'));
                }

            });
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //callback

    {
    // 抛出流播放状态， 开始播放，停止播放
    // type: { start:0, stop:1};
        ZegoClient.prototype.onPlayStateUpdateHandle = function (type, streamid, error) {
            if (type == 1) {
                this.stopPlayingStream(streamid);
            }

            this.onPlayStateUpdate(type, streamid, error);
        };

        ZegoClient.prototype.onPlayQualityUpdateHandle = function (streamid, streamQuality) {
            this.onPlayQualityUpdate(streamid, streamQuality);
        };

        //type: { start: 0, stop: 1}
        ZegoClient.prototype.onPublishStateUpdateHandle = function (type, streamid, error) {
            if (type == 0) {
                //start publish
                if (this.publishStreamList[streamid]) {
                    if (this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.tryPublish) {
                        this.publishStreamList[streamid].state = ENUM_PUBLISH_STREAM_STATE.update_info;

                        var _this = this;
                        updateStreamInfo(this, streamid, ENUM_STREAM_SUB_CMD.liveBegin, this.publishStreamList[streamid].extra_info, function (err) {
                            if (_this.publishStreamList[streamid] && _this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.update_info) {
                                _this.publishStreamList[streamid].state = ENUM_PUBLISH_STREAM_STATE.stop;
                                _this.onPublishStateUpdate(1, streamid, err);
                                _this.streamCenter.stopPlayingStream(streamid);
                            }
                        });
                    }
                    else {
                        {
                            if (this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.publishing) {
                                this.onPublishStateUpdate(type, streamid, error);
                            }
                        }
                    }
                    //当前状态为publishing时，如果小程序继续回调相同的开始推流状态码，不应该再返回推流成功的回调
                    // else if (this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.publishing) {
                    //     this.onPublishStateUpdate(type, streamid, error);
                    // }
                }
            } else {
                this.onPublishStateUpdate(type, streamid, error);

                if (type == 1) {
                    this.stopPublishingStream(streamid);
                }
            }

        };

        ZegoClient.prototype.onPublishQualityUpdateHandle = function (streamid, streamQuality) {
            this.onPublishQualityUpdate(streamid, streamQuality);
        };

        ZegoClient.prototype.onVideoSizeChangedHandle = function (streamid, videoWidth, videoHeight) {
            this.onVideoSizeChanged(streamid, videoWidth, videoHeight);
        };

        //type: {play: 0, publish: 1};
        ZegoClient.prototype.onStreamUrlUpdateHandle = function (streamid, url, type) {
            this.onStreamUrlUpdate(streamid, url, type);
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //webrtc 推拉流
    {

        ZegoClient.prototype.enumDevices = function (deviceInfoCallback, errorCallback) {
            this.streamCenter.enumDevices(deviceInfoCallback, errorCallback);
        };

        /*
        *    "zc.p.sps.0": "ZegoClient.startPlayingStream",
        */
        // 播放流
        ZegoClient.prototype.startPlayingStream = function (streamid, remoteVideo, audioOutput) {
            this.logger.debug("zc.p.sps.0 call");

            if (!streamid || streamid === "") {
                this.logger.info("zc.p.sps.0 param error");
                return false;
            }

            if (!remoteVideo) {
                this.logger.info("zc.p.sps.0 don't have remoteVideo");
                return false;
            }

            if (this.customUrl && this.customUrl.length != 0) {
                if (!this.streamCenter.setPlayStateStart(streamid, remoteVideo, audioOutput)) {
                    this.logger.info("zc.p.sps.0 cannot start play");
                    return false;
                }

                return this.streamCenter.startPlayingStream(streamid, [this.customUrl]);
            }


            if (this.runState != ENUM_RUN_STATE.login) {
                this.logger.info("zc.p.sps.0 not login");
                return false;
            }

            var found = false;
            for (var i = 0; i < this.streamList.length; i++) {
                if (this.streamList[i].stream_id === streamid) {
                    // 根据传入的流id判断当前的流列表中是否存在该流
                    found = true;
                    break;
                }
            }

            if (found == false) {
                this.logger.warn("zc.p.sps.0 cannot find stream!");
                // return false;
            }

            if (!this.streamCenter.setPlayStateStart(streamid, remoteVideo, audioOutput)) {
                this.logger.info("zc.p.sps.0 cannot start play");
                return false;
            }

            //send request
            var body = {
                stream_id: streamid,
                ptype: "pull",
                signals: this.streamCenter.getAllInUseUrl()
            };

            var _this = this;
            sendMessage$1(this, "webrtc_url", body, undefined, function (err, seq) {
                if (err == sdkErrorList.SEND_MSG_TIMEOUT) {
                    _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.error, streamid, playErrorList.DISPATCH_TIMEOUT);
                }
                else {
                    _this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.error, streamid, playErrorList.DISPATCH_ERROR);
                }

                _this.streamCenter.stopPlayingStream(streamid);
            });

            return true;
        };

        /*
        *    "zc.p.sps.0.1": "ZegoClient.stopPlayingStream",
        */
        // 停止流
        ZegoClient.prototype.stopPlayingStream = function (streamid) {
            this.logger.debug("zc.p.sps.1.0 call");
            if (!streamid || streamid === "") {
                this.logger.info("zc.p.sps.1.0 param error");
                return false;
            }

            this.logger.debug("zc.p.sps.1.0 call success");

            return this.streamCenter.stopPlayingStream(streamid);
        };

        /*
        *    "zc.p.psao.1": "ZegoClient.setPlayAudioOutput",
        */
        ZegoClient.prototype.setPlayAudioOutput = function (streamid, audioOutput) {
            this.logger.debug("zc.p.psao.1 call");

            return this.streamCenter.setPlayStreamAudioOutput(streamid, audioOutput);
        };

        /*
        *    "zc.p.psao.0": "ZegoClient.setLocalAudioOutput",
        */
        ZegoClient.prototype.setLocalAudioOutput = function (localVideo, audioOutput) {
            this.logger.debug("zc.p.psao.1 call");

            return this.streamCenter.setPublishStreamAudioOutput(localVideo, audioOutput);
        };

        /*
        *    "zc.p.sp.0": "ZegoClient.startPreview",
        */
        //开始预览
        ZegoClient.prototype.startPreview = function (localVideo, mediaStreamConstraints, success, error) {
            this.logger.debug("zc.p.sp.0 call");

            if (!localVideo) {
                this.logger.info("zc.p.sp.0 no localVideo");
                return false;
            }

            return this.streamCenter.startPreview(localVideo, mediaStreamConstraints, success, error);
        };

        /*
        *    "zc.p.sp.1": "ZegoClient.stopPreview",
        */
        //结束预览
        ZegoClient.prototype.stopPreview = function (localVideo) {
            this.logger.debug("zc.p.sp.1 call");
            if (!localVideo) {
                this.logger.info("zc.p.sp.1 param error");
                return false;
            }

            return this.streamCenter.stopPreview(localVideo);
        };

        /*
        *    "zc.p.em.0": "ZegoClient.enableMicrophone",
        */
        //是否麦克风
        ZegoClient.prototype.enableMicrophone = function (streamid, enable) {
            this.logger.debug("zc.p.em.0 call");

            if (typeof enable !== "boolean") {
                this.logger.info("zc.p.em.0 argument is not bool");
                return false;
            }

            return this.streamCenter.enableMicrophone(streamid, enable);
        };

        /*
        *    "zc.p.ec.0": "ZegoClient.enableCamera",
        */
        //是否启用摄像头
        ZegoClient.prototype.enableCamera = function (streamid, enable) {
            this.logger.debug("zc.p.ec.0 call");

            if (typeof enable !== "boolean") {
                this.logger.info("zc.p.ec.0 argument is not bool");
                return false;
            }

            return this.streamCenter.enableCamera(streamid, enable);
        };

        /*
        *    "zc.p.sps.1": "ZegoClient.startPublishingStream",
        */
        //开始推流
        ZegoClient.prototype.startPublishingStream = function (streamid, localVideo, extraInfo) {
            this.logger.debug("zc.p.sps.1 call");
            if (!streamid || streamid === "") {
                this.logger.info("zc.p.sps.1 param error");
                return false;
            }

            if (this.customUrl && this.customUrl.length != 0) {
                this.publishStreamList[streamid] = {
                    state: ENUM_PUBLISH_STREAM_STATE.tryPublish,
                    extra_info: extraInfo
                };

                if (!this.streamCenter.setPublishStateStart(streamid, localVideo)) {
                    this.logger.info("zc.p.sps.1 cannot start publish");
                    return false;
                }

                return this.streamCenter.startPublishingStream(streamid, [this.customUrl]);
            }

            if (this.runState != ENUM_RUN_STATE.login) {
                this.logger.info("zc.p.sps.1 not login");
                return false;
            }

            this.publishStreamList[streamid] = {
                state: ENUM_PUBLISH_STREAM_STATE.tryPublish,
                extra_info: extraInfo
            };

            if (!this.streamCenter.setPublishStateStart(streamid, localVideo)) {
                this.logger.info("zc.p.sps.1 cannot start publish");
                return false;
            }

            this.logger.info("zc.p.sps.1 start publish");

            var body = {
                stream_id: streamid,
                ptype: "push",
                signals: this.streamCenter.getAllInUseUrl()
            };

            var _this = this;
            sendMessage$1(this, "webrtc_url", body, undefined, function (err, seq) {
                if (err == sdkErrorList.SEND_MSG_TIMEOUT) {
                    _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.error, streamid, publishErrorList.DISPATCH_TIMEOUT);
                }
                else {
                    _this.onPublishStateUpdate(ENUM_PUBLISH_STATE_UPDATE.error, streamid, publishErrorList.DISPATCH_ERROR);
                }

                _this.streamCenter.stopPublishingStream(streamid);
            });

            return true;
        };

        /*
        *    "zc.p.sps.1.1": "ZegoClient.stopPublishingStream",
        */
        //结束推流
        ZegoClient.prototype.stopPublishingStream = function (streamid) {
            this.logger.debug("zc.p.sps.1.1 call");
            if (!streamid || streamid === "") {
                this.logger.info("zc.p.sps.1.1 param error");
                return false;
            }

            this.streamCenter.stopPublishingStream(streamid);

            if (this.publishStreamList[streamid]) {
                if (this.publishStreamList[streamid].state >= ENUM_PUBLISH_STREAM_STATE.update_info) {
                    updateStreamInfo(this, streamid, ENUM_STREAM_SUB_CMD.liveEnd);
                }
                delete this.publishStreamList[streamid];
            }

            return true;
        };

        /*
        *    "zc.p.scs.0": "ZegoClient.setCustomSignal",
        */
        //设置自定义信令地址
        ZegoClient.prototype.setCustomSignalUrl = function (signalUrl) {
            this.logger.debug("zc.p.scs.0 call: " + signalUrl);

            if (!signalUrl || signalUrl.length == 0) {
                this.logger.info("zc.p.scs.0 param error");
                return false;
            }

            if (signalUrl.indexOf("wss://") != 0) {
                this.logger.info("zc.p.scs.0 url is not correct");
                return false;
            }

            this.customUrl = signalUrl;
        };

        //设置质量回调时间间隔
        ZegoClient.prototype.setQualityMonitorCycle = function (timeInMs) {
            if (typeof timeInMs === "number" && timeInMs >= 1000) {
                this.streamCenter.setQualityMonitorCycle(timeInMs);
            }
        };

        //chrome 录屏
        ZegoClient.prototype.startScreenShotChrome = function (callBack) {

            if (!SCREENSHOTREADY) {
                this.logger.error(`zc.b.ss Please install the extension:1. Go to chrome://extensions  2. Check: "Enable Developer mode   3. Click: "Load the unpacked extension... 4. Choose "extension" folder from the repository 5. Reload this page
                                      `);
                return false;
            } else {
                window.postMessage({type: 'SS_UI_REQUEST', text: 'start'}, '*');

                // listen for messages from the content-script
                registerCallback(this, 'screenShare', {success: callBack});
            }
        };

        //火狐 录屏
        ZegoClient.prototype.startScreenShotFirFox = function (mediaSource, audio,callBack) {
            var config = {
                video: {},
                audio:audio
            };
            config.video['mediaSource'] = mediaSource;
            var _this = this;

            navigator.mediaDevices.getUserMedia(config).then(function (stream) {
                _this.screenShotStream = stream;
                callBack(true, stream);
            }).catch(function (err) {
                _this.logger.error('zc.b.ssf ' + err);
                callBack(false, null);
            });

        };

        ZegoClient.prototype.stopScreenShot = function () {
            this.screenShotStream.getTracks().forEach(function (track) {
                track.stop();
            });
            window.postMessage({type: 'SS_UI_CANCEL', text: 'start'}, '*');
        };

        ZegoClient.prototype.screenStreamFrom = function (streamId, canRequestAudioTrack, callBack) {

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
            var _this = this;
            !canRequestAudioTrack && (config['audio'] = false);
            navigator.mediaDevices.getUserMedia(config).then(function (stream) {
                _this.screenShotStream = stream;
                callBack(true, stream);
            }).catch(function (err) {
                _this.logger.error('zc.b.ssf ' + err);
                callBack(false, null);
            });
        };


        //screenShot for chrome
        // listen for messages from the content-script
        window.addEventListener('message', function (event) {
            var origin = event.origin, type = event.data.type,
                canRequestAudioTrack = event.data.canRequestAudioTrack;
            // NOTE: you should discard foreign events
            if (origin !== window.location.origin) {
                console.warn(
                    'ScreenStream: you should discard foreign event from origin:',
                    origin
                );
                // return;
            }

            // content-script will send a 'SS_PING' msg if extension is installed
            if (type === 'SS_PING') {
                SCREENSHOTREADY = true;
            }

        });

    }

    ///////////////////////////////////////////////////////////////////////////////////
    //webrtc 内部函数，由于ES6作用域的问题，目前的解决方案只能放在作用域外，rollup打包时会删除

    /*
     *    "zc.p.hfwur.0": "ZegoClient.handleFetchWebRtcUrlRsp",
     */
    function handleFetchWebRtcUrlRsp(_this, msg) {
        var streamId = msg.body.stream_id;

        if (msg.body.ptype === "push") {
            if (_this.publishStreamList[streamId]) {
                _this.streamCenter.startPublishingStream(streamId, msg.body.urls);
            }
            else {
                _this.logger.debug("zc.p.hfwur.0 no streamid to publish");
            }
        }
        else if (msg.body.ptype == "pull") {
            //don't check streamid exist,because sometimes they use external publish without room
            var found = false;
            for (var i = 0; i < _this.streamList.length; i++) {
                if (_this.streamList[i].stream_id === streamId) {
                    // 根据传入的流id判断当前的流列表中是否存在该流
                    found = true;
                    break;
                }
            }

            if (found == false) {
                _this.logger.warn("zc.p.hfwur.0 cannot find stream, continue to play");
                // return;
            }
            _this.streamCenter.startPlayingStream(streamId, msg.body.urls);
        }
    }

    /*
     *    "zc.p.c.0": "ZegoClient.config",
     */
    // 配置初始化参数
    ZegoClient.prototype.config = function (option) {
        this.logger.debug("zc.p.c.0 call");
        if (!checkConfigParam(this, option)) {
            this.logger.error("zc.p.c.0 param error");
            return false;
        }

        this.appid = option.appid;
        this.server = option.server;
        this.idName = option.idName;
        this.nickName = option.nickName;
        this.logger.setLogLevel(option.logLevel);
        if (option.audienceCreateRoom === false) {
            this.roomCreateFlag = 0;
        }

        if (option.remoteLogLevel != undefined) {
            this.logger.setRemoteLogLevel(option.remoteLogLevel);
        } else {
            this.logger.setRemoteLogLevel(0);
        }
        this.logger.setSessionInfo(option.appid, "", "", option.idName, "", PROTO_VERSION);

        if (option.logUrl != undefined && option.logUrl.length != 0) {
            this.logger.openLogServer(option.logUrl);
        }

        if (this.server.indexOf("test2-wsliveroom-api.zego.im") != -1) {
            this.testEnvironment = true;
        }

        this.configOK = true;
        this.logger.debug("zc.p.c.0 call success");
        return true;
    };

    /*
     *    "zc.p.l.0": "ZegoClient.login",
     */
    // 登入
    ZegoClient.prototype.login = function (roomid, role, token, success, error) {
        this.logger.setSessionInfo(this.appid, roomid, "", this.idName, "", PROTO_VERSION);
        this.logger.info("zc.p.l.0 call:", roomid, token);


        if (!this.configOK ||
            !checkLoginParam({
                roomid: roomid,
                token: token
            })) {
            this.logger.info("zc.p.l.0 param error");
            return false;
        }

        if (this.runState !== ENUM_RUN_STATE.logout) {
            this.logger.debug("zc.p.l.0 reset");
            setRunState(this, ENUM_RUN_STATE.logout);
            resetRoom(this);
        }

        this.logger.debug("zc.p.l.0 begin");
        setRunState(this, ENUM_RUN_STATE.trylogin);

        this.roomid = roomid;
        this.token = token;
        this.role = role;
        registerCallback(this, 'login', {
            success: success,
            error: error
        });
        resetTryLogin(this);
        tryLogin(this);
        this.logger.info("zc.p.l.0 call success");
        return true;
    };

    /*
     *    "zc.p.l.1.0": "ZegoClient.logout",
     */
    // 登出
    ZegoClient.prototype.logout = function () {
        this.logger.debug("zc.p.l.1.0 call");

        if (this.runState === ENUM_RUN_STATE.logout) {
            this.logger.info("zc.p.l.1.0 at logout");
            return false;
        }

        setRunState(this, ENUM_RUN_STATE.logout);
        resetRoom(this);
        this.logger.debug("zc.p.l.1.0 call success");
        return true;
    };

    /* 
        "zc.p.eusu.0": "ZegoClient.enableUserStateUpdate",
    */
    // 设置是否push用户进出房间，登录前设置有效

    ZegoClient.prototype.setUserStateUpdate = function (update) {
        this.logger.debug("zc.p.eusu.0 call");

        if (typeof update !== "boolean") {
            this.logger.info("zp.p.eusu.0 param error");
            return false;
        }

        this.userStateUpdate = update;
        this.logger.debug("zc.p.eusu.0 call success " + update);
        return true;
    };

    /*
     *    "zc.p.scc.0": "ZegoClient.sendCustomCommand",
     */
    // 发送自定义消息
    ZegoClient.prototype.sendCustomCommand = function (dstMembers, customContent, success, error) {
        this.logger.debug("zc.p.scc.0 call");

        if (this.runState !== ENUM_RUN_STATE.login) {
            this.logger.info("zc.p.scc.0 state error");
            return false;
        }

        if (!dstMembers || !(dstMembers instanceof Array) || dstMembers.length == 0) {
            this.logger.info("zc.p.scc.0 dstMembers error");
            return false;
        }

        var customContent_send = {
            from_userid: this.idName,
            from_username: this.nickName,
            custom_content: customContent || ''
        };

        var bodyData = {
            "dest_id_name": dstMembers,
            "custom_msg": JSON.stringify(customContent_send)
        };
        if (!checkCustomCommandParam(bodyData)) {
            this.logger.info("zc.p.scc.0 param error");
            return false;
        }

        // 发送消息
        sendCustomMessage(this, 'custommsg', bodyData, success, error);
        this.logger.debug("zc.p.scc.0 call success");
        return true;
    };


    // 发送房间消息
    /*
     *    "srm.0": "ZegoClient.sendRoomMsg",
     */
    ZegoClient.prototype.sendRoomMsg = function (msg_category, msg_type, msg_content, success, error) {
        this.logger.debug("srm.0 call");
        // 不是处于登录状态
        if (this.runState !== ENUM_RUN_STATE.login) {
            this.logger.info("srm.0 state error");
            return;
        }

        var timestamp = Date.parse(new Date());
        if (this.sendRoomMsgTime > 0 && this.sendRoomMsgTime + this.SendRoomMsgInterval > timestamp) {
            this.logger.info("srm.0 freq error");
            if (error) {
                error(sdkErrorList.FREQ_LIMITED, 0, msg_category, msg_type, msg_content);
            }
            return;
        }


        this.sendRoomMsgTime = timestamp;
        this.logger.debug("srm.0 send fetch request");
        var bodyData = {
            "msg_category": msg_category,
            "msg_type": msg_type,
            "msg_content": msg_content,
        };

        // 发送消息
        sendCustomMessage(this, 'im_chat', bodyData, success, error);
        this.logger.debug("srm.0 call success");
    };

    /*
     *    "zc.p.usei.0": "ZegoClient.updateStreamExtraInfo",
     */
    //更新流信息
    ZegoClient.prototype.updateStreamExtraInfo = function (streamid, extraInfo) {
        this.logger.debug("zc.p.usei.0 call");
        if (!streamid || streamid === "") {
            this.logger.info("zc.p.usei.0 param error");
            return false;
        }

        if (typeof extraInfo != "string") {
            return false;
        }

        if (this.publishStreamList[streamid]) {
            this.publishStreamList[streamid].extra_info = extraInfo;
            if (this.publishStreamList[streamid].state >= ENUM_PUBLISH_STREAM_STATE.update_info) {
                updateStreamInfo(this, streamid, ENUM_STREAM_SUB_CMD.liveUpdate, extraInfo);
            }
        }

        return true;
    };

    /*
     *    "zc.p.r.0": "ZegoClient.release",
     */
    // 释放房间和播放器
    ZegoClient.prototype.release = function () {
        this.logger.debug("zc.p.r.0 call");
        setRunState(this, ENUM_RUN_STATE.logout);
        resetRoom(this);

        this.logger.stopLogServer();
        this.logger.debug("zc.p.r.0 call success");
    };

    /*
     *    "zc.p.rjl.0": "ZegoClient.requestJoinLive",
     */
    // 请求连麦信令
    ZegoClient.prototype.requestJoinLive = function (dest_id_name, success, error, result_callback) {
        this.logger.debug("zc.p.rjl.0 call");
        var requestId = getRequestId(this);
        var signalCmd = getSignalCmdContent(this, requestId, dest_id_name);
        if (result_callback == undefined) {
            return false;
        }

        this.joinLiveCallbackMap[requestId] = result_callback;
        sendSignalCmd(this, ENUM_SIGNAL_SUB_CMD.joinLiveRequest, signalCmd, dest_id_name, success, error);
        return true;
    };

    /*
     *    "zc.p.ijl.0": "ZegoClient.inviteJoinLive",
     */
    // 邀请连麦信令
    ZegoClient.prototype.inviteJoinLive = function (dest_id_name, success, error, result_callback) {
        this.logger.debug("zc.p.ijl.0 call");
        var requestId = getRequestId(this);
        var signalCmd = getSignalCmdContent(this, requestId, dest_id_name);
        if (result_callback == undefined) {
            return false;
        }

        this.joinLiveCallbackMap[requestId] = result_callback;
        sendSignalCmd(this, ENUM_SIGNAL_SUB_CMD.joinLiveInvite, signalCmd, dest_id_name, success, error);

        return true;
    };

    /*
     *    "zc.p.rjl.1": "ZegoClient.respondJoinLive",
     */
    // 响应连麦请求
    ZegoClient.prototype.respondJoinLive = function (requestId, respondResult, success, error) {
        this.logger.debug("zc.p.rjl.1 call");
        var dest_id_name = this.joinLiveRequestMap[requestId];
        if (!dest_id_name) {
            this.logger.info("zc.p.rjl.1 no dest id name");
            return false;
        }

        var result = 0;
        if (respondResult === true)
            result = 1;

        var signalCmd = getSignalCmdContent(this, requestId, dest_id_name, result);
        sendSignalCmd(this, ENUM_SIGNAL_SUB_CMD.joinLiveResult, signalCmd, dest_id_name, success, error);

        delete this.joinLiveRequestMap[requestId];

        return true;
    };

    /*
     *    "zc.p.sjl.0": "ZegoClient.stopJoinLive",
     */
    // 结束连麦信令
    ZegoClient.prototype.endJoinLive = function (dest_id_name, success, error) {
        this.logger.debug("zc.p.sjl.0 call");
        var requestId = getRequestId(this);
        var signalCmd = getSignalCmdContent(this, requestId, dest_id_name);
        sendSignalCmd(this, ENUM_SIGNAL_SUB_CMD.joinLiveStop, signalCmd, dest_id_name, success, error);

        return true;
    };

    /*
     *    "zc.p.srm.0": "ZegoClient.sendReliableMessage",
     */
    //发送可靠广播业务
    ZegoClient.prototype.sendReliableMessage = function (type, data, success, error) {
        this.logger.debug("zc.p.srm.0 call");

        if (this.transSeqMap[type]) {
            delete this.transSeqMap[type];
        }

        this.transSeqMap[type] = {
            seq: 0
        };

        var body = {
            "trans_type": type,
            "trans_data": data
        };

        sendMessage$1(this, "trans", body, success, error);
    };

    /*
     *    "zc.p.srm.1": "ZegoClient.sendRelayMessage",
     */
    //发送转发消息
    ZegoClient.prototype.sendRelayMessage = function (type, data, success, error) {
        this.logger.debug("zc.p.srm.1 call");

        var timeWindow = this.datiTimeWindow;
        var offset = this.serverTimeOffset;
        if (timeWindow > 0) {
            this.realyMessageList.push({
                type: type,
                data: data,
                success: success,
                error: error
            });
            if (this.realyMessageList.length == 1) {
                setRelayTimer(this, offset, timeWindow);
            }
        }
        else {
            sendRelayMessageInternal(this, type, data, success, error);
        }
    };

    /*
     *    "zc.p.sbim.1": "ZegoClient.sendBigRoomMessage",
     */
    //发送大房间消息
    ZegoClient.prototype.sendBigRoomMessage = function (type, category, content, success, error) {
        this.logger.debug("zc.p.sbim.1 call");

        var timeWindow = this.bigimTimeWindow;
        var offset = this.serverTimeOffset;
        var serverTime = (new Date()).getTime() + offset;

        var clientId = ++this.cmdSeq;
        clientId = clientId.toString();

        if (success == undefined) {
            success = null;
        }
        if (error == undefined) {
            error = null;
        }

        this.bigImCallbackMap[clientId] = {
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

            this.logger.debug("zc.p.sbim.1 no time window");

            sendBigRoomMessageInternal(this, [bodyData], handleBigImMsgRsp, error);
        }
        else {
            var currentIndex = Math.floor(serverTime / timeWindow);
            this.logger.debug("currentIndex " + currentIndex + " lastTimeIndex " + this.bigImLastTimeIndex);

            if (this.bigImLastTimeIndex < currentIndex && this.bigImMessageList.length == 0) {
                this.bigImLastTimeIndex = currentIndex;

                var oneData = {
                    "msg_category": category,
                    "msg_type": type,
                    "msg_content": content,
                    "bigmsg_client_id": clientId
                };

                sendBigRoomMessageInternal(this, [oneData], handleBigImMsgRsp, error);
            }
            else {
                this.bigImMessageList.push({
                    msg_category: category,
                    msg_type: type,
                    msg_content: content,
                    bigmsg_client_id: clientId
                });

                if (this.bigImMessageList.length == 1) {
                    setBigImTimer(this, offset, window);
                }
            }
        }
    };

    /*
     *    "zc.p.ums.0": "ZegoClient.updateMixStream",
     */
    //更新混流信令
    ZegoClient.prototype.updateMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        this.logger.debug("zc.p.ums.0 call");

        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zc.p.ums.0 no mix stream info");
            return false;
        }

        if (mixStreamConfig.streamList.length == 0) {
            this.logger.error("zc.p.ums.0 no input stream");
            return false;
        }

        var req_body = {
            "id_name": this.idName,
            "live_channel": this.roomid,
            "appid": this.appid,
            "version": PROTO_VERSION
        };

        if (typeof mixStreamConfig.userData == "string" && mixStreamConfig.userData.length <= 10000) {
            req_body["UserData"] = mixStreamConfig.userData;
        }

        var mixInput = [];
        for (var i = 0; i < mixStreamConfig.streamList.length; i++) {
            var streamInfo = mixStreamConfig.streamList[i];
            var totalStreamId = streamInfo.streamId;
            if (this.testEnvironment) {
                totalStreamId = "zegotest-" + this.appid + "-" + streamInfo.streamId;
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
            if (this.testEnvironment) {
                mixOutput["stream_id"] = "zegotest-" + this.appid + "-" + mixStreamConfig.outputStreamId;
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
            this.logger.error("zc.p.ums.0 no bitrate param");
            return false;
        }

        if (mixStreamConfig.outputFps) {
            mixOutput["fps"] = mixStreamConfig.outputFps;
        }
        else {
            this.logger.error("zc.p.ums.0 no fps param");
            return false;
        }

        if (mixStreamConfig.outputWidth) {
            mixOutput["width"] = mixStreamConfig.outputWidth;
        }
        else {
            this.logger.error("zc.p.ums.0 no width param");
            return false;
        }

        if (mixStreamConfig.outputHeight) {
            mixOutput["height"] = mixStreamConfig.outputHeight;
        }
        else {
            this.logger.error("zc.p.ums.0 no height param");
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
            mixOutput["output_bg_color"] = mixStreamConfig.outputBgColor;
        }
        if (mixStreamConfig.outputBgImage) {
            mixOutput["output_bg_image"] = mixStreamConfig.outputBgImage;
        }

        if (this.testEnvironment) {
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

        var _this = this;
        this.logger.debug("zc.p.ums.0 send command");

        sendMessage$1(this, "biz_channel", body, function (seq, cmd, rspBody) {
            _this.logger.debug("zc.p.ums.0 receive message");
            var prefix = "zegotest-" + _this.appid + "-";
            if (rspBody.length == 0) {
                if (errorCallback) {
                    errorCallback(getServerError(MIXSTREAM_ERROR_CODE + 1));
                }
                return;
            }

            var data = JSON.parse(rspBody);

            for (var i = 0; i < data.play.length; i++) {
                var mixPlayInfo = {};
                var streamId = data.play[i].stream_alias;
                if (_this.testEnvironment && streamId.startsWith(prefix)) {
                    streamId = streamId.slice(prefix.length);
                }

                if (data.play[i].rtmp_url.length > 0) {
                    mixPlayInfo["rtmpUrls"] = [data.play[i].rtmp_url];
                }
                if (data.play[i].hls_url.length > 0) {
                    mixPlayInfo["hlsUrls"] = [data.play[i].hls_url];
                }
                if (data.play[i].hdl_url.length > 0) {
                    mixPlayInfo["flvUrls"] = [data.play[i].hdl_url];
                }

                if (successCallback) {
                    successCallback(streamId, mixPlayInfo);
                }
            }
        }, function (error, seq, rspBody) {

            if (typeof error == "number") {

                _this.logger.debug("zc.p.ums.0 error: " + error);

                var nonExistsStreamId = [];
                if (error == 1000000150 && rspBody.length != 0) {
                    //no stream list
                    var data = JSON.parse(rspBody);
                    var prefix = "zegotest-" + _this.appid + "-";

                    for (var i = 0; i < data.non_exist_streams.length; i++) {
                        var totalStreamId = data.non_exist_streams[i];
                        if (_this.testEnvironment && totalStreamId.startsWith(prefix)) {
                            nonExistsStreamId.push(totalStreamId.slice(prefix.length));
                        }
                        else {
                            nonExistsStreamId.push(totalStreamId);
                        }
                    }
                }

                if (errorCallback) {
                    errorCallback(getServerError(MIXSTREAM_ERROR_CODE + error), nonExistsStreamId);
                }
            }
            else {
                _this.logger.debug("zc.p.ums.0 error code " + error.code);

                if (errorCallback) {
                    errorCallback(error);
                }
            }

        });

        return true;
    };

    /*
     *    "zc.p.sms.0": "ZegoClient.stopMixStream",
     */
    //停止混流信令
    ZegoClient.prototype.stopMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        this.logger.debug("zc.p.sms.0 call");

        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zc.p.sms.0 no mix stream info");
            return false;
        }

        var req_body = {
            "id_name": this.idName,
            "live_channel": this.roomid,
            "appid": this.appid,
            "version": PROTO_VERSION
        };

        if (mixStreamConfig.outputStreamId != undefined) {
            if (this.testEnvironment) {
                req_body["stream_id"] = "zegotest-" + this.appid + "-" + mixStreamConfig.outputStreamId;
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

        sendMessage$1(this, "biz_channel", body, function (seq, data) {
            if (successCallback) {
                successCallback();
            }
        }, function (error, seq) {
            if (typeof error == "number") {
                if (errorCallback) {
                    errorCallback(getServerError(MIXSTREAM_ERROR_CODE + error));
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

    /**
     ZegoClient Helper Function
     */

    // 获取全局参数对象header
    function getHeader$1(_this, cmd) {
        _this.globalHeader = {
            'Protocol': 'req',
            'cmd': cmd,
            'appid': _this.appid,
            'seq': ++_this.cmdSeq,
            'user_id': _this.userid,
            'session_id': _this.sessionid,
            'room_id': _this.roomid,
        };
        return _this.globalHeader;
    }

    /*
     *    "sm.0": "ZegoClient.sendMessage",
     */

    // 发送处理后的数据参数
    function sendMessage$1(_this, cmd, body, success, error) {

        _this.logger.debug("sm.0 call " + cmd);
        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.logger.info("sm.0 error");
            return -1;
        }
        var header = getHeader$1(_this, cmd);
        var data = {
            "header": header,
            "body": body
        };

        var dataBuffer = JSON.stringify(data);

        if (success == undefined) {
            success = null;
        }

        if (error == undefined) {
            error = null;
        }

        if (success != null || error != null) {
            var cmdData = {
                data: data,
                seq: header.seq,
                deleted: false,
                time: Date.parse(new Date()),
                success: success,
                error: error,
            };
            var cmdDataNode = _this.sendCommandList.push(cmdData);
            _this.sendCommandMap[cmdData.seq] = cmdDataNode;
        }

        _this.websocket.send(dataBuffer);
        _this.logger.debug("sm.0 success");

        return header.seq;
    }

    /*
     *    "scm.0": "ZegoClient.sendCustomMessage",
     */

    // 发送带回调消息
    function sendCustomMessage(_this, cmd, body, success, error) {
        _this.logger.debug("scm.0 call");
        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.logger.info("scm.0 error");
            return false;
        }

        var header = getHeader$1(_this, cmd);
        var data = {
            "header": header,
            "body": body,
        };

        var dataBuffer = JSON.stringify(data);

        if (success == undefined) {
            success = null;
        }

        if (error == undefined) {
            error = null;
        }

        var cmdData = {
            data: data,
            seq: header.seq,
            deleted: false,
            time: Date.parse(new Date()),
            success: success,
            error: error,
        };
        var cmdDataNode = _this.sendDataList.push(cmdData);
        _this.sendDataMap[cmdData.seq] = cmdDataNode;
        _this.websocket.send(dataBuffer);
        _this.logger.debug("scm.0 success seq: ", header.seq);
        return true;
    }

    /**
     参数检查
     */

    /*
     *    "ccp.0": "ZegoClient.checkConfigParam",
     */
    function checkConfigParam(_this, option) {
        if (typeof option.appid != "number") {
            _this.logger.error("ccp.0 appid must be number");
            return false;
        }

        if (typeof option.server != "string" || option.server.length == 0) {
            _this.logger.error("ccp.0 server must be string and not empty");
            return false;
        }

        if (typeof option.idName != "string" || option.idName.length == 0) {
            _this.logger.error("ccp.0 idName must be string and not empty");
            return false;
        }

        return true;
    }

    function checkLoginParam(option) {
        return true;
    }

    function checkCustomCommandParam(option) {
        return true;
    }

    /**
     同一请求串行执行的回调，或者新请求的回调覆盖旧请求的回调
     */
    // 注册回调函数
    function registerCallback(_this, fName, option) {
        var sf = function () {
            },
            ef = function () {
            };
        if (option.success && (typeof option.success === 'function')) {
            sf = option.success;
        }
        if (option.error && (typeof option.error === 'function')) {
            ef = option.error;
        }
        _this.callbackList[fName + "SuccessCallback"] = sf;
        _this.callbackList[fName + "ErrorCallback"] = ef;
    }

    // 执行成功回调函数
    function actionSuccessCallback(_this, fName) {
        return _this.callbackList[fName + "SuccessCallback"];
    }

    // 执行错误回调函数
    function actionErrorCallback(_this, fName) {
        return _this.callbackList[fName + "ErrorCallback"];
    }

    /**
     错误管理
     */
    function getServerError(code) {
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

        var err = {};
        err.code = "ZegoClient.Error.Server";
        if (code > 1000000000) {
            err.msg = serverErrorList[1000000000] + code;
        } else if (serverErrorList[code] != undefined) {
            err.msg = serverErrorList[code];
        } else {
            err.msg = "unknown error code:" + code;
        }

        return err;
    }

    var sdkErrorList = {
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

    /*
     *    "srs.0": "ZegoClient.setRunState",
     */

    // 切换执行状态
    function setRunState(_this, newRunState) {
        _this.logger.debug("srs.0 old=" + _this.runState + ", new=" + newRunState);
        _this.lastRunState = _this.runState;
        _this.runState = newRunState;
    }

    function checkMessageListTimeout(_this, messageList, messageMap) {
        var head = messageList.getFirst();
        var timestamp = Date.parse(new Date());
        var checkCount = 0;
        var timeoutMsgCount = 0;
        var dropMsgCount = 0;

        while (head != null) {
            if ((head._data.time + _this.sendDataTimeout) > timestamp) {
                break;
            }

            delete messageMap[head._data.data.header.seq];
            messageList.remove(head);
            ++timeoutMsgCount;

            if (head._data.error == null ||
                (_this.sendDataDropTimeout > 0 &&
                    (head._data.time + _this.sendDataDropTimeout) < timestamp)) {
                ++dropMsgCount;
            } else {
                if (head._data.data.body.custom_msg != undefined) {
                    head._data.error(sdkErrorList.SEND_MSG_TIMEOUT,
                        head._data.data.header.seq,
                        head._data.data.body.custom_msg);
                } else {
                    head._data.error(sdkErrorList.SEND_MSG_TIMEOUT,
                        head._data.data.header.seq);
                }
            }

            ++checkCount;
            if (checkCount >= _this.sendDataCheckOnceCount) {
                break;
            }
            head = messageList.getFirst();
        }

        if (timeoutMsgCount != 0 || dropMsgCount != 0) {
            _this.logger.debug("scmt.0 call success, stat: timeout=", timeoutMsgCount, "drop=", dropMsgCount);
        }
    }

    /*
     *    "scmt.0": "ZegoClient.startCheckMessageTimeout",
     */

    //检查custommsg发送包是否超时
    function startCheckMessageTimeout(_this) {
        //_this.logger.debug("scmt.0 call");
        if (_this.runState !== ENUM_RUN_STATE.login) {
            _this.logger.info("scmt.0 state error");
            return;
        }

        checkMessageListTimeout(_this, _this.sendDataList, _this.sendDataMap);
        checkMessageListTimeout(_this, _this.sendCommandList, _this.sendCommandMap);

        //由于webrtc会存在多个signal, 如果每个signal都用timer来检查消息超时，可能会有性能问题。所有由room的timer触发来检查
        {
            _this.streamCenter.checkMessageTimeout();
        }

        _this.sendDataCheckTimer = setTimeout(function () {
            startCheckMessageTimeout(_this);
        }, _this.sendDataCheckInterval);

    }

    /*
     *    "rcm.0": "ZegoClient.resetCheckMessage",
     */

    // 关闭/清除custommsg超时检查逻辑
    function checkSendMessageList(messageList) {
        var head = messageList.getFirst();
        while (head != null) {
            messageList.remove(head);
            if (head._data.error != null) {
                if (head._data.data.body.custom_msg != undefined) {
                    head._data.error(sdkErrorList.SEND_MSG_TIMEOUT,
                        head._data.data.header.seq,
                        head._data.data.body.custom_msg);
                } else {
                    head._data.error(sdkErrorList.SEND_MSG_TIMEOUT,
                        head._data.data.header.seq);
                }
            }
            head = messageList.getFirst();
        }
    }

    function resetCheckMessage$1(_this) {
        _this.logger.debug("rcm.0 call");

        clearTimeout(_this.sendDataCheckTimer);
        _this.sendDataCheckTimer = null;

        checkSendMessageList(_this.sendDataList);
        checkSendMessageList(_this.sendCommandList);

        _this.sendDataMap = {};
        _this.sendCommandMap = {};

        _this.logger.debug("rcm.0 call success");
    }

    function resetBigRoomInfo(_this) {
        //清除trans信令信息
        _this.transSeqMap = {};

        //清除relay信令信息
        _this.realyMessageList = [];
        if (_this.relayTimer) {
            clearTimeout(_this.relayTimer);
            _this.relayTimer = null;
        }

        //清除大房间消息
        _this.bigImLastTimeIndex = 0;
        _this.bigIMmessageList = [];
        _this.bigImCallbackMap = {};
        if (_this.bigImTimer) {
            clearTimeout(_this.bigImTimer);
            _this.bigImTimer = null;
        }

        _this.serverTimeOffset = 0;
        _this.datiTimeWindow = 0;
        _this.bigimTimeWindow = 0;
    }

    function resetStreamCenter(_this) {

        if (_this.customUrl) {
            _this.customUrl = null;
        }

        _this.streamCenter.reset();

        if (_this.websocket && _this.websocket.readyState === 1) {
            //send stream delete info
            for (var streamid in _this.publishStreamList) {
                if (_this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.publishing) {
                    updateStreamInfo(_this, streamid, ENUM_STREAM_SUB_CMD.liveEnd, _this.publishStreamList[streamid].extra_info);
                }
            }
        }
    }

    /*
     *    "rht.0": "ZegoClient.resetHeartbeat",
     */

    // 关闭/清除心跳计时器对象
    function resetHeartbeat(_this) {
        _this.logger.debug("rht.0 call");
        clearTimeout(_this.heartbeatTimer);
        _this.heartbeatTimer = null;
        _this.tryHeartbeatCount = 0;
        _this.logger.debug("rht.0 call success");
    }

    /*
     *    "sht.0": "ZegoClient.startHeartbeat",
     */

    // 发送心跳包 / 并启动心跳计时器
    function startHeartbeat(_this) {
        _this.logger.debug("sht.0 call");

        // 若当前不是处于login登录状态，则返回不做心跳
        if (_this.runState !== ENUM_RUN_STATE.login) {
            _this.logger.info("sht.0 state error");
            return;
        }

        // 若尝试心跳次数大于最大尝试次数，则置为登出状态，清除状态数据
        if (++_this.tryHeartbeatCount > MAX_TRY_HEARTBEAT_COUNT$1) {
            _this.logger.error("sht.0 come to try limit");

            setRunState(_this, ENUM_RUN_STATE.logout);
            resetRoom(_this);

            _this.onDisconnect(sdkErrorList.HEARTBEAT_TIMEOUT);

            return;
        }

        // 发送消息
        _this.logger.debug("sht.0 send packet");
        var bodyData = {
            "reserve": 0
        };
        sendMessage$1(_this, 'hb', bodyData);

        // heartbeatInterval后再发
        _this.heartbeatTimer = setTimeout(function () {
            startHeartbeat(_this);
        }, _this.heartbeatInterval);

        _this.logger.debug("sht.0 call success");
    }

    /*
     *    "rtl.0": "ZegoClient.resetTryLogin",
     */

    // 清除尝试登录计时器对象
    function resetTryLogin(_this) {
        _this.logger.debug("rtl.0 call");
        clearTimeout(_this.tryLoginTimer);
        _this.tryLoginTimer = null;
        _this.tryLoginCount = 0;
        _this.logger.debug("rtl.0 call success");
    }

    /*
     *    "tl.0": "ZegoClient.tryLogin",
     */

    // 尝试重新登录
    function tryLogin(_this) {
        _this.logger.debug('tl.0 call');
        if (_this.runState !== ENUM_RUN_STATE.trylogin) {
            _this.logger.info('tl.0 state error');
            return;
        }
        // 如果尝试登录次数大于最大可尝试次数，则直接置为logout登出状态
        if (++_this.tryLoginCount > MAX_TRY_LOGIN_COUNT) {
            _this.logger.error('tl.0 fail times limit');
            var lastRunState = _this.lastRunState;
            setRunState(_this, ENUM_RUN_STATE.logout);
            resetRoom(_this);

            if (lastRunState == ENUM_RUN_STATE.login) {
                //relogin fail, not by user
                _this.logger.info('tl.0 fail and disconnect');
                _this.onDisconnect(sdkErrorList.LOGIN_DISCONNECT);
            } else {
                //trylogin fail, call by user
                _this.logger.info('tl.0 fail and callback user');
                actionErrorCallback(_this, 'login')(sdkErrorList.LOGIN_TIMEOUT);
            }

            return;
        }

        // 如果websocket还未初始化或者还不是处于连接状态
        if (!_this.websocket || _this.websocket.readyState !== 1) {
            _this.logger.debug('tl.0 need new websocket');

            try {
                // 若已经初始化，但是还不是连接状态，先清除置为null
                if (_this.websocket) {
                    _this.logger.info('tl.0 close error websocket');
                    _this.websocket.onclose = null;
                    _this.websocket.onerror = null;
                    _this.websocket.close();
                    _this.websocket = null;
                }

                // 建立websocket连接
                _this.logger.debug('tl.0 new websocket');

                {
                    _this.websocket = new WebSocket(_this.server);
                }

                _this.websocket.onopen = function () {
                    // websocket连接已经打开
                    // 注册onmessage函数，处理服务的发过来的消息，该函数只调用一次
                    _this.logger.info('tl.0 websocket.onpen call');
                    bindWebSocketHandler(_this);


                    // 发送消息
                    _this.logger.info('tl.0 websocket.onpen send login');
                    var bodyData = loginBodyData(_this);
                    sendMessage$1(_this, 'login', bodyData);
                    _this.logger.debug('tl.0 websocket.onpen call success');

                };
            } catch (e) {
                _this.logger.error("tl.0 websocket err:" + e);
            }

        } else { // websocket已建立成功
            _this.logger.info('tl.0 use current websocket and sent login');
            var bodyData = loginBodyData(_this);
            sendMessage$1(_this, 'login', bodyData);
        }

        //settimeout
        _this.tryLoginTimer = setTimeout(function () {
            tryLogin(_this);
        }, TRY_LOGIN_INTERVAL[_this.tryLoginCount % MAX_TRY_LOGIN_COUNT]);

        _this.logger.debug('tl.0 call success');
    }

    //登录请求数据包
    function loginBodyData(_this) {
        var bodyData = {
            "id_name": _this.idName,
            "nick_name": _this.nickName,
            "role": _this.role,
            "token": _this.token,
            "version": PROTO_VERSION,
            "user_state_flag": _this.userStateUpdate ? 1 : 0,
            "room_create_flag": _this.roomCreateFlag
        };

        return bodyData;
    }

    /*
     *    "rr.0": "ZegoClient.resetRoom",
     */

    // 重置房间信息
    function resetRoom(_this) {
        _this.logger.debug('rr.0 call');
        // 清除尝试登录计时器对象
        resetTryLogin(_this);

        // 清除心跳计时器对象
        resetHeartbeat(_this);

        // 清除检查消息循环
        resetCheckMessage$1(_this);

        //清除推拉流状态
        resetStreamCenter(_this);

        // 清除流列表
        _this.streamList = [];
        _this.publishStreamList = {};
        _this.streamQuerying = false;

        _this.mixStreamList = [];

        // 清除连麦信令
        _this.joinLiveCallbackMap = {};
        _this.joinLiveRequestMap = {};

        // 清除请求url信息
        _this.streamUrlMap = {};

        //清除大房间消息
        resetBigRoomInfo(_this);

        _this.cmdCallback = {};

        // 防止多次重置时，发送多次消息
        _this.logger.debug('rr.0 call send logout=', _this.sessionid);
        if (_this.sessionid !== '0') {
            var bodyData = {
                "reserve": 0
            };
            sendMessage$1(_this, 'logout', bodyData);
        }

        if (_this.websocket) {
            _this.websocket.onclose = null;
            _this.websocket.onerror = null;
            _this.websocket.close();
            _this.websocket = null;
        }

        _this.userid = '0';
        _this.sessionid = '0';
        _this.logger.setSessionInfo(_this.appid, _this.roomid, _this.userid, _this.idName, _this.sessionid, PROTO_VERSION);
        _this.logger.debug('rr.0 call success');
    }

    /*
     *    "fsl.0": "ZegoClient.fetchStreamList",
     */

    // 拉取服务端流信息
    function fetchStreamList(_this) {
        _this.logger.debug("fsl.0 call");
        // 不是处于登录状态，不让拉流
        if (_this.runState !== ENUM_RUN_STATE.login) {
            _this.logger.info("fsl.0 state error");
            return;
        }

        // 是否正处于拉流状态 false 为完成， true为正在拉流
        if (_this.streamQuerying) {
            _this.logger.info("fsl.0 already doing");
            return;
        }
        _this.streamQuerying = true;
        _this.logger.debug("fsl.0 send fetch request");
        var bodyData = {
            "reserve": 0
        };

        // 发送消息
        sendMessage$1(_this, 'stream_info', bodyData);
        _this.logger.debug("fsl.0 call success");
    }

    /*
     *    "ful.0": "ZegoClient.fetchUserList",
     */

    // 拉取服务端user信息
    function fetchUserList(_this) {
        _this.logger.debug("ful.0 call");
        if (_this.userQuerying) {
            _this.logger.info("ful.0 is already querying");
            return;
        }

        _this.userQuerying = true;
        _this.userTempList = [];
        fetchUserListWithPage(_this, 0);
        _this.logger.debug("ful.0 the first time call");

        return;
    }

    /*
     *    "fulwp.0": "ZegoClient.fetchUserListWithPage",
     */

    //分页拉取user list
    function fetchUserListWithPage(_this, userIndex) {
        _this.logger.debug("fulwp.0 call");

        var bodyData = {
            "user_index": userIndex,
            "sort_type": 0
        };

        // 发送消息
        sendMessage$1(_this, 'user_list', bodyData);
        _this.logger.debug("fulwp.0 call success");
    }

    function isKeepTryLogin(code) {
        switch (code) {
        case 1002: //liveroom connect error
        case 1003: //zpush connect error
            return true;
        default:
            return false;
        }
    }

    /*
     *    "usi.0": "ZegoClient.updateStreamInfo",
     */

    //流更新信令
    function updateStreamInfo(_this, streamid, cmd, stream_extra_info, error) {
        _this.logger.debug("usi.0 call");

        var extra_info = "";
        if (stream_extra_info != undefined && typeof stream_extra_info == "string") {
            extra_info = stream_extra_info;
        }

        var data = {
            "stream_id": streamid,
            "extra_info": extra_info
        };

        var stream_msg = JSON.stringify(data);
        var bodyData = {
            "sub_cmd": cmd,
            "stream_msg": stream_msg
        };

        sendMessage$1(_this, "stream", bodyData, undefined, error);
        _this.logger.debug("usi.0 call success cmd " + cmd);
    }

    //连麦信令
    /*
     *    "ssc.0": "ZegoClient.SendSignalCmd",
     */
    function sendSignalCmd(_this, cmd, signalMsg, dest_id_name, success, error) {
        _this.logger.debug("ssc.0 call");
        if (_this.runState !== ENUM_RUN_STATE.login) {
            _this.logger.info("ssc.0 state error");
            return;
        }

        _this.logger.debug("ssc.0 send signal cmd " + cmd);
        var bodyData = {
            "sub_cmd": cmd,
            "signal_msg": signalMsg,
            "dest_id_name": [dest_id_name]
        };

        sendMessage$1(_this, "signal", bodyData, success, error);
        _this.logger.debug("ssc.0 call success");
    }

    //requestId
    function getRequestId(_this) {
        ++_this.cmdSeq;
        return _this.idName + "-" + _this.cmdSeq;
    }

    function getSignalCmdContent(_this, requestId, dest_id_name, result) {
        var data = {
            "request_id": requestId,
            "room_id": _this.roomid,
            "from_userid": _this.idName,
            "from_username": _this.nickName,
            "to_userid": dest_id_name
        };

        if (result != undefined) {
            data["result"] = result;
        }
        return JSON.stringify(data);
    }

    /*
     *    "frm.0": "ZegoClient.fetchReliableMessage",
     */

    //拉取可靠业务广播
    function fetchReliableMessage(_this, type, localSeq) {
        _this.logger.debug("frm.0 call");

        var data = {
            "trans_type": type,
            "trans_local_seq": localSeq
        };

        sendMessage$1(_this, "trans_fetch", data);
        _this.logger.debug("frm.0 call success");
    }

    /*
     *    "srm.0": "ZegoClient.sendRelayMessage",
     */

    //发送relay信令
    function sendRelayMessageInternal(_this, type, data, success, error) {
        _this.logger.debug("srm.0 call");

        var bodyData = {
            "relay_type": type,
            "relay_data": data
        };

        sendMessage$1(_this, "relay", bodyData, success, error);
    }

    /*
     *    "srt.0": "ZegoClient.SetRelayTimer",
     */
    function setRelayTimer(_this, offset, timeWindow) {
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow * 2 - (serverTimestamp % timeWindow);
        var interval = generateRandumNumber(residue);

        _this.logger.info("srt.0 setTimer " + interval);

        _this.relayTimer = setTimeout(function () {
            onRelayTimer(_this);
        }, interval);
    }

    /*
     *    "ort.0": "ZegoClient.onRelayTimer",
     */
    function onRelayTimer(_this) {
        if (_this.realyMessageList.length == 0) {
            _this.logger.info("ort.0 no relay data");
            return;
        }

        var relayInfo = _this.realyMessageList[0];
        sendRelayMessageInternal(_this, relayInfo.type, relayInfo.data, relayInfo.success, relayInfo.error);

        clearTimeout(_this.relayTimer);
        _this.relayTimer = null;

        _this.realyMessageList.splice(0, 1);
        if (_this.realyMessageList.length > 0) {
            setRelayTimer(_this, _this.serverTimeOffset, _this.datiTimeWindow);
        }
    }

    /*
     *    "sbim.0": "ZegoClient.sendBigIMMessage",
     */

    //发送bigim信令
    function sendBigRoomMessageInternal(_this, msgs, success, error) {
        _this.logger.debug("sbim.0 call");

        var bodyData = {
            "msgs": msgs
        };

        sendMessage$1(_this, "bigim_chat", bodyData, success, error);
    }

    /*
     *    "sbt.0": "ZegoClient.setBigImTimer",
     */
    function setBigImTimer(_this, offset, timeWindow) {
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow - (serverTimestamp % timeWindow);
        var interval = generateRandumNumber(timeWindow) + residue;

        _this.logger.info("sbt.0 setTimer " + interval);

        _this.bigImTimer = setTimeout(function () {
            onBigImTimer(_this);
        }, interval);
    }

    /*
     *    "ort.0": "ZegoClient.onRelayTimer",
     */
    function onBigImTimer(_this) {
        var serverTimestamp = (new Date()).getTime() + _this.serverTimeOffset;
        _this.bigImLastTimeIndex = Math.floor(serverTimestamp / _this.bigimTimeWindow);

        var bodyData = [];
        var requestList = [];
        for (var i = 0; i < _this.bigImMessageList.length; i++) {
            if (i >= 20) {
                break;
            }

            var info = _this.bigImMessageList[i];
            bodyData.push({
                "msg_category": info.msg_category,
                "msg_type": info.msg_type,
                "msg_content": info.msg_content,
                "bigmsg_client_id": info.bigmsg_client_id
            });

            requestList.push(info.bigmsg_client_id);
        }

        if (_this.bigImMessageList.length > 20) {
            _this.bigImMessageList.splice(0, 20);
        } else {
            _this.bigImMessageList = [];
        }

        sendBigRoomMessageInternal(_this, bodyData, handleBigImMsgRsp, function (err, seq) {
            for (var i = 0; i < requestList.length; i++) {
                var clientId = requestList[i];
                var callbackInfo = _this.bigImCallbackMap[clientId];
                if (callbackInfo) {
                    if (callbackInfo.error != null) {
                        callbackInfo.error(err, seq);
                    }

                    delete _this.bigImCallbackMap[clientId];
                }
            }
        });

        clearTimeout(_this.bigImTimer);
        _this.bigImTimer = null;

        if (_this.bigImMessageList.length > 0) {
            setBigImTimer(_this, _this.serverTimeOffset, _this.bigimTimeWindow);
        }
    }

    //生成随机数
    function generateRandumNumber(maxNum) {
        return parseInt(Math.random() * (maxNum + 1), 10);
    }


    /*
     *    "hlf.0": "ZegoClient.handleLoginFail",
     */
    function handleLoginFail(_this, msg) {
        _this.logger.debug("hlf.0 call");
        if (isKeepTryLogin(msg.body.err_code)) {
            _this.logger.info("hlf.0 KeepTry true");
            return;
        }

        //stop
        var lastRunState = _this.lastRunState;
        setRunState(_this, ENUM_RUN_STATE.logout);
        resetRoom(_this);

        var err = getServerError(msg.body.err_code);
        if (lastRunState == ENUM_RUN_STATE.login) {
            //relogin fail, not by user
            _this.logger.info('hlf.0 callback disconnect');
            _this.onDisconnect(err);
        } else {
            //trylogin fail, call by user
            _this.logger.info('hlf.0 callback error');
            actionErrorCallback(_this, 'login')(err);
        }

        _this.logger.debug("hlf.0 call success");
    }

    /*
     *    "hls.0": "ZegoClient.handleLoginSuccess",
     */
    function handleLoginSuccess(_this, msg) {
        _this.logger.debug("hls.0 call");

        //enter login
        var lastRunState = _this.lastRunState;
        setRunState(_this, ENUM_RUN_STATE.login);
        _this.userid = msg.body.user_id;
        _this.sessionid = msg.body.session_id;

        //set log
        _this.logger.setSessionInfo(_this.appid, _this.roomid, _this.userid, _this.idName, _this.sessionid, PROTO_VERSION);
        if (msg.body.config_info != undefined) {
            _this.logger.setRemoteLogLevel(msg.body.config_info.log_level);
            if (msg.body.config_info.log_url != "") {
                _this.logger.openLogServer(msg.body.config_info.log_url);
            }
        }

        //get time stamp & window
        if (msg.body.ret_timestamp != undefined && typeof msg.body.ret_timestamp == "string") {
            var serverTime = parseFloat(msg.body.ret_timestamp);
            if (serverTime == 0) {
                _this.serverTimeOffset = 0;
            } else {
                _this.serverTimeOffset = msg.body.ret_timestamp - (new Date()).getTime();
            }
        }
        if (msg.body.bigim_time_window != undefined && typeof msg.body.bigim_time_window == "number") {
            _this.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window != undefined && typeof msg.body.dati_time_window == "number") {
            _this.datiTimeWindow = msg.body.dati_time_window;
        }

        //stop trylogin
        resetTryLogin(_this);

        //start heartbeat
        resetHeartbeat(_this);
        _this.heartbeatInterval = msg.body.hearbeat_interval;
        if (_this.heartbeatInterval < MINIUM_HEARTBEAT_INTERVAL) {
            _this.heartbeatInterval = MINIUM_HEARTBEAT_INTERVAL;
        }
        _this.heartbeatTimer = setTimeout(function () {
            startHeartbeat(_this);
        }, _this.heartbeatInterval);

        //start checkmessage
        resetCheckMessage$1(_this);
        _this.sendDataCheckTimer = setTimeout(function () {
            startCheckMessageTimeout(_this);
        }, _this.sendDataCheckInterval);

        //webrtc
        {

            _this.streamCenter.setSessionInfo(_this.appid, _this.idName, _this.token, _this.testEnvironment);

            _this.logger.debug("hls.0 call success");
        }

        //handle stream list
        _this.streamQuerying = false;
        if (lastRunState == ENUM_RUN_STATE.login) {
            _this.logger.info("hls.0 recover from disconnect so call streamupdate");
            //relogin and stream update callback
            handleFullUpdateStream(_this, msg.body.stream_seq, msg.body.stream_info || []);
        } else {
            _this.logger.info("hls.0 success callback user");
            //login and callback
            _this.streamList = (msg.body.stream_info || []);
            _this.streamSeq = msg.body.stream_seq;

            for (var i = 0; i < _this.streamList.length; i++) {
                //check whether stream contain self
                if (_this.streamList[i].anchor_id_name == _this.idName) {
                    //delete this stream
                    updateStreamInfo(_this, _this.streamList[i].stream_id, ENUM_STREAM_SUB_CMD.liveEnd);
                    _this.streamList.splice(i, 1);
                }
            }

            var callbackStreamList = [];
            callbackStreamList = makeCallbackStreamList(_this.streamList);
            actionSuccessCallback(_this, 'login')(callbackStreamList);
        }

        //handle anchor info
        if (msg.body.anchor_info) {
            var anchorId = msg.body.anchor_info.anchor_id_name;
            var anchorName = msg.body.anchor_info.anchor_nick_name;
            _this.onGetAnchorInfo(anchorId, anchorName);
        }

        if (msg.body.online_count != undefined && msg.body.online_count != 0) {
            _this.onUpdateOnlineCount(_this.roomid, msg.body.online_count);
        }

        //handle userStateUpdate
        _this.logger.debug("hls.0 userStateUpdate " + _this.userStateUpdate);

        if (_this.userStateUpdate) {
            _this.logger.info("hls.0 fetch all new userlist");
            fetchUserList(_this);
        }
    }

    /*
     *    "hlr.0": "ZegoClient.handleLoginRsp",
     */

    function handleLoginRsp(_this, msg) {
        _this.logger.debug("hlr.0 call");
        if (_this.runState !== ENUM_RUN_STATE.trylogin) {
            _this.logger.info("hlr.0 state error");
            return;
        }

        if (msg.header.seq !== _this.cmdSeq) {
            _this.logger.info("hlr.0 in wrong seq, local=", _this.cmdSeq, ",recv=", msg.header.seq);
            return;
        }

        if (msg.body.err_code !== 0) {
            handleLoginFail(_this, msg);
            _this.logger.info("hlr.0 server error=", msg.body.err_code);
            return;
        }
        handleLoginSuccess(_this, msg);
        _this.logger.info("hlr.0 call success.");
    }

    /*
     *    "hhbr.0": "ZegoClient.handleHeartbeatRsp",
     */
    function handleHeartbeatRsp(_this, msg) {
        _this.logger.debug("hhbr.0 call");
        if (msg.body.err_code !== 0) {
            _this.logger.info("hhbr.0 call disconnect, server error=", msg.body.err_code);

            setRunState(_this, ENUM_RUN_STATE.logout);
            resetRoom(_this);

            var err = getServerError(msg.body.err_code);
            _this.onDisconnect(err);

            return;
        }

        //reset heartbeat fail count
        _this.tryHeartbeatCount = 0;
        _this.heartbeatInterval = msg.body.hearbeat_interval;
        if (_this.heartbeatInterval < MINIUM_HEARTBEAT_INTERVAL) {
            _this.heartbeatInterval = MINIUM_HEARTBEAT_INTERVAL;
        }

        //update timewindow
        if (msg.body.bigim_time_window != undefined && typeof msg.body.bigim_time_window == "number") {
            _this.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window != undefined && typeof msg.body.dati_time_window == "number") {
            _this.datiTimeWindow = msg.body.dati_time_window;
        }

        //check trans seq
        if (msg.body.trans_seqs != undefined) {
            for (var i = 0; i < msg.body.trans_seqs.length; i++) {
                var type = msg.body.trans_seqs[i].trans_type;
                var seq = msg.body.trans_seqs[i].trans_seq;
                if (!_this.transSeqMap[type] || _this.transSeqMap[type].seq !== seq) {
                    //fetch trans 
                    var oldSeq = 0;
                    if (!_this.transSeqMap[type]) {
                        oldSeq = 0;
                        _this.logger.debug("hhbr.0 type " + type + " server seq " + seq);
                    } else {
                        oldSeq = _this.transSeqMap[type].seq;
                        _this.logger.debug("hhbr.0 type " + type + " old seq " + _this.transSeqMap[type].seq + " server seq " + seq);
                    }

                    fetchReliableMessage(_this, type, oldSeq);
                }
            }
        }

        //update stream if diff/
        if (msg.body.stream_seq !== _this.streamSeq) {
            _this.logger.debug("hhbr.0 current seq " + _this.streamSeq + " server Seq " + msg.body.stream_seq);
            fetchStreamList(_this);
        }

        //update user if diff
        if (msg.body.server_user_seq !== _this.userSeq && _this.userStateUpdate) {
            _this.logger.info("hhbr.0 call update user " + msg.body.server_user_seq, _this.userSeq);
            fetchUserList(_this);
        }

        //try updating stream info again
        for (var streamid in _this.publishStreamList) {
            if (_this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.update_info) {
                _this.logger.info("hbbr.0 try to update stream info");
                updateStreamInfo(_this, streamid, ENUM_STREAM_SUB_CMD.liveBegin, _this.publishStreamList[streamid].extra_info);
            }
        }

        //get online count
        if (msg.body.online_count != undefined && msg.body.online_count != 0) {
            _this.onUpdateOnlineCount(_this.roomid, msg.body.online_count);
        }

        _this.logger.debug("hhbr.0 call success");
    }

    /*
     *    "hlor.0": "ZegoClient.handleLogoutRsp",
     */
    function handleLogoutRsp(_this, msg) {
        _this.logger.debug("hlor.0 result=", msg.body.err_code);
    }

    /*
     *    "hscmr.0": "ZegoClient.handleSendCustomMsgRsp",
     */
    function handleSendCustomMsgRsp(_this, msg) {
        _this.logger.debug("hscmr.0 call");
        var sendDataNode = _this.sendDataMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;

            if (sendData.data.header.cmd != "custommsg") {
                _this.logger.error("hscmr.0 cmd wrong" + sendData.data.header.cmd);
            } else {
                if (msg.body.err_code === 0) {
                    if (sendData.success != null) {
                        sendData.success(msg.header.seq, sendData.data.body.custom_msg);
                    }
                } else {
                    if (sendData.error != null) {
                        sendData.error(getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.custom_msg);
                    }
                }
            }

            delete _this.sendDataMap[msg.header.seq];
            _this.sendDataList.remove(sendDataNode);
        } else {
            _this.logger.error('hscmr.0 no found seq=' + msg.header.seq);
        }
        _this.logger.debug("hscmr.0 call success");
    }

    function handleRelayRspCallback(_this, msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                sendData.success(msg.header.seq, msg.body.relay_result);
            }
        } else {
            if (sendData.error != null) {
                sendData.error(getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    }

    function handleBigImRspCallback(_this, msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                //should be sendData.success callback
                handleBigImMsgRsp(_this, msg);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    }

    function handleBizChannelRspCallback(_this, msg, sendData) {
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
    }

    /*
     *    "hscmr.0": "ZegoClient.handleSendCommandMsgRsp",
     */
    function handleSendCommandMsgRsp(_this, msg) {
        _this.logger.debug("hscmr.0 call");
        var sendDataNode = _this.sendCommandMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;

            switch (sendData.data.header.cmd) {
            case "login":
                _this.logger.debug("hscmr.0 don't check " + sendData.data.header.cmd);
                break;
            case "relay":
                handleRelayRspCallback(_this, msg, sendData);
                break;
            case "bigim_chat":
                handleBigImRspCallback(_this, msg, sendData);
                break;
            case "biz_channel":
                handleBizChannelRspCallback(_this, msg, sendData);
                break;
            default:
                if (msg.body.err_code === 0) {
                    if (sendData.success != null) {
                        sendData.success(msg.header.seq);
                    }
                } else {
                    if (sendData.error != null) {
                        sendData.error(getServerError(msg.body.err_code), msg.header.seq);
                    }
                }
                break;
            }

            delete _this.sendCommandMap[msg.header.seq];
            _this.sendCommandList.remove(sendDataNode);
        }

        _this.logger.debug("hscmr.0 call success");
    }

    /*
     *    "hsrmr.0": "ZegoClient.handleSendRoomMsgRsp",
     */
    function handleSendRoomMsgRsp(_this, msg) {
        _this.logger.debug("hsrmr.0 call");
        var sendDataNode = _this.sendDataMap[msg.header.seq];
        var sendData;

        if (sendDataNode != null) {
            sendData = sendDataNode._data;

            if (sendData.data.header.cmd != "im_chat") {
                _this.logger.error("hsrmr.0 cmd wrong" + sendData.data.header.cmd);
            } else {
                if (msg.body.err_code === 0) {
                    if (sendData.success) {
                        sendData.success(msg.header.seq, msg.body.msg_id, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                } else {
                    if (sendData.error) {
                        sendData.error(getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                }
            }

            delete _this.sendDataMap[msg.header.seq];
            _this.sendDataList.remove(sendDataNode);
        } else {
            _this.logger.error('hsrmr.0 no found seq=' + msg.header.seq);
        }
        _this.logger.debug("hsrmr.0 call success");
    }

    /*
     *    "hpcm.0": "ZegoClient.handlePushCustomMsg",
     */
    function handlePushCustomMsg(_this, msg) {
        var submsg = JSON.parse(msg.body.custommsg);
        _this.logger.debug("hpcm.0 submsg=", submsg);
        _this.onRecvCustomCommand(submsg.from_userid, submsg.from_username, submsg.custom_content);
    }

    /*
     *    "hprm.0": "ZegoClient.handlePushRoomMsg",
     */
    function handlePushRoomMsg(_this, msg) {
        _this.onRecvRoomMsg(msg.body.chat_data, msg.body.server_msg_id, msg.body.ret_msg_id);
    }


    /*
     *    "hfus.0": "ZegoClient.handleFullUpdateStream",
     */
    function handleFullUpdateStream(_this, serverStreamSeq, serverStreamList) {
        _this.logger.debug("hfus.0 call");
        _this.streamSeq = serverStreamSeq;
        _this.logger.debug("hfus.0 server seq " + _this.streamSeq);

        mergeStreamList(_this, _this.streamList, serverStreamList, function (addStreamList, delStreamList, updateStreamList) {
            if (addStreamList.length !== 0) {
                _this.logger.debug("hfus.0 callback addstream");
                _this.onStreamUpdated(ENUM_STREAM_UPDATE_TYPE.added, makeCallbackStreamList(addStreamList));
            }
            if (delStreamList.length !== 0) {
                _this.logger.debug("hfus.0 callback delstream");
                _this.onStreamUpdated(ENUM_STREAM_UPDATE_TYPE.deleted, makeCallbackStreamList(delStreamList));
            }
            if (updateStreamList.length !== 0) {
                _this.logger.debug("hfus.0 callback updatestream");
                _this.onStreamExtraInfoUpdated(makeCallbackStreamList(updateStreamList));
            }
        });

        _this.logger.debug("hfus.0 call success");
    }

    /*
     *    "msl.0": "ZegoClient.mergeStreamList",
     */
    function mergeStreamList(_this, oldStreamList, newStreamList, callbackResult) {
        _this.logger.debug("msl.0 call");
        var addStreamList = [];
        var delStreamList = [];
        var updateStreamList = [];
        var flag;

        for (var i = 0; i < newStreamList.length; i++) {
            if (newStreamList[i].anchor_id_name == _this.idName) {
                _this.logger.debug("msl.0 have self stream added");
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
                if (newStreamList[n].anchor_id_name == _this.idName) {
                    _this.logger.debug("msl.0 have self stream deleted");
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

        oldStreamList = newStreamList;
        callbackResult(addStreamList, delStreamList, updateStreamList);
        _this.logger.debug("msl.0 call success");
    }

    function makeCallbackStreamList(streamList) {
        var callbackStreamList = [];
        if (streamList != undefined && streamList != null) {
            for (var i = 0; i < streamList.length; i++) {
                var streamInfo = {
                    anchor_id_name: streamList[i].anchor_id_name,
                    stream_gid: streamList[i].stream_gid,
                    anchor_nick_name: streamList[i].anchor_nick_name,
                    extra_info: streamList[i].extra_info,
                    stream_id: streamList[i].stream_id,
                };

                {
                    streamInfo.urls_flv = streamList[i].urls_flv;
                    streamInfo.urls_hls = streamList[i].urls_m3u8;
                    streamInfo.urls_rtmp = streamList[i].urls_rtmp;
                }

                callbackStreamList.push(streamInfo);

            }
        }

        return callbackStreamList;
    }

    /*
     *    "hfslr.0": "ZegoClient.handleAddedStreamList",
     */
    function handleFetchStreamListRsp(_this, msg) {
        _this.logger.debug("hfslr.0 call");
        _this.streamQuerying = false;
        if (msg.body.err_code !== 0) {
            _this.logger.info("hfslr.0 server error=", msg.body.err_code);
            return;
        }

        if (_this.streamSeq === msg.body.stream_seq) {
            _this.logger.info("hfslr.0 same seq");
            return;
        }

        handleFullUpdateStream(_this, msg.body.stream_seq, msg.body.stream_info);
        _this.logger.debug("hfslr.0 call success");
    }

    /*
     *    "hasl.0": "ZegoClient.handleAddedStreamList",
     */
    function handleAddedStreamList(_this, streamList) {
        _this.logger.debug("hasl.0 call");
        var addStreamList = [];
        var flag;
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == _this.idName) {
                _this.logger.debug("hdsl.0 have self stream added");
                continue;
            }

            flag = false;
            for (var j = 0; j < _this.streamList.length; j++) {
                if (streamList[i].stream_id === _this.streamList[j].stream_id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                addStreamList.push(streamList[i]);
            }
        }

        if (addStreamList.length !== 0) {
            _this.logger.debug("hasl.0 callback addstream");
            // _this.streamList.concat(addStreamList);
            for (var k = 0; k < addStreamList.length; k++) {
                _this.streamList.push(addStreamList[k]);
            }
            _this.onStreamUpdated(ENUM_STREAM_UPDATE_TYPE.added, makeCallbackStreamList(addStreamList));
        }
        _this.logger.debug("hasl.0 call success");
    }

    /*
     *    "hdsl.0": "ZegoClient.handleDeletedStreamList",
     */
    function handleDeletedStreamList(_this, streamList) {
        _this.logger.debug("hdsl.0 call");
        var delStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == _this.idName) {
                _this.logger.debug("hdsl.0 have self stream deleted");
                continue;
            }
            for (var j = _this.streamList.length - 1; j >= 0; j--) {
                if (streamList[i].stream_id === _this.streamList[j].stream_id) {
                    _this.streamList.splice(j, 1);
                    delStreamList.push(streamList[i]);
                    break;
                }
            }
        }

        if (delStreamList.length !== 0) {
            _this.logger.debug("hdsl.0 callback delstream");
            _this.onStreamUpdated(ENUM_STREAM_UPDATE_TYPE.deleted, makeCallbackStreamList(delStreamList));
        }
        _this.logger.debug("hdsl.0 call");
    }

    /*
     *    "husl.0": "ZegoClient.handleUpdatedStreamList",
     */
    function handleUpdatedStreamList(_this, streamList) {
        _this.logger.debug("husl.0 call");
        var updateStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == _this.idName) {
                _this.logger.debug("hsul.0 have self stream updated");
                continue;
            }
            for (var j = 0; j < _this.streamList.length; j++) {
                if (streamList[i].stream_id === _this.streamList[j].stream_id) {
                    if (streamList[i].extra_info !== _this.streamList[j].extra_info) {
                        _this.streamList[j] = streamList[i];
                        updateStreamList.push(streamList[i]);
                    }
                    break;
                }
            }
        }

        if (updateStreamList.length !== 0) {
            _this.logger.debug("husl.0 callback updatestream");
            _this.onStreamExtraInfoUpdated(makeCallbackStreamList(updateStreamList));
        }
        _this.logger.debug("husl.0 call success");
    }

    /*
     *    "hpsum.0": "ZegoClient.handlePushStreamUpdateMsg",
     */
    function handlePushStreamUpdateMsg(_this, msg) {
        _this.logger.debug("hpsum.0 call");
        if (!msg.body.stream_info || msg.body.stream_info.length === 0) {
            _this.logger.info("hpsum.0, emtpy list");
            return;
        }

        if (msg.body.stream_info.length + _this.streamSeq !== msg.body.stream_seq) {
            _this.logger.info("hpsum.0 call updatestream");
            fetchStreamList(_this);
            return;
        }

        _this.streamSeq = msg.body.stream_seq;
        switch (msg.body.stream_cmd) {
        case ENUM_STREAM_UPDATE_CMD.added:
            handleAddedStreamList(_this, msg.body.stream_info);
            break;
        case ENUM_STREAM_UPDATE_CMD.deleted:
            handleDeletedStreamList(_this, msg.body.stream_info);
            break;
        case ENUM_STREAM_UPDATE_CMD.updated:
            handleUpdatedStreamList(_this, msg.body.stream_info);
            break;
        }
        _this.logger.debug("hpsum.0 call success");
    }

    /*
     *    "hpk.0": "ZegoClient.handlePushKickout",
     */
    function handlePushKickout(_this, msg) {
        _this.logger.info("hpk.0 call");
        setRunState(_this, ENUM_RUN_STATE.logout);
        resetRoom(_this);

        var err = {
            "code": sdkErrorList.KICK_OUT.code,
            "msg": sdkErrorList.KICK_OUT.msg + msg.body.reason
        };
        _this.onKickOut(err);
        _this.logger.debug("hpk.0 call success");
    }

    /*
     *    "hpus.0": "ZegoClient.handlePushUserStateUpdate"
     */
    function handlePushUserStateUpdateMsg(_this, msg) {
        _this.logger.debug("hpus.0 call");
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hpus.0 not login");
            return;
        }

        if (!_this.userStateUpdate) {
            _this.logger.info("hpus.0 no userStateUpdate flag");
            return;
        }

        if (_this.userSeq + msg.body.user_actions.length !== msg.body.user_list_seq) {
            _this.logger.info("hpus.0 fetch new userlist " + _this.userSeq, +" server " + msg.body.user_list_seq);
            fetchUserList(_this);
            return;
        }

        _this.userSeq = msg.body.user_list_seq;
        _this.logger.debug("hpus.0 push userSeq " + _this.userSeq);

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

        _this.onUserStateUpdate(msg.body.room_id, user_list);
        _this.logger.debug("hpus.0 call success");
    }

    /*
     *    "hfulr.0": "ZegoClient.handleFetchUserListRsp"
     */
    function handleFetchUserListRsp(_this, msg) {
        _this.logger.debug("hfulr.0 call");
        if (msg.body.err_code != 0) {
            _this.userQuerying = false;
            _this.logger.info("hfulr.0 fetch error " + msg.body.err_code);
            return;
        }

        //set userseq
        if (!_this.userStateUpdate) {
            return;
        }

        _this.userTempList.push.apply(_this.userTempList, msg.body.user_baseinfos);

        // _this.logger.debug("hfulr.0 server user_list " + msg.body.user_baseinfos);

        var currentIndex = msg.body.ret_user_index;
        var serverIndex = msg.body.server_user_index;
        if (currentIndex != serverIndex) {
            _this.logger.info("hfulr.0 fetch another page");
            fetchUserListWithPage(currentIndex + 1);
            return;
        }

        _this.userSeq = msg.body.server_user_seq;
        _this.logger.info("hfulr.0 set user Seq " + _this.userSeq);

        var user_list = [];
        for (var i = 0; i < _this.userTempList.length; i++) {
            var user_info = {
                "idName": _this.userTempList[i].id_name,
                "nickName": _this.userTempList[i].nick_name,
                "role": _this.userTempList[i].role
            };

            user_list.push(user_info);
        }

        _this.userQuerying = false;
        _this.onGetTotalUserList(_this.roomid, user_list);
        _this.userTempList = [];

        _this.logger.debug("hfulr.0 call success user_list " + user_list + " count " + user_list.length);
    }

    /*
     *    "hpsm.0": "ZegoClient.handlePushSignalMsg",
     */

    // 连麦信令push
    function handlePushSignalMsg(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hpcm.0 not login");
            return;
        }

        var signalMsg = JSON.parse(msg.body.signal_msg);
        _this.logger.debug("hpcm.0 submsg= ", signalMsg);
        switch (msg.body.sub_cmd) {
        case ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:
            handlePushJoinLiveRequestMsg(_this, signalMsg);
            break;
        case ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:
            handlePushJoinLiveResultMsg(_this, signalMsg);
            break;
        case ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:
            handlePushJoinLiveInviteMsg(_this, signalMsg);
            break;
        case ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:
            handlePushJoinLiveStopMsg(_this, signalMsg);
        }
        _this.logger.debug("hpsm.0 call end");
    }


    /*
     *    "hpjlrm.0": "ZegoClient.handlePushJoinLiveRequestMsg",
     */

    // 请求连麦push
    function handlePushJoinLiveRequestMsg(_this, signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            _this.logger.error("hpjlrm.0 no requestId");
            return;
        }

        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            _this.logger.error("hpjlrm.0 no from user");
            return;
        }
        _this.joinLiveRequestMap[requestId] = dest_id_name;

        _this.logger.info("hpjlrm.0 onRecvJoinLiveRequest " + dest_id_name);
        _this.onRecvJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    }

    /*
     *    "hpjlim.0": "ZegoClient.handlePushJoinLiveInviteMsg",
     */
    function handlePushJoinLiveInviteMsg(_this, signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            _this.logger.error("hpjlim.0 no requestId");
            return;
        }

        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            _this.logger.error("hpjlim.0 no from user");
            return;
        }

        _this.joinLiveRequestMap[requestId] = dest_id_name;

        _this.logger.info("hpjlim.0 onRecvInviteJoinLiveRequest " + dest_id_name);
        _this.onRecvInviteJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    }

    /*
     *    "hpjlrm.0": "ZegoClient.handlePushJoinLiveResultMsg",
     */
    function handlePushJoinLiveResultMsg(_this, signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            _this.logger.error("hpjlrm.0 no requestId");
            return;
        }

        var result = signalMsg.result;
        if (result == undefined) {
            _this.logger.info("hpjlrm.0 no result");
            return;
        }

        var respondResult = result == 1 ? true : false;
        if (_this.joinLiveCallbackMap[requestId]) {
            var result_callback = _this.joinLiveCallbackMap[requestId];
            if (!result_callback) {
                _this.logger.info("hpjlrm.o no callback");
                return;
            }

            _this.logger.info("hpjlrm.0 joinLiveRequest/invite result " + respondResult);
            delete _this.joinLiveCallbackMap[requestId];
            result_callback(respondResult, signalMsg.from_userid, signalMsg.from_username);
        }
    }

    /*
     *    "hpjlsm.0": "ZegoClient.handlePushJoinLiveStopMsg",
     */
    function handlePushJoinLiveStopMsg(_this, signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            _this.logger.error("hpjlsm.0 no requestId");
            return;
        }

        _this.logger.info("hpjlsm.0 onRecvEndJoinLiveCommand " + signalMsg.from_userid);
        _this.onRecvEndJoinLiveCommand(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    }

    /*
     *    "hsur.0": "ZegoClient.handleStreamUpdateRsp",
     */

    //流更新回包
    function handleStreamUpdateRsp(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hsur.0 not login");
            return;
        }

        if (msg.body.err_code != 0) {
            _this.logger.info("hsur.0 stream update error " + msg.body.err_code);
            return;
        }

        _this.logger.debug("hsur.0 stream seq " + _this.streamSeq + " server seq " + msg.body.stream_seq);
        _this.streamSeq = msg.body.stream_seq;

        //流删除时，publishStreamList已经删除了
        for (var i = 0; i < msg.body.stream_info.length; i++) {
            var streamid = msg.body.stream_info[i].stream_id;
            if (!_this.publishStreamList[streamid]) {
                _this.logger.info("hsur.0 stream is not exist");
                return;
            }

            if (_this.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.update_info) {
                _this.publishStreamList[streamid].state = ENUM_PUBLISH_STREAM_STATE.publishing;
                _this.onPublishStateUpdate(0, streamid, 0);
            }
        }

    }

    /*
     *    "htr.0": "ZegoClient.handleTransRsp",
     */

    //trans回包
    function handleTransRsp(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("htr.0 not login");
            return;
        }

        if (msg.body.err_code != 0) {
            _this.logger.info("htr.0 trans send error " + msg.body.err_code);
            return;
        }

        var type = msg.body.trans_type;
        if (!_this.transSeqMap[type]) {
            _this.logger.info("htr.0 cannot match send info");
            return;
        }

        //update seq
        _this.transSeqMap[type].seq = msg.body.trans_seq;
        _this.logger.debug("htr.0 trans " + type + " seq " + msg.body.trans_seq);
    }

    /*
     *    "hftr.0": "ZegoClient.handleTransRsp",
     */

    //fetch trans 回包
    function handleFetchTransRsp(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hftr.0 not login");
            return;
        }

        if (msg.body.err_code != 0) {
            _this.logger.info("hftr.0 trans send error " + msg.body.err_code);
            return;
        }

        var type = msg.body.trans_type;
        var seq = msg.body.trans_seq;
        if (!_this.transSeqMap[type]) {
            _this.transSeqMap[type] = {
                seq: seq
            };
        } else {
            _this.transSeqMap[type].seq = seq;
        }

        if (msg.body.trans_user_idname != _this.idName) {
            _this.onRecvReliableMessage(type, seq, msg.body.trans_data);
        }

        _this.logger.debug("hftr.0 trans " + type + " seq " + seq);
    }

    /*
     *    "hptr.0": "ZegoClient.handleTransRsp",
     */

    //trans push
    function handlePushTransMsg(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hptr.0 not login");
            return;
        }

        var type = msg.body.trans_type;
        var seq = msg.body.trans_seq;
        if (!_this.transSeqMap[type]) {
            _this.transSeqMap[type] = {
                seq: seq
            };
        } else {
            _this.transSeqMap[type].seq = seq;
        }

        if (msg.body.trans_user_idname != _this.idName) {
            _this.onRecvReliableMessage(type, seq, msg.body.trans_data);
        } else {
            _this.logger.debug("hptr.0 receive self trans message");
        }
        _this.logger.debug("hptr.0 trans " + type + " seq " + seq);
    }

    /*
     *    "hpmm.0": "ZegoClient.handlePushMergeMsg",
     */

    //bigIm push
    function handlePushMergeMsg(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hpmm.0 not login");
            return;
        }

        for (var i = 0; i < msg.body.messages.length; i++) {
            if (msg.body.messages[i].sub_cmd === 14001) {
                handlePushBigRooMsg(_this, msg.body.messages[i].msg_body);
            }
        }

        _this.logger.debug("hpmm.0 call success");
    }

    /*
     *    "hpbrm.0": "ZegoClient.handlePushBigRooMsg",
     */
    function handlePushBigRooMsg(_this, bodyString) {

        //messageBody json
        try {
            var messageBody = JSON.parse(bodyString);
        } catch (e) {
            _this.logger.warn("hpbrm.0 parse json error");
            return;
        }

        if (messageBody == undefined) {
            _this.logger.warn("hpbrm.0 cann't find message body");
            return;
        }

        var roomId = messageBody.room_id;
        var pushData = [];
        for (var i = 0; i < messageBody.msg_data.length; i++) {
            var message = messageBody.msg_data[i];
            var idName = message.id_name;
            if (idName == _this.idName) {
                _this.logger.debug("hpbrm.0 self message");
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
            _this.logger.debug("hpbrm.0 no other pushData except self");
        } else {
            _this.onRecvBigRoomMessage(pushData, roomId);
        }

        _this.logger.debug("hpbrm.0 call success");
    }

    /*
     *    "hbmr.0": "ZegoClient.handleTransRsp",
     */

    //bigIm rsp
    function handleBigImMsgRsp(_this, msg) {
        if (_this.runState != ENUM_RUN_STATE.login) {
            _this.logger.info("hbmr.0 not login");
            return;
        }

        if (_this.bigimTimeWindow != msg.body.bigim_time_window) {
            _this.bigimTimeWindow = msg.body.bigim_time_window;
        }

        for (var i = 0; i < msg.body.msgs.length; i++) {
            var clientId = msg.body.msgs[i].bigmsg_client_id;
            var msgId = msg.body.msgs[i].bigmsg_id;
            if (_this.bigImCallbackMap[clientId]) {
                var success = _this.bigImCallbackMap[clientId].success;
                if (success != null) {
                    success(msg.header.seq, msgId);
                }

                delete _this.bigImCallbackMap[clientId];
            }
        }
    }


    /*
     *    "ws.bwsh.0": "ZegoClient.bindWebSocketHandler",
     *    "ws.oc.0": "ZegoClient.onClose",
     *    "ws.oe.0": "ZegoClient.onError",
     */

    // 处理服务端返回的数据，并抛出给用户
    function bindWebSocketHandler(_this) {
        _this.websocket.onmessage = function (e) {

            var msg = JSON.parse(e.data);
            _this.logger.debug("jsonmsg= ", msg.header.cmd);

            if (msg.header.cmd === 'login') {
                handleLoginRsp(_this, msg);
                return;
            }


            if (msg.header.appid !== _this.appid ||
                msg.header.session_id !== _this.sessionid ||
                msg.header.user_id !== _this.userid ||
                msg.header.room_id !== _this.roomid ||
                _this.runState !== ENUM_RUN_STATE.login) {
                _this.logger.info("ws.bwsh.0 check session fail.");
                return;
            }

            //检查消息回包
            handleSendCommandMsgRsp(_this, msg);

            switch (msg.header.cmd) {
            case 'hb':
                handleHeartbeatRsp(_this, msg);
                break;
            case 'logout':
                handleLogoutRsp(_this, msg);
                break;
            case 'custommsg':
                handleSendCustomMsgRsp(_this, msg);
                break;
            case 'stream_info':
                handleFetchStreamListRsp(_this, msg);
                break;
            case 'push_custommsg':
                handlePushCustomMsg(_this, msg);
                break;
            case 'push_stream_update':
                handlePushStreamUpdateMsg(_this, msg);
                break;
            case 'push_kickout':
                handlePushKickout(_this, msg);
                break;
            case 'stream_url':
                break;
            case 'stream_publish':
                break;
            case 'webrtc_url':
                {
                    handleFetchWebRtcUrlRsp(_this, msg);
                }
                break;
            case 'im_chat':
                handleSendRoomMsgRsp(_this, msg);
                break;
            case 'push_im_chat':
                handlePushRoomMsg(_this, msg);
                break;
            case 'push_userlist_update':
                handlePushUserStateUpdateMsg(_this, msg);
                break;
            case 'user_list':
                handleFetchUserListRsp(_this, msg);
                break;
            case 'push_signal':
                handlePushSignalMsg(_this, msg);
                break;
            case 'stream':
                handleStreamUpdateRsp(_this, msg);
                break;
            case 'trans':
                handleTransRsp(_this, msg);
                break;
            case 'trans_fetch':
                handleFetchTransRsp(_this, msg);
                break;
            case 'push_trans':
                handlePushTransMsg(_this, msg);
                break;
            case 'push_merge_message':
                handlePushMergeMsg(_this, msg);
                break;
            }
        };

        /*
           "ws.oc.0":onclose
        */
        _this.websocket.onclose = function (e) {
            _this.logger.info("ws.oc.0 msg=" + JSON.stringify(e));
            if (_this.runState !== ENUM_RUN_STATE.logout) {
                if (_this.runState === ENUM_RUN_STATE.trylogin &&
                    _this.tryLoginCount <= MAX_TRY_LOGIN_COUNT) {
                    //trylogin --> trylogin
                    _this.logger.info("ws.oc.0 is called because of try login");
                } else if (_this.runState === ENUM_RUN_STATE.login) {
                    //login --> trylogin
                    _this.logger.info("ws.oc.0 is called because of network broken, try again");
                    setRunState(_this, ENUM_RUN_STATE.trylogin);
                    resetTryLogin(_this);
                    tryLogin(_this);
                } else {
                    //unknown
                    _this.logger.info("ws.oc.0 out of think!!!");
                    setRunState(_this, ENUM_RUN_STATE.logout);
                    resetRoom(_this);
                    _this.onDisconnect(sdkErrorList.UNKNOWN);
                }

            } else {
                //* --> logout
                _this.logger.info("ws.oc.0 onclose logout flow call websocket.close");
            }
        };

        /*
           "ws.oe.0":onerror
        */
        // websocket发生错误
        _this.websocket.onerror = function (e) {
            _this.logger.info("ws.oe.0 msg=" + JSON.stringify(e));
        };
    }

    // 客户调用的notify函数
    var registerNotifyList = [
        'onDisconnect',
        'onKickOut',
        'onRecvCustomCommand',
        'onStreamUpdated',
        'onStreamExtraInfoUpdated',
        'onPlayStateUpdate',
        'onRecvRoomMsg',
        'onUserStateUpdate',
        'onGetTotalUserList',
        'onPublishStateUpdate',
        'onRecvJoinLiveRequest',
        'onRecvInviteJoinLiveRequest',
        'onRecvEndJoinLiveCommand',
        'onStreamUrlUpdate',
        'onGetAnchorInfo',
        'onPublishQualityUpdate',
        'onPlayQualityUpdate',
        'onRecvReliableMessage',
        'onRecvBigRoomMessage',
        'onVideoSizeChanged',
        'onUpdateOnlineCount'
    ];


    for (var i = 0; i < registerNotifyList.length; i++) {
        ZegoClient.prototype[registerNotifyList[i]] = function () {
        };
    }

    return ZegoClient;

})));
