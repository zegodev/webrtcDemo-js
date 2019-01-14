$(function () {

  $('#createRoomCdn').click(function () {
      openRoom($('#roomId').val(), 1);
  });

  $('#snapShot').click(function () {
      ZegoClient.saveSnapShot($('#previewVideo')[0],'zego'+new Date().getTime())
  })

  $('#startRecord').click(function () {
      ZegoClient.startRecord($('#previewVideo')[0])
      console.log("start record")
  })

  $('#pauseRecord').click(function () {
      ZegoClient.pauseRecord()
  })

  $('#resumeRecord').click(function () {
      ZegoClient.resumeRecord()
  })

  $('#stopRecord').click(function () {
      ZegoClient.stopRecord()
  })

  $('#saveRecord').click(function () {
      ZegoClient.saveRecord('zego'+new Date().getTime())
  })

});

//推流
function publish() {
  zg.startPublishingStream(_config.idName, previewVideo,null,{cdnUrl:$('#cdnUrl').val()||''});
}


//获取播放流音量
$('#getAudioInfo').click(function () {
  window.souder = ZegoClient.getAudioInfo($('#previewVideo')[0], function (e) {
      e && console.error(e);
  });
  window.souderTimer = setInterval(() => {
      console.log(souder);
  }, 2000);
});


$('#stopgetAudioInfo').click(function () {
  if(window.souder ){
      clearInterval(window.souderTimer);
      window.souder.stop();
  }
});