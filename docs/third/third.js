
var localMedia

$('#selectLocalVideo').click(function () {

})

$('#externalCaptureV').click(function () {
  $('#externerVideo')[0].play();
  localMedia = $('#externerVideo')[0]
  openRoom($('#roomId').val(), 1)
})



function loginSuccess(streamList, type) {
  var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4
  var mediastream
  // zg.setCustomSignalUrl(["wss://webrtc-stg.zego.im:443/ws?a=zegostg"])
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

  if (localMedia['captureStream']) {
    mediastream = localMedia.captureStream()
  } else if (localMedia['mozCaptureStream']) {
    mediastream = localMedia.mozCaptureStream()
  } else {
    alert('浏览器暂不支持');
    return;
  }
  let media =changeStream(mediastream);
  previewVideo.srcObject = media
  if (type == 1) {
    var config = {
      externalCapture: true,
      channelCount: $('#channelCount').val() * 1,
      // width: 1280,
      // height: 720,
      // frameRate: 20,
      // bitRate: 1000
      // config.externalMediaStream = mediastream
      // config.video = false;
      // config.audio = false;
    }

    //需等第三方音视频加载后才能进行预览推流
    previewVideo.oncanplay = () => {
      //开始预览本地视频
      doPreviewPublish(config);
    }

  }

}

function preloadVideo(url) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {

    if (xhr.status == 200 || xhr.status == 304) {
      console.log(xhr.response)
    }
  }
  xhr.send();
}

function getVideo(ele) {
  const video = ele.files[0];
  const url = URL.createObjectURL(video);
  $('#externerVideo')[0].src = url;
}


//判断浏览器版本  必须是谷歌88 版本
function getChromeVersion() {
  var arr = navigator.userAgent.split(' ');
  var chromeVersion = '';
  for (var i = 0; i < arr.length; i++) {
    if (/chrome/i.test(arr[i]))
      chromeVersion = arr[i]
  }
  if (chromeVersion) {
    return Number(chromeVersion.split('/')[1].split('.')[0]);
  } else {
    return false;
  }
}
function changeStream(source) {

  var version = getChromeVersion();
  if (version != 88) {
    return source
  }
  let video = document.createElement("video");
  let canvas = document.createElement("canvas");
  video.setAttribute("style", "display:none");
  canvas.setAttribute("style", "display:none");
  video.setAttribute("muted", "");
  video.muted = !0;
  video.setAttribute("autoplay", "");
  video.autoplay = !0;
  video.setAttribute("playsinline", "");
  document.body.append(video);
  document.body.append(canvas);
  video.srcObject = source;
  video.oncanplay = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    video.play();
    draw();
  }

  let media = canvas.captureStream(25);
  let track = media.getVideoTracks()[0];
  let ctx = canvas.getContext("2d");
  let draw = function () {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // window.requestAnimationFrame(draw)
    track.requestFrame && track.requestFrame();
    video.srcObject = source;

  }
  let q = track.stop
  track.stop = () => {
    q.call(track);
    draw();
    video.remove();
    canvas.width = 0;
    canvas.remove();
    video = canvas = null;
  }
  if (source instanceof MediaStream && source.getAudioTracks().length) {
    let micro = source.getAudioTracks()[0];
    media.addTrack(micro)
  }
  return media

}