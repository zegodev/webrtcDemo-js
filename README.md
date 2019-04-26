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

 - 安装依赖: npm i
 - 启动： npm run start
 - [获取sdk](#getsdk)
 - [使用示例](#demoStep)


 ### <a id="getsdk">获取sdk</a>
 #### 官网下载
  下载最新[sdk](https://storage.zego.im/downloads/jZego-rtc-SDK.zip)并解压
 , 在你的html页面适当位置引入

 `` <script src="lib/jZego-rtc-1.0.3.js"></script>
 ``

 如有录屏需求，使用chrome浏览器时需另外下载[zego-chrome录屏插件](https://storage.zego.im/downloads/jZego-screen-extention.zip)

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

7 录屏功能:web端目前只有pc的Chrome和火狐浏览器支持该功能，chrome需要安装[zego-chrome录屏插件](https://chrome.google.com/webstore/detail/screensharing-extension-b/kdniilocdopajembdlhneebfodcmjmeh?hl=zh-CN&authuser=1)，火狐不需要

>点击上方链接下载[即构共享插件](https://storage.zego.im/downloads/jZego-screen-extention.zip)，并解压；

>打开你的 Chrome 浏览器，点击屏幕右上方的扩展按钮，选择 更多工具 > 扩展程序， 打开开发者模式 > 加载已解压的扩展程序 > 选择 解压的 即构共享插件文件夹，即可完成安装

> 或在Chrome网上应用商店搜索 Screensharing Extension by Zego > 选择添加至chrome
>
```js

            if(IsPC()){
                getBrowser() === 'Firefox' && zg.startScreenShotFirFox('screen',function (suc,mediastream) {
                    console.log('startScreenShot:'+suc);
                    previewVideo.srcObject = mediastream;
                });

                getBrowser() === 'Chrome' && zg.startScreenShotChome(function (suc,mediastream) {
                    console.log('startScreenShot:'+suc);
                    previewVideo.srcObject = mediastream;
                })
            }
```
>  **录屏返回得到的mediastream 是媒体流，是否播放或者推流，自由发挥**
 ## [常见问题](https://github.com/zegodev/webrtcDemo-js/issues)



