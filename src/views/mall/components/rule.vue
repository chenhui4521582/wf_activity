<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="closed" @click="hide"></div>
    <div class="center">
      <div class="title">
        <img src="../img/rule-tile.png" alt="">
      </div>
      <div class="wrap">
        <img src="../img/rule-center.png" alt="">
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
    width: 6.92rem;
    height: 9.37rem;
    z-index: 2;
    background: url(../img/log-bg.png) no-repeat center center;
    background-size: 100% 100%; 
    transform: translate(-50%, -50%);
    .title {
      margin: 1rem 0 0 1.55rem;
      width: 3.98rem;
      height: .73rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .wrap {
      margin:.92rem 0 0 .94rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      width: 4.98rem;
      height: 6.2rem;
      img {
        vertical-align: top;
        width: 100%;

      }
    }
  }
  .closed {
    position: absolute;
    left: .12rem;
    top: 0;
    z-index: 3;
    width: 1.16rem;
    height: 1.3rem;
    background: url(../img/back.png) no-repeat center center;
    background-size: 100% auto;
  }
}
</style>