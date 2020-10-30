let flvPlayer = null;
let cdnFlvPlayer = null;
const ua = navigator.userAgent.toLowerCase();
let isAndWechat = false;
const videoElement = document.getElementById('test');
const cdnVideoElement = document.getElementById('cdn');
let isLogin = false;
let playType = 'all';

console.warn('ua', ua);
// @ts-ignore
if ((ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) && ua.match(/MicroMessenger/i) == 'micromessenger') {
    console.warn('当前浏览器为微信浏览器');
    isAndWechat = true;
}

loginSuccess = (streamList, type) => {
  streamList.forEach(streamInfo => {
    const streamID = streamInfo.stream_id;
    const cdnUrl = filterStreamList(streamInfo);

    useLocalStreamList.push(streamInfo);
    playStream(streamID, cdnUrl);
  })

  console.log(`login success`);

  loginRoom = true;

  //开始预览本地视频
  type === 1 && doPreviewPublish();
}
$('#leaveRoom').unbind('click');
$('#leaveRoom').click(function () {
    if (typeof flvPlayer !== 'undefined') {
        if (flvPlayer != null) {
            flvPlayer.pause();
            flvPlayer.unload();
            flvPlayer.detachMediaElement();
            flvPlayer.destroy();
            flvPlayer = null;
        }
    }

    leaveRoom();
    isLogin = false;
});

function filterStreamList(streamInfo) {
    const flv = {};
    const hls = {};
    const rtmp = {};

    const streamListUrl = [];

    // console.log(zg.stateCenter.streamList);

    for (const key in streamInfo) {
        if (key == 'urls_flv' || key == 'urls_https_flv') {
            flv[key] = streamInfo[key] ? streamInfo[key][0] : '';
        }
        if (key == 'urls_hls' || key == 'urls_https_hls') {
            hls[key] = streamInfo[key] ? streamInfo[key][0] : '';
        }
        if (key == 'urls_rtmp') {
            rtmp[key] = streamInfo[key]? streamInfo[key][0] : '';
        }
    }

    console.warn('flv', flv, hls, rtmp);
    const pro = window.location.protocol;
    const browser = getBrowser();

    if (browser == 'Safari' && !isAndWechat) {
        for (const key in hls) {
            if (hls[key]) {
                if (hls[key].indexOf(pro) !== -1) streamListUrl.push(hls[key]);
                else if (pro == 'https:' && hls[key].indexOf('https') === -1) {
                    streamListUrl.push(hls[key].replace('http', 'https'));
                }
            }
        }
    } else if (pro == 'http:') {
        for (const key in flv) {
            if (flv[key]) {
                if (flv[key].indexOf('http') !== -1 || flv[key].indexOf('https') !== -1) streamListUrl.push(flv[key]);
            }
        }
    } else if (pro == 'https:') {
        for (const key in flv) {
            if (flv[key]) {
                if (flv[key].indexOf('https') === -1) streamListUrl.push(flv[key].replace('http', 'https'));
                else if (flv[key].indexOf(pro) !== -1) {
                    streamListUrl.push(flv[key]);
                }
            }
        }
    } else if (pro == 'rtmp:') {
        for (const key in rtmp) {
            if (rtmp[key]) {
                if (rtmp[key].indexOf(pro) !== -1) streamListUrl.push(rtmp[key]);
            }
        }
    }

    return streamListUrl.filter(function (ele, index, self) {
        return self.indexOf(ele) == index;
    });
}

function playStream(streamID, cdnUrl) {
    const browser = getBrowser();
    let hasAudio = true;
    let hasVideo = true;
    let playType;

    const index = useLocalStreamList.findIndex(streamInfo => streamInfo.stream_id == streamID);
    const streamInfo = useLocalStreamList[index];

    if (streamInfo && streamInfo.extra_info && streamInfo.extra_info.length !== 0) {
          try {
              playType = JSON.parse(streamInfo.extra_info).playType;
          } catch (err) {
              alert(err);
          }
    }

    playType === 'Video' ? (hasAudio = false) : (hasAudio = true);
    playType === 'Audio' ? (hasVideo = false) : (hasVideo = true);

    if (browser == 'Safari' && !isAndWechat && cdnUrl.length !== 0) {
        videoElement.src = cdnUrl[0];
        //videoElement.load();
        //videoElement.muted = false;
    } else if (cdnUrl.length !== 0) {
        const flvUrl = cdnUrl[0];
        // const flvUrl = 'https://hdl-wsdemo.zego.im/livestream/test259.flv';
          if (!flvPlayer && flvjs.isSupported()) {
              //若支持flv.js
              flvPlayer = flvjs.createPlayer({
                  type: 'flv',
                  isLive: true,
                  url: flvUrl,
                  hasAudio: hasAudio,
                  hasVideo: hasVideo,
              });
              flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
                  console.error('LOADING_COMPLETE');
                  flvPlayer.play();
              });
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
              videoElement.muted = false;
              videoElement.controls = true;

              useLocalStreamList[index].player = flvPlayer;
          }
    }
}

