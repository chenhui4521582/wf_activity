<template>
  <div class="step">
    <div class="item">
      <div class="icon">
        <img src="../img/step1-active.png" alt="">
      </div>
      <div class="text active" v-if="step == 1">绑定手机号</div>
      <div class="text active" v-if="step != 1">
        <p>已绑定手机号</p>
        <p>({{bindPhone}})</p>
      </div>
      <div class="right-icon">
        <img v-if="step != 1" src="../img/next-icon.png" alt="">
        <img v-if="step == 1" src="../img/next-icon-active.png" alt="">
      </div>
    </div>
    <div class="item">
      <div class="icon">
        <img v-if="step != 2" src="../img/step2.png" alt="">
        <img v-if="step == 2" src="../img/step2-active.png" alt="">
      </div>
      <div class="text" v-if="step != 2" >关注公众号</div>
      <div class="text active" v-if="step == 2">关注公众号</div>
      <div class="right-icon">
        <img v-if="step != 2" src="../img/next-icon.png" alt="">
        <img v-if="step == 2" src="../img/next-icon-active.png" alt="">
      </div>
    </div>
    <div class="item last">
      <div class="icon">
        <img src="../img/step3.png" alt="">
      </div>
      <div class="text">获赠额外优惠</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'step',
  props: {
    bindPhone: {
      type: String,
      default: ''
    }
  },
  computed: {
    step() {
      if(this.bindPhone) {
        return 2
      }
      return 1
    }
  }  
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.step {
  margin: 0 .3rem;
  padding: .3rem .2rem 0;
  display: flex;
  justify-content: space-between;
  border-radius:16px;
  height: 2rem;
  background: #FCF4DE;
  .item {
    position: relative;
    width: 33%;
    .wrap {
      text-align: center;
    }
    &.last {
      padding-right: 0;
      margin-right: 0;
    }
    .text {
      text-align: center;
      white-space: nowrap;
      font-size: .22rem;
      color: #ACA79A;
      &.active {
        color: #D1AC42;
      }
    }
    .icon {
      margin-bottom: .17rem;
      width: 100%;
      text-align: center;
      img {
        vertical-align: top;
        width: .88rem;
        height: .88rem;
      }
    }
    .right-icon {
      position: absolute;
      right: -.1rem;
      top: .32rem;
      width: .12rem;
      height: .21rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>