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
        $('#playLaughEffect')[0].disabled = false
        $('#playBgEffect')[0].disabled = false
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
    }, () => {
      isMixingAudio = false;
      console.warn('play end')
    })
  })

  //zego sdk 提供两种混音方式，上面播放笑声为预加载音效的方式，下面播放鼓掌音效为混audio元素的方式 推荐客户使用预加载的方式，播放标签方式safari不支持

  $('#playClapEffect').click(() => {

    if (isMixingAudio) {
      console.error("当前正在混其它音效,不要想鼓掌了");
      return;
    }

    zg.startMixingAudio(_config.idName, $('#applaud')[0]) && ($('#pauseEffect')[0].disabled = true);


    // *****chrome和firfox在混音的时候，会有表现不一致的问题： chrome标签被混音，标签本身依旧能正常播放出声音，firfox则被静音；推流端一般静音 ******
    if(getBrowser()==='Chrome'){
      $('#applaud')[0].muted = true
    }



    $('#applaud')[0].play()
    isMixingAudio = true;
    $('#applaud').on('ended', () => {
      zg.stopMixingAudio(_config.idName)
      $('#applaud').unbind();
      $('#pauseEffect')[0].disabled = false;
    })
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
    zg.stopMixingAudio(_config.idName)
    isMixingAudio = false;
  })

  $('#unloadEffect').click(() => {

    let num = 0
    audioEffectList.forEach(effect => {
      zg.unloadEffect(effect.effectId) && num ++
    })

    if (num === audioEffectList.length) {
      console.warn('all unload success')
      $('#playLaughEffect')[0].disabled = true
        $('#playBgEffect')[0].disabled = true
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
            $('#playClapEffect')[0].disabled = true;
            $('#pauseEffect')[0].disabled = true;
            $('#resumeEffect')[0].disabled = true;
            $('#stopEffect')[0].disabled = true;
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
    $('#playClapEffect')[0].disabled = false;
    $('#pauseEffect')[0].disabled = false;
    $('#resumeEffect')[0].disabled = false;
    $('#stopEffect')[0].disabled = false;
  })
})
