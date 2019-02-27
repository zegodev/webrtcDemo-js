$(function () {
    var mixStreamId = 'mixwebrtc-'+new Date().getTime();

        $('#mixStream').click(function () {
        var streamList = [{
            streamId: _config.idName,
            top: 0,
            left: 0,
            bottom: 320,
            right: 240,
        }];
        useLocalStreamList.forEach(function (stream) {
            streamList.push({
                streamId: stream.stream_id,
                top: 0,
                left: 0,
                bottom: 320,
                right: 240,
            })
        })

        console.log('mixStreamList:' + streamList)
        

        zg.updateMixStream({
            outputStreamId: mixStreamId,
            outputUrl: 'rtmp://test.aliyun.zego.im/zegodemo',
            outputBitrate: 300*1000,
            outputFps: 15,
            outputWidth: 240,
            outputHeight: 320,
            streamList: streamList
        }, function (mixStreamId, mixStreamInfo) {
            console.log('mixStreamId: ' + mixStreamId);
            console.log('mixStreamInfo: ' + JSON.stringify(mixStreamInfo));
            alert('混流开始。。。')
        }, function (err, errorInfo) {
            alert('混流失败。。。')
            console.log('err: ' + JSON.stringify(err));
            console.log('errorInfo: ' + JSON.stringify(errorInfo));
        },);
    });

    $('#stopMixStream').click(function () {
        zg.stopMixStream({
            outputStreamId: mixStreamId
        }, function () {
            alert('停止混流成功。。。')
            console.log('stopMixStream success: ');
        }, function (err) {
            alert('停止混流失败。。。')
            console.log('stopMixStream err: ');
            console.log(err);
        })
    });

});

