var videoElement = document.getElementById('test');

$('#openRoomNew').click(function () {
    openRoom($('#roomId').val(), 2)
    //videoElement.play()             //解决移动端无法自动播放
})

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

//用于筛选符合当前浏览器的流
function handleStreamList(streamList, streamId) {
    var flv = {};
    var hls = {};
    var rtmp = {};

    var streamListUrl = []
    var index = 0

    streamList.forEach(function (item, ind) {
        if (item.stream_id == streamId) index = ind
    })

    for (let key in streamList[index]) {
        if (key == 'urls_flv' || key == 'urls_https_flv') {
            flv[key] = streamList[index][key]
        }
        if (key == 'urls_hls' || key == 'urls_https_hls') {
            hls[key] = streamList[index][key]
        }
        if (key == 'urls_rtmp') {
            rtmp[key] = streamList[index][key]
        }
    }

    var pro = window.location.protocol
    var browser = getBrowser()

    if (browser == 'Safari') {
        for (let key in hls) {
            key.forEach(function () {
                for (let key in flv) {
                    if (flv[key]) {
                        flv[key].forEach(function (item) {
                            if (item.indexOf(pro) !== -1) streamListUrl.push(item)
                        })
                    }
                }
            })
        }
    } else if (pro == 'http:') {
        for (let key in flv) {
            if (flv[key]) {
                flv[key].forEach(function (item) {
                    if (item.indexOf('http') !== -1 || item.indexOf('https') !== -1) streamListUrl.push(item)
                })
            }
        }
    } else if (pro == 'https:') {
        for (let key in flv) {
            if (flv[key]) {
                flv[key].forEach(function (item) {
                    if (item.indexOf(pro) !== -1) streamListUrl.push(item)
                })
            }
        }
    } else if (pro == 'rtmp:') {
        for (let key in rtmp) {
            if (rtmp[key]) {
                rtmp[key].forEach(function (item) {
                    if (item.indexOf(pro) !== -1) streamListUrl.push(item)
                })
            }
        }
    }

    return streamListUrl.filter(function (ele, index, self) {
        return self.indexOf(ele) == index
    })

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

    useLocalStreamList = handleStreamList(streamList)

    console.log(useLocalStreamList)

    if (type == 2) {
        //获取当前浏览器类型
        var browser = getBrowser();

        if (browser == "Safari" && useLocalStreamList.length !== 0) {

            videoElement.src = useLocalStreamList[0]

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
            }
        } else {
            alert("未找到流");
        }

    }

    console.log(`login success`);
    loginRoom = true;


    //开始预览本地视频
    type === 1 && doPreviewPublish();
}

