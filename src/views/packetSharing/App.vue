<template>
  <div class="packet-sharing">
    <img src="./images/bg.png" class="bg">
    <div class="packet-box">
      <div class="header">
        <img src="./images/f-back.png" class="back">
        <div class="f-strategy-box">
          <span class="f-strategy"  @click="isRuleStatus = true">赚红包攻略</span>
        </div>
        <div class=""></div>
        <div class="fx-text">每邀请1个好友<br/>再得<span class="fx-number">2</span>个红包</div>
        <a href="javascript:" class="btn-share" @click="openPanel">分享赚红包</a>
        <div class="friend-text">好友帮你赚了{{envelopeStatusCon&&envelopeStatusCon.receiveBySharing}}个红包
          <a href="javascript:">去开启<img src="./images/arrow-right.png" class="f-back"></a>
        </div>
      </div>
      <div class="horn-box"><img src="./images/horn.png" class="pic-horn">{{envelopeStatusCon&&envelopeStatusCon.totalRecipients}}人已赚到红包</div>
    </div>
    <!-- 红包攻略 -->
    <div class="envelop-strategy-box" v-show="isRuleStatus">
      <div class="pop-mask"></div>
      <div class="envelop-strategy">
          <div class="e-header">分享红包攻略<img src="./images/close.png" class="close" @click="isRuleStatus = false"></div>
          <div class="e-content">
              <p>1.活动开始时间：2019.01.25 00:00:00 至 2019.2.20 24:00:00。</p>
              <p>2. 您邀请的好友必须是《好看视频》新用户，且登陆游戏平台，您才能获得邀请奖励，同时。好友也可获得1个红包。</p>
              <p>3.红包奖励会在邀请成功后的48小时内发放入您的账号，您可在“首页-开红包”查看。</p>
              <p>4.分享赚红包规则：每邀请1个好友即得1个红包，每个红包最高开出100元京东卡，每日通过分享最高可通过邀请好友方式获得5个红包，活动期间最多通过邀请好友方式获得20个红包。</p>
              <p>5.活动所得红包仅限本人使用，不可赠送他人，同一登录账号，同一手机号，同一终端设备号，同一支付账户，同一IP或其他合理显示为同一用户的情形，均视为同一用户。</p>
              <p>6.对于以任何不正当方式参与活动的用户，包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、批量注册、用机器注册账户、用机器模拟客户端等，《好看视频》有权取消其参与和获得红包资格。</p>
              <p>7.活动期间，如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、黑客攻击、系统故障、活动受政府机关指令需停止举办或调整的），《好看视频》可依相关法律法规</p>
              
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import API from '../../api';
  export default {
    data() {
      return {
        envelopeStatusCon: 'mzzz111',
        isRuleStatus: false,
        curChannel: localStorage.getItem('APP_CHANNEL')
      }
    },

    async mounted() {
      let res = await this.getInvideStatus()
      if(res.data.code == 200) {
        this.envelopeStatusCon = res.data.data
      }
      // this.getInvideCode()
     
      
    },
    methods: {
      openPanel() {
        if(this.curChannel == '100039') {
          this.openHkPanel()
        }else if(this.curChannel == '100042') {
          this.openVideoPanel()
        }
      },
      openVideoPanel() {
         window.createFun('shareFun', (res) => {
            alert('232424242')
          })


         let params = {"title":"我在全民小视频送你一个红包，最高开100元！","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r","type":"5","tab":"","tag":"","source":"","weixin_friend":{"title":"我在全民小视频送你一个红包，最高开100元！","content":"赚钱小游戏-天天送红包","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r"},"weixin":{"title":"我在全民小视频送你一个红包，最高开100元！","content":"赚钱小游戏-天天送红包","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r"},"qq_friend":{"title":"我在全民小视频送你一个红包，最高开100元！","content":"赚钱小游戏-天天送红包","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r"},"qq_zone":{"title":"我在全民小视频送你一个红包，最高开100元！","content":"赚钱小游戏-天天送红包","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r"},"weibo":{"title":"我在全民小视频送你一个红包，最高开100元！","content":"赚钱小游戏-天天送红包","icon":"https://file.beeplay123.com/cdn/wap/images/icon-envelope.png","link":"https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022607r"},"channel":0,"onsuccess":"window.shareFun"}

         
         window.location.href =  `bdminivideo://utils/share?params=${encodeURIComponent(JSON.stringify(params))}&callback=window.shareFun&wfInvitationCode=${encodeURIComponent(this.envelopeStatusCon)}`



        // window.location.href = 'bdminivideo://utils/share?params=%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%2c%22type%22%3a%225%22%2c%22tab%22%3a%22%22%2c%22tag%22%3a%22%22%2c%22source%22%3a%22%22%2c%22weixin_friend%22%3a%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22content%22%3a%22%e8%b5%9a%e9%92%b1%e5%b0%8f%e6%b8%b8%e6%88%8f-%e5%a4%a9%e5%a4%a9%e9%80%81%e7%ba%a2%e5%8c%85%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%7d%2c%22weixin%22%3a%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22content%22%3a%22%e8%b5%9a%e9%92%b1%e5%b0%8f%e6%b8%b8%e6%88%8f-%e5%a4%a9%e5%a4%a9%e9%80%81%e7%ba%a2%e5%8c%85%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%7d%2c%22qq_friend%22%3a%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22content%22%3a%22%e8%b5%9a%e9%92%b1%e5%b0%8f%e6%b8%b8%e6%88%8f-%e5%a4%a9%e5%a4%a9%e9%80%81%e7%ba%a2%e5%8c%85%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%7d%2c%22qq_zone%22%3a%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22content%22%3a%22%e8%b5%9a%e9%92%b1%e5%b0%8f%e6%b8%b8%e6%88%8f-%e5%a4%a9%e5%a4%a9%e9%80%81%e7%ba%a2%e5%8c%85%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%7d%2c%22weibo%22%3a%7b%22title%22%3a%22%e6%88%91%e5%9c%a8%e5%85%a8%e6%b0%91%e5%b0%8f%e8%a7%86%e9%a2%91%e9%80%81%e4%bd%a0%e4%b8%80%e4%b8%aa%e7%ba%a2%e5%8c%85%ef%bc%8c%e6%9c%80%e9%ab%98%e5%bc%80100%e5%85%83%ef%bc%81%22%2c%22content%22%3a%22%e8%b5%9a%e9%92%b1%e5%b0%8f%e6%b8%b8%e6%88%8f-%e5%a4%a9%e5%a4%a9%e9%80%81%e7%ba%a2%e5%8c%85%22%2c%22icon%22%3a%22https%3a%2f%2ffile.beeplay123.com%2fcdn%2fwap%2fimages%2ficon-envelope.png%22%2c%22link%22%3a%22https%3a%2f%2fhaokan.baidu.com%2fh5%2fdownload%3fqr%3d0%26reinvoke%3d1%26fullscreen%3d1%26scheme%3dbaiduhaokan%253A%252F%252Fhome%252Findex%252F%253Fchannel%253Drecommend%2526vid%253D15339386431770775815%2526auto_play_index%253D0%2526ext%253D%25257Blabel%25253D%2525E8%252590%25258C%2525E5%2525A8%252583%252520%2525E5%2525A5%2525B3%2525E5%252584%2525BF%252520%2525E4%2525BA%2525BA%2525E6%252589%25258D%25257D%2526tab%253Dinvoke%2526tag%253Dinvoke%2526source%253Dpush-0-1022423m%26pkg%3d1022607r%22%7d%2c%22channel%22%3a0%2c%22onsuccess%22%3a%22window.shareFun%22%7d&wfInvitationCode=mxz111'
      },
      openHkPanel() {
          // let href = `baiduhaokan://action/share/?title=${encodeURIComponent('我在好看视频送你一个红包，最高开100元！')}&content=${encodeURIComponent('赚钱小游戏-天天送红包')}&image_url=${encodeURIComponent('https://file.beeplay123.com/cdn/wap/images/icon-envelope.png')}&url_key=${encodeURIComponent('https://haokan.baidu.com/h5/download?reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m')}&pkg=1022345e&type=0&activity_type=1&refresh_type=1|0&tab=123&tag=123&source=123&wfInvitationCode=mxxx`
          
          let  urlkey = 'https://haokan.baidu.com/h5/download?reinvoke=1&fullscreen=1&scheme=baiduhaokan://webview/?url_key=' + encodeURIComponent(encodeURIComponent('https://eopa.baidu.com/page/authorizeIndex-AcHzJLpa?productid=1&gtype=1&idfrom=inside-newyearshare&wfInvitationCode=mxxxx'))


          // `https://haokan.baidu.com/h5/download?reinvoke=1&fullscreen=1&scheme=baiduhaokan://webview/?url_key=${encodeURIComponent(encodeURIComponent('https://eopa.baidu.com/page/authorizeIndex-AcHzJLpa?productid=1&gtype=1&idfrom=inside-newyearshare&wfInvitationCode=mxxxx'))}`

          let href = `baiduhaokan://action/share/?title=${encodeURIComponent('我在好看视频送你一个红包，最高开100元！')}&content=${encodeURIComponent('赚钱小游戏-天天送红包')}&image_url=${encodeURIComponent('https://file.beeplay123.com/cdn/wap/images/icon-envelope.png')}&url_key=${encodeURIComponent(urlkey)}&pkg=1022345e&type=0&activity_type=1&refresh_type=1|0&tab=123&tag=123&source=123`


          window.location.href = href;

      },
      async getInvideStatus() {
        return this.axios.post('//ops-api.beeplay123.com/ops/api/springFestival/redEnvelope/status')
      },
      getInvideCode() {
          this.axios.post('//ops-api.beeplay123.com/ops/api/springFestival/redEnvelope/bindInviteCode', {
              inviteCode: this.envelopeStatusCon.inviteCode
          }).then((res) => {
             if(res.data.code == 200) {

             }
          })
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../common/css/base.css';


a {
  text-decoration: none;
  color: #fff;
}

img {
  border: none;
}


html,body {
  height: 100%;

}

.pop-mask {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.6;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}
.envelop-strategy {
  width:6.24rem;
  height:8.84rem;
  background:rgba(224,154,126,1);
  border-radius:0.2rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -3.12rem;
  margin-top: -4.42rem;
  z-index: 12;
  .e-header {
    height: 1.09rem;
    line-height: 1.09rem;
    background: #964431;
    font-size: 0.38rem;
    color: #FCBCA2;
    font-weight: bold;
    text-align: center;
    position: relative;
    .close {
      width: 0.58rem;
      height: 0.58rem;
      position: absolute;
      right: 0.24rem;
      top: 0.24rem;
    }
  }
  .e-content {
    height: 6.74rem;
    font-size: 0.24rem;
    color: #7F2F1C;
    line-height: 0.4rem;
    padding: 0 0.34rem;
    overflow: auto;
    margin-top: 0.36rem;
  }
}
.packet-sharing {
  min-height: 100vh;
  background: #fff6e5;
  .bg {
    width: 100%;
  }
  .header {
    position: relative;
    top: 0.1rem;
    .back {
      width: 0.44rem;
      height: 0.44rem;
      margin-left: 0.16rem;
    }

  }
  .horn-box {
    width: 100%;
    height: 0.3rem;
    font-size: 0.24rem;
    color: #F12F35;
    text-align: center;
    margin-top: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pic-horn {
    width: 0.19rem;
    height: 0.19rem;
    margin-right: 0.1rem;
  }
}
.packet-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .f-strategy-box {
    width: 1.15rem;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    text-indent: 0.1rem;
    word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis; 
  }
  .fx-text {
    font-size: 0.48rem;
    font-weight: 800;
    color: #fff;
    text-align: center;
    line-height: 0.6rem;
    margin-top: 98%;
    letter-spacing:2px;
    .fx-number {
      color: yellow;
    }
  }
  .f-strategy {
    width: 1.29rem;
    height: 0.46rem;
    border:0.02rem solid rgba(250,105,72,1);
    border-radius:0.23rem;
    display: flex;
    align-items: center;
    font-size: 0.2rem;
    font-weight:500;
    color:rgba(250,105,72,1);

  }
  .btn-share {
    display: block;
    width: 4.71rem;
    height: 1.07rem;
    line-height: 0.9rem;
    background: url(./images/btn.png) no-repeat center top;
    background-size: 100% 100%;
    margin: 9% auto 0;
    font-size: 0.38rem;
    color: #9D4B08;
    display: flex;
    justify-content: center;
  }
  .f-back {
    width: 0.28rem;
    height: 0.28rem;
  }
  .friend-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.28rem;
    font-weight: 500;
    color: #F8CF95;
    margin-top: 0.3rem;
    a {
      display: flex;
      align-items: center;
      color: #FFF6E5;
      margin-left: 0.41rem;
      img {
        margin-left: 0.11rem;
      }
    }
  }
}

@media screen and (max-width: 320px) {
  .packet-box {
    .btn-share {
      margin: 5% auto 0;
    }
    .fx-text {
      margin-top: 95%;
    }
  }

}

</style>
