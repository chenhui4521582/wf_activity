<template>
  <article class="wrapper">
    <LongSwiper class="notice" />
    <section class="box__section">
      <div class="bg__div--rotate"></div>
      <Box />
    </section>
    <img class="goods-detail"
      @click="toAllProduct"
      src="./assets/detail.png">
  </article>
</template>

<script>
import LongSwiper from '../../components/longSwiper'
import Box from './components/box'

export default {
  data () {
    return {
    }
  },
  components: {
    LongSwiper,
    Box
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002551') // H5平台-盲盒页面-选盲盒页面加载完成
  },
  methods: {
    toAllProduct () {
      this.$router.push({
        name: 'AllProducts'
      })
      GLOBALS.marchSetsPoint('A_H5PT0225002554') // H5平台-盲盒页面-选盲盒页面-商品详情点击
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.wrapper {
  height: 100vh;
  position: relative;
  background: #2a2d3c;
  padding-top: 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  .box__section {
    position: relative;
    .bg__div--rotate {
      background: url("./components/box/assets/shine.png") no-repeat;
      background-size: cover;
      position: absolute;
      width: 7.2rem;
      height: 6.58rem;
      animation: rotate 4.5s linear infinite;
    }
  }
  .notice {
    margin: 0 auto;
    width: 3.87rem;
  }
  .goods-detail {
    width: 3.45rem;
    height: 3.45rem;
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    bottom: -2.38rem;
  }
}
</style>
