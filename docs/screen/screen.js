

$(function () {
    $('#screenShot').click(function () {

        if(IsPC()){

            loginRoom && zg.stopPublishingStream(_config.idName);
            loginRoom && zg.stopPreview(previewVideo);

            var config = {
                externalMediaStream:null,
                width:640,
                height:480,
                frameRate:15,
                bitRate:1000
            };

            getBrowser() === 'Firefox' && zg.startScreenShotFirFox('window',false,function (suc,mediastream) {
                console.log('startScreenShot:'+suc);
                screenCaptrue = suc;
                previewVideo.srcObject = mediastream;
                // 推送屏幕可有两种形式，一是作为流媒体直接推送 即下面这种形式
                //另一种是作为externalCapture，前提是需要先将流喂给video标签；，下面chrome推送方式就是这种形式；可任意选择其中之一
                if(loginRoom) {
                    doPreviewPublish(config);
                }
            });

            getBrowser() === 'Chrome' && zg.startScreenShotChrome(function (suc,mediastream) {
                console.log('startScreenShot:'+suc);
                screenCaptrue = suc;
                // 推送屏幕可有两种形式，一是作为externalCapture，前提是需要先将流喂给video标签；即下面这种形式
                //另一种是作为流媒体直接推送，上面火狐推送方式就是这种形式；可任意选择其中之一
                previewVideo.srcObject = mediastream;
                if(loginRoom) {
                    doPreviewPublish({externalCapture:true});
                }
            })
        }
    });

    $('#stopScreenShot').click(function () {
        zg.stopScreenShot()
    });

});