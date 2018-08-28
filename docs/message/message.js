//覆盖index.js 中的init
function init() {
    zg = new ZegoClient();
    zg.setUserStateUpdate(true);//重要  启动用户变化监听
    console.log("config param:" + JSON.stringify(_config));

    zg.config(_config);


    enumDevices();

}


function listenChild(){
    var listens = {
        onUserStateUpdate: function (roomId, userList) {
            console.log('onUserStateUpdate', roomId, userList);
            userList.forEach(function (item) {
                if(item.action === 1){
                    $userList.push(item);
                }else if(item.action === 2){
                    $userList.forEach(function (item2,index) {
                        if(item.idName===item2.idName){
                            $userList.splice(index,1)
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
        onRecvRoomMsg:function (chat_data,server_msg_id,ret_msg_id) {
            console.log('onRecvRoomMsg',chat_data,server_msg_id,ret_msg_id);
            alert('onRecvRoomMsg|'+JSON.stringify(chat_data)+'|'+server_msg_id+'|'+ret_msg_id);
        },
        onRecvReliableMessage:function (type, seq, data){
            console.log('onRecvReliableMessage',type, seq, data);
            alert('onRecvReliableMessage|'+type+'|'+seq+'|'+data);
        },
        onRecvBigRoomMessage:function(messageList, roomId){
            console.log('onRecvBigRoomMessage',messageList, roomId);
            alert('onRecvBigRoomMessage|'+JSON.stringify(messageList)+'|'+roomId);
        }
    };
    for (var key in listens) {
        zg[key] = listens[key]
    }
}


$(function () {


    $('#sendRoomMsg').click(function () {
        zg.sendRoomMsg(1, 1, "test", function(seq, msgId, msg_category, msg_type, msg_content){
            console.log("sendRoomMsg suc:",seq, msgId, msg_category, msg_type, msg_content);
        }, function(err, seq, msg_category, msg_type, msg_content){
            console.log("sendRoomMsg err:",seq, msgId, msg_category, msg_type, msg_content);
        })
    });

    $('#ReliableMessage').click(function () {
        zg.sendReliableMessage( '2', "ReliableMessage test", function(seq){
            console.log("sendReliableMessage suc:",seq);
        }, function(err, seq){
            console.log("sendReliableMessage err:",err,seq);
        })
    });

    $('#RelayMessage').click(function () {
        // zg.sendRelayMessage(1, 2, "sendRelayMessage test", function(seq){
        //     console.log("sendRelayMessage suc:",seq);
        // }, function(err, seq){
        //     console.log("sendRelayMessage err:",err,seq);
        // })
    });

    $('#BigRoomMessage').click(function () {
        zg.sendBigRoomMessage(1, 1, "BigRoomMessage test", function(seq, messageId){
            console.log("BigRoomMessage suc:",seq, messageId);
        }, function(err, seq){
            console.log("BigRoomMessage err:",err, seq);
        })
    });

});