var videoElement = document.getElementById('test');

  $('#openRoomNew').click(function(){
    openRoom($('#roomId').val(), 2)
    videoElement.play()             //解决移动端无法自动播放
  })

//覆盖common.js中的init
function init() {

  zg = new ZegoClient();

  _config.appid = 1739272706;

  //测试用代码，客户请忽略  start
    if (location.search) {
      let _arr_config = location.search.substr(1).split('&');
      _arr_config.forEach(function (item)  {
          var key = item.split('=')[0], value = item.split('=')[1];
          if (value && _config.hasOwnProperty(key)) {
              _config[key] = decodeURIComponent(value);
          } else if (value && _otherConfig.hasOwnProperty(key)) {
              _otherConfig[key] = decodeURIComponent(value);
          }
    });
  }
  //测试用代码，客户请忽略  end

  console.log("config param:" + JSON.stringify(_config));

  _config.appid = _config.appid*1;
  zg.config(_config);
  //测试用代码，客户请忽略  start
  if(_otherConfig.signal){
      zg.setCustomSignalUrl(_otherConfig.signal);
  }
  //测试用代码，客户请忽略  end
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

  useLocalStreamList = handleStreamList(streamList)

  if(type == 2){
     //获取当前浏览器类型
    var browser = getBrowser ();

    if(browser == "Safari" && useLocalStreamList.length !== 0 ){

      videoElement.src = useLocalStreamList[0]

    }else if(useLocalStreamList.length !== 0){

      var flvUrl = useLocalStreamList[0] ;
      //若支持flv.js
      if (flvjs.isSupported()) {
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: flvUrl
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      }
    }else {
      alert("未找到流");
    }
   
  }
  
  console.log(`login success`);
  loginRoom = true;
 

  //开始预览本地视频
  type === 1 && doPreviewPublish();
}

function handleStreamList(streamList, streamId){
  var flv = {};
  var hls = {};
  var rtmp = {};

  var streamListUrl = []

  for (let key in streamList[0]){
    if (key == 'urls_flv' || key == 'urls_https_flv' ){
      flv[key] = streamList[0][key]
    }
    if (key == 'urls_hls' || key == 'urls_https_hls'){
      hls[key] = streamList[0][key]
    }
    if (key == 'urls_rtmp' ){
      rtmp[key] = streamList[0][key]
    }
  }

  var pro = window.location.protocol
  var browser = getBrowser ()

  if(browser == 'Safari'){
    for(let key in hls) {
      key.forEach(function(){
        for(let key in flv){
          if(flv[key]){
            flv[key].forEach(function(item){
              if(item.indexOf(pro)!== -1) streamListUrl.push(item)
            })
          }  
        }
      })
    }
  }else if(pro == 'http:'){
    for(let key in flv){
      if(flv[key]){
        flv[key].forEach(function(item){
          if(item.indexOf('http')!== -1 || item.indexOf('https')!== -1) streamListUrl.push(item)
        })
      }  
    }
  }else if(pro == 'https:'){
    for(let key in flv){
      if(flv[key]){
        console.log(flv[key])
        flv[key].forEach(function(item){
          if(item.indexOf('https')!== -1) streamListUrl.push(item)
        })
      }  
    }
  }
  console.log(streamListUrl)
  
  return streamListUrl
}
