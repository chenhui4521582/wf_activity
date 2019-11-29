<template>
  <article class="wrapper">
    <LongSwiper class="notice" />
    <Box />
    <img class="goods-detail"
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
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  position: relative;
  background: #2a2d3c;
  padding-top: 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
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
