<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <p>1.用户在台球里击中奖池时，视频会在“奖池高光时刻”中展示，用户打出一杆多球时（5球及以上),视频会在“一杆多球”中展示。</p>
      <p>2.视频按热度值高低排序，热度值大小与播放量、出杆额度、击中奖池金额/一杆多球倍率、视频生产时间相关。</p>
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
    z-index: 10;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 11;
    transform: translate(-50%, -50%);
    padding: 1.5rem .3rem 0;
    width: 5.1rem;
    height: 4.44rem;
    background: url(../img/rule-bg.png) no-repeat center center;
    background-size: 100% 100%;
    font-size: .24rem;
    color: #fff;
    p {
      margin-bottom: .1rem;
      line-height: .34rem;
    }
    .closed {
      position: absolute;
      left: 50%;
      bottom: -.9rem;
      transform: translate(-50%, 0);
      width: .58rem;
      height: .58rem;
      background: url(../img/close-icon.png) no-repeat center center;
      background-size: 98% 100%;
    }
  }
}
</style>