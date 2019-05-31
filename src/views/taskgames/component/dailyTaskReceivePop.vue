<template>
  <main>
    <div class="mask" @touchmove.prevent></div>
    <div class="content-box" @touchmove.prevent>
      <div class="content-wrapper">
        <img :src="awards.awardsImage|filter" alt="">
        <p>{{awards.awardsName}}<span v-if="awards.awardsNum>1">x{{awards.awardsNum}}</span></p>
        <p class="btn" @click="closePop">朕收下啦</p>
      </div>
      <div class="close" @click="closePop"></div>
    </div>
  </main>
</template>

<script>
export default {
  name: '',
  props: {
    awards: {
      type: Object,
      default: {}
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.mask {
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
.content-box {
  position: fixed;
  z-index: 11;
  top: 0;
  width: 100%;
  left: 50%;
  margin-left: -50%;
  animation: dailyScale 1.5s ease-in-out;
  .content-wrapper {
    box-sizing: border-box;
    width: 5.44rem;
    height: 6.86rem;
    background: url("../img/dailyTaskPop/receive_pop.png") no-repeat center /
      100% 100%;
    padding: 3.04rem 0.32rem 0;
    margin: 0 auto;
    img {
      width: 0.88rem;
      height: 0.7rem;
      display: block;
      margin: 0 auto 0.28rem;
    }
    p {
      font-size: 0.3rem;
      height: 0.32rem;
      line-height: 0.32rem;
      color: #eb423d;
      font-weight: bold;
      text-align: center;
    }
    .btn {
      font-size: 0.24rem;
      color: #461010;
      box-sizing: border-box;
      width: 2.62rem;
      height: 0.58rem;
      line-height: 0.58rem;
      margin: 1.22rem auto 0;
      background: url("../img/dailyTaskPop/update_dailytask_btn_light.png")
        no-repeat center / 100% 100%;
    }
  }
  .close {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.36rem auto 0;
    background: url("../img/dailyTaskPop/close_icon.png") no-repeat center /
      100% 100%;
  }
}
@keyframes dailyScale {
  0% {
    transform: scale(0, 0);
  }
  20% {
    transform: scale(1.1, 0.95);
  }
  30% {
    transform: scale(0.95, 1.1);
  }
  50% {
    transform: scale(1, 1);
  }
  57% {
    transform: scale(1, 1);
  }
  64% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
