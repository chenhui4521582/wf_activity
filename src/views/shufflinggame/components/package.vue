<template>
  <section class="rule2" :style="{zIndex:isShowPop?3:2}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">
            <img class="package-title" src="../images/pop/package-title.png" alt="">
          </div>
          <div class="main"
            style="background: #A80631;border-radius:0px 0px .16rem .16rem;width: 80%;
    margin: 0.9rem 0px 0px 0.4rem;color:#fff;box-sizing: border-box">
            <div class="packages">
              <div class="item" v-for="(item,index) in leaguePacksListArr" @click="gotopay(item)">
                <div class="txt">{{item.content.split('+')[0]}}+{{item.content.split('+')[1]}}</div>
                <div class="btn">￥{{item.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
import { showLeaguePacksList } from '../utils/api'
export default {
  name: 'rule',
  data () {
    return {
      isShowPop: false,
      leaguePacksListArr: []
    }
  },
  props: {
    ruleMain: {
      type: String,
      default: ''
    },
    from: {
      type: Number,
      default: 0
    }
  },
  computed: {
    channel () {
      return localStorage.getItem('APP_CHANNEL') || ''
    }
  },
  methods: {
    async getShowLeaguePacksList () {
      const { code, data } = await showLeaguePacksList()
      if (code === 200) {
        GLOBALS.marchSetsPoint('A_H5PT0156001787')// H5平台-翻牌活动-弹窗反馈-翻牌礼包弹窗加载完成 data.leaguePacksList
        this.leaguePacksListArr = data.leaguePacksList
      }
    },
    showPop () {
      this.getShowLeaguePacksList()
      this.isShowPop = true
      GLOBALS.marchSetsPoint('A_H5PT0156001770')// H5平台-翻牌活动-中间区域-礼包按钮点击
    },
    gotopay (item) {
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0156001788', { recharge_rmb: item.price, product_id: item.bizId })   // H5平台-翻牌活动-弹窗反馈-翻牌礼包弹窗-礼包点击
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule2 {
  position: fixed;
  top: 0;
  left: 50%;
  // margin-left: -2.86 * 1.125rem;
      margin-left: -3.55rem;
  img {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    left: 0.04rem;
    top: 3.68rem;
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      // width: 5.722 * 1.125rem;
      width: 7.1rem;
      height: 8.68 * 1.125rem;
      background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 1.3rem 0.75rem 0.6rem 1rem;
      .title {
        margin-top: 0.5rem;
        font-size: 0.54rem;
        height: 1 * 1.125rem;
        line-height: 1 * 1.125rem;
        text-align: center;
        font-weight: 400;
        color: rgba(255, 230, 173, 1);
        background: linear-gradient(
          0deg,
          rgba(254, 222, 87, 1) 0%,
          rgba(254, 252, 201, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        .package-title{
          position: static;
          width: 2.58rem;
          height: 0.76rem;
        }
      }
      .main {
        font-size: 0.2rem;
        font-weight: 400;
        .packages {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.13rem;
          .item {
            height: 1.32rem;
            padding: 0.32rem 0rem 0 1.5rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 0.18rem;
            &:nth-child(3) {
              margin-bottom: 0;
            }
            .txt {
              font-size: 0.2rem;
              /*font-weight:800;*/
              color: rgba(255, 249, 236, 1);
            }
            .btn {
              margin-top: 0.14rem;
              width: 1.35rem;
              height: 0.53rem;
              font-weight: 800;
              color: rgba(117, 5, 3, 1);
              font-size: 0.3rem;
              line-height: 0.53rem;
              text-align: center;
              background: url("../images/pop/package/pay_btn.png") no-repeat
                center center / 100% 100%;
            }
            &:nth-child(1) {
              background: url("../images/pop/package/package1.png") no-repeat
                center center / 100% 100%;
            }
            &:nth-child(2) {
              background: url("../images/pop/package/package2.png") no-repeat
                center center / 100% 100%;
            }
            &:nth-child(3) {
              background: url("../images/pop/package/package3.png") no-repeat
                center center / 100% 100%;
            }
          }
        }
        .text {
          font-size: 0.18rem;
          color: #3f1207;
          span {
            color: #cf5e20;
          }
        }
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      margin: 0 auto;
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
