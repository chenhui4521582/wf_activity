<template>
  <div class="btc">
    <div class="back" @click="back">
      <img class="inner-img" src="./img/back.png" alt="">
    </div>
    <div class="list">
      <div class="item" v-for="item in img" :key="item" @click="openPop">
        <img class="inner-img" :src="item" alt="">
      </div>
    </div>
    <div class="explain">
      多多玩APP由多多玩官方提供， <br>
      如有问题咨询多多玩官方客服微信：youxikefu2020
    </div>
    <div class="btn" @click="bottomClick"></div>
    <div class="popup" v-if="showPop">
      <div class="popu-mask"></div>
      <div class="popu-content">
        <div class="popu-title">下载多多玩APP 享受折扣</div>
        <div class="popu-body">用已绑定的手机号，登录多多玩APP, 还是原来的账号。</div>
        <div class="popu-btn" v-if="isAndroid" @click="handClick">立即下载</div>
        <div class="popu-btn" 
          v-else 
          v-clipboard:copy="downLoadUrl" 
          v-clipboard:success="onCopy" 
          v-clipboard:error="onError"
        >复制下载链接</div>
        <div class="close" @click="hidePop"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'btc',
  data: () => ({
    img: [
      require('./img/item1.png'),
      require('./img/item2.png'),
      require('./img/item3.png'),
      require('./img/item4.png'),
      require('./img/item5.png'),
      require('./img/item6.png')
    ],
    showPop: false,
    downLoadUrl: 'https://wap.beeplaying.com/ddwgame/'
  }),
  computed: {
    isAndroid () {
      if(navigator.userAgent.indexOf('Mac OS') > -1) {
        return false
      }else {
        return true
      }
    }
  },
  methods: {
    back () {
      location.href = SDK.getBackUrl()
    },
    handClick () {
      var channel = GLOBALS.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL');
      GLOBALS.marchSetsPoint('A_H5PT0313003896')
      switch (channel) {
        case '100096':
          parent.location.href = "https://wap.beeplaying.com/m/apk/kucaiba-100096-1.0.7.apk";
          break
        case '100097':
          parent.location.href = "https://wap.beeplaying.com/m/apk/hk_ddw_100097.apk";
          break
        case '100098':
          parent.location.href = "https://wap.beeplaying.com/m/apk/qm_ddw_100098.apk";
          break
        case '100039':
          parent.location.href = "https://wap.beeplaying.com/m/apk/hk_ddw_100097.apk";
          break
        case '100042':
          parent.location.href = "https://wap.beeplaying.com/m/apk/qm_ddw_100098.apk";
          break
        default: 
          parent.location.href = "https://wap.beeplaying.com/m/apk/duoduowan_100030_1.0.2.apk";
      }
    },
    bottomClick () {
      GLOBALS.marchSetsPoint('A_H5PT0313003893')
      if(this.isAndroid) {
        this.handClick()
      }else {
        this.openPop()
      }
    },
    openPop () {
      this.showPop = true
      GLOBALS.marchSetsPoint('A_H5PT0313003894')
      GLOBALS.marchSetsPoint('A_H5PT0313003895')
    },
    hidePop () {
      this.showPop = false
    },
    onCopy () {
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      
      this.$toast.show({ message: '复制失败' })
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0313', {
      source_address: document.referrer
    })
  }
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
@import url('../../../static/iconfont/iconfont.css');
.btc {
  overflow: hidden;
  height: 100vh;
  background: url(./img/bg.png) no-repeat center top #40B66D;
  background-size: 100% auto;
  .back {
    position: absolute;
    left: 0;
    top: .25rem;
    width: .8rem;
    height: .4rem;
  }
  .list {
    margin-top: 2.48rem;
    padding-left: .5rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      margin: 0 .2rem .2rem 0;
      width: 3rem;
      height: 2.2rem;
    }
  }
  .explain {
    margin-top: .2rem;
    text-align: center;
    font-size: .2rem;
    color: #278059;
  }
  .btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: .97rem;
    background: url(./img/btn.png) no-repeat center top;
    background-size: 100% auto;
  }
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    .popu-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      background: rgba(0,0,0,.6);
    }
    .popu-content {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 3;
      transform: translate(-50%, -50%);
      padding: .5rem .3rem 0;
      width: 4.2rem;
      height: 3.1rem;
      color: #fff;
      background: linear-gradient(0deg,rgba(47,207,138,0.98),rgba(1,145,96,0.98));
      border-radius: .32rem;
      .popu-title {
        margin-bottom: .28rem;
        font-weight: bold;
        text-align: center;
        font-size: .26rem;
      }
      .popu-body {
        margin-bottom: .4rem;
        text-align: center;
        font-size: .22rem;
      }
      .popu-btn {
        margin: 0 auto;
        width: 2.55rem;
        height: .71rem;
        line-height: .65rem;
        text-align: center;
        font-size: .24rem;
        color: #DF3711;
        font-weight: bold;
        background: url(./img/popup-btn.png) no-repeat center top;
        background-size: 100% 100%;
      }
      .close {
        position: absolute;
        z-index: 1;
        right: .08rem;
        top: .08rem;
        width: .42rem;
        height: .4rem;
        background: url(./img/popup-close.png) no-repeat center top;
        background-size: 100% 100%;
      }
    }
  }
}

</style>
