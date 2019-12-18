<template>
  <div class="rule-mask">
    <div class="rule-bg">
      <div class="rule-bg-top">
        <img src="../images/rule-top.png">
        <img class='rule-title' src="../images/rule-title.png">
        <div class="close" @click="close">
          <img src="../images/close.png" alt="">
        </div>
      </div>
      <div class="rule-text">
        <span>活动时间:{{stime}}</span>
        <span>
1. 活动期间内，玩家在游戏中消耗一定的叶子，可领取摇奖机次数;</span>
        <span>2. 每次摇奖都会随机摇出5个图案，玩家根据摇出的相同图案的数量会获得不同的奖励，出现的相同图案越多，奖励越丰厚;</span>
        <span>3. 活动期间，玩家累计获得的摇奖次数会进行排行;</span>
        <span>4. 活动结束后，按照最终排行进行奖励发放;</span>
        <span>5. 活动结束后，排行榜还会展示一天时间。</span>
      </div>
      <div class="rule-bottom">
        <img src="../images/rule-bottom.png">
      </div>
    </div>
  </div>
</template>
<script>
  // import ruleVue from '../../newUserPrizeClaw/components/rule.vue'
  export default {
    data() {
      return {
        showRule: false,

      }
    },
    props:{
      time:{
        type:String,
        default:''
      }
    },
    methods: {
      close() {
        this.$emit('close', this.showRule)
      }
    }
  }
</script>
<style lang="less">

  .rule-mask {
    width: 100%;
    position: fixed;
    top: 0;
    height: 100%;
    z-index: 5;
    background-color: rgba(0, 0, 0, .5);
  }

  .rule-bg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 5.90rem;
    height: 6.89rem;
    background: #ed2437;
    border-radius: 0.20rem;
    margin: 0 auto;
  }

  .rule-bg-top {
    position: absolute;
    width: 6.27rem;
    height: 3.66rem;
    top: -2rem;
    left: -0.14rem;
  }

  .rule-bg-top img {
    width: 6.27rem;
    height: 3.66rem;
  }

  .rule-title {
    position: absolute !important;
    width: 2.33rem !important;
    height: 0.54rem !important;
    top: 2.01rem !important;
    left: 1.91rem !important;
  }

  .rule-text {
    position: relative;
    width: 5.08rem;
    height: 3.49rem;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.36rem;
    margin: 0 auto;
    top: 1.7rem;
  }

  .rule-text span {
    display: block;
  }

  .rule-bottom {
    position: relative;
    /* position: absolute; */
    /* bottom: 1rem; */
    top: 2.3rem;
    right: 0.3rem;
  }

  .rule-bottom img {
    width: 6.51rem;
    height: 1.18rem;
  }

  .close {
    background: url("../images/close-bg.png");
    background-size: 100% 100%;
    width: 0.81rem;
    height: 0.84rem;
    width: 0.81rem;
    height: 0.84rem;
    position: absolute;
    top: 1rem;
    left: 5.29rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close img {
    width: 0.35rem;
    height: 0.34rem;
  }
</style>
