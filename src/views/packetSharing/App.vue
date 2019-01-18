<template>
  <div class="packet-sharing">
    <img src="./images/bg.png" class="bg">
    <div class="packet-box">
      <div class="header">
        <img src="./images/f-back.png" class="back">
        <div class="f-strategy-box">
          <span class="f-strategy">赚红包攻略</span>
        </div>
        <div class=""></div>
        <div class="fx-text">首次分享成功<br/>立得<span class="fx-number">1</span>个红包</div>
        <a href="javascript:" class="btn-share" @click="openPanel">分享赚红包</a>
      </div>
      <div class="horn-box"><img src="./images/horn.png" class="pic-horn">100000人已赚到红包</div>
    </div>

  </div>
</template>
<script type="text/javascript">
  import API from '../../api';
  export default {
    data() {
      return {
        envelopeStatusCon: null
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
          window.location.href = 'baiduhaokan://action/share/?title=%e8%bf%99%e4%b8%aa%e6%98%af%e5%88%86%e4%ba%ab%e9%9d%a2%e6%9d%bf&content=%e5%88%86%e4%ba%ab%e9%9d%a2%e6%9d%bf%e5%86%85%e5%ae%b9&image_url=123&url_key=https://haokan.baidu.com/h5/download?qr=0&reinvoke=1&fullscreen=1&scheme=baiduhaokan%3A%2F%2Fhome%2Findex%2F%3Fchannel%3Drecommend%26vid%3D15339386431770775815%26auto_play_index%3D0%26ext%3D%257Blabel%253D%25E8%2590%258C%25E5%25A8%2583%2520%25E5%25A5%25B3%25E5%2584%25BF%2520%25E4%25BA%25BA%25E6%2589%258D%257D%26tab%3Dinvoke%26tag%3Dinvoke%26source%3Dpush-0-1022423m&pkg=1022128e&type=0&activity_type=1&refresh_type=1|0&tab=123&tag=123&source=123&wfInvitationCode='+this.envelopeStatusCon.inviteCode
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
    margin-top: 1.5rem;
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
    margin-top: 100%;
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
    margin: 0.69rem auto 0;
    font-size: 0.38rem;
    color: #9D4B08;
    display: flex;
    justify-content: center;
  }
}


</style>
