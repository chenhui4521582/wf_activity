<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <span class="title title0">活动规则</span>
      <div class="desc">
        <p v-if="actInfo" style="margin-bottom: .24rem">活动时间：{{actInfo.beginDate}}~{{actInfo.endDate}}</p>
        <p>活动介绍：‘夏季用户大酬宾’活动是多多玩给用户的专属回馈活动。</p>
        <p>1. 用户点击礼包，即可直接以折扣价购买；</p>
        <p>2. 购买礼包付款成功后，金叶子即可立即到账；</p>
        <p>3. 由于金叶子为虚拟产品，购买后概不退款，请理性消费。</p>
        <p>多多玩游戏平台对本活动具有最终解释权。</p>
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
    props:{
      actInfo:{
        type:Object,
        default:null
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
    width: 4.2rem;
    height: 5.8rem;
    background:linear-gradient(0deg,rgba(1,145,138,0.98),rgba(47,207,138,0.98));
    border-radius:.32rem;
    z-index: 11;
    .title {
      position: absolute;
      top: .51rem;
      left: .9rem;
      right: 1.04rem;
      font-size:.26rem;
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-align: center;
    }
    .desc {
      position: absolute;
      top: 1.02rem;
      left: .33rem;
      right: .3rem;
      font-size: .22rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      p{
        line-height: .33rem;
      }
    }
    .close {
      position: absolute;
      left: 0;
      right: 0;
      bottom:-.9rem;
      margin: auto;
      width: .6rem;
      height: .6rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
    }
  }
</style>
