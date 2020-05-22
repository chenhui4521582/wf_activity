<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <span class="title title0"></span>
      <div class="desc">
       <scroll>
         <div>
           <p>1.回归大礼包限时3天。(3个自然日)</p>
           <p>2.活动每天会有3个专属任务,全部完成后可领取对应的额外奖励;您仅可完成当天的专属任务,任务奖励需在当天领取,否则将失效;额外奖励需在活动期间内领取,否则失效。</p>
           <p>3.特惠福袋活动期间内仅可购买1次,购买福袋后需要再次进入活动页手动打开,才可获得金叶子哦。</p>
         </div>
       </scroll>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {}
    },
    components:{
      scroll:()=>import('./scroll')
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
    width: 4.43rem;
    height: 5.3rem;
    background: linear-gradient(0deg, rgba(77, 36, 128, 0.98), rgba(38, 23, 67, 0.98));
    border-radius: .32rem;
    z-index: 11;
    .title {
      width: 2.77rem;
      height: .38rem;
      background: url("../images/rule_title.png");
      background-size: 100% 100%;
      position: absolute;
      top: .44rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    .desc {
      position: absolute;
      top: 1.02rem;
      bottom: .1rem;
      left: .33rem;
      right: .3rem;
      font-size: .24rem;
      font-weight: 400;
      color:rgba(255,255,255,1);
      line-height: .36rem;
    }
    .close {
      position: absolute;
      right: .11rem;
      top: .09rem;
      width: .41rem;
      height: .41rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
    }
  }
</style>
