<template>
  <section class="my-awards" @click.prevent="" v-if="show">
    <div class="top-btn-wrap">
      <div class="btn left back" @click="show=false">返回</div>
    </div>
    <p class="awards-title">
      我的话费
    </p>
    <p class="envelope-rmb">{{info.newUserInfo.envelopeRmb}}<span>元</span></p>
    <div class="get-now-btn">马上提取</div>
    <p class="sub-title">
      <template v-if="info.state===1">
        满{{info.convertConsumeRmb}}元可以提取话费
      </template>
      <template v-if="info.state===2">
        提示：最晚提取时间为{{info.newUserInfo.convertEndDate}}<br />
        逾期奖励将会失效
      </template>
    </p>
    <div class="awards-history-wrapper">
      <div class="nav-title"></div>
      <template v-if="currentIndex === 4"></template>
      <template v-if="currentIndex === 5"></template>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      show: this.value,
      currentIndex: 4
    }
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.bgWithFull(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.my-awards {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background: #b52fe1 url('../img/detail-bg.png') no-repeat center ~'-1.2rem';
  background-size: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .top-btn-wrap {
    margin-top: 0.52rem;
    .back {
      width: 0.94rem;
    }
  }
  p {
    text-align: center;
  }
  .awards-title {
    margin-top: 1.12rem;
    color: #6c6c6c;
    font-size: 0.3rem;
    height: 0.36rem;
  }
  .envelope-rmb {
    margin-top: 0.24rem;
    color: #ed2d07;
    font-size: 0.72rem;
    font-weight: bold;
    height: 0.9rem;
    span {
      font-size: 0.36rem;
    }
  }
  .get-now-btn {
    width: 5.4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url('../img/get-now-btn.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fa321e;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    margin: 0.7rem auto 0;
  }
  .sub-title {
    height: 0.6rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #ffbdae;
    margin-top: 0.24rem;
  }
  .awards-history-wrapper {
  }
}
</style>
