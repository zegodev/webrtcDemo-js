# 即构 web版sdk 互动视频教程
 本教程能帮助你快速上手即构web-sdk,示例主要包括以下内容
 
 - 创建/退出房间
 - 推送/拉取流
 - 开启/关闭 音视频
 - [更多用法](https://www.zego.im/html/document/#Live_Room/API_Instructions:web)
 
 
 ## 准备条件
 - 即构开发者账户（[获取appid](https://www.zego.im)）
 - 支持SSL的Web服务器（https）
 
 
 ## 快速开始
 
 - [获取sdk](#getsdk)
 - [使用示例](#demoStep)
 
 
 ### <a id="getsdk">获取sdk</a>
 #### 官网下载
  下载最新[sdk](https://storage.zego.im/downloads/jZego-rtc-SDK.zip)并解压
 , 在你的html页面适当位置引入
 
 `` <script src="lib/jZego-rtc-1.0.3.js"></script>
 ``
 
 ### <a id="demoStep">使用示例</a>
 
 1 创建，配置实列对象；配置对象_config请参考[api文档](https://www.zego.im/html/document/#Live_Room/API_Instructions:web)或[demo](https://zegodev.github.io/webrtcDemo-js/)
 ```html
  var zg = new ZegoClient(), _config = {
                                    "appid": 229059616,
                                    "idName": new Date().getTime() + '',
                                    "nickName": 'u' + new Date().getTime(),
                                    "server": "wss://wsliveroom229059616-api.zego.im:8282/ws",
                                    "logLevel": 0,
                                    "logUrl": "",
                                    "remoteLogLevel": 0
                                }
  zg.config(_config);
```
 
 2 创建/登录房间
 ```js
    //get token
     $.get("https://wsliveroom229059616-api.zego.im:8282/token", {app_id: _config.appid, id_name: _config.idName},
         function (token) {
             if (!token) {
                 alert('get token failed')
             } else {
                 startLogin(token)
             }
         }, 'text');
 
 
     //login
     function startLogin(token) {
         zg.login(roomId, 2, token, function (streamList) {
             loginSuccess(streamList);
         }, function (err) {
             loginFailed(err);
         })
     }

```

 3  预览/推流
```js
 //预览
    function doPreviewPublish() {
        var previewConfig = {
            "audio": true,
            "audioInput": null,
            "video": true,
            "videoInput": null,
            "videoQuality": 2,
            "horizontal": true
        };
        var result = zg.startPreview(previewVideo, previewConfig, function () {
            console.log('preview success');
            publish();
        }, function (err) {
            console.error('preview failed', err);
        });

        if (!result) alert('预览失败！')
    }

    //推流
    function publish() {
        zg.startPublishingStream(_config.idName, previewVideo);
    }
```


 4 拉流获取 
 ```js
 //登录房间获取拉流
  zg.login(roomId, 2, token, function (streamList) {
              //streamList 为拉流到的数组
              // todo.....
         }, function (err) {
             loginFailed(err);
   })
   
   
   //进入房间后监听拉流变化  
   zg.onStreamUpdated = function (type, streamList) {
                      if (type == 0) {
                          // 新增的拉流
                          // todo.....
      
                      } else if (type == 1) { 
                          // 退出的拉流
                          // todo.....
                      }
      
                  }


```
 
 5 播放拉流 
 ```js
  function play(streamId, video) {
        var result = zg.startPlayingStream(streamId, video);


        if (!result) {
            alert('哎呀，播放失败啦');
            video.style = 'display:none';
            console.error("play " + el.nativeElement.id + " return " + result);

        }
    }
```

6 退出房间（停止播放，停止推流，停止预览等 ）
```js
function leaveRoom() {
   console.info('leave room  and close stream');

    zg.stopPreview(previewVideo);

    zg.stopPublishingStream(_config.idName);

    for (var i = 0; i < useLocalStreamList.length; i++) {
         zg.stopPlayingStream(useLocalStreamList[i].stream_id);
    }

    $('.remoteVideo').html('');
    zg.logout();
}
```
 
 
 
