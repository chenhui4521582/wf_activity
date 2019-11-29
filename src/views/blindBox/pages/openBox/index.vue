<template>
  <article class="wrapper">
    <LongSwiper class="notice" />
    <img class="get"
      src="./assets/box-get.png">
    <div v-if="box"
      class="prize"
      :style="{'background':`url(${box.boxOpen}) no-repeat`,'background-size':'cover'}">
      <img class="goods"
        src="../chooseBox/assets/goods.png">
    </div>
    <p class="name">iPhone 11</p>
    <p class="des">
      <span class="price">价值：¥5499</span>
      <span>数量：1</span>
    </p>
    <MButton class="button"
      @click="$router.push({name:'Index'})">再开一次</MButton>
    <p @click="$router.push({name:'MyPrize'})"
      class="view-prize">查看我的奖品>></p>
  </article>
</template>

<script>
import LongSwiper from '../../components/longSwiper'
import MButton from '../../components/MButton'
import { boxGroup } from '../../config/box'

export default {
  data () {
    return {
      box: null,
      goods: null
    }
  },
  components: {
    LongSwiper,
    MButton
  },
  mounted () {
    this.box = boxGroup.find(res => res.type === this.$route.params.type)
  }
}
</script>

<style lang="less" scoped>
@keyframes show {
  0% {
    transform: translateY(100%) scale3d(0.1, 0.1, 1);
  }
  50% {
    transform: translateY(40%) scale3d(0.4, 0.4, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.wrapper {
  height: 100vh;
  position: relative;
  background: #2a2d3c;
  padding-top: 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  .notice {
    margin: 0 auto;
    width: 3.87rem;
  }
  .get {
    width: 2.18rem;
    height: 0.79rem;
  }
  .prize {
    width: 6.71rem;
    height: 6.23rem;
    margin-left: 0.49rem;
    margin-top: -0.3rem;
    padding-top: 1.1rem;
    box-sizing: border-box;
    .goods {
      width: 2.3rem;
      // transform-origin: right bottom;
      animation: show 1s linear;
    }
  }
  .name {
    padding: 0.4rem 0;
    color: #b6b9cb;
    font-size: 0.26rem;
    font-weight: bold;
  }
  .des {
    padding-bottom: 0.8rem;
    color: #b6b9cb;
    font-size: 0.22rem;
    font-weight: bold;
    .price {
      padding-right: 0.3rem;
    }
  }
  .button {
    margin: 0 auto;
  }
  .view-prize {
    color: #ecd69a;
    font-weight: bold;
    font-size: 0.22rem;
    padding-top: 0.33rem;
  }
}
</style>
