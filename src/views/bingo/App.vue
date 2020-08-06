<template>
  <main class="bingo">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()">返回</div>
    <article class="main-content" v-if="info.state===1">
      <div class="time">
        <p>活动时间</p>
        <p>{{info.startDate}}-{{info.endDate}}</p>
      </div>
    </article>
  </main>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      info: {
        state: 1,
        startDate: '2020.07.10',
        endDate: '2020.07.12'
      }
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.bingo {
  position: relative;
  font-size: 0.24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background: #00040c;
  .bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    min-height: 100vh;
    img {
      display: block;
      margin: auto;
    }
  }
  .back {
    position: absolute;
    left: 0;
    top: 0.3rem;
    font-weight: bold;
    color: #a84401;
    background: #ffee4b;
    width: 0.7rem;
    line-height: 0.4rem;
    padding-left: 0.08rem;
    box-sizing: border-box;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  .main-content {
    position: absolute;
    width: 100vw;
    top: 1.1rem;
    .time {
      color: #fff;
      font-weight: 800;
      text-align: center;
      font-size: 0.26rem;
    }
  }
}
</style>
