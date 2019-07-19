var localMedia

$('#externalCaptureV').click(function (){
  $('#externerVideo')[0].play();
  localMedia = $('#externerVideo')[0]
  openRoom($('#roomId').val(), 1)
})

function loginSuccess(streamList, type) {
  var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4
  var mediastream

  //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
  if (streamList.length >= maxNumber) {
    alert('房间太拥挤，换一个吧！');
    leaveRoom();
    return;
  }
  if ($('#streamID').val()) {
    useLocalStreamList = [{
      anchor_id_name: 'custom',
      stream_id: $('#streamID').val(),
      anchor_nick_name: 'custom'
    }, ...streamList];
  } else {
    useLocalStreamList = streamList;
  }


  $('.remoteVideo').html('');
  $('#memberList').html('');
  for (var index = 0; index < useLocalStreamList.length; index++) {
    $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
    $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
    play(useLocalStreamList[index].stream_id, $('.remoteVideo video:eq(' + index + ')')[0]);
  }
  console.log(`login success`);

  loginRoom = true;

  if(localMedia['captureStream']) {
    mediastream = localMedia.captureStream()
  } else if(localMedia['mozCaptureStream']) {
    mediastream = localMedia.mozCaptureStream()
  }else{
     alert('浏览器暂不支持');
     return;
  }

  previewVideo.srcObject = mediastream
  var config = {
    externalCapture: true,
    // width: 1280,
    // height: 720,
    // frameRate: 20,
    // bitRate: 1500
  }
  // config.externalMediaStream = mediastream
  // config.video = false;
  // config.audio = false;
  //开始预览本地视频
  type === 1 && doPreviewPublish(config);

}

function preloadVideo(url) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {

    if(xhr.status == 200 || xhr.status == 304 ) {
      console.log(xhr.response)
    }
  }
  xhr.send();
}
