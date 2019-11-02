<template>
  <section class="rule" :style="{zIndex:isShowPop?11:2}">
    <img src="../images/rule.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">活动规则</div>
          <div class="main">
            <div class="text"><span>1. 活动从{{ruleMain}}</span></div>
            <div class="text"><span>2. 活动期间内,玩家可以通过以下途径获得福袋券,福袋券可用于福袋开启: 游戏内金叶消耗(斗地主、麻将、跑得快、枪火英雄、套圈不计入)、购买活动礼包、完成一定数量的每日任务(每日限一次)</span></div>
            <div class="text"><span>3. 每次开启福袋都需要消耗2张福袋券,每次开启福袋都有机会获得任意福袋中的奖励</span></div>
            <div class="text"><span>4. 每种福袋内奖励数量固定,抽到奖品会从列表中扣除数量,当一个奖品数量降到0后,不会再被抽中</span></div>
            <div class="text"><span>5. 当用户开完全部福袋奖励后,则完成此次活动</span></div>
            <div class="text"><span>6. 本次活动奖励为单人奖励,不予其他玩家共享库存</span></div>
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
      GLOBALS.marchSetsPoint('A_H5PT0209002199')//规则按钮点击
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule {
  position: fixed;
  top: 1.64rem;
  left: 50%;
  margin-left: -2.9rem;
  img {
    width: 0.48rem;
    height: 1.23rem;
    position: fixed;
    right: 0rem;
    top: .2rem;
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
      width: 5.8rem;
      height: 6.6rem;
      background:rgba(93,96,254,1);
      border-radius:.32rem;
      margin: 0 auto;
      box-sizing: border-box;
      .title{
        height: .97rem;
        line-height: .97rem;
        text-align: center;
        background:rgba(57,9,180,1);
        border-radius:.32rem .32rem 0 0;
        font-size:.36rem;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .main {
        font-size: 0.24rem;
        font-weight: 500;
        color:rgba(241,241,255,1);
        padding: .3rem 0.2rem 0;
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
          line-height: 0.4rem;
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
