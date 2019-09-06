<template>
  <section class="rule" :style="{zIndex:isShowPop?3:2}">
    <img src="../images/rule.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <div class="text1" style="text-align: center">活动时间：9月12日10:00 -9月18日23:59:59</div>
            <div class="text"><i></i><span>翻牌以及升级场次需要消耗一定的翻牌点,翻牌点可以通过游戏累计支持以及充值礼包获得</span></div>
            <div class="text"><i></i><span>玩家升级场次后,无法退回至原场次。例:玩家消耗翻牌点从初级场升级至中级场,则无法退回初级场</span></div>
            <div class="text"><i></i><span>单场次翻牌次数越多,所需要的翻牌点也越多</span></div>
            <div class="text"><i></i><span>初级场消耗的翻牌点最少,中级场其次,高级场最多</span></div>
            <div class="text"><i></i><span>翻牌获得的奖励中,高级场奖励最丰厚,中级场其次,初级场最少</span></div>
            <div class="text"><i></i><span>用户可以在翻牌中途选择重置翻牌进度,开始新一轮翻牌</span></div>
            <div class="text"><i></i><span>当任意场次,玩家翻完所有的牌面,会重新洗牌开始新一轮的翻牌,每轮消耗的翻牌点不变</span></div>
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
      GLOBALS.marchSetsPoint('A_H5PT0156001769')//H5平台-翻牌活动-中间区域-规则按钮点击
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
      padding: .9rem 0.2rem 0;
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
