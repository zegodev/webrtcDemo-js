$(function () {
    var mixStreamId = 'mixwebrtc-'+new Date().getTime();

        $('#mixStream').click(function () {
        var streamList = [{
            streamId: _config.idName,
            top: 0,
            left: 0,
            bottom: 240,  
            right: 320,
        }];
        if (useLocalStreamList.length !== 0) {
          streamList.push({
            streamId: useLocalStreamList[0].stream_id,
            top: 240,
            left: 0,
            bottom: 480,
            right: 320,
          })  
        }    

        zg.updateMixStream({
            outputStreamId: mixStreamId,
            outputUrl: 'rtmp://test.aliyun.zego.im/zegodemo',
            outputBitrate: 300*1000,
            outputFps: 15,
            outputWidth: 320,
            outputHeight: 480,
            streamList: streamList
        }, function (mixStreamId, mixStreamInfo) {
            if (navigator.userAgent.indexOf('iPhone') !== -1 && getBrowser() == 'Safari') {
              hlsUrl = mixStreamInfo[0]['hlsUrls'][0].replace('http', 'https')
              $('#mixVideo')[0].src = hlsUrl
            } else {
              var flvUrl = mixStreamInfo[0]['flvUrls'][0].replace('http', 'https')
                console.log('mixStreamId: ' + mixStreamId);
                console.log('mixStreamUrl:' + flvUrl);
                alert('混流开始。。。')
                if (flvjs.isSupported()) {
                  var flvPlayer = flvjs.createPlayer({
                      type: 'flv',
                      url: flvUrl
                  });
                  flvPlayer.attachMediaElement($('#mixVideo')[0]);
                  flvPlayer.load(); 
                }
            }
            $('#mixVideo')[0].muted = false;
            $('#mixVideo').css('display', '')
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
            $('#mixVideo')[0].src = ''
            $('#mixVideo').css('display', 'none')
        }, function (err) {
            alert('停止混流失败。。。')
            console.log('stopMixStream err: ');
            console.log(err);
        })
    });

    $('#leaveRoom').click(function () {
        leaveRoom();
        $('#mixVideo')[0].src = ''
        $('#mixVideo').css('display', 'none')
    })

});

