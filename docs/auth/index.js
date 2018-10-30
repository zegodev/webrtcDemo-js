var  thirdToken = '';


function getTirdToken(callBack) {
    $.get($('#thirdTokenUrl').val(),{
       app_id:_config.appid,
       id_name:_config.idName
    } ,function (response, status, xhr) {
        callBack(response, status, xhr);
    })
}


//覆盖公有中的 startLogin
function startLogin(roomId, token, type) {

    thirdToken = $('#thirdToken').val();

    if(!thirdToken && $('#thirdTokenUrl').val()){
        getTirdToken(function (response) {
            thirdToken = response;
            doStartLogin(roomId, token, type);
        });
    }else{
        thirdToken = thirdToken;
        doStartLogin(roomId, token, type);
    }

}


function  doStartLogin(roomId, token, type){
    zg.loginWithAuthor(roomId, type, token,thirdToken, function (streamList) {
        console.log('login success');
        loginSuccess(streamList, type);
    }, function (err) {
        loginFailed(err);
    })
}

//预览
function doPreviewPublish(config) {
    var previewConfig = {
        "audio": $('#audioList').val() === '0' ? false : true,
        "audioInput": $('#audioList').val() || null,
        "video": $('#videoList').val() === '0' ? false:true,
        "videoInput": $('#videoList').val() || null,
        "videoQuality": 2,
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
        enumDevices();
    }, function (err) {
        console.error('preview failed', err);
    });

    if (!result) alert('预览失败！')
}




function loginSuccess(streamList, type) {

    //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
    if (streamList.length >= 4) {
        alert('房间太拥挤，换一个吧！');
        leaveRoom();
        return;
    }

    useLocalStreamList = streamList;

    $('.remoteVideo').html('');
    $('#memberList').html('');
    for (var index = 0; index < useLocalStreamList.length; index++) {
        $('.remoteVideo').append($('<audio  autoplay muted playsinline controls></audio>'));
        $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
        play(useLocalStreamList[index].stream_id, $('.remoteVideo audio:eq(' + index + ')')[0]);
    }
    console.log(`login success`);

    loginRoom = true;

    // 监听sdk回掉
    listen();

    //开始预览本地视频
    type === 1 && doPreviewPublish();

}





/***
 *
 *
 * 下面几个方法是重点，对于有鉴权需求的，前端需要做类似以下操作
 * 1 获取鉴权token信息（客户自己实现，具体规则请咨询即构科技）
 * 2 在推拉流方法的最后一个参数传入第一步获取到的信息
 * ****/



function play(streamId, video) {

    if($('#authTokenUrl').val()){
        getToken(streamId,true,function (rsp, status, xhr) {
            var result = zg.startPlayingStream(streamId, video, null,
                {
                    playType: "audio",
                    streamParams:`expired=${rsp.expired}&nonce=${rsp.nonce}&token=${rsp.token}`
                }
            );

            video.muted = false;
            if (!result) {
                alert('哎呀，播放失败啦');
                video.style = 'display:none';
                console.error("play " + el.nativeElement.id + " return " + result);

            }
        })
    }else{
        var result = zg.startPlayingStream(streamId, video);

        video.muted = false;
        if (!result) {
            alert('哎呀，播放失败啦');
            video.style = 'display:none';
            console.error("play " + el.nativeElement.id + " return " + result);

        }
    }

}


//推流
function publish() {
    if($('#authTokenUrl').val()){
        getToken(_config.idName,false,function (rsp, status, xhr) {
            zg.startPublishingStream(_config.idName, previewVideo,null,{
                streamParams:`zg_expired=${rsp.zg_expired}&zg_nonce=${rsp.zg_nonce}&zg_token=${rsp.zg_token}`
            });
        });
    }else{
        zg.startPublishingStream(_config.idName, previewVideo);
    }

}


//该接口只是示范demo,具体请根据自身接口调整
function getToken(streamID, ispull,callBack) {
    $.get($('#authTokenUrl').val(), {
        app: $('#authNode').val(),
        stream: streamID,
        public: ispull ? '0' : '1'
    }, function (response, status, xhr) {
        callBack(response, status, xhr);
    })
}
