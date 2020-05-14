<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">
        <img src="../img/title.png" alt="">
      </div>
      <div class="wrap">
        1、活动时间：5月19日-5月25日<br>
        2、活动期间，玩家累计充值达到一定梯度，可领取奖品；<br>
        3、任务分为【每日充值】和【一周充值】两种，达到每日充值任务可在每天24点前领取奖品；<br>
        4、【一周充值】奖品需在5月25日24点前手动领取；<br>
        5、奖品请及时领取
      </div>
      <div class="closed" @click="hide"></div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'rule',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.rule{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6.55rem;
    height: 9.59rem;
    z-index: 2;
    transform: translate(-50%, -50%);
    background: url(../img/popup.png) no-repeat center top;
    background-size: 100% 100%;
    .title {
      margin: 3.6rem 0 0 2.05rem;
      width: 1.95rem;
      height: .37rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .wrap {
      margin:.24rem 0 0 1.4rem;
      width: 3.55rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      color: #fff;
      font-size: .24rem;
      font-weight: bold;
      line-height: .45rem;
    }
  }
  .closed {
    position: absolute;
    left: 2.72rem;
    bottom: -.6rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
  }
}
</style>