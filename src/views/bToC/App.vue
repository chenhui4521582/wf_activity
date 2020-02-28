<template>
  <main class="b-to-c">
    <section class="btn-wrapper">
      <div class="back">返回</div>
      <div class="rule">规则</div>
    </section>
    <section class="activity-time">
      活动时间
    </section>
    <section class="top-activity"></section>
    <section class="bottom-activity"></section>
  </main>
</template>

<script>
import { moveInfo } from './services/api'
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.bg-top(@url) {
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: url(@url);
}
.b-to-c {
  min-height: 100vh;
  background-color: #3e1648;
  box-sizing: border-box;
  padding-top: 0.3rem;
  font-family: Alibaba PuHuiTi;
  position: relative;
  .bg-top("./img/bg.png");
  .btn-wrapper {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0.24rem;
    div {
      width: 0.54rem;
      border-radius: 0 0.2rem 0.2rem 0;
      text-align: center;
      line-height: 0.34rem;
      padding: 0.2rem 0 0.28rem;
    }
    .back {
      background-color: #e88085;
    }
    .rule {
      background-color: #ac5ff4;
    }
  }
}
</style>
