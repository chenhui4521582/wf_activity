<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <!--<img src="../images/rule/icon.png" alt="" @click="showPop">-->
    <!--<div class="icon" @click="showPop">规则</div>-->
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">活动规则</div>
          <div class="main">
            <p>①活动时间：{{ruleMain}}，共7天。</p>
            <p>②幸运币是限购礼包内的特有货币，用于兑换对应奖品； </p>
            <p>③礼包共有6元、26元、46元3种，单个礼包购买不限次数； </p>
            <p>④75元为全部礼包抢购价，每天限购1次，每天0点刷新购买机会； </p>
            <p>⑤购买礼包可获得对应金叶，并有概率获得超级幸运币； </p>
            <p>⑥幸运币累计一定数量可在兑换页中换取各类奖品，奖品兑换不限次数； </p>
            <p>⑦活动结束后，幸运币清零，且无法兑换奖品； </p>
            <p>⑧如有任何问题可联系在线客服。</p>
            <div class="btn" @click="isShowPop = false"></div>     
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "rule",
  data () {
    return {
      isShowPop: false
    };
  },
  props: {
    ruleMain: {
      type: String,
      default: ""
    },
  },
  methods: {
    showPop () {
      this.isShowPop = true
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
*{
  box-sizing: border-box;
}
.rule {
  position: fixed;
  top:0;
  left: 50%;
  margin-left: -2.5rem;
  .icon {
    width: 0.74rem;
    height: 0.4rem;
    line-height: 0.42rem;
    position: fixed;
    right: 0;
    top: .5rem;
    font-size:.24rem;
    font-weight:bold;
    color:rgba(255,114,37,1);
    text-align: center;
    background:rgba(255,255,255,1);
    border-radius:.2rem 0px 0px .2rem;
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
      padding: 2.55rem 0.2rem 0;
      width: 5.18rem;
      height: 9.72rem;
      background:url("../images/pop/rule_bg.png") no-repeat center top;
      background-size: 100% 100%;
      .title{
        font-size:.48rem;
        text-align: center;
        margin-bottom: .3rem;
        font-weight: 800;
        color:#FFFFFF;
      }
      .main {
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        p {
          line-height: 0.4rem;
        }
        .btn{
          position: absolute;
          left: 50%;
          bottom: -1rem;
          transform: translate(-50%, 0);
          width:.6rem;
          height:.6rem;
          background: url(../images/close.png) no-repeat center center;
          background-size: 100% 100%;
        }
      }
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
