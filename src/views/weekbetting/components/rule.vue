<template>
  <section class="rule" :style="{zIndex: isShowPop ? 2 : 1}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">勋章领取规则</div>
          <div class="main">
            <p>活动时间：{{ruleMain}}</p>
            <br>
            <p>完成任务：</p>
            <p>1. 玩家可以通过完成任务获得活动勋章，勋章达到一定数量可以领取对应奖励</p>
            <p>2. 部分任务每天可以完成多次，每完成一次就可以获得一定数量的活动勋章</p>
            <p>3. 每个任务每天都有最大完成次数限制，达到最大次数则当日无法继续完成，次日重置</p>
            <br>
            <p>奖励领取：</p>
            <p>1. 奖励分为每日奖励和7日累计奖励，玩家勋章达到数量即可领取对应奖励</p>
            <p>2. 每日勋章奖励会在次日0点清零，次日重新累计</p>
            <p>3. 7日奖励在活动期间不清零</p>
            <p>4. 玩家兑换奖励后，勋章数量不会被消耗</p>
            <p>注意：</p>
            <p>活动期间奖励请及时兑换，逾期不领视为放弃奖励</p>
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
      padding: .5rem 0.2rem .2rem;
      width: 6rem;
      height: 6rem;
      background:rgba(255,255,255,1);
      border-radius:.16rem;
      margin: 0 auto;
      box-sizing: border-box;
      .title{
        font-size:.32rem;
        font-weight:bold;
        color:rgba(21,0,43,1);
        text-align: center;
        margin-bottom: .4rem;
      }
      .main {
        height: 4.5rem;
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        p {
          line-height: 0.35rem;
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
