var videoDecodeType = null, playStreamList = [];
var zg,
    appid = 96527232,
    appSigin = '0x51,0xf9,0x60,0x56,0x5e,0xa6,0xb2,0xe1,0x3a,0x8b,0x25,0x27,0x15,0xa0,0x91,0xec,0xce,0xdc,0x87,0xf3,0x3e,0xd3,0x08,0x46,0x22,0xb1,0xb7,0xe9,0xda,0xc9,0x16,0xc3',
    _config = {
        appid: appid * 1,
        idName: new Date().getTime() + '',
        nickName: 'u' + new Date().getTime(),
        server: "wss://wsliveroom-alpha.zego.im:8282/ws",//"wss://wsliveroom-alpha.zego.im:8282/ws",
        logLevel: 0,
        logUrl: "",
        remoteLogLevel: 0,
        audienceCreateRoom: true,
        testEnvironment: false,
    },
    _otherConfig = {
        cgi_token: '',
        roomlist: '',
        signal: '',
        token: "https://wsliveroom-demo.zego.im:8282/token"//"https://wsliveroom"+appid+"-api.zego.im:8282/token",
    },

    loginRoom = false,
    previewVideo,
    screenCaptrue,
    isPreviewed = false,
    useLocalStreamList = [];
_config.MixIdName = 'Mix' + _config.idName;
var anchor_userid = '', anchro_username = '';

$(function () {
    console.log('sdk version is', ZegoClient.getCurrentVersion());

    ZegoClient.supportVideoCodeType(function ({H264, VP8}) {
        videoDecodeType = VP8 ? 'VP8' : (H264 ? 'H264' : null);
        $("#videoCodeType option:eq(0)").val(videoDecodeType);

        !H264 && $("#videoCodeType option:eq(1)").attr('disabled', "disabled");
        !VP8 && $("#videoCodeType option:eq(2)").attr('disabled', "disabled");
        bindEvent();
    }, function () {
        alert('没有可用视频编码')
    });
});

function bindEvent() {
    previewVideo = $('#previewVideo')[0];

    //初始化sdk
    init();

    $('#createRoom').click(function () {
        zg.setUserStateUpdate(true);
        if ($("#videoCodeType").val()) {
            videoDecodeType = $("#videoCodeType").val();
        }
        openRoom($('#roomId').val(), 1);
    });

    $('#openRoom').click(function () {
        if ($("#videoCodeType").val()) {
            videoDecodeType = $("#videoCodeType").val();
        }
        openRoom($('#roomId').val(), 2);
    });


    $('#leaveRoom').click(function () {
        leaveRoom();
    });

    $('#startLive').click(function () {
        if ($("#videoCodeType").val()) {
            videoDecodeType = $("#videoCodeType").val();
        }
        if (loginRoom) {
            doPreviewPublish()
        } else {
            alert('请先点击进入房间')
        }
    })

    //防止，暴力退出（关闭或刷新页面）--最新版本已经内部集成 不再需要
    // var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
    // var eventName = isOnIOS ? "pagehide" : "beforeunload";
    // window.addEventListener(eventName, function (event) {
    //     window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
    //     leaveRoom();
    // });

}

function init() {

    zg = new ZegoClient();

    zg.config(_config);
    enumDevices();

    // 监听sdk回掉
    listenChild();


}

