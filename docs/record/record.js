$(function () {

  $('#createRoomCdn').click(function () {
      openRoom($('#roomId').val(), 1);
  });

  $('#snapShot').click(function () {
      ZegoClient.saveSnapShot($('#previewVideo')[0],'zego'+new Date().getTime())
  })

  $('#startRecord').click(function () {
      ZegoClient.startRecord($('#previewVideo')[0])

      console.warn("start record")
      $('#startRecord')[0].disabled = true
      $('#saveRecord')[0].disabled = true
      $('#pauseRecord')[0].disabled = false
      $('#stopRecord')[0].disabled = false
  })

  $('#pauseRecord').click(function () {
      ZegoClient.pauseRecord()
      
      console.warn("record pause")
      $('#pauseRecord')[0].disabled = true
      $('#stopRecord')[0].disabled = false
      $('#resumeRecord')[0].disabled = false
  })

  $('#resumeRecord').click(function () {
      ZegoClient.resumeRecord()

      console.warn("resume record")
      $('#resumeRecord')[0].disabled = true
      $('#stopRecord')[0].disabled = false
      $('#pauseRecord')[0].disabled = false

  })

  $('#stopRecord').click(function () {
      ZegoClient.stopRecord()

      console.warn("record stop")
      $('#stopRecord')[0].disabled = true
      $('#resumeRecord')[0].disabled = true
      $('#pauseRecord')[0].disabled = true
      $('#saveRecord')[0].disabled = false
      $('#startRecord')[0].disabled = false
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