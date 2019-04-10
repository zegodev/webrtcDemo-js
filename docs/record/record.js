$(function () {

  $('#snapShot').click(function () {
      ZegoClient.saveSnapShot($('#previewVideo')[0],'zego'+new Date().getTime())
  })

  $('#startRecord').click(function () {
      ZegoClient.startRecord($('#previewVideo')[0])

      console.warn("start record")
  })

  $('#startRecordPull').click(function (){
      if(!useLocalStreamList || useLocalStreamList.length == 0){
        alert('并没找到拉流视频')
        return
      }

      ZegoClient.startRecord($('.remoteVideo video:eq(0)')[0] )
      console.warn('start record')
  })

  $('#pauseRecord').click(function () {
      ZegoClient.pauseRecord()
      
      console.warn("record pause")
  })

  $('#resumeRecord').click(function () {
      ZegoClient.resumeRecord()

      console.warn("resume record")
  })

  $('#stopRecord').click(function () {
      ZegoClient.stopRecord()
      $('#saveRecord')[0].disabled = false
      console.warn("record stop")
  })

  $('#saveRecord').click(function () {
      ZegoClient.saveRecord('zego'+new Date().getTime())
      $('#saveRecord')[0].disabled = true
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