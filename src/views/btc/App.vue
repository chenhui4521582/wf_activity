<template>
  <div class="btc">
    <div class="back" @click="back">
      返回
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in goods" :key="index" @click="openPop">
        <img class="goods-img" :src="item.img" alt="">
        <div class="goods-text">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-origin-price">原价：¥{{item.originPrice}}</div>
        </div>
        <div class="price-btn">¥{{item.price}}</div>
      </div>
    </div>
    <div class="explain">
      <div class="title">更多超值优惠，尽在多多玩APP</div>
      多多玩APP由多多玩官方提供， <br>
      如有问题咨询多多玩官方客服微信：youxikefu2020
    </div>
    <div class="btn" @click="bottomClick"></div>
    <div class="popup" v-if="showPop">
      <div class="popu-mask"></div>
      <div class="popu-content">
        <div class="popu-title">下载多多玩APP享受折扣</div>
        <div class="popu-body">用已绑定的手机号，登录多多玩APP,还是原来的账号哦！</div>
        <div class="popu-btn" v-if="isAndroid" @click="handClick"></div>
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
import { downloadApk } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'btc',
  data: () => ({
    goods: [
      {
        img: require('./img/item1.png'),
        originPrice: 68,
        name: '6.8万金叶子',
        price: 65
      },
      {
        img: require('./img/item2.png'),
        originPrice: 88,
        name: '8.8万金叶子',
        price: 82
      },
      {
        img: require('./img/item3.png'),
        originPrice: 188,
        name: '18.8万金叶子',
        price: 178
      },
      {
        img: require('./img/item4.png'),
        originPrice: 288,
        name: '28.8万金叶子',
        price: 270  
      },
      {
        img: require('./img/item5.png'),
        originPrice: 688,
        name: '68.8万金叶子',
        price: 650
      },
      {
        img: require('./img/item6.png'),
        originPrice: 888,
        name: '88.8万金叶子',
        price: 840
      },
      {
        img: require('./img/item7.png'),
        originPrice: 1088,
        name: '108.8万金叶子',
        price: 1020
      },
      {
        img: require('./img/item8.png'),
        originPrice: 1288,
        name: '128.8万金叶子',
        price: 1200
      }
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
      downloadApk().then( res => {
        const {code, data} = res
        if(code == 200) {
          this.$toast.show({message: '正在下载多多玩，请稍候'}, () => {
            parent.location.href = data
          })
        }
      })
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
  padding-bottom: .26rem;
  overflow: hidden;
  min-height: 100vh;
  background: url(./img/bg.png) no-repeat center top#FC685C;
  background-size: 100% auto;
  .back {
    position: absolute;
    left: 0;
    top: .25rem;
    width: .8rem;
    height: .4rem;
    font-size: .22rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #7182FF;
    border-radius: 0px .2rem .2rem 0px;
  }
  .list {
    margin: 2.40rem .24rem 0;
    padding: .2rem 0 0 .25rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: #fff;
    box-shadow: 2px 5px 5px 0px rgba(149, 11, 0, 0.29);
    border-radius: .46rem;
    .item {
      position: relative;
      margin: 0 .2rem .2rem 0;
      padding-top: .16rem;
      width: 3rem;
      height: 2.2rem;
      border: 1px solid #F16D59;
      border-radius: .26rem;
      display: flex;
      justify-content: center;
      .goods-img {
        height: 1.1rem;
      }
      .goods-text {
        white-space: nowrap;
        .goods-name {
          padding: .1rem 0 .15rem 0;
          font-size: .26rem;
          font-weight: bold;
          color: #FA3727;
        }
        .goods-origin-price {
          font-weight: bold;
          font-size: .22rem;
          color: #AAAAAA;
          text-decoration: line-through;
        }
      }
      .price-btn {
        position: absolute;
        left: 50%;
        top: 1.3rem;
        transform: translate(-50%, 0);
        width: 2.58rem;
        height: .7rem;
        font-size: .3rem;
        font-weight: bold;
        color: #FF4200;
        background: url(./img/popup-btn.png) no-repeat center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
  .explain {
    .title {
      padding: .1rem 0 .3rem;
      font-size: .3rem;
      color: #FDD54B;
      font-weight: bold;
    }
    margin-top: .2rem;
    text-align: center;
    font-size: .2rem;
    color: #8D0B01;
    font-weight: bold;
  }
  .btn {
    position: absolute;
    left: 50%;
    top: 1.47rem;
    z-index: 1;
    transform: translate(-50%, 0);
    width: 2.55rem;
    height: .7rem;
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
      padding: .34rem .3rem 0;
      width: 4.2rem;
      height: 3.9rem;
      color: #fff;
      background: url(./img/popup-bg.png) no-repeat center top;
      background-size: 100% 100%;
      .popu-title {
        margin-bottom: .6rem;
        font-weight: bold;
        text-align: center;
        font-size: .26rem;
      }
      .popu-body {
        margin-bottom: .8rem;
        text-align: left;
        font-size: .22rem;

      }
      .popu-btn {
        margin: 0 auto;
        width: 2.55rem;
        height: .7rem;
        background: url(./img/btn.png) no-repeat center top;
        background-size: 100% auto;
      }
      .close {
        position: absolute;
        z-index: 1;
        bottom: -.6rem;
        left: 50%;
        width: .42rem;
        height: .42rem;
        transform: translate(-50%, 0);
        background: url(./img/popup-close.png) no-repeat center top;
        background-size: 100% 100%;
      }
    }
  }
}

</style>
