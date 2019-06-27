var zg,
    appid = getParamByName('appid') || 1739272706,
    _config = {
      appid: appid * 1,
      idName: new Date().getTime() + '',
      nickName: 'u' + new Date().getTime(),
      server: "wss://wsliveroom" + appid + "-api.zego.im:8282/ws",//"wss://wsliveroom-alpha.zego.im:8282/ws",
      logLevel: 0,
      logUrl: "",
      workerUrl: '../assets/jsmpeg-stub.min.js'
    },
    _otherConfig = {
      cgi_token: '',
      roomlist: '',
      signal: '',
      token: "https://wsliveroom-demo.zego.im:8282/token"//"https://wsliveroom"+appid+"-api.zego.im:8282/token",
  },
    loginRoom = false,
    useLocalStreamList = []

$(function () {
  console.log('目前使用的是 娃娃机sdk');
  bindEvent()
});

function bindEvent() {

  //初始化sdk
  init();

  $('#openRoom').click(function () {
      openRoom($('#roomId').val(), 2);
  });

  $('#leaveRoom').click(function () {
    leaveRoom();
});

}

function init () {
  zg = new ZegoClient()

  //内调测试用代码，客户请忽略  start
    setConfig(zg);
  //内调测试用代码，客户请忽略  end

  zg.config(_config)

  listen()
}

function listen() {
  var _config = {
      onPlayStateUpdate: function (type, streamid) {
          if (type == 0) {
              console.info('play  success');
          }
          else if (type == 2) {
              console.info('play retry');
          } else {
              console.error("play" + streamid +  " error " + type);
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
  };

  for (var key in _config) {
      zg[key] = _config[key]
  }

  if (typeof listenChild === 'function') {
      listenChild();
  }

}

function getParamByName(key) {
  var search = location.search;

  if (!search || search == '?') return null;
  search = search.replace('?', '');

  var param_arr = search.split('&'), param_map = {};
  param_arr.forEach(function (item) {
      var _key = item.split('=')[0], value = item.split('=')[1];
      param_map[_key] = value;
  });

  return param_map[key];
}

function setConfig(zg) {
  //测试用代码，客户请忽略  start
  if (location.search) {
      let _arr_config = location.search.substr(1).split('&');
      _arr_config.forEach(function (item) {
          var key = item.split('=')[0], value = item.split('=')[1];

          if (value && _config.hasOwnProperty(key)) {
              _config[key] = decodeURIComponent(value);
          } else if (value && _otherConfig.hasOwnProperty(key)) {
              _otherConfig[key] = decodeURIComponent(value);
          }
      });
  }
  //测试用代码，客户请忽略  end


  console.log("config param:" + JSON.stringify(_config));

  _config.appid = _config.appid * 1;


  //测试用代码，客户请忽略  start
  if (_otherConfig.signal) {
      zg.setCustomSignalUrl(_otherConfig.signal);
  }

  if(_otherConfig.cgi_token&&_otherConfig.token == 'https://wsliveroom-demo.zego.im:8282/token'){
      $.get(_otherConfig.cgi_token,function (cgi_token) {
          _otherConfig.cgi_token = cgi_token.data;
          console.log(_otherConfig.cgi_token);
      })
  }
  //测试用代码，客户请忽略  end
}

function openRoom(roomId, type) {

  if (!roomId) {
      alert('请输入房间号');
      return;
  }

  //get token
  $.get(_otherConfig.token, {app_id: _config.appid, id_name: _config.idName, cgi_token: _otherConfig.cgi_token},
      function (token) {
          if (!token) {
              alert('get token failed')
          } else {
              console.log('gettoken success');
              startLogin(roomId, token, type)
          }
      }, 'text');
}

function startLogin(roomId, token, type) {
  zg.login(roomId, type, token, function (streamList) {
    console.info('login success');
    loginSuccess(streamList, type);
  }, function (err) {
    console.info('login fail')
    //loginFailed(err);
  })
}

function loginSuccess(streamList, type) {

    useLocalStreamList = streamList;

  $('.remoteVideo').html('');
    $('#memberList').html('');
    for (var index = 0; index < useLocalStreamList.length; index++) {
        $('.remoteVideo').append($('<canvas></canvas>'));
        $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
        play(useLocalStreamList[index].stream_id, $('.remoteVideo canvas:eq(' + index + ')')[0]);
    }

  console.log(`login success`, useLocalStreamList);

  loginRoom = true;
}

function play(streamId, frontview) {
  var result = zg.startPlayingStream(streamId, frontview);

}

function leaveRoom() {
  console.info('leave room  and close stream');

  for (var i = 0; i < useLocalStreamList.length; i++) {
      zg.stopPlayingStream(useLocalStreamList[i].stream_id);
  }

  useLocalStreamList = [];
  $('.remoteVideo').html('');
  zg.logout();
}



