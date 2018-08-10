//预览
function doPreviewPublish(config) {
    var previewConfig = {
        "audio": $('#audioList').val() === '0'? false:true,
        "audioInput":$('#audioList').val()||null ,
        "video":  false,//$('#videoList').val() === '0' ? false:true,
        "videoInput": $('#videoList').val()||null,
        "videoQuality": 2,
        "horizontal": true,
        "externalCapture":false,
        "externalMediaStream":null
    };
    previewConfig = $.extend(previewConfig,config);
    console.log('previewConfig',previewConfig);
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


function loginSuccess(streamList,type) {

    //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
    if (streamList.length >= 4) {
        alert('房间太拥挤，换一个吧！');
        leaveRoom();
        return;
    }

    useLocalStreamList = streamList;

    $('.remoteVideo').html('');
    $('#memberList').html('');
    for(var index=0;index<useLocalStreamList.length;index++){
        $('.remoteVideo').append($('<audio  autoplay muted playsinline controls></audio>') );
        $('#memberList').append('<option value="'+useLocalStreamList[index].anchor_id_name+'">'+useLocalStreamList[index].anchor_nick_name+'</option>');
        play(useLocalStreamList[index].stream_id,$('.remoteVideo audio:eq('+index+')')[0]);
    }
    console.log(`login success`);

    loginRoom = true;

    // 监听sdk回掉
    listen();

    //开始预览本地视频
    type === 1 && doPreviewPublish();

}


function play(streamId, video) {
    var result = zg.startPlayingStream(streamId, video,null,{playType:"audio"});

    video.muted = false;
    if (!result) {
        alert('哎呀，播放失败啦');
        video.style = 'display:none';
        console.error("play " + el.nativeElement.id + " return " + result);

    }
}

