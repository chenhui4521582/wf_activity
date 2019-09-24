<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <img src="../images/rule/icon.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <p>1、开宝箱需要消耗宝箱钥匙,钥匙可以通过特惠礼包,游戏累计支持以及充值礼包获得；</p>
            <p>2、每层宝箱所需消耗的钥匙个数各不相同,越高级的宝箱要消耗的钥匙越多；</p>
            <p>3、层数越高，宝箱内奖励越丰厚；</p>
            <p>4、开到最后一个宝箱并领取奖励后,会重置至底层,从底层重新开始新一轮的开箱,每轮钥匙消耗总数不变；</p>
            <p>5、活动期间在游戏中({{ruleMain}})累计支持金叶子数达到一定值即可获得钥匙。</p>
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
    top: 2rem;
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
      background: url("../images/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2rem 0.1rem 0;
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
      background: url("../images/common/close.png") no-repeat center
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
