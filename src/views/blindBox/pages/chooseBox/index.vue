<template>
  <article class="wrapper">
    <LongSwiper class="notice" />
    <Box />
    <MButton @confirm="show=true"
      class="choose-button">就选它</MButton>
    <p class="note">盲盒购买后不支持退换，介意请勿拍</p>
    <img class="goods-detail"
      src="./assets/detail.png">
    <Pay-Dialog :show="show"
      @onClose="show=false"
      :close="true" />
  </article>
</template>

<script>
import LongSwiper from '../../components/longSwiper'
import MButton from '../../components/MButton'
import Box from './components/box'
import PayDialog from '../../components/payDialog'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    LongSwiper,
    MButton,
    Box,
    PayDialog
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
  .choose-button {
    margin: 0 auto;
    margin-top: 0.5rem;
  }
  .note {
    color: #b5b9cb;
    font-size: 0.22rem;
    padding-top: 0.33rem;
    text-align: center;
    font-weight: bold;
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
