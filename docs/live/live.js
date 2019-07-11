var role = null  //角色
//覆盖index.js 中的init
function init() {
  zg = new ZegoClient();
  zg.setUserStateUpdate(true);//重要  启动用户变化监听

  //内调测试用代码，客户请忽略  start
  setConfig(zg);
  //内调测试用代码，客户请忽略  end


  zg.config(_config);
  enumDevices();

  // 监听sdk回掉
  listen();
}

function respondJoinLive(flag, requestId, fromUserId) {
  var accept = flag;
  window._fromUserId = fromUserId;
  zg.respondJoinLive(requestId, accept, function (seq) {
    console.log('respondJoinLive success', seq);
  }, function (err, seq) {
    console.log('respondJoinLive err', err, seq);
  })
}

function listenChild() {
  var listens = {
    onGetAnchorInfo: function (userid, username) {
      anchor_userid = userid, anchro_username = username;
    },

    onRecvJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
      console.log('onRecvJoinLiveRequest', requestId, from_userid, from_username, roomid);
      $('#exampleModalLabel').text("收到id为" + requestId + "的连麦请求")
      $('#liveConfirm').click();
      $('#liveAgree').on('click', function () {
        respondJoinLive(true, requestId, from_userid)
      })
      $('#liveRefuse').on('click', function () {
        respondJoinLive(false, requestId, from_userid)
      })
    },

    onRecvInviteJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
      console.log('onRecvInviteJoinLiveRequest', requestId, from_userid, from_username, roomid);
      $('#exampleModalLabel').text("收到id为" + requestId + "的连麦请求")
      $('#liveConfirm').click();
      $('#liveAgree').on('click', function () {
        doPreviewPublish()
      })
    },

    onRecvEndJoinLiveCommand: function (requestId, from_userid, from_username, roomid) {
      console.log('onRecvEndJoinLiveCommand', requestId, from_userid, from_username, roomid);
      isPreviewed && zg.stopPreview(previewVideo);
      isPreviewed && zg.stopPublishingStream(_config.idName);
    },
    onUserStateUpdate: function (roomId, userList) {
      console.log('onUserStateUpdate', roomId, userList);
      userList.forEach(function (item) {
        if (item.action === 1) {
          $userList.push(item);
        } else if (item.action === 2) {
          $userList.forEach(function (item2, index) {
            if (item.idName === item2.idName) {
              $userList.splice(index, 1)
            }
          })
        }


      })
      $('#memberList').html('');
      $userList.forEach(function (item) {
        item.idName !== window._config.idName && $('#memberList').append('<option value="' + item.idName + '">' + item.nickName + '</option>');
      });
    },
    onGetTotalUserList: function (roomId, userList) {
      $userList = userList;
      $('#memberList').html('');
      $userList.forEach(function (item) {
        item.idName !== window._config.idName && $('#memberList').append('<option value="' + item.idName + '">' + item.nickName + '</option>');
      });
      console.log('onGetTotalUserList', roomId, userList);
    }
  };
  for (var key in listens) {
    zg[key] = listens[key]
  }
}

function loginSuccess(streamList, type) {

  let role = zg.stateCenter.role

  if (role == 1) {
    $('#endLive')[0].disabled = true
    $('#requestJoinLive')[0].disabled = true
  } else if (role == 2) {
    $('#endJoinLive')[0].disabled = true
    $('#inviteJoinLive')[0].disabled = true
  }


  var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4

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


  //开始预览本地视频
  type === 1 && doPreviewPublish();

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

  $('#endLive')[0].disabled = false
  $('#requestJoinLive')[0].disabled = false
  $('#endJoinLive')[0].disabled = false
  $('#inviteJoinLive')[0].disabled = false

  useLocalStreamList = [];
  $('.remoteVideo').html('');
  zg.logout();

  role = null
}


$(function () {
  $('#requestJoinLive').click(function () {
    anchor_userid && zg.requestJoinLive(anchor_userid, function (seq) {
      console.log('requestJoinLive suc', seq);
    }, function (err, seq) {
      console.log('requestJoinLive err', err, seq);
    }, function (result, fromUserId, fromUserName) {
      window._fromUserId = fromUserId;
      // alert(result ? '同意连麦' : '拒绝连麦');
      $('#exampleModalLabel').text("收到id为" + fromUserName + "的连麦请求")
      $('#liveConfirm').click();
      $('#liveAgree').on('click', function () {
        doPreviewPublish()
        console.log('requestJoinLive callback', result, fromUserId, fromUserName);
      })
    })
  });

  $('#endLive').click(function () {
    isPreviewed && zg.stopPreview(previewVideo);
    isPreviewed && zg.stopPublishingStream(_config.idName);
  });


  $('#endJoinLive').click(function () {
    window._fromUserId && zg.endJoinLive(window._fromUserId, function (seq) {
      console.log('requestJoinLive suc', seq);
    }, function (err, seq) {
      console.log('requestJoinLive err', err, seq);
    });
    zg.stopPlayingStream(window._fromUserId);
    $('.remoteVideo').html('');
  })

  $('#inviteJoinLive').click(function () {
    $('#memberList').val() && zg.inviteJoinLive($('#memberList').val(), function (seq) {
      window._fromUserId = $('#memberList').val();
      console.log('inviteJoinLive suc', seq);
    }, function (err, seq) {
      console.log('inviteJoinLive err', err, seq);
    }, function (result, fromUserId, fromUserName) {
      alert('同意连麦');
      doPreviewPublish();
      console.log('inviteJoinLive callback', result, fromUserId, fromUserName);
    })
  })

});
