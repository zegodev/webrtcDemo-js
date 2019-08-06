# 即构 webrtc-sdk功能示例demo

 ## 说明
- 该仓库为即构科技webrtc的使用示例demo,希望帮助开发者快速上手webrtc-sdk；
- 每个页面展示sdk一种功能，可根据实际场景自由组合
- 可[在线体验](https://zegodev.github.io/webrtcDemo-js/)；[备用地址](https://zegodev.gitee.io/webrtcdemo-js)
- [API文档](https://doc.zego.im/CN/306.html)


 ## 集成条件
 - 即构开发者账户（[获取appid](https://www.zego.im)）
 - webrtc兼容性如下
   <img src="https://storage.zego.im/sdk-doc/Pics/Web/ZegoLiveRoom/ZegoLiveRoom-IntegrationGuide/form.png?v=Thu%20Jun%2027%202019%2015:53:03%20GMT+0800%20(GMT+08:00)">
 - 只支持SSL的Web服务器（https）
> 项目里测试用https证书在浏览器中会有警告，可以点击高级-->继续访问
> >localhost,127.0.0.1等同于https


 ## 快速搭建自己demo
 - 安装依赖: npm i
 - 修改/docs/common.js中代码为自己的配置
 > appid,appSign,server地址 需要自行修改(请从控制台申请AppID时邮件内容里获取)
 >
 > appSigin为即构给客户分配的秘钥，请勿泄漏；（生产环境下是生成token的密码，需要放到服务端）
 <img src="http://zego-public.oss-cn-shanghai.aliyuncs.com/sdk-doc/webrtcDemo-config.png"/>
 - 启动： npm run start


## 注意
- demo里的sdk为实验版本，请不要用这里的sdk作为生产环境


 ## [常见问题](https://github.com/zegodev/webrtcDemo-js/issues)



