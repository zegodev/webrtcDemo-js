

$(function () {

    if ( getBrowser() === 'Chrome' && 'getDisplayMedia' in navigator.mediaDevices !== true) {
      alert ('当前浏览器不支持无插件屏幕共享')
      $('#screenSharing')[0].disabled = true
    }

    function scrennShot(bool, streamID, video) {

      if(IsPC()){

          // loginRoom && zg.stopPublishingStream(_config.idName);
          // loginRoom && zg.stopPreview(previewVideo);

          if ($('#screenWidth').val() == '' || $('#screenHeight').val() == '') {
            alert('请输入正确的宽高');
            return;
          }

          let width = $('#screenWidth').val() * 1;
          let height = $('#screenHeight').val() * 1;

          let screenHasAudio = $('#screenHasAudio') === 0 ? false : true;

          if (isNaN(width) || isNaN(height)) {
            alert('width and height must be number');
            return;
          }

          var config = {
              externalMediaStream:null,
              width:640,
              height:480,
              frameRate:15,
              bitRate:$('#screenBitRate').val() * 1
          };

          getBrowser() === 'Firefox' && zg.startScreenShotFirFox({frameRate: $('#screenFrameRate').val() * 1}, 'window',true,function (suc,mediastream) {
              console.log('startScreenShot:'+suc);
              screenCaptrue = suc;
              video.srcObject = mediastream;
              config.externalMediaStream = mediastream;
              // 推送屏幕可有两种形式，一是作为流媒体直接推送 即下面这种形式
              //另一种是作为externalCapture，前提是需要先将流喂给video标签；，下面chrome推送方式就是这种形式；可任意选择其中之一
              if(suc && loginRoom && mediastream) {
                  doPreviewPublish(config, streamID, video);
              }
          });

          getBrowser() === 'Chrome' && !bool && zg.startScreenSharing({
            width: width < 320? 320: $('#screenWidth').val() * 1,
            height: height < 240? 240: $('#screenHeight').val() * 1,
            frameRate: $('#screenFrameRate').val() * 1
          }, screenHasAudio, function (suc,mediastream) {
            console.warn('startScreenShot:'+suc);
            screenCaptrue = suc;
            video.srcObject = mediastream;
            config.externalMediaStream = mediastream;
            if(suc && loginRoom && mediastream) {
                doPreviewPublish(config, streamID, video);
            }
          })

          getBrowser() === 'Chrome' && bool &&zg.startScreenShotChrome(function (suc,mediastream) {
            console.log('startScreenShot:'+suc);
            screenCaptrue = suc;
          // 推送屏幕可有两种形式，一是作为externalCapture，前提是需要先将流喂给video标签；即下面这种形式
          //另一种是作为流媒体直接推送，上面火狐推送方式就是这种形式；可任意选择其中之一
            suc && (video.srcObject = mediastream);
            if(suc && loginRoom && mediastream) {
                doPreviewPublish({externalCapture:true}, streamID, video);
            }
        })
      }
    }

    $('#screenShot').click(function () {
      $('.screenShareVideos').append($(`<video id="${new Date().getTime()}" autoplay muted playsinline controls></video>`));
      scrennShot(true, $('.screenShareVideos video:last-child')[0].id, $('.screenShareVideos video:last-child')[0])
    });

    $('#screenSharing').click(function () {
      $('.screenShareVideos').append($(`<video id="${new Date().getTime()}" autoplay muted playsinline controls></video>`));
      scrennShot(false, $('.screenShareVideos video:last-child')[0].id, $('.screenShareVideos video:last-child')[0])
    })

    $('#stopScreenShot').click(function () {
        $('.screenShareVideos video').each((ind, video) => {
          zg.stopScreenShot(video.srcObject)
          zg.stopPreview(video);
          zg.stopPublishingStream(video.id);
        })
        $('.screenShareVideos').html('')

        //loginRoom && doPreviewPublish();
    });

    // $('#pushTwoStreams').click(function ()  {

    //   if(!loginRoom) {
    //     alert('请先登录房间')
    //     return
    //   }

    //   if(screenCaptrue) {

    //     var previewConfig = {
    //       "audio": $('#audioList').val() === '0' ? false : true,
    //       "audioInput": $('#audioList').val() || null,
    //       "video": $('#videoList').val() === '0' ? false : true,
    //       "videoInput": $('#videoList').val() || null,
    //       "videoQuality": 1,
    //       "horizontal": true,
    //       "externalCapture": false,
    //       "externalMediaStream": null
    //     }

    //     idName = 'zego-'+ new Date().getTime()

    //     var videoCodeType = $('#videoCodeType').val();
    //     var result = zg.startPreview($('#previewVideo2')[0],previewConfig,function () {
    //       console.log('preview twice success');
    //       zg.startPublishingStream(idName, $('#previewVideo2')[0], null, {videoDecodeType: videoCodeType ? videoCodeType : 'H264'})
    //       //部分浏览器会有初次调用摄像头后才能拿到音频和视频设备label的情况，
    //       enumDevices();
    //     },function (err) {
    //       alert(JSON.stringify(err));
    //       console.error('preview failed', err);
    //     })

    //     if (!result) alert('预览失败！')

    //   }else {
    //     alert('请先开启屏幕共享')
    //   }



    // });

    $('#leaveRoom').click(function () {
      $('#stopScreenShot').click()
    })

});
