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

function publish() {
  zg.startPublishingStream(_config.idName, previewVideo, '{"playType":"audio"}')
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
        play(useLocalStreamList[index].stream_id, $('.remoteVideo audio:eq('+index+')')[0], useLocalStreamList[index].extra_info || '');
    }
    console.log(`login success`);

    loginRoom = true;

    // 监听sdk回掉
    listen();

    //开始预览本地视频
    type === 1 && doPreviewPublish();

}

function listen() {
  var _config = {
      onPlayStateUpdate: function (type, streamid, error) {
          if (type == 0) {
              console.info('play  success');
          }
          else if (type == 2) {
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
                  $('.remoteVideo').append($('<audio  autoplay muted playsinline controls></audio>'));
                  play(useLocalStreamList[index].stream_id, $('.remoteVideo audio:eq('+index+')')[0], useLocalStreamList[index].extra_info || '');
              }

          } else if (type == 1) {

              for (var k = 0; k < useLocalStreamList.length; k++) {

                  for (var j = 0; j < streamList.length; j++) {

                      if (useLocalStreamList[k].stream_id === streamList[j].stream_id) {

                          zg.stopPlayingStream(useLocalStreamList[k].stream_id);

                          console.info(useLocalStreamList[k].stream_id + 'was devared');

                          useLocalStreamList.splice(k, 1);

                          $('.remoteVideo audio:eq(' + k + ')').remove();
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

function play(streamId, video, extraInfo) {

    let playType = {playType: 'audio'}

    if (extraInfo.indexOf('playType') !== -1) {
      playType = JSON.parse(extraInfo)
    }
    var result = zg.startPlayingStream(streamId, video,null,playType);

    video.muted = false;
    if (!result) {
        alert('哎呀，播放失败啦');
        video.style = 'display:none';
        console.error("play " + el.nativeElement.id + " return " + result);
    }
}

