<template>
  <article class="wrapper">
    <LongSwiper class="notice" />
    <Box />
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
