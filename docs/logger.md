<!--
 * @Author: sunboylu
 * @Date: 2020-11-12 14:10:00
 * @LastEditors: sunboylu
 * @LastEditTime: 2020-11-12 17:28:59
 * @Description: 
-->
### 1.登陆失败标志
  1. this.logger.error ('zb.rh.hlr state error');
  2. this.logger.error ('zb.rh.hlr in wrong seq, local=', cmdSeq, ',recv=', msg.header.seq);
  3. this.logger.error ('zb.rh.hlr server error=', msg.body.err_code);
### 2.推流失败标志
1. this.logger.error('zp.sp.0 streamId is null');
2. this.logger.error('zp.psue.0 call ', this.streamId, JSON.stringify(errorCode));
 ### 3.拉流失败标志
 1. this.logger.error('zsc.cps.1 player don\'t exist');
 2. this.logger.error('zsc.cps.1 after connect player don\'t exist');
 3. this.logger.error('zsc.cps.1 checkplayer don\'t exist');
 4. this.logger.info('zp.psue.1 called ', this.streamId, JSON.stringify(errorCode));

### 1.登陆总数
  1. action:zb.rh.lg content:call

### 2.推流总数
1. action:zc.p.sps.1 content:call streamid: {streamid}

 ### 3.拉流总数
 1. action:zc.p.sps.0  content:call

 