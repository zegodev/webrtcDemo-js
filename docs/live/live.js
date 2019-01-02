//覆盖index.js 中的init
function init() {
    zg = new ZegoClient(); 
    zg.setUserStateUpdate(true);//重要  启动用户变化监听

    //内调测试用代码，客户请忽略  start
    setConfig(zg);
    //内调测试用代码，客户请忽略  end


    zg.config(_config);
    enumDevices();

}


function listenChild(){
    var listens = {
        onGetAnchorInfo: function (userid, username) {
          anchor_userid = userid, anchro_username = username;
        },

        onRecvJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
            console.log('onRecvJoinLiveRequest', requestId, from_userid, from_username, roomid);
            var accept = window.confirm('收到请求连麦');
            window._fromUserId = from_userid;
            zg.respondJoinLive(requestId, accept, function (seq) {
                console.log('respondJoinLive success', seq);
            }, function (err, seq) {
                console.log('respondJoinLive err', err, seq);
            });
        },

        onRecvInviteJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
            console.log('onRecvInviteJoinLiveRequest', requestId, from_userid, from_username, roomid);
            var accept = window.confirm('收到邀请连麦');
            accept && doPreviewPublish();
        },

        onRecvEndJoinLiveCommand:function (requestId, from_userid, from_username, roomid){
            console.log('onRecvEndJoinLiveCommand',requestId, from_userid, from_username, roomid);
            isPreviewed && zg.stopPreview(previewVideo);
            isPreviewed && zg.stopPublishingStream(_config.idName);
        },
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


$(function () {
    $('#requestJoinLive').click(function () {
        anchor_userid && zg.requestJoinLive(anchor_userid, function (seq) {
            console.log('requestJoinLive suc', seq);
        }, function (err, seq) {
            console.log('requestJoinLive err', err, seq);
        }, function (result, fromUserId, fromUserName) {
            window._fromUserId = fromUserId;
            alert(result?'同意连麦':'拒绝连麦');
            if(result){
                doPreviewPublish();
            }
            console.log('requestJoinLive callback', result, fromUserId, fromUserName);
        })
    });

    $('#endLive').click(function () {
        isPreviewed && zg.stopPreview(previewVideo);
        isPreviewed && zg.stopPublishingStream(_config.idName);
    });


    $('#endJoinLive').click(function () {
        window._fromUserId && zg.endJoinLive( window._fromUserId, function (seq) {
            console.log('requestJoinLive suc', seq);
        }, function (err, seq) {
            console.log('requestJoinLive err', err, seq);
        });
        zg.stopPlayingStream( window._fromUserId);
        $('.remoteVideo').html('');
    })

    $('#inviteJoinLive').click(function () {
        $('#memberList').val() && zg.inviteJoinLive($('#memberList').val(), function (seq) {
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