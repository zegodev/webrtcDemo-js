$(function (){

  let isMixingAudio = false;

  let audioEffectList = [{
    effectId: 1,
    path: '../assets/laugh.mp3'
  }, {
    effectId: 2,
    path: '../assets/homage.m4a',
  }]

  $('#preloadEffect').click(() => {

    audioEffectList.forEach(effect => {
      zg.preloadEffect(effect.effectId, effect.path, () => {
        console.warn('preload success')
        $('#playLaughEffect')[0].disabled = false;
        $('#unloadEffect')[0].disabled = false;
      })
    })


  })

  $('#playLaughEffect').click(() => {
    zg.playEffect({
      streamId: _config.idName,
      effectId: 1
    }, () => {
      isMixingAudio = true;
      console.warn('start play')
      $('#pauseEffect')[0].disabled = false;
      $('#resumeEffect')[0].disabled = false;
    }, () => {
      isMixingAudio = false;
      console.warn('play end')
      $('#pauseEffect')[0].disabled = true;
      $('#resumeEffect')[0].disabled = true;
    })
  })

  //zego sdk 提供两种混音方式，上面播放笑声为预加载音效的方式，下面播放鼓掌音效为混audio元素的方式 推荐客户使用预加载的方式，播放标签方式safari不支持

  $('#mixAudio').click(() => {

    // if (isMixingAudio) {
    //   console.error("当前正在混其它音效,不要想鼓掌了");
    //   return;
    // }

    zg.startMixingAudio(_config.idName, [$('#applaud')[0], $('#station')[0]]);

    $('#applaud')[0].play();
    $('#station')[0].play();
    isMixingAudio = true;
  })

  $('#playBgEffect').click(() => {
    zg.playEffect({
      streamId: _config.idName,
      effectId: 2
    }, () => {
      isMixingAudio = true;
      console.warn('start play')
    }, () => {
      isMixingAudio = false;
      console.warn('play end')
    })
  })

  $('#pauseEffect').click(() => {
    zg.pauseEffect(_config.idName)
  })

  $('#resumeEffect').click(() => {
    zg.resumeEffect(_config.idName)
  })

  $('#stopEffect').click(() => {
    zg.stopMixingAudio(_config.idName, [$('#applaud')[0], $('#station')[0]])
    isMixingAudio = false;
    $('#pauseEffect')[0].disabled = true;
    $('#resumeEffect')[0].disabled = true;
  })

  $('#unloadEffect').click(() => {

    let num = 0
    audioEffectList.forEach(effect => {
      zg.unloadEffect(effect.effectId) && num ++
    })

    if (num === audioEffectList.length) {
      console.warn('all unload success')
      $('#playLaughEffect')[0].disabled = true
      $('#unloadEffect')[0].disabled = true;
    }
  })

  $('#volume').on('input', () => {
    zg.setMixingAudioVolume(_config.idName, parseInt($('#volume').val()))
  })

  $('#leaveMixRoom').click(function () {
    isMixingAudio && zg.stopMixingAudio(_config.idName);
    isMixingAudio && $('#stopMixingBuffer').click();
    isMixingAudio = false;
    leaveRoom();
  });

  $('#mixingBuffer').click(function () {
    let xhr  = new XMLHttpRequest();

    xhr.open('GET', '../assets/tonight.m4a', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload =  () => {

      if(xhr.status == 200 || xhr.status == 304) {

        let buffer = xhr.response;
        zg.mixingBuffer(_config.idName, "1", buffer, err => {
          if (err) {
            console.error(err);
          } else {
            console.warn("real time effect success");
            isMixingAudio = true;
          }
        });
      } else {
        console.error(err)
      }

    }

    xhr.send();

  })

  $('#stopMixingBuffer').click(function () {
    zg.stopMixingBuffer(_config.idName, null);
    isMixingAudio = false;
  })
})
