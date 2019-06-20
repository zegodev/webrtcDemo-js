

$(function () {

    if ( getBrowser() === 'Chrome' && 'getDisplayMedia' in navigator.mediaDevices !== true) {
      alert ('当前浏览器不支持无插件屏幕共享')
      $('#screenSharing')[0].disabled = true
    }

    function scrennShot(bool) {

      if(IsPC()){

          loginRoom && zg.stopPublishingStream(_config.idName);
          loginRoom && zg.stopPreview(previewVideo);

          var config = {
              externalMediaStream:null,
              width:640,
              height:480,
              frameRate:15,
              bitRate:1000
          };

          getBrowser() === 'Firefox' && zg.startScreenShotFirFox('window',true,function (suc,mediastream) {
              console.log('startScreenShot:'+suc);
              screenCaptrue = suc;
              previewVideo.srcObject = mediastream;
              config.externalMediaStream = mediastream;
              // 推送屏幕可有两种形式，一是作为流媒体直接推送 即下面这种形式
              //另一种是作为externalCapture，前提是需要先将流喂给video标签；，下面chrome推送方式就是这种形式；可任意选择其中之一
              if(loginRoom) {
                  doPreviewPublish(config);
              }
          });

          getBrowser() === 'Chrome' && bool &&zg.startScreenShotChrome(function (suc,mediastream) {
              console.log('startScreenShot:'+suc);
              screenCaptrue = suc;
            // 推送屏幕可有两种形式，一是作为externalCapture，前提是需要先将流喂给video标签；即下面这种形式
            //另一种是作为流媒体直接推送，上面火狐推送方式就是这种形式；可任意选择其中之一
              previewVideo.srcObject = mediastream;
              if(loginRoom) {
                  doPreviewPublish({externalCapture:true});
              }
          })

          getBrowser() === 'Chrome' && !bool && zg.startScreenSharingChrome(false, function (suc,mediastream) {
            console.log('startScreenShot:'+suc);
            screenCaptrue = suc;
            previewVideo.srcObject = mediastream;
            if(loginRoom) {
                doPreviewPublish({externalCapture:true});
            }
          })
      }
    }

    $('#screenShot').click(function () {
      scrennShot(true)
    });

    $('#screenSharing').click(function () {
      scrennShot(false)
    })

    $('#stopScreenShot').click(function () {
        zg.stopScreenShot()
        zg.stopPreview(previewVideo);
        zg.stopPublishingStream(_config.idName);

        doPreviewPublish();
    });

    $('#pushTwoStreams').click(function ()  {

      if(!loginRoom) {
        alert('请先登录房间')
        return
      }

      if(screenCaptrue) {

        var previewConfig = {
          "audio": $('#audioList').val() === '0' ? false : true,
          "audioInput": $('#audioList').val() || null,
          "video": $('#videoList').val() === '0' ? false : true,
          "videoInput": $('#videoList').val() || null,
          "videoQuality": 1,
          "horizontal": true,
          "externalCapture": false,
          "externalMediaStream": null
        }

        idName = 'zego-'+ new Date().getTime()

        var result = zg.startPreview($('#previewVideo2')[0],previewConfig,function () {
          console.log('preview twice success');
          zg.startPublishingStream(idName, $('#previewVideo2')[0])
          //部分浏览器会有初次调用摄像头后才能拿到音频和视频设备label的情况，
          enumDevices();
        },function (err) {
          alert(JSON.stringify(err));
          console.error('preview failed', err);
        })

        if (!result) alert('预览失败！')

      }else {
        alert('请先开启屏幕共享')
      }



    });

    $('#leaveRoom').click(function () {
      console.info('leave room  and close stream');

      if (isPreviewed) {
          zg.stopPreview(previewVideo);
          zg.stopPublishingStream(_config.idName);
          zg.stopPreview($('#previewVideo2')[0]);
          zg.stopPublishingStream(_config.idName);
          isPreviewed = false;
      }

      for (var i = 0; i < useLocalStreamList.length; i++) {
          zg.stopPlayingStream(useLocalStreamList[i].stream_id);
      }

      useLocalStreamList = [];
      $('.remoteVideo').html('');
      zg.logout();
    })

});