function openRoom(roomId, type) {

    if (!roomId) {
        alert('请输入房间号');
        return;
    }

    screenCaptrue && zg.stopScreenShot();


    //get token   生产环境下获取token方式
    if (!appSigin) {
        $.get(_otherConfig.token, {app_id: _config.appid, id_name: _config.idName, cgi_token: _otherConfig.cgi_token},
            function (token) {
                if (!token) {
                    alert('get token failed')
                } else {
                    console.log('gettoken success');
                    startLogin(roomId, token, type)
                }
            }, 'text');

    } else {//get token  前端开发绕过后端，临时获取token方式，需要填写appSign
        var now = new Date().getTime();
        $.get('https://sig-wstoken.zego.im:8282/tokenverify',
            {
                app_id: _config.appid,
                id_name: _config.idName,
                app_secret: appSigin,
                nonce: now,
                expired: Math.floor(now / 1000 + 30 * 60)
            },
            function (token) {
                token = /token:(.+)/.exec(token) && /token:(.+)/.exec(token)[1] && /token:(.+)/.exec(token)[1].replace(' ', '');

                if (!token) {
                    alert('get token failed')
                } else {
                    console.log('gettoken success');
                    startLogin(roomId, token, type)
                }
            });
    }
}


//login
function startLogin(roomId, token, type) {
    zg.login(roomId, type, token, function (streamList) {
        console.log('login success');
        loginSuccess(streamList, type);
    }, function (err) {
        loginFailed(err);
    })
}

function loginFailed(err) {
    alert('登录失败');
    console.error(err)

}


function enumDevices() {
    var audioInputList = [], videoInputList = [];
    zg.enumDevices(deviceInfo => {
        console.log('enumDevices' + JSON.stringify(deviceInfo));
        if (deviceInfo.microphones) {
            for (var i = 0; i < deviceInfo.microphones.length; i++) {

                if (!deviceInfo.microphones[i].label) {
                    deviceInfo.microphones[i].label = 'microphone' + i;
                }
                audioInputList.push(' <option value="' + deviceInfo.microphones[i].deviceId + '">' + deviceInfo.microphones[i].label + '</option>');
                console.log("microphone: " + deviceInfo.microphones[i].label);
            }
        }

        if (deviceInfo.cameras) {
            for (var i = 0; i < deviceInfo.cameras.length; i++) {
                if (!deviceInfo.cameras[i].label) {
                    deviceInfo.cameras[i].label = 'camera' + i;
                }
                videoInputList.push('<option value="' + deviceInfo.cameras[i].deviceId + '">' + deviceInfo.cameras[i].label + '</option>');
                console.log("camera: " + deviceInfo.cameras[i].label);
            }
        }

        audioInputList.push(' <option value="0">禁止</option>');
        videoInputList.push('<option value="0">禁止</option>');

        $('#audioList').html(audioInputList.join(''));
        $('#videoList').html(videoInputList.join(''));
    }, function (error) {
        console.error("enum device error: " + error);
    });
}


function loginSuccess(streamList, type) {
    var maxNumber = 4;

    //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
    if (streamList.length >= maxNumber) {
        alert('房间太拥挤，换一个吧！');
        leaveRoom();
        return;
    }

    useLocalStreamList = streamList;

    $('.remoteVideo').html('');
    $('#memberList').html('');
    for (var index = 0; index < useLocalStreamList.length; index++) {
        $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
        $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
        var extraInfo = useLocalStreamList[index].extra_info, streamId = useLocalStreamList[index].stream_id;
        if (extraInfo) {
            extraInfo = JSON.parse(extraInfo);
            if (extraInfo.currentVideoCode !== videoDecodeType) {
                streamId = extraInfo.MixStreamId;
                extraInfo.currentVideoCode = videoDecodeType;
            }
        }
        play(streamId, $('.remoteVideo video:eq(' + index + ')')[0], extraInfo.currentVideoCode);
    }
    console.log(`login success`);

    loginRoom = true;


    //开始预览本地视频
    type === 1 && doPreviewPublish();

}

