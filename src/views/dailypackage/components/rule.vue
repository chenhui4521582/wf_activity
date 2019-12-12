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
            <p>①活动日期：{{ruleMain}}</p>
            <p>②幸运币是限购礼包内的特有货币，可用于兑换对应奖品； </p>
            <p>③每种限购礼包每人每天仅可购买1次； </p>
            <p>④购买礼包可获得对应金叶，并有概率获得超级幸运币； </p>
            <p>⑤活动期间，幸运币累计一定数量可在兑换页中换取各类奖品，且奖品兑换不限次数； </p>
            <p>⑥活动结束后，幸运币清零； </p>
            <p>⑦如玩家选择购买单独礼包，则无法享受购买所有礼包的折扣； </p>
            <p>⑧如有任何问题可联系在线客服。</p>
            <div class="btn" @click="isShowPop = false">确定</div>
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
      width: 5.05rem;
      height: 10.58rem;
      background:url("../images/pop/rule_bg.png");
      background-size: 100% 100%;
      border-radius:.16rem;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2.55rem 0.2rem 0;
      .title{
        font-size:.48rem;
        text-align: center;
        margin-bottom: .4rem;
        font-weight:800;
        color:rgba(169,92,23,1);
      }
      .main {
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        p {
          line-height: 0.4rem;
          color:#A95C17;
        }
        .btn{
          width:2.96rem;
          height:.8rem;
          line-height:.8rem;
          text-align: center;
          background:linear-gradient(0deg,rgba(249,104,48,1) 0%,rgba(234,62,98,1) 0%,rgba(254,160,117,1) 99%);
          border-radius:.4rem;
          font-size:.32rem;
          font-weight:bold;
          color:rgba(255,255,255,1);
          margin:.3rem auto;
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
