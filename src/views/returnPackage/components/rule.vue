<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <span class="title title0">活动规则</span>
      <div class="desc">
        <p>1. 做每日任务，可领取积分。累计积分至一定数值，可领取到对应话费奖励，在“我的-我的资产”中可查看；</p>
        <p>2. 活动期内的积分不会每日清零，而是一直累计；</p>
        <p>3. 每日任务达成的流水第二天会清零。</p>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }

  .bonus-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.3rem;
    height: 4.08rem;
    background: url("../images/package/rule_bg.png");
    background-size: 100% 100%;
    z-index: 11;
    .title {
      position: absolute;
      top: .19rem;
      left: .9rem;
      right: 1.04rem;
      font-size:.3rem;
      font-weight:bold;
      color:rgba(166,171,201,1);
      text-align: center;
    }
    .desc {
      position: absolute;
      top: 1.02rem;
      left: .33rem;
      right: .3rem;
      font-size: .24rem;
      font-weight:400;
      color:rgba(166,171,201,1);
      line-height: .3rem;
    }
    .close {
      position: absolute;
      right: .26rem;
      top:.26rem;
      width: .19rem;
      height: .19rem;
      background: url("../images/package/ruleclose.png");
      background-size: 100% 100%;
    }
  }
</style>