//推流 + 混流转码
function listenChild() {
    var listens = {
        onPublishStateUpdate: function (type, streamid, error) {
            if (type == 0) {
                console.info(' publish  success');
                mixStream();
            } else if (type == 2) {
                console.info(' publish  retry');
            } else {
                console.error('publish error ' + error.msg);
                var _msg = error.msg;
                if (error.msg.indexOf('server session closed, reason: ') > -1) {
                    var code = error.msg.replace('server session closed, reason: ', '');
                    if (code == 21) {
                        _msg = '音频编解码不支持(opus)';
                    } else if (code == 22) {
                        _msg = '视频编解码不支持(H264)'
                    } else if (code == 20) {
                        _msg = 'sdp 解释错误';
                    }
                }
                alert('推流失败,reason = ' + _msg);
            }
        },
        onStreamUpdated: function (type, streamList) {
            if (type == 0) {
                for (var i = 0; i < streamList.length; i++) {
                    console.info(streamList[i].stream_id + ' was added');
                    useLocalStreamList.push(streamList[i]);
                    $('#memberList').append('<option value="' + streamList[i].anchor_id_name + '">' + streamList[i].anchor_nick_name + '</option>');
                    $('.remoteVideo').append($('<video  autoplay muted playsinline></video>'));
                    var extraInfo = streamList[i].extra_info, streamId = streamList[i].stream_id;
                    if (extraInfo) {
                        extraInfo = JSON.parse(extraInfo);
                        if (extraInfo.currentVideoCode !== videoDecodeType) {
                            streamId = extraInfo.MixStreamId;
                            extraInfo.currentVideoCode = videoDecodeType;
                            setTimeout(function () {
                                play(streamId, $('.remoteVideo video:last-child')[0], extraInfo.currentVideoCode);
                            }, 2000);
                        } else {
                            play(streamId, $('.remoteVideo video:last-child')[0], extraInfo.currentVideoCode);
                        }
                    }

                }

            } else if (type == 1) {

                for (var k = 0; k < useLocalStreamList.length; k++) {

                    for (var j = 0; j < streamList.length; j++) {

                        if (useLocalStreamList[k].stream_id === streamList[j].stream_id) {


                            var extraInfo = streamList[j].extra_info, streamId = streamList[j].stream_id;
                            if (extraInfo) {
                                extraInfo = JSON.parse(extraInfo);
                                if (extraInfo.currentVideoCode !== videoDecodeType) {
                                    streamId = extraInfo.MixStreamId
                                }
                            }
                            zg.stopPlayingStream(streamId);

                            console.info(streamId + 'was devared');

                            useLocalStreamList.splice(k, 1);

                            $('.remoteVideo video:eq(' + k + ')').remove();
                            $('#memberList option:eq(' + k + ')').remove();

                            break;
                        }
                    }
                }
            }

        },
        onPlayStateUpdate: function (type, streamid, error) {
            if (type == 0) {
                console.info('play  success');
            } else if (type == 2) {
                console.info('play retry');
            } else {

                console.error("play error " + error.msg);

                var _msg = error.msg;
                if (error.msg.indexOf('server session closed, reason: ') > -1) {
                    var code = error.msg.replace('server session closed, reason: ', '');
                    if (code == 21) {
                        _msg = '音频编解码不支持(opus)';
                    } else if (code == 22) {
                        _msg = '视频编解码不支持(H264)'
                    } else if (code == 20) {
                        _msg = 'sdp 解释错误';
                    }
                }
                alert('拉流失败,reason = ' + _msg);
            }

        },
        onPublishQualityUpdate: function (streamid, quality) {
            console.info("#" + streamid + "#" + "publish " + " audio: " + quality.audioBitrate + " video: " + quality.videoBitrate + " fps: " + quality.videoFPS);
        },
        onPlayQualityUpdate: function (streamid, quality) {
            console.info("#" + streamid + "#" + "play " + " audio: " + quality.audioBitrate + " video: " + quality.videoBitrate + " fps: " + quality.videoFPS);
        },
        onDisconnect: function (error) {
            console.error("onDisconnect " + JSON.stringify(error));
            alert('网络连接已断开' + JSON.stringify(error));
            leaveRoom();
        },
        onKickOut: function (error) {
            console.error("onKickOut " + JSON.stringify(error));
        },
    };
    for (var key in listens) {
        zg[key] = listens[key];
    }
}

