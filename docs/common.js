var zg,
    appid = getParamByName('appid') || 1739272706,
    appSigin = '',
    _config = {
        appid: appid * 1,
        idName:  new Date().getTime() + '',
        nickName: 'u' + new Date().getTime(),
        server: "wss://wsliveroom" + appid + "-api.zego.im:8282/ws",//"wss://wsliveroom-alpha.zego.im:8282/ws",
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
var anchor_userid = '', anchro_username = '';


$(function () {
    console.log('sdk version is', ZegoClient.getCurrentVersion());
    if (ZegoClient.isSupportWebrtc()) {
        ZegoClient.isSupportH264(result => {
            bindEvent();
            if (!result) {
                alert('浏览器不支持视频h264编码，建议使用vp8尝试');
            }
        }, err => {
            console.error(err);
        })
    } else {
        alert('浏览器不支持webrtc，换一个浏览器试试吧');
    }

    desc()

});

function getBrowser() {
    var ua = window.navigator.userAgent;
    var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;
    var isFirefox = ua.indexOf("Firefox") != -1;
    var isOpera = window.opr != undefined;
    var isChrome = ua.indexOf("Chrome") && window.chrome;
    var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
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
    if(!appSigin){
        $.get(_otherConfig.token, {app_id: _config.appid, id_name: _config.idName, cgi_token: _otherConfig.cgi_token},
            function (token) {
                if (!token) {
                    alert('get token failed')
                } else {
                    console.log('gettoken success');
                    startLogin(roomId, token, type)
                }
            }, 'text');

    }else{//get token  前端开发绕过后端，临时获取token方式，需要填写appSign
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
                token = /token:(.+)/.exec(token)&&/token:(.+)/.exec(token)[1]&&/token:(.+)/.exec(token)[1].replace(' ','');

                if (!token) {
                    alert('get token failed')
                } else {
                    console.log('gettoken success');
                    startLogin(roomId,  token, type)
                }
            });
    }
}


//login
function startLogin(roomId, token,type) {
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
    if (streamList.length >= maxNumber) {
        alert('房间太拥挤，换一个吧！');
        leaveRoom();
        return;
    }
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
    zg.startPublishingStream(_config.idName, previewVideo);

}

function play(streamId, video) {
    var result = zg.startPlayingStream(streamId, video);

    video.muted = false;
    if (!result) {
        alert('哎呀，播放失败啦');
        video.style = 'display:none';
        console.error("play " + el.nativeElement.id + " return " + result);

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
        onStreamUpdated: function (type, streamList) {
            if (type == 0) {
                for (var i = 0; i < streamList.length; i++) {
                    console.info(streamList[i].stream_id + ' was added');
                    useLocalStreamList.push(streamList[i]);
                    $('#memberList').append('<option value="' + streamList[i].anchor_id_name + '">' + streamList[i].anchor_nick_name + '</option>');
                    $('.remoteVideo').append($('<video  autoplay muted playsinline></video>'));
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
                            $('#memberList option:eq(' + k + ')').remove();

                            break;
                        }
                    }
                }
            }

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
    zg.logout();
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


}


function bindEvent() {
    previewVideo = $('#previewVideo')[0];

    //初始化sdk
    init();

    $('#createRoom').click(function () {
        zg.setUserStateUpdate(true);
        openRoom($('#roomId').val(), 1);
    });

    $('#openRoom').click(function () {
        openRoom($('#roomId').val(), 2);
    });


    $('#leaveRoom').click(function () {
        leaveRoom();
    });


    //防止，暴力退出（关闭或刷新页面）--最新版本已经内部集成 不再需要
    // var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
    // var eventName = isOnIOS ? "pagehide" : "beforeunload";
    // window.addEventListener(eventName, function (event) {
    //     window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
    //     leaveRoom();
    // });

}


function setConfig(zg) {
    //测试用代码，客户请忽略  start
    if (location.search) {
        let _arr_config = location.search.substr(1).split('&');
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


function desc() {
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
        pageUrl = pageUrl[pageUrl.length-2];

        var descArr = descObj[pageUrl] || [];
        descAtag.setAttribute('data-content', descArr.join(`<br/><br/>`));

        console.log(descObj);
        document.getElementsByTagName('body')[0].appendChild(descAtag);

        $('#descModule').popover({
            html: true
        })
    })
}



