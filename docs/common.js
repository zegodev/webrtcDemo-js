var zg,
    appid = getParamByName('appid') || 3536471426, // 必填，应用id，请从 即构管理控制台-https://console.zego.im/acount/register 或邮件中获取
    appSigin = '', // appSigin为即构给客户分配的秘钥，请勿泄漏；（测试环境下是生成token的密码，必填，正式环境需要放到服务端）
    _config = {
        appid: appid * 1,
        idName: new Date().getTime() + '',
        nickName: 'u' + new Date().getTime(),
        server: 'wss://webliveroom3536471426-api.zego.im/ws',//必填，接入服务器地址，请从 即构管理控制台-https://console.zego.im/acount/register 或邮件中获取
        logLevel: 0,
        logUrl: "",
        remoteLogLevel: 0,
        audienceCreateRoom: true
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
    useLocalStreamList = [],
    isPublish = true;
var anchor_userid = '', anchro_username = '';
var publishType

$(function () {
    console.log('sdk version is', ZegoClient.getCurrentVersion());
    // if (ZegoClient.isSupportWebrtc()) {
    //     ZegoClient.isSupportH264(result => {
    //         bindEvent();
    //         if (!result) {
    //             alert('浏览器不支持视频h264编码，建议使用vp8尝试');
    //         }
    //     }, err => {
    //         console.error(err);
    //     })
    // } else {
    //     alert('浏览器不支持webrtc，换一个浏览器试试吧');
    // }
    bindEvent();
    // ZegoClient.supportDetection(function (result) {
    //     console.log(result);
    //     bindEvent();
    // }, function (err) {
    //     alert(err);
    // })

    desc()
});

function getBrowser() {
    var ua = window.navigator.userAgent;
    var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;
    var isFirefox = ua.indexOf("Firefox") != -1;
    var isOpera = window.opr != undefined;
    var isChrome = ua.indexOf("Chrome") && window.chrome;
    var isSafari = (ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1) || ua.indexOf('iPhone') != -1;
    if (isIE) {
        return "IE";
    } else if (isFirefox) {
        return "Firefox";
    } else if (isOpera) {
        return "Opera";
    } else if (isChrome) {
        return "Chrome";
    } else if (isSafari) {
        return "Safari";
    } else {
        return "Unkown";
    }
}


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function enumDevices() {
    var audioInputList = [], videoInputList = [];
    zg.enumDevices(function (deviceInfo) {
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


function getParamByName(key) {
    var search = location.search;

    if (!search || search == '?') return null;
    search = search.replace('?', '');

    var param_arr = search.split('&'), param_map = {};
    param_arr.forEach(function (item) {
        var _key = item.split('=')[0], value = item.split('=')[1];
        param_map[_key] = value;
    });

    return param_map[key];
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

function loginSuccess(streamList, type) {
    var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4

    //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
    // if (streamList.length >= maxNumber) {
    //     alert('房间太拥挤，换一个吧！');
    //     leaveRoom();
    //     return;
    // }
    if ($('#streamID').val()) {
        useLocalStreamList = [{
            anchor_id_name: 'custom',
            stream_id: $('#streamID').val(),
            anchor_nick_name: 'custom'
        }, ...streamList];
    } else {
        useLocalStreamList = streamList;
    }


    $('.remoteVideo').html('');
    $('#memberList').html('');
    for (var index = 0; index < useLocalStreamList.length; index++) {
        $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
        $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
        play(useLocalStreamList[index].stream_id, $('.remoteVideo video:eq(' + index + ')')[0]);
    }
    console.log(`login success`);

    loginRoom = true;


    //开始预览本地视频
    type === 1 && doPreviewPublish();

}

//预览
function doPreviewPublish(config, streamID,video) {
    var quality = ($('#videoQuality') && $('#videoQuality').val()) || 2;

    var previewConfig = {
        "audio": $('#audioList').val() === '0' ? false : true,
        "audioInput": $('#audioList').val() || null,
        "video": $('#videoList').val() === '0' ? false : true,
        "videoInput": $('#videoList').val() || null,
        "videoQuality": quality * 1,
        "horizontal": true,
        "externalCapture": false,
        "externalMediaStream": null,
        "noiseSuppression": $('#ANS').val() === '1',
        "autoGainControl": $('#AGC').val() === '1',
        "echoCancellation": $('#AEC').val() === '1',
        "audioBitRate": $('#audioBitRate').val() * 1,
    };
    previewConfig = $.extend(previewConfig, config);
    console.log('previewConfig', previewConfig);
    publishType = previewConfig.audio == false ? 'Video' : previewConfig.video == false ? 'Audio' : 'all';

    var result = zg.startPreview(video? video: previewVideo, previewConfig, function () {
        console.log('preview success');
        isPreviewed = true;
        !video && $('#previewLabel').html(_config.nickName);
        isPublish && publish(streamID, video);
        //部分浏览器会有初次调用摄像头后才能拿到音频和视频设备label的情况，
        if (!$('#videoList').val() && $('#videoList').val() == 0) {
            enumDevices();
        }
    }, function (err) {
        alert(JSON.stringify(err));
        console.error('preview failed', err);
    });

    if (!result) alert('预览失败！')
}

//推流
function publish(streamID, video) {
    var videoCodeType = $('#videoCodeType').val();
    extraInfo = JSON.stringify({playType: publishType});
    zg.startPublishingStream(streamID? streamID: _config.idName, video? video: previewVideo, extraInfo, {videoDecodeType: videoCodeType ? videoCodeType : 'H264'});

}

function play(streamId, video) {
    var playVideoCodeType = $('#videoPlayCodeType').val()
    var result = zg.startPlayingStream(streamId, video, null, {videoDecodeType: playVideoCodeType ? playVideoCodeType : 'H264', playType: $('#playMode').val()});

    video.muted = false;
    if (!result) {
        alert('哎呀，播放失败啦');
        video.style = 'display:none';
        console.error("play " + streamId + " return " + result);

    }
}


function listen() {
    var _config = {
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
        onPublishStateUpdate: function (type, streamid, error) {
            if (type == 0) {
                console.info(' publish  success');
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
        onDeviceError:function(msg) {
            console.log('设备异常')
            console.log(msg)
        },
        OnAudioDeviceStateChanged:function(msg) {
            console.log('音频设备变更')
            console.log(msg)
        },
        OnVideoDeviceStateChanged:function(msg) {
            console.log('视频设备变更')
            console.log(msg)
        },
        onStreamUpdated: function (type, streamList) {
            if (type == 0) {
                for (var i = 0; i < streamList.length; i++) {
                    console.info(streamList[i].stream_id + ' was added');
                    useLocalStreamList.push(streamList[i]);
                    //$('#memberList').append('<option value="' + streamList[i].anchor_id_name + '">' + streamList[i].anchor_nick_name + '</option>');
                    $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
                    play(streamList[i].stream_id, $('.remoteVideo video:last-child')[0]);
                }

            } else if (type == 1) {

                for (var k = 0; k < useLocalStreamList.length; k++) {

                    for (var j = 0; j < streamList.length; j++) {

                        if (useLocalStreamList[k].stream_id === streamList[j].stream_id) {

                            zg.stopPlayingStream(useLocalStreamList[k].stream_id);

                            console.info(useLocalStreamList[k].stream_id + 'was devared');

                            useLocalStreamList.splice(k, 1);

                            $('.remoteVideo video:eq(' + k + ')').remove();
                            //$('#memberList option:eq(' + k + ')').remove();

                            break;
                        }
                    }
                }
            }

        },

        onScreenSharingEnded: function() {
            console.warn('screen sharing end')
        },

        onSoundLevelUpdate(result) {
          result.forEach(stream => {
            console.warn(stream.streamID, Math.round(stream.soundLevel), stream.type)
          })
        },

        onRemoteCameraStatusUpdate(streamID, status) {
          console.warn(streamID, 'camera status: ' + status);
        },
        onRemoteMicStatusUpdate(streamID, status) {
          console.warn(streamID, 'mic status: ' + status);
        }
    };

    for (var key in _config) {
        zg[key] = _config[key]
    }

    if (typeof listenChild === 'function') {
        listenChild();
    }

}


function leaveRoom() {
    console.info('leave room  and close stream');

    if (isPreviewed) {
        zg.stopPreview(previewVideo);
        zg.stopPublishingStream(_config.idName);
        isPreviewed = false;
    }

    for (var i = 0; i < useLocalStreamList.length; i++) {
        zg.stopPlayingStream(useLocalStreamList[i].stream_id);
    }

    useLocalStreamList = [];
    $('.remoteVideo').html('');
    $('.chatBox-content-demo').html('');
    $('.chat-message-num').text(0)
    $('.screenShareVideos').html('')
    $('#memberList').html('')
    zg.logout();
    isPublish = true;
    loginRoom = false;
}


function init() {

    zg = new ZegoClient();

    //内调测试用代码，客户请忽略  start
    setConfig(zg);
    //内调测试用代码，客户请忽略  end

    zg.config(_config);
    enumDevices();

    // 监听sdk回掉
    listen();

    zg.setSoundLevelDelegate(true, 1000);
}


function bindEvent() {
    previewVideo = $('#previewVideo')[0];

    //初始化sdk
    init();

    $('#createRoom').click(function () {
        $('#signalUrl').val() && zg.setCustomSignalUrl($('#signalUrl').val())
        zg.setUserStateUpdate(true);
        openRoom($('#roomId').val(), 1);
    });

    $('#openRoom').click(function () {
        openRoom($('#roomId').val(), 2);
    });


    $('#leaveRoom').click(function () {
        leaveRoom();
    });

    $('#switchVideo').click(function () {
        zg.switchDevice('video', $('#previewVideo')[0], $('#videoList').val(), function () {
            console.warn('switch camera success')
        }, function (err) {
            console.error(err)
        })
    });

    $('#switchAudio').click(function () {
        zg.switchDevice('audio', $('#previewVideo')[0], $('#audioList').val(), function () {
            console.warn('switch audio success')
        }, function (err) {
            console.error(err)
        })
    })

    $('#createRoomNoPublish').click(function () {
        isPublish = false;
        openRoom($('#roomId').val(), 1);
    })

    $('#toggleCamera').click(function() {
        zg.enableCamera(previewVideo, $(this).hasClass('disabled'));
        $(this).toggleClass('disabled');
    });

    $('#toggleSpeaker').click(function() {
        zg.enableMicrophone(previewVideo, $(this).hasClass('disabled'));
        $(this).toggleClass('disabled');
    });

    $('#publishStream').click(function() {
      isPreviewed && zg.startPublishingStream(_config.idName, previewVideo);
    })

    $('#stopPublish').click(function() {
      zg.stopPublishingStream(_config.idName);
    })

    //防止，暴力退出（关闭或刷新页面）--最新版本已经内部集成 不再需要
    // var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
    // var eventName = isOnIOS ? "pagehide" : "beforeunload";
    // window.addEventListener(eventName, function (event) {
    //     window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
    //     leaveRoom();
    // });

}

function onDeviceReady() {
    var permissions = cordova.plugins.permissions;
    permissions.checkPermission(permissions.CAMERA, function (status) {
        if (status.hasPermission) {
            console.log("Yes :D ");
        } else {
            console.warn("No :( ");
        }
    });
    permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO], function (status) {
        console.log("requestPermissions: ", status);
    }, function (err) {
        console.error("requestPermissions: ", err);
    })
}


function setConfig(zg) {
    //测试用代码，客户请忽略  start
    if (location.search) {
        var _arr_config = location.search.substr(1).split('&');
        _arr_config.forEach(function (item) {
            var key = item.split('=')[0], value = item.split('=')[1];

            if (value && _config.hasOwnProperty(key)) {
                _config[key] = decodeURIComponent(value);
            } else if (value && _otherConfig.hasOwnProperty(key)) {
                _otherConfig[key] = decodeURIComponent(value);
            }
        });
    }
    //测试用代码，客户请忽略  end


    console.log("config param:" + JSON.stringify(_config));

    _config.appid = _config.appid * 1;
    _config.testEnvironment = !!(_config.testEnvironment * 1);

    //测试用代码，客户请忽略  start
    if (_otherConfig.signal) {
        zg.setCustomSignalUrl(_otherConfig.signal);
    }

    if (_otherConfig.cgi_token && _otherConfig.token == 'https://wsliveroom-demo.zego.im:8282/token') {
        $.get(_otherConfig.cgi_token, function (cgi_token) {
            _otherConfig.cgi_token = cgi_token.data;
            console.log(_otherConfig.cgi_token);
        })
    }
    //测试用代码，客户请忽略  end
}

function addCssByLink(url) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(link);
    else
        doc.documentElement.appendChild(link);
}

function loadJs(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            script.onload = function () {
                callback();
            }
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

function desc() {
    addCssByLink('../assets/desc.css');

    loadJs('../assets/desc.js', function () {
        var descAtag = document.createElement('a');
        descAtag.setAttribute('id', 'descModule');
        descAtag.setAttribute('role', 'button');
        descAtag.setAttribute('tabindex', '0');
        // descAtag.setAttribute('data-trigger', 'focus');
        descAtag.setAttribute('data-toggle', 'popover');
        descAtag.setAttribute('title', '调用说明');

        var pageUrl = location.pathname.split('/');
        pageUrl = pageUrl[pageUrl.length - 2];
        var descArr = descObj[pageUrl] || [];
        descAtag.setAttribute('data-content', descArr.join(`<br/><br/>`));

        console.log(descObj);
        document.getElementsByTagName('body')[0].appendChild(descAtag);

        $('#descModule').popover({
            html: true
        })
    })
}


function addCssByLink(url) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(link);
    else
        doc.documentElement.appendChild(link);
}

function loadJs(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            script.onload = function () {
                callback();
            }
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

function desc() {
    addCssByLink('../assets/desc.css');
    loadJs('../assets/desc.js', function () {
        var descAtag = document.createElement('a');
        descAtag.setAttribute('id', 'descModule');
        descAtag.setAttribute('role', 'button');
        descAtag.setAttribute('tabindex', '0');
        // descAtag.setAttribute('data-trigger', 'focus');
        descAtag.setAttribute('data-toggle', 'popover');
        descAtag.setAttribute('title', '调用说明');

        var pageUrl = location.pathname.split('/');
        pageUrl = pageUrl[pageUrl.length - 2];

        var descArr = descObj[pageUrl] || [];
        descAtag.setAttribute('data-content', descArr.join(`<br/><br/>`));

        console.log(descObj);
        document.getElementsByTagName('body')[0].appendChild(descAtag);

        $('#descModule').popover({
            html: true
        })
    })
}

// cordova test
(function cordovaLoad() {
    if (location.search && location.search.indexOf('platform=cordova') > -1) {
        loadJs('../assets/cordova.js');
        document.addEventListener('deviceready', function () {
            var permissions = cordova.plugins.permissions;
            permissions.checkPermission(permissions.CAMERA, function (status) {
                if (status.hasPermission) {
                    console.log("Yes :D ");
                } else {
                    permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO], function (status) {
                        console.log("requestPermissions: ", status);
                    }, function (err) {
                        console.error("requestPermissions: ", err);
                    })
                    console.warn("No :( ");
                }
            });
        }, false);
    }
})();


