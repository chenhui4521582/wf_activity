<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <img src="../images/rule.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <div class="text"><i></i><span>用户通过投注和充值可以获得翻牌点,使用翻牌点翻牌可以获得对应奖励。</span></div>
            <div class="text"><i></i><span>每次翻盘所需要翻盘点不一致,例:第一次翻盘需要20翻牌点,第二次翻盘需要40点,第三次需要80点。</span></div>
            <div class="text"><i></i><span>翻盘奖励可翻出话费,京东卡,金叶,翻倍卡等。</span></div>
            <div class="text"><i></i><span>用户翻出翻倍卡后,下次翻出奖品按照翻倍卡倍数进行翻倍。</span></div>
            <div class="text"><i></i><span>每次翻牌共有9张牌,用户可翻完全部9张卡后重置,或者选择提前重置9张牌。</span></div>
            <div class="text"><i></i><span>活动场次分为初级场,中级场,高级场,用户可使用固定翻牌点升级场地,升级后不可退级。</span></div>
            <div class="text"><i></i><span>每次翻牌有20%几率翻出翻倍卡,与奖品同时获得。</span></div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
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
    from: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showPop () {
      this.isShowPop = true
      if (this.from) {
        GLOBALS.marchSetsPoint('A_H5PT0075001482')   // H5平台-砸金蛋-活动已结束-点击规则
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0075001459')   // H5平台-砸金蛋-点击规则
      }
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule {
  position: fixed;
  top: 1.64rem;
  left: 50%;
  margin-left: -2.46rem;
  img {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    left: 0.04rem;
    top: 2.72rem;
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
      width: 4.92rem;
      height: 5.62rem;
      background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 1.06rem 0.2rem 0;
      .main {
        font-size: 0.2rem;
        font-weight: bold;
        color:rgba(236,110,71,1);
        .text{
          display: flex;
          i{
            margin-top: .1rem;
            display: inline-block;
            width:.1rem;
            height:.1rem;
            background:rgba(236,110,71,1);
            border-radius:50%;
            margin-right: .18rem;
          }
          span{
            max-width: 4.2rem;
          }
          line-height: 0.3rem;
        }
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      margin: 0.4rem auto 0;
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