function updateCdnStatus(state) {
    const extra = { state, publishType };
    playType = publishType;
    zg.sendReliableMessage('cdn', JSON.stringify(extra), () => console.warn('updateCdnStatus suc'), err => console.error('updateCdnStatus err ', err));
}
$(() => {
    zg.onStreamUpdated = (updateType, streamList) => {
        // console.log('l', zg.stateCenter.streamList);
        if (updateType == 0) {
            streamList.forEach(streamInfo => {
              const streamID = streamInfo.stream_id;
              const cdnUrl = filterStreamList(streamInfo);

              useLocalStreamList.push(streamInfo);
              playStream(streamID, cdnUrl);
            })
        } else if (updateType == 1) {
            for (let k = 0; k < useLocalStreamList.length; k++) {
                for (let j = 0; j < streamList.length; j++) {
                    if (useLocalStreamList[k].streamID === streamList[j].streamID) {
                        console.info(useLocalStreamList[k].streamID + 'was devared');
                        const player = useLocalStreamList[k].player
                        if (player) {
                                player.pause();
                                player.unload();
                                player.detachMediaElement();
                                player.destroy();
                                useLocalStreamList[k].player = null;
                                if (flvPlayer == player) flvPlayer = null;
                        }

                        useLocalStreamList.splice(k--, 1);

                        break;
                    }
                }
            }
        }
    };

    zg.onRecvReliableMessage = (type, seq, data) => {
        if (type === 'cdn') {
            const extraData = JSON.parse(data);
            console.log(extraData);
            if (extraData.state === 'add') {
                playType = extraData.publishType;
                ($('#cdnPlay')[0]).disabled = false;
            } else if (extraData.state === 'delete') {
                if (typeof cdnFlvPlayer !== 'undefined') {
                    if (cdnFlvPlayer != null) {
                        cdnFlvPlayer.pause();
                        cdnFlvPlayer.unload();
                        cdnFlvPlayer.detachMediaElement();
                        cdnFlvPlayer.destroy();
                        cdnFlvPlayer = null;
                    }
                }
                ($('#cdnPlay')[0]).disabled = true;
            }
        }
    };

    $('#cdnAddPush').click(async () => {
      zg.publishTarget( {
        type: 'addpush',
        streamId: _config.idName,
        pushUrl: 'rtmp://wsdemo.zego.im/livestream/' + _config.idName,
      }, () => {
        console.warn('add push target success ' + 'rtmp://rtmp.wsdemo.zego.im/livestream/' + _config.idName);
        updateCdnStatus('add');
        ($('#cdnDelPush')[0]).disabled = false;
        ($('#cdnPlay')[0]).disabled = false;
      }, err => console.error(err));

    });

    $('#cdnDelPush').click(async () => {
      zg.publishTarget( {
        type: 'delpush',
        streamId: _config.idName,
        pushUrl: 'rtmp://wsdemo.zego.im/livestream/' + _config.idName,
      }, () => {
        console.warn('delte push target success ' + 'rtmp://rtmp.wsdemo.zego.im/livestream/' + _config.idName);
        updateCdnStatus('delete');
        ($('#cdnDelPush')[0]).disabled = true;
        ($('#cdnPlay')[0]).disabled = true;
      } , err => console.error(err));
    });

    $('#cdnPlay').click(() => {
        if (!isLogin && !loginRoom) {
            alert('please enter the room');
            return;
        }
        const browser = getBrowser();
        // if (browser == 'Safari' && !isAndWechat) {
        //     cdnVideoElement.src = 'https://hls-wsdemo.zego.im/livestream/test259/playlist.m3u8';
        //     cdnVideoElement.load();
        //     cdnVideoElement.muted = false;
        // } else
        let hasVideo = true;
        let hasAudio = true;
        playType === 'Video' ? (hasAudio = false) : (hasAudio = true);
        playType === 'Audio' ? (hasVideo = false) : (hasVideo = true);
        if (flvjs.isSupported()) {
            //若支持flv.js
            if (cdnFlvPlayer != null) {
              cdnFlvPlayer.pause();
              cdnFlvPlayer.unload();
              cdnFlvPlayer.detachMediaElement();
              cdnFlvPlayer.destroy();
              cdnFlvPlayer = null;
            }
            cdnFlvPlayer = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                url: 'https://hdl-wsdemo.zego.im/livestream/' + _config.idName + '.flv',
                hasAudio: hasAudio,
                hasVideo: hasVideo,
            });
            cdnFlvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
                console.error('LOADING_COMPLETE');
                cdnFlvPlayer.play();
            });
            cdnFlvPlayer.attachMediaElement(cdnVideoElement);
            cdnFlvPlayer.load();
            cdnVideoElement.muted = false;
            cdnVideoElement.controls = true;
        }
    });
    $('#playCDN').click(() => {
        flvPlayer && flvPlayer.play();
    });
    // $('#createRoom').unbind('click');
    // $('#createRoom').click(async () => {
    //     // let loginSuc = false;
    //     const channelCount = parseInt($('#channelCount').val());
    //     console.error('channelCount', channelCount);
    //     try {
    //         isLogin = await enterRoom();
    //         isLogin && (await publish({ camera: { channelCount: channelCount } }));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });


    // $('#secret').change(() => {
    //     if ($('#secret').val() == '') {
    //         ($('#cdnAddPush')[0]).disabled = true;
    //         ($('#cdnDelPush')[0]).disabled = true;
    //     } else {
    //         ($('#cdnAddPush')[0]).disabled = false;
    //         ($('#cdnDelPush')[0]).disabled = true;
    //     }
    // });
});
