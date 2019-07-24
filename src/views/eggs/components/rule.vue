<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <img src="../pages/images/rule/icon.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <p>1、消耗锤子可砸开彩蛋，获取奖励。砸完当前所有蛋，将会生成新蛋供您砸；</p>
            <p>2、购买活动内礼包可获得锤子，重复购买可重复获取；</p>
            <p>3、在以下游戏中，活动期间累计支持金叶子到一定值可获得锤子：</p>
            <p>{{ruleMain}}</p>
            <p>4、活动结束后，将按累计获得的锤子数（不管是否被消耗）排名，前30名有奖励，累计锤子数一样的，先累计到该数目的排在前面。</p>
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
    left: 0.14rem;
    top: 2.18rem;
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
      height: 6.8rem;
      background: url("../pages/images/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2.16rem 0.26rem 0;
      .main {
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        p {
          line-height: 0.32rem;
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
