<template>
  <main>
    <div class="mask"></div>
    <div class="content-box">
      <div class="content-wrapper">
        <img :src="(awards.showAwardsImage||awards.awardsImage)|filter"
          alt="">
        <p v-if="awards.awardsNum>1">{{getPrizeName(awards)}}</p>
        <p v-else>{{awards.awardsName}}</p>
        <p class="btn"
          @click="closePop(1)">朕收下啦</p>
        <p class="text"
          v-if="isDaily">完成每日任务,领更多红包</p>
      </div>
      <div class="close"
        @click="closePop(0)"></div>
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
    },
    isDaily: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closePop (flag) {
      if (flag && this.awards && this.awards.flag && this.awards.flag == 'ring2') {
        GLOBALS.marchSetsPoint('A_H5PT0061001619')
      }
      this.$emit('closePop')
    },
    getPrizeName (awards) {
      Number.prototype.mul = function (arg) {
        var m = 0, s1 = this.toString(), s2 = arg.toString()
        try { m += s1.split('.')[1].length } catch (e) { }
        try { m += s2.split('.')[1].length } catch (e) { }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
      }

      return (parseFloat(awards.awardsName).mul(awards.awardsNum)) + awards.awardsName.match(/[\u4e00-\u9fa5]/g).join('')
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
    .text {
      margin-top: 0.1rem;
      font-size: 0.26rem;
      font-weight: bold;
      color: #f8cea8;
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
