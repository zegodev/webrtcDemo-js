var videoElement = document.getElementById('test');

//覆盖common.js中的init
function init() {

    zg = new ZegoClient();

    _config.appid = 1739272706;

    //内调测试用代码，客户请忽略  start
    setConfig(zg);
    //内调测试用代码，客户请忽略  end

    zg.config(_config);
    enumDevices();


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

    useLocalStreamList = zg.filterStreamList()

    console.log("能在当前浏览器播放的流有:" + useLocalStreamList)

    if (type == 2) {
        //获取当前浏览器类型
        var browser = getBrowser();

        if (browser == "Safari" && useLocalStreamList.length !== 0) {

            videoElement.src = useLocalStreamList[0];
            //videoElement.load();
            //videoElement.muted = false;

        } else if (useLocalStreamList.length !== 0) {

            var flvUrl = useLocalStreamList[0];
            //若支持flv.js
            if (flvjs.isSupported()) {
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: flvUrl
                });
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

