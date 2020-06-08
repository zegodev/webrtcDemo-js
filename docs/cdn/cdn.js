var videoElement = document.getElementById('test');
var flvPlayer = null
var ua = navigator.userAgent.toLowerCase();
var isAndWechat = false;

if ((ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) && ua.match(/MicroMessenger/i) == 'micromessenger') {
  console.warn('当前浏览器为微信浏览器');
  isAndWechat = true;
}

//覆盖common.js中的init
function init() {

  zg = new ZegoClient();

  _config.appid = 1739272706;

  //内调测试用代码，客户请忽略  start
  setConfig(zg);
  //内调测试用代码，客户请忽略  end

  zg.config(_config);
  enumDevices();

  listen()

  zg.onStreamUpdated = function (type, streamList) {
    var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4;

    if (type == 0) {
      //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
      if (streamList.length >= maxNumber) {
        alert('房间太拥挤，换一个吧！');
        leaveRoom();
        return;
      }
    }

    useLocalStreamList = filterStreamList()

    console.log(useLocalStreamList)

    //获取当前浏览器类型
    var browser = getBrowser();
    var hasAudio = true
    var playType

    if (streamList) {
      if (streamList[0] && streamList[0].extra_info && streamList[0].extra_info.length !== 0) {
        try {
          playType = JSON.parse(streamList[0].extra_info).playType
        } catch (err) {
          alert(err)
        }
      }
    }

    playType === 'Video' ? hasAudio = false : hasAudio = true

    if (browser == "Safari" && !isAndWechat && useLocalStreamList.length !== 0) {

      videoElement.src = useLocalStreamList[0];
      //videoElement.load();
      //videoElement.muted = false;

    } else if (useLocalStreamList.length !== 0) {

      var flvUrl = useLocalStreamList[0];
      if (streamList)

        //若支持flv.js
        if (flvjs.isSupported()) {
          flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: flvUrl,
            hasAudio: hasAudio
          });
          flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
            console.error('LOADING_COMPLETE')
            flvPlayer.play();
          })
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          videoElement.muted = false;
        }
    }

  }
}

//覆盖common.js中的loginSuccess
function loginSuccess(streamList, type) {

  var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4

  //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
  if (streamList.length >= maxNumber) {
    alert('房间太拥挤，换一个吧！');
    leaveRoom();
    return;
  }

  useLocalStreamList = filterStreamList()

  console.log(useLocalStreamList)

  if (type == 2) {
    //获取当前浏览器类型
    var browser = getBrowser();
    var hasAudio = true
    var playType

    if (streamList) {
      if (streamList[0] && streamList[0].extra_info && streamList[0].extra_info.length !== 0) {
        try {
          playType = JSON.parse(streamList[0].extra_info).playType
        } catch (err) {
          alert(err)
        }
      }
    }


    playType === 'Video' ? hasAudio = false : hasAudio = true

    if (browser == "Safari" && !isAndWechat && useLocalStreamList.length !== 0) {

      videoElement.src = useLocalStreamList[0];
      //videoElement.load();
      //videoElement.muted = false;

    } else if (useLocalStreamList.length !== 0) {

      var flvUrl = useLocalStreamList[0];
      if (streamList)

        //若支持flv.js
        if (flvjs.isSupported()) {
          flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: flvUrl,
            hasAudio: hasAudio
          });
          flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
            console.error('LOADING_COMPLETE')
            flvPlayer.play();
          })
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          videoElement.muted = false;
        }
    } else {
      alert("未找到流");
    }

  }

  console.log(`login success`);
  loginRoom = true;

  type === 1 && doPreviewPublish()

}

function filterStreamList(streamId) {
  var flv = {};
  var hls = {};
  var rtmp = {};

  var streamListUrl = []
  var index = 0

  console.log(zg.stateCenter.streamList)

  zg.stateCenter.streamList.forEach(function (item, ind) {
    if (item.stream_id == streamId) index = ind
  })

  for (var key in zg.stateCenter.streamList[index]) {
    if (key == 'urls_flv' || key == 'urls_https_flv') {
      flv[key] = zg.stateCenter.streamList[index][key]
    }
    if (key == 'urls_m3u8' || key == 'urls_https_m3u8') {
      hls[key] = zg.stateCenter.streamList[index][key]
    }
    if (key == 'urls_rtmp') {
      rtmp[key] = zg.stateCenter.streamList[index][key]
    }
  }

  var pro = window.location.protocol
  var browser = getBrowser()

  if (browser == 'Safari' && !isAndWechat) {
    for (var key in hls) {
      if (hls[key]) {
        hls[key].forEach(function (item) {
          if (item.indexOf(pro) !== -1) streamListUrl.push(item)
          else if (pro == 'https:' && item.indexOf('https') === -1) {
            streamListUrl.push(item.replace('http', 'https'))
          }
        })
      }
    }
  } else if (pro == 'http:') {
    for (var key in flv) {
      if (flv[key]) {
        flv[key].forEach(function (item) {
          if (item.indexOf('http') !== -1 || item.indexOf('https') !== -1) streamListUrl.push(item)
        })
      }
    }
  } else if (pro == 'https:') {
    for (var key in flv) {
      if (flv[key]) {
        flv[key].forEach(function (item) {
          if (item.indexOf('https') === -1) streamListUrl.push(item.replace('http', 'https'))
          else if (item.indexOf(pro) !== -1) {
            streamListUrl.push(item)
          }
        })
      }
    }
  } else if (pro == 'rtmp:') {
    for (var key in rtmp) {
      if (rtmp[key]) {
        rtmp[key].forEach(function (item) {
          if (item.indexOf(pro) !== -1) streamListUrl.push(item)
        })
      }
    }
  }

  return streamListUrl.filter(function (ele, index, self){return self.indexOf(ele) == index} )
}

function leaveRoom() {
  console.info('leave room  and close stream');

  if (isPreviewed) {
    zg.stopPreview(previewVideo);
    zg.stopPublishingStream(_config.idName);
    isPreviewed = false;
  }

  for (var i = 0; i < useLocalStreamList.length; i++) {
    zg.stopPlayingStream(useLocalStreamList[i].stream_id);
  }

  useLocalStreamList = [];

  if (typeof flvPlayer !== "undefined") {
    if (flvPlayer != null) {
      flvPlayer.pause();
      flvPlayer.unload();
      flvPlayer.detachMediaElement();
      flvPlayer.destroy();
      flvPlayer = null;
    }
  }

  // $('.remoteVideo').html('');
  zg.logout();
}

$('#playCDN').click(function () {
  flvPlayer.play()
})

