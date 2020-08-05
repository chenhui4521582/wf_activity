<template>
  <main class="bingo">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()">返回</div>
  </main>
</template>

<script>
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
    top: 2.18rem;
    .time {
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-style: italic;
    }
    .end-time {
      background: #849be9;
      width: 4.1rem;
      padding: 0 0.24rem;
      height: 0.48rem;
      margin: -0.04rem auto;
      text-align: center;
      line-height: 0.46rem;
      border-radius: 0.24rem;
      color: #1f2961;
    }
  }
}
</style>
