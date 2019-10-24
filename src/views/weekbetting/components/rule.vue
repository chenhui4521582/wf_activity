<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <!--<img src="../images/rule/icon.png" alt="" @click="showPop">-->
    <!--<div class="icon" @click="showPop">规则</div>-->
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">勋章领取规则</div>
          <div class="main">
            <p>1. 活动时间：{{ruleMain}}</p>
            <p>2. 部分任务每天可多次完成，且每个任务每天都有最大完成次数限制</p>
            <p>3. 玩家每完成一个任务，都可以获得一定的勋章奖励，当勋章达到一定数量要求即可领取对应奖励</p>
            <p>4. 奖励分为每日奖励及7日累计奖励</p>
            <p>5. 活动期间，每日奖励会在当日24点清零，次日重新累计。7日奖励在活动期间内不清零</p>
            <p>6. 兑换奖励后，勋章数量不会被消耗</p>
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
  margin-left: -3rem;
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
      width: 6rem;
      height: 6rem;
      background:rgba(255,255,255,1);
      border-radius:.16rem;
      margin: 0 auto;
      box-sizing: border-box;
      padding: .5rem 0.2rem 0;
      .title{
        font-size:.32rem;
        font-weight:bold;
        color:rgba(21,0,43,1);
        text-align: center;
        margin-bottom: .4rem;
      }
      .main {
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        p {
          line-height: 0.32rem;
          color:#60586A;
        }
      }
    }
    .close-icon {
      width: 0.2rem;
      height: 0.2rem;
      background: url("../images/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      top: .2rem;
      right:.2rem;
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
