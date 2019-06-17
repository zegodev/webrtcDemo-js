$(function (){

  let audioEffectList = [{
    effectId: 1,
    path: '../lib/laugh.mp3'
  }, {
    effectId: 2,
    path: 'https://web-demos-static.agora.io/agora/smlt.flac',
  }]

  $('#preloadEffect').click(() => {

    audioEffectList.forEach(effect => {
      zg.preloadEffect(effect.effectId, effect.path, () => {
        console.warn('preload success')
      })
    })
  })

  $('#playLaughEffect').click(() => {
    zg.playEffect({
      streamId: _config.idName,
      effectId: 1
    }, () => {
      console.warn('start play')
    }, () => {
      console.warn('play end')
    })
  })

  //zego sdk 提供两种混音方式，上面播放笑声为预加载音效的方式，下面播放鼓掌音效为混audio元素的方式 推荐客户使用预加载的方式

  $('#playClapEffect').click(() => {

    zg.startMixingAudio(_config.idName, $('#applaud')[0])
    $('#applaud')[0].muted = true
    $('#applaud')[0].play()
    $('#applaud').on('ended', () => {
      zg.stopMixingAudio(_config.idName)
      $('#applaud').unbind()
    })
  })

  $('#playBgEffect').click(() => {
    zg.playEffect({
      streamId: _config.idName,
      effectId: 2
    }, () => {
      console.warn('start play')
    }, () => {
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
})