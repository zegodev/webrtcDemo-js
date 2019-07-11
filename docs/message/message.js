let num = 0
//覆盖index.js 中的init
function init() {
  zg = new ZegoClient();
  zg.setUserStateUpdate(true);//重要  启动用户变化监听
  console.log("config param:" + JSON.stringify(_config));

  //内调测试用代码，客户请忽略  start
  setConfig(zg);
  //内调测试用代码，客户请忽略  end

  zg.config(_config);
  enumDevices();

  listen()
}


function listenChild() {
  var listens = {
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
      });
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
    },
    onRecvRoomMsg: function (chat_data, server_msg_id, ret_msg_id) {

      console.log('onRecvRoomMsg', chat_data, server_msg_id, ret_msg_id);

      let chatBox = ''

      chat_data[0].msg_category == 2 ? chatBox = "<div class=\"clearfloat\">" +
        "<div class=\"author-name\"><small class=\"chat-date\">" + new Date().toLocaleString() + "</small> </div> " +
        "<div class=\"left\"> " + "<div class=\"chat-avatars\"><img src=\"img/icon01.png\" alt=\"头像\" /></div> " +
        " <div class=\"chat-message\"> <img src=\"" + chat_data[0].msg_content + "\" >" + " </div>" : chatBox = "<div class=\"clearfloat\">" +
        "<div class=\"author-name\"><small class=\"chat-date\">" + new Date().toLocaleString() + "</small> </div> " +
        "<div class=\"left\"> " + "<div class=\"chat-avatars\"><img src=\"img/icon01.png\" alt=\"头像\" /></div> " +
        " <div class=\"chat-message\">" + chat_data[0].msg_content + " </div> </div> "


      $(".chatBox-content-demo").append(chatBox);
      //发送后清空输入框
      $(".div-textarea").html("");
      //聊天框默认最底部
      $(document).ready(function () {
        $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
      });

      num++
      $(".chat-message-num").text(num)
      $(".chatBox").show()
      $(".chatBox-kuang").show();
    },
    onRecvReliableMessage: function (type, seq, data) {
      console.log('onRecvReliableMessage', type, seq, data);
      $('#exampleModalLabel').text('onRecvReliableMessage|' + type + '|' + seq + '|' + data);
      $('#showAlert').click();
    },
    onRecvBigRoomMessage: function (messageList, roomId) {
      console.log('onRecvBigRoomMessage', messageList, roomId);
      $('#exampleModalLabel').text('onRecvBigRoomMessage|' + JSON.stringify(messageList) + '|' + roomId);
      $('#showAlert').click();
    }, onRecvCustomCommand: function (from_userid, from_idname, custom_content) {
      console.log('onRecvCustomCommand', from_userid, from_idname, custom_content);
    },
  };
  for (var key in listens) {
    zg[key] = listens[key]
  }
}


$(function () {


  $('#sendRoomMsg').click(function () {
    zg.sendRoomMsg(1, 1, "test", function (seq, msgId, msg_category, msg_type, msg_content) {
      console.log("sendRoomMsg suc:", seq, msgId, msg_category, msg_type, msg_content);
    }, function (err, seq, msg_category, msg_type, msg_content) {
      console.log("sendRoomMsg err:", seq, msgId, msg_category, msg_type, msg_content);
    })
  });

  $('#ReliableMessage').click(function () {
    zg.sendReliableMessage('2', "ReliableMessage test", function (seq) {
      console.log("sendReliableMessage suc:", seq);
    }, function (err, seq) {
      console.log("sendReliableMessage err:", err, seq);
    })
  });

  $('#RelayMessage').click(function () {
    // zg.sendRelayMessage(1, 2, "sendRelayMessage test", function(seq){
    //     console.log("sendRelayMessage suc:",seq);
    // }, function(err, seq){
    //     console.log("sendRelayMessage err:",err,seq);
    // })
  });


  $('#sendCustomrMsg').click(function () {
    zg.sendCustomCommand([$('#memberList').val()], 'test', (seq, customContent) => {
      console.log('sendCustomCommand suc', seq, customContent);
    }, (err, seq, customContent) => {
      console.log('sendCustomCommand err', err, seq, customContent);
    });
  });

  $('#BigRoomMessage').click(function () {
    zg.sendBigRoomMessage(1, 1, "BigRoomMessage test", function (seq, messageId) {
      console.log("BigRoomMessage suc:", seq, messageId);
    }, function (err, seq) {
      console.log("BigRoomMessage err:", err, seq);
    })
  });

});