<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">购买须知</div>
      <h5>话费券抵用说明</h5>
      <p>话费券只可依照每个商品展示的抵扣金额使用，暂不可自定义使用。下单后话费券立刻扣除，若不想购买已下单商品，可至【我的订单】中取消订单，可退还扣除话费券。</p>                         
      <h5>配送方式</h5>
      <p>全场包邮，将由合作商家选择快递公司进行配送。</p>
      <h5>配送时间</h5>
      <p>产品将于付款后x天内发货。特殊说明待确认。您可在【我的订单】中查看商品发货</p>
      <div class="close" @click="hideRule">
        <img src="../img/close.png" alt="">
      </div>
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
    hideRule () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="less" scoped>
.rule {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7);
  }
  .center {
    padding: 0 .25rem .25rem;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 4.6rem;
    background: #B43131;
    border-radius: .32rem;
    .title {
      height: 1.1rem;
      line-height: 1.1rem;
      font-weight: bold;
      font-size: .32rem;
      color: #fff;
    }
    h5 {
      margin-bottom: .1rem;
      font-size: .24rem;
      color: #fff;
      font-weight: bold;
    }
    p {
      margin-bottom: .3rem;
      font-size: .24rem;
      color: #fff;
      line-height: .36rem;
    }
    .close {
      position: absolute;
      left: 50%;
      bottom: -.93rem;
      width: .6rem;
      height: .6rem;
      transform: translate(-50%, 0);
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>