//预览
function doPreviewPublish(config) {
    var quality = ($('#videoQuality') && $('#videoQuality').val()) || 2;

    var previewConfig = {
        "audio": $('#audioList').val() === '0' ? false : true,
        "audioInput": $('#audioList').val() || null,
        "video": $('#videoList').val() === '0' ? false : true,
        "videoInput": $('#videoList').val() || null,
        "videoQuality": quality * 1,
        "horizontal": true,
        "externalCapture": false,
        "externalMediaStream": null
    };
    previewConfig = $.extend(previewConfig, config);
    console.log('previewConfig', previewConfig);
    var result = zg.startPreview(previewVideo, previewConfig, function () {
        console.log('preview success');
        isPreviewed = true;
        $('#previewLabel').html(_config.nickName);
        publish();
        //部分浏览器会有初次调用摄像头后才能拿到音频和视频设备label的情况，
        if (!$('#videoList').val() && $('#videoList').val() != 0) {
            enumDevices();
        }
    }, function (err) {
        alert(JSON.stringify(err));
        console.error('preview failed', err);
    });

    if (!result) alert('预览失败！')
}


//推流
function publish() {
    var extraInfo = {currentVideoCode: videoDecodeType, MixStreamId: _config.MixIdName};
    if (videoDecodeType) {
        zg.startPublishingStream(_config.idName, previewVideo, JSON.stringify(extraInfo), {videoDecodeType: videoDecodeType});
    } else {
        alert('没有可用视频编码')
    }
}


function mixStream() {
    var outputBitrate = $('#mixStreamBitrate').val();
    var streamList = [{
        streamId: _config.idName,
        top: 0,
        left: 0,
        bottom: 640,
        right: 480,
    }];
    var mixParam = {
        outputStreamId: _config.MixIdName,
        outputBitrate: outputBitrate ? outputBitrate * 1 : 800,
        outputFps: 15,
        outputHeight: 640,
        outputWidth: 480,
        outputAudioConfig: videoDecodeType !== 'VP8' ? 3 : 0,
        streamList: streamList,
        extraParams: [{key: 'video_encode', value: videoDecodeType === 'VP8' ? 'h264' : 'vp8'}]
    };
    console.log('mixParam', mixParam);
    zg.updateMixStream(mixParam, function (mixStreamId, mixStreamInfo) {
        console.log('mixStreamId: ' + mixStreamId);
        console.log('mixStreamInfo: ' + JSON.stringify(mixStreamInfo));
    }, function (err, errorInfo) {
        console.log('err: ' + JSON.stringify(err));
        console.log('errorInfo: ' + JSON.stringify(errorInfo));
    });
}

function leaveRoom() {
    console.info('leave room  and close stream');

    if (isPreviewed) {
        zg.stopPreview(previewVideo);
        zg.stopPublishingStream(_config.idName);
        isPreviewed = false;
        zg.stopMixStream({
            outputStreamId: 'Mix' + _config.idName,
        }, function () {
            console.log('stopMixStream success: ');
        }, function (err) {
            console.log('stopMixStream err: ');
            console.log(err);
        })
    }

    for (var i = 0; i < playStreamList.length; i++) {
        zg.stopPlayingStream(useLocalStreamList[i]);
    }

    useLocalStreamList = [];
    playStreamList = [];

    $('.remoteVideo').html('');
    $('.chatBox-content-demo').html('');
    $('.chat-message-num').text(0)
    zg.logout();
    loginRoom = false;
}

function play(streamId, video, videoCode) {
    playStreamList.push(streamId);
    console.log('play:streamId, videoCode', streamId, videoCode)
    var result = zg.startPlayingStream(streamId, video, null, {videoDecodeType: videoCode});

    video.muted = false;
    if (!result) {
        alert('哎呀，播放失败啦');
        video.style = 'display:none';
        console.error("play " + el.nativeElement.id + " return " + result);

    }
}